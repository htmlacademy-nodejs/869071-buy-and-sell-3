'use strict';

const {getRandomInt, shuffle} = require(`../utils`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_OFFERS = 1000;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
  `Продам коллекцию журналов «Огонёк»`,
  `Отдам в хорошие руки подшивку «Мурзилка»`,
  `Продам советскую посуду. Почти не разбита`,
  `Куплю детские санки`
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Две страницы заляпаны свежим кофе`,
  `Кажется, что это хрупкая вещь`,
  `Мой дед не мог её сломать`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю`
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const CategoriesRestrict = {
  MIN: 1,
  MAX: 3
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 0,
  MAX: 16
};

const getCategories = (num) => {
  let categoryArray = [];
  for (let i = 0; i <= num; i++) {
    const randomCategory = CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)];
    if (categoryArray.includes(randomCategory)) {
      continue;
    }
    categoryArray.push(randomCategory);
  }
  return categoryArray;
};

const getPictureFileName = (num) => {
  return `item${num}.jpg`;
};

const generateOffers = (count) => {
  return (
    Array(count).fill({}).map(() => ({
      category: getCategories(getRandomInt(CategoriesRestrict.MIN, CategoriesRestrict.MAX)),
      description: shuffle(SENTENCES).slice(1, 5).join(` `),
      picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
      sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    }))
  );
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_OFFERS) {
      console.log(chalk.red(`Не больше 1000 объявлений`));
      return;
    }

    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
