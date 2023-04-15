const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

//  `/api/tags` endpoint

// find all tags
router.get('/', (req, res) => {
  // call sequelize to findAll
  Tag.findAll({ 
    // include its associated Product data through ProductTag
    include: [ 
      { model: Product,  through: ProductTag, }
    ],
  })
  // respond with found data
  .then((tagData) => res.json(tagData))
  // if err, throw err
  .catch((err) => res.status(400).json(err));
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  // call sequelize to findOne
  Tag.findOne({
    // look to the req.params to find tag by id
    where: {
      id: req.params.id,
    },
    // include its associated Product data through ProductTag
    include: [ 
    { model: Product,  through: ProductTag, }
    ],
  })
  // respond with found data
  .then((tagData) => res.json(tagData))
  // if err, throw err
  .catch((err) => res.status(400).json(err));
});


// create a new tag_name
router.post('/', (req, res) => {
  // call sequelize to create what is in the request body
  Tag.create(req.body)
  // respond with found data
  .then((tagData) => res.json(tagData))
  // if err, throw err
  .catch((err) => res.status(400).json(err));
});


// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  // call sequelize to update what is in the request body
  Tag.update(req.body, { 
    // targets by specific id
    where:{
      id: req.params.id
    },
  })
  // respond with found data
  .then((tagData) => res.json(tagData))
  // if err, throw err
  .catch((err) => res.status(400).json(err));
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  // call sequelize to delete selected tag
  Tag.destroy({ 
    where: {
      id: req.params.id,
    }
  })
  // respond with found data
  .then((tagData) => res.json(tagData))
  // if err, throw err
  .catch((err) => res.status(400).json(err));
});

module.exports = router;
