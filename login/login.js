document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    const messageBox = document.getElementById("message-box"); // Xəbərdarlıq mesajı üçün div

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Formun default submit olmasını bloklayırıq

        // Form məlumatlarını FormData ilə götürürük
        const formData = new FormData(form);
        const loginData = Object.fromEntries(formData.entries()); // FormData-dan obyektə çeviririk

        // `localStorage`-da istifadəçi məlumatlarını əldə edirik
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Uyğun istifadəçini axtarırıq
        const foundUser = users.find(user => user.username === loginData.username && user.password === loginData.password);

        if (foundUser) {
            // İstifadəçini aktiv olaraq `localStorage`-da saxlayırıq
            localStorage.setItem("activeUser", JSON.stringify(foundUser));

            showMessage("Login successful! Redirecting...", "success");

            // 2 saniyə sonra ana səhifəyə yönləndiririk
            setTimeout(() => {
                window.location.href = "/index.html";
            }, 2000);
        } else {
            showMessage("Invalid username or password!", "danger");
        }
    });

    // Xəbərdarlıq mesajını göstərən funksiya
    function showMessage(message, type) {
        messageBox.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
        setTimeout(() => {
            messageBox.innerHTML = "";
        }, 3000); // 3 saniyə sonra mesaj silinir
    }
});
