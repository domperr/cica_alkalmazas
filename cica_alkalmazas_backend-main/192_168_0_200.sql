-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 192.168.0.200
-- Létrehozás ideje: 2023. Ápr 14. 10:26
-- Kiszolgáló verziója: 10.5.17-MariaDB-log
-- PHP verzió: 8.0.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `cica_datum` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `cica`
--

INSERT INTO `cica` (`cica_id`, `cica_nev`, `cica_kep`, `cica_datum`) VALUES
(1, '-', 'talalt1.jpg', '2022-11-03'),
(2, 'Boldi', 'talalt2.jpg', '2022-11-04'),
(3, 'Gombi', 'talalt3.jpg', '2022-06-14'),
(4, '555', '555', '2022-12-07'),
(5, 'proba1', '1.png', '2022-03-11'),
(6, 'cicak1', '1.png', '2022-03-11'),
(7, 'cicak1', '1.png', '2022-03-11');

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
-- AUTO_INCREMENT a táblához `uzenetek`
--
ALTER TABLE `uzenetek`
  MODIFY `uzenetek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
