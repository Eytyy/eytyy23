import { useEffect, useRef } from 'react';
import p5 from 'p5';

function sketch(p: p5) {
  let w = window.innerWidth;
  let h = window.innerHeight;

  // p is a reference to the p5 instance this sketch is attached to
  p.setup = function () {
    p.createCanvas(w, h);
    p.background(0);
    p.circle(w / 2, h / 2, w / 2);
  };

  p.draw = function () {
    // your draw code here
    p.clear();
    p.fill('red');
    p.background(0);
    p.circle(w / 2, h / 2, w / 3);
  };

  p.windowResized = function () {
    w = window.innerWidth;
    h = window.innerHeight;
    p.resizeCanvas(w, h);
    p.draw();
  };
}

export default function P5Example() {
  // create a reference to the container in which the p5 instance should place the canvas
  const p5ContainerRef = useRef(null);

  useEffect(() => {
    let p5Instance: p5;
    // On component creation, instantiate a p5 object with the sketch and container reference
    if (p5ContainerRef.current && window) {
      p5Instance = new p5(sketch, p5ContainerRef.current);
    }

    // On component destruction, delete the p5 instance
    return () => {
      console.log('clean');
      p5Instance.remove();
      p5ContainerRef.current = null;
    };
  }, []);

  return <div ref={p5ContainerRef} />;
}
