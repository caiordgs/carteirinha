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

  // Inicia a verificação de quem é o usuário favorito
  verificarFavorito();

  // Configura o botão de trocar de usuário
  const btnTrocar = document.getElementById("btn-trocar");
  if (btnTrocar) {
    btnTrocar.addEventListener("click", () => {
      // Remove o favorito do celular e recarrega a tela
      localStorage.removeItem("favoritoCarteirinha");
      verificarFavorito();
    });
  }
});

// ====== DADOS DOS ESTUDANTES ======
const estudantes = [
  {
    id: "daniel",
    nome: "Daniel Paes Lourenço",
    ra: "202600456",
    curso: "Engenharia Civil",
    validade: "12/2026",
    foto: "img/dani.png"
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
    foto: "img/gabi.png"
  }
];

// ====== GERENCIAMENTO DO FAVORITO ======
function verificarFavorito() {
  const idSalvo = localStorage.getItem("favoritoCarteirinha");
  const telaSelecao = document.getElementById("selection-screen");
  const containerCarteirinha = document.getElementById("card-student-container");
  const btnTrocar = document.getElementById("btn-trocar");

  if (idSalvo) {
    // 1. Tem favorito: Acha o estudante, esconde a lista e mostra a carteirinha
    const estudante = estudantes.find(e => e.id === idSalvo) || estudantes[0];

    telaSelecao.style.display = "none";
    containerCarteirinha.style.display = "block";
    btnTrocar.style.display = "block";

    renderCarteirinha(estudante);
  } else {
    // 2. Não tem favorito: Mostra a lista para escolher e esconde a carteirinha
    telaSelecao.style.display = "block";
    containerCarteirinha.style.display = "none";
    btnTrocar.style.display = "none";

    renderListaSelecao();
  }
}

function renderListaSelecao() {
  const listaContainer = document.getElementById("friends-list");
  if (!listaContainer) return;

  listaContainer.innerHTML = ""; // Limpa a lista

  estudantes.forEach((estudante) => {
    const btn = document.createElement("button");
    btn.className = "card-button"; // Reaproveitando o estilo bonito dos botões do menu inicial
    btn.innerHTML = `
      <h2>${estudante.nome}</h2>
      <p>RA: ${estudante.ra}</p>
    `;

    // Ao clicar, salva o ID no celular e verifica novamente
    btn.addEventListener("click", () => {
      localStorage.setItem("favoritoCarteirinha", estudante.id);
      verificarFavorito();
    });

    listaContainer.appendChild(btn);
  });
}

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



// ====== ATUALIZAR O DOMCONTENTLOADED ======
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  renderNews();
  renderTabs();
  renderCarteirinha(estudanteAtual);
  registerServiceWorker();
});
