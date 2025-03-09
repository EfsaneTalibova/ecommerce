document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    const messageBox = document.getElementById("message-box"); // Xəbərdarlıq mesajları üçün div

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Formun default submit olmasını bloklayırıq

        // Form məlumatlarını FormData ilə götürürük
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries()); // FormData-dan obyektə çeviririk

        // Əgər hansısa input boşdursa, xəbərdarlıq göstəririk
        if (Object.values(userData).some(value => value.trim() === "")) {
            showMessage("All fields are required!", "danger");
            return;
        }

        // `localStorage`-da saxlanan istifadəçi siyahısını əldə edirik
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Mövcud istifadəçini yoxlamaq (email və ya username varsa)
        const existingUser = users.find(user => user.email === userData.email || user.username === userData.username);

        if (existingUser) {
            showMessage("User with this email or username already exists!", "warning");
            return;
        }

        // Yeni istifadəçiyə unikal ID veririk
        const newUser = {
            id: Date.now(), // ID unikal olması üçün timestamp istifadə edilir
            ...userData
        };

        // Yeni istifadəçini array-ə əlavə edirik və `localStorage`-da saxlayırıq
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        showMessage("Account created successfully!", "success");

        // Formu sıfırlayırıq
        form.reset();
    });

    // Xəbərdarlıq mesajlarını göstərən funksiya
    function showMessage(message, type) {
        messageBox.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
        setTimeout(() => {
            messageBox.innerHTML = "";
        }, 3000); // 3 saniyə sonra mesaj silinir
    }
});
