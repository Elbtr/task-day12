const home = (req, res) => {
  res.render("index");
};

const contact = (req, res) => {
  res.render("contact");
};

const addProject = (req, res) => {
  res.render("addProject");
};

const testimonials = (req, res) => {
  res.render("testimonials");
};

const detailProject = (req, res) => {
  res.remder("detailProject");
};

const postProject = (req, res) => {
  const {
    inputTitle,
    startDate,
    endDate,
    inputDescription,
    framework,
    inputImage,
  } = req.body;

  console.log(inputTitle);
  console.log(startDate);
  console.log(endDate);
  console.log(inputDescription);
  console.log(framework);
  console.log(inputImage);
  res.redirect("/");
};

module.exports = {
  home,
  contact,
  addProject,
  testimonials,
  detailProject,
  postProject,
};
