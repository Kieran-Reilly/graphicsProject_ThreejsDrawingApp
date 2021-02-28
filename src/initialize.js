import {Scene}  from "/node_modules/three/src/scenes/scene.js";
import {PerspectiveCamera} from '/node_modules/three/src/cameras/PerspectiveCamera.js';
import {WebGLRenderer} from '/node_modules/three/src/renderers/WebGLRenderer.js';
import {DirectionalLight} from '/node_modules/three/src/lights/DirectionalLight.js';
import {AmbientLight} from '/node_modules/three/src/lights/AmbientLight.js';

export function initialize(cameraPosition, rendererParameters, lightProperties) {
    const result = {
        scene: new Scene(),
        light: new DirectionalLight(lightProperties.color, lightProperties.intensity),
        ambient: new AmbientLight(0x404040),
        camera: new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
        renderer: new WebGLRenderer(rendererParameters)
    }

    result.light.position.x = lightProperties.x;
    result.light.position.y = lightProperties.y;
    result.light.position.z = lightProperties.z;

    result.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(result.renderer.domElement);

    result.camera.position.z = cameraPosition.z;

    result.scene.add(result.light);
    result.scene.add(result.ambient);

    return result;
}
