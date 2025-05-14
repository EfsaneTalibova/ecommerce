document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Formun default submit olmasını bloklayırıq

    // Form məlumatlarını FormData ilə götürürük
    const formData = new FormData(form);
    const loginData = Object.fromEntries(formData.entries()); // FormData-dan obyektə çeviririk

    loginFunc(loginData);
  });
});

// Xəbərdarlıq mesajını göstərən funksiya
function showMessage(message, type) {
  const messageBox = document.getElementById("message-box"); // Xəbərdarlıq mesajı üçün div

  messageBox.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  setTimeout(() => {
    messageBox.innerHTML = "";
  }, 3000);
}

function loginFunc(user) {
  fetch("http://195.26.245.5:9505/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status != 403) {
        showMessage("Login successful! Redirecting...", "success");
      }else{
          showMessage("Invalid username or password!", "danger");
      }
    
      localStorage.setItem("activeUser",JSON.stringify(data.body))
    //   2 saniyə sonra ana səhifəyə yönləndiririk
        setTimeout(() => {
          window.location.href = "/index.html";
        }, 2000);
    })
}

// "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJFbHZpbkFsaXlldiIsImlhdCI6MTc0NzIxOTgzMCwiZXhwIjoxNzQ5ODExODMwfQ.LcqF0rBhuVou5xjhGSmmjzFHB4QOvdgFg4oQl-4IqcE"
