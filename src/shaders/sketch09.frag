#pragma glslify: noise = require('glsl-noise/simplex/3d');

varying vec2 vUv;
uniform vec3 color;
uniform float time;

void main () {
  vec2 center = vec2(0.5);

  vec2 q = vUv;
  q.x *= 2.0;

  vec2 pos = mod(q * 10.0, 1.0);

  float d = distance(pos, center);
  // float mask = d > 0.25 ? 1.0 : 0.0;
  // float mask = step( 0.25 + sin(vUv.x + time + 2.0) * 0.25, d);
  vec2 noiseInput = floor(q * 10.0);
  float offset = noise(vec3(noiseInput.xy, time)) * 0.1;
  float mask = step( 0.25 + offset, d);
  mask = 1.0 - mask;

  vec3 fragColor = mix(color, vec3(1.0), mask);
  gl_FragColor = vec4(vec3(fragColor), 1);
  // gl_FragColor = vec4(vec3(vUv.x), 1);
}