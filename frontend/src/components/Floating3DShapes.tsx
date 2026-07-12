import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"

function CuteRobot() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      // Gentle floating and looking around
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
      group.current.rotation.y = Math.sin(state.clock.elapsedTime / 2) * 0.2
    }
  })

  return (
    <group ref={group as any} position={[0, -1, 0]}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1, 0.8, 1]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.25, 1.6, 0.51]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.25, 1.6, 0.51]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 1.2, 32]} />
        <meshStandardMaterial color="#a78bfa" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.8, 0.5, 0]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
        <meshStandardMaterial color="#c4b5fd" roughness={0.2} metalness={0.6} />
      </mesh>
      <mesh position={[0.8, 0.5, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
        <meshStandardMaterial color="#c4b5fd" roughness={0.2} metalness={0.6} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.3, -0.4, 0]}>
        <cylinderGeometry args={[0.15, 0.1, 0.8, 16]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[0.3, -0.4, 0]}>
        <cylinderGeometry args={[0.15, 0.1, 0.8, 16]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.4} metalness={0.4} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={1} />
      </mesh>
      <mesh position={[0, 2.3, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#fcd34d" emissive="#fcd34d" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

export function Floating3DShapes() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Environment preset="city" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[4, -1, -2]}>
           <CuteRobot />
        </Float>

        <ContactShadows position={[4, -3, -2]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  )
}
