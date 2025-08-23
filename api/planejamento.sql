/* Planejamento do banco de dados*/
	
CREATE TABLE empresa (
    id SERIAL PRIMARY KEY,
    email VARCHAR(40) UNIQUE NOT NULL,
    nome VARCHAR(50) NOT NULL,
    CNPJ VARCHAR(18) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    code INTEGER
);

CREATE TABLE funcionario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    code INTEGER,
    empresa_id INTEGER,
    FOREIGN KEY (empresa_id) REFERENCES empresa(id)
);

CREATE TABLE postes (
    id SERIAL PRIMARY KEY,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    empresa_id INTEGER,
    status VARCHAR(20) CHECK (status IN ('ativo', 'inativo', 'manutencao')),
    FOREIGN KEY (empresa_id) REFERENCES empresa(id)
);