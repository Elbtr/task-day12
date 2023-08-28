const dataProject = [];

function addBlog(event) {
  event.preventDefault();
  // Mengambil nilai dari elemen form
  let checkboxes = document.querySelectorAll(
    'input[type="checkbox"][name="framework"]:checked'
  );
  // Mengambil nilai dari checkbox yang dipilih
  const selectedFrameworks = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );
  if (selectedFrameworks.length === 0) {
    return alert("Please choose your Technologies");
  }

  // Menambahkan data ke array dataProject
  dataProject.push({
    frameworks: selectedFrameworks,
  });

  newData();
}

function newData() {
  document.getElementById("list-project").innerHTML = "";

  for (let i = 0; i < framework.length; i++) {
    const project = dataProject[i];
    const nameFrameworks = project.frameworks;

    const iconString = nameFrameworks
      .map((framework) => {
        if (project.frameworks.includes(framework)) {
          switch (framework) {
            case "React js":
              return `<i class="fa-brands fa-react"></i>`;
            case "Node js":
              return `<i class="fa-brands fa-node-js"></i>`;
            case "Java":
              return `<i class="fa-brands fa-java"></i>`;
            case "PHP":
              return `<i class="fa-brands fa-php"></i>`;
            default:
              return "";
          }
        }
        return "";
      })
      .join("");

    document.getElementById("icon-select").innerHTML = `
    ${iconString}
    `;
  }
}
