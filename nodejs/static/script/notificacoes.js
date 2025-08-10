const descDeTextbox = document.querySelector('#pop-up #descricao');
const popUp = document.getElementById('pop-up');
const sectionNot = document.getElementById('sec-notificacoes');
const nomePoste = document.getElementById('nomePoste');

let posteSelecionado;
let indiceSelecionado;

function limparHTMLNot() {
    sectionNot.innerHTML = '';
}

function acharIndiceDeXemY(elemento, pai) {
    let lista = pai.children;
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] == elemento) {
            return i;
        }
    }
}

function toggleCriarNotificacao(bool) {
    if (!(bool)) {
        popUp.style.display = 'none';
        descDeTextbox.value = '';
    } else {
        popUp.style.display = 'flex';
        listarArrayEmElement(nomePoste, 'option', empresa_logada.__postes);
        nomePoste.selectedIndex = indiceSelecionado-1;
    }
}

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

function adicionarNotificacao(notificacao) {
    notificacao.atualizarNotificacao();
    sectionNot.innerHTML = `${notificacao.innerHTML} ${sectionNot.innerHTML}`;
}

function carregarTodasNotificacoes(arrayEmpresa) {
    sectionNot.innerHTML = '';

    for (let i = 0; i < arrayEmpresa.length; i++) {
        if (arrayEmpresa[i].notificacoes.length >= 1){
            arrayEmpresa[i].notificacoes.forEach((infos) => {
                if (infos){
                    adicionarNotificacao(new Notificacao(...infos))
                }
            });

            sectionNot.innerHTML = `<div class='hr'><span>${arrayEmpresa[i].titulo}</span>
                                    <a class="irHistorico" href="./historico/${i}" target="_blank"></a></div>
                                    ${sectionNot.innerHTML}`;
        }
    }

    selecionarTextoCertoDropdowns()
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

function recarregarPagina() {
    carregarTodasNotificacoes(empresa_logada.__postes);
}

function handleChangePoste(nome) {
    indiceSelecionado = nome.slice(nome.indexOf('#')+1)
    posteSelecionado = parseInt(indiceSelecionado-1);
};


function criarNotificacao() {
    let text = descDeTextbox.value;

    empresa_logada.__postes[posteSelecionado].novaNotificacao(text);
    toggleCriarNotificacao(false);

    carregarTodasNotificacoes(empresa_logada.__postes);
}

handleChangePoste('Poste #1');
carregarTodasNotificacoes(empresa_logada.__postes);