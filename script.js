'use strict';

const appEl = document.querySelector('#app');
const wrapperEl = document.createElement('div');
wrapperEl.classList.add('wrapper');
appEl.prepend(wrapperEl);

const linkToHomeEl = document.createElement('a');
linkToHomeEl.href = '#';
wrapperEl.append(linkToHomeEl);

const titleEl = document.createElement('h1');
titleEl.classList.add('title');
titleEl.textContent = 'TheGuardian API';
linkToHomeEl.append(titleEl);

// menu with categories
const menuEl = document.createElement('div');
menuEl.classList.add('menu');
wrapperEl.append(menuEl);

//* ------ SEARCH -----------
const searchContainerEl = document.createElement('div');
searchContainerEl.classList.add('search-container');
menuEl.append(searchContainerEl);

const searchLabelEl = document.createElement('label');
searchLabelEl.classList.add('search-label');
searchLabelEl.for = 'site-search';
searchLabelEl.textContent = 'Search...';
searchContainerEl.append(searchLabelEl);

const searchInputEl = document.createElement('input');
searchInputEl.classList.add('search-input');
searchInputEl.type = 'search';
searchInputEl.for = 'site-search';
searchInputEl.name = 'q';
searchContainerEl.append(searchInputEl);

const searchBtnEl = document.createElement('button');
searchBtnEl.classList.add('search-btn');
searchBtnEl.textContent = 'Search';
searchContainerEl.append(searchBtnEl);

const contentEl = document.createElement('div');
contentEl.classList.add('content');
contentEl.classList.add('content--grid');
wrapperEl.append(contentEl);

//* ---- PAGINATION ------
const navigationPagesEl = document.createElement('div');
navigationPagesEl.classList.add('navigation-pages');
wrapperEl.append(navigationPagesEl);

const prevBtnEl = document.createElement('button');
prevBtnEl.classList.add('pagination-btn');
prevBtnEl.textContent = 'Previous';
navigationPagesEl.append(prevBtnEl);

const currentPageEl = document.createElement('span');
currentPageEl.classList.add('current-page');
navigationPagesEl.append(currentPageEl);

const totalPagesEl = document.createElement('span');
totalPagesEl.classList.add('total-pages');
navigationPagesEl.append(totalPagesEl);

const nextBtnEl = document.createElement('button');
nextBtnEl.classList.add('pagination-btn');
nextBtnEl.textContent = 'Next';
navigationPagesEl.append(nextBtnEl);

// * ----- FOOTER -------
const footerEl = document.createElement('div');
footerEl.classList.add('footer');
footerEl.innerHTML =
  'Made by <a href="https://github.com/elen-oz" target="_blanc">Me</a> and <a href="https://github.com/elen-oz/hi_js-API_v2" target="_blanc"> here is this project on GitHub</a>';
wrapperEl.append(footerEl);

let currentPage = 1;
let totalPages = 1;

const API_KEY = '33fcc7c4-dacd-4f3f-acec-62d96810fb5b';

const urlAPI = `https://content.guardianapis.com/search?api-key=${API_KEY}&page=1&page-size=20`;

const updatePagination = () => {
  currentPageEl.textContent = `Page ${currentPage} `;
  totalPagesEl.textContent = `of ${totalPages}`;
};

const formatApiDate = (apiDate) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(apiDate).toLocaleDateString('en-US', options);
  return formattedDate;
};

const getSearch = () => {
  const searchQuery = searchInputEl.value.trim();

  if (searchQuery) {
    const searchUrl = `https://content.guardianapis.com/search?q=${encodeURIComponent(
      searchQuery
    )}&api-key=${API_KEY}&page=1&page-size=20`;

    getData(searchUrl);
  } else {
    searchInputEl.classList.add('error-input');
    setTimeout(() => {
      searchInputEl.classList.remove('error-input');
    }, 2000);

    console.error('Input is empty');
  }
};

const nextPage = () => {
  if (currentPage < totalPages) {
    currentPage += 1;
    const nextPageUrl = `https://content.guardianapis.com/search?api-key=${API_KEY}&page=${currentPage}&page-size=20`;
    getData(nextPageUrl);
  }
};

const prevPage = () => {
  if (currentPage > 1) {
    currentPage -= 1;
    const prevPageUrl = `https://content.guardianapis.com/search?api-key=${API_KEY}&page=${currentPage}&page-size=20`;
    getData(prevPageUrl);
  }
};

const getData = async (data) => {
  try {
    const response = await fetch(data);
    const result = await response.json();

    console.log(result.response.results);

    localStorage.setItem('url', JSON.stringify(data));

    currentPage = result.response.currentPage;
    totalPages = result.response.pages;

    updatePagination();
    renderData(result.response.results);
  } catch (error) {
    console.error(error);
  }
};

const renderData = (data) => {
  contentEl.innerHTML = '';
  data.map((item) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    contentEl.append(cardEl);

    const pillarNameEl = document.createElement('h3');
    pillarNameEl.classList.add('card__pillar-name');
    pillarNameEl.classList.add('card-tag');
    pillarNameEl.textContent = `${item.pillarName}`;
    cardEl.append(pillarNameEl);

    const sectionNameEl = document.createElement('h3');
    sectionNameEl.classList.add('card__section-name');
    sectionNameEl.classList.add('card-tag');
    sectionNameEl.textContent = `${item.sectionName}`;
    cardEl.append(sectionNameEl);

    const publicationDateEl = document.createElement('div');
    publicationDateEl.classList.add('card__date');
    publicationDateEl.textContent = formatApiDate(item.webPublicationDate);
    cardEl.append(publicationDateEl);

    const cardContentEl = document.createElement('div');
    cardContentEl.classList.add('card__content');
    cardEl.append(cardContentEl);

    const cardTitleEl = document.createElement('h2');
    cardTitleEl.classList.add('card__title');
    cardTitleEl.textContent = `${item.webTitle}`;
    cardContentEl.append(cardTitleEl);

    const linkEl = document.createElement('a');
    linkEl.classList.add('card__link');
    linkEl.href = item.webUrl;
    linkEl.target = '_blanc';
    linkEl.textContent = 'Show Full Article';
    cardEl.append(linkEl);
  });
};

const storedUrl = JSON.parse(localStorage.getItem('url'));

storedUrl ? getData(storedUrl) : getData(urlAPI);

linkToHomeEl.addEventListener('click', () => {
  localStorage.removeItem('url');
  getData(urlAPI);
});

searchBtnEl.addEventListener('click', getSearch);

searchInputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getSearch();
  }
});

nextBtnEl.addEventListener('click', nextPage);
prevBtnEl.addEventListener('click', prevPage);
