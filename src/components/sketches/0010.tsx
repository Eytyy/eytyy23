// Shaders Basics
import React, { useEffect, useRef, useState } from 'react';
import canvasSketch from 'canvas-sketch';
import * as THREE from 'three';
import frag from '@/shaders/sketch10.frag';
import vert from '@/shaders/sketch10.vert';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// @ts-ignore
import random from 'canvas-sketch-util/random';

const settings = {
  context: 'webgl',
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

const sketch = ({ context }: Props) => {
  if (!context) return;

  const renderer = new THREE.WebGLRenderer({
    context: context,
  });

  renderer.setClearColor('white', 1.0);

  // setup camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(0, 0, -4);
  camera.lookAt(new THREE.Vector3());

  // setup controls
  // @ts-ignore
  const controls = new OrbitControls(camera, context.canvas);

  const scene = new THREE.Scene();
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const baseGeom = new THREE.IcosahedronGeometry(1, 1);
  const posAtt = baseGeom.getAttribute('position');
  const vertex = new THREE.Vector3();

  const circleGeom = new THREE.CircleGeometry(1, 32);
  for (
    let vertexIndex = 0;
    vertexIndex < posAtt.count;
    vertexIndex++
  ) {
    vertex.fromBufferAttribute(posAtt, vertexIndex);
    const mesh = new THREE.Mesh(
      circleGeom,
      new THREE.MeshBasicMaterial({
        color: 'black',
        side: THREE.BackSide,
      })
    );
    mesh.position.copy(vertex);
    mesh.scale.setScalar(0.1);
    mesh.lookAt(new THREE.Vector3());
    scene.add(mesh);
  }

  const material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color('tomato') },
      time: { value: 0 },
    },
    vertexShader: vert,
    fragmentShader: frag,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return {
    resize({ pixelRatio, viewportWidth, viewportHeight }: any) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },

    render({ time }: { time: number }) {
      material.uniforms.time.value = time;
      controls.update();
      renderer.render(scene, camera);
    },

    unload() {
      controls.dispose();
      renderer.dispose();
    },
  };
};
export default function Sketch09() {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (ref.current) {
      setVis(true);
      if (!rendered.current) {
        canvasSketch(sketch, { ...settings, canvas: ref.current });
        rendered.current = true;
      }
    }
  }, []);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 h-screen w-screen ">
        <canvas
          className="relative z-10 mx-auto shadow-md"
          ref={ref}
        />
      </div>
    </div>
  );
}
