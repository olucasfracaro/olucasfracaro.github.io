function typeText(element, text, speed = 35) {
  return new Promise(resolve => {
    let i = 0;
    function typing() {
      if (i <= text.length) {
        element.textContent = text.slice(0, i);
        i++;
        setTimeout(typing, speed);
      } else {
        // Adiciona o cursor ao final do texto
        element.innerHTML += '<span class="cursor"></span>';
        setTimeout(() => {
          // Remove o cursor após 200ms
          const cursor = element.querySelector('.cursor');
          if (cursor) {
            cursor.remove();
          }
          resolve();
        }, 200);
      }
    }
    typing();
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('DOMContentLoaded', async function () {
  const cmdEl = document.getElementById('cmdNome');
  const nomeH1 = document.getElementById('nomeDigitado');
  const nomeSpan = nomeH1.querySelector('.cursor');
  const cmdNavbarEl = document.getElementById('cmdNavbar');
  const header = document.querySelector('header');
  const descricao = document.getElementById('descricao');
  const cmdDescEl = document.getElementById('cmdDesc');
  const cmdFotoEl = document.getElementById('cmdFoto');
  const fotoPerfil = document.getElementById('fotoPerfil');
  const cmdClearEl = document.getElementById('cmdClear');
  const contato = document.getElementById('contato');
  const cmdContatoEl = document.getElementById('cmdContato');

  const nomeText = nomeH1.textContent.replace(nomeSpan.textContent, "");
  nomeH1.textContent = "";

  // 1. Digita o comando do nome
  await typeText(cmdEl, '> echo $NOME');
  await delay(500);

  // 2. Mostra e digita o nome
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
          if (cursor) {
            cursor.remove();
          }
          resolve();
        }, 200);
      }
    }
    typeNome();
  });

  // 3. Digita ./menu.sh e mostra header
  await typeText(cmdNavbarEl, '> ./menu.sh');
  await delay(1000);
  header.style.visibility = 'visible';

  // 4. Digita ./descricao.sh e mostra descrição
  await delay(500);
  await typeText(cmdDescEl, '> ./descricao.sh');
  await delay(1000);
  descricao.style.visibility = 'visible';

  // 5. Digita ./foto.sh e mostra imagem
  await delay(1000);
  await typeText(cmdFotoEl, '> ./foto.sh');
  await delay(1000);
  fotoPerfil.style.visibility = 'visible';

  // 6. Digita ./contato.sh e mostra footer
  await delay(1000);
  await typeText(cmdContatoEl, '> ./contato.sh');
  await delay(1000);
  contato.style.visibility = 'visible';

  // 7. Digita clear e limpa os elementos
  await delay(1000);
  await typeText(cmdClearEl, '> clear');
  await delay(750);
  nomeSpan.style.display = 'none';

  cmdEl.remove();
  cmdNavbarEl.remove();
  cmdDescEl.remove();
  cmdFotoEl.remove();
  cmdContatoEl.remove();
  cmdClearEl.remove();
});