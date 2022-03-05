import emailjs from '@emailjs/browser';
import{ init } from '@emailjs/browser';
init("user_4AtxMgTsmU9RsnzhIN1z1");
import './style.css'

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
    delay: 0.5,
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
    delay: 0.5,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.2,
    y: 50
}, 1.5)

tl.to('.hidetext', {
    color: '#E63946',
    delay: 0.5
}, 1.5)

tl.to('.hide-phone-holder', {
    x: '100vw',
    delay: 0.5,
    duration: 4
}, 1.5)


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




const onSubmit = (e) => {
    e.preventDefault();
    let templateParams = {
        name: name.value,
        lastname: lastname.value,
        subject: subject.value,
        textarea: textarea.value,
        email: email.value
    };
    emailjs.send('service_ro80pyo', 'template_7ywl66f', templateParams)
        .then((res) => {
            alert('Email Sent Successfully');
        })
        .catch((err) => {
            console.log(err)
        })
}

// contact form
const form = document.querySelector('form');
const name = document.querySelector('#name');
const lastname = document.querySelector('#lastname');
const subject = document.querySelector('#subject');
const textarea = document.querySelector('#textarea');
const email = document.querySelector('#email');

// desktop nav links
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
form.addEventListener('submit', onSubmit);