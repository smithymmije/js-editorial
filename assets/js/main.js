document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const sidebarInner = sidebar?.querySelector('.inner');
    const menu = document.getElementById('menu');
    const menuOpeners = menu?.querySelectorAll('.opener');

    // Remover classe preload ao carregar
    window.addEventListener('load', () => {
        setTimeout(() => body.classList.remove('is-preload'), 100);
        window.scrollTo(0, 0);
        window.dispatchEvent(new Event('scroll'));
    });

    // Resize e classe is-resizing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        body.classList.add('is-resizing');
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            body.classList.remove('is-resizing');
            updateSidebarVisibility();
        }, 100);
    });

    // Atualiza visibilidade da sidebar conforme o tamanho da janela
    function updateSidebarVisibility() {
        if (window.matchMedia('(max-width: 1280px)').matches) {
            sidebar?.classList.add('inactive');
        } else {
            sidebar?.classList.remove('inactive');
        }
    }

    updateSidebarVisibility();

    // Botão de toggle na sidebar
    const toggleBtn = document.createElement('a');
    toggleBtn.href = '#sidebar';
    toggleBtn.className = 'toggle';
    toggleBtn.textContent = 'Toggle';
    sidebar?.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        sidebar.classList.toggle('inactive');
    });

    // Comportamento ao clicar em links dentro da sidebar (mobile)
    sidebar?.addEventListener('click', e => {
        if (window.matchMedia('(max-width: 1280px)').matches) {
            const a = e.target.closest('a');
            if (a && a.getAttribute('href') && a.getAttribute('href') !== '#') {
                e.preventDefault();
                sidebar.classList.add('inactive');
                setTimeout(() => {
                    if (a.target === '_blank') window.open(a.href);
                    else window.location.href = a.href;
                }, 500);
            }
        }
    });

    // Esconder sidebar ao clicar fora (mobile)
    document.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 1280px)').matches)
            sidebar?.classList.add('inactive');
    });

    // Impedir propagação em interações dentro da sidebar
    ['click', 'touchstart', 'touchmove'].forEach(evt => {
        sidebar?.addEventListener(evt, e => {
            if (window.matchMedia('(max-width: 1280px)').matches)
                e.stopPropagation();
        });
    });

    // Menu interativo (accordion)
    menuOpeners?.forEach(opener => {
        opener.addEventListener('click', e => {
            e.preventDefault();
            menuOpeners.forEach(o => o.classList.remove('active'));
            opener.classList.toggle('active');
            window.dispatchEvent(new Event('resize'));
        });
    });

    // Fixação inteligente da sidebar ao rolar
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
