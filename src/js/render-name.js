export { renderName };

const header = document.querySelector('.header');

function renderName(name) {
  const markup = `
          <h1>
            ${name}
          </h1>`;

  header.insertAdjacentHTML('beforeend', markup);
}
