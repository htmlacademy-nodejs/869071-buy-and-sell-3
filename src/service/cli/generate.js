'use strict';

const {getRandomInt, shuffle} = require(`../utils`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_OFFERS = 1000;

const FILE_PATH_TITLES = `./data/titles.txt`;
const FILE_PATH_SENTENCES = `./data/sentences.txt`;
const FILE_PATH_CATEGORIES = `./data/categories.txt`;

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

const readFileFromDisk = async (path) => {
  try {
    const content = (await fs.readFile(path, `utf8`)).split(`\n`);
    content.pop();
    return content;
  } catch (err) {
    throw err;
  }
};

const getCategories = (num, categories) => {
  let categoryArray = [];
  for (let i = 0; i <= num; i++) {
    const randomCategory = categories[getRandomInt(0, categories.length - 1)];
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

const generateOffers = (count, titles, categories, sentences) => {
  return (
    Array(count).fill({}).map(() => ({
      category: getCategories(getRandomInt(CategoriesRestrict.MIN, CategoriesRestrict.MAX), categories),
      description: shuffle(sentences).slice(1, 5).join(` `),
      picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
      title: titles[getRandomInt(0, titles.length - 1)],
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
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(1);
    }

    if (countOffer <= 0) {
      console.error(chalk.red(`Отрицательные значения не допустимы`));
      process.exit(1);
    }

    // Пробуем прочитать данные и сформировать контент
    let content;
    try {
      const titles = await readFileFromDisk(FILE_PATH_TITLES);
      const categories = await readFileFromDisk(FILE_PATH_CATEGORIES);
      const sentences = await readFileFromDisk(FILE_PATH_SENTENCES);
      content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));
    } catch (err) {
      console.error(chalk.red(`Произошли ошибки при чтении шаблонных файлов: ${err} \nБудет произведен выход из программы `));
      process.exit(1);
    }

    // Пробуем записать данные, если они есть
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...Because: ${err}`));
      process.exit(1);
    }

    // Отработало корректно, успешный выход
    process.exit(0);
  }
};
