/**
 * HeroOrb — Premium floating glowing orb with ambient lighting
 *
 * A high-end R3F scene featuring:
 *  - Central emissive sphere with soft glow
 *  - Orbiting ring geometry
 *  - Cinematic ambient + point lighting
 *  - Smooth floating motion via useFrame and Float
 *  - Depth and atmosphere via Sparkles
 *  - Performance-optimized
 */

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function GlowingSphere() {
  const meshRef = useRef()
  const glowRef = useRef()
  const { pointer } = useThree()

  // Emissive material for the core sphere
  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#4f5ef5'),
        emissive: new THREE.Color('#2f2cc8'),
        emissiveIntensity: 0.8,
        metalness: 0.3,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9,
      }),
    []
  )

  // Outer glow shell
  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#6b82fc'),
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide,
      }),
    []
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (meshRef.current) {
      // Gentle floating
      meshRef.current.position.y = Math.sin(t * 0.4) * 0.1
      meshRef.current.rotation.y = t * 0.08

      // Smooth mouse reactivity
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        pointer.y * 0.12,
        0.02
      )
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        -pointer.x * 0.08,
        0.02
      )
    }

    if (glowRef.current) {
      // Breathing glow
      const scale = 1.8 + Math.sin(t * 0.6) * 0.06
      glowRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group ref={meshRef}>
      <mesh material={coreMaterial}>
        <icosahedronGeometry args={[1, 5]} />
      </mesh>
      <mesh ref={glowRef} material={glowMaterial}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
    </group>
  )
}

function OrbitRing({ radius = 2, speed = 0.3, opacity = 0.06, color = '#a78bfa' }) {
  const ref = useRef()

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
      }),
    [opacity, color]
  )

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed
      ref.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.15) * 0.15
    }
  })

  return (
    <mesh ref={ref} material={material}>
      <torusGeometry args={[radius, 0.006, 12, 120]} />
    </mesh>
  )
}

export default function HeroOrb() {
  return (
    <>
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.08} />
      <pointLight position={[3, 4, 5]} intensity={1.5} color="#4f5ef5" />
      <pointLight position={[-4, -3, 3]} intensity={0.8} color="#a78bfa" />
      <pointLight position={[0, 0, 4]} intensity={0.3} color="#ffffff" />
      <pointLight position={[0, -5, -2]} intensity={0.5} color="#2f2cc8" />

      {/* Main floating orb */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <GlowingSphere />
      </Float>

      {/* Orbit rings */}
      <OrbitRing radius={1.9} speed={0.2} opacity={0.08} color="#6b82fc" />
      <OrbitRing radius={2.6} speed={-0.12} opacity={0.04} color="#a78bfa" />
      <OrbitRing radius={3.2} speed={0.08} opacity={0.02} color="#ffffff" />

      {/* Depth Particles */}
      <Sparkles
        count={60}
        scale={6}
        size={2}
        speed={0.4}
        opacity={0.3}
        color="#8e70f5"
        noise={0.2}
      />
    </>
  )
}
