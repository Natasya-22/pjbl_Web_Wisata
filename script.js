// === DATA AWAL ===
const dataWisata = [
  { nama: "Candi Muaro Jambi", lokasi: "Kabupaten Muaro Jambi", kategori: "Sejarah", deskripsi: "Kompleks candi Buddha terbesar di Asia Tenggara, peninggalan Kerajaan Melayu Kuno.", gambar: "Candi Muaro Jambi.png" },
  { nama: "Danau Kaco", lokasi: "Kabupaten Kerinci", kategori: "Danau", deskripsi: "Danau biru jernih di tengah hutan Taman Nasional Kerinci Seblat, terkenal karena airnya yang berkilau.", gambar: "Danau Kaco.jpg" },
  { nama: "Air Terjun Telun Berasap", lokasi: "Kabupaten Kerinci", kategori: "Air Terjun", deskripsi: "Air terjun megah dengan kabut halus menyerupai asap, dikelilingi hutan tropis lebat.", gambar: "Air Terjun Telun Berasap.jpg" },
  { nama: "Gunung Kerinci", lokasi: "Kabupaten Kerinci", kategori: "Alam", deskripsi: "Gunung tertinggi di Sumatera dan ikon pendakian di Indonesia.", gambar: "Gunung Kerinci.webp" },
  { nama: "Wisata Perahu Ketek Batanghari", lokasi: "Sungai Batanghari, Kota Jambi", kategori: "Alam", deskripsi: "Kamu bisa menaiki ketek sambil menikmati pemandangan Kota Jambi di tepi Sungai Batanghari.", gambar: "Wisata Perahu Ketek Batanghari.jpg" },
  { nama: "Jembatan Gentala Arasy", lokasi: "Kota Jambi", kategori: "Sejarah", deskripsi: "Ikon modern Kota Jambi di atas Sungai Batanghari dengan arsitektur megah.", gambar: "Jembatan Gentala Arasy.jpg" }
];

let favorites = [];
let userLogin = false;
let isAdmin = false;
let currentList = dataWisata;

// === RENDER WISATA ===
function renderWisata(list) {
  const container = document.getElementById("wisataList");
  const notFound = document.getElementById("notFound");
  container.innerHTML = "";

  if (list.length === 0) {
    notFound.style.display = "block";
    return;
  } else {
    notFound.style.display = "none";
  }

  list.forEach((w, i) => {
    container.innerHTML += `
      <div class="card">
        <img src="${w.gambar}" alt="${w.nama}">
        <div class="card-content">
          <h3>${w.nama}</h3>
          <p>${w.lokasi}</p>
          <button onclick="showDetailFromList(${i})">Detail</button>
          <button onclick="addFavorite(${i})">❤️ Favorit</button>
          ${isAdmin ? `<button onclick="hapusWisata(${i})" style="background:#ff6b6b;">🗑️ Hapus</button>` : ""}
        </div>
      </div>
    `;
  });
  currentList = list;
}
renderWisata(dataWisata);

// === PENCARIAN ===
document.getElementById("searchInput").addEventListener("input", function() {
  const keyword = this.value.toLowerCase();
  const filtered = dataWisata.filter(w => w.nama.toLowerCase().includes(keyword));
  renderWisata(filtered);
});

// === FILTER KATEGORI ===
document.getElementById("categorySelect").addEventListener("change", function() {
  const cat = this.value;
  if (cat === "all") renderWisata(dataWisata);
  else renderWisata(dataWisata.filter(w => w.kategori === cat));
});

// === DETAIL MODAL ===
function showDetailFromList(index) {
  const w = currentList[index];
  document.getElementById("detailName").innerText = w.nama;
  document.getElementById("detailImage").src = w.gambar;
  document.getElementById("detailLocation").innerText = "Lokasi: " + w.lokasi;
  document.getElementById("detailDescription").innerText = w.deskripsi;
  document.getElementById("detailModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("detailModal").style.display = "none";
}

// === LOGIN ===
function loginAsGuest() {
  userLogin = true;
  isAdmin = false;
  document.getElementById("loginMessage").innerText = "Login sebagai Tamu 👤";
  document.getElementById("logoutBox").style.display = "block";
}

function loginAsAdmin() {
  const pass = prompt("Masukkan password admin:");
  if (pass === "123456") {
    userLogin = true;
    isAdmin = true;
    document.getElementById("loginMessage").innerText = "Login sebagai Admin 👑";
    document.getElementById("adminPanel").style.display = "block";
    document.getElementById("logoutBox").style.display = "block";
    renderWisata(dataWisata);
  } else {
    alert("Password salah!");
  }
}

function logout() {
  userLogin = false;
  isAdmin = false;
  document.getElementById("loginMessage").innerText = "Berhasil logout.";
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("logoutBox").style.display = "none";
  renderWisata(dataWisata);
}

// === FAVORIT ===
function addFavorite(i) {
  if (!userLogin) {
    alert("Silakan login dulu sebelum menambahkan favorit!");
    return;
  }
  const item = currentList[i];
  if (!favorites.includes(item)) {
    favorites.push(item);
    renderFavorites();
  }
}

function renderFavorites() {
  const container = document.getElementById("favoriteList");
  container.innerHTML = "";
  favorites.forEach((f, i) => {
    container.innerHTML += `
      <div class="card">
        <img src="${f.gambar}" alt="${f.nama}">
        <div class="card-content">
          <h3>${f.nama}</h3>
          <p>${f.lokasi}</p>
          <button onclick="showDetailFavorite(${i})">Detail</button>
        </div>
      </div>`;
  });
}

function showDetailFavorite(i) {
  const w = favorites[i];
  document.getElementById("detailName").innerText = w.nama;
  document.getElementById("detailImage").src = w.gambar;
  document.getElementById("detailLocation").innerText = "Lokasi: " + w.lokasi;
  document.getElementById("detailDescription").innerText = w.deskripsi;
  document.getElementById("detailModal").style.display = "flex";
}




// === GANTI HALAMAN ===
function showSection(id) {
  document.querySelectorAll(".page-section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}
