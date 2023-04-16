// import express router and classes from /models
const router = require('express').Router();
const { Category, Product } = require('../../models');

// `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    // call sequelize to findAll in Category model
    const categoryData = await Category.findAll({
      // include everything from Product model
      include: [Product],
    });
    // respond with json category data
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(400).json(err); 
  }
});


// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    // call sequelize to findmyprimarykey in Category model
    const categoryData = await Category.findByPk(req.params.id);

    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// create a new category
router.post('/', (req, res) => { 
  // call sequelize to create in Category table from body
  Category.create(req.body) 

  // if successful return data
  .then((categoryData) => res.status(200).json(categoryData)) 
  // if err return err
  .catch((err) => res.status(400).json(err)); 
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // call sequelize to update in Category model
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // if no matching id, throw error
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    // respond with updated data
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // call sequelize to destroy in Category model
    const categoryData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    // if no matching id, throw error
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    // respond with updated data
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
