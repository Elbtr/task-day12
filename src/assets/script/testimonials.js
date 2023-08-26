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
  try {
    let allRatingHtml = "";

    const response = await testimonials;

    if (response.length == 0) {
      const messageEmptyData = document.getElementById("message-empty-data");
      messageEmptyData.style.display = "block";
      messageEmptyData.style.marginTop = "40px";
      messageEmptyData.style.textAlign = "center";
      messageEmptyData.innerHTML = `<h2>Empty Data!!</h2>`;
    } else {
      response.forEach((item) => {
        allRatingHtml += `
          <div class="card mt-2" style="width: 18rem; padding: 3px">
                  <img src="${item.image}" class="card-img-top" alt="testimonial" />     
              <div class="card-body">
                  <h4 class="quote">${item.quote}</h4>
                  <p class="text-end">~${item.author}</p>
                  <p class="text-end">
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
    document.getElementById("testimonials-item").innerHTML = allRatingHtml;
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
      messageEmptyData.style.marginTop = "40px";
      messageEmptyData.innerHTML = `<h2>Sorry your data not found!!</h2>`;
    } else {
      const messageEmptyData = document.getElementById("message-empty-data");
      messageEmptyData.style.display = "none";
      filtered.forEach((item) => {
        ratingHtml += `
        <div class="card mt-2" style="width: 18rem; padding: 3px">
            <img src="${item.image}" class="card-img-top" alt="testimonial" />     
          <div class="card-body">
            <h4 class="quote">${item.quote}</h4>
            <p class="text-end">~${item.author}</p>
            <p class="text-end">
              ${item.rating}
              <i class="fa-solid fa-star"></i>
            </p>
          </div>
        </div>
                  `;
      });
    }

    document.getElementById("testimonials-item").innerHTML = ratingHtml;
  } catch (error) {
    console.log(error);
  }
};
