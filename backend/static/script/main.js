
// Global -> Todas empresas lê essas variáveis
let globalIdPostes = 0;
let empresas = [];

// Local -> Apenas empresa logada lê
let idPostes = 0;
let postes = [];

// Banco de dados -> Depende do usuário de entrada
// Composta por 4 caractéres.
// const empresa_cod = '0413'; // 0413#1 -> empresa cód 0413 # poste 1
const empresa_logada = new Empresa("Isada's corp", '0413')

// Debug 
new Empresa("LaRa's Corp", '1379')
new Empresa("Sperb's Corp", '4121')
new Empresa("Veriato's Corp", '0359')

// new Empresa("LaRa's Corp", '1379');new Empresa("LaRa's Corp", '1379');new Empresa("LaRa's Corp", '1379');new Empresa("LaRa's Corp", '1379');
// new Empresa("Sperb's Corp", '4121');new Empresa("Sperb's Corp", '4121');new Empresa("Sperb's Corp", '4121');new Empresa("Sperb's Corp", '4121');
// new Empresa("Veriato's Corp", '0359');new Empresa("Veriato's Corp", '0359');new Empresa("Veriato's Corp", '0359');new Empresa("Veriato's Corp", '0359');
//

// front-end => Variaveis mudáveis
const statusColor = ['#FF7979', "#7ED957" ,"#598EFF", "#FF0000", "#00BF63", "#0051FF"]
const centroDoMapa = { lat: -27.200476, lng: -52.082809 }; // Entrada do IF
let map;
// Status geral
const typeStatus = ['Desligado', 'Ativo' ,'Em manutenção'];
const typeStatusmenos1 = {'Desligado': 0, 'Ativo': 1, 'Em manutenção': 2}
// Status da notificação
const typeNot = ['Ativa', 'Concluida','Manut.'];
const typeSNotmenos1 = {'Ativa': 0, 'Concluida': 1 ,'Manut.': 2}



/* !Pega informações globais! */
function listarArrayEmElement(elementoPai, element, arraySelecionado) {
    elementoPai.innerHTML = '';

    arraySelecionado.forEach((item) => {
        let opcao = document.createElement(element);
        opcao.obj = item;
        if (item.nome){
            opcao.value = item.nome;
            opcao.innerText = item.nome;
        } else if (item.titulo) {
            opcao.value = item.titulo;
            opcao.innerText = item.titulo;
        }

        elementoPai.append(opcao);
    })
}

function criarElementosXVezes(elementoPai, element, vezes, tipo = '', clase = '') {
    elementoPai.innerHTML = '';

    for (let i = 0; i< vezes; i++) {
        let opcao = document.createElement(element);

        if (tipo) opcao.type = tipo;
        if (clase) opcao.classList.add(clase);
        

        elementoPai.append(opcao);
    }
}

function acharIndiceDeXemY(elemento, pai) {
    let lista = pai.children;
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] == elemento) {
            return i;
        }
    }
}

function removeItemDeArray(item, array) {
    for (let i = 0; i< array.length; i++) {
        if (array[i] == item) {
            array.splice(i, 1);
        }
    }
}


function converterParaJSON(objeto) {
    return JSON.parse(JSON.stringify(objeto));
}