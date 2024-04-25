CREATE DATABASE db_teste;

USE db_teste;

CREATE TABLE tb_tipoMusical (
cd_tipoMusical INT NOT NULL AUTO_INCREMENT,
ds_descricaoTpMusical VARCHAR(30),
CONSTRAINT pk_tipoMusical PRIMARY KEY (cd_tipoMusical)
);
CREATE TABLE tb_musico (
cd_musico INT NOT NULL AUTO_INCREMENT,
cd_cpf CHAR(14),
CONSTRAINT pk_musico PRIMARY KEY (cd_musico)
);
CREATE TABLE tb_estabelecimento (
cd_estabelecimento INT NOT NULL AUTO_INCREMENT,
cd_cnpj CHAR(18),
CONSTRAINT pk_estabelecimento PRIMARY KEY (cd_estabelecimento)
);
CREATE TABLE tb_endereco (
cd_endereco INT NOT NULL AUTO_INCREMENT,
nm_estado VARCHAR(20),
nm_cidade VARCHAR(30),
nm_rua VARCHAR(30),
nr_rua INT,
CONSTRAINT pk_endereco PRIMARY KEY (cd_endereco)
);
CREATE TABLE tb_contato (
cd_contato INT NOT NULL AUTO_INCREMENT,
nr_Celular VARCHAR(13),
CONSTRAINT pk_contato PRIMARY KEY (cd_contato)
);

CREATE TABLE tb_tipoUsuario (
cd_tipoUsuario INT NOT NULL AUTO_INCREMENT,
cd_musico INT NULL,
cd_estabelecimento INT NULL,
CONSTRAINT pk_tipoUsuario PRIMARY KEY (cd_tipoUsuario),
CONSTRAINT fk_musico FOREIGN KEY (cd_musico) REFERENCES tb_musico(cd_musico),
CONSTRAINT fk_estabelecimento FOREIGN KEY (cd_estabelecimento) REFERENCES tb_estabelecimento(cd_estabelecimento)
);
CREATE TABLE tb_usuario (
cd_usuario INT NOT NULL AUTO_INCREMENT,
nm_email VARCHAR(60),
cd_tipoUsuario INT NOT NULL,
nm_usuario VARCHAR(40),
cd_endereco INT NOT NULL,
cd_contato INT NULL ,
cd_senha VARCHAR(16),
cd_tipoMusical INT NOT NULL,
CONSTRAINT pk_usuario PRIMARY KEY (cd_usuario),
CONSTRAINT fk_endereco FOREIGN KEY (cd_endereco) REFERENCES tb_endereco(cd_endereco),
CONSTRAINT fk_contato FOREIGN KEY (cd_contato) REFERENCES tb_contato(cd_contato),
CONSTRAINT fk_tipoUsuario FOREIGN KEY (cd_tipoUsuario) REFERENCES tb_tipoUsuario(cd_tipoUsuario),
CONSTRAINT fk_tipoMusical FOREIGN KEY (cd_tipoMusical) REFERENCES tb_tipoMusical (cd_tipoMusical)
);
-- Inserir tipos musicais
INSERT INTO tb_tipoMusical (ds_descricaoTpMusical) VALUES 
('Rock'), 
('Jazz'), 
('Samba'), 
('MPB');
-- Inserir músicos
INSERT INTO tb_musico (cd_cpf) VALUES 
('123.456.789-00'), 
('987.654.321-00');
-- Inserir estabelecimentos
INSERT INTO tb_estabelecimento (cd_cnpj) VALUES 
('123456789012345678'), 
('987654321098764567');
-- Inserir endereços
INSERT INTO tb_endereco (nm_estado, nm_cidade, nm_rua, nr_rua) VALUES 
('SP', 'São Paulo', 'Rua A', 123), 
('SP', 'Taubaté', 'Rua B', 456),
('RJ', 'Rio de Janeiro', 'Rua C', 789),
('BH', 'Xique-Xique', 'Rua D', 101),
('BH', 'Salvador', 'Rua E', 112);
-- Inserir contatos
INSERT INTO tb_contato (nr_Celular) VALUES 
('1234567890176'), 
('9876543210945'),
('9877359110945'),
('9877359178589'),
('0987359110913');
-- Inserir tipos de usuário
INSERT INTO tb_tipoUsuario (cd_musico, cd_estabelecimento) VALUES 
(1, NULL), 
(NULL, 1),
(NULL, NULL),
(2, NULL),
(NULL, 2);
-- Inserir usuários
INSERT INTO tb_usuario (nm_email, cd_tipoUsuario, nm_usuario, cd_endereco, cd_contato, cd_senha, cd_tipoMusical) VALUES 
('email1@example.com',1, 'Usuário Músico de Rock', 1, 1, 'senha123',1), 
('email2@example.com',2, 'Usuário Estabelecimento de Samba', 2, 2, 'senha456',3),
('email3@example.com',3, 'Usuário comum samba', 3, 3, 'senha789',3),
('email4@example.com',4, 'Usuário Músico de Jazz', 4, 4, 'senha101',2),
('email5@example.com',5, 'Usuário Estabelecimento de MPB', 5, 5, 'senha112',4);