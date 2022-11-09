import axios from "axios";
import Rating from "../components/Ratings";

const HomePage = {
  render: async () => {
    const response = await axios({
      url: "http://localhost:8080/api/products",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response || response.statusText !== "OK") {
      return `<div><label>Unable to get the data.</label></div>`;
    }

    const products = response.data;

    return `
        <ul class="products grid auto-fit">
        ${products
          .map(
            (product) => `
            <li class="product">
                <a href="#/product/${product._id}" class="product-link-card" >
                    <div class="product-card">
                        <figure class="img">
                            <picture>
                                <img src="${product.image}" alt="${
              product.name
            }">
                            </picture>
                        </figure>
                        <article class="product-dets">
                            <h4 class="product-name">${product.name}</h4>
                            <div class="price">
                              <div>$ ${product.price}</div>
                              <div>$ ${Rating.render({
                                value: product.rating,
                                text: product.numOfReviews + " Reviews",
                              })}</div>                              
                            </div>
                            <p class="product-branding">Brand: ${
                              product.brand
                            }</p>
                        </article>
                    </div>
                </a>
            </li>`
          )
          .join("\n")}            
        </ul>`;
  },
};

export default HomePage;
