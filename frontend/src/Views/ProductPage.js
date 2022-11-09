import { getProduct } from "../api";
import { parseRequestUrl } from "../util";

const ProductPage = {
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
                  <div class="d-flex gap-1">
                      <div class="dropdown size-dropdown">
                          34
                      </div>
                      <button>Select This Size</button>
                  </div>
                  <div class="sold-out-text space-y-24px">
                      <p>Remaining Item: ${product.countInStock}</p>
                  </div>
              </article>
          </div>
        </article>`;
  },
};

export default ProductPage;
