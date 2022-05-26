import './css/style.css';
import { fetchImages } from './js/fetch-images';
import { renderGallery } from './js/render-gallery';
import { renderName } from './js/render-name';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const searchline = document.querySelector('.search-wrapper');
const loading = document.querySelector('#loading');
const newSearchBtn = document.querySelector('#new-search-btn');

searchForm.addEventListener('submit', onSearchForm);
newSearchBtn.addEventListener('click', onNewSearch);

let query = '';
let page = 1;
const perPage = 80;

function onSearchForm(e) {
  e.preventDefault();
  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  searchline.classList.add('visually-hiden');
  loading.classList.replace('hiden', 'loading');
  setTimeout(() => {
    gallery.classList.replace('hiden', 'gallery');
    loading.classList.add('visually-hiden');
    newSearchBtn.classList.replace('hiden', 'new-search-btn');
  }, 5000);

  if (query === '') {
    renderName('Empty serch');
    Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
    return;
  }

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        renderName(query);
        loading.classList.add('visually-hiden');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      } else {
        renderGallery(data.hits);
        renderName(query);
        simpleLightBox = new SimpleLightbox('.main-gallery a').refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images. Just wait for loading`);
      }
    })
    .catch(error => console.log(error));
}
function onNewSearch() {
  document.location.reload();
}
window.onload = function () {
  setTimeout(() => {
    Draggable.create('.main-gallery', {
      bounds: 'body',
    });
  }, 200);
};
