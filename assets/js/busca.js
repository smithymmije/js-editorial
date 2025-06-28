document.addEventListener("DOMContentLoaded", () => {
    // Lista de conteúdos do index.html que serão indexados
    const posts = [
      {
        title: "Missões (Quase) Secretas",
        url: "index.html#missoes",
        content: `
          Ferramentas experimentais, recursos em teste e funcionalidades ocultas 
          do sistema. Aqui você encontra módulos em desenvolvimento, ideias em fase 
          beta, elementos escondidos e utilidades alternativas que ainda não foram lançadas.`
      },
      {
        title: "Funções Ativadas",
        url: "index.html#funcoes",
        content: "Veja todos os módulos e componentes atualmente em uso no sistema, com descrições simples e acessíveis."
      },
      {
        title: "Logs do Sistema",
        url: "index.html#banner",
        content: "Acompanhe os registros, eventos e atividades mais recentes da plataforma digital personalizada."
      }
    ];
  
    // Obtém o parâmetro de busca da URL (?q=...)
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q")?.toLowerCase().trim() || "";
  
    // Atualiza visualmente o termo de busca
    const queryTerm = document.getElementById("queryTerm");
    if (queryTerm) queryTerm.textContent = query;
  
    // Container onde os resultados serão exibidos
    const resultsDiv = document.getElementById("results");
    if (!resultsDiv) return;
  
    // Filtra os posts com base no termo buscado
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    );
  
    // Renderiza os resultados ou mensagem de "nenhum resultado"
    if (filtered.length === 0) {
      resultsDiv.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    } else {
      filtered.forEach(post => {
        const div = document.createElement("div");
        div.className = "result";
        div.innerHTML = `
          <h3><a href="${post.url}">${post.title}</a></h3>
          <p>${post.content}</p>
        `;
        resultsDiv.appendChild(div);
      });
    }
  });
  