// Shaders in Three.js
import React, { useEffect, useRef, useState } from 'react';
import canvasSketch from 'canvas-sketch';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import palettes from 'nice-color-palettes';
import bezier from 'bezier-easing';
// @ts-ignore
import random from 'canvas-sketch-util/random';
import frag from '@/shaders/sketch02.frag';
import vert from '@/shaders/sketch02.vert';

const settings = {
  context: 'webgl',
  attributes: { antialias: true },
  animate: true,
  fps: 24,
  duration: 40,
};

interface Props {
  context: WebGLRenderingContext;
  width: number;
  height: number;
  time: number;
  playhead: number;
  gl: WebGLRenderingContext;
}

function createMesh(palette: [], geometry: THREE.SphereGeometry) {
  const material = new THREE.ShaderMaterial({
    fragmentShader: frag,
    vertexShader: vert,
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(random.pick(palette)) },
    },
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(
    random.range(-1, 1),
    random.range(-1, 1),
    random.range(-1, 1)
  );

  // mesh.scale.multiplyScalar(random.range(0, 1));

  return mesh;
}

const sketch = ({ context }: Props) => {
  if (!context) return;

  const renderer = new THREE.WebGLRenderer({ context });
  renderer.setClearColor('hsl(0, 0%, 0%)', 1);

  const camera = new THREE.OrthographicCamera();
  camera.position.set(2, 2, -5);
  camera.lookAt(new THREE.Vector3());

  const scene = new THREE.Scene();
  const palette = random.pick(palettes);
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const meshes: THREE.Mesh<
    THREE.SphereGeometry,
    THREE.ShaderMaterial
  >[] = [];
  for (let i = 0; i < 1; i++) {
    const mesh = createMesh(palette, geometry);
    scene.add(mesh);
    meshes.push(mesh);
  }

  const controls = new OrbitControls(
    camera,
    context.canvas as HTMLCanvasElement
  );

  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(2, 2, 4);
  scene.add(light);
  scene.add(new THREE.AmbientLight('hsl(0, 0%, 40%)'));
  const easeFn = bezier(0.67, 0.03, 0.29, 0.99);

  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }: any) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 3;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      camera.updateProjectionMatrix();
    },
    // And render events here
    render({ playhead, time }: any) {
      // const t = Math.sin(playhead * Math.PI * 2);
      // scene.rotation.y = easeFn(t) * 4;

      const t = playhead * Math.PI * 2;
      scene.rotation.z = t;

      meshes.forEach((mesh) => {
        mesh.material.uniforms.time.value = time;
      });

      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of WebGL context (optional)
    unload() {
      renderer.dispose();
    },
  };
};

export default function Sketch02() {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      canvasSketch(sketch, { ...settings, canvas: ref.current });
    }
  }, []);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 h-screen w-screen ">
        <canvas className="mx-auto shadow-md" ref={ref} />
      </div>
    </div>
  );
}
