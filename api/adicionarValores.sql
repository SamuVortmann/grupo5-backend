-- Criação das empresas
INSERT INTO empresas (nome, codigo, cnpj, telefone, email, senha) VALUES ('Isadas Corp', '0413', 0, 0, 'drag@isada.com', '1234');
INSERT INTO empresas (nome, codigo, cnpj, telefone, email, senha) VALUES ('LaRas Corp', '1379', 0, 0, 'lara@jung.com', '1234');
INSERT INTO empresas (nome, codigo, cnpj, telefone, email, senha) VALUES ('Sperb"s Corp', '0359', 0, 0, 'guilherme@siteinformativo.com', 'asdf');
INSERT INTO empresas (nome, codigo, cnpj, telefone, email, senha) VALUES ('Veriatos"s Corp', '4121', 0, 0, 'danimar@veriato.com', '1234');


-- Criar variáveis para pegar a "empresa logada" e então só usar ela para a alteração dos postes, junto de verificações

-- empresa_logada.__postes[0].adicionarConexcao(empresa_logada.__postes[1]) 
-- empresa_logada.__postes[1].adicionarConexcao(empresa_logada.__postes[2]) 
-- empresa_logada.__postes[2].adicionarConexcao(empresa_logada.__postes[3]) 
-- empresa_logada.__postes[3].adicionarConexcao(empresa_logada.__postes[4])
-- empresa_logada.__postes[0].adicionarEmpresaAssociadas("LaRa's Corp", 'Internet');

-- Criar postes
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.432, -52.423, 1, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (0, 0, 2, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (1, 1, 2, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.432, -51.423, 1, 1);

-- criando notificações para postes na empresa 1
INSERT INTO notificacoes ( id_poste_associado, descricao, status) VALUES (1, 'Ola mundo', 1);
INSERT INTO notificacoes ( id_poste_associado, descricao, status) VALUES (2, 'Ola mundo denovo!', 1);
INSERT INTO notificacoes ( id_poste_associado, descricao, status) VALUES (3, 'Ola mundo denovo denovo!', 1);
INSERT INTO notificacoes ( id_poste_associado, descricao, status) VALUES (1, 'Teste no 4', 1);
INSERT INTO notificacoes ( id_poste_associado, descricao, status) VALUES (1, 'Onibus bateu forte, ix', 1);

-- Associação do poste com empresas
INSERT INTO empresas_associadas_postes (id_poste, id_empresa) VALUES (1, 3), (1, 2);








-- Postes em piratuba -> Kayron
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44771991263555, -51.85768676736925, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.447562814205423, -51.8580381367502, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44744856066115, -51.85833720305536, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44730217313463, -51.85865504482363, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.447171142614323, -51.85901897110987, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.447017613841783, -51.859639902496816, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44693192327117, -51.85995372095156, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44683195085466, -51.860453952932836, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446764112377572, -51.860401649857046, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44662209455182, -51.859956853983476, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446539974128548, -51.85951563060053, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.4464483324246, -51.85908245384462, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446753708969844, -51.861001513555365, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44673942717852, -51.861476264551, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446730728968447, -51.86185394238625, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44690211035569, -51.86144222330246, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446919962568213, -51.86202158044968, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.447144900198474, -51.862448051683046, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446386607929384, -51.86203869647338, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446072835188975, -51.861874540677555, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.4462394569794, -51.86237611376334, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446375134537135, -51.86263762914229, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446426311116454, -51.862719436517246, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446645185042318, -51.86300697662657, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44677015076038, -51.863214847825226, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44688083456385, -51.86342137791937, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446983187229534, -51.86359169819182, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.447061736885292, -51.86378347613638, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446014743306097, -51.86158384035043, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445975468112444, -51.8613089139264, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445926671640258, -51.86107153842858, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445895727524757, -51.86077515433244, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44583502942684, -51.86048949907235, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44577104753656, -51.86010458582302, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445727825207417, -51.85969690563753, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44568140894724, -51.859343107942124, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445614759924126, -51.85893541217186, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445547002413367, -51.85870942125576, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44551962867896, -51.8585002089526, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445380379577077, -51.858207848169975, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.4454755926572, -51.85798388371723, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445571995817097, -51.85803350458401, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445549382737767, -51.85817834387081, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44644566558957, -51.85873173690011, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44639686932536, -51.85849436140229, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446339741964238, -51.85823418712785, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44631355858049, -51.857853313447734, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44604644780071, -51.85801941779641, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445820317771375, -51.85801941779641, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445663216636028, -51.858113295111934, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44560727905653, -51.85768610724939, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446420617396964, -51.8575310003065, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446609851528684, -51.85729094259967, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446731246838493, -51.8570629548334, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44692048043736, -51.85691141002406, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.447040685259246, -51.856657941272154, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.448216798611398, -51.85477491612566, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.448010337016832, -51.8549928898208, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.447738860760357, -51.855184667765364, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.447494822409116, -51.85546361750291, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.447282977071527, -51.855530672728285, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.447093979190072, -51.85579334115175, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446896414855523, -51.85585369085459, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446686908105484, -51.85606520872377, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44645720893184, -51.85613360505365, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446301845323372, -51.85639758081404, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445662514034666, -51.857355745952994, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445841038035926, -51.85710093609658, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445881503436052, -51.85689977042046, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.446088590839608, -51.8567442022976, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.44517743630372, -51.858119465819776, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445073891795342, -51.858198590985715, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.445120308311115, -51.85866529535431, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.444743024783797, -51.858209319821775, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.444484727279495, -51.858162381164014, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.444305010907826, -51.858288444987714, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.432, -52.423, 3, 1);
INSERT INTO postes (lat, lng, id_empresa_dona, status) VALUES (-27.432, -51.423, 3, 1);