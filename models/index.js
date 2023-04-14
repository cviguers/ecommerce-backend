// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// defining the association as product belongs to category and creating foreign key in category table
Product.belongsTo(Category, {
  foreignKey: "category_id",
  // allows us to delete associated products if we delete category
  onDelete: "CASCADE",
});

// a category can have many products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
});

// tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
});

// package our models and export them as an object so we can import them together
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
