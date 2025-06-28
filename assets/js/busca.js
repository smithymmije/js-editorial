document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q")?.toLowerCase().trim() || "";
  
    const queryTerm = document.getElementById("queryTerm");
    const resultsDiv = document.getElementById("results");
    if (queryTerm) queryTerm.textContent = query;
    if (!resultsDiv || !query) return;
  
    try {
      // Carrega o conteúdo bruto do index.html
      const response = await fetch("index.html");
      const htmlText = await response.text();
  
      // Cria DOM temporário para trabalhar com os elementos
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");
  
      // Seleciona os artigos da seção #missoes
      const articles = doc.querySelectorAll("#missoes article");
  
      // Filtra pelo texto do título e parágrafo
      const matches = Array.from(articles).filter(article => {
        const title = article.querySelector("h3")?.textContent.toLowerCase() || "";
        const content = article.querySelector("p")?.textContent.toLowerCase() || "";
        return title.includes(query) || content.includes(query);
      });
  
      if (matches.length === 0) {
        resultsDiv.innerHTML = "<p>Nenhum resultado encontrado.</p>";
      } else {
        matches.forEach(article => {
          const cloned = article.cloneNode(true); // Mantém estrutura e imagem
          resultsDiv.appendChild(cloned);
        });
      }
    } catch (error) {
      console.error("Erro ao carregar index.html:", error);
      resultsDiv.innerHTML = "<p>Erro ao carregar os resultados. Tente novamente mais tarde.</p>";
    }
  });
  