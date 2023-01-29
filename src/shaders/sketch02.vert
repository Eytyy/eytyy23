varying vec2 vUv;
uniform float time;

#pragma glslify: noise = require('glsl-noise/simplex/4d');

void main() {
  vUv = uv;
  vec3 pos = position;
  pos += 0.1 * normal * noise(vec4(pos * 10.0, 0.0));
  pos += 0.25 * normal * noise(vec4(pos * 2.0, 0.0));
  pos += 0.05 * normal * noise(vec4(pos * 100.0, time));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}