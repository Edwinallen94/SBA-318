import express from "express";
// For managing file paths
import path from "path";
// Sneaker routes
import sneakerRoutes from "./routes/sneakerRoutes.mjs";

// Setting up the express app
const app = express();
const PORT = 3000;

// Middleware for parsing incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up the view engine to render EJS files
app.set("view engine", "ejs");

// using the cwd- current working direction
app.set("views", path.join(process.cwd(), "views"));

app.use(express.static(path.join(process.cwd(), "public")));

app.use("/api/sneakers", sneakerRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
