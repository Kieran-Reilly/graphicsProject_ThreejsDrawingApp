import {initialize} from "./src/initialize.js";
import {Particle} from "./src/particle.js";
import {Vector3} from "/node_modules/three/src/math/Vector3.js";
import {LineBasicMaterial} from "/node_modules/three/src/materials/LineBasicMaterial.js";
import {BufferGeometry} from "/node_modules/three/src/core/BufferGeometry.js";
import {Line} from "/node_modules/three/src/objects/Line.js"

//init scene
const canvasContainer = document.querySelector("#canvas-container");
const rect = canvasContainer.getBoundingClientRect();
const cameraLocation = {z: 5,  viewWidth: rect.width, viewHeight: rect.height}
const rendererParameters = {antialias: true} // see WebGLRendererParameters
const lightProperties = {
    x: 5,
    y: 5,
    z: 7.5,
    color: 0xffffff,
    integrity: -1.0
}
const mouseHandler = {
    x: null,
    y: null
}
const particles = [];
let hue = 0;
const lineMaterial = new LineBasicMaterial({color: 'hsl(' + hue + ', 100%, 50%)'});


const sceneObj = initialize(cameraLocation, rendererParameters, lightProperties, canvasContainer);

sceneObj.renderer.domElement.addEventListener('click', async function (event) {
    mouseHandler.x = event.x;
    mouseHandler.y = event.y;
    for (let i = 0; i < 10; i++) {
        const particle = new Particle(sceneObj, mouseHandler.x, mouseHandler.y, hue);
        particles.push(particle.addParticle());
        particle.draw();
    }
});

sceneObj.renderer.domElement.addEventListener('mousemove', async function (event) {
    mouseHandler.x = event.x;
    mouseHandler.y = event.y;
    for (let i = 0; i < 3; i++) {
        const particle = new Particle(sceneObj, mouseHandler.x, mouseHandler.y, hue);
        particles.push(particle.addParticle());
    }
});

function particlesHandler() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        //connecting particles if they are within a certain range of each other
        // for (let j = i; j < particles.length; j++) {
        //     const dx = particles[i].createdParticle.position.x - particles[j].createdParticle.position.x;
        //     const dy = particles[i].createdParticle.position.y - particles[j].createdParticle.position.y;
        //     const distance = Math.sqrt(dx * dx + dy * dy);
        //     if (distance < 20) {
        //         const points = [];
        //         points.push(new Vector3(particles[i].createdParticle.position.x, particles[i].createdParticle.position.y, 0));
        //         points.push(new Vector3(particles[j].createdParticle.position.x, particles[j].createdParticle.position.y, 0));
        //         const geometry = new BufferGeometry().setFromPoints(points);
        //         const line = new Line(geometry, lineMaterial);
        //         sceneObj.scene.add(line);
        //     }
        // }

        if (particles[i].size <= 0.3) {
            sceneObj.scene.remove(particles[i].createdParticle);
            particles.splice(i, 1);
            i--;
        }
    }
}

const animate = () => {
    requestAnimationFrame(animate);

    particlesHandler();
    hue++;
    sceneObj.renderer.render(sceneObj.scene, sceneObj.camera);
}

animate();