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
router.post('/', async (req, res) => {
  try {
    // make variable to create new instance of category model from body input
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
    // if err return err
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // call sequelize to update in Category model
      await Category.update(req.body, {
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

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    // if no matching id, throw error
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    // return row to confirm deletion
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
