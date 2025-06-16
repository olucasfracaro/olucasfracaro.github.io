const data = new Date();

// Função para identificar o navegador
function getBrowserName() {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return "Microsoft Edge";
  if (/OPR\//.test(ua)) return "Opera";
  if (/Chrome\//.test(ua)) return "Chrome";
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/MSIE|Trident\//.test(ua)) return "Internet Explorer";
  return "Navegador desconhecido";
}

// Animação de digitação com cursor
function typeText(element, text, speed = 20) {
  return new Promise(resolve => {
    if (!element) {
      console.warn('typeText: Elemento não encontrado.', { text });
      resolve();
      return;
    }

    let i = 0;
    function typing() {
      if (i <= text.length) {
        element.textContent = text.slice(0, i);
        i++;
        setTimeout(typing, speed);
      } else {
        element.innerHTML += '<span class="cursor"></span>';
        setTimeout(() => {
          const cursor = element.querySelector('.cursor');
          if (cursor) cursor.remove();
          resolve();
        }, 400);
      }
    }
    typing();
  });
}

// Função auxiliar para atrasos
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', async () => {
  // Elementos principais
  const cmdEl = document.getElementById('cmd');
  const cmdInit = document.getElementById('cmdInit');
  const nomeH1 = document.getElementById('nomeDigitado');
  const header = document.querySelector('header');
  const descricao = document.getElementById('descricao');
  const fotoPerfil = document.getElementById('fotoPerfil');
  const contato = document.getElementById('contato');

  // Verificação básica de elementos essenciais
  if (!cmdEl || !cmdInit || !nomeH1) {
    console.error('Erro: Elementos essenciais não encontrados no DOM.');
    return;
  }

  // Preparação do nome e cursor
  const nomeSpan = nomeH1.querySelector('.cursor');
  const nomeText = nomeH1.textContent.replace(nomeSpan?.textContent || "", "").trim();
  nomeH1.textContent = "";

  // Data formatada
  const pad = n => n.toString().padStart(2, '0');
  const dateStr = `${pad(data.getDate())}-${pad(data.getMonth() + 1)}-${data.getFullYear()}`;
  const timeStr = `${pad(data.getHours())}:${pad(data.getMinutes())}:${pad(data.getSeconds())}`;

  // 1. Mostra data/navegador
  await typeText(cmdInit, `Último login: ${dateStr} ${timeStr} em ${getBrowserName()}`);
  await delay(400);

  // 2. Comando do nome
  await typeText(cmdEl, '> echo $NOME');
  await delay(400);

  // 3. Digita o nome com cursor animado
  nomeH1.style.visibility = 'visible';
  nomeH1.innerHTML = "";

  await new Promise(resolve => {
    let i = 0;
    function typeNome() {
      if (i <= nomeText.length) {
        nomeH1.innerHTML = nomeText.slice(0, i) + '<span class="cursor"></span>';
        i++;
        setTimeout(typeNome, 45);
      } else {
        const cursor = nomeH1.querySelector('.cursor');
        setTimeout(() => {
          if (cursor) cursor.remove();
          resolve();
        }, 200);
      }
    }
    typeNome();
  });

  // 4. Digita ./menu.sh e mostra header
  await typeText(cmdEl, '> ./menu.sh');
  await delay(400);
  header.style.visibility = 'visible';

  // 5. ./descricao.sh e exibe descrição
  await delay(400);
  await typeText(cmdEl, '> ./descricao.sh');
  await delay(400);
  descricao.style.visibility = 'visible';

  // 6. ./foto.sh e mostra imagem
  await delay(400);
  await typeText(cmdEl, '> ./foto.sh');
  await delay(400);
  fotoPerfil.style.visibility = 'visible';

  // 7. ./contato.sh e mostra contato
  await delay(400);
  await typeText(cmdEl, '> ./contato.sh');
  await delay(400);
  contato.style.visibility = 'visible';

  // 8. Comando clear e limpa terminal
  await delay(400);
  await typeText(cmdEl, '> clear');
  await delay(400);

  // Oculta cursor final se ainda existir
  if (nomeSpan) {
    nomeSpan.style.display = 'none';
  }

  cmdEl.remove();
  cmdInit.remove();
});
