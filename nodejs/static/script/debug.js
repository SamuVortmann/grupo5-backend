// Debug

function mostrarVariaveis(...itens) {
    itens.forEach((item) => {
        console.log(item);
    })
    console.log('##########')
}

function postesToString() {
    
    let objs = '';
    let conexcoes = ``;
    
    // Esse código utiliza localId, então "não funcionaria" no global
    empresa_logada.__postes.forEach((e) => {
        if (e.conexcoes != []){
            e.conexcoes.forEach((p) => {
            conexcoes += `empresa_logada.__postes[${e._localId}].adicionarConexcao(empresa_logada.__postes[${p._localId}]) \n`;}
        )};


        objs += `new Poste(${e.lat}, ${e.lng}, "${empresa_logada.nome}", 'IFC - Campus concórdia', [], {});\n`;
    });

    console.log(objs);
    console.log('')
    console.log('/* Conexções */')
    console.log('')
    console.log(conexcoes);

}

new Poste(-27.200476, -52.082809, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.2007753911968, -52.08286800859833, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.201086459985614, -52.08293655069477, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20140254853843, -52.08299958260662, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20156953835548, -52.083038474637334, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.201682852731718, -52.083074684459035, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.2019977468146, -52.083121623116796, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20229832670031, -52.083190019446675, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20225419399006, -52.08341532500393, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20241998975695, -52.08351322563297, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202623953995204, -52.08324500473148, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202332917190695, -52.082921798545186, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202915749765133, -52.083321127090734, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20322706206804, -52.08338281789808, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20238338847758, -52.08385153560311, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202328520823, -52.08420424608857, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202278424245232, -52.08457573203713, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202227134868494, -52.084935148045126, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202183002130077, -52.08530126957566, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202130817696485, -52.0856590077533, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202067600470613, -52.08601440044777, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.203539516292572, -52.08347156610247, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.203832935465428, -52.08341926302668, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.205572139868895, -52.08378137383247, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.205337169706393, -52.08373041186119, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.205666836247655, -52.08412313951899, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20562151213093, -52.08458984388758, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.205590500882575, -52.084984022792575, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.204990554429163, -52.08366023898442, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20465897029553, -52.08359720707257, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.204586378672786, -52.08395265582145, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20453986136499, -52.084232946663505, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.204493405853757, -52.084618503765206, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20452203190355, -52.08503692837153, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.204745076289726, -52.08523272962962, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20536111509607, -52.085775920687695, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.205536448170722, -52.08612594896414, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.205708202751953, -52.08652828031637, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20577976708268, -52.08691317731001, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20584536767882, -52.08731014424421, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.205914947722512, -52.08779233634204, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.205850539905036, -52.08824294745654, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.205788517527125, -52.08869524325174, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.204395817406372, -52.083280505708835, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20412267657238, -52.083310010008, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.203627342961607, -52.08313175029193, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202323902356607, -52.08250208573648, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202296468518067, -52.08218558507272, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.201417254440617, -52.090118981398376, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.201399362662034, -52.08982259730223, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20139220594979, -52.08951816657904, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.201368350239008, -52.08921507696036, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20135514452503, -52.08891663338289, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.201346795024076, -52.088639024749845, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.201326590215622, -52.088286558990724, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.201305120063516, -52.08799553931261, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20129158966665, -52.0877094896625, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.201277276227877, -52.08742785771594, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20126296278726, -52.08713683803782, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.201245070983912, -52.08685520609126, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.201229564752023, -52.08658027966723, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200954919389755, -52.08983650725276, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20093464195638, -52.089525371007035, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200911978938244, -52.08922362249286, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20090083781474, -52.08893008197857, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200890102698207, -52.08864576782299, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200866246879976, -52.08832926715923, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20085551176011, -52.08799801434589, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20083642710002, -52.087713700190314, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200827615620675, -52.087427091495954, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200778450369594, -52.08658160922092, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200807077373405, -52.08713414427799, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20079634224784, -52.08685117122692, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20076175128066, -52.086301318378865, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200752208942987, -52.08602639195484, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20070970697058, -52.085719512463896, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20069420066422, -52.08542715168127, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200669152010935, -52.0851254031671, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20065632652559, -52.08482062718949, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20063727077669, -52.084519460816864, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200622957253902, -52.084215030093674, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200601486966278, -52.08392132820654, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200096963140975, -52.08279161335074, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200187615848616, -52.083042399893635, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200213857408134, -52.08342863799178, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200241291759188, -52.083845721493596, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20025447925903, -52.08424413474866, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20027833520818, -52.084671947086534, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20029070838034, -52.085045907432665, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200315757118663, -52.085454944307436, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200338420258003, -52.08586652488052, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200358697799835, -52.08626349181473, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20037955033791, -52.08671877273625, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20041294862781, -52.08717046943353, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20043084056471, -52.08762376275705, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20044992529424, -52.08805202751273, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200473781201556, -52.0884248545658, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20049929243492, -52.0889176970287, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200529984417084, -52.08948472745459, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200555999074215, -52.08994577467653, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202253139382712, -52.08364019184066, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202472931931837, -52.08312434613652, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.203630648470714, -52.08272368828825, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.203670009591953, -52.082193952007806, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20366404578659, -52.08183051268629, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.203692672049378, -52.08157167951635, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.2023362733337, -52.08189784896114, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.202218188515452, -52.08193748940631, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.203259791771327, -52.081686856153496, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.203832220978565, -52.08152862974562, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.204036182632787, -52.08145889231123, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.204088663933735, -52.08145621010222, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.204267577273995, -52.08142268248953, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200109271284255, -52.08253405878013, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200081836900704, -52.08204053232139, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20004008891278, -52.081703915090024, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200004304910685, -52.08131365367836, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.19998522010487, -52.080952896565854, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.19997329209958, -52.08061493822998, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199947050483452, -52.08025015780395, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199948243284314, -52.079881354064405, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.19985214221172, -52.0763409968307, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199802735343372, -52.07717175390973, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199806383594584, -52.0776740876201, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199645355157156, -52.07737770352396, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199840974858205, -52.078162249660814, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199664440021163, -52.07773443732294, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199695452918167, -52.07812872204813, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.19970191501519, -52.07840006734594, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.19971980706619, -52.07868438150152, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199751531816673, -52.079129420480406, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.19976107423998, -52.07949017759291, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199783737492105, -52.07981472488371, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199900632087676, -52.07951029416052, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.19985649842824, -52.07859163757292, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199880979784535, -52.07910259839026, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.19980583325963, -52.08015134211508, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199812990073703, -52.0804611372563, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199855516007556, -52.08128591652838, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199828081561567, -52.08087151523558, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199881866031163, -52.08165258821565, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199882999513434, -52.08206216105134, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.19986531190846, -52.082284286818634, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.199877239925303, -52.08251629789842, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.203446422705206, -52.0816328505294, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200475934889667, -52.08238869721706, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.200237375591417, -52.08247855121906, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20020159165265, -52.08277493531521, "Isada's corp", 'IFC - Campus concórdia', [], {});
new Poste(-27.20015387971642, -52.082003800223426, "Isada's corp", 'IFC - Campus concórdia', [], {});


empresa_logada.__postes[0].adicionarConexcao(empresa_logada.__postes[1]) 
empresa_logada.__postes[1].adicionarConexcao(empresa_logada.__postes[2]) 
empresa_logada.__postes[2].adicionarConexcao(empresa_logada.__postes[3]) 
empresa_logada.__postes[3].adicionarConexcao(empresa_logada.__postes[4]) 


empresa_logada.__postes[0].adicionarEmpresaAssociadas("LaRa's Corp", 'Internet');

empresa_logada.__postes[0].novaNotificacao('Poste caiu devido a chuva intensa', 1);
empresa_logada.__postes[0].novaNotificacao('Ônibus bateu, derrubando-o', 1);
empresa_logada.__postes[0].novaNotificacao('Rompimento nos fios de luz por árvore cair neles', 1);

empresa_logada.__postes[3].novaNotificacao('Poste desconectado', 2);

empresa_logada.__postes[5].novaNotificacao('Carro bateu, rompendo alguns fios', 0);




empresa_logada.__postes[1].novaNotificacao('Notificação teste, ultilizada para mostrar o que acontece se ter muitas notificações.', 1);empresa_logada.__postes[1].novaNotificacao('Notificação teste, ultilizada para mostrar o que acontece se ter muitas notificações.', 1);
empresa_logada.__postes[1].novaNotificacao('Notificação teste, ultilizada para mostrar o que acontece se ter muitas notificações.', 1);empresa_logada.__postes[1].novaNotificacao('Notificação teste, ultilizada para mostrar o que acontece se ter muitas notificações.', 1);
empresa_logada.__postes[1].novaNotificacao('Notificação teste, ultilizada para mostrar o que acontece se ter muitas notificações.', 1);empresa_logada.__postes[1].novaNotificacao('Notificação teste, ultilizada para mostrar o que acontece se ter muitas notificações.', 1);
empresa_logada.__postes[1].novaNotificacao('Notificação teste, ultilizada para mostrar o que acontece se ter muitas notificações.', 2);empresa_logada.__postes[1].novaNotificacao('Notificação teste, ultilizada para mostrar o que acontece se ter muitas notificações.', 2);
empresa_logada.__postes[1].novaNotificacao('Notificação teste, ultilizada para mostrar o que acontece se ter muitas notificações.', 0);empresa_logada.__postes[1].novaNotificacao('Notificação teste, ultilizada para mostrar o que acontece se ter muitas notificações.', 0);