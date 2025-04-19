import { LoginAPI, RegisterAPI } from "./api.js";
import { player } from "./player.js";

class Authentication {
  constructor() {
    // DOM Elements
    this.loginBtn = document.querySelector(".js-header__navbar-item");
    this.logoutBtn = document.querySelector(".js-header__navbar-item-logout");
    this.createBtn = document.querySelector(".js-auth-form__switch-btn");
    this.modalAuthForms = document.querySelector(".js-auth-forms");
    this.modal = document.querySelector(".js-modal");
    this.modalAuthForm = document.querySelector(".js-auth-form");
    this.modalClose = document.querySelector(".js-modal__close");
    this.modalCloses = document.querySelector(".js-modal__closes");
    this.backSignIn = document.querySelector(".js-Create");

    this.initEventListeners();
    this.initFormHandlers();
  }

 initEventListeners () {
    // Modal control
    this.isToken = false;

    this.logoutBtn.addEventListener("click", () => this.logout());
    this.loginBtn.addEventListener("click", () => this.showSignIn());
    this.createBtn.addEventListener("click", () => this.showCreate());
    this.modalClose.addEventListener("click", () => this.hideSignIn());
    this.modalCloses.addEventListener("click", () => this.hideSignIn());
    this.modal.addEventListener("click", () => this.hideSignIn());
    this.modalAuthForm.addEventListener("click", (event) =>
      this.blockEvent(event)
    );
    this.modalAuthForms.addEventListener("click", (event) =>
      this.blockEvent(event)
    );
    this.backSignIn.addEventListener("click", () => this.backToSignIn());

    const token = sessionStorage.getItem("token");
    if (token && token !== "") {
      this.logoutBtn.style.display = "block";
      this.loginBtn.style.display = "none";
      this.isToken = true;
      this.hideSignIn();
    } else {
      console.log("vip", token);
      this.logoutBtn.style.display = "none";
      this.loginBtn.style.display = "block";
      this.isToken = false;
      this.showSignIn();
    }
  }


  logout() {
    sessionStorage.removeItem("token");
    this.isToken = false;
    this.logoutBtn.style.display = "none";
    this.loginBtn.style.display = "block";
    this.showSignIn();
  }

  showSignIn() {
    this.modal.classList.add("open");
    this.modalAuthForm.style.display = "block";
    this.modalAuthForms.style.display = "none";
  }

  showCreate() {
    this.modalAuthForm.style.display = "none";
    this.modalAuthForms.style.display = "block";
  }

  hideSignIn() {
    if(this.isToken) {
      this.modal.classList.remove("open");
      return;
    } else {
      return;
    }
  }

  blockEvent(event) {
    event.stopPropagation();
  }

  backToSignIn() {
    this.modalAuthForms.style.display = "none";
    this.modalAuthForm.style.display = "block";
  }

  initFormHandlers() {
    document.addEventListener("DOMContentLoaded", () => {
      // Login form handling
      const loginBtn = document.getElementById("btn-login");
      if (loginBtn) {
        loginBtn.addEventListener("click", async (event) => {
          event.preventDefault();

          const email = document.getElementById("loginEmail").value.trim();
          const password = document.getElementById("loginPassword").value.trim();

          try {
            const response = await LoginAPI.create({ email, password });
            if (response?.token) {
              sessionStorage.setItem("token", response.token);
              player.initEventListeners();
              player.initSongList(response.token);
              alert("Login successful! 🎉");
              this.isToken = true;
              this.logoutBtn.style.display = "block";
              this.loginBtn.style.display = "none";
              this.hideSignIn();
             
            } else {
              alert("Login failed: " + data.message);
            }
          } catch (error) {
            console.error("Error:", error);
            alert("Failed to connect to the server!");
          }
        });
      }

      // Register form handling
      const registerBtn = document.querySelector(".btn--primary");
      if (registerBtn) {
        registerBtn.addEventListener("click", async (event) => {
          event.preventDefault();

          const email = document.getElementById("email").value.trim();
          const password = document.getElementById("password").value.trim();
          const confirmPassword = document
            .getElementById("confirmPassword")
            .value.trim();

          if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
          }

          try {
            const response = await RegisterAPI.create({
              email,
              password,
              confirmPassword,
            });
            console.log("regiete", response);
            if (response.ok) {
              alert("User registered successfully! 🎉");
              this.showSignIn();
            } else {
              alert(
                "Registration failed: " +
                  (data.errors ? data.errors.join(", ") : data.message)
              );
            }
          } catch (error) {
            console.error("Error:", error);
            alert("Failed to connect to the server!");
          }
        });
      }
    });
  }
}
export const authentication = new Authentication();
