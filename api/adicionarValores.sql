-- Criação das empresas
INSERT INTO empresas (nome, codigo, cnpj, telefone, email, senha) VALUES ("Isada's Corp", '0413', 0, 0, 'drag@isada.com', '1234');
INSERT INTO empresas (nome, codigo, cnpj, telefone, email, senha) VALUES ('LaRa"s Corp', '1379', 0, 0, 'B@g');
INSERT INTO empresas (nome, codigo, cnpj, telefone, email, senha) VALUES ('Sperb"s Corp', '0359', 0, 0, 'S@g');
INSERT INTO empresas (nome, codigo, cnpj, telefone, email, senha) VALUES ('Veriatos"s Corp', '4121', 0, 0, 'V@g');

INSERT INTO postes ( coord_lat, coord_lng, empresa_dona, regiao, status) VALUES (1, -27.200476, -52.082809, 1, 1, 1);
INSERT INTO postes ( coord_lat, coord_lng, empresa_dona, regiao, status) VALUES (2, -27.2007753911968, -52.08286800859833, 1, 1, 1);
INSERT INTO postes ( coord_lat, coord_lng, empresa_dona, regiao, status) VALUES (3, -27.201086459985614, -52.08293655069477, 1, 1, 1);
INSERT INTO postes ( coord_lat, coord_lng, empresa_dona, regiao, status) VALUES (4, -27.20140254853843, -52.08299958260662, 1, 1, 1);

-- Criar variáveis para pegar a "empresa logada" e então só usar ela para a alteração dos postes, junto de verificações

-- empresa_logada.__postes[0].adicionarConexcao(empresa_logada.__postes[1]) 
-- empresa_logada.__postes[1].adicionarConexcao(empresa_logada.__postes[2]) 
-- empresa_logada.__postes[2].adicionarConexcao(empresa_logada.__postes[3]) 
-- empresa_logada.__postes[3].adicionarConexcao(empresa_logada.__postes[4])
-- empresa_logada.__postes[0].adicionarEmpresaAssociadas("LaRa's Corp", 'Internet');


-- criando notificações para postes na empresa 1
INSERT INTO notificacao ( posteAssociado, descricao, status) VALUES (1, 1, 'Ola mundo', 1);
INSERT INTO notificacao ( posteAssociado, descricao, status) VALUES (2, 1, 'Ola mundo denovo!', 1);
INSERT INTO notificacao ( posteAssociado, descricao, status) VALUES (3, 1, 'Ola mundo denovo denovo!', 1);

INTO notificacao ( posteAssociado, descricao, status) VALUES (4, 4, 'Teste no 4', 1);
INTO notificacao ( posteAssociado, descricao, status) VALUES (5, 6, 'Onibus bateu forte, ix', 1);


-- Outras empresas