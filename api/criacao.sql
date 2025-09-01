CREATE DATABASE visux;

-- \c visux;

CREATE TABLE empresas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    codigo CHAR(4) NOT NULL,
    cnpj VARCHAR(20) NOT NULL,
    telefone VARCHAR(30),
    email VARCHAR(150) NOT NULL,
    senha VARCHAR(150) NOT NULL
);

-- Possível remoção
CREATE TABLE funcionarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    -- endereco ??? 
    id_empresa_dona INT NOT NULL,

    CONSTRAINT fk_empresa_dona FOREIGN KEY (id_empresa_dona) REFERENCES empresas(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE postes (
    id SERIAL PRIMARY KEY,
    lat VARCHAR(30) NOT NULL, -- Isso deu problema usando DECIMAL(2, 20),
    lng VARCHAR(30) NOT NULL, -- Vou usar VARCHAR e no código {{converte}} para FLOAT
    id_empresa_dona INT NOT NULL,
    -- conexcoes
    -- empresas_associadas
    status INT NOT NULL,

    CONSTRAINT fk_empresa_dona FOREIGN KEY (id_empresa_dona) REFERENCES empresas(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE notificacoes (
    id SERIAL PRIMARY KEY,
    id_poste_associado INT NOT NULL,
    descricao VARCHAR(250) NULL,
    status INT NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_poste_associado FOREIGN KEY (id_poste_associado) REFERENCES postes(id) ON DELETE CASCADE ON UPDATE CASCADE
);

