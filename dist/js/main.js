const menuBurger = document.querySelector('.menu-burger');
const nav = document.querySelector('.navigation');
const navigationClose = nav.querySelector('.navigation__close');



menuBurger.addEventListener('click', function(){
  nav.classList.add('navigation--active');
})

navigationClose.addEventListener('click', function(){
  nav.classList.remove('navigation--active');
})