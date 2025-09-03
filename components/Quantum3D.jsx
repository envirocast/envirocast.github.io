// components/Quantum3D.jsx
'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Qubit({ position, color }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial emissive={color} emissiveIntensity={0.9} />
    </mesh>
  )
}

function Link({ from=[0,0,0], to=[1,0,0] }) {
  const mid = [(from[0]+to[0])/2, (from[1]+to[1])/2, (from[2]+to[2])/2]
  const len = Math.hypot(to[0]-from[0], to[1]-from[1], to[2]-from[2])
  return (
    <mesh position={mid}>
      <cylinderGeometry args={[0.03, 0.03, len, 16]} />
      <meshStandardMaterial color="#7dd3fc" />
    </mesh>
  )
}

export default function Quantum3D() {
  return (
    <div className="h-80 rounded-2xl overflow-hidden border border-white/10">
      <Canvas camera={{ position: [2.5, 2.5, 3] }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5,5,5]} intensity={1.2} />
        <Qubit position={[0,0,0]} color="#7dd3fc" />
        <Qubit position={[1.5,0,0]} color="#a78bfa" />
        <Qubit position={[0.75,1.2,0]} color="#34d399" />
        <Link from={[0,0,0]} to={[1.5,0,0]} />
        <Link from={[0.75,1.2,0]} to={[0,0,0]} />
        <Link from={[0.75,1.2,0]} to={[1.5,0,0]} />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  )
}
