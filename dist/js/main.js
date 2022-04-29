const menuBurger = document.querySelector('.menu-burger');
const nav = document.querySelector('.navigation');
const navigationClose = nav.querySelector('.navigation__close');
const intro = document.querySelector('.intro');



menuBurger.addEventListener('click', function(){
  nav.classList.add('navigation--active');
  intro.classList.add('intro--overlay');
})

navigationClose.addEventListener('click', function(){
  nav.classList.remove('navigation--active');
  intro.classList.remove('intro--overlay');
})