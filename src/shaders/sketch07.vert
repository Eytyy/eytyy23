varying vec2 vUv;
uniform float playhead;

#pragma glslify: noise = require('glsl-noise/simplex/4d');

void main () {
  vUv = uv;
  vec3 pos = position;
  pos += 0.2 * normal * noise(vec4(pos * 3.0, playhead));
  pos += 0.25 * normal * noise(vec4(pos * 1.0, 0.0));
  pos += 0.05 * normal * noise(vec4(pos * 1.0, playhead));

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}