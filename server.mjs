import express from "express";
import path from "path";
import sneakerRoutes from "./routes/sneakerRoutes.mjs";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

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
