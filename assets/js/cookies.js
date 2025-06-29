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

    // Carrega GA se o consentimento de analytics estiver ativo
    const consent = JSON.parse(localStorage.getItem("cookieConsent"));
    if (consent && consent.analytics) {
      loadGA();
    }

    function aceitarCookies() {
      const consentObj = {
        necessary: true,
        analytics: true,
        marketing: true
      };
      localStorage.setItem("cookieConsent", JSON.stringify(consentObj));
      loadGA();

      if (overlay) {
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
        setTimeout(() => overlay.remove(), 300);
      }

      if (banner) {
        banner.style.opacity = "0";
        setTimeout(() => banner.remove(), 300);
      }
    }

    function personalizarCookies() {
      alert("Aqui você pode implementar um modal de personalização.");
      // Em breve: abrir modal, salvar preferências parciais, etc.
    }

    // Tornar acessível no HTML
    window.aceitarCookies = aceitarCookies;
    window.personalizarCookies = personalizarCookies;

    // Exibir ou não o banner
    const jaAceitou = localStorage.getItem("cookieConsent");
    if (jaAceitou) {
      if (banner) banner.remove();
      if (overlay) overlay.remove();
    } else {
      if (banner) banner.style.opacity = "1";
      if (overlay) {
        overlay.style.opacity = "1";
        overlay.style.pointerEvents = "auto";
      }
    }
  });