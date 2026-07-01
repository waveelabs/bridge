-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Hoszt: localhost
-- Létrehozás ideje: 2026. Júl 01. 11:36
-- Szerver verzió: 5.6.13
-- PHP verzió: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Adatbázis: `bridgepal`
--
CREATE DATABASE IF NOT EXISTS `bridgepal` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `bridgepal`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `boards`
--

CREATE TABLE IF NOT EXISTS `boards` (
  `board_id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `dealer` enum('N','S','E','W') NOT NULL,
  `vulnerability_ns` enum('M','B') NOT NULL,
  `vulnerability_ew` enum('M','B') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `board_results`
--

CREATE TABLE IF NOT EXISTS `board_results` (
  `id` int(11) NOT NULL,
  `board_id` int(11) NOT NULL,
  `round_number` int(11) NOT NULL,
  `pair_ns_id` int(11) NOT NULL,
  `pair_ew_id` int(11) NOT NULL,
  `contract_amount` int(11) NOT NULL,
  `contract_suite` enum('S','D','C','H','NT','4pass') NOT NULL,
  `declarer` enum('N','S','E','W') NOT NULL,
  `doubled` int(11) NOT NULL,
  `tricks_result` int(11) NOT NULL,
  `ns_score` int(11) NOT NULL,
  `ew_score` int(11) NOT NULL,
  `confirmed_by_table` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `club`
--

CREATE TABLE IF NOT EXISTS `club` (
  `club_id` int(11) NOT NULL,
  `club_name` int(11) NOT NULL,
  `board_count` int(11) NOT NULL,
  `access_pin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pairs`
--

CREATE TABLE IF NOT EXISTS `pairs` (
  `pair_number` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `player_names` varchar(255) NOT NULL,
  `start_line` enum('ns','ew') NOT NULL,
  `result` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tournaments`
--

CREATE TABLE IF NOT EXISTS `tournaments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `played_on` date NOT NULL,
  `table_count` int(11) NOT NULL,
  `board_count` int(11) NOT NULL,
  `status` enum('draft','ready','in_progress','finished') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
