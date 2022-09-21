uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;
varying mat3 vNormalMatrix;
varying float vElevation;

#define PI   3.1415926535897932384626433832795

void main() {
    float strength =  vElevation;
    gl_FragColor = vec4(strength, strength, strength, 1.0);
}