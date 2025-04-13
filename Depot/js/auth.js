class Authentication {
    constructor() {
        // DOM Elements
        this.loginBtn = document.querySelector('.js-header__navbar-item');
        this.createBtn = document.querySelector('.js-auth-form__switch-btn');
        this.modalAuthForms = document.querySelector('.js-auth-forms');
        this.modal = document.querySelector('.js-modal');
        this.modalAuthForm = document.querySelector('.js-auth-form');
        this.modalClose = document.querySelector('.js-modal__close');
        this.modalCloses = document.querySelector('.js-modal__closes');
        this.backSignIn = document.querySelector('.js-Create');
        
        this.initEventListeners();
        this.initFormHandlers();
    }
    
    initEventListeners() {
        // Modal control
        this.loginBtn.addEventListener('click', () => this.showSignIn());
        this.createBtn.addEventListener('click', () => this.showCreate());
        this.modalClose.addEventListener('click', () => this.hideSignIn());
        this.modalCloses.addEventListener('click', () => this.hideSignIn());
        this.modal.addEventListener('click', () => this.hideSignIn());
        this.modalAuthForm.addEventListener('click', (event) => this.blockEvent(event));
        this.modalAuthForms.addEventListener('click', (event) => this.blockEvent(event));
        this.backSignIn.addEventListener('click', () => this.backToSignIn());
    }
    
    showSignIn() {
        this.modal.classList.add('open');
        this.modalAuthForm.style.display = 'block';
        this.modalAuthForms.style.display = 'none';
    }
    
    showCreate() {
        this.modalAuthForm.style.display = 'none';
        this.modalAuthForms.style.display = 'block';
    }
    
    hideSignIn() {
        this.modal.classList.remove('open');
    }
    
    blockEvent(event) {
        event.stopPropagation();
    }
    
    backToSignIn() {
        this.modalAuthForms.style.display = 'none';
        this.modalAuthForm.style.display = 'block';
    }
    
    initFormHandlers() {
        document.addEventListener("DOMContentLoaded", () => {
            // Login form handling
            const loginBtn = document.getElementById("btn-login");
            if (loginBtn) {
                loginBtn.addEventListener("click", async (event) => {
                    event.preventDefault();
                    
                    const email = document.querySelector("input[placeholder='Your email']").value;
                    const password = document.querySelector("input[placeholder='Your password']").value;
                    
                    try {
                        const response = await fetch("https://localhost:7220/api/auth/login", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email, password }),
                            mode: "cors"
                        });
                        
                        const data = await response.json();
                        
                        if (response.ok) {
                            alert("Login successful! 🎉");
                            localStorage.setItem("token", data.token);
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
                    const confirmPassword = document.getElementById("confirmPassword").value.trim();
                    
                    if (password !== confirmPassword) {
                        alert("Passwords do not match!");
                        return;
                    }
                    
                    try {
                        const response = await fetch("https://localhost:7220/api/auth/register", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email, password, confirmPassword }),
                            mode: "cors"
                        });
                        
                        const data = await response.json();
                        
                        if (response.ok) {
                            alert("User registered successfully! 🎉");
                            this.showSignIn();
                        } else {
                            alert("Registration failed: " + (data.errors ? data.errors.join(", ") : data.message));
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