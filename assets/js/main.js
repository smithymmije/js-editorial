// Espera o DOM carregar antes de executar qualquer script
document.addEventListener('DOMContentLoaded', () => {
    // Elementos principais usados no script
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const sidebarInner = sidebar?.querySelector('.inner');
    const menu = document.getElementById('menu');
    const menuOpeners = menu?.querySelectorAll('.opener');
  
    // Remove a classe is-preload após o carregamento completo da página
    window.addEventListener('load', () => {
      setTimeout(() => body.classList.remove('is-preload'), 100);
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event('scroll'));
    });
  
    // Adiciona/remover classe is-resizing ao redimensionar a janela
    let resizeTimeout;
    window.addEventListener('resize', () => {
      body.classList.add('is-resizing');
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        body.classList.remove('is-resizing');
        updateSidebarVisibility(); // Atualiza visibilidade da sidebar no resize
      }, 100);
    });
  
    // Função que controla quando a sidebar deve estar visível ou escondida
    function updateSidebarVisibility() {
      if (window.matchMedia('(max-width: 1280px)').matches) {
        sidebar?.classList.add('inactive'); // Oculta em telas pequenas
      } else {
        sidebar?.classList.remove('inactive'); // Mostra em telas maiores
      }
    }
  
    updateSidebarVisibility(); // Executa ao iniciar
  
    // Cria botão toggle para abrir/fechar a sidebar no mobile
    const toggleBtn = document.createElement('a');
    toggleBtn.href = '#sidebar';
    toggleBtn.className = 'toggle';
    toggleBtn.textContent = 'Toggle';
    sidebar?.appendChild(toggleBtn);
  
    // Evento para alternar classe 'inactive' ao clicar no botão toggle
    toggleBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      sidebar.classList.toggle('inactive');
    });
  
    // Esconde a sidebar automaticamente ao clicar em um link (somente em mobile)
    sidebar?.addEventListener('click', e => {
      if (window.matchMedia('(max-width: 1280px)').matches) {
        const a = e.target.closest('a');
        if (a && a.getAttribute('href') && a.getAttribute('href') !== '#') {
          e.preventDefault();
          sidebar.classList.add('inactive');
          setTimeout(() => {
            if (a.target === '_blank') window.open(a.href);
            else window.location.href = a.href;
          }, 500); // Pequeno delay para animação da sidebar
        }
      }
    });
  
    // Esconde a sidebar ao clicar em qualquer área fora dela (em mobile)
    document.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 1280px)').matches)
        sidebar?.classList.add('inactive');
    });
  
    // Impede que eventos na sidebar se propaguem e fechem a sidebar acidentalmente
    ['click', 'touchstart', 'touchmove'].forEach(evt => {
      sidebar?.addEventListener(evt, e => {
        if (window.matchMedia('(max-width: 1280px)').matches)
          e.stopPropagation();
      });
    });
  
    // MENU: Accordion interativo dos itens com submenus
    menuOpeners?.forEach(opener => {
      opener.addEventListener('click', e => {
        e.preventDefault();
        // Fecha todos os outros submenus
        menuOpeners.forEach(o => o.classList.remove('active'));
        // Abre (ou fecha) o clicado
        opener.classList.toggle('active');
        // Gatilho de resize para corrigir altura da sidebar se necessário
        window.dispatchEvent(new Event('resize'));
      });
    });
  
    // Fixação inteligente da sidebar enquanto a página rola (apenas em telas grandes)
    function sidebarLock() {
      if (!sidebarInner) return;
  
      const threshold = sidebarInner.offsetHeight + 30;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const offsetTop = Math.max(0, scrollTop - Math.max(threshold - windowHeight, 0));
  
      if (window.matchMedia('(min-width: 1281px)').matches) {
        if (offsetTop > 0) {
          sidebarInner.style.position = 'fixed';
          sidebarInner.style.top = `${-1 * (threshold - windowHeight)}px`;
          sidebarInner.dataset.locked = '1';
        } else {
          sidebarInner.style.position = '';
          sidebarInner.style.top = '';
          sidebarInner.dataset.locked = '0';
        }
      } else {
        sidebarInner.style.position = '';
        sidebarInner.style.top = '';
        sidebarInner.dataset.locked = '0';
      }
    }
  
    window.addEventListener('scroll', sidebarLock);
    window.addEventListener('resize.sidebarLock', () => {
      window.dispatchEvent(new Event('scroll'));
    });
  });
  
  
  // Scroll suave para âncoras internas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
  
        // Em telas pequenas, esconde a sidebar antes de rolar
        if (window.matchMedia('(max-width: 1280px)').matches) {
          document.getElementById('sidebar')?.classList.add('inactive');
        }
  
        // Rola suavemente até a seção-alvo
        setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    });
  });
  
//Search
document.querySelector('#search form')?.addEventListener('submit', function (e) {
    e.preventDefault(); // impede envio do formulário padrão
  
    const input = this.querySelector('input[name="query"]');
    const query = input?.value.trim();
  
    if (query) {
      // Redireciona para search.html com a query como parâmetro
      window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
    }
  });

  //Carregar a âncora e limpar o hash da URL
  window.addEventListener("load", () => {
    const hash = window.location.hash;
    const pathname = window.location.pathname;
    const search = window.location.search;
  
    // Limpar index.html e hash
    if (pathname.endsWith("index.html") || hash) {
      const cleanPath = pathname.replace("index.html", "");
      history.replaceState(null, null, cleanPath + window.location.search);
    }
  
    // Limpar parâmetros de busca de forma elegante
    if (pathname.endsWith("search.html")) {
      const urlParams = new URLSearchParams(search);
      const searchTerm = urlParams.get("q");
  
      if (searchTerm) {
        // Aqui você pode usar searchTerm para carregar os resultados da busca
        // Ex: mostrarResultadoBusca(searchTerm);
  
        // Limpa a URL após 100ms (dá tempo de usar o valor antes)
        setTimeout(() => {
          history.replaceState(null, null, "/busca"); // pode personalizar a URL "mascarada"
        }, 100);
      }
    }
  });
  

  // Cookie Referência ao banner e ao overlay
  window.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookieBanner");
    const overlay = document.getElementById("cookieOverlay");

    function aceitarCookies() {
      localStorage.setItem("cookiesAceitos", "true");

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
    }

    // Tornar acessível no HTML inline
    window.aceitarCookies = aceitarCookies;
    window.personalizarCookies = personalizarCookies;

    // Exibir ou não o banner
    const jaAceitou = localStorage.getItem("cookiesAceitos") === "true";

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