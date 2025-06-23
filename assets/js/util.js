// navList(): Gera lista linear de links com indentação
function navList(navElement) {
	const links = navElement.querySelectorAll('a');
	return Array.from(links).map(link => {
	  const indent = Math.max(0, link.closest('li')?.parentElement?.querySelectorAll('li').length - 1 || 0);
	  const href = link.getAttribute('href') || '';
	  const target = link.getAttribute('target') || '';
	  return `
		<a class="link depth-${indent}" ${target ? `target="${target}"` : ''} ${href ? `href="${href}"` : ''}>
		  <span class="indent-${indent}"></span>${link.textContent}
		</a>`;
	}).join('');
  }
  
  // panel(): Torna um painel interativo com abertura/fechamento e opções
  function createPanel(panelElement, options = {}) {
	const config = {
	  delay: 0,
	  hideOnClick: false,
	  hideOnEscape: false,
	  hideOnSwipe: false,
	  resetScroll: false,
	  resetForms: false,
	  side: null,
	  visibleClass: 'visible',
	  ...options
	};
  
	const target = config.target || panelElement;
  
	function hidePanel(e) {
	  if (!target.classList.contains(config.visibleClass)) return;
	  if (e) {
		e.preventDefault();
		e.stopPropagation();
	  }
	  target.classList.remove(config.visibleClass);
	  setTimeout(() => {
		if (config.resetScroll) panelElement.scrollTop = 0;
		if (config.resetForms) panelElement.querySelectorAll('form').forEach(f => f.reset());
	  }, config.delay);
	}
  
	// Hide on ESC
	if (config.hideOnEscape) {
	  document.addEventListener('keydown', e => {
		if (e.key === 'Escape') hidePanel(e);
	  });
	}
  
	// Body click to hide
	document.body.addEventListener('click', hidePanel);
  
	// Toggle panel via anchor
	document.querySelectorAll(`a[href="#${panelElement.id}"]`).forEach(a => {
	  a.addEventListener('click', e => {
		e.preventDefault();
		e.stopPropagation();
		target.classList.toggle(config.visibleClass);
	  });
	});
  
	// Optionally hide when clicking links inside
	if (config.hideOnClick) {
	  panelElement.querySelectorAll('a').forEach(a => {
		a.addEventListener('click', e => {
		  const href = a.getAttribute('href');
		  const tgt = a.getAttribute('target');
		  if (!href || href === '#' || href === `#${panelElement.id}`) return;
		  e.preventDefault();
		  e.stopPropagation();
		  hidePanel();
		  setTimeout(() => {
			tgt === '_blank' ? window.open(href) : (window.location.href = href);
		  }, config.delay + 10);
		});
	  });
	}
  }
  
  // prioritize(): Move elementos pro topo ou retorna ao lugar original
  function prioritize(elements, condition) {
	elements.forEach(el => {
	  if (!el._originalNextSibling) {
		if (!condition) return;
		el._originalNextSibling = el.nextSibling;
		el.parentNode.insertBefore(el, el.parentNode.firstChild);
	  } else {
		if (condition) return;
		el.parentNode.insertBefore(el, el._originalNextSibling);
		el._originalNextSibling = null;
	  }
	});
  }
  