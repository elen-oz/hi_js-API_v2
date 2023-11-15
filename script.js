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

const contentEl = document.createElement('div');
contentEl.classList.add('content');
contentEl.classList.add('content--grid');
wrapperEl.append(contentEl);

const cardEl = document.createElement('div');
// cardEl.classList.add('card');
// contentEl.append(cardEl);

// const cardEl2 = document.createElement('div');
// cardEl2.classList.add('card');
// contentEl.append(cardEl2);
// const cardEl3 = document.createElement('div');
// cardEl3.classList.add('card');
// contentEl.append(cardEl3);
// const cardEl4 = document.createElement('div');
// cardEl4.classList.add('card');
// contentEl.append(cardEl4);

const API_KEY = '33fcc7c4-dacd-4f3f-acec-62d96810fb5b';

const urlPage1 =
  'https://content.guardianapis.com/search?api-key=33fcc7c4-dacd-4f3f-acec-62d96810fb5b&page=1&page-size=20';

//  https://content.guardianapis.com/search?api-key=33fcc7c4-dacd-4f3f-acec-62d96810fb5b&page=500

const getData = async (data) => {
  //   const { url, options } = data;

  try {
    const response = await fetch(data);
    const result = await response.json();

    console.log(result.response.results);

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

    const cardTitleEl = document.createElement('h2');
    cardTitleEl.classList.add('card__title');
    cardTitleEl.textContent = `${item.webTitle}`;
    cardEl.append(cardTitleEl);

    const cardContentEl = document.createElement('div');
    cardContentEl.classList.add('card__content');
    cardEl.append(cardContentEl);
  });
};

getData(urlPage1);
