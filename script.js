'use strict';

const appEl = document.querySelector('#app');
const wrapperEl = document.createElement('div');
wrapperEl.classList.add('wrapper');
appEl.prepend(wrapperEl);

const titleEl = document.createElement('h1');
titleEl.classList.add('title');
titleEl.textContent = 'Title';
wrapperEl.prepend(titleEl);

// menu with categories
const menuEl = document.createElement('div');
menuEl.classList.add('menu');
wrapperEl.append(menuEl);

// search
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

const navigationPagesEl = document.createElement('div');
navigationPagesEl.classList.add('navigation-pages');
navigationPagesEl.textContent = '1';
wrapperEl.append(navigationPagesEl);

const API_KEY = '33fcc7c4-dacd-4f3f-acec-62d96810fb5b';

const urlPage1 = `https://content.guardianapis.com/search?api-key=${API_KEY}&page=1&page-size=20`;

const formatApiDate = (apiDate) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(apiDate).toLocaleDateString('en-US', options);
  return formattedDate;
};

const getData = async (data) => {
  //   const { url, options } = data;

  try {
    const response = await fetch(data);
    const result = await response.json();

    console.log(result.response.results);
    // console.log(result.response);

    //   localStorage.setItem('url', JSON.stringify(url));
    //   localStorage.setItem('options', JSON.stringify(options));

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

    const pillarNameEl = document.createElement('h2');
    pillarNameEl.classList.add('card__pillar-name');
    pillarNameEl.textContent = `${item.pillarName}`;
    cardEl.append(pillarNameEl);

    // webPublicationDate
    const publicationDateEl = document.createElement('div');
    publicationDateEl.classList.add('card__date');
    publicationDateEl.textContent = formatApiDate(item.webPublicationDate);
    cardEl.append(publicationDateEl);

    const cardTitleEl = document.createElement('h2');
    cardTitleEl.classList.add('card__title');
    cardTitleEl.textContent = `${item.webTitle}`;
    cardEl.append(cardTitleEl);

    const cardContentEl = document.createElement('div');
    cardContentEl.classList.add('card__content');
    cardEl.append(cardContentEl);

    // apiUrl
    const linkEl = document.createElement('a');
    linkEl.classList.add('card__link');
    linkEl.href = item.webUrl;
    linkEl.textContent = 'Show Full Article';
    cardEl.append(linkEl);
  });
};

getData(urlPage1);
