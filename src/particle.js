import {CircleGeometry} from "/node_modules/three/src/geometries/CircleGeometry.js";
import {MeshPhongMaterial} from "/node_modules/three/src/materials/MeshPhongMaterial.js";
import {Mesh} from "./../node_modules/three/src/objects/Mesh.js";
import {DoubleSide} from "./../node_modules/three/src/constants.js";
import {MeshBasicMaterial} from "./../node_modules/three/src/materials/MeshBasicMaterial.js";
import {PlaneGeometry} from "./../node_modules/three/src/geometries/PlaneGeometry.js";

export class Particle {
    constructor(sceneObj, x, y, colour, texture) {
            this.scene = sceneObj;
            this.x = x < this.scene.camera.right ? x - this.scene.camera.right : x + this.scene.camera.left;
            this.y = y < this.scene.camera.top ? -y + this.scene.camera.top : -y - this.scene.camera.bottom;
            this.size = Math.random() * 50 + 10;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.colour = 'hsl(' + colour + ', 100%, 50%)';
            this.texture = texture;
    }

    addParticle() {
            const geometry = new PlaneGeometry(this.size/2, this.size/2);
            const material = new MeshBasicMaterial({color: this.colour, alphaMap: this.texture, transparent: true, depthWrite:false, depthTest: false});
            const particle = new Mesh(geometry, material);
            particle.position.x = this.x;
            particle.position.y = this.y;
            this.scene.scene.add(particle);
            this.createdParticle = particle;
            return this;
    }

    update() {
        this.createdParticle.position.x += this.speedX;
        this.createdParticle.position.y += this.speedY;
        if (this.createdParticle.scale.x > 0.1) {
            this.createdParticle.scale.x -= 0.02;
            this.createdParticle.scale.y -= 0.02;
        }
    }

    // constructor(sceneObj, x, y, colour) {
    //     this.scene = sceneObj;
    //     this.x = x < this.scene.camera.right ? x - this.scene.camera.right : x + this.scene.camera.left;
    //     this.y = y < this.scene.camera.top ? -y + this.scene.camera.top : -y - this.scene.camera.bottom;
    //     this.size = Math.random() * 5 + 1;
    //     this.speedX = Math.random() * 3 - 1.5;
    //     this.speedY = Math.random() * 3 - 1.5;
    //     this.colour = 'hsl(' + colour + ', 100%, 50%)';
    // }
    //
    // dispose() {
    //     this.x = null;
    //     this.y = null;
    //     this.size = null;
    //     this.speedX = null;
    //     this.speedY = null;
    //     this.colour = null;
    // }
    //
    // draw() {
    //     this.scene.light.target = this.createdParticle;
    // }
    //
    // update() {
    //     this.createdParticle.position.x += this.speedX;
    //     this.createdParticle.position.y += this.speedY;
    //     if (this.size > 0.2) this.size -= 0.1;
    // }
    //
    // addParticle() {
    //     const geometry = new CircleGeometry(this.size);
    //     const material = new MeshPhongMaterial({color: this.colour});
    //     const particle = new Mesh(geometry, material);
    //     particle.position.x = this.x;
    //     particle.position.y = this.y;
    //     this.scene.scene.add(particle);
    //     this.createdParticle = particle;
    //     return this;
    // }
}