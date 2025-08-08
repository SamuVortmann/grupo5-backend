// 0 -> Empresa
// 1 -> Funcionário
let estaEm = 0;


const seletor = document.getElementById('selector');

function setQuem(status) {
    estaEm = status;

    if (estaEm) {
        funcionario();
    } else {
        empresa();
    }
}

function funcionario() {
    seletor.children[0].classList.add('nao-selecionado')
    seletor.children[1].classList.remove('nao-selecionado')

}

function empresa() {
    seletor.children[0].classList.remove('nao-selecionado')
    seletor.children[1].classList.add('nao-selecionado')

}