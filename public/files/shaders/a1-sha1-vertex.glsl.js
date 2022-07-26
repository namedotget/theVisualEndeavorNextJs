const vertex = `
varying vec2 vUv;
#include <fog_pars_vertex>
void main(){
    #include <begin_vertex>
    #include <project_vertex>
    #include <fog_vertex>

    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export default vertex;
