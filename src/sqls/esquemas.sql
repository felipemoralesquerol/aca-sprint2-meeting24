create table bandas_musicales (
 id integer not null auto_increment,
 nombre varchar(100) not null,
 integrantes integer not null,
 fecha_inicio date not null,
 fecha_separación date,
 pais varchar(100) not null,
 primary key (id)
);

