DROP database if exists db_LocalTune;

CREATE DATABASE db_LocalTune;


USE db_LocalTune;


CREATE TABLE tb_tipoMusical (
cd_tipoMusical INT NOT NULL AUTO_INCREMENT,
ds_descricaoTpMusical VARCHAR(30),

CONSTRAINT pk_tipoMusical PRIMARY KEY (cd_tipoMusical)
);

CREATE TABLE tb_endereco (
cd_endereco INT NOT NULL AUTO_INCREMENT,
nm_endereco VARCHAR(200),


CONSTRAINT pk_endereco PRIMARY KEY (cd_endereco)
);

CREATE TABLE tb_contato (
cd_contato INT NOT NULL AUTO_INCREMENT,
nr_Celular VARCHAR(15),


CONSTRAINT pk_contato PRIMARY KEY (cd_contato)
);


CREATE TABLE tb_tipoUsuario (
cd_tipoUsuario INT NOT NULL AUTO_INCREMENT,
ds_descricaoTpUsu VARCHAR(30),

CONSTRAINT pk_tipoUsuario PRIMARY KEY (cd_tipoUsuario)
);

CREATE TABLE tb_regsLegal (
cd_regsLegal INT NOT NULL AUTO_INCREMENT,
cd_cnpj CHAR(18) UNIQUE,
cd_cpf CHAR(14) UNIQUE,

CONSTRAINT pk_cd_regsLegal PRIMARY KEY (cd_regsLegal)
);

CREATE TABLE tb_usuario (
cd_usuario INT NOT NULL AUTO_INCREMENT,
nm_email VARCHAR(60) UNIQUE,
nm_usuario VARCHAR(40),
cd_tipoUsuario INT,
cd_endereco INT NULL,
cd_contato INT NULL,
cd_senha VARCHAR(200),
cd_tipoMusical INT,
cd_regsLegal INT NULL,


CONSTRAINT pk_usuario PRIMARY KEY (cd_usuario),
CONSTRAINT fk_endereco FOREIGN KEY (cd_endereco) REFERENCES tb_endereco(cd_endereco),
CONSTRAINT fk_contato FOREIGN KEY (cd_contato) REFERENCES tb_contato(cd_contato),
CONSTRAINT fk_regsLegal FOREIGN KEY (cd_regsLegal) REFERENCES tb_regsLegal (cd_regsLegal),
CONSTRAINT fk_tipoUsuario FOREIGN KEY (cd_tipoUsuario) REFERENCES tb_tipoUsuario (cd_tipoUsuario)
);

CREATE TABLE tb_usuTipoMus (
cd_usuTipoMus INT NOT NULL AUTO_INCREMENT,
cd_usuario INT,
cd_tipoMusical INT,

CONSTRAINT pk_usuTipoMus PRIMARY KEY (cd_usuTipoMus),
CONSTRAINT fk_usuario FOREIGN KEY (cd_usuario) REFERENCES tb_usuario (cd_usuario),
CONSTRAINT fk_tipoMusical FOREIGN KEY (cd_tipoMusical) REFERENCES tb_tipoMusical (cd_tipoMusical)
);

CREATE TABLE tb_banda (
cd_banda INT NOT NULL AUTO_INCREMENT, 

CONSTRAINT pk_banda PRIMARY KEY (cd_banda)
);

CREATE TABLE tb_bandaMembros (
cd_banda INT,
cd_usuTipoMus INT,

CONSTRAINT fk_banda FOREIGN KEY (cd_banda) REFERENCES tb_banda (cd_banda),
CONSTRAINT fk_usuTipoMus FOREIGN KEY (cd_usuTipoMus) REFERENCES tb_usuTipoMus (cd_usuTipoMus)
);

-- Inserir tipos musicais
INSERT INTO tb_tipoMusical (ds_descricaoTpMusical) VALUES 
('Rock'), 
('Jazz'), 
('Samba'), 
('MPB');


-- Inserir endereços
INSERT INTO tb_endereco (nm_endereco) VALUES 
('SP, São Paulo, Rua A 123'), 
('SP, Taubaté, Rua B 456'),
('RJ, Rio de Janeiro, Rua C 789'),
('BA, Xique-Xique, Rua D 101'),
('BA, Salvador, Rua E 112'),
('SP, São Vicente, Rua ABC 342'),
('PA, Curitiba, Rua LMN 687'),
('RJ, Mesquita, Rua Z 967');

-- Inserir contatos
INSERT INTO tb_contato (nr_Celular) VALUES 
('(13) 99681-8041'), 
('(11) 99845-4567'),
('(15) 99123-9801'),
('(13) 99146-8496'),
('(09) 99909-9086'),
('(14) 99456-8496'),
('(10) 98906-8496'),
('(14) 99456-8496');

-- Inserir tipos de usuário
INSERT INTO tb_tipoUsuario (ds_descricaoTpUsu) VALUES 
('Usuário Comum'),
('Músico'),
('Estabelecimento'),
('Banda');

INSERT INTO tb_regsLegal (cd_cpf, cd_cnpj) VALUES 
('123.456.789-00', NULL), 
(NULL, '65.967.457/0097-17'),
(NULL, NULL),
('457.005.786-99', NULL),
(NULL, '20.052.006/7622-24'),
(NULL, NULL),
(NULL, NULL),
('987.654.321-10', NULL);

-- Inserir usuários
INSERT INTO tb_usuario (nm_email, cd_regsLegal, cd_tipoUsuario, nm_usuario, cd_endereco, cd_contato, cd_senha, cd_tipoMusical) VALUES 
('curstcoba050494@gmail.com', 1, 2, 'Curst Coba', 1, 1, '$2a$10$zF.HklYT1cV9W57gvKGI2.HPoDJDuGbO.Z/34lu9cZ5SukXY1R5GG',1), -- senha123
('aratuca.entrprise@outlook.com', 2, 3, 'Araras e tucanos', 2, 2, '$2a$10$/dDa2FY64XbBukJidCuunuW1ltCRjRfE0NGQaePPKI3n5rJjX8UWa',3), -- senha456
('meusambaminhavida123@hotmail.com', 3, 1, 'AdorSamba1213', 3, 3, '$10$FPxFrum4/Sdoa1Pz/yfYv.6ND1IjAx2dkiSuJOzKxLZtDfysS8bIS',3), -- senha789
('sebastian@gmail.com', 4, 2, 'Chicken on a Stick', 4, 4, '$2a$10$MtuQrSod9cjs0dOvqjajR.Zyvi26T8emQJiaSy/DqQOftd5u50RYa',2), -- senha101
('escapeidoasilo456@gmail.com', 5, 3, 'Casa de Repouso', 5, 5, '$2a$10$W9cBlXYp/AtGstvCckEj0eRP19GINalNgyL3rqQvKqj2TmYlvtmWe',4), -- senha112
('marseelo@gmail.com', 6, 1, 'Guaraviton', 6, 6, '$2a$10$Ni4Ew2F88K4ChJh85Y4ii.oKjEdsRVMaGO7u52b6Ug4CPqWRiYhEO', 3), -- pãodequeijomtbom
('chicobuarquemeuamor@gmail.com', 7, 1, 'RodrigoMPB', 7, 7, '$2a$10$jubJ0nmtpnV1zp3MN3jNSe46KtodgPvgTewk0ppHT3ttWRKV9lf2e', 4), -- mpb>vida
('eusoudorocknroll@gmail.com', 8, 2, 'velvetime', 8, 8, '$10$ZTA0iWrJETbyvDn3rAlHAuL7tP9EwQ9kimpOdUFia1Xa5megBb.La', 1); -- missperfection

