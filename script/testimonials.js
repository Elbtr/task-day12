const dataIconRating = [
  {
    rating: "all",
  },
  {
    rating: "1",
  },
  {
    rating: "2",
  },
  {
    rating: "3",
  },
  {
    rating: "4",
  },
  {
    rating: "5",
  },
];

const testimonials = new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();

  request.open("GET", "https://api.npoint.io/e360bc70db807e68973b", true);

  request.onload = () => {
    if (request.status == 200) {
      resolve(JSON.parse(request.response));
    } else {
      reject("somthing when wrong");
    }
  };
  request.onerror = () => {
    reject("request error");
  };

  request.send();
});

const selectAllRating = async () => {
  try  {
    let allRatingHtml = "";

    const response = await testimonials;

    if (response.length == 0) {
      const messageEmptyData = document.getElementById("message-empty-data");
      messageEmptyData.style.display = "block";
      messageEmptyData.style.textAlign = "center";
      messageEmptyData.innerHTML = `<h2>Empty Data!!</h2>`;
    } else {
      response.forEach((item) => {
        allRatingHtml += `
          <div class="card-testimonial">
              <div class="image-testimonial">
                  <img src="${item.image}" alt="testimonial" />
              </div>
              <div class="content-testimonial">
                  <h4 class="quote">${item.quote}</h4>
                  <p class="author">~${item.author}</p>
                  <p class="author">
                  ${item.rating}
                  <i class="fa-solid fa-star"></i>
                  </p>
              </div>
           </div>
                  `;
      });
      const messageEmptyData = document.getElementById("message-empty-data");
      messageEmptyData.style.display = "none";
    }
    document.getElementById("card-content-testimonials").innerHTML =
      allRatingHtml;
  } catch (err) {
    console.log(err);
  }
};

selectAllRating();

const filterRating = async (rating) => {
  try {
    const response = await testimonials;

    let ratingHtml = "";

    const filtered = response.filter((item) => {
      return item.rating === rating;
    });

    if (filtered.length == 0) {
      const messageEmptyData = document.getElementById("message-empty-data");
      messageEmptyData.style.display = "block";
      messageEmptyData.style.textAlign = "center";
      messageEmptyData.innerHTML = `<h2>Sory your data not found!!</h2>`;
    } else {
      const messageEmptyData = document.getElementById("message-empty-data");
      messageEmptyData.style.display = "none";
      filtered.forEach((item) => {
        ratingHtml += `
          <div class="card-testimonial">
              <div class="image-testimonial">
                  <img src="${item.image}" alt="testimonial" />
              </div>
              <div class="content-testimonial">
                  <h4 class="quote">${item.quote}</h4>
                  <p class="author">~${item.author}</p>
                  <p class="author">
                  ${item.rating}
                  <i class="fa-solid fa-star"></i>
                  </p>
              </div>
           </div>
                  `;
      });
    }

    document.getElementById("card-content-testimonials").innerHTML = ratingHtml;
  } catch (error) {
    console.log(error);
  }
};

const buttonClick = () => {
  let dataIcon = {};
  // icon
  const starSolid = "fa-solid fa-star";
  const starRegular = "fa-regular fa-star";

  // push kedalam icon
  dataIcon = {
    starSolid,
    starRegular,
  };

  // html element
  let iconHtml = "";
  const number = [1, 2, 3, 4, 5];

  const ratingButtonsOnClick = number
    .map(
      (num) => `
  <button class="select-rating" onclick="filterRating('${num}')">
    ${num}<i class="${dataIcon.starRegular}"></i>
  </button>
`
    )
    .join("");

  dataIconRating.forEach((item) => {
    if (item.rating === "all") {
      iconHtml += `
          <button class="select-rating" onclick="selectAllRating('all')">
            ${item.rating}<i class="${dataIcon.starSolid}"></i>
          </button>
        `;
    }
  });
  iconHtml += ratingButtonsOnClick;

  const createButtonElement = document.getElementById("select-rating");
  createButtonElement.innerHTML = iconHtml;
};

buttonClick();
