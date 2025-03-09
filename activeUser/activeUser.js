document.addEventListener("DOMContentLoaded", function () {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));

    // HTML-dəki elementlər
    const userName = document.getElementById("user-name");
    const userSurname = document.getElementById("user-surname");
    const userEmail = document.getElementById("user-email");
    const userUsername = document.getElementById("user-username");

    if (activeUser) {
        // Məlumatları HTML-ə yerləşdiririk
        userName.textContent = activeUser.name;
        userSurname.textContent = activeUser.surname;
        userEmail.textContent = activeUser.email;
        userUsername.textContent = activeUser.username;
    } else {
        // Əgər istifadəçi login olmayıbsa
        document.querySelector(".user-details-box").innerHTML = `
            <h3 class="text-danger fw-bold">No user logged in</h3>
            <p>Please <a href="login.html">log in</a> to view your details.</p>
        `;
    }
});
