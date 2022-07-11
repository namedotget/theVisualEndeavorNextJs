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

  
    vec3 s = vec3(0.0,5.0,-30.0);
    vec3 r = normalize(vec3(-uv,1.0));
    cam(s);
    cam(r);
    
    vec3 p=s;
    float i=0.0;
    
    for(i=0.0;i<100.0;++i){
        float d=map(p);
        if(d<0.001){
            break;
        }
        
        p += r * d;
    }
    col += pow(1.0-i/100.0,8.0);
    
    col.xy += sin(uv+u_time)*0.45;
    col.xz += cos(uv+u_time)*0.2;
    col.zy += sin(uv+-u_time)*0.25;
    col.z = clamp(sin(uv.x*uv.y-u_time*0.05),0.5,1.0);
    
    
    
    gl_FragColor = vec4(
        col,
        1.0);
    
    float gamma = 3.1;
    
    #include <fog_fragment>
    gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(1.0/gamma));

}
`;
export default fragment;
