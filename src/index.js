import './css/style.css';
import { fetchImages } from './js/fetch-images';
import { renderGallery } from './js/render-gallery';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const searchline = document.querySelector('.search-wrapper');

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
        // Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(error => console.log(error));
}
