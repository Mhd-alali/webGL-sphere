varying vec2 vUv;
varying vec3 vNormal;
varying mat3 vNormalMatrix;
#define PI   3.1415926535897932384626433832795
#define PI_2 1.57079632679489661923
#define PI_4 0.785398163397448309616

uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;

varying float vElevation;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.232))) * 43758.5432123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}

void main() {
    float strength =  vElevation + .5;
    gl_FragColor = vec4(strength, strength, strength, 1.0);
}