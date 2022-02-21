import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Debug
// const gui = new dat.GUI()
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()

let tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger, scrollTo);

window.addEventListener('load', (e) => {
    console.log('ready')
})

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
    if(window.innerWidth >= 660) {
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
    
    if(window.innerWidth < 660) {
        gsap.to(glb.scene.position, {
            duration: 1.5,
            z: 0,
            x: 0.5,
            y: 1.5
        }, 1.5)

        gsap.to(glb.scene.rotation, {
            duration: 1.5,
            y: 2.8
        }, 1.5)

    } else {
        console.log(window.innerWidth);
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

const seeMyWork = (e) => {
    gsap.to(window, {
        scrollTo: '.portfolio',
        duration: 0.8
    })
    if(e.target.innerHTML === 'My Work' || 'Portfolio' && window.innerWidth >= 670) {
        return
    } else {
        clickedNavigation();
    }
}

const skills = (e) => {
    gsap.to(window, {
        scrollTo: {
            y: '.skills'
        },
        duration: 1.2
    })
    if(e.target.innerHTML === 'Skills' && window.innerWidth >= 670) {
        return
    } else {
        clickedNavigation();
    }
}

const about = (e) => {
    gsap.to(window, {
        scrollTo: {
            y: '.about'
        },
        duration: 1.5
    })
    if(e.target.innerHTML === 'About' && window.innerWidth >= 670) {
        return
    } else {
        clickedNavigation();
    }
}

const contact = (e) => {
    gsap.to(window, {
        scrollTo: {
            y: '.contact'
        },
        duration: 1.8
    })
    if(e.target.innerHTML === 'Contact' && window.innerWidth >= 670) {
        return
    } else {
        clickedNavigation();
    }
}

let clicked = false;
let openMobileNavTl = gsap.timeline();
let closeMobileNavTl = gsap.timeline();
// Mobile nav
const clickedNavigation = (e) => {
    if(!clicked) {
        clicked = true
        openMobileNavTl.to('.mobile-nav-holder', {
            display: 'block',
            backgroundColor: 'white',
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
            duration: 0.5
        });
        openMobileNavTl.to('.mobile-nav-holder ul', {
            display: 'grid',
            x: 0
        })
    } else {
        clicked = false
        closeMobileNavTl.to('.mobile-nav-holder ul', {
            x: '-100vw',
            display: 'none',
            duration: 0.5
        })
        closeMobileNavTl.to('.mobile-nav-holder', {
            height: '-100vh',
            backgroundColor: 'rgb(243, 242, 242)',
            duration: 1
        })
    }
}

// Skills icons zooming in and out
gsap.to('.skills-wrapper', {
    scrollTrigger: {
        trigger: '.skills-wrapper',
        scrub: true
    },
    scale: 1.2
})
// About paragraph zooming in and out
gsap.to('.about p', {
    scrollTrigger: {
        trigger: '.about p',
        scrub: true
    },
    scale: 1.2
})
// Contact form zooming in and out
gsap.to('.contact form', {
    scrollTrigger: {
        trigger: '.contact form',
        scrub: true
    },
    scale: 1.2
})

// CARD 1
const firstCardTl = gsap.timeline();
firstCardTl.to('.card-1', {
    scrollTrigger: {
        trigger: '.card-1',
        scrub: 1
    },
    scale: 1.2
},0)

firstCardTl.to('.hide-card-1-col', {
    scrollTrigger: {
        trigger: '.hide-card-1-col',
        scrub: 7
    },
    x: '-100vw'
},0)

firstCardTl.to('.hide-card-1-col-2', {
    scrollTrigger: {
        trigger: '.hide-card-1-col-2',
        scrub: 7
    },
    x: '100vw'
},0)

// CARD 2
const secondCardTl = gsap.timeline();
secondCardTl.to('.card-2', {
    scrollTrigger: {
        trigger: '.card-2',
        scrub: 1
    },
    scale: 1.2
},0)

secondCardTl.to('.hide-card-2-col', {
    scrollTrigger: {
        trigger: '.hide-card-2-col',
        scrub: 5
    },
    x: '-100vw'
},0)

secondCardTl.to('.hide-card-2-col-2', {
    scrollTrigger: {
        trigger: '.hide-card-2-col-2',
        scrub: 5
    },
    x: '100vw'
},0)

// CARD 3
const thirdCardTl = gsap.timeline();
thirdCardTl.to('.card-3', {
    scrollTrigger: {
        trigger: '.card-3',
        scrub: 1
    },
    scale: 1.2
},0)

thirdCardTl.to('.hide-card-3-col', {
    scrollTrigger: {
        trigger: '.hide-card-3-col',
        scrub: 5
    },
    x: '-100vw'
},0)

thirdCardTl.to('.hide-card-3-col-2', {
    scrollTrigger: {
        trigger: '.hide-card-3-col-2',
        scrub: 5
    },
    x: '100vw'
},0)

const btn = document.querySelector('.hidebutton');
const ulBtn = document.querySelector('.portfolio-link');
const skillsBtn = document.querySelector('.skills-link');
const aboutBtn = document.querySelector('.about-link');
const contactBtn = document.querySelector('.contact-link');
const menuBtn = document.querySelector('.mobile-wrapper');
// Mobile nav links
const ulBtnMobile = document.querySelector('.mobile-nav-holder .portfolio-link');
const skillsBtnMobile = document.querySelector('.mobile-nav-holder .skills-link');
const aboutBtnMobile = document.querySelector('.mobile-nav-holder .about-link');
const contactBtnMobile = document.querySelector('.mobile-nav-holder .contact-link');
btn.addEventListener('click', seeMyWork);
ulBtn.addEventListener('click', seeMyWork);
skillsBtn.addEventListener('click', skills);
aboutBtn.addEventListener('click', about);
contactBtn.addEventListener('click', contact);
menuBtn.addEventListener('click', clickedNavigation);
ulBtnMobile.addEventListener('click', seeMyWork)
skillsBtnMobile.addEventListener('click', skills)
aboutBtnMobile.addEventListener('click', about)
contactBtnMobile.addEventListener('click', contact)

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