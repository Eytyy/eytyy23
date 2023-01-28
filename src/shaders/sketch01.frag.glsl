 precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  #pragma glslify: noise = require('glsl-noise/simplex/3d');
  #pragma glslify: hsl2rgb = require('glsl-hsl2rgb');

  void main () {

    vec2 center = vUv - 0.5;
    center.x *= aspect;

    float n = noise(vec3(center * 20.0, time));
    vec3 color = hsl2rgb(n, 0.8, 0.5);

    gl_FragColor = vec4(color, 1.0);
  }