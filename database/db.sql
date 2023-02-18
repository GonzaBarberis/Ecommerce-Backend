-- to create a new database
CREATE DATABASE leomattiolimates;

-- to use database
use leomattiolimates;

-- creating a new table
CREATE TABLE productos (
  id INT(6) AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  categ VARCHAR(100) NOT NULL,
  precio INT(10) NOT NULL,
  imagen VARCHAR(100) NOT NULL
);

-- to show all tables
show tables;

-- to describe table
describe leomattiolimat

-- INSERT INTO productos (nombre, categ, precio, imagen)
-- VALUES ('Mate Camionero Basico', 'Mates', 5000, '/img/Productos/Mate1.jpg'),
-- ('Mate Torpedo Basico', 'Mates', 7000, '/img/Productos/Mate2.jpg'),
-- ('Mate Pomelo Basico', 'Mates', 5600, '/img/Productos/Mate3.jpg'),
-- ('Mate Pezuña Basico', 'Mates', 6200, '/img/Productos/Mate4.jpg'),
-- ('Mate Cuero Trenzado', 'Mates', 9000, '/img/Productos/Mate5.jpg'),
-- ('Mate Guampa', 'Mates', 8400, '/img/Productos/Mate6.jpg'),
-- ('Mate Silicona', 'Mates', 2000, '/img/Productos/Mate7.jpg'),
-- ('Termo Stanley Green', 'Termos', 14000, '/img/Productos/Termo1.jpg'),
-- ('Termo Stanley Red', 'Termos', 12000, '/img/Productos/Termo2.jpg'),
-- ('Termo Lumilagro', 'Termos', 5000, '/img/Productos/Termo3.jpg'),
-- ('Bombilla Pico de Loro', 'Bombillas', 1200, '/img/Productos/Bombilla1.jpg'),
-- ('Bombilla Chata', 'Bombillas', 1500, '/img/Productos/Bombilla2.jpg'),
-- ('Bombilla Resorte Fijo', 'Bombillas', 1800, '/img/Productos/Bombilla3.jpg');


CREATE TABLE users (
  id INT(6) AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL
);
