let total = {
  constribuintesBamboo: 29,
  constribuintesBlack: 16,
  constribuintesMahogany: 7,
  contribuintes: 274,
  arrecadado: 15612
}

let totalString = localStorage.getItem('arrecadacao');
let totalObj = JSON.parse(totalString);

console.log(totalObj)

const btnBlack = document.querySelector('[data-contribuicao="black"]');
const btnBamboo = document.querySelector('[data-contribuicao="bamboo"]');
const btnSelect = document.querySelectorAll('.botao-select');
const inputContribuicao = document.querySelectorAll('.input-modal');
const botaoApoio = document.querySelectorAll('.botao-apoio');

const modal = document.querySelector('.modal');
const obrigado = document.querySelector('.obrigado');
const btnObrigado = document.querySelector('.obrigadoBtn')


function contribuir(){
//Selecionando o tipo de contribuição//
btnSelect.forEach((btn) => {
  btn.addEventListener('click', checagem)
})
function checagem(){
  const inputAtivos = document.querySelector('.inputAtivo')
  if(inputAtivos){
    inputAtivos.classList.remove('inputAtivo')
  }

  if(this.hasAttribute('bamboo'))
  {
    let bamboo = document.querySelector('[value="bamboo-stand"]')
    bamboo.setAttribute("checked", "checked")
    bamboo.classList.add('ativo')
    bamboo.parentElement.nextElementSibling.classList.add('inputAtivo')
  } 
  else if (this.hasAttribute('black'))
  {
    let black = document.querySelector('[value="black-stand"]')
    black.setAttribute("checked", "checked")
    black.classList.add('ativo')
    black.parentElement.nextElementSibling.classList.add('inputAtivo')

  } 
  else if (this.hasAttribute('mahogany'))
  {
    let mahogany = document.querySelector('[value="mahogany-stand"]')
    mahogany.setAttribute("checked", "checked")
    mahogany.classList.add('ativo')
    mahogany.parentElement.nextElementSibling.classList.add('inputAtivo')
  }
}

//Selecionando o valor no modal e concluindo apoio//

inputContribuicao.forEach((input) => {
  input.addEventListener('click', mostrarSecao)
})
function mostrarSecao(event){
  const inputAtivos = document.querySelector('.inputAtivo')
  const addclass = event.path[2].children[1]
  addclass.classList.add('inputAtivo')

  if(inputAtivos){
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
    total.constribuintesBamboo -= 1
    totalObj.constribuintesBamboo= total.constribuintesBamboo
  } 
  else if (this.hasAttribute('data-black'))
  {
    total.constribuintesBlack -= 1
    totalObj.constribuintesBlack= total.constribuintesBlack

  } 
  else if (this.hasAttribute('data-mahogany'))
  {
    total.constribuintesMahogany -= 1
    totalObj.constribuintesMahogany= total.constribuintesMahogany
  }

  total.contribuintes += 1

  totalObj.contribuintes =  total.contribuintes

  const valorEscolhido = +this.previousElementSibling.value
  total.arrecadado += valorEscolhido 
  totalObj.arrecadado = total.arrecadado

  salvarDados()
  initSetar()
  showObrigado()
}


function showObrigado(){
  modal.classList.remove('ativo')
  obrigado.classList.add('ativo')
}
}
contribuir()

function initSetar(){
  const nrBamboo = document.querySelectorAll('.nrBamboo');
  const nrBlack = document.querySelectorAll('.nrBlack');
  const nrMahogany = document.querySelectorAll('.nrMahogany');
  
  const valorArrecadado = document.querySelector('.valorArrecadado');
  const QtdeContribuintes = document.querySelector('.contribuintes');
  
  function setarValorArrecadado(){
    valorArrecadado.innerText =  total.arrecadado.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    const barra = document.querySelector("progress")
    barra.setAttribute('value',  total)
  }
  setarValorArrecadado()
  
  function setarVagasContribuintes(){
    QtdeContribuintes.innerText = total.contribuintes
    nrBamboo.forEach(c => c.innerHTML = total.constribuintesBamboo)
    nrBlack.forEach(c => c.innerHTML = total.constribuintesBlack)
    nrMahogany.forEach(c => c.innerHTML = total.constribuintesMahogany)
  }
  setarVagasContribuintes()
}
initSetar()

function funcaoModal(){
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
}
funcaoModal()

function salvarDados(){
  localStorage.setItem('arrecadacao', JSON.stringify(total))
}