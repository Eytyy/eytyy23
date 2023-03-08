import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import palettes from 'nice-color-palettes';
// @ts-ignore
import random from 'canvas-sketch-util/random';
import frag from '@/shaders/blob.frag';

type Props = {
  width: number;
  height: number;
};

type State = {
  canvas: HTMLCanvasElement | null;
  context: WebGL2RenderingContext | null;
};

const initialState = {
  canvas: null,
  context: null,
};

const Blob = ({ width, height }: Props) => {
  const [state, setState] = useState<State>(initialState);

  const controls = useRef<OrbitControls | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const raF = useRef<number | null>(null);

  const { context, canvas } = state;

  const sketch = useCallback(
    (context: WebGL2RenderingContext, canvas: HTMLCanvasElement) => {
      /* --------------------  Setup --------------------  */
      const palette = random.pick(palettes);

      // Create new scene & renderer
      const scene = new THREE.Scene();
      renderer.current = new THREE.WebGLRenderer({ context });
      renderer.current.setClearColor('black', 1);

      // Create and position perspective camera
      // fov, aspect, near, far
      const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
      camera.position.set(0, 0, -3);
      camera.lookAt(new THREE.Vector3());

      // Instantiate OribtControls
      controls.current = new OrbitControls(camera, canvas);

      // Setup a geometry
      let geometry = new THREE.SphereGeometry(1, 32, 14);

      const vertexShader = /* glsl */ `
        varying vec2 vUv;
        void main () {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
        }
      `;
      let material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color('#F00') },
        },
        vertexShader,
        fragmentShader: frag,
      });

      let mesh = new THREE.Mesh(geometry, material);

      scene.add(mesh);

      /* --------------------  Render Logic -------------------- */

      let prevTime: number;
      let time = 0;
      const timeScale = 1;

      const render = (time: number) => {
        if (!renderer.current || !controls.current) return;
        material.uniforms.time.value = time;
        // update
        controls.current.update();
        renderer.current.render(scene, camera);
      };

      const animate = (now: number) => {
        if (prevTime === undefined) prevTime = now;
        let deltaTimeMS = now - prevTime;
        const deltaTime = deltaTimeMS / 1000;
        time = time + deltaTime * timeScale;
        prevTime = now;

        render(time);
        raF.current = requestAnimationFrame(animate);
      };

      raF.current = requestAnimationFrame(animate);
    },
    []
  );

  const measuredRef = useCallback((node: HTMLCanvasElement) => {
    if (node) {
      setState({
        context: node.getContext('webgl2'),
        canvas: node,
      });
    }
  }, []);

  useEffect(() => {
    if (canvas && context) sketch(context, canvas);

    return () => {
      if (raF.current) {
        cancelAnimationFrame(raF.current);
      }
      if (renderer.current) {
        renderer.current.dispose();
      }
      if (controls.current) {
        controls.current.dispose();
      }
    };
  }, [sketch, canvas, context, width, height]);

  return <canvas width={width} height={height} ref={measuredRef} />;
};

export default Blob;
