//Numeros constribuintes//
const nrBamboo = document.querySelectorAll('.nrBamboo');
const nrBlack = document.querySelectorAll('.nrBlack');
const nrMahogany = document.querySelectorAll('.nrMahogany');

const valorArrecadado = document.querySelector('.valorArrecadado');
const QtdeContribuintes = document.querySelector('.contribuintes');

let constribuintesBamboo = 100
let constribuintesBlack = 75
let constribuintesMahogany = 50

let totalContribuintes = 12

let totalArrecadado = 15000

function setarValorArrecadado(){
  valorArrecadado.innerText = '$ ' + totalArrecadado
  const barra = document.querySelector("progress")
  barra.setAttribute('value', totalArrecadado )
}
setarValorArrecadado()

function setarVagasContribuintes(){
  QtdeContribuintes.innerText = totalContribuintes
  nrBamboo.forEach(c => c.innerHTML = constribuintesBamboo)
  nrBlack.forEach(c => c.innerHTML = constribuintesBlack)
  nrMahogany.forEach(c => c.innerHTML = constribuintesMahogany)
}
setarVagasContribuintes()


const btnBlack = document.querySelector('[data-contribuicao="black"]');
const btnBamboo = document.querySelector('[data-contribuicao="bamboo"]');
const btnSelect = document.querySelectorAll('.botao-select');
const inputContribuicao = document.querySelectorAll('.input-modal');
const botaoApoio = document.querySelectorAll('.botao-apoio');


const modal = document.querySelector('.modal');
const obrigado = document.querySelector('.obrigado');
const btnObrigado = document.querySelector('.obrigadoBtn')

btnSelect.forEach((botao) => { 
  botao.addEventListener('click', mostrarModal)
})
function mostrarModal(){
  modal.classList.add('ativo')
}

const fecharModal = document.querySelector('.fechar-modal');
fecharModal.addEventListener('click', function(){
  modal.classList.remove('ativo')
})

btnObrigado.addEventListener('click', () => obrigado.classList.remove('ativo'))
//Selecionando o tipo de contribuição//
btnSelect.forEach((btn) => {
  btn.addEventListener('click', checagem)
})
function checagem(){
  if(this.hasAttribute('bamboo'))
  {
    let bamboo = document.querySelector('[value="bamboo-stand"]')
    bamboo.setAttribute("checked", "checked")
    bamboo.classList.add('ativo')
    bamboo.parentElement.nextElementSibling.classList.add('ativo')
  } 
  else if (this.hasAttribute('black'))
  {
    let black = document.querySelector('[value="black-stand"]')
    black.setAttribute("checked", "checked")
    black.classList.add('ativo')
  } 
  else if (this.hasAttribute('mahogany'))
  {
    let mahogany = document.querySelector('[value="mahogany-stand"]')
    mahogany.setAttribute("checked", "checked")
    mahogany.classList.add('ativo')
  }
}


//Selecionando o valor no modal//

inputContribuicao.forEach((input) => {
  input.addEventListener('click', mostrarSecao)
})
function mostrarSecao(){
  const inputAtivos = document.querySelector('.inputAtivo')
  const addclass = event.path[2].children[1]
  addclass.classList.add('inputAtivo')

  if(inputAtivos){
    console.log(inputAtivos)
    inputAtivos.classList.remove('inputAtivo')
  }
  addclass.classList.add('inputAtivo')
}

botaoApoio.forEach((botao) => {
  botao.addEventListener('click', apoiar)
})

function apoiar(){
  if(this.hasAttribute('data-bamboo'))
  {
    constribuintesBamboo -= 1
  } 
  else if (this.hasAttribute('data-black'))
  {
    constribuintesBlack -= 1
  } 
  else if (this.hasAttribute('data-mahogany'))
  {
    constribuintesMahogany -= 1
  }

  totalContribuintes += 1

  const valorEscolhido = +this.previousElementSibling.value
  totalArrecadado += valorEscolhido 

  setarValorArrecadado()
  setarVagasContribuintes()
  showObrigado()
}

function showObrigado(){
  modal.classList.remove('ativo')
  obrigado.classList.add('ativo')
}