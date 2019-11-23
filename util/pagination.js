const Product = require("../models/Product");

const pagination = async (pageNum, query) => {
  let products = [];
  try {
    const totalDocs = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / 12);
    if (pageNum === 1) {
      products = await Product.find(query).limit(12);
    } else {
      const skips = 12 * (pageNum - 1);
      products = await Product.find(query)
        .skip(skips)
        .limit(12);
    }
    return { products, totalPages };
  } catch (err) {
    return { msg: "Error, cannot get products" };
  }
};

module.exports = pagination;
