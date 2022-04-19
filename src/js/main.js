const search = document.querySelector('.search');
const searchButton = search.querySelector('.search__button');




function showSearch(inp) {
  inp.classList.toggle('search__input--active');
}

searchButton.addEventListener('click', function(evt){
  evt.preventDefault();
  
  const searchInput = search.querySelector('.search__input');
  showSearch(searchInput);
})