const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();
// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(fileUpload());

// template engine (Handlerbars)
app.set("view engine", "hbs");

// set path to getting folder data
app.set("views", path.join(__dirname, "src/views"));
// set directory asset to static
app.use(express.static("src/assets/gambar"));
app.use(express.static(path.join(__dirname, "src/assets")));
app.use(express.static(path.join(__dirname, "src")));

// import controller
const {
  home,
  contact,
  testimonials,
  addProject,
  detailProject,
  postProject,
  deleteProject,
  editProject,
} = require("./controllers/project");

// PORT
const PORT = 8080;

app.get("/", home);
app.get("/contact", contact);
app.get("/add-project", addProject);
app.get("/testimonials", testimonials);
app.get("/detail-project/:id", detailProject);
app.post("/add-project", postProject);
app.get("/delete-project/:id", deleteProject);
app.get("/edit-project/:id", editProject);

app.listen(PORT, () => {
  console.log("server is running in PORT : " + PORT);
});
