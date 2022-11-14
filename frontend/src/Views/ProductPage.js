import { getProduct } from "../api";
import { parseRequestUrl } from "../util";
import Rating from "../components/Ratings";

const ProductPage = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("add-to-cart").addEventListener("click", () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }

    return `
       <article>
          <div class="d-flex">
              <div class="product-img-wrapper">
                  <figure>
                      <picture>
                          <img src="${product.image}" alt="just image">
                      </picture>
                  </figure>
              </div>
              <article class="product-details-container">
                  <h1 class="product-title">${product.name}</h1>
                  <p class="product-current-price">$ ${product.price}</p>
                  <div class="short-desc">
                      <p>${product.shortDesciption}</p>
                  </div>                  
                  <div class="sold-out-text space-y-24px">
                      <p>Stocks: ${product.countInStock}</p>
                      <div class="rating-wrapper space-y-24px">${Rating.render({
                        value: product.rating,
                        text: `${product.numOfReviews} reviews`,
                      })}</div>
                  </div>
                  <button id="add-to-cart" class="atc-btn">Add To Cart</button>
              </article>
          </div>
        </article>`;
  },
};

export default ProductPage;
