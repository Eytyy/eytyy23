// Shaders in Three.js
import React, { useEffect, useRef, useState } from 'react';
import canvasSketch from 'canvas-sketch';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// @ts-ignore
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';

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

  // Create a perspective camera
  // const fov = 45; // fov = Field Of View
  // const aspect = width / height; // the canvas default
  // const near = 0.01; // the near clipping plane
  // const far = 100; // the far clipping plane
  // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  const camera = new THREE.OrthographicCamera();

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ context });
  renderer.setClearColor('hsl(0, 0%, 90%)', 1);

  // Setup camera controller
  // const controls = new OrbitControls(camera, context.canvas);

  // Position the perspective camera
  // camera.position.set(2, 2, 4);
  // const center = new THREE.Vector3();
  // camera.lookAt(center);

  // Setup a geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const palette = random.pick(palettes);

  for (let i = 0; i < 10; i++) {
    // Setup a material
    const material = new THREE.MeshStandardMaterial({
      color: random.pick(palette),
    });
    // Setup a mesh with geometry + material
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    );
    mesh.scale.multiplyScalar(0.1);
    // Add the mesh to the scene
    scene.add(mesh);
  }

  // Setup a light
  const light = new THREE.DirectionalLight('white', 1.0);
  light.position.set(2, 5, 4);
  scene.add(light);

  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }: any) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
      // camera.aspect = viewportWidth / viewportHeight;

      // Isometric Three.js camera
      const zoom = 1;
      const aspect = viewportWidth / viewportHeight;
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;
      camera.near = -100;
      camera.far = 100;
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      camera.updateProjectionMatrix();
    },
    // And render events here
    render({ time }: any) {
      // mesh.rotation.y = time * ((10 * Math.PI) / 180);
      // controls.update();
      renderer.render(scene, camera);
    },

    // Dispose of WebGL context (optional)
    unload() {
      // controls.dispose();
      renderer.dispose();
    },
  };
};

const Sketch04 = React.memo(function Sketch04() {
  const ref = useRef(null);
  const rendered = useRef(false);
  const r = useRef(null);

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
      <div className="fixed top-0 left-0 flex h-screen min-h-screen w-screen place-content-center place-items-center ">
        <canvas className="mx-auto shadow-md" ref={ref} />
      </div>
    </div>
  );
});

export default Sketch04;
