export const getProductsWithInCartData = (state) => {
    const { cart, products} = state
    const productList = products.map(product => { //checking each product if inCart
        const cartIndex = cart.items.findIndex(cartItem => cartItem.sku ===product.sku)
        const newProduct = {...product}
        newProduct.inCart = cartIndex !== -1 ? cart.items[cartIndex].pieces : 0
        newProduct.inStock = newProduct.stock - newProduct.inCart !== 0
        return newProduct
    })
    return [...productList]
  };

  export const getCartWithProductData = (state) => {
    const { cart, products} = state
    const cartProducts = cart.items.map(cartItem => {
        const productIndex = products.findIndex(product => cartItem.sku === product.sku)
        const newCartItem = {sku: cartItem.sku}
        newCartItem.product = products[productIndex]
        newCartItem.product.inCart = cartItem.pieces
        newCartItem.product.inStock = newCartItem.product.stock - newCartItem.product.inCart !== 0
        return newCartItem
    })
    return [...cartProducts]
  };

  export const getCartTotalPrice = (state) => {
    const {cart} = state
    const totalPrice = cart.items.reduce((currPrice, item) => {
        const product = findProductBySku(state,item.sku);
        return currPrice + item.pieces * product.price;
      }, 0);
      return totalPrice
  }

export const findProductBySku = (state,sku) => {
    const { products } = state
    const foundProduct = products.find((product) => product.sku === sku);
    return {...foundProduct}
  };