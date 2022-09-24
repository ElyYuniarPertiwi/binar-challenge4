const url = "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json";

const content = document.getElementById("cars-container");
const inputDate = document.getElementById("date");
const inputTime = document.getElementById("pickup");
const jmlPenumpang = document.getElementById("numofpassenger");
const submitBtn = document.getElementById("btnSearch");

// data CARS daroo local storage
let isClicked = false
let data = localStorage.getItem("CAR");
data = JSON.parse(data);

function showResult(params) {
  for (const x of params) {
    const div = document.createElement("div");
    div.classList.add("carContainer");
    div.classList.add("align-items-stretch");
    div.innerHTML = `
        <div class="card p-3">
        <img src="${x.image}" alt="" class="w-100 h-100" style="max-height: 160px">
        <div>
          <p class="fw-bold mt-1">${x.manufacture}/${x.model}</p>
        </div>
        <div>
          <h5 class="fw-bolder">Rp. ${x.rentPerDay} / hari</h5>
        </div>
        <div>
          <p>${
            x.description != ""
              ? x.description
              : "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet mollitia exercitationem vel iure! Eligendi, delectus."
          }</p>
        </div>
        <div>
          <span><i class="bi bi-people me-3"></i>${x.capacity} Orang</span>
        </div>
        <div>
          <span><i class="bi bi-gear me-3"></i>${x.transmission}</span>
        </div>
        <div>
          <span><i class="bi bi-calendar me-3"></i>Tahun ${x.year}</span>
        </div>
        <button class="btn btn-success"> Pilih Mobil</button>
      </div>`;
    content.append(div);
  }
}

function deleteData() {
  content.innerHTML = "";
}

function clickBtn() {
  isClicked = true
  let newArr = [];
  if (
    inputDate.value !== "" &&
    inputTime.value !== "" &&
    jmlPenumpang.value !== ""
  ) {
    let inputDateTime = Date.parse(
      inputDate.value + "T" + inputTime.value + "Z"
    );
    newArr = data.filter((x) => Date.parse(x.availableAt) >= inputDateTime);
    newArr = newArr.filter((x) => x.capacity >= jmlPenumpang.value);
    deleteData();
    showData(newArr);
  }
  if (
    inputDate.value !== "" &&
    inputTime.value !== "" &&
    jmlPenumpang.value === ""
  ) {
    let inputDateTime = Date.parse(
      inputDate.value + "T" + inputTime.value + "Z"
    );
    newArr = [];
    newArr = data.filter((x) => Date.parse(x.availableAt) >= inputDateTime);
    deleteData();
    showData(newArr);
  }
  if (
    inputDate.value === "" &&
    inputTime.value === "" &&
    jmlPenumpang.value !== ""
  ) {
    newArr = [];
    newArr = data.filter((x) => x.capacity >= jmlPenumpang.value);
    deleteData();
    showData(newArr);
  }
  if (inputDate.value !== "" && inputTime.value === "") {
    alert("Anda perlu memasukkan jam terlebih dahulu");
  }
  if (inputDate.value === "" && inputTime.value !== "") {
    alert("Anda perlu memasukkan tanggal terlebih dahulu");
  }
}

if (isClicked) showResult(data);
submitBtn.addEventListener("click", clickBtn);
