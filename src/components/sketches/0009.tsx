// Shaders Basics
import React, { useEffect, useRef, useState } from 'react';
import canvasSketch from 'canvas-sketch';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import frag from '@/shaders/sketch09.frag';
import vert from '@/shaders/sketch09.vert';
// @ts-ignore
import createShader from 'canvas-sketch-util/shader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

  renderer.setClearColor('white', 0.0);

  // setup camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(0, 0, -4);
  camera.lookAt(new THREE.Vector3());

  // setup controls
  // @ts-ignore
  const controls = new OrbitControls(camera, context.canvas);

  const scene = new THREE.Scene();
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color('#00F') },
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

const text = `People with various interests and who are instinctively
curious and creatively driven often face a life of struggle
and constant tension. It can feel like an endless loop, where
your brain is constantly context-shifting, trying to settle on
what you want to do with your life and what you value the
most. I have always felt like I had different characters or
personas because of this: one that seeks freedom, purpose, and
beauty, and the other that seeks status, financial stability,
and recognition. I chose the former.`;

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
        <motion.div
          className="absolute top-0 left-0 flex max-h-full flex-wrap items-start gap-8 overflow-y-scroll p-10 text-xl font-bold uppercase text-[#FFF] opacity-0 mix-blend-exclusion selection:text-black md:text-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {text.split(' ').map((c, index) => (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: index * 0.05 }}
              key={`${c}-${index}`}
            >
              {c}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
