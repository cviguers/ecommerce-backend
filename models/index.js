// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// defining the association as product belongs to category and creating foreign key in category table
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// A category can have many products / allows us to delete associated products if we delete category
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: ''
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: ''
})

// package our models and export them as an object so we can import them together
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
