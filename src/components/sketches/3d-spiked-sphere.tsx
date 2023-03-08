import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// @ts-ignore
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';
import Bezier from 'bezier-easing';

import fragmentShader from '@/shaders/sketch07.frag';
import vertexShader from '@/shaders/sketch07.vert';

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

const SpikedSphere = function SpikedSphere({ width, height }: Props) {
  const [state, setState] = useState<State>(initialState);

  const controls = useRef<OrbitControls | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const raF = useRef<number | null>(null);

  const { context, canvas } = state;

  const measuredRef = useCallback((node: HTMLCanvasElement) => {
    if (node) {
      setState({
        context: node.getContext('webgl2'),
        canvas: node,
      });
    }
  }, []);

  const sketch = useCallback(
    (context: WebGL2RenderingContext, canvas: HTMLCanvasElement) => {
      if (!context) return;

      const palette = random.pick(palettes);

      // Create a scene
      const scene = new THREE.Scene();
      renderer.current = new THREE.WebGLRenderer({ context });
      renderer.current.setClearColor('black', 1);

      // Create and position perspective camera
      // fov, aspect, near, far
      const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
      camera.position.set(0, 0, -3);
      camera.lookAt(new THREE.Vector3());

      // Setup camera controller
      controls.current = new OrbitControls(camera, canvas);

      // Setup a geometry
      const geometry = new THREE.SphereGeometry(1, 32, 64);

      const meshes: THREE.Mesh<
        THREE.SphereGeometry,
        THREE.ShaderMaterial
      >[] = [];

      const count = 1;

      for (let i = 0; i < count; i++) {
        // Setup a material
        const material = new THREE.ShaderMaterial({
          fragmentShader,
          vertexShader,
          uniforms: {
            playhead: { value: 0 },
            color: { value: new THREE.Color(random.pick(palette)) },
          },
        });

        // Setup a mesh with geometry + material
        const mesh = new THREE.Mesh(geometry, material);
        // mesh.position.set(
        //   random.range(-1, 1),
        //   random.range(-1, 1),
        //   random.range(-1, 1)
        // );
        // mesh.scale.multiplyScalar(random.range(0.1, 0.3));

        // Add the mesh to the scene
        scene.add(mesh);
        meshes.push(mesh);
      }

      // Setup a light
      const directionalLight = new THREE.DirectionalLight(
        'white',
        1.0
      );
      directionalLight.position.set(4, 5, 5);
      scene.add(directionalLight);

      const ambientLight = new THREE.AmbientLight('hsl(0, 0%, 40%)');
      scene.add(ambientLight);

      let prevTime: number;
      let time = 0;
      const timeScale = 1;

      const render = (time: number) => {
        if (!renderer.current || !controls.current) return;
        const t = Math.sin(time * 0.081 * Math.PI * 2) * 2;

        meshes.forEach((mesh) => {
          mesh.material.uniforms.playhead.value = time;
          mesh.rotation.z = Bezier(0.67, 0.03, 0.29, 0.99)(t);
        });

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

export default SpikedSphere;
