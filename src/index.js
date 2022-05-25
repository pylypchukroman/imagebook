import './css/style.css';
import { fetchImages } from './js/fetch-images';
import { renderGallery } from './js/render-gallery';
import { renderName } from './js/render-name';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const searchline = document.querySelector('.search-wrapper');
const loading = document.querySelector('#loading');

searchForm.addEventListener('submit', onSearchForm);

let query = '';
let page = 1;
const perPage = 80;

function onSearchForm(e) {
  e.preventDefault();
  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  searchline.classList.add('visually-hiden');
  loading.classList.remove('hiden');
  loading.classList.add('loading');
  setTimeout(() => {
    gallery.classList.remove('hiden');
    gallery.classList.add('gallery');
    loading.classList.add('visually-hiden');
  }, 3000);

  if (query === '') {
    Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
    return;
  }

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      } else {
        renderGallery(data.hits);
        renderName(query);
        // Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(error => console.log(error));
}
window.onload = function () {
  // document.body.classList.add('loaded');
  setTimeout(() => {
    Draggable.create('.main-gallery', {
      bounds: 'body',
    });
  }, 200);
};
