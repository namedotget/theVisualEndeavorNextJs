const fragment = `
uniform float u_time;
varying vec2 vUv;
#include <fog_pars_fragment>


float box(vec3 p, vec3 s) {
    p=abs(p)-s*0.5;
    return max(p.x,max(p.y,p.z));
}

mat2 rot(float a){
    float ca= cos(a);
    float sa= sin(a);
    return mat2(ca,sa,-sa,ca);
}

vec3 kifs(vec3 p, float t) {
    float s=2.20;
    float i = 0.0;
    for(i = 0.0; i<3.14159; ++i) {
   p.xy *= rot(t);
    p=abs(p);
    p-=s;
    }
    return p;
}

float map(vec3 p){
    vec3 p1 = kifs(p, u_time * 0.01);
    float d = box(p1, vec3(5.0));
    
    return d;

}

void cam(inout vec3 p){
    float t=u_time*0.105;
    p.xz *= rot(t*0.7);
    p.xy *= rot(t);
}


void main(){
    vec2 uv = -1.0 + 2.0 * vUv;
    vec3 col = vec3(0.0,0.0,0.4);

  
    
    
   
    
    gl_FragColor = vec4(
        col,
        1.0);
    
    #include <fog_fragment>
}
`;
export default fragment;
