"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersCalm } from "@/hooks/usePrefersCalm";

// Custom 2.5D Rim Light & Parallax Shader Material
const PortraitShader = {
  uniforms: {
    uTexture: { value: null },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uTime: { value: 0 },
    uLime: { value: new THREE.Color("#C6FF3D") },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform vec2 uMouse;
    uniform float uTime;

    void main() {
      vUv = uv;
      vNormal = normal;

      // Subtle parallax displacement
      vec3 pos = position;
      pos.x += uMouse.x * 0.12;
      pos.y += uMouse.y * 0.12 + sin(uTime * 1.5) * 0.02;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uTime;
    uniform vec3 uLime;
    varying vec2 vUv;

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);

      if (texColor.a < 0.05) {
        discard;
      }

      // Edge detection for lime rim light
      float edgeX = abs(vUv.x - 0.5) * 2.0;
      float rimIntensity = pow(edgeX, 3.5) * 0.75;

      // Interactive cursor point-light reflection
      float lightDist = length(vUv - (uMouse * 0.5 + 0.5));
      float cursorGlow = smoothstep(0.45, 0.05, lightDist) * 0.25;

      // Combine subtle lime rim light with original texture
      vec3 finalRgb = mix(texColor.rgb, uLime, rimIntensity + cursorGlow);

      gl_FragColor = vec4(finalRgb, texColor.a);
    }
  `,
};

function PortraitMesh({ mousePos }: { mousePos: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load("/hero/raj_shah_hero_image.png", (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      setTexture(tex);
    });
  }, []);

  const material = useMemo(() => {
    if (!texture) return null;
    const mat = new THREE.ShaderMaterial({
      vertexShader: PortraitShader.vertexShader,
      fragmentShader: PortraitShader.fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uLime: { value: new THREE.Color("#C6FF3D") },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
    return mat;
  }, [texture]);

  useFrame((state, delta) => {
    if (!material) return;
    material.uniforms.uTime.value += delta;

    // Smooth lerp mouse coordinates
    const targetX = mousePos.current?.x || 0;
    const targetY = mousePos.current?.y || 0;
    material.uniforms.uMouse.value.x +=
      (targetX - material.uniforms.uMouse.value.x) * 0.08;
    material.uniforms.uMouse.value.y +=
      (targetY - material.uniforms.uMouse.value.y) * 0.08;
  });

  if (!material) return null;

  return (
    <mesh ref={meshRef} position={[0, -0.15, 0]}>
      {/* 4:5 Portrait Aspect Ratio Plane */}
      <planeGeometry args={[3.2, 4.0, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export function HeroDepthCanvas() {
  const { isCalm } = usePrefersCalm();
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCalm) return;

    const onMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -1 to +1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current = { x, y };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isCalm]);

  if (isCalm) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <PortraitMesh mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
