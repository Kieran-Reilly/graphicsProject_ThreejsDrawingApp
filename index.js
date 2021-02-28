import {initialize} from "./src/initialize.js";
import {addCube} from "./src/shapes.js";

const cameraLocation = {z: 5}
const rendererParameters = {antialias: true} // see WebGLRendererParameters
const lightProperties = {
    x: 5,
    y: 5,
    z: 7.5,
    color: 0xffffff,
    integrity: 1.0
}

const sceneObj = initialize(cameraLocation, rendererParameters, lightProperties);
const cube = addCube(sceneObj, 0xff0080);

sceneObj.light.target = cube;

const animate = () => {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    sceneObj.renderer.render(sceneObj.scene, sceneObj.camera);
}

animate();