/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
    "use strict";
  
    const storedTheme = localStorage.getItem("theme");
  
    const getPreferredTheme = () => {
      if (storedTheme) {
        return storedTheme;
      }
  
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    };
  
    const setTheme = function (theme) {
      if (
        theme === "" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.documentElement.setAttribute("data-bs-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-bs-theme", theme);
      }
    };
  
    setTheme(getPreferredTheme());
  
    const showActiveTheme = (theme) => {
      const activeThemeIcon = document.querySelector(".theme-icon-active use");
      const btnToActive = document.querySelector(
        `[data-bs-theme-value="${theme}"]`
      );
      const svgOfActiveBtn = btnToActive
        .querySelector("svg use")
        .getAttribute("href");
  
      document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
        element.classList.remove("active");
      });
  
      btnToActive.classList.add("active");
      activeThemeIcon.setAttribute("href", svgOfActiveBtn);
    };
  
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        if (storedTheme !== "light" || storedTheme !== "dark") {
          setTheme(getPreferredTheme());
        }
      });
  
    window.addEventListener("DOMContentLoaded", () => {
      showActiveTheme(getPreferredTheme());
  
      document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
        toggle.addEventListener("click", () => {
          const theme = toggle.getAttribute("data-bs-theme-value");
          localStorage.setItem("theme", theme);
          setTheme(theme);
          showActiveTheme(theme);
        });
      });
    });
  })();
  
  
  // Acceder al formulario
 
  const form = document.getElementById('contact-form');
        const errorMessage = document.getElementById('error-message');

        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita el envío por defecto del formulario

            // Obtén los valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Realiza las validaciones necesarias
            if (!name || !email || !message) {
                errorMessage.textContent = "Por favor, complete todos los campos.";
                return;
            }

            // Valida el correo electrónico
            if (!validateEmail(email)) {
                errorMessage.textContent = "Por favor, ingrese una dirección de correo electrónico válida.";
                return;
            }

            // Envía los datos del formulario al servidor (usando AJAX o Fetch API)
            // ... (código para enviar los datos al servidor)

            // Si el envío es exitoso, muestra un mensaje de éxito
            errorMessage.textContent = "Mensaje enviado correctamente!";

            // Limpia el formulario
            form.reset();
        });

        function validateEmail(email) {
            // Regular expression para validar el correo electrónico
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }