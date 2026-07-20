// ====== DADOS MOCKADOS ======
const noticias = [
  {
    titulo: "Semana de Tecnologia 2025",
    categoria: "Eventos",
    texto:
      "Participe da Semana de Tecnologia com palestras sobre IA, Cloud e Segurança da Informação."
  },
  {
    titulo: "Rematrícula aberta",
    categoria: "Acadêmico",
    texto:
      "O período de rematrícula para o semestre 2026/1 já está disponível no portal financeiro."
  },
  {
    titulo: "Novo laboratório de informática",
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

// ====== DADOS DOS ESTUDANTES ======
const estudantes = [
  {
    id: "daniel",
    nome: "Daniel Paes Lourenço",
    ra: "202600456",
    curso: "Engenharia Civil",
    validade: "12/2026",
    foto: "img/lucas.png"
  },
  {
    id: "julia",
    nome: "Júlia Busch",
    ra: "202600789",
    curso: "Odontologia",
    validade: "12/2026",
    foto: "img/mariana.png"
  },
  {
    id: "gabriella",
    nome: "Gabriella Neme",
    ra: "202600651",
    curso: "Publicidade e Propaganda",
    validade: "12/2026",
    foto: "img/mariana.png"
  }
];

let estudanteAtual = estudantes[0];
o
// ====== RENDERIZAÇÃO DA CARTEIRINHA ======
function renderCarteirinha(estudante) {
  const container = document.getElementById("card-student-container");
  if (!container) return;

  container.innerHTML = `
    <div class="card-header">
      <span class="college-name">Unisagrado</span>
      <span class="student-tag">ESTUDANTE</span>
    </div>

    <div class="card-body">
      <div class="student-photo">
        <img src="${estudante.foto}" alt="Foto de ${estudante.nome}" class="student-photo-img">
      </div>

      <div class="student-info">
        <p><strong>Nome:</strong> ${estudante.nome}</p>
        <p><strong>RA:</strong> ${estudante.ra}</p>
        <p><strong>Curso:</strong> ${estudante.curso}</p>
        <p><strong>Validade:</strong> ${estudante.validade}</p>
      </div>
    </div>

    <div class="card-footer">
      <div class="qr-code">
        <div class="qr-row"><span></span><span></span><span></span><span></span></div>
        <div class="qr-row"><span></span><span class="filled"></span><span></span><span class="filled"></span></div>
        <div class="qr-row"><span class="filled"></span><span></span><span class="filled"></span><span></span></div>
        <div class="qr-row"><span></span><span class="filled"></span><span></span><span></span></div>
      </div>
      <p class="card-footer-text">Apresente esta carteirinha nos pontos de acesso</p>
    </div>
  `;
}

function renderTabs() {
  const tabsContainer = document.getElementById("friends-tabs");
  if (!tabsContainer) return;

  tabsContainer.innerHTML = "";

  estudantes.forEach((estudante) => {
    const btn = document.createElement("button");
    btn.className = `tab-btn ${estudante.id === estudanteAtual.id ? "active" : ""}`;
    btn.innerText = estudante.nome.split(" ")[0]; // Exibe apenas o primeiro nome
    btn.addEventListener("click", () => {
      estudanteAtual = estudante;
      renderTabs();
      renderCarteirinha(estudanteAtual);
    });
    tabsContainer.appendChild(btn);
  });
}

// ====== ATUALIZAR O DOMCONTENTLOADED ======
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  renderNews();
  renderTabs();
  renderCarteirinha(estudanteAtual);
  registerServiceWorker();
});
