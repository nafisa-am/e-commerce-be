const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res)  => {
  // finds all categories
 try {
    const category = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // finds one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    if (!category) {
      res.status(404).json({ message: "No category found with that id" });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // creates a new category
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // updates a category by its `id` value
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      res.status(404).json({ message: "No category with that id" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // deletes a category by its `id` value
  try {
    const removeCat = Category.destroy({ where: { id: req.params.id } });
    res.status(200).json(removeCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
