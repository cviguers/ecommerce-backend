const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // call sequelize to findAll
  Product.findAll({ 
    // include associated Category and Tag data
    include: [ 
      Category,
      { model: Tag, through: ProductTag, } 
    ]
  })
  // respond with found data
  .then((categoryData) => res.json(categoryData))
  // if err, throw err
  .catch((err) => res.status(400).json(err));
});

// get one product
router.get('/:id', (req, res) => {
  // call sequelize to findOne
  Product.findOne({
    where:{
      id: req.params.id
    },
    // include associated Category and Tag data
    include: [
      Category,
      { model: Tag, through: ProductTag, }
    ],
  })
  // respond with found data
  .then((categoryData) => res.status(200).json(categoryData))
  // if err, throw err
  .catch((err) => res.status(400).json(err));
});

// create new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // call sequelize to update in product model
      await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // respond with updated data
    res.status(200).json(req.body);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    // if no matching id, throw error
    if (!productData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    // return row to confirm deletion
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
