const dataProject = [];
const durationDate = {};

function addBlog(event) {
  event.preventDefault();

  // Mengambil nilai dari elemen form
  let title = document.getElementById("input-title").value;
  let startDateInput = document.getElementById("start-date").value;
  let endDateInput = document.getElementById("end-date").value;
  let description = document.getElementById("input-description").value;
  let checkboxes = document.querySelectorAll(
    'input[type="checkbox"][name="framework"]:checked'
  );
  let image = document.getElementById("input-image");

  if (title === "") {
    return alert("Please entered your Title Project");
  }
  if (description === "") {
    return alert("Please entered description");
  } // Ambil file gambar dari elemen input

  if (startDateInput === "") {
    return alert("Please choose your start date");
  }
  if (endDateInput === "") {
    return alert("Please choose your end date");
  }
  if (startDateInput > endDateInput) {
    return alert("start date cannot be greater than end date");
  }

  // Buat URL dari file gambar

  let imageFile = image.files[0];

  let imageUrl = URL.createObjectURL(imageFile);

  if (imageUrl === "") {
    return alert("Your image can't be empty");
  }
  if (!imageUrl) {
    return alert("not file empty");
  }

  // Mengambil nilai dari checkbox yang dipilih
  const selectedFrameworks = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );
  if (selectedFrameworks.length === 0) {
    return alert("Please choose your Technologies");
  }

  // Mengambil nilai tanggal dari input dan memformatnya ke dalam format yang dikenali oleh objek Date

  let startDateParts = startDateInput.split("/");
  let endDateParts = endDateInput.split("/");

  // Format tanggal ke dalam "YYYY-MM-DD"
  let formattedStartDate =
    startDateParts[2] + "-" + startDateParts[1] + "-" + startDateParts[0];
  let formattedEndDate =
    endDateParts[2] + "-" + endDateParts[1] + "-" + endDateParts[0];

  // Konversi ke objek Date
  let startDate = new Date(formattedStartDate);
  let endDate = new Date(formattedEndDate);

  // Menghitung selisih antara tanggal-tanggal tersebut dalam milisekon
  let timeDifference = endDate - startDate;

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

  // Menambahkan data ke array dataProject
  dataProject.push({
    title: title,
    startDateInput,
    endDateInput,
    description: description,
    frameworks: selectedFrameworks,
    durationDate,
    imageUrl,
    nodeJs,
    reactJs,
    php,
    java,
  });

  newData();
}

function newData() {
  document.getElementById("list-project").innerHTML = "";

  for (let i = 0; i < dataProject.length; i++) {
    const project = dataProject[i];
    // console.log(project.frameworks);
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

    document.getElementById("list-project").innerHTML += `
    <div class="card" id="card">
          <img
            src="${project.imageUrl}"
            alt="project"
            style="width: 100%; height: 200px; border-radius: 8px"
          />
          <div style="padding: 0">
            <h5>${project.title}</h5>
            <p style="font-weight: 200">duration : ${project.durationDate}</p>
          </div>
          <div style="padding: 0">
            <p style="
            font-weight: 400;
            white-space: normal;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          ">
              ${project.description}
            </p>
            <a
              href="detailProject.html"
              style="font-size: 13px; text-decoration: underline"
              >lihat selengkap nya <span style="font-weight: bold">-></span></a
            >
          </div>
          <section
            style="
              font-size: 24px;
              display: flex;
              justify-content: start;
              align-items: center;
              gap: 20px;
            "
          >
          ${iconString}
          </section>
          <div
            style="
              padding: 0;
              display: flex;
              justify-content: space-between;
              gap: 5px;
            "
          >
            <button
              style="
                width: 50%;
                padding: 7px 0;
                background-color: chocolate;
                border: none;
                border-radius: 5px;
                cursor: pointer;
              "
            >
              edit
            </button>
            <button
              style="
                width: 50%;
                padding: 7px 0;
                background-color: chocolate;
                border: none;
                border-radius: 5px;
                cursor: pointer;
              "
            >
              delete
            </button>
          </div>
        </div>

    `;
  }
}
