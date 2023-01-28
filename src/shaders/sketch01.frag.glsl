 precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  #pragma glslify: noise = require('glsl-noise/simplex/3d');
  #pragma glslify: hsl2rgb = require('glsl-hsl2rgb');

  void main () {
    // vec3 colorA = sin(time) + vec3(1.0, 0.0, 0.0);
    // vec3 colorB = vec3(0.0, 0.0, 1.0);

    vec2 center = vUv - 0.5;
    center.x *= aspect;
    float dist = length(center);
    float alpha = smoothstep(0.2555, 0.25, dist);

    // vec3 color = mix(colorA, colorB, vUv.x + vUv.y * sin(time));
    float n = noise(vec3(vUv.xy * 2.0, time * 0.2));
    vec3 color = hsl2rgb(1.9 + n * 0.2, 1.0, 0.5);

    gl_FragColor = vec4(color, alpha);
  }