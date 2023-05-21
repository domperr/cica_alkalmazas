-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Ápr 14. 13:19
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `cica_db`
--
CREATE DATABASE IF NOT EXISTS `cica_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cica_db`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cica`
--

CREATE TABLE `cica` (
  `cica_id` int(11) NOT NULL,
  `cica_nev` varchar(100) NOT NULL,
  `cica_kep` varchar(100) NOT NULL,
  `cica_datum` date NOT NULL,
  `cica_allapot` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `cica`
--

INSERT INTO `cica` (`cica_id`, `cica_nev`, `cica_kep`, `cica_datum`, `cica_allapot`) VALUES
(1, 'Dezső', 'talalt1.jpg', '2022-11-03', 0),
(2, 'Boldi', 'talalt2.jpg', '2022-11-04', 1),
(3, 'Gombi', 'talalt3.jpg', '2022-06-14', 2),
(4, '555', '555', '2022-12-07', 0),
(5, 'proba1', '1.png', '2022-03-11', 0),
(6, 'cicak1', '1.png', '2022-03-11', 0),
(7, 'cicak1', '1.png', '2022-03-11', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `erdekel`
--

CREATE TABLE `erdekel` (
  `erdekel_id` int(11) NOT NULL,
  `erdekel_cica_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `erdekel`
--

INSERT INTO `erdekel` (`erdekel_id`, `erdekel_cica_id`) VALUES
(1, 1),
(2, 2),
(3, 1),
(4, 2),
(5, 1),
(6, 2),
(7, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_roles`
--

CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `uzenetek`
--

CREATE TABLE `uzenetek` (
  `uzenetek_id` int(11) NOT NULL,
  `uzenetek_cica` int(11) NOT NULL,
  `uzenetek_nev` varchar(255) NOT NULL,
  `uzenetek_megjegyzes` varchar(255) NOT NULL,
  `uzenetek_datum` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `uzenetek`
--

INSERT INTO `uzenetek` (`uzenetek_id`, `uzenetek_cica`, `uzenetek_nev`, `uzenetek_megjegyzes`, `uzenetek_datum`) VALUES
(1, 1, 'Kovács József', 'Megtaláltam a macskát!', '2023-03-16'),
(2, 2, 'Nagy Dezső', 'Itt van még egy macska!', '2023-03-13'),
(3, 3, 'Kiss Pista', 'Találtam egy fehér macskát!', '2023-03-01');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cica`
--
ALTER TABLE `cica`
  ADD PRIMARY KEY (`cica_id`);

--
-- A tábla indexei `erdekel`
--
ALTER TABLE `erdekel`
  ADD PRIMARY KEY (`erdekel_id`);

--
-- A tábla indexei `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`roleId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- A tábla indexei `uzenetek`
--
ALTER TABLE `uzenetek`
  ADD PRIMARY KEY (`uzenetek_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cica`
--
ALTER TABLE `cica`
  MODIFY `cica_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `erdekel`
--
ALTER TABLE `erdekel`
  MODIFY `erdekel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `uzenetek`
--
ALTER TABLE `uzenetek`
  MODIFY `uzenetek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
