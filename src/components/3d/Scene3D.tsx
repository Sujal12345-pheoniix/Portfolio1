"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Preload, Float } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 10 + Math.random() * 50;
      const speed = 0.005 + Math.random() / 200;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t) * 0.5 + 0.5; // Scale

      // Mouse interactive movement
      particle.mx += (state.pointer.x * 20 - particle.mx) * 0.02;
      particle.my += (state.pointer.y * 20 - particle.my) * 0.02;

      dummy.position.set(
        (particle.mx / 5) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 5) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 5) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      if(mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
        mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[0.08, 0]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </instancedMesh>
    </>
  );
}

function WireframeOrb() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if(meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1 + state.pointer.x * 0.2;
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + state.pointer.y * 0.2;
        }
    });
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere args={[2.5, 32, 32]} ref={meshRef}>
                <meshBasicMaterial color="#f08a5d" wireframe transparent opacity={0.15} />
            </Sphere>
        </Float>
    )
}

export default function Scene3D() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles count={200} />
        <WireframeOrb />
        <Preload all />
      </Canvas>
    </div>
  );
}
