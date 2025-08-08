class Poste {
    constructor(coord_lat, coord_lng, empresa_dona, regiao, conexcoes = [], empresas_associadas = {}, status = 1) {
        this.titulo = 'Poste #'+ ++idPostes;
        this._globalId = globalIdPostes;
        this._localId = idPostes-1;
        this._StringGlobalId = `${empresa_logada.__cod}#${++globalIdPostes}`;

        this.lat = coord_lat;
        this.lng = coord_lng;
        this.regiao = regiao; // Str

        this.dona = empresa_dona; // Str
        this.associadas = empresas_associadas; // Objeto {empresa: serviço: array}
        this.status = typeStatus[status]; // Apenas -> 1: Ativo ; 0: Desligado ; 2: Em manutenção;

        this.conexcoes = conexcoes; // Lista objetos de outros postes => Ou null
        // Conexões vai servir como apenas ir, nunca voltar (se ter um loop vai dar problema)

        this.notificacoes = [];
        this.idNotificacao = 0; // id para as notificações | local

        this.atualizarPontoMaps();
        empresa_logada.__postes.push(this);
    }

    setStatus(toStatusNum) { // Recebe valor de, 0, 1, 2
        const toStatus = typeStatus[toStatusNum];
        let element = this;
        const originalStatus = this.status;

        let listaConexcoes = this.conexcoes;

        // Elemento atual mudar
        this.status = toStatus;

        // SE não ter postes associados.
        if (!(listaConexcoes)) {
            return;
        }

        // Mudar postes associados
        for (let i = 0; i<listaConexcoes.length; i++) {
            element = listaConexcoes[i];
            if (element.status == toStatus) {
                continue;
            };

            if (element.status == typeStatus[2] && !(originalStatus == typeStatus[2]) ) {
                continue;
            }
            element.setStatus(typeStatusmenos1[toStatus]);            
        };

    }

    adicionarEmpresaAssociadas(empresa, ...servico) {
        this.associadas[empresa] = [servico];
    }

    adicionarServico(empresa, servico) {
        this.associadas[empresa] = this.associadas[empresa].push(servico);
    }

    _mudarRegiao(regiaoNova) {
        this.regiao = regiaoNova;
    }

    adicionarConexcao(conectar) {
        this.conexcoes.push(conectar);
    }

    novaNotificacao(descricao, status = 0) {
        // Por enquanto, vai ser uma lista de notificações que ficam armazenadas numa lista dentro do objeto poste, que quando
        // entra na página de notificações, você plota o poste que você quer ver e ele puxa as notificações
        // Por enquanto, sem o banco de dados, irá ser preciso criar tudo no main.js/debug.js

        this.notificacoes.push([{descricao: descricao, idNotificacao: ++this.idNotificacao, data: new Date().toLocaleString(), status: status, localID: this._localId}]) // Status
    }

    atualizarPontoMaps() {
        this.obj = {
            lat: this.lat,
            lng: this.lng,
            title: this.titulo,
            
            content: `
                <div class="maps-content">
                    <h2>${this.titulo}</h2>
                    <h3 class="maps-status" title="${this.status}">Status: ${this.status}</h3>

                    <p>Empresa dona: ${this.dona}</p>
                    <p>Empresas associadas: ${Object.keys(this.associadas)}</p>


                    <a href="./historico.html" onclick="localStorage.setItem('poste', ${this._localId})" target="_blank">Histórico de notificações</a>
                    <div class="setStatus">
                        <p onclick=" empresa_logada.__postes[${this._localId}].setStatus(0); recarregarForcado.click();">set Desativo</p>
                        <p onclick="empresa_logada.__postes[${this._localId}].setStatus(1); recarregarForcado.click();">set Ativo</p>
                        <p onclick="empresa_logada.__postes[${this._localId}].setStatus(2); recarregarForcado.click();">set Manutenção</p>
                    </div>
                </div>
            `,
        };
    }
}


class Notificacao {
    constructor(obj) {
        // TO-DO -> Trabalhar nisso ser obj em vez de um Array
        this.descricaoNotificacao = obj.descricao;
        this.idNotificacao = obj.idNotificacao;
        this.data = obj.data; 
        this.status = obj.status;

        this.idPoste = obj.localID;

        this.atualizarNotificacao();
    }


    atualizarNotificacao() {

        this.innerHTML = `<div class="notificacao">

                <div class="identificacao">
                    <p>Notificação ${this.data}</p>
                    <p>ID #${this.idPoste}-${this.idNotificacao}</p>
                </div>

                <div class="descricao">
                    <p>${this.descricaoNotificacao.slice(0, 160)}</p>
                    <p>${this.descricaoNotificacao.slice(160, 360)}</p>
                </div>

                <div class="botoes">
                    <select title="${typeNot[this.status]}" value="${typeNot[this.status]}" class="dropdown" name="select-status" onchange='changeStatusTo(this)'>${typeNot[this.status]}
                        <option>${typeNot[0]}</option>
                        <option>${typeNot[1]}</option>
                        <option>${typeNot[2]}</option>
                    </select>

                    <button class="lixo" onclick="deleteNotificacao(this)"></button>
                    
                </div>

        </div>`
    }
}

class Empresa {
    constructor(nome, cod, associacoes = []) {
        this.nome = nome;
        this.__cod = cod;

        this.__postes = [];
        this.__idPostes;

        this.__associacoes = [];


        empresas.push(this);
    }
}