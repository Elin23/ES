import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  RoundedBox,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
} from "@react-three/drei";
import { EffectComposer, Bloom, SSAO, Vignette, ToneMapping } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/** ---------------- Materials ---------------- **/
function useMaterials() {
  return useMemo(() => {
    const body = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#121225"),
      metalness: 0.65,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.2,
    });

    const dark = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#070712"),
      metalness: 0.15,
      roughness: 0.9,
      envMapIntensity: 0.8,
    });

    const screen = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#050611"),
      roughness: 0.15,
      metalness: 0.2,
      emissive: new THREE.Color("#4f46e5"),
      emissiveIntensity: 0.55,
      envMapIntensity: 0.9,
    });

    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffffff"),
      transparent: true,
      opacity: 0.12,
      roughness: 0.06,
      metalness: 0,
      transmission: 0.85,
      ior: 1.45,
      thickness: 0.7,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.5,
    });

    const accent = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0f1024"),
      emissive: new THREE.Color("#22d3ee"),
      emissiveIntensity: 0.35,
      roughness: 0.35,
      metalness: 0.25,
      envMapIntensity: 1.2,
    });

    return { body, dark, screen, glass, accent };
  }, []);
}

/** ---------------- Speaker ---------------- **/
function Speaker({
  side,
  mats,
}: {
  side: "left" | "right";
  mats: ReturnType<typeof useMaterials>;
}) {
  const x = side === "left" ? -1.22 : 1.22;

  return (
    <group position={[x, 0.08, 0.08]}>
      <RoundedBox args={[0.32, 0.78, 0.34]} radius={0.08} smoothness={10} material={mats.body} castShadow receiveShadow />

      <mesh position={[0, 0, 0.18]} castShadow receiveShadow>
        <boxGeometry args={[0.27, 0.7, 0.03]} />
        <meshStandardMaterial color={"#0c0c1a"} roughness={0.9} metalness={0.05} envMapIntensity={0.8} />
      </mesh>

      <mesh position={[0, -0.08, 0.205]}>
        <cylinderGeometry args={[0.105, 0.105, 0.05, 32]} />
        <meshStandardMaterial color={"#11112a"} roughness={0.65} metalness={0.15} envMapIntensity={1.0} />
      </mesh>

      <mesh position={[0, -0.08, 0.235]}>
        <cylinderGeometry args={[0.07, 0.07, 0.02, 32]} />
        <meshStandardMaterial emissive={"#4f46e5"} emissiveIntensity={1.1} color={"#1b1b33"} />
      </mesh>

      <mesh position={[0, 0.18, 0.205]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 32]} />
        <meshStandardMaterial color={"#11112a"} roughness={0.65} metalness={0.15} envMapIntensity={1.0} />
      </mesh>

      <mesh position={[0.12, -0.33, 0.215]}>
        <sphereGeometry args={[0.018, 24, 24]} />
        <meshStandardMaterial emissive={"#d946ef"} emissiveIntensity={1.8} color={"#d946ef"} />
      </mesh>
    </group>
  );
}

/** ---------------- Better Keyboard ---------------- **/
function BetterKeyboard({ mats }: { mats: ReturnType<typeof useMaterials> }) {
  const keyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#15152b"),
        roughness: 0.65,
        metalness: 0.15,
        clearcoat: 0.7,
        clearcoatRoughness: 0.25,
        envMapIntensity: 1.0,
      }),
    []
  );

  const plateMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0b0b18"),
        roughness: 0.95,
        metalness: 0.02,
        envMapIntensity: 0.8,
      }),
    []
  );

  const keys = useMemo(() => {
    const out: { x: number; z: number; sx: number }[] = [];

    const rows = [
      { n: 14, z: -0.19, special: (i: number) => (i === 13 ? 1.8 : 1) },
      { n: 14, z: -0.11, special: (i: number) => (i === 0 ? 1.6 : i === 13 ? 1.5 : 1) },
      { n: 13, z: -0.03, special: (i: number) => (i === 0 ? 1.9 : i === 12 ? 2.2 : 1) },
      { n: 12, z: 0.05, special: (i: number) => (i === 0 ? 2.2 : i === 11 ? 2.4 : 1) },
      { n: 10, z: 0.13, special: (i: number) => (i === 4 ? 5.4 : 1.45) },
    ];

    const startX = -0.72;
    const unit = 0.095;

    rows.forEach((r) => {
      let cursor = startX;
      for (let i = 0; i < r.n; i++) {
        const sx = r.special(i);
        out.push({ x: cursor + (sx * unit) / 2, z: r.z, sx });
        cursor += sx * unit + 0.012;
      }
    });

    const npStartX = 0.78;
    const npStepX = 0.095;
    const npStepZ = 0.082;

    for (let rr = 0; rr < 5; rr++) {
      for (let cc = 0; cc < 4; cc++) {
        out.push({
          x: npStartX + cc * (npStepX + 0.012),
          z: -0.19 + rr * npStepZ,
          sx: 0.95,
        });
      }
    }

    return out;
  }, []);

  return (
    <group position={[0, -0.16, 0.42]} rotation={[-0.08, 0, 0]}>
      <RoundedBox args={[2.06, 0.12, 0.74]} radius={0.12} smoothness={10} material={mats.body} castShadow receiveShadow />

      <mesh position={[0, 0.045, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.95, 0.02, 0.64]} />
        <primitive object={plateMat} attach="material" />
      </mesh>

      <group position={[0, 0.07, 0]}>
        {keys.map((k, idx) => (
          <RoundedBox
            key={idx}
            args={[0.07 * k.sx, 0.028, 0.055]}
            radius={0.012}
            smoothness={6}
            position={[k.x, 0, k.z]}
            material={keyMat}
            castShadow
            receiveShadow
          />
        ))}
      </group>

      <mesh position={[0.88, 0.03, 0.33]}>
        <boxGeometry args={[0.24, 0.015, 0.03]} />
        <meshStandardMaterial emissive={"#22d3ee"} emissiveIntensity={1.5} color={"#0b0b18"} />
      </mesh>
    </group>
  );
}

/** ---------------- Better Mouse ---------------- **/
function BetterMouse({ mats }: { mats: ReturnType<typeof useMaterials> }) {
  const rubber = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#090915"),
        roughness: 0.98,
        metalness: 0.02,
        envMapIntensity: 0.6,
      }),
    []
  );

  const shell = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#14142a"),
        roughness: 0.28,
        metalness: 0.75,
        clearcoat: 1,
        clearcoatRoughness: 0.16,
        envMapIntensity: 1.2,
      }),
    []
  );

  return (
    <group position={[1.18, -0.17, 0.44]} rotation={[0, -0.35, 0]}>
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.16, 0.46, 12, 24]} />
        <primitive object={shell} attach="material" />
      </mesh>

      <mesh position={[0, 0.07, -0.08]} castShadow receiveShadow>
        <capsuleGeometry args={[0.135, 0.28, 10, 22]} />
        <primitive object={shell} attach="material" />
      </mesh>

      <mesh position={[0, -0.095, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.28, 0.03, 0.62]} />
        <primitive object={rubber} attach="material" />
      </mesh>

      <RoundedBox args={[0.14, 0.03, 0.26]} radius={0.02} smoothness={6} position={[-0.075, 0.09, 0.08]} material={mats.body} castShadow receiveShadow />
      <RoundedBox args={[0.14, 0.03, 0.26]} radius={0.02} smoothness={6} position={[0.075, 0.09, 0.08]} material={mats.body} castShadow receiveShadow />

      <mesh position={[0, 0.085, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[0.01, 0.025, 0.26]} />
        <primitive object={rubber} attach="material" />
      </mesh>

      <mesh position={[0, 0.1, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.06, 28]} />
        <meshStandardMaterial emissive={"#22d3ee"} emissiveIntensity={1.25} color={"#0b0b18"} />
      </mesh>

      <RoundedBox args={[0.03, 0.02, 0.08]} radius={0.01} smoothness={6} position={[-0.16, 0.03, 0.02]} material={rubber} />
      <RoundedBox args={[0.03, 0.02, 0.08]} radius={0.01} smoothness={6} position={[-0.16, 0.03, -0.08]} material={rubber} />

      <mesh position={[0, 0.08, -0.12]}>
        <sphereGeometry args={[0.018, 24, 24]} />
        <meshStandardMaterial emissive={"#d946ef"} emissiveIntensity={1.9} color={"#d946ef"} />
      </mesh>
    </group>
  );
}

/** ---------------- Desk Setup (Full Scene) ---------------- **/
function DeskSetup() {
  const group = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const mats = useMaterials();

  useFrame(({ mouse, clock }) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.22, 0.06);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouse.y * 0.09, 0.06);
    }
    if (screenRef.current) {
      const t = clock.getElapsedTime();
      const pulse = 0.45 + (Math.sin(t * 1.8) * 0.5 + 0.5) * 0.35;
      (screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      {/* Desk slab */}
      <RoundedBox args={[3.2, 0.14, 1.6]} radius={0.12} smoothness={10} position={[0, -0.28, 0.1]} material={mats.dark} castShadow receiveShadow />

      {/* Monitor */}
      <group position={[0, 0.36, -0.28]}>
        <RoundedBox args={[1.55, 1.0, 0.12]} radius={0.12} smoothness={10} material={mats.body} castShadow receiveShadow />

        <RoundedBox args={[1.38, 0.84, 0.06]} radius={0.1} smoothness={10} position={[0, 0, 0.05]} material={mats.dark} castShadow receiveShadow />

        <mesh ref={screenRef} position={[0, 0, 0.085]} material={mats.screen}>
          <boxGeometry args={[1.22, 0.7, 0.02]} />
        </mesh>

        <mesh position={[0, 0, 0.105]} material={mats.glass}>
          <boxGeometry args={[1.26, 0.74, 0.01]} />
        </mesh>

        {/* stand */}
        <RoundedBox args={[0.22, 0.62, 0.18]} radius={0.08} smoothness={8} position={[0, -0.66, -0.02]} material={mats.body} castShadow receiveShadow />
        <RoundedBox args={[0.95, 0.12, 0.55]} radius={0.12} smoothness={10} position={[0, -0.98, 0.1]} material={mats.body} castShadow receiveShadow />

        {/* accent strip */}
        <mesh position={[0, -0.47, 0.06]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.03, 0.03]} />
          <meshStandardMaterial emissive={"#22d3ee"} emissiveIntensity={1.3} color={"#0f172a"} />
        </mesh>
      </group>

      <Speaker side="left" mats={mats} />
      <Speaker side="right" mats={mats} />
      <BetterKeyboard mats={mats} />
      <BetterMouse mats={mats} />
    </group>
  );
}

/** ---------------- Export Component ---------------- **/
export default function About3DComputer() {
  return (
    <div className="relative h-[360px] w-full max-w-full overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/60 backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_15%_30%,rgba(34,211,238,0.16),transparent_55%),radial-gradient(circle_at_75%_25%,rgba(217,70,239,0.18),transparent_55%),radial-gradient(circle_at_50%_75%,rgba(79,70,239,0.16),transparent_55%)]" />
      </div>

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.75, 3.2], fov: 42 }}
        gl={{
          antialias: true,
        //   physicallyCorrectLights: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        {/* Environment */}
        <Environment preset="city" environmentIntensity={1.1} />

        {/* Soft studio shadows */}
        <AccumulativeShadows temporal frames={60} alphaTest={0.9} scale={8} position={[0, -0.34, 0]} opacity={0.75}>
          <RandomizedLight amount={6} radius={8} ambient={0.5} intensity={1.2} position={[3, 4, 2]} bias={0.001} />
          <RandomizedLight amount={4} radius={6} ambient={0.35} intensity={0.8} position={[-4, 2, -2]} bias={0.001} />
        </AccumulativeShadows>

        {/* Extra contact shadows under objects */}
        <ContactShadows position={[0, -0.33, 0]} opacity={0.35} scale={6} blur={2.5} far={2.2} />

        <Float speed={1.0} rotationIntensity={0.16} floatIntensity={0.38}>
          <DeskSetup />
        </Float>

        {/* Postprocessing */}
        <EffectComposer multisampling={4}>
          <ToneMapping />
          <SSAO samples={12} radius={0.15} intensity={10} />
          <Bloom intensity={0.55} luminanceThreshold={0.25} luminanceSmoothing={0.9} />
          <Vignette eskil={false} offset={0.2} darkness={0.8} />
        </EffectComposer>
      </Canvas>

      <div className="absolute bottom-4 left-4 rounded-full border border-zinc-200/60 bg-white/70 px-3 py-1 text-xs text-zinc-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
        Desk setup • Monitor + Speakers + Keyboard + Mouse
      </div>
    </div>
  );
}
