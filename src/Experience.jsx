import {
	useGLTF,
	useTexture,
	OrbitControls,
	Center,
	Sparkles,
	shaderMaterial,
	Clouds,
	Cloud,
} from '@react-three/drei'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial(
	{
		uTime: 0,
		uCenterColor: new THREE.Color('#ebd6ff'),
		uBorderColor: new THREE.Color('#fdecfe'),
	},
	portalVertexShader,
	portalFragmentShader,
)

extend({ PortalMaterial })

export default function Experience() {
	const { nodes } = useGLTF('./model/p6.glb')

	const bakedTexture = useTexture('./model/baked3.jpg')

	const portalMaterial = useRef()
	useFrame((state, delta) => {
		portalMaterial.current.uTime += delta
	})

	const count = 40
	const generateRandomArray = count => {
		return Array.from(
			{ length: count },
			() => Math.floor(Math.random() * 4) + 1,
		)
	}

	return (
		<>
			<color args={['#1b1631']} attach="background" />

			<OrbitControls
				minDistance={0}
				maxDistance={8}
				maxPolarAngle={Math.PI / 2}
			/>

			<fog attach="fog" args={['#39247f', 0.2, 15]} />

			<Clouds material={THREE.MeshBasicMaterial}>
				<Cloud
					segments={30}
					bounds={[4, 2, 2]}
					volume={4}
					color="#874be9"
					position={[0, 0, -3.5]}
					speed={0.1}
					fade={50}
					scale={1}
				/>
				<Cloud
					segments={30}
					bounds={[5, 2, 2]}
					volume={2}
					color="#ff8d40"
					position={[0, 0, -4]}
					speed={0.1}
					fade={50}
				/>
			</Clouds>

			<Center>
				<mesh geometry={nodes.bakednomaterial.geometry}>
					<meshBasicMaterial map={bakedTexture} map-flipY={false} />
				</mesh>

				<mesh
					geometry={nodes.poteau002.geometry}
					position={nodes.poteau002.position}
				>
					<meshBasicMaterial color="#ffede0" />
				</mesh>

				<mesh
					geometry={nodes.poteau005.geometry}
					position={nodes.poteau005.position}
					rotation={nodes.poteau005.rotation}
				>
					<meshBasicMaterial color="#ffede0" />
				</mesh>
				<mesh
					geometry={nodes.Circle.geometry}
					position={nodes.Circle.position}
					rotation={nodes.Circle.rotation}
				>
					<portalMaterial ref={portalMaterial} />
				</mesh>

				<Sparkles
					size={generateRandomArray(count)}
					opacity={0.6}
					scale={[5.5, 2, 4]}
					position-y={1.5}
					speed={0.3}
					count={count}
					noise={1}
					random={true}
				/>
			</Center>
		</>
	)
}
