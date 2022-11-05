const HomePage = {
  render: async () => {
    // const { products } = data;
    const response = await fetch("http://localhost:3000/api/products", {
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response || !response.ok) {
      return `<div><label>Unable to get the data.</label></div>`;
    }

    const products = await response.json();

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
                                <img src="${product.image}" alt="${product.name}">
                            </picture>
                        </figure>
                        <article class="product-dets">
                            <h4 class="product-name">${product.name}</h4>
                            <p class="price">$ ${product.price}</p>
                            <p class="product-branding">Brand: ${product.brand}</p>
                        </article>
                    </div>
                </a>
            </li>
        `
          )
          .join("\n")}            
        </ul>
        `;
  },
};

export default HomePage;
