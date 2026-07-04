import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Individual Cubie Component
const Cubie = ({ cx, cy, cz }) => {
  // We place outer stickers on the respective faces
  // Right (+X), Left (-X), Top (+Y), Bottom (-Y), Front (+Z), Back (-Z)
  return (
    <group position={[cx, cy, cz]}>
      {/* Black plastic core body */}
      <RoundedBox args={[0.92, 0.92, 0.92]} radius={0.06} smoothness={2}>
        <meshStandardMaterial
          color="#0b0e17"
          roughness={0.5}
          metalness={0.5}
        />
      </RoundedBox>

      {/* STICKERS - Rendered as thin RoundedBoxes on the surface of the cubies */}
      {/* Right (+X) - Pink/Red sticker */}
      {cx === 1 && (
        <RoundedBox args={[0.02, 0.74, 0.74]} radius={0.08} smoothness={2} position={[0.46, 0, 0]}>
          <meshStandardMaterial
            color="#ff0055"
            emissive="#ff0055"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.1}
          />
        </RoundedBox>
      )}

      {/* Left (-X) - Orange sticker */}
      {cx === -1 && (
        <RoundedBox args={[0.02, 0.74, 0.74]} radius={0.08} smoothness={2} position={[-0.46, 0, 0]}>
          <meshStandardMaterial
            color="#ff5500"
            emissive="#ff5500"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.1}
          />
        </RoundedBox>
      )}

      {/* Top (+Y) - White sticker */}
      {cy === 1 && (
        <RoundedBox args={[0.74, 0.02, 0.74]} radius={0.08} smoothness={2} position={[0, 0.46, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.1}
          />
        </RoundedBox>
      )}

      {/* Bottom (-Y) - Yellow sticker */}
      {cy === -1 && (
        <RoundedBox args={[0.74, 0.02, 0.74]} radius={0.08} smoothness={2} position={[0, -0.46, 0]}>
          <meshStandardMaterial
            color="#ffdd00"
            emissive="#ffdd00"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.1}
          />
        </RoundedBox>
      )}

      {/* Front (+Z) - Blue sticker */}
      {cz === 1 && (
        <RoundedBox args={[0.74, 0.74, 0.02]} radius={0.08} smoothness={2} position={[0, 0, 0.46]}>
          <meshStandardMaterial
            color="#00aaff"
            emissive="#00aaff"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.1}
          />
        </RoundedBox>
      )}

      {/* Back (-Z) - Green sticker */}
      {cz === -1 && (
        <RoundedBox args={[0.74, 0.74, 0.02]} radius={0.08} smoothness={2} position={[0, 0, -0.46]}>
          <meshStandardMaterial
            color="#00ff66"
            emissive="#00ff66"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.1}
          />
        </RoundedBox>
      )}
    </group>
  );
};

// 3D Cube Assembly that controls float & idle rotations
const RubiksCubeModel = ({ isDragging }) => {
  const groupRef = useRef();
  const lastActiveTime = useRef(0);

  // Generate 27 cubies coordinates
  const cubies = useMemo(() => {
    const coords = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          coords.push({ x, y, z });
        }
      }
    }
    return coords;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    if (isDragging) {
      lastActiveTime.current = time;
    }

    // Floating animation (sine wave)
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.18;
    
    // Slight idle bobbing rotation
    groupRef.current.position.x = Math.cos(time * 0.5) * 0.05;

    // Slow idle rotation when not dragging (and has been idle for > 800ms)
    if (!isDragging) {
      const idleTime = time - lastActiveTime.current;
      if (idleTime > 0.8) {
        // Slow rotation on all 3 axes
        groupRef.current.rotation.y += 0.006;
        groupRef.current.rotation.x += 0.003;
        groupRef.current.rotation.z += 0.002;
      }
    }
  });

  return (
    <group ref={groupRef} scale={1.1}>
      {cubies.map((c, i) => (
        <Cubie key={i} cx={c.x} cy={c.y} cz={c.z} />
      ))}
    </group>
  );
};

// Sparks / Particle System
const ParticleSparks = () => {
  const count = 50;
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const seed = Math.sin((i + 1) * 78.233) * 43758.5453;
      const rand = (offset) => {
        const value = Math.sin(seed + offset * 19.19) * 10000;
        return value - Math.floor(value);
      };
      const angle = rand(1) * Math.PI * 2;
      const radius = 2.5 + rand(2) * 4;
      const x = Math.cos(angle) * radius;
      const y = (rand(3) - 0.5) * 6;
      const z = Math.sin(angle) * radius;
      const speed = 0.002 + rand(4) * 0.005;
      const size = 0.015 + rand(5) * 0.035;
      const color = rand(6) > 0.4 ? '#a855f7' : '#22d3ee'; // purple vs cyan
      temp.push({ x, y, z, speed, angle, radius, size, color });
    }
    return temp;
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    particles.forEach((p, idx) => {
      meshRef.current.setColorAt(idx, new THREE.Color(p.color));
    });
    meshRef.current.instanceColor.needsUpdate = true;
  }, [particles]);

  useFrame(() => {
    if (!meshRef.current) return;

    particles.forEach((p, idx) => {
      p.angle += p.speed;
      // Spiral motion around the Rubik's cube
      dummy.position.set(
        Math.cos(p.angle) * p.radius,
        p.y + Math.sin(p.angle * 2) * 0.16,
        Math.sin(p.angle) * p.radius
      );
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(idx, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial opacity={0.65} transparent vertexColors />
    </instancedMesh>
  );
};

const getRenderProfile = () => {
  if (typeof window === 'undefined') {
    return { dpr: 1, shadowMapSize: 256 };
  }

  const memory = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  const lowMemoryDevice = memory <= 2 || cores <= 4 || window.innerWidth < 768;

  return {
    dpr: lowMemoryDevice ? 1 : Math.min(window.devicePixelRatio || 1, 1.35),
    shadowMapSize: lowMemoryDevice ? 256 : 512,
  };
};

// Main Canvas Wrapper Component
const RubiksCube = () => {
  const [isDragging, setIsDragging] = useState(false);
  const renderProfile = useMemo(() => getRenderProfile(), []);

  return (
    <div className="w-full h-full min-h-[450px] relative select-none">
      {/* Background glow behind Canvas */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent blur-3xl opacity-60 pointer-events-none" />

      <Canvas
        camera={{ position: [4.5, 4.5, 5.5], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power', stencil: false }}
        dpr={renderProfile.dpr}
        performance={{ min: 0.5 }}
      >
        {/* Ambient Lights */}
        <ambientLight intensity={0.5} />

        {/* Neon Pink/Purple Point Light */}
        <pointLight position={[-4, 4, -4]} color="#a855f7" intensity={2.0} distance={12} />

        {/* Neon Cyan/Blue Point Light */}
        <pointLight position={[4, -4, 4]} color="#00d8ff" intensity={2.5} distance={12} />

        {/* Bright White Key Light - no shadow for performance */}
        <directionalLight
          position={[8, 8, 8]}
          intensity={1.5}
          color="#ffffff"
          shadow-mapSize-width={renderProfile.shadowMapSize}
          shadow-mapSize-height={renderProfile.shadowMapSize}
        />

        {/* Floating Sparks */}
        <ParticleSparks />

        {/* 3D Rubik's Cube Model */}
        <RubiksCubeModel isDragging={isDragging} />

        {/* Interactive Controls - zoom & pan disabled */}
        <OrbitControls
          enableDamping
          dampingFactor={0.06}
          enableZoom={false}
          enablePan={false}
          onStart={() => setIsDragging(true)}
          onEnd={() => setIsDragging(false)}
        />
      </Canvas>
    </div>
  );
};

export default RubiksCube;
