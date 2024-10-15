import express from "express";
import sneakers from "../data/data.mjs"; // correcting the paths
const router = express.Router();

// CREATE & READ ALL

// the "get form"
router.get("/new", (req, res) => {
  res.render("newSneaker"); // Render the form for creating a new sneaker
});

// Add a new sneaker (POST req)
router.post("/new", (req, res) => {
  const { name, brand, price, releaseDate, description } = req.body;

  // checking if all req info is here
  if (name && brand && price && releaseDate) {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      return res.status(400).send("Price must be a valid number!");
    }

    const newSneaker = {
      id: sneakers.length + 1,
      name,
      brand,
      price: numericPrice,
      releaseDate,
      description,
    };

    sneakers.push(newSneaker);

    res.redirect("/api/sneakers");
  } else {
    res.status(400).send("All fields are required to add a new sneaker!");
  }
});

router.get("/", (req, res) => {
  const options = {
    allSneakers: sneakers,
  };

  res.render("showAllSneakers", options);
});

router.get("/:id", (req, res) => {
  const sneaker = sneakers.find((s) => s.id == req.params.id);

  if (sneaker) {
    res.render("showSneaker", sneaker);
  } else {
    res.status(404).send("Sneaker not found!");
  }
});

router.patch("/:id", (req, res) => {
  const sneaker = sneakers.find((s) => s.id == req.params.id);

  if (sneaker) {
    const { name, brand, price, releaseDate, description } = req.body;

    if (name) sneaker.name = name;
    if (brand) sneaker.brand = brand;
    if (price) sneaker.price = parseFloat(price);
    if (releaseDate) sneaker.releaseDate = releaseDate;
    if (description) sneaker.description = description;

    res.json(sneaker);
  } else {
    res.status(404).send("Sneaker not found!");
  }
});

router.delete("/:id", (req, res) => {
  const sneakerIndex = sneakers.findIndex((s) => s.id == req.params.id);

  if (sneakerIndex > -1) {
    const deletedSneaker = sneakers.splice(sneakerIndex, 1);
    res.json(deletedSneaker); // Send back the deleted sneaker
  } else {
    res.status(404).send("Sneaker not found!");
  }
});

export default router;
