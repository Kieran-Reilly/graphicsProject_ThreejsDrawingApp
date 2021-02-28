import {CircleGeometry} from "/node_modules/three/src/geometries/CircleGeometry.js";
import {MeshPhongMaterial} from "/node_modules/three/src/materials/MeshPhongMaterial.js";
import {Mesh} from "/node_modules/three/src/objects/Mesh.js";

export class Particle {
    constructor(sceneObj, x, y, colour) {
        this.scene = sceneObj;
        this.x = x < this.scene.camera.right ? x - this.scene.camera.right : x + this.scene.camera.left;
        this.y = y < this.scene.camera.top ? -y + this.scene.camera.top : -y - this.scene.camera.bottom;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.colour = 'hsl(' + colour + ', 100%, 50%)';
    }

    dispose() {
        this.x = null;
        this.y = null;
        this.size = null;
        this.speedX = null;
        this.speedY = null;
        this.colour = null;
    }

    draw() {
        this.scene.light.target = this.createdParticle;
    }

    update() {
        this.createdParticle.position.x += this.speedX;
        this.createdParticle.position.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    addParticle() {
        const geometry = new CircleGeometry(this.size);
        const material = new MeshPhongMaterial({color: this.colour});
        const particle = new Mesh(geometry, material);
        particle.position.x = this.x;
        particle.position.y = this.y;
        this.scene.scene.add(particle);
        this.createdParticle = particle;
        return this;
    }

}