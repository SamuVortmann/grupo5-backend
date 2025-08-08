const popUpCriarPoste = document.querySelector('#pop-up.adicionarPoste');
const popUpAdicionarAssociadas = document.querySelector('#pop-up.adicionarAssociadas');
const recarregarForcado = document.querySelector('main#maps button#recaregar');
const selecionarEmpresaOnLoad = document.getElementById('selecionarEmpresa');
const selecionarServico = document.getElementById('especificarServico');

let selecionados = [];
let contextMenuWindow;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
    map = new google.maps.Map(document.getElementById("map"), {
        center: centroDoMapa,
        zoom: 18,
        mapId: 'posteMapas'
    });


    // addAdvancedMarker(centroDoMapa, "teste");

    map.addListener("click", (e) => {
        if (contextMenuWindow) contextMenuWindow.close();
        // Se estar no mobile, então não pode criar postes clicando
        if (window.innerWidth <= 425) return;

        const confirmacao = confirm("Deseja adicionar um novo marcador aqui?");
        if (confirmacao) {        
            let lat = e.latLng.lat();
            let lng = e.latLng.lng();
            new Poste(lat, lng, empresa_logada.nome, 'IFC - Campus Concórdia');
            atualizarMapa();
        }
    });

    
    function addAdvancedMarker(ponto) {
        const infos = ponto.obj;

        glyphColor = statusColor[typeStatusmenos1[ponto.status]]
        glyphBorderColor = statusColor[typeStatusmenos1[ponto.status] + (statusColor.length/2) ] // 

        let lat = infos.lat;
        let lng = infos.lng;
        let title = infos.title;
        
        const image = document.createElement("img");
        image.src = "../assets/icones/lampada.svg";
        image.style.width = '28px';
        image.style.height = '28px';
        
        const pin = new PinElement({
            scale: 1.3,
            glyph: image,
            background: glyphColor,
            borderColor: glyphBorderColor
        });

        const marker = new AdvancedMarkerElement({
            map,
            position: {lat: lat, lng: lng},
            content: pin.element,

            title: title
        });

        marker._globalId = ponto._globalId;
        marker._localId = ponto._localId;
        marker._StringGlobalId = ponto._StringGlobalId;

        const infoWindow = new google.maps.InfoWindow({
          content: infos.content,
        });

        ponto.objHtml = marker;

        marker.addListener("click", (event) => {
            if (contextMenuWindow) contextMenuWindow.close();
            if (event.domEvent.ctrlKey && action != 0) action = 2;
            switch (action){
            case 0:
                //Conectar poste
                conectarPostes(marker);
                break;
            case 1:
                // Abrir info postes
                // atualizarMapa();
                infoWindow.open(map, marker);
                break;
            case 2:
                // Selecionar postes
                action = 1;
                let posteAchado = empresa_logada.__postes[acharIndicePoste(marker._StringGlobalId)];

                if (selecionados.includes(posteAchado)) {
                    selecionados.splice(selecionados.indexOf(posteAchado), 1);
                    marker.classList.remove('poste-selecionado');
                } else {
                    selecionados.push(posteAchado);
                    marker.classList.add('poste-selecionado')
                }
                break;
                
            }
            
        });

        // @deprecated
        function showContextMenu(position, marker) {
            indicePoste = acharIndicePoste(marker._StringGlobalId);
            
            if (contextMenuWindow && contextMenuWindow.isOpen) {
                contextMenuWindow.close();

                if (contextMenuWindow.position.lat() == marker.position['YC'] && contextMenuWindow.position.lng() == marker.position['ZC']) return;
            }

            const content = `
                <div id="contenxt-content">
                    <button class="bigger-button" onclick="deletarPoste(${indicePoste})">Deletar</button>
                </div>
            `;
            
            contextMenuWindow = new google.maps.InfoWindow({
                content: content,
                position: {lat: position.lat, lng: position.lng},
                headerDisabled: true,
                pixelOffset: {height: 35, width: 70},
                ariaLabel: 'context-window'
            });

            contextMenuWindow.open(map);
        }
        // showContextMenu({lat: -100, lng: -100});
        
        // Ainda não tem uso, mas pode ter
        marker.addEventListener("contextmenu", () => {
            // showContextMenu(marker.position, marker);
        });
    }

    function removerMarkers() {
        const marks = document.querySelectorAll('gmp-advanced-marker');
        marks.forEach((e) => {
            e.remove();
        })
    }

    function carregarPostes() {

        empresa_logada.__postes.forEach(function(ponto) {
            ponto.atualizarPontoMaps();
            addAdvancedMarker(ponto);
    });
    }

    function removerInfoWindow() {
        let infos = document.getElementsByClassName('gm-style-iw-a');
        let len = infos.length
        if (len == 0) return;
        for (let i = 0; i<len; i++) {
            infos[i].remove();
        }
    }

    function atualizarMapa() {
        selecionados = [];
        removerInfoWindow();
        removerMarkers();
        carregarPostes();
    }

    recarregarForcado.addEventListener('click', atualizarMapa);

    carregarPostes();

    // Ir pela empresa logada e habilitar todas as conexções dos postes dela por front-end
    empresa_logada.__postes.forEach((poste) => {
        // To-do
        for (i = 0; i<poste.conexcoes.length; i++) {
            desenharLinhaEntre(poste, poste.conexcoes[i]);
        }
    })
    toggleArrow(false);
}

window.initMap = initMap;


/* Resto */
let action = 1;
let posteSelecionado;

function toggleConnect(element) {
    // Por enquanto action é só -> 1 => conectar postes
                                // 0 => Criar postes
    if (action == 1) {
        action = 0;
        toggleArrow(true);
    } else {
        action = 1;
        toggleArrow(false);
    }

    element.classList.toggle('nao-selecionado')
    
}

function conectarPostes(elementHTML) {    
    
    let element = empresa_logada.__postes[acharIndicePoste(elementHTML._StringGlobalId)];
    
    if (posteSelecionado == element) {
        
        posteSelecionado = null;
        elementHTML.style.background = '';
        console.log('des-selecionado - igual');
    }
    else if (posteSelecionado) {    
        posteSelecionado.conexcoes.push(element);

        desenharLinhaEntre(posteSelecionado, element);

        posteSelecionado.objHtml.style.background = '';
        posteSelecionado = null;
        console.log('des-selecionado - sucesso');
    } 
    else {
        posteSelecionado = element;

        elementHTML.style.background = 'var(--corBackground)';
        console.log('selecionado')
    }

}

// Local pro mapa, sla como fica no BD
let Linhas = [];

function desenharLinhaEntre(lat1, lng1, lat2, lng2, mostrar = true) {
    let obj1 = lat1;
    let obj2 = lng1;
    if (typeof(lat1) == 'object') {
        lat1 = obj1.lat;
        lng1 = obj1.lng;
        lat2 = obj2.lat;
        lng2 = obj2.lng;
    }


    const setaIcon = {
    icon: {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 3,
        strokeColor: '#FFC107' //'var(--corBackground)'
    },
    offset: '100%'
    }
    
    setaLine = new google.maps.Polyline({
        path: [
        { lat: lat1, lng: lng1 },
        { lat: lat2, lng: lng2 }
        ],
        strokeColor: mostrar ? '#FFC107' : 'transparent', //'var(--corBackground)'
        strokeOpacity: 1.0,
        strokeWeight: 2,
        icons: [setaIcon]
    });

    setaLine.setMap(map);
    Linhas.push(setaLine);
    
}

function toggleArrow(mostrar) {
    if (!Linhas) return;
    Linhas.forEach((linha) => {

    if (mostrar) {
        linha.setMap(map)
    } else {
        linha.setMap(null)
    }
    
    });
}

function togglePopUpCriarPoste(bool) {
    if (bool) {
        popUpCriarPoste.style.display = 'flex';
        togglePopUpAssociadas(false);
    } else {
        popUpCriarPoste.style.display = 'none';
    }
    
}

function togglePopUpAssociadas(bool) {
    if (bool) {

        if (selecionados.length < 1) {
            alert('Selecione postes segurando CTRL e clicando');
            return;
        }

        popUpAdicionarAssociadas.style.display = 'flex';
        listarArrayEmElement(selecionarEmpresaOnLoad, 'p', empresas);
        criarElementosXVezes(selecionarServico, 'input', selecionarEmpresaOnLoad.childElementCount, 'text', 'servicoTextInput');
        
        togglePopUpCriarPoste(false);
    } else {
        popUpAdicionarAssociadas.style.display = 'none';
    }
}

function criarPoste(e) {

    let lat = document.getElementById('PopUpLat').value;
    let lng = document.getElementById('PopUpLng').value;

    if (!(lat && lng)) return
    
    if (lat.includes('°')) lat = coordsStringToNumber(lat)
    if (lng.includes('°')) lng = coordsStringToNumber(lng)
    
    new Poste(parseFloat(lat), parseFloat(lng), empresa_logada.nome, 'IFC - Campus concórdia', [], {});
    togglePopUpCriarPoste(false);
    recarregarForcado.click();
    
}

/* Função de apoio */
function acharIndicePoste(achar) {
    for (let indice = 0; indice<empresa_logada.__postes.length; indice++){
        let posteStringId = empresa_logada.__postes[indice]._StringGlobalId;
        if (posteStringId.slice(0,5) != achar.slice(0,5)) {
            continue;
        }

        if (posteStringId == achar) {
            return indice;
        }
    }
}

function coordsStringToNumber(coords) {
    //27°18'36.9"S 52°11'53.7"W
    let rosaVento = {
        'S': -1,
        'W': -1,
        'N': 1,
        'E': 1
    }
    coords = coords.replaceAll(' ', '');

    let I_grau = coords.indexOf('°')//°
    let I_minuto = coords.indexOf("'")//'
    let I_segundo = coords.indexOf('"')//"
    let L_rosa = coords[coords.length-1]//letra NEWS

    let grau = coords.slice(0, I_grau);
    let minuto = coords.slice(I_grau+1, I_minuto);
    let segundo = coords.slice(I_minuto+1, I_segundo);

    let total = `${grau}%${minuto}${segundo}`;
    total = parseFloat(total.replaceAll('.', '').replace('%', '.')) * rosaVento[L_rosa];
    // console.log(total);

    return total;
    
}






/* On Load */

