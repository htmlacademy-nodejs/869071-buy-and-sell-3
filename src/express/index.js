'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

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

// Запуск сервера
const startServer = async () => {
  try {
    app.listen(DEFAULT_PORT);
    console.log(chalk.green(`Запустил сервер на порту: ${DEFAULT_PORT}`));
  } catch (err) {
    console.log(chalk.red(err));
  }
};

startServer();

