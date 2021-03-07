import {WebGLRenderTarget} from "./../node_modules/three/src/renderers/WebGLRenderTarget.js";
import {OrthographicCamera} from "./../node_modules/three/src/cameras/OrthographicCamera.js";
import {Scene} from "./../node_modules/three/src/scenes/Scene.js";
import {Color} from "./../node_modules/three/src/math/Color.js";
import {DirectionalLight} from "./../node_modules/three/src/lights/DirectionalLight.js";
import {CircleGeometry} from "./../node_modules/three/src/geometries/CircleGeometry.js";
import {MeshBasicMaterial} from "./../node_modules/three/src/materials/MeshBasicMaterial.js";
import {Mesh} from "./../node_modules/three/src/objects/Mesh.js"
import {LinearFilter, NearestFilter, AlphaFormat, RGBAFormat} from "./../node_modules/three/src/constants.js";

export class CircleTexture {
    constructor(width, height, cameraProperties, sceneBackground, lightProperties, circleTextureProperties) {
        this.width = width || 32;
        this.height = height || 32;
        this.renderTarget = new WebGLRenderTarget(this.width, this.height, {minFilter: LinearFilter, magFilter: NearestFilter, format: RGBAFormat});

        //defining camera
        this.initCamera(cameraProperties);

        //defining scene
        this.initScene(sceneBackground);

        //defining light
        this.initLight(lightProperties)

        //define circle to be rendered as texture
        this.initCircleTexture(circleTextureProperties);

        // this.sceneObj = {
        //     scene: this.scene,
        //     light: this.light,
        //     camera: this.camera,
        //     renderTarget: this.renderTarget,
        //     circle: this.circle
        // }
    }

    initCamera(cameraProperties) {
        this.cameraProperties = cameraProperties || {
            left: -this.width/2,
            right: this.width/2,
            top: this.height/2,
            bottom: -this.height/2,
            near: 0.1,
            far: 1000,
            zPosition: 5
        }

        this.camera = new OrthographicCamera(this.cameraProperties.left, this.cameraProperties.right, this.cameraProperties.top, this.cameraProperties.bottom, this.cameraProperties.near, this.cameraProperties.far);
        this.camera.position.z = this.cameraProperties.zPosition || 5;
    }

    initScene(sceneBackground) {
        this.scene = new Scene();
        this.scene.background = sceneBackground || new Color('black');
    }

    initLight(lightProperties) {
        this.lightProperties = lightProperties || {
            x: 5,
            y: 5,
            z: 7.5,
            color: 0xffffff,
            intensity: -1.0
        }

        this.light = new DirectionalLight(this.lightProperties.color, this.lightProperties.intensity);
        this.light.position.set(this.lightProperties.x, this.lightProperties.y, this.lightProperties.z)

        this.scene.add(this.light);
    }

    initCircleTexture(circleTextureProperties) {
        this.circleTextureProperties = circleTextureProperties || {
            x: 0,
            y: 0,
            radius: 5,
            segments: 32,
            colour: 0xffffff
        }

        const circleGeom = new CircleGeometry(this.circleTextureProperties.radius, this.circleTextureProperties.segments);
        const circleMaterial = new MeshBasicMaterial({color: this.circleTextureProperties.colour});

        this.circle = new Mesh(circleGeom, circleMaterial);
        this.circle.position.x = this.circleTextureProperties.x;
        this.circle.position.y = this.circleTextureProperties.y;

        this.scene.add(this.circle);
    }
}