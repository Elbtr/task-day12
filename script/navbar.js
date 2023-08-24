let isOpenToggle = false;

const toggleBarHandle = () => {
  const buttonBar = document.getElementById("item-list-menu-bars");
  if (!isOpenToggle) {
    buttonBar.style.display = "none";
    isOpenToggle = true;
  } else {
    buttonBar.style.display = "block";
    isOpenToggle = false;
  }
};

// Fungsi untuk mengatur tampilan berdasarkan lebar layar
const handleViewportChange = () => {
  if (window.innerWidth >= 600) {
    // Jika lebar layar lebih besar atau sama dengan 768 (mode desktop)
    document.getElementById("item-list-menu-bars").style.display = "none";
    isOpenToggle = false;
  }
};

// Panggil fungsi saat halaman dimuat
window.onload = handleViewportChange;

// Panggil fungsi saat lebar layar berubah
window.addEventListener("resize", handleViewportChange);
