// login page get email and id--------------
// function logInBtn() {
//   const email = document.getElementById("email");
//   const pass = document.getElementById("password");
//   if (email.value === "admin" && pass.value === "admin123") {
//     // console.log(email.value, pass.value);
//     const mainPage = document.getElementById("mainPage");
//     const logInPage = document.getElementById("login-page");
//     logInPage.classList.add("hidden");
//     mainPage.classList.remove("hidden");
//   } else {
//     alert("Your mail and password are wrong (email:admin/pass:admin123) ");
//   }
// }

// loading spinner-------------------
const loadingSP = (st) => {
  const load = document.getElementById("loading");
  const dataCards = document.getElementById("show-cards");
  if (st === true) {
    load.classList.remove("hidden");
    dataCards.classList.add("hidden");
  } else {
    load.classList.add("hidden");
    dataCards.classList.remove("hidden");
  }
};

//createElement ---------------
const createEleArr = (labels) => {
  const newElement = labels.map((label) => {
    if (label === "bug") {
      return `<div class="badge badge-soft badge-error">${label}</div>`;
    } else if (label === "help wanted") {
      return `<div class="badge badge-soft badge-warning">${label}</div>`;
    } else if (label === "enhancement") {
      return `<div class="badge badge-soft badge-success">${label}</div>`;
    } else {
      return `<div class="badge badge-soft badge-info">${label}</div>`;
    }
  });

  return newElement.join(" ");
};

// all item show ------------------------
const allItemBtn = (allbtn) => {
  loadingSP(true);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  activeStyle(allbtn);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data);
      const l = data.data.length;

      issueCnt(l);
      displayData(data.data);
    });
};

// display all data--------------------------------------------------------------------------------
const displayData = (data) => {
  const displayDiv = document.getElementById("show-cards");

  displayDiv.innerHTML = " ";

  data.forEach((el) => {
    const card = document.createElement("div");
    // card.classList.add("disDIv");
    card.innerHTML = `
     

                <div onclick="loadDataById(${el.id})" id='card-on-${el.id}' class="card-no card-body bg-white rounded-2xl  border-t-4  h-full">
                    <div>
                    
                        <div id='card-badge-${el.id}' class= "card-badge badge badge-soft ">${el.priority}</div>
                    </div>
                    <h2 class="card-title">${el.title}</h2>
                    <p>${el.description}</p>
                    <div class="card-actions border-b-1 pb-5 border-gray-400 ">
                       ${createEleArr(el.labels)}
                    </div>
                    <p class="mt-1 text-gray-500">${el.author}</p>
                    <p class="text-gray-500">${el.createdAt}</p>

                </div>
            
    `;

    const badges = card.querySelector(".card-badge");
    const cardItem = card.querySelector(`.card-no`);
    if (badges && cardItem) {
      // console.log(badges.innerText);

      if (el.priority === "high") {
        badges.classList.add("badge-error");
        cardItem.classList.add("border-green-400");
      } else if (el.priority === "medium") {
        badges.classList.add("badge-warning");
        cardItem.classList.add("border-green-400");
      } else {
        // badges.classList.add("badge-success");
        cardItem.classList.add("border-purple-400");
      }
    }

    displayDiv.appendChild(card);
    loadingSP(false);
  });
};

// open itme btn----------------------------------------------------------

const openItemBtn = (opnBtn) => {
  loadingSP(true);
  activeStyle(opnBtn);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const arr = data.data.filter((issue) => issue.status === "open");
      const l = arr.length;

      issueCnt(l);
      displayData(arr);
    });
};

// closed btn---------------------------------------------
const closedBtn = (clsBtn) => {
  loadingSP(true);
  activeStyle(clsBtn);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const arr = data.data.filter((issue) => issue.status === "closed");
      const l = arr.length;

      issueCnt(l);

      displayData(arr);
    });
};

//issue cnt functon ()--------------------------
const issueCnt = (l) => {
  const issCtn = document.getElementById("issueCnt");
  issCtn.innerText = l;
};

//active style add in btnn-----------------------------------------------------------------------
const activeStyle = (id) => {
  const ar = ["allBtn", "openBtn", "clsBtn"];
  ar.forEach((el) => {
    const all = document.getElementById(el);
    all.classList.remove("btn-primary");
  });
  const selected = document.getElementById(id);
  selected.classList.add("btn-primary");
};

// show card modal using by id-------------------------------------------------------------------------

function loadDataById(id) {
  // console.log(id);
  loadingSP(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showModalDiv(data.data);
    });
}

const showModalDiv = (data) => {
  const details = document.getElementById("modal-details");
  document.getElementById("my_modal_1").showModal();

  details.innerHTML = `
    <h3 class="text-lg font-bold">${data.title}</h3>
                        <div class="flex gap-3 mt-2">
                            <div id='status-${data.ig}' class=" badge ">${data.status}</div>
                            <p class="flex items-center gap-1">
                                <span class="  bg-gray-500  w-1 h-1 rounded-full"></span>
                                <span>Open by ${data.author}</span>
                            </p>
                            <p class="flex items-center gap-1">
                                <span class="  bg-gray-500  w-1 h-1  rounded-full"></span>
                                <span>${data.createdAt}</span>
                            </p>

                        </div>
                        <div class="mt-7">
                          ${createEleArr(data.labels)}

                        </div>
                        <p class="mt-3 text-gray-500">${data.description}
                        </p>
                        <div class="flex bg-gray-100 gap-20 p-5 px-8 mt-7 rounded-xl">
                            <div class="space-y-1">
                                <h1 class="text-gray-500 font-semibold ">Assignee:</h1>
                                <p class="font-bold">${data.author}</p>
                            </div>
                            <div class="space-y-1">
                                <h1 class="text-gray-500 font-semibold">Assignee:</h1>
                                <div id='card-prio-${data.id}' class="badge ">${data.priority}</div>
                            </div>
                        </div>
  
  `;

  const prioBadge = document.getElementById(`card-prio-${data.id}`);

  // console.log(badges.innerText);

  if (`${data.priority}` === "high") {
    prioBadge.classList.add("badge-error");
  } else if (`${data.priority}` === "medium") {
    prioBadge.classList.add("badge-warning");
  }
  const statusStl = document.getElementById(`status-${data.ig}`);
  if (`${data.status}` === "open") {
    statusStl.classList.add("badge-success");
  } else statusStl.classList.add("badge-primary");
  loadingSP(false);
};

// search value------------------------------------------------
const searchItem = (id) => {
  loadingSP(true);
  const searchValue = document.getElementById(id);
  const word = searchValue.value.replace(/\s+/g, "").toLowerCase();
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const l = data.data.length;

      issueCnt(l);
      displayData(data.data);
    });
};

allItemBtn("allBtn");
