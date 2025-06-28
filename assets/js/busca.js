document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q")?.toLowerCase().trim() || "";
  
    const queryTerm = document.getElementById("queryTerm");
    const resultsDiv = document.getElementById("results");
  
    if (queryTerm) queryTerm.textContent = query;
  
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    );
  
    if (!resultsDiv) return;
  
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
  