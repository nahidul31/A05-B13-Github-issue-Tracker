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

// all item show ------------------------
const allItemBtn = (allbtn) => {
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
// allItemBtn();
// display all data--------------------------------------------------------------------------------
const displayData = (data) => {
  const displayDiv = document.getElementById("show-cards");

  displayDiv.innerHTML = " ";
  //   "id": 1,
  //       "title": "Fix navigation menu on mobile devices",
  //       "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
  //       "status": "open",
  //       "labels": [
  //         "bug",
  //         "help wanted"
  //       ],
  //       "priority": "high",
  //       "author": "john_doe",
  //       "assignee": "jane_smith",
  //       "createdAt": "2024-01-15T10:30:00Z",
  //       "updatedAt": "2024-01-15T10:30:00Z"
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
                        <div class="badge badge-soft badge-error">Error</div>
                        <div class="badge badge-soft badge-warning">Warning</div>
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
    // const badges = document.getElementById(`card-badge-${el.id}`);
  });
};

// open itme btn----------------------------------------------------------

const openItemBtn = (opnBtn) => {
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
  activeStyle(clsBtn);
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const arr = data.data.filter((issue) => issue.status === "closed");
      const l = arr.length;

      // const displayDiv = document.querySelectorAll("disDiv");
      issueCnt(l);
      // displayDiv.innerHTML = " ";
      displayData(arr);
    });
};

//issue cnt functon ()--------------------------
const issueCnt = (l) => {
  const issCtn = document.getElementById("issueCnt");
  issCtn.innerText = l;
};

//active style add in btnn--------------------------------------------------
const activeStyle = (id) => {
  const ar = ["allBtn", "openBtn", "clsBtn"];
  ar.forEach((el) => {
    const all = document.getElementById(el);
    all.classList.remove("btn-primary");
  });
  const selected = document.getElementById(id);
  selected.classList.add("btn-primary");
};

// show card modal using by id---------------------
function loadDataById(id) {
  // console.log(id);
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

  //   {
  //   "status": "success",
  //   "message": "Issue fetched successfully",
  //   "data": {
  //     "id": 33,
  //     "title": "Add bulk operations support",
  //     "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
  //     "status": "open",
  //     "labels": [
  //       "enhancement"
  //     ],
  //     "priority": "low",
  //     "author": "bulk_barry",
  //     "assignee": "",
  //     "createdAt": "2024-02-02T10:00:00Z",
  //     "updatedAt": "2024-02-02T10:00:00Z"
  //   }
  // }

  details.innerHTML = `
    <h3 class="text-lg font-bold">${data.title}</h3>
                        <div class="flex gap-3 mt-2">
                            <div class="badge badge-success">${data.status}</div>
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
                            <div class="badge badge-soft badge-error">Error</div>
                            <div class="badge badge-soft badge-warning">Warning</div>

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
                                <div class="badge badge-error">${data.priority}</div>
                            </div>
                        </div>
  
  `;
};
allItemBtn("allBtn");
