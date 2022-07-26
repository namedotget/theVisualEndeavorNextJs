const fragment = `
uniform float u_time;
varying vec2 vUv;
#include <fog_pars_fragment>


float box(vec3 p, vec3 s) {
    p=abs(p)-s*clamp(sin(u_time*0.1),0.1,0.6);
    return max(p.x,min(p.y*p.z,p.z));
}

mat2 rot(float a){
    float ca=cos(a);
    float sa=sin(a);
    return mat2(ca,sa,-sa,ca);
}

vec3 kifs(vec3 p, float t) {
    float s=3.64;
    float i = 0.0;
    for(i=0.0; i<17.0; ++i) {
    p.xy *= rot(t);
    p.yz *= rot(t*1.2);
    p=abs(p);
    p-=s;
    s*=0.95;
    }
    return p;
}

float map(vec3 p){
    vec3 p1 = kifs(p, u_time * 0.03);
    float d = box(p1*0.8, vec3(1.0));
    
    return d;

}

void cam(inout vec3 p){
    float t=u_time*0.0;
    p.xz *= rot(t*0.7);
    p.xy *= rot(t*0.5);
}




void main(){
    vec2 uv = -1.0 + 2.0 * vUv;
    // vec2 uv = -1.0 + 2.0 * vec2(vUv.y/vUv.x, 1);
    // uv /= vec2(vUv.y/vUv.x, 1);

    vec4 col = vec4(0.0, 0.0, sin(uv.x*uv.y+u_time*0.5), 1.0);
    vec3 s = vec3(0.0,0.0,-80.0);
    vec3 r = normalize(vec3(-uv,1.0));
    vec3 p=s;
    float i=0.0;
    
    for(i=0.0;i<100.0;++i){
        float d=map(p);
        if(d<0.001){
            break;
        }
        
        p += r * d;
    }
    col += pow(1.0-i/100.0,8.0)*2.0;
    col.z += 0.5;
    col.x *= sin(uv.x*uv.y); 
    gl_FragColor = vec4(
        col);
    #include <fog_fragment>
}
`;
export default fragment;
