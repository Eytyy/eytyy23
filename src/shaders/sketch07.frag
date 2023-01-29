varying vec2 vUv;
uniform vec3 color;
uniform float playhead;

#pragma glslify: noise = require('glsl-noise/simplex/3d');

void main () {
  float offset = 0.1 * noise(vec3(vUv.xy * 1000.0, playhead));
  gl_FragColor = vec4(vec3(color * vUv.x + offset), 1.0);
}