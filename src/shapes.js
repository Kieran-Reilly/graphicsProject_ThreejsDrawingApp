import {BoxGeometry}  from "/node_modules/three/src/geometries/BoxGeometry.js";
import {MeshPhongMaterial} from "/node_modules/three/src/materials/MeshPhongMaterial.js";
import {Mesh} from "/node_modules/three/src/objects/Mesh.js";

export function addCube(sceneObj, color) {
    const geometry = new BoxGeometry();
    const material = new MeshPhongMaterial({color: color});
    const cube = new Mesh(geometry, material);
    sceneObj.scene.add(cube);
    return cube;
}