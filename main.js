document.addEventListener("DOMContentLoaded", function () {
    // LocalStorage-dan aktiv istifadəçini yoxlayırıq
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  
    // HTML elementlərini götürürük
    const navIcons = document.querySelector(".nav_icons");
    const searchButton = document.querySelector(".whatAreYouLookingFor");
    const usernameSpan = document.querySelector(".username");
    const logoutBtn = document.querySelector(".logout-btn");
    const loginBtn = document.querySelector(".login-btn");
  
    if (activeUser) {
      // Əgər istifadəçi login olubsa:
      navIcons.style.display = "flex";
      searchButton.style.display = "inline-block";
      logoutBtn.style.display = "inline-block";
      loginBtn.style.display = "none";
      usernameSpan.textContent = activeUser.username; // Username göstərilir
    } else {
      // Əgər istifadəçi login olmayıbsa:
      navIcons.style.display = "none";
      searchButton.style.display = "none";
      logoutBtn.style.display = "none";
      loginBtn.style.display = "inline-block";
      usernameSpan.textContent = ""; // Username sahəsi boş qalır
    }
  
    // Logout düyməsi
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("activeUser"); // Aktiv istifadəçini silirik
      location.reload(); // Səhifəni yeniləyirik
    });
  });
  