import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

gsap.registerPlugin(ScrollTrigger, scrollTo);
// Debug
const gui = new dat.GUI()
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()

let tl = gsap.timeline();

tl.to('.loading', {
    opacity: 0,
    delay: 1,
    duration: 0.5
}, 0)

tl.from('.hidetext', {
    delay: .5,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.2,
    y: 100
}, 1)

tl.to('.hidetext', {
    color: '#E63946',
    delay: 0.7
}, 1)


// Loader
const loader = new GLTFLoader();

let laptop;

loader.load('phone.glb', (glb) => {
    laptop = glb;
    scene.add(glb.scene)
    tl.to(glb.scene.position, {
        duration: 1.5,
        z: 3.5,
        x: 4
        // x: 0.2,
        // y: -0.4
    }, 1);
    tl.to(glb.scene.rotation, {
        duration: 1.5,
        y: 2.7,
    }, 1)
    if(window.innerWidth <= 600) {
        glb.scene.position.x = 0
        glb.scene.position.z = -5
        glb.scene.position.y = 0
    } else {
        glb.scene.position.x = 5
    }
}, undefined, (err) => {
    console.error(err);
})

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(2, 0, 10);
// gui.add(pointLight.position, 'x').min(0).max(100)
// gui.add(pointLight.position, 'y').min(0).max(100)
// gui.add(pointLight.position, 'z').min(0).max(100)
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 10
// camera.position.y = 2
camera.position.z = 12
// camera.position.set(0, 3, 10);
// camera.up.set(0, 5, 5)
// camera.lookAt(0, 0, 0);

scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas);

const laptopAnimation = () => {
    laptop.scene.position.y = scrollY * 0.003
    gsap.to('.hidetext', {
        y: `${scrollY * 0.003}em`
    });
    gsap.to('.portfolio', {
        y: `${scrollY * -0.003}em`
    })
}

// CARD 1
gsap.to('.card-1', {
    scrollTrigger: {
        trigger: '.card-1',
        scrub: 1
    },
    scale: 1.2
})

gsap.to('.hide-card-1-col', {
    scrollTrigger: {
        trigger: '.hide-card-1-col',
        scrub: 7
    },
    x: '-100vw'
})

gsap.to('.hide-card-1-col-2', {
    scrollTrigger: {
        trigger: '.hide-card-1-col-2',
        scrub: 7
    },
    x: '100vw'
})

// CARD 2
gsap.to('.card-2', {
    scrollTrigger: {
        trigger: '.card-2',
        scrub: 1
    },
    scale: 1.2
})

gsap.to('.hide-card-2-col', {
    scrollTrigger: {
        trigger: '.hide-card-2-col',
        scrub: 5
    },
    x: '-100vw'
})

gsap.to('.hide-card-2-col-2', {
    scrollTrigger: {
        trigger: '.hide-card-2-col-2',
        scrub: 5
    },
    x: '100vw'
})

// CARD 3
gsap.to('.card-3', {
    scrollTrigger: {
        trigger: '.card-3',
        scrub: 1
    },
    scale: 1.2
})

gsap.to('.hide-card-3-col', {
    scrollTrigger: {
        trigger: '.hide-card-3-col',
        scrub: 5
    },
    x: '-100vw'
})

gsap.to('.hide-card-3-col-2', {
    scrollTrigger: {
        trigger: '.hide-card-3-col-2',
        scrub: 5
    },
    x: '100vw'
})

document.addEventListener('scroll', laptopAnimation);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital 
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()