export const addCartItem = (cartItem) => ({
  type: "ADD_CARTITEM",
  payload: {
    sku: cartItem.sku,
  },
});

export const removeCartItem = (cartItem) => ({
    type: "REMOVE_CARTITEM",
    payload: {
      sku: cartItem.sku,
    },
  });

  export const emptyCart = () => ({
    type: "EMPTY_CART",
    payload: {
    },
  });


  export const fetchProducts = (products) => ({
    type: "FETCH_PRODUCTS",
    payload: {
      products
    },
  });
