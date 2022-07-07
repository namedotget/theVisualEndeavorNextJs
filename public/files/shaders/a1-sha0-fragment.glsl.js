const fragment = `
uniform float u_time;
uniform float u_var;
uniform vec3 u_meshR;
varying vec2 vUv;


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
    float s=4.20;
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
    float d = box(p1, vec3(5));
    
    return d;

}


void main(){
    
    vec3 col = vec3(0.0);
    vec3 s = vec3(0.0,0.1,-30.0);
    vec3 r = normalize(vec3(-vUv,1));
    r /= vec3(vUv.x/vUv.y, 1, 1);
    
    vec3 p=s;
    float i=0.0;
    
    for(i=0.0;i<50.0;++i){
        float d=map(p);
        if(d<0.001){
            break;
        }
        
        p += r * d;
        p += d;
    }
    col += pow(1.0-i/100.0,8.0);
    
    col.x += 0.2;
    col.z += sin(vUv.x*vUv.y + u_time);
    
    
    gl_FragColor = vec4(
        col,
        1.0);
}
`;
export default fragment;
