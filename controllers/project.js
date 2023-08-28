const path = require("path");

const cardData = [
  {
    title: "Dumbways Mobile App - 2021",
    startDate: "2023-08-03",
    endDate: "2023-11-03",
    duration: "5 Month",
    description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
    image: "../assets/gambar/project.png",
  },
  {
    title: "Dumbways Mobile App - 2023",
    startDate: "2023-08-03",
    endDate: "2023-11-03",
    duration: "1 Month",
    description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
    image: "../assets/gambar/project.png",
  },
];

// const frameworkIcon = [
//   {
//     value: "PHP",
//     icon: '<i class="fa-brands fa-php fs-1"></i>',
//   },
//   {
//     value: "Node js",
//     icon: '<i class="fa-brands fa-node-js fs-1"></i>',
//   },
//   {
//     value: "React js",
//     icon: '<i class="fa-brands fa-react fs-1"></i>',
//   },
//   {
//     value: "Java",
//     icon: '<i class="fa-brands fa-java fs-1"></i>',
//   },
// ];

const home = (req, res) => {
  res.render("index", { cardData });
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
  const { id } = req.params;

  res.render("detailProject", { detail: cardData[id] });
};

const postProject = async (req, res) => {
  const { inputTitle, startDate, endDate, inputDescription } = req.body;

  // Konversi ke objek Date
  let konversiStartDate = new Date(startDate);
  let konversiEndDate = new Date(endDate);

  // Menghitung selisih antara tanggal-tanggal tersebut dalam milisekon
  let timeDifference = konversiStartDate - konversiEndDate;

  // Mengubah milisekon menjadi hari,tahun,bulan
  let differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  let differenceInMonths = Math.floor(differenceInDays / 30.44);
  let differenceInYears = Math.floor(differenceInMonths / 12);

  let durationDate;

  if (differenceInYears > 0) {
    // console.log(differenceInYears + " years");
    durationDate = `${differenceInYears} years`;
  } else if (differenceInMonths > 0) {
    durationDate = `${differenceInMonths} months`;
    // console.log(differenceInMonths + " months");
  } else {
    durationDate = `${differenceInDays} days`;
    // console.log(differenceInDays + " days");
  }

  // // mengubah value framwork menjadi icon
  // const selectFramwork = frameworkIcon.filter((item) => {
  //   if (Array.isArray(framework)) {
  //     return framework.includes(item.value);
  //   } else {
  //     return item.value === framework;
  //   }
  // });

  // let iconHtml = "";
  // let valueIcon = "";
  // selectFramwork.forEach((icon) => {
  //   iconHtml += icon.icon;
  //   valueIcon += icon.value;
  // });

  // membuat dinamic upload image

  //membuat url image

  const imagePath = req.files.inputImage;
  const imageFolder = path.join(
    __dirname,
    "../src/assets/gambar/" + `${imagePath.name}`
  );

  //karna data nya bersifat promise jadi kita membutuhkan async await
  await imagePath.mv(imageFolder);
  const image = `/gambar/${imagePath.name}`;

  const data = {
    title: inputTitle,
    description: inputDescription,
    startDate,
    endDate,
    duration: durationDate,
    image,
  };

  cardData.push(data);

  res.redirect("/");
};

const deleteProject = (req, res) => {
  const { id } = req.params;

  cardData.splice(id, 1);
  res.redirect("/");
};

const editProject = (req, res) => {
  const { id } = req.params;

  res.render("editProject", { edit: cardData[id] });

  
};



module.exports = {
  home,
  contact,
  addProject,
  testimonials,
  detailProject,
  postProject,
  deleteProject,
  editProject,
};
