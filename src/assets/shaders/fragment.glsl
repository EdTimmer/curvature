precision mediump float;

varying vec2 vUv;

void main() {
  vec3 color = vec3(0.0, vUv.x, vUv.y);
  
  gl_FragColor = vec4(color, 1.0);

  #include <colorspace_fragment>    
}