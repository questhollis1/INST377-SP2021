
const listContainer = document.querySelector('.images');

function shiftLeft() {
  const lastThree = Array.from(listContainer.children).slice(4, 7).reverse();
  lastThree.forEach((element) => {
    listContainer.removeChild(element);
    listContainer.insertBefore(element, listContainer.children[0]);
  })
}

function shiftRight() {
  const firstThree = Array.from(listContainer.children).slice(0, 3);
  firstThree.forEach((element) => {
    listContainer.removeChild(element);
    listContainer.appendChild(element);
  })
}

function onLoadOfPage() {
  document.querySelector('button.arrow.prev').addEventListener('click', (event) => {
    shiftLeft();
  });
  document.querySelector('button.arrow.next').addEventListener('click', (event) => {
    shiftRight();
  });
}
window.onload = onLoadOfPage;