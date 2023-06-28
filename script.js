const spans = document.querySelectorAll('.name span');
let index = 0;

function mostrarSiguienteSpan() {
   if (index < spans.length) {
      spans[index].style.opacity = '1';
      index++;
      setTimeout(mostrarSiguienteSpan, 150);
   }
}

mostrarSiguienteSpan();

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