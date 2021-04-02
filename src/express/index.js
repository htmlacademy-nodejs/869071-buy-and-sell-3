'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const path = require(`path`);

const {HttpCode, PUBLIC_DIR, TEMPLATES_RID} = require(`./constants`);

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

// Делаем обработку ошибок
app.use((req, res) => res.status(HttpCode.NOT_FOUND).render(`400`));
app.use((req, res) => res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`500`));

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

