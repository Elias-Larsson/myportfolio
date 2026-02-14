// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// export const LightsaberScene = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     // Scene
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x000000);

//     // Camera
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );

//     // Renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     containerRef.current.appendChild(renderer.domElement);

//     // Lights (important for GLB models)
//     scene.add(new THREE.AmbientLight(0xffffff, 0.6));

//     const dirLight = new THREE.DirectionalLight(0xffffff, 1);
//     dirLight.position.set(5, 10, 7);
//     scene.add(dirLight);

//     // Load model
//     const loader = new GLTFLoader();
// loader.load('/lightsaber.glb', (gltf) => {
//   const model = gltf.scene;
//   scene.add(model);

//   // Fix transparency & depth issues
//   model.traverse((child) => {
//     if ((child as THREE.Mesh).isMesh) {
//       const mesh = child as THREE.Mesh;
//       const material = mesh.material as THREE.Material | THREE.Material[];

//       if (Array.isArray(material)) {
//         material.forEach((m) => {
//           m.transparent = true;
//           m.depthWrite = false;
//         });
//       } else {
//         material.transparent = true;
//         material.depthWrite = false;
//       }
//     }
//   });

//   // Compute bounding box from visible meshes only
//   const box = new THREE.Box3();
//   model.traverse((child) => {
//     if ((child as THREE.Mesh).isMesh && child.visible) {
//       box.expandByObject(child);
//     }
//   });

//   const size = box.getSize(new THREE.Vector3());
//   const center = box.getCenter(new THREE.Vector3());

//   model.position.sub(center);

//   const maxDim = Math.max(size.x, size.y, size.z);
//   const fov = camera.fov * (Math.PI / 180);
//   let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
//   cameraZ *= 1.5;

//   camera.position.set(0, 0, cameraZ);
//   camera.near = cameraZ / 100;
//   camera.far = cameraZ * 100;
//   camera.updateProjectionMatrix();
// });


//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//   }, []);

//   return <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />;
// };
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Model3DProps {
  modelPath: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  autoRotate?: boolean
}

export default function Model3D({ 
  modelPath, 
  scale = 1, 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false
}: Model3DProps) {
  const meshRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(modelPath)

  // Optional auto-rotation
  useFrame((state, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      scale={scale} 
      position={position}
      rotation={rotation}
    />
  )
}

// Preload the model for better performance
useGLTF.preload('/models/your-model.glb')