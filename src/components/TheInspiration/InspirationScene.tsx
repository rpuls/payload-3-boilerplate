'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import type { Group } from 'three'

function Core({ reduceMotion }: { reduceMotion: boolean }) {
  const group = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!group.current || reduceMotion) return

    const pointerX = state.pointer.x * 0.18
    const pointerY = state.pointer.y * 0.12
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x += (pointerY - group.current.rotation.x) * 0.035
    group.current.rotation.z += (-pointerX - group.current.rotation.z) * 0.03
  })

  return (
    <Float speed={reduceMotion ? 0 : 1.15} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={group} rotation={[0.28, -0.35, -0.15]} scale={1.08}>
        <mesh castShadow>
          <torusKnotGeometry args={[1.18, 0.34, 220, 32, 2, 3]} />
          <meshPhysicalMaterial
            color="#6d3f2b"
            clearcoat={1}
            clearcoatRoughness={0.12}
            metalness={0.08}
            roughness={0.22}
          />
        </mesh>
        <mesh rotation={[0.9, 0.35, 0.25]} scale={0.58}>
          <torusGeometry args={[1.1, 0.08, 18, 120]} />
          <meshPhysicalMaterial
            color="#d8a06f"
            emissive="#6f351b"
            emissiveIntensity={0.18}
            metalness={0.72}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  )
}

export function InspirationScene() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return (
    <div className="ti-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight color="#fff1dc" intensity={4.2} position={[3, 4, 5]} />
        <directionalLight color="#9c5e38" intensity={2.4} position={[-4, -2, 3]} />
        <pointLight color="#e5a46f" intensity={3} position={[0, -3, 2]} />
        <Suspense fallback={null}>
          <Core reduceMotion={reduceMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}
