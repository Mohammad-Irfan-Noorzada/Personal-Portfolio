/* -------- Show Menu -------- */
const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

/* -------- Menu Show -------- */
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
};

/* -------- Menu Hidden -------- */
/* Validate if constant exsist */
if(navClose){
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
};

/* -------- Remove Minu Mobile -------- */
const navLink = document.querySelectorAll(".nav__link");
navLink.forEach((n) => n.addEventListener("click", linkAction));

    // When we click on each nav__link, we remove the show-menu class
function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show-menu");
};


/* -------- Typing Animation -------- */
const typedTextSpan = document.querySelector(".typing");

const textArray = ["JS Developer.", "Web Designer.", "Web Specialist."];
let textArrayIndex = 0;

function typeNext() {
    typedTextSpan.textContent = "";
    let charIndex = 0;
    const currentText = textArray[textArrayIndex];

    function typeChar() {
        if (charIndex < currentText.length) {
            typedTextSpan.textContent += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 100);
        } else {
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(typeNext, 2000);
        }
    } 
    typeChar();
}
document.addEventListener("DOMContentLoaded", () => { // This waits until the HTML is fully loaded before starting the animation.
    typeNext();
});


/* -------- Scroll Sections Active Link -------- */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 60;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".nav__link[href*=" + sectionId + "]").classList.add("nav__active-link");
        } else {
            document.querySelector(".nav__link[href*=" + sectionId + "]").classList.remove("nav__active-link");
        }
    });
}

window.addEventListener("scroll", scrollActive);


/* -------- Change Background Header -------- */
function scrollHeader() {
    const header = document.getElementById("header");
    // When the scroll is greater than 80 viewport height, add the scroll - header class to header tag
    if(this.scrollY >= 80) header.classList.add("scroll-header");
    else header.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);


/* -------- Show Scroll Up -------- */
function scrollUp() {
    const scrollUp = document.getElementById("scroll-up");
    // When the scroll is greater than 700 viewport height, add the show-scroll class to scroll-top class
    if(this.scrollY >= 700) scrollUp.classList.add("show-scroll");
    else scrollUp.classList.remove("show-scroll");
}

window.addEventListener("scroll", scrollUp);


/* -------- About Tabs -------- */
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]');


tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach((tabContent) => {
            tabContent.classList.remove('tabs__active-tabs');
        });

        target.classList.add('tabs__active-tabs');

        tabs.forEach((tab) => {
            tab.classList.remove('tabs__active-tab');
        });

        tab.classList.add('tabs__active-tab');
    });
});


/* -------- Contact Form -------- */
const contactForm = document.getElementById("contact-form"),
    contactName = document.getElementById("contact-name"),
    contactEmail = document.getElementById("contact-email"),
    contactSubject = document.getElementById("contact-subject"),
    contactMessage = document.getElementById("contact-message"),
    errorMessage = document.getElementById("error-message");
    
    const sendEmail = (e) => {
    e.preventDefault(); // prevents the page to refresh after sending the form.

    // Check if the field doesn't have a value
    if(contactName.value === '' ||
        contactEmail.value === '' ||
        contactSubject.value === '' ||
        contactMessage.value === '') {
            // Show Message
            errorMessage.textContent = 'Please fill all the input fields';
            errorMessage.classList.remove("success");
            errorMessage.classList.add("error");
        } else { 
            // serviceID - templateID - #form - publickey
            emailjs.sendForm('service_0mrbr6q', 'template_hncdy7g', '#contact-form', 'a_wNdgX0mEyPqSjmT').then(() => {

                errorMessage.classList.remove("error");
                errorMessage.classList.add("success");
                errorMessage.textContent = 'Message sent successfully ✓';

                // remove message after 5 seconds
                setTimeout(() => {
                    errorMessage.textContent = ''
                }, 5000);
            }, (error) => {
                alert('Oops! Something went wrong...', error);
            });

            // clear input fields
            contactName.value = '';
            contactEmail.value = '';
            contactSubject.value = '';
            contactMessage.value = '';
        }
};

contactForm.addEventListener("submit", sendEmail);