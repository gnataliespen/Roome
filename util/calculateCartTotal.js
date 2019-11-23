const calculateCartTotal = cart => {
  const total = cart.reduce((acc, el) => {
    acc += el.product.price * el.quantity;
    return acc;
  }, 0);
  const cartTotal = parseInt(((total * 100) / 100).toFixed(2));
  const stripeTotal = parseInt((total * 100).toFixed(2));
  return { cartTotal, stripeTotal };
};

module.exports = calculateCartTotal;
