'use strict';

/**
 * addEvent on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}


/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  navbarToggler.classList.toggle("active");
}

addEventOnElem(navbarToggler, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  navbarToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNav);



/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/*------swiper slider de las opiniones -----*/
var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  lopp: true,
  autoplay:{
      delay: 5000,
      disableOnInteraction: false
  },
  breakpoints:{
      640:{
          slidesPerView: 1
      },
      768:{
          slidesPerView: 2
      },
      1024:{
          slidesPerView: 3
      }

  }
});

/*------------Scroll Reveal ------------------*/
ScrollReveal({
  //reset: true,
  distance: "100px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".hero-content, .section-subtitle, .section-title", { origin: "top" });
ScrollReveal().reveal(
  ".hero-banner, .service-banner, .review-slider, .contact form, .image",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img img, .video-container, .card1, .card3, .card5", { origin: "left" });
ScrollReveal().reveal(".home-content h3, .home-content p, .about-content, .card2, .card4, .card6", {
  origin: "right",
});


/*--------------------Send EmailJS------------------------*/
const contactForm = document.querySelector("#contact-form");
const submitBtn = document.querySelector(".btn");
const nameInput = document.querySelector("#user-name");
const emailInput = document.querySelector("#user-email");
const phoneInput = document.querySelector("#user-phone");
const subjectInput = document.querySelector("#user-subject");
const messageInput = document.querySelector("#message");

//datos que necesitamos del EmailJS
const publicKey = "mfNPU1x6RkVDU3PPk";
const serviceID = "service_hxuas8o";
const templateID = "template_08191el";

//iniciamos EmailJS con la publicKey
emailjs.init(publicKey);

//creamos el evento de enviar a el formulario
contactForm.addEventListener("submit", (e) => {
  //prevenimos el comportamiento predeterminado
  e.preventDefault();
  //obtenemos todos los valores de los input
  const inputFields = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    subject: subjectInput.value,
    message: messageInput.value,
  };
  Swal.fire({
    title: "Estas Seguro?",
    text: "Deseas de enviar la siguiente informacion de contacto?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2b6cdd",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Confirmar!",
  }).then((result) => {
    if (result.isConfirmed) {
      emailjs.send(serviceID, templateID, inputFields).then(
        () => {
          nameInput.value = "";
          emailInput.value = "";
          phoneInput.value = "";
          subjectInput.value = "";
          messageInput.value = "";
          Swal.fire(
            "Enviada!",
            "Su informacion se ha enviado correctamente.",
            "success"
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  });
});