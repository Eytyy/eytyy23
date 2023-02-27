// Shaders in Three.js
import React, { useEffect, useRef } from 'react';
import canvasSketch from 'canvas-sketch';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const settings = {
  context: 'webgl',
  attributes: { antialias: true },
  animate: true,
};

interface Props {
  context: WebGLRenderingContext;
  width: number;
  height: number;
  time: number;
  playhead: number;
  gl: WebGLRenderingContext;
}

const sketch = ({ context, width, height }: Props) => {
  if (!context) return;

  // Create a scene
  const scene = new THREE.Scene();

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ context });
  renderer.setClearColor('black', 1);

  // Create a perspective camera
  const fov = 45; // fov = Field Of View
  const aspect = 1; // the canvas default
  const near = 0.01; // the near clipping plane
  const far = 100; // the far clipping plane
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // Setup camera controller
  // @ts-ignore
  const controls = new OrbitControls(camera, context.canvas);

  // Position the perspective camera
  camera.position.set(1, 1, -6);
  const center = new THREE.Vector3();
  camera.lookAt(center);

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 64);

  const texture = new THREE.TextureLoader();
  const earth = texture.load('earth.jpeg');
  const moon = texture.load('moon.jpeg');

  const earthMaterial = new THREE.MeshStandardMaterial({
    map: earth,
    roughness: 1,
    metalness: 0,
  });
  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  scene.add(earthMesh);

  const moonGroup = new THREE.Group();

  const moonMaterial = new THREE.MeshStandardMaterial({
    map: moon,
    roughness: 1,
    metalness: 0,
  });
  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  moonMesh.scale.setScalar(0.25);
  moonMesh.position.set(2, 0.5, 0);

  moonGroup.add(moonMesh);
  scene.add(moonGroup);

  const light = new THREE.PointLight('white', 2);
  light.position.set(2, 3, 1);
  scene.add(light);

  scene.add(new THREE.GridHelper(5, 50, 'red'));
  scene.add(new THREE.PointLightHelper(light, 0.2));

  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }: any) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // And render events here
    render({ time }: any) {
      earthMesh.rotation.y = time * 0.5;
      moonMesh.rotation.y = time * 0.15;
      moonGroup.rotation.y = time * 0.6;
      controls.update();
      renderer.render(scene, camera);
    },

    // Dispose of WebGL context (optional)
    unload() {
      controls.dispose();
      renderer.dispose();
    },
  };
};

export default React.memo(function Sketch04() {
  const ref = useRef(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (ref.current && !rendered.current) {
      rendered.current = true;
      canvasSketch(sketch, {
        ...settings,
        canvas: ref.current,
      });
    }
  }, []);

  return (
    <div className="relative">
      <div className="flex h-screen min-h-screen w-screen place-content-center place-items-center ">
        <canvas ref={ref} />
      </div>
    </div>
  );
});