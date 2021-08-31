create table bandas (
 id integer not null auto_increment,
 nombre varchar(100) not null,
 integrantes integer not null,
 fecha_inicio date not null,
 fecha_separación date,
 pais varchar(100) not null,
 primary key (id)
);


create table canciones (
 id integer not null auto_increment,
 nombre varchar(100) not null,
 duracion integer not null,
 album integer not null,
 banda integer not null,
 fecha_publicación date not null,
 primary key (id)
);

ALTER TABLE canciones ADD CONSTRAINT canciones_FK FOREIGN KEY (banda) REFERENCES bandas(id);


create table albumes (
 id integer not null auto_increment,
 nombre varchar(100) not null,
 banda integer not null,
 fecha_publicación date not null,
 primary key (id)
);

ALTER TABLE albumes ADD CONSTRAINT albumes_FK FOREIGN KEY (banda) REFERENCES bandas(id);


