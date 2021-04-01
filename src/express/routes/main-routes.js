'use strict';

const {Router} = require(`express`);
const mainRoutes = new Router();

// Определяем `GET` маршруты.
// основной путь маршрута /
mainRoutes.get(`/`, (req, res) => res.render(`main`));
mainRoutes.get(`/main`, (req, res) => res.render(`main`));
mainRoutes.get(`/register`, (req, res) => res.render(`sign-up`));
mainRoutes.get(`/sign-up`, (req, res) => res.render(`sign-up`));
mainRoutes.get(`/login`, (req, res) => res.render(`login`));
mainRoutes.get(`/search`, (req, res) => res.render(`search-result`));
mainRoutes.get(`/comments`, (req, res) => res.render(`comments`));

module.exports = mainRoutes;
