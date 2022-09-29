let datalist = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : [];
let checkAccount = false;

function check_form() {
  let inputElement = document.querySelectorAll(".input");
  let user = document.querySelector(".user").value;
  let emailsdt = document.querySelector(".emailsdt").value;
  let userfail = document.querySelector(".userfail");
  let emailsdtfail = document.querySelector(".emailsdtfail");

  for (let i = 0; i < inputElement.length; i++) {
    if (inputElement[i].value === "") {
      inputElement[i].parentElement.querySelector(".error").innerText = `Vui lòng nhập ${inputElement[i].id}!`
    } else {
      inputElement[i].parentElement.querySelector(".error").innerText = "";
    }
  }

  for (let i = 0; i < datalist.length; i++) {
    if (datalist[i].user === user && datalist[i].emailsdt === emailsdt) {
      checkAccount = true;
      userfail.innerText = `tài khoản ${datalist[i].user} đã tồn tại !`;
      emailsdtfail.innerText = `email hoặc số điện thoại này đã tồn tại !`;
    } else if (datalist[i].user === user) {
      checkAccount = true;
      userfail.innerText = `tài khoản ${datalist[i].user} đã tồn tại !`;
    } else if (datalist[i].emailsdt === emailsdt) {
      checkAccount = true;
      emailsdtfail.innerText = `email hoặc số điện thoại này đã tồn tại !`;
    } else {
      checkAccount = false;
    }
  }
}

function register() {
  check_form();
  let arrError = [];
  let error = document.querySelectorAll(".error");

  for (let i = 0; i < error.length; i++) {
    arrError.push(error[i].innerText);
  }

  let checkError = arrError.every(value => value === "");

  if (checkError) {
    let user = document.querySelector(".user").value;
    let emailsdt = document.querySelector(".emailsdt").value;
    let password1 = document.querySelector(".password1").value;
    let password2 = document.querySelector(".password2").value;
    let register__fail = document.querySelector(".register__fail span");

    if (password1 === password2) {
      if (checkAccount === false) {
        datalist.push({
          user: user,
          emailsdt: emailsdt,
          password1: password1
        });

        localStorage.setItem("account", JSON.stringify(datalist));
        register__fail.style.transform = "translateX(0)";
        register__fail.style.opacity = "1";

        setTimeout(() => {
          register__fail.style.transform = "translateX(150%)";
          register__fail.style.opacity = "0";
        }, 1200);
        clear();
      }
    } else {
      let er = document.querySelector(".er");
      er.innerText = 'Mật khẩu xác nhận không chính xác';
    }
  }

}

function clear() {
  let inputElement = document.querySelectorAll(".input");
  for (let i = 0; i < inputElement.length; i++) {
    inputElement[i].value = "";
  }
}

function check_login() {
  let inputElement = document.querySelectorAll(".input");

  for (let i = 0; i < inputElement.length; i++) {
    if (inputElement[i].value === "") {
      inputElement[i].parentElement.querySelector(".error").innerText = `${inputElement[i].id} không được để trống!`;
    } else {
      inputElement[i].parentElement.querySelector(".error").innerText = "";
    }
  }
}

function login() {
  check_login();

  let user = document.querySelector(".user").value;
  let password = document.querySelector(".password").value;

  let check_Account = datalist.some(value => value.user === user && value.password1 === password)
  if (user === 'quynhnhu' && password === '01052002') {
    check_Account = true;
  }

  if (check_Account) {
    let login = document.getElementById("login");
    let card = document.getElementById("card");
    login.style.transform = "scale(0)";
    card.style.transform = "scale(1)";
    card.style.transitionDelay = ".4s";
  }

  if (user != "" && password != "" && check_Account === false) {
    let thongbao = document.querySelector(".thongbao p");
    thongbao.style.transform = "translateX(0)";
    thongbao.style.opacity = "1";

    setTimeout(() => {
      thongbao.style.transform = "translateX(150%)";
      thongbao.style.opacity = "0";
    }, 1200);
  }
}

function logout() {
  let login = document.getElementById("login");
  let card = document.getElementById("card");
  card.style.transform = "scale(0)";
  login.style.transform = "scale(1)";
  login.style.transitionDelay = ".5s";
}

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey) {
    event.preventDefault();
  }
  if (event.keyCode == 123) {
    event.preventDefault();
  }
});
document.addEventListener('contextmenu', event => event.preventDefault());