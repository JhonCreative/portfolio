// Almacenar elementos del DOM en variables para evitar consultas repetidas
const spans = document.querySelectorAll('.name span');
const slider = document.getElementById('slider');
const toggle = document.getElementById('toggle');
const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");
const targets = document.querySelectorAll('[data-target]');
const content = document.querySelectorAll('[data-content]');
const menu_toggle = document.getElementById('menu-button');
const navbar_pop = document.querySelector('.navbar-pop');
const navLinks = document.querySelectorAll('.nav_links');

let index = 0;

function mostrarSiguienteSpan() {
   if (index < spans.length) {
      spans[index].style.opacity = '1';
      index++;
      setTimeout(mostrarSiguienteSpan, 150);
   }
}

// Iniciar la secuencia de mostrar nombres
mostrarSiguienteSpan();

// Cambio de tema
const preferedColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function setTheme(theme) {
   document.documentElement.setAttribute('data-theme', theme);
   localStorage.setItem('theme', theme);
}

// Evento para cambiar el tema cuando se hace clic en el slider
slider.addEventListener('click', () => {
   let switchToTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
   setTheme(switchToTheme);
})

// Establecer el tema almacenado o el tema preferido al cargar la página
setTheme(localStorage.getItem('theme') || preferedColorScheme);

// Evento para cambiar el icono de luna/sol en el botón de tema
toggle.addEventListener('click', function(){
   this.classList.toggle('bi-moon-fill')
})

// Cambiar contenido al hacer clic en elementos con atributo [data-target]
targets.forEach(target => {
   target.addEventListener('click', () => {
      content.forEach(c => {
         c.classList.remove('active')
      })
      const t = document.querySelector(target.dataset.target);
      t.classList.add('active');
   })
})

// Barra de navegación - Evento para mostrar/ocultar el menú móvil
menu_toggle.addEventListener('click', () => {
   menu_toggle.classList.toggle('bi-x-diamond-fill');
   navbar_pop.classList.toggle('active');
})

// Cerrar el menú móvil al hacer clic en un enlace
navLinks.forEach(n => n.addEventListener('click', () => {
   menu_toggle.classList.remove('bi-x-diamond-fill');
   navbar_pop.classList.remove('active');
}))

// Cambio de lenguajes - Evento para cambiar el idioma al hacer clic en una bandera
async function changeLanguage(language) {
   const requestJson = await fetch(`/languages/${language}.json`);
   const texts = await requestJson.json();

   for(const textToChange of textsToChange) {
      const section = textToChange.dataset.section;
      const value = textToChange.dataset.value;

      textToChange.innerHTML = texts[section][value]
   }
}

flagsElement.addEventListener("click", (e) => {
   changeLanguage(e.target.parentElement.dataset.language);
})
