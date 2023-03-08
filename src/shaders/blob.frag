#pragma glslify: noise = require('glsl-noise/simplex/3d');
varying vec2 vUv;
uniform vec3 color;
uniform float time;

void main () {
  vec2 center = vec2(0.5, 0.5);
  // vec2 pos = vUv;
  vec2 q = vUv;
  q.x *= 2.0;
  vec2 pos = mod(q * 10.0, 1.0);
  float d = distance(pos, center);
  // float mask = d > 0.25 ? 1.0 : 0.0;
  // float mask = step(0.25, d);
  // float mask = step(0.25 + sin(time + vUv.x * 0.2), d);
  // float mask = step(0.25 + sin(time + vUv.x * 10.5) * 0.2, d);

  // camoflauge
  vec2 noiseInput = q * 10.0;
  // vec2 noiseInput = floor(q * 10.0);
  // camoflauge
  float offset = noise(vec3(noiseInput * 5.0, time));
  // float offset = noise(vec3(noiseInput, time)) * 0.25;
  float mask = step(0.25 + offset, d);
  mask = 1.0 - mask;

  gl_FragColor = vec4(vec3(mask + sin(time),mask + sin(time), mask + sin(time) ) * color, 1.0);
  // vec3 fragColor = mix(color, vec3(1.0), mask);
  // gl_FragColor = vec4(vec3(fragColor), 1.0);
}
