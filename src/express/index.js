'use strict';

const PUBLIC_DIR = `public`;
const TEMPLATES_RID = `templates`;

const express = require(`express`);
const chalk = require(`chalk`);
const path = require(`path`);

// Маршруты приложения мы опишем в отдельных файлах.
// Для определения маршрутов мы воспользуемся Router().
// Примеры маршрутов будут продемонстрированы ниже по тексту.
const offersRoutes = require(`./routes/offers-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

// Зафиксируем порт для сервера
const DEFAULT_PORT = 9000;

const app = express();

// Подключим созданные маршруты
app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

// Подключаем статичные маршруты
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

// Подключаем движок шаблонизатор и папку с его шаблонами
app.set(`views`, path.resolve(__dirname, TEMPLATES_RID));
app.set(`view engine`, `pug`);

// Запуск сервера
app.listen(DEFAULT_PORT, (err) => {
  if (err) {
    return console.error(chalk.red(`Ошибка при создании сервера`, err));
  }
  return console.info(chalk.green(`Ожидаю соединений на порту: ${DEFAULT_PORT}`));
});

