export const addPizzaToCart = (obj) => ({
  type: 'ADD_PIZZA_CART',
  value: obj
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

export const removeCartItem = (obj) => ({
  type: 'REMOVE_CART_ITEM',
  value: obj
});

export const plusCartItem = (obj) => ({
  type: 'PLUS_CART_ITEM',
  value: obj
});

export const minusCartItem = (obj) => ({
  type: 'MINUS_CART_ITEM',
  value: obj
});