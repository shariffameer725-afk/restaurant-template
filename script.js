/*
  MEDAXIS LEAD FORM
  -----------------
  Before launch:
  1. Create a Google Sheet owned by the MedAxis company.
  2. Create a Google Apps Script attached to that Sheet.
  3. Deploy it as a Web App ("Anyone" with access).
  4. Paste the Web App URL below.
*/

const CONFIG = {
  GOOGLE_SCRIPT_URL: "PASTE_MEDAXIS_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"
};

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

const form = document.getElementById("leadForm");
const success = document.getElementById("formSuccess");
const submitButton = form?.querySelector("button[type='submit']");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!CONFIG.GOOGLE_SCRIPT_URL || CONFIG.GOOGLE_SCRIPT_URL.includes("PASTE_MEDAXIS")) {
    success.textContent =
      "The website form is ready, but the MedAxis Google Sheet connection has not been configured yet.";
    success.style.display = "block";
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        ...data
      })
    });

    form.reset();
    success.textContent =
      "Thank you! Your enquiry has been submitted. The MedAxis team will contact you.";
    success.style.display = "block";
  } catch (error) {
    success.textContent =
      "We couldn't submit the enquiry right now. Please contact MedAxis directly by phone or WhatsApp.";
    success.style.display = "block";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit Enquiry →";
  }
});
