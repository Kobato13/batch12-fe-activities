/* MENU TOGGLE */

const menuToggle = document.querySelector('.toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  menu.classList.toggle('active');
})


/* FADERS */

const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in');

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -200px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});