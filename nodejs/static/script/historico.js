

// // debug inicio
// const botoesObj = document.getElementsByClassName('botoes')[0];

// console.log(botoesObj);

// botoesObj.addEventListener('click', changeDropdown);
// // debug fim
let postePrincipal;

const popUp = document.getElementById('pop-up');
const sectionNot = document.getElementById('sec-notificacoes');
const nomePoste = document.getElementById('nomePoste');
const descDeTextbox = document.querySelector('#pop-up #descricao');


function changeStatusTo(element) {    
    element.title = element.value;

    // Para mudar no objeto Poste
    let notTotal = element.parentElement.parentElement;
    let id = notTotal.children[0].children[1];

    let [poste, notif, index] = acharPostePeloID(id); // Retorna o poste e a notificação

    notif[3] = typeSNotmenos1[element.value];
}

function deleteNotificacao(e) {
    // Para mudar no objeto Poste
    let notTotal = e.parentElement.parentElement;
    let id = notTotal.children[0].children[1];

    let [poste, notif, index] = acharPostePeloID(id);
    poste.notificacoes.splice(index, 1, '');

    notTotal.remove();
}

function criarNotificacao() {
    if (!(postePrincipal)) {
        alert('Sem nenhum poste selecionado!');
        return;
    }
    //
    let descricao = descDeTextbox.value;
    togglePopUp(false);
    descDeTextbox.value = '';

    //
    postePrincipal.novaNotificacao(descricao);
    pegarPoste(postePrincipal)
}

function limparHTMLNot() {
    sectionNot.innerHTML = '';
}



function togglePopUp(bool) {
    if (!(bool)) {
        popUp.style.display = 'none';
    } else {
        popUp.style.display = 'flex';
        popUp.children[3].innerText = `Criando notificação no ${postePrincipal.titulo}`
    }
    
}

function adicionarNotificacao(notificacao) {
    notificacao.atualizarNotificacao();
    sectionNot.innerHTML = `${notificacao.innerHTML} ${sectionNot.innerHTML}`;   
}

function selecionarTextoCertoDropdowns() {
    let dropdowns = document.getElementsByClassName('dropdown');
    for (let i = 0; i < dropdowns.length; i++) {
        let element = dropdowns[i];
        let index = typeSNotmenos1[element.title];
        element.selectedIndex = index;
    };
}

function acharPostePeloID(idTotal) {
    indices = idTotal.innerText.split('#')[1].split('-');
    //o indice[0] é o indice do poste, e o indice[1] é o indice da notificação dentro do poste.
    return [empresa_logada.__postes[indices[0]], empresa_logada.__postes[indices[0]].notificacoes[indices[1]-1], parseInt(indices[1])-1]
    // Retorna o poste e a notificação
}

// 1° parte é a página, agora é a integração com o resto
// Como é só pra ver os postes da empresa logada, utilizaria um idLocal pra pegar da lista de postes (da empresa logada)
function handleChangePoste(nome) {
    let idOf = parseInt(nome.slice(nome.indexOf('#')+1)-1);
    changeURL('/historico/', idOf)
}

function pegarPoste(poste) { // Objeto poste
    postePrincipal = poste;
    limparHTMLNot();
    nomePoste.value = poste.titulo;
    let notificacaoes = [...poste.notificacoes];
    notificacaoes.forEach((infos) => {
        if (infos) {
            adicionarNotificacao(new Notificacao(...infos));
        }
    });

    selecionarTextoCertoDropdowns()
}

listarArrayEmElement(nomePoste, 'option', empresa_logada.__postes);


let postePegado = window.location.href.split('historico/')[1]

if (postePegado == '' || postePegado == null || postePegado == 'null') {
    pegarPoste(empresa_logada.__postes[0])
} else {
    pegarPoste(empresa_logada.__postes[parseInt(postePegado)])
};
