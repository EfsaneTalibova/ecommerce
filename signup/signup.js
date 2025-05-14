document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");
  const messageBox = document.getElementById("message-box"); // Xəbərdarlıq mesajları üçün div

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Formun default submit olmasını bloklayırıq

    // Form məlumatlarını FormData ilə götürürük
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries()); // FormData-dan obyektə çeviririk

    // Əgər hansısa input boşdursa, xəbərdarlıq göstəririk
    if (Object.values(userData).some((value) => value.trim() === "")) {
      showMessage("All fields are required!", "danger");
      return;
    }

    const newUser = {
      ...userData,
    };

    console.log(newUser);

    addUser(newUser);
    // Formu sıfırlayırıq
    form.reset();
  });

  // Xəbərdarlıq mesajlarını göstərən funksiya
  function showMessage(message, type) {
    messageBox.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
      messageBox.innerHTML = "";
    }, 3000); // 3 saniyə sonra mesaj silinir
  }g
});



function addUser(user) {
  fetch("http://195.26.245.5:9505/api/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).catch((error) => {
    if (error.status == 403) {
      showMessage(
        "User with this email or username already exists!",
        "warning"
      );
    }
  });
}
