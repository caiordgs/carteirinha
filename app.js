// ====== DADOS MOCKADOS ======
const noticias = [
  {
    titulo: "Semana de Tecnologia 2025",
    data: "05/12/2025",
    categoria: "Eventos",
    texto:
      "Participe da Semana de Tecnologia com palestras sobre IA, Cloud e Segurança da Informação."
  },
  {
    titulo: "Rematrícula aberta",
    data: "01/12/2025",
    categoria: "Acadêmico",
    texto:
      "O período de rematrícula para o semestre 2026/1 já está disponível no portal financeiro."
  },
  {
    titulo: "Novo laboratório de informática",
    data: "25/11/2025",
    categoria: "Infraestrutura",
    texto:
      "Inauguramos um novo laboratório com 30 máquinas de alto desempenho para as aulas de programação."
  }
];

// ====== NAVEGAÇÃO ENTRE TELAS ======
function showScreen(screenId) {
  // esconde todas as telas
  document.querySelectorAll(".screen").forEach((s) => {
    s.classList.remove("active");
  });

  // mostra a tela desejada
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
  }

  // atualiza o botão ativo da bottom nav
  document.querySelectorAll(".bottom-nav .nav-btn").forEach((btn) => {
    const btnTarget = btn.getAttribute("data-target");
    if (btnTarget === screenId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function setupNavigation() {
  // botões do menu (cards)
  document.querySelectorAll(".card-button").forEach((btn) => {
    if (!btn.classList.contains("disabled")) {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        if (target) {
          showScreen(target);
        }
      });
    }
  });

  // botões de voltar
  document.querySelectorAll(".back-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      if (target) {
        showScreen(target);
      }
    });
  });

  // navegação com bottom nav
  document.querySelectorAll(".bottom-nav .nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      if (target) {
        showScreen(target);
      }
    });
  });
}

// ====== RENDERIZAÇÃO DAS NOTÍCIAS ======
function renderNews() {
  const newsList = document.getElementById("news-list");
  if (!newsList) return;

  noticias.forEach((item) => {
    const li = document.createElement("li");
    li.className = "news-item";

    li.innerHTML = `
      <div class="news-title">${item.titulo}</div>
      <div class="news-meta">${item.data} • ${item.categoria}</div>
      <div class="news-body">${item.texto}</div>
    `;

    newsList.appendChild(li);
  });
}

// ====== PWA: REGISTRO DO SERVICE WORKER ======
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => console.log("Service Worker registrado"))
      .catch((err) => console.error("Erro ao registrar Service Worker", err));
  }
}

// ====== INICIALIZAÇÃO ======
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  renderNews();
  registerServiceWorker();
});
