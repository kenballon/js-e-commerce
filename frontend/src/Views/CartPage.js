import { getProduct } from "../api";
import { parseRequestUrl } from "../util";
import { getCartItems, setCartitems } from "../localStorage";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();

  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    cartItems = cartItems.map((x) =>
      x.product === existItem.product ? item : x
    );
  } else {
    cartItems = [...cartItems, item];
  }
  setCartitems(cartItems);
};

const CartPage = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();

    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }

    return `
     <h1 class="space-y-24px border-bottom-1">Your Order</h1>
     <p>${getCartItems().length}</p>
            <div class="grid grid-col-2 border-bottom-1 padding-y-1">
                <figure>
                    <picture class="cart-img">
                        <img src="asdf" alt="asdf">
                    </picture>
                </figure>
                <div class="cart-details">
                    <h3 class="product-name">
                    adsf
                    </h3>
                    <p>$ asdf</p>
                    <div class="item-count">
                        <h4>Items:</h4>
                        <span class="remove-item-count">
                            <button id="less">-</button>
                        </span>
                        <span class="quantity">
                            <input type="text" value="1">
                        </span>
                        <span class="add-item-count">
                            <button id="add-more">+</button>
                        </span>
                    </div>
                </div>
            </div>`;
  },
};

export default CartPage;
