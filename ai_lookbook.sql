-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 09, 2026 alle 01:33
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ai_lookbook`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `evaluations`
--

CREATE TABLE `evaluations` (
  `id` int(11) NOT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `item_condition` varchar(50) DEFAULT NULL,
  `suggested_price` decimal(10,2) DEFAULT NULL,
  `min_price` decimal(10,2) DEFAULT NULL,
  `max_price` decimal(10,2) DEFAULT NULL,
  `image_analysis` text DEFAULT NULL,
  `motivation` text DEFAULT NULL,
  `selling_tips` text DEFAULT NULL,
  `listing_description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `evaluations`
--

INSERT INTO `evaluations` (`id`, `brand`, `category`, `item_condition`, `suggested_price`, `min_price`, `max_price`, `image_analysis`, `motivation`, `selling_tips`, `listing_description`, `created_at`) VALUES
(2, 'Nike', 'shoes', 'nuovo', 45.00, 35.00, 55.00, 'Nella foto è visibile una scarpa sportiva bianca con dettagli neri e logo Nike.', 'Il brand Nike e lo stato nuovo giustificano un prezzo più alto. Tuttavia, la presenza di una leggera usura sulla suola potrebbe influenzare il valore.', '[\"Evidenzia il fatto che sono nuove e mai indossate.\",\"Utilizza foto chiare e ben illuminate per mostrare ogni angolo delle scarpe.\"]', 'Nike Air Force 1, nuove e mai indossate. Ottime per ogni occasione. Disponibili in taglia [specificare taglia].', '2026-06-07 10:47:30'),
(3, 'Nike', 'shoes', 'usato', 30.00, 25.00, 35.00, 'Nella foto è visibile una scarpa sportiva bianca del brand Nike, modello Air Force 1. Appare in buone condizioni, con qualche segno di usura.', 'Il prezzo suggerito è superiore a quello indicato dall\'utente a causa dell\'alta domanda per questo modello e dello stato generale delle scarpe, che sembra buono nonostante siano usate.', '[\"Includi foto dettagliate per mostrare eventuali segni di usura.\",\"Specificare la taglia e fornire dettagli sul comfort e l\'uso.\"]', 'Nike Air Force 1 bianche usate, in buone condizioni. Perfette per un look casual e versatile. Disponibile in taglia [specifica taglia].', '2026-06-08 22:35:23');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `evaluations`
--
ALTER TABLE `evaluations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `evaluations`
--
ALTER TABLE `evaluations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
