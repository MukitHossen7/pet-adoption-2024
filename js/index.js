// remove-button-style-function
const removeBtn = () => {
  const button = document.getElementsByClassName("category-btn");
  for (let btn of button) {
    btn.classList.remove("bg-[#F1F5F9]", "rounded-full", "border-primary");
    btn.classList.add("rounded-2xl");
  }
};
// remove-button-style-function

// Fetch-Pets-by-Category-function
const fetchPetByCategory = async (categoryName) => {
  document.getElementById("cardLoading").style.display = "block";
  document.getElementById("mainCardContainer").classList.add("hidden");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await res.json();

  const activeBtn = document.getElementById(`btn-${categoryName}`);
  removeBtn();
  activeBtn.classList.add("bg-[#F1F5F9]", "rounded-full", "border-primary");
  activeBtn.classList.remove("rounded-2xl");
  displayCardFunction(data.data);
  setTimeout(() => {
    document.getElementById("cardLoading").style.display = "none";
    document.getElementById("mainCardContainer").classList.remove("hidden");
  }, 2000);
};
// Fetch-Pets-by-Category-function

// categories-btn-function
const loadCategories = async () => {
  document.getElementById("loadingBar").style.display = "none";
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayCategories(data.categories);
};

const displayCategories = (categories) => {
  const btnCategory = document.getElementById("btnCategory");
  categories.forEach((dataCate) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button id="btn-${dataCate.category}"  onclick="fetchPetByCategory('${dataCate.category}')" 
          class="flex items-center justify-center gap-5 border-2 border-[rgba(14,122,129,0.15)] px-8 md:px-14 py-4 md:py-6 rounded-2xl w-full category-btn"
        >
          <img src="${dataCate.category_icon}" alt="" />
          <span class="font-extrabold text-dark1 text-2xl">${dataCate.category}</span>
        </button>
      `;
    btnCategory.append(div);
  });
};

//   spinner-function
const setLoadingFunction = () => {
  document.getElementById("loadingBar").style.display = "block";
  setTimeout(() => {
    loadCategories();
  }, 2000);
};

setLoadingFunction();
//   spinner-function
// categories-btn-function

// load-all-cards-function
const loadAllPet = async () => {
  document.getElementById("cardLoading").style.display = "none";
  document.getElementById("mainCardContainer").classList.remove("hidden");

  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  displayCardFunction(data.pets);
};

const displayCardFunction = (petsData) => {
  const cardContainer = document.getElementById("cardContainer");
  document.getElementById("cardContainer").innerHTML = "";
  if (petsData.length === 0) {
    cardContainer.classList.remove("grid");
    document.getElementById("cardContainer").innerHTML = `
        <div class="flex flex-col justify-center items-center text-center mt-10 bg-slate-100 py-20 rounded-xl">
        <img src="./images/error.webp" alt="" class="mb-8" />
        <h2 class="font-bold text-dark1 text-2xl">No Information Available</h2>
        <p class="w-1/2 text-[rgba(19,19,19,0.7)] mt-4">
          The requested content or information related to [specific topic] is
          currently unavailable. Please try again later or contact support if
          the issue persists.
        </p>
      </div>
    `;
    return;
  } else {
    cardContainer.classList.add("grid");
    petsData.forEach((pet) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card border border-slate-100 p-5">
                  <figure class="rounded-xl mb-6 object-cover">
                    <img
                      src="${pet.image}"
                      alt="pets" class="h-full w-full object-cover rounded-xl"
                    
                    />
                  </figure>
                  <div class="pb-3">
                    <h2 class="font-extrabold text-dark1 text-xl">
                   ${pet.pet_name}
                    </h2>
                    <div class="flex flex-col gap-2 mt-2">
                      <div class="flex gap-2 items-center">
                        <img src="./images/Frame.png" alt="" />
                        <span class="text-[rgba(19,19,19,0.7)] font-medium"
                          >Breed: ${pet.breed ?? "Not available"}</span
                        >
                      </div>
                      <div class="flex gap-2 items-center">
                        <img src="./images/Frame (1).png" alt="" />
                        <span class="text-[rgba(19,19,19,0.7)] font-medium"
                          >Birth: ${pet.date_of_birth ?? "Not available"}</span
                        >
                      </div>
                      <div class="flex gap-2 items-center">
                        <img src="./images/femenine.png" alt="" class="w-5" />
                        <span class="text-[rgba(19,19,19,0.7)] font-medium"
                          >Gender: ${pet.gender ?? "Not available"}</span
                        >
                      </div>
                      <div class="flex gap-2 items-center justify-start">
                        <img src="./images/dollar.png" alt="" class="w-5" />
  
                        <span class="text-[rgba(19,19,19,0.7)] font-medium"
                          >Price: ${pet.price ?? "Not available"}$</span
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex gap-4 items-center border-t-2 pt-4 border-[rgba(19,19,19,0.1)]"
                  >
                    <div onclick="imageLoadAPI('${pet.petId}')"
                      class="border-2 border-[rgba(14,122,129,0.15)] px-3 py-1 rounded-lg"
                    >
                      <img src="./images/like.png" alt="" class="w-5" />
                    </div>
                    <button onclick="timerCountdown(this)"
                      class="border-2 border-[rgba(14,122,129,0.15)] px-3 py-1 rounded-lg text-primary font-bold"
                    >
                      Adopt
                    </button>
                    <button onclick="showDetails('${pet.petId}')"
                      class="border-2 border-[rgba(14,122,129,0.15)] px-3 py-1 rounded-lg text-primary font-bold"
                    >
                      Details
                    </button>
                  </div>
                </div>
      `;
      cardContainer.append(div);
    });
  }
};
// spinner-area
const loadingCard = () => {
  document.getElementById("cardLoading").style.display = "block";
  document.getElementById("mainCardContainer").classList.add("hidden");

  setTimeout(() => {
    loadAllPet();
  }, 2000);
};
loadingCard();
// spinner-area
// load-all-cards-function

// show-details-function
const showDetails = async (showID) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${showID}`
  );
  const data = await res.json();
  displayDetails(data.petData);
};
const displayDetails = (display) => {
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = `
        <div class="w-full">
        <div>
          <img src="${
            display.image
          }" alt="" class=" w-full h-full object-cover rounded-xl" />
        </div>
        <h2 class="font-bold text-3xl text-dark1 mt-6">${display.pet_name}</h2>
        <div class="grid grid-cols-2 items-center mt-4  text-slate-400 font-semibold">
          <div class="flex gap-2 items-center">
            <img src="./images/Frame.png" alt="" />
            <p>Breed:${display.breed ?? "Not available"}</p>
          </div>
          <div class="flex gap-2 items-center">
            <img src="./images/Frame (1).png" alt="" />
            <p>Birth:${display.date_of_birth ?? "Not available"}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 items-center text-slate-400 font-semibold mt-2">
          <div class="flex gap-2 items-center ">
            <img src="./images/femenine.png" alt="" class="w-4" />
            <p>Gender:${display.gender ?? "Not available"}</p>
          </div>
          <div class="flex gap-2 items-center">
            <img src="./images/dollar.png" alt="" class="w-4" />
            <p>Price:${display.price ?? "Not available"}$</p>
          </div>
        </div>
        <div class="flex gap-2 items-center pb-3  text-slate-400 font-semibold mt-2">
          <img src="./images/femenine.png" alt="" class="w-4" />
          <p>Vaccinated status: ${
            display.vaccinated_status ?? "Not available"
          }</p>
        </div>
        <div class="border-t-2 border-slate-100 pt-3">
          <h4 class="font-bold text-xl text-dark1 ">Details Information</h4>
          <p class=" text-slate-500 mt-3">${display.pet_details}</p>
         
        </div>
          <div class="modal-action w-full">
          <form method="dialog" class="w-full">
           
            <button class="btn w-full bg-slate-200 text-primary font-bold text-lg">Cancel</button>
          </form>
        </div>
        </div>
  `;

  document.getElementById("my_modal").showModal();
};
// show-details-function

// countdown-timer-function
function timerCountdown(btn) {
  const count = document.getElementById("count");
  let countValue = count.innerText;
  let x = parseFloat(countValue);

  timer_modal.showModal();

  const myCount = setInterval(() => {
    x--;
    count.innerText = x;
    if (x <= 0) {
      clearInterval(myCount);
      timer_modal.close();
      count.innerText = countValue;
      btn.disabled = true;
      btn.innerText = "Adopted";
    }
  }, 1000);
}
// countdown-timer-function

// sortting-by-price-function
const sortByPrice = async () => {
  document.getElementById("mainCardContainer").classList.add("hidden");
  document.getElementById("cardLoading").style.display = "block";
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  document.getElementById("cardContainer").innerHTML = "";
  setTimeout(() => {
    document.getElementById("mainCardContainer").classList.remove("hidden");
    document.getElementById("cardLoading").style.display = "none";
  }, 2000);

  data.pets.sort((p1, p2) => parseFloat(p2.price) - parseFloat(p1.price));
  data.pets.forEach((post) => {
    document.getElementById("cardContainer").innerHTML += `
    <div class="card border border-slate-100 p-5">
                  <figure class="rounded-xl mb-6 object-cover">
                    <img
                      src="${post.image}"
                      alt="pets" class="w-full h-full object-cover rounded-xl"
                    
                    />
                  </figure>
                  <div class="pb-3">
                    <h2 class="font-extrabold text-dark1 text-xl">
                   ${post.pet_name}
                    </h2>
                    <div class="flex flex-col gap-2 mt-2">
                      <div class="flex gap-2 items-center">
                        <img src="./images/Frame.png" alt="" />
                        <span class="text-[rgba(19,19,19,0.7)] font-medium"
                          >Breed: ${post.breed ?? "Not available"}</span
                        >
                      </div>
                      <div class="flex gap-2 items-center">
                        <img src="./images/Frame (1).png" alt="" />
                        <span class="text-[rgba(19,19,19,0.7)] font-medium"
                          >Birth: ${post.date_of_birth ?? "Not available"}</span
                        >
                      </div>
                      <div class="flex gap-2 items-center">
                        <img src="./images/femenine.png" alt="" class="w-5" />
                        <span class="text-[rgba(19,19,19,0.7)] font-medium"
                          >Gender: ${post.gender ?? "Not available"}</span
                        >
                      </div>
                      <div class="flex gap-2 items-center justify-start">
                        <img src="./images/dollar.png" alt="" class="w-5" />
  
                        <span class="text-[rgba(19,19,19,0.7)] font-medium"
                          >Price: ${post.price ?? "Not available"}$</span
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex gap-4 items-center border-t-2 pt-4 border-[rgba(19,19,19,0.1)]"
                  >
                    <div onclick= "imageLoadAPI('${post.petId}')"
                      class="border-2 border-[rgba(14,122,129,0.15)] px-3 py-1 rounded-lg"
                    >
                      <img src="./images/like.png" alt="" class="w-5" />
                    </div>
                    <button onclick="timerCountdown(this)"
                      class="border-2 border-[rgba(14,122,129,0.15)] px-3 py-1 rounded-lg text-primary font-bold"
                    >
                      Adopt
                    </button>
                    <button onclick="showDetails('${post.petId}')"
                      class="border-2 border-[rgba(14,122,129,0.15)] px-3 py-1 rounded-lg text-primary font-bold"
                    >
                      Details
                    </button>
                  </div>
                </div>
    `;
  });
};
// sortting-by-price-function

// display-single-image
const imageLoadAPI = async (imgId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${imgId}`
  );
  const data = await res.json();
  displayImages(data.petData);
};

const displayImages = (imgs) => {
  const showContainer = (document.getElementById(
    "showImageContainer"
  ).innerHTML += `
    <img
                src="${imgs.image}"
                alt=""
                class="w-40 h-36 object-cover rounded-lg"
      />
  `);
};

// display-single-image
