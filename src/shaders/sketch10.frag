#pragma glslify: noise = require('glsl-noise/simplex/3d');

varying vec3 vPosition;
varying vec2 vUv;

uniform vec3 color;
uniform float time;

uniform vec3 points[POINT_COUNT];

void main () {
  float dist = 10000.0;

  for (int i = 0; i < POINT_COUNT; i++) {
    vec3 p = points[i];
    float d = distance(vPosition, p);
    dist = min(d, dist);
  }

  float mask = step(0.2, dist);
  mask = 1.0 - mask;

  vec3 fragColor = mix(color, vec3(1.0), mask);

  gl_FragColor = vec4(vec3(fragColor), 1.0);
}