const spans = document.querySelectorAll('.name span');
let index = 0;
// mostrar nombre en secuencia
function mostrarSiguienteSpan() {
   if (index < spans.length) {
      spans[index].style.opacity = '1';
      index++;
      setTimeout(mostrarSiguienteSpan, 150);
   }
}

mostrarSiguienteSpan();

// cambio de tema
const preferedColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const slider = document.getElementById('slider');

const setTheme = (theme) => {
   document.documentElement.setAttribute('data-theme', theme);
   localStorage.setItem('theme', theme);
}

slider.addEventListener('click', () => {
   let switchToTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
   setTheme(switchToTheme);
})

setTheme(localStorage.getItem('theme') || preferedColorScheme);

const toggle = document.getElementById('toggle');
toggle.addEventListener('click', function(){
   this.classList.toggle('bi-moon-fill')
})

const targets = document.querySelectorAll('[data-target]')
const content = document.querySelectorAll('[data-content]')
targets.forEach(target => {
   target.addEventListener('click', () => {
      content.forEach(c => {
         c.classList.remove('active')
      })
      const t = document.querySelector(target.dataset.target);
      t.classList.add('active');
   })
})

const menu_toggle = document.getElementById('menu-button');
const navbar_pop = document.querySelector('.navbar-pop');
// barra de navegacion
menu_toggle.addEventListener('click', () => {
   menu_toggle.classList.toggle('bi-x-diamond-fill');
   navbar_pop.classList.toggle('active');
})

document.querySelectorAll('.nav_links').forEach(n => n.addEventListener('click', () => {
   menu_toggle.classList.remove('bi-x-diamond-fill');
   navbar_pop.classList.remove('active');
}))

// cambio de lenguajes
const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async language => {
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
