import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function Character() {
  // ضعي الموديل هنا:
  // public/models/character.glb
  const { scene } = useGLTF("/models/character.glb");
  return <primitive object={scene} scale={1.6} position={[0, -1.6, 0]} />;
}

function Rig() {
    useEffect(() => {
  const onScroll = () => {
    if (!group.current) return;
    const s = window.scrollY / 800; // عدّلي الرقم حسب إحساسك
    group.current.rotation.y += s * 0.02;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      if (!group.current) return;
      group.current.rotation.y = x * 0.35;
      group.current.rotation.x = -y * 0.15;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.5}>
        <Character />
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-zinc-200/60 bg-gradient-to-br from-white/80 to-zinc-50/40 backdrop-blur dark:border-white/10 dark:from-white/5 dark:to-white/0 md:h-[520px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <Environment preset="city" />
        <Rig />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(217,70,239,0.22),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.20),transparent_55%)]" />
    </div>
  );
}

useGLTF.preload("/models/character.glb");
