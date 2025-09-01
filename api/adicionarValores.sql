-- Criação das empresas
INSERT INTO empresas (nome, codigo, cnpj, telefone, email, senha) VALUES ('Isadas Corp', '0413', 0, 0, 'drag@isada.com', '1234');
INSERT INTO empresas (nome, codigo, cnpj, telefone, email, senha) VALUES ('LaRas Corp', '1379', 0, 0, 'lara@jung.com', '1234');
INSERT INTO empresas (nome, codigo, cnpj, telefone, email, senha) VALUES ('Sperb"s Corp', '0359', 0, 0, 'guilherme@sperb.com', 'asdf');
INSERT INTO empresas (nome, codigo, cnpj, telefone, email, senha) VALUES ('Veriatos"s Corp', '4121', 0, 0, 'danimar@veriato.com', '1234');


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