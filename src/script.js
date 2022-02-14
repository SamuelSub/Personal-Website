import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

gsap.registerPlugin(ScrollTrigger, scrollTo);
// Debug
// const gui = new dat.GUI()
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()

let tl = gsap.timeline();

tl.to('.loading', {
    y: '-100%',
    delay: 1.2,
    duration: 1
}, 0)


tl.from('.hidetext', {
    delay: .5,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.2,
    y: 100
}, 1.5)

tl.from('nav', {
    delay: 0.5,
    duration: 1,
    ease: 'power4.out',
    y: -100
}, 1.5)

tl.from('.hidebutton', {
    delay: 1,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.2,
    y: 50
}, 1.5)

tl.to('.hidetext', {
    color: '#E63946',
    delay: 0.7
}, 1.5)


// Loader
const loader = new GLTFLoader();

let laptop;

loader.load('newPhone.glb', (glb) => {
    laptop = glb;
    scene.add(glb.scene)
    if(window.innerWidth >= 600) {
        tl.to(glb.scene.position, {
            duration: 1.5,
            z: 3.5,
            x: 4
        }, 1.5);
        tl.to(glb.scene.rotation, {
            duration: 1.5,
            y: 2.7,
        }, 1.5)
    }
    if(window.innerWidth <= 600) {
        gsap.to(glb.scene.position, {
            duration: 1.5,
            z: -1,
            x: 0.7,
            y: 1.5
        }, 1.5)
        gsap.to(glb.scene.rotation, {
            duration: 1.5,
            y: 2.8
        }, 1.5)
    } else {
        glb.scene.position.x = 5
    }
}, undefined, (err) => {
    console.error(err);
})

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(2, 0, 10);
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
camera.position.z = 12

scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas);

const seeMyWork = () => {
    gsap.to(window, {
        scrollTo: '.portfolio',
        duration: 0.8
    })
}

const laptopAnimation = () => {
    if(sizes.width >= 600) {
        laptop.scene.position.y = scrollY * 0.003
    } 
    
    gsap.to('.hidetext', {
        y: `${scrollY * 0.003}em`
    });
    gsap.to('.hidebutton', {
        y: `${scrollY * 0.005}em`
    })
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

const btn = document.querySelector('.hidebutton');
const ulBtn = document.querySelector('.portfolio-link');
document.addEventListener('scroll', laptopAnimation);
btn.addEventListener('click', seeMyWork);
ulBtn.addEventListener('click', seeMyWork)

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