// import { useEffect, useRef } from 'react';
// import P5 from 'p5';

// let audioCtx: AudioContext | null;
// let audioBuffer: AudioBuffer | null;
// let audio: HTMLAudioElement | null;
// let analyserNode: AnalyserNode | null;
// let analyserData: Float32Array | null;
// let gainNode: GainNode | null;

// function sketch(p: P5) {
//   let w = window.innerWidth;
//   let h = window.innerHeight;

//   // p is a reference to the p5 instance this sketch is attached to
//   p.setup = function () {
//     p.createCanvas(w, h);
//     p.background(0);
//   };

//   p.draw = function () {
//     let w = window.innerWidth;
//     let h = window.innerHeight;
//     p.background(0, 0, 0);
//     if (analyserNode && analyserData) {
//       p.noFill();
//       p.stroke('white');
//       analyserNode.getFloatTimeDomainData(analyserData);

//       p.beginShape();
//       for (let i = 0; i < analyserData.length; i++) {
//         const amp = analyserData[i];
//         const y = p.map(amp, -1, 1, h / 2 - h / 4, h / 2 + h / 4);
//         const x = p.map(i, 0, analyserData.length - 1, 0, p.width);
//         p.vertex(x, y);
//       }
//       p.endShape();
//     } else {
//       p.fill('white');
//       p.noStroke();
//       const dim = p.min(w, h);
//       polygon(w / 2, h / 2, dim * 0.1, 3);
//     }
//   };

//   function polygon(
//     x: number,
//     y: number,
//     radius: number,
//     sides = 3,
//     angle = 0
//   ) {
//     p.beginShape();
//     for (let i = 0; i < sides; i++) {
//       const a = angle + p.TWO_PI * (i / sides);
//       let sx = x + p.cos(a) * radius;
//       let sy = y + p.sin(a) * radius;
//       p.vertex(sx, sy);
//     }
//     p.endShape(p.CLOSE);
//   }

//   p.windowResized = function () {
//     w = window.innerWidth;
//     h = window.innerHeight;
//     p.resizeCanvas(w, h);
//     p.draw();
//   };

//   p.mousePressed = (e) => {
//     playSound();
//   };

//   async function loadSound() {
//     if (!audioCtx) {
//       audioCtx = new AudioContext();
//     }

//     if (!audioBuffer) {
//       const res = await fetch('chime.mp3');
//       const buffer = await res.arrayBuffer();
//       audioBuffer = await audioCtx.decodeAudioData(buffer);
//     }

//     if (!gainNode) {
//       gainNode = audioCtx.createGain();

//       analyserNode = audioCtx.createAnalyser();
//       analyserData = new Float32Array(analyserNode.fftSize);

//       gainNode.connect(analyserNode);
//       gainNode.connect(audioCtx.destination);
//     }
//   }

//   async function playSound() {
//     await loadSound();
//     if (!audioCtx) return void 0;

//     await audioCtx.resume();

//     const src = audioCtx.createBufferSource();
//     src.connect(gainNode as GainNode);

//     src.buffer = audioBuffer;
//     src.start(0);
//   }
// }

// export default function Audio01() {
//   const p5ContainerRef = useRef(null);

//   useEffect(() => {
//     let p5Instance: P5;
//     if (p5ContainerRef.current) {
//       p5Instance = new P5(sketch, p5ContainerRef.current);
//     }
//     return () => {
//       if (p5Instance) {
//         p5Instance.remove();
//       }
//       p5ContainerRef.current = null;
//     };
//   }, []);

//   return <div ref={p5ContainerRef} />;
// }

export default function Audio01() {
  return <div></div>;
}
