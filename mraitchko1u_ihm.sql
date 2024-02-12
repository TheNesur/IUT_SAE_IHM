-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 11 fév. 2024 à 23:56
-- Version du serveur : 11.4.0-MariaDB
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mraitchko1u_ihm`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `num_cli` int(11) NOT NULL AUTO_INCREMENT,
  `civ_cli` varchar(4) NOT NULL,
  `nom_cli` varchar(20) NOT NULL,
  `prenom_cli` varchar(20) NOT NULL,
  `tel_cli` varchar(16) DEFAULT NULL,
  `mel_cli` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`num_cli`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`num_cli`, `civ_cli`, `nom_cli`, `prenom_cli`, `tel_cli`, `mel_cli`) VALUES
(1, 'M.', 'CHAPLIN', 'Mathieu', '0606060606', 'mat@iut.com'),
(2, 'M.', 'STAUB', 'Fabien', '0607070707', 'fab@iut.com'),
(3, 'Mme', 'RENAULT', 'Megane', '0612345678', 'megane@me.com'),
(4, 'M.', 'SAXO', 'Faune', '0612211221', 'saxofaune@gmail.com'),
(5, 'M.', 'BROS', 'Mario', '0632132121', 'mario@bros.com'),
(6, 'M.', 'GIRARD', 'Jean', '0678451241', 'girard@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `contrat`
--

DROP TABLE IF EXISTS `contrat`;
CREATE TABLE IF NOT EXISTS `contrat` (
  `num_cont` int(11) NOT NULL AUTO_INCREMENT,
  `num_cli` int(11) NOT NULL,
  `date_cont` date NOT NULL,
  `adr_site` varchar(50) NOT NULL,
  `ville_site` varchar(30) NOT NULL,
  `cp_site` varchar(5) NOT NULL,
  `tel_site` varchar(16) NOT NULL,
  PRIMARY KEY (`num_cont`),
  KEY `fk_contrat_cl` (`num_cli`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `contrat`
--

INSERT INTO `contrat` (`num_cont`, `num_cli`, `date_cont`, `adr_site`, `ville_site`, `cp_site`, `tel_site`) VALUES
(1, 1, '2014-03-24', '1 rue de Mars', 'Metz', '57000', '0363524137'),
(2, 2, '2008-06-16', '2 rue des Bois', 'Thionville', '57100', '036545698'),
(3, 1, '2011-10-12', '10 rue des Lisières', 'Nancy', '54000', '0332321232'),
(4, 3, '2013-07-04', '3 rue de Metz', 'Metz', '57000', '0365456964'),
(5, 5, '2015-10-09', '10 rue du Champignon', 'Boulay', '57220', '0198745632'),
(6, 1, '2014-11-27', '2c rue de la GrandeForme', 'Paris', '75006', '0189745212'),
(7, 4, '2014-03-09', '5 allée du Logis des Vacances', 'Epinal', '88000', '0321548596'),
(8, 6, '2012-05-02', '2 rue des Rois', 'Nancy', '57100', '0352415689'),
(9, 3, '2010-12-15', '46 avenue de la Mer', 'Nice', '06000', '0465456964');

-- --------------------------------------------------------

--
-- Structure de la table `intervention`
--

DROP TABLE IF EXISTS `intervention`;
CREATE TABLE IF NOT EXISTS `intervention` (
  `num_interv` int(11) NOT NULL AUTO_INCREMENT,
  `num_cont` int(11) NOT NULL,
  `date_interv` date DEFAULT NULL,
  `objet_interv` varchar(300) DEFAULT NULL,
  `obs_interv` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`num_interv`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `intervention`
--

INSERT INTO `intervention` (`num_interv`, `num_cont`, `date_interv`, `objet_interv`, `obs_interv`) VALUES
(8, 8, '2018-05-20', 'panne diverse', ''),
(7, 3, '2021-09-15', 'installation', 'aucun problème'),
(6, 1, '2019-09-10', 'panne diverse', ''),
(5, 5, '2021-11-02', 'installation', 'RAS'),
(4, 1, '2020-05-26', 'dégradations volontaires', ''),
(3, 3, '2019-05-24', 'mise à  jour', ''),
(2, 2, '2020-05-22', 'changement matériel', ''),
(1, 1, '2019-05-20', 'mise à  jour', ''),
(10, 8, '2020-05-20', 'dégradations volontaires', '');

-- --------------------------------------------------------

--
-- Structure de la table `prestation`
--

DROP TABLE IF EXISTS `prestation`;
CREATE TABLE IF NOT EXISTS `prestation` (
  `code_prest` varchar(6) NOT NULL,
  `lib_prest` varchar(50) NOT NULL,
  `tarif_ht` decimal(7,2) NOT NULL,
  PRIMARY KEY (`code_prest`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `prestation`
--

INSERT INTO `prestation` (`code_prest`, `lib_prest`, `tarif_ht`) VALUES
('CENTR', 'centrale', 180.00),
('DGCOD', 'clavier digicode', 50.00),
('DPLAC', 'forfait déplacement avec 1ère heure MO', 92.00),
('DTCFM', 'détecteur de fumée', 30.00),
('DTCOV', 'détecteur d\'ouverture', 28.00),
('DTCPR', 'détecteur de présence', 25.00),
('MO', 'main d\'oeuvre 1/2 heure', 75.00),
('TLCDE', 'télécommande', 30.00);

-- --------------------------------------------------------

--
-- Structure de la table `utilisation`
--

DROP TABLE IF EXISTS `utilisation`;
CREATE TABLE IF NOT EXISTS `utilisation` (
  `num_interv` int(11) NOT NULL,
  `code_prest` varchar(6) NOT NULL,
  `qte_prest` int(11) NOT NULL,
  PRIMARY KEY (`num_interv`,`code_prest`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `utilisation`
--

INSERT INTO `utilisation` (`num_interv`, `code_prest`, `qte_prest`) VALUES
(1, 'CENTR', 1),
(1, 'DTCOV', 2),
(1, 'MO', 1),
(2, 'CENTR', 2),
(2, 'DPLAC', 1),
(2, 'DTCFM', 3),
(2, 'MO', 3),
(3, 'MO', 1),
(4, 'DGCOD', 1),
(5, 'DTCPR', 1),
(6, 'CENTR', 1),
(7, 'DGCOD', 1),
(7, 'DPLAC', 1),
(8, 'CENTR', 1),
(8, 'DPLAC', 1),
(8, 'DTCFM', 2),
(4, 'MO', 3),
(4, 'DTCPR', 5),
(10, 'DPLAC', 1),
(10, 'DTCOV', 1),
(10, 'DTCPR', 1),
(10, 'MO', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
