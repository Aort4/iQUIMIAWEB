const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function validarCampos() {
  var user = document.getElementById('usuario').value;
  var pass = document.getElementById('password').value;

  if (user === "" || pass === "") {
    alert("Por favor, completa todos los campos.");
    return false;
  }
  return true;
}

const topButton = document.getElementById('topfive');
const loginButton = document.getElementById('iniciarsesion');

topButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'top.html'; 
});

loginButton.addEventListener('click', async (e) => {
  e.preventDefault();
  if (!validarCampos()) return;

  const usuario = document.querySelector('#usuario').value;
  const contraseña = document.querySelector('#password').value;

  // Encriptar la contraseña
  const contraseñaEncriptada = CryptoJS.SHA256(contraseña).toString();

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch(`https://iquimia-production.up.railway.app/login/${usuario}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.length > 0 && result[0].password === contraseñaEncriptada) {
        window.location.href = 'dashboard.html';
      } else {
        alert("Contraseña incorrecta. Por favor, intenta nuevamente.");
      }
    })
    .catch((error) => console.error(error));
});
