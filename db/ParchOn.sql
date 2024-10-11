-- DDL

CREATE TABLE `Department` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `department` varchar(255) NOT NULL
);

CREATE TABLE `City` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `id_department` integer NOT NULL
);

CREATE TABLE `User` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `birth` date NOT NULL,
  `gender` enum('m','f','o') NOT NULL,
  `phone` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_city` integer NOT NULL,
  `id_role` integer NOT NULL DEFAULT 1
);

CREATE TABLE `Role` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL
);

CREATE TABLE `Place` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `place` varchar(255) NOT NULL
);

CREATE TABLE `Event` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `event` varchar(255) NOT NULL,
  `description` varchar(1000),
  `date` date NOT NULL,
  `time` time NOT NULL,
  `image` varchar(255),
  `capacity` integer NOT NULL,
  `rating` integer,
  `id_user` integer NOT NULL,
  `id_place` integer NOT NULL,
  `id_category` integer NOT NULL
);

CREATE TABLE `Category` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL
);

CREATE TABLE `Ticket` (
  `id_event` integer NOT NULL,
  `id` integer,
  `price` varchar(25),
  `remaining` integer,
  `id_tier` integer NOT NULL,
  PRIMARY KEY (`id_event`, `id`)
);

CREATE TABLE `Tier` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `tier` varchar(255) NOT NULL,
  `description` varchar(500)
);

CREATE TABLE `TicketUser` (
  `id_user` integer NOT NULL,
  `id_event` integer NOT NULL,
  `id_ticket` integer,
  `quantity` integer NOT NULL,
  PRIMARY KEY (`id_user`, `id_event`, `id_ticket`)
);

CREATE TABLE `UserEvent` (
  `id_user` integer NOT NULL,
  `id_event` integer NOT NULL,
  PRIMARY KEY (`id_user`, `id_event`)
);

ALTER TABLE `City` ADD FOREIGN KEY (`id_department`) REFERENCES `Department` (`id`);

ALTER TABLE `User` ADD FOREIGN KEY (`id_city`) REFERENCES `City` (`id`);

ALTER TABLE `User` ADD FOREIGN KEY (`id_role`) REFERENCES `Role` (`id`);

ALTER TABLE `Event` ADD FOREIGN KEY (`id_category`) REFERENCES `Category` (`id`);

ALTER TABLE `Event` ADD FOREIGN KEY (`id_user`) REFERENCES `User` (`id`);

ALTER TABLE `Event` ADD FOREIGN KEY (`id_place`) REFERENCES `Place` (`id`);

ALTER TABLE `Ticket` ADD FOREIGN KEY (`id_event`) REFERENCES `Event` (`id`);

ALTER TABLE `Ticket` ADD FOREIGN KEY (`id_tier`) REFERENCES `Tier` (`id`);

ALTER TABLE `TicketUser` ADD FOREIGN KEY (`id_user`) REFERENCES `User` (`id`);

ALTER TABLE `TicketUser` ADD FOREIGN KEY (`id_event`) REFERENCES `Ticket` (`id_event`);

ALTER TABLE `TicketUser` ADD FOREIGN KEY (`id_event`, `id_ticket`) REFERENCES `Ticket` (`id_event`, `id`);

ALTER TABLE `UserEvent` ADD FOREIGN KEY (`id_event`) REFERENCES `Event` (`id`);

ALTER TABLE `UserEvent` ADD FOREIGN KEY (`id_user`) REFERENCES `User` (`id`);

-- If need a Superuser to create the Trigger
-- Login as root and type:
-- SET GLOBAL log_bin_trust_function_creators = 1;

DELIMITER $$

CREATE TRIGGER `before_ticket_insert` 
BEFORE INSERT ON `Ticket`
FOR EACH ROW 
BEGIN
  DECLARE max_id INT;

  -- Obtener el mayor id para el id_event actual
  SELECT IFNULL(MAX(id), 0) INTO max_id 
  FROM Ticket 
  WHERE id_event = NEW.id_event;

  -- Incrementar en 1 el mayor id para el nuevo ticket
  SET NEW.id = max_id + 1;
END$$

DELIMITER ;

-- DML
INSERT INTO Role (role) VALUES 
('User'),
('Guest'),
('Administrator');

INSERT INTO Department (department) VALUES
('Amazonas'),
('Antioquía'),
('Arauca'),
('Atlántico'),
('Bolívar'),
('Boyacá'),
('Caldas'),
('Caquetá'),
('Casanare'),
('Cauca'),
('Cesar'),
('Chocó'),
('Córdoba'),
('Cundinamarca'),
('Guainía'),
('Guaviare'),
('Huila'),
('La Guajira'),
('Magdalena'),
('Meta'),
('Nariño'),
('Norte de Santander'),
('Putumayo'),
('Quindío'),
('Risaralda'),
('San Andrés y Providencia'),
('Santander'),
('Sucre'),
('Tolima'),
('Valle del Cauca'),
('Vaupés'),
('Vichada');

INSERT INTO City (city, id_department) VALUES
('Leticia', 1),
('Medellín', 2),
('Arauca', 3),
('Barranquilla', 4),
('Cartagena de Indias', 5),
('Tunja', 6),
('Manizales', 7),
('Florencia', 8),
('Yopal', 9),
('Popayán', 10),
('Valledupar', 11),
('Quibdó', 12),
('Montería', 13),
('Bogotá', 14),
('Inírida', 15),
('San José del Guaviare', 16),
('Neiva', 17),
('Riohacha', 18),
('Santa Marta', 19),
('Villavicencio', 20),
('San Juan de Pasto', 21),
('San José de Cúcuta', 22),
('Mocoa', 23),
('Armenia', 24),
('Pereira', 25),
('San Andrés', 26),
('Bucaramanga', 27),
('Sincelejo', 28),
('Ibagué', 29),
('Cali', 30),
('Mitú', 31),
('Puerto Carreño', 32);
