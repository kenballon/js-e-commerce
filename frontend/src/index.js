import { parseRequestUrl } from "./util.js";
import Error404Page from "./Views/Error404Page.js";
import HomePage from "./Views/HomePage.js";
import ProductPage from "./Views/ProductPage.js";
import "../styles/style.scss";

const routes = {
  "/": HomePage,
  "/product/:id": ProductPage,
};

const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");

  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Page;

  const main = document.getElementById("section-products-wrapper");
  main.innerHTML = await screen.render();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
