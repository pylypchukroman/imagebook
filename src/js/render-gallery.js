export { renderGallery };

const gallery = document.querySelector('#gallery');

function renderGallery(images) {
  const markup = images
    .map(image => {
      return `
      <a href="${image.largeImageURL}">
          <div class="gallery-item">
            <img class="gallery-img" src="${image.largeImageURL}" alt="${image.tags}" loading="lazy" />
          </div>
      </a>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
