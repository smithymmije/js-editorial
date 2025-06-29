function loadGA() {
    if (window.gaLoaded) return;
    window.gaLoaded = true;
  
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-RV9YW5YRHL";
    script.async = true;
    document.head.appendChild(script);
  
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", "G-RV9YW5YRHL");
    };
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookieBanner");
    const overlay = document.getElementById("cookieOverlay");
    const modal = document.getElementById("cookieModal");
    const form = document.getElementById("cookieForm");
  
    const consent = JSON.parse(localStorage.getItem("cookieConsent"));
    if (consent && consent.analytics) {
      loadGA();
    }
  
    function aceitarCookies() {
      const consent = {
        necessary: true,
        analytics: true,
        marketing: true
      };
      localStorage.setItem("cookieConsent", JSON.stringify(consent));
      loadGA();
      fecharTudo();
    }
  
    function personalizarCookies() {
      modal.style.display = "block";
    }
  
    function fecharTudo() {
      if (overlay) {
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
        setTimeout(() => overlay.remove(), 300);
      }
      if (banner) {
        banner.style.opacity = "0";
        setTimeout(() => banner.remove(), 300);
      }
      if (modal) {
        modal.style.display = "none";
      }
    }
  
    // Submeter o formulário de personalização
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const consent = {
          necessary: true,
          analytics: form.analytics.checked,
          marketing: form.marketing.checked
        };
        localStorage.setItem("cookieConsent", JSON.stringify(consent));
        if (consent.analytics) loadGA();
        fecharTudo();
      };
    }
  
    document.getElementById("cancelCookieModal").onclick = () => {
      modal.style.display = "none";
    };
  
    // Tornar acessível no HTML
    window.aceitarCookies = aceitarCookies;
    window.personalizarCookies = personalizarCookies;
  
    if (!consent) {
      if (banner) banner.style.opacity = "1";
      if (overlay) {
        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "auto";
      }
    } else {
      if (banner) banner.remove();
      if (overlay) overlay.remove();
    }
  });
  