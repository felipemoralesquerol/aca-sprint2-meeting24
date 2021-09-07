create table bandas (
    id integer not null auto_increment,
    nombre varchar(100) not null,
    integrantes integer not null,
    fecha_inicio date not null,
    fecha_separación date,
    pais_id integer not null,
    primary key (id)
);
drop table if exists canciones;
create table canciones (
    id integer not null auto_increment,
    nombre varchar(100) not null,
    duracion integer not null,
    album_id integer not null,
    banda_id integer not null,
    fecha_publicacion date not null,
    primary key (id)
);
drop table if exists albumes;
create table albumes (
    id integer not null auto_increment,
    nombre varchar(100) not null,
    banda_id integer not null,
    /*--bandas*/
    fecha_publicación date not null,
    primary key (id)
);
/* Alters tables*/
ALTER TABLE bandas
ADD CONSTRAINT bandas_pais_FK FOREIGN KEY (pais_id) REFERENCES paises(id);
ALTER TABLE canciones
ADD CONSTRAINT canciones_FK FOREIGN KEY (banda_id) REFERENCES bandas(id);
ALTER TABLE canciones
ADD CONSTRAINT canciones_alb_FK FOREIGN KEY (album_id) REFERENCES albumes(id);
ALTER TABLE albumes
ADD CONSTRAINT albumes_FK FOREIGN KEY (banda_id) REFERENCES bandas(id);