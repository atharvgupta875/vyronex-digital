/**
 * SceneContainer
 * 
 * Wrapper for React Three Fiber scenes.
 * Provides the Canvas with optimized defaults and
 * Suspense fallback for async 3D assets.
 * 
 * Usage:
 *   <SceneContainer>
 *     <YourScene />
 *   </SceneContainer>
 */

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

export default function SceneContainer({
  children,
  className = '',
  camera = { position: [0, 0, 5], fov: 45 },
  ...props
}) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={camera}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
        {...props}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}
