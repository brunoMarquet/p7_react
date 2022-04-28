-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : ven. 08 avr. 2022 à 13:40
-- Version du serveur :  10.4.13-MariaDB
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupo1`
--

-- --------------------------------------------------------

--
-- Structure de la table `commented`
--

DROP TABLE IF EXISTS `commented`;
CREATE TABLE IF NOT EXISTS `commented` (
  `Id_com` int(11) NOT NULL AUTO_INCREMENT,
  `User_com` int(11) NOT NULL,
  `Post_com` int(11) NOT NULL,
  `Text_com` varchar(500) NOT NULL,
  `Visuel_com` varchar(500) NOT NULL,
  `Date_com` date DEFAULT NULL,
  PRIMARY KEY (`Id_com`),
  KEY `User_com` (`User_com`),
  KEY `Post_com` (`Post_com`)
) ENGINE=MyISAM AUTO_INCREMENT=112 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `commented`
--

INSERT INTO `commented` (`Id_com`, `User_com`, `Post_com`, `Text_com`, `Visuel_com`, `Date_com`) VALUES
(101, 13, 102, ' the development build is not optimized', '', NULL),
(102, 19, 102, 'Les changements à opérer sont majeurs', '', NULL),
(103, 18, 102, 'Son  résumé à l’intention des décideurs ?', '', NULL),
(104, 12, 113, 'pardon des precisions', '', NULL),
(105, 16, 113, 'quoi svp', '', NULL),
(106, 16, 113, 'warum ?', '', NULL),
(107, 19, 108, 'des precisions', '', NULL),
(108, 16, 108, 'comment ?', '', NULL),
(109, 11, 108, 't est sur ?', '', NULL),
(110, 10, 112, 'uuu', '', NULL),
(111, 13, 107, 'Les changements à opérer sont mineurs', '', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `liked`
--

DROP TABLE IF EXISTS `liked`;
CREATE TABLE IF NOT EXISTS `liked` (
  `Id_like` int(11) NOT NULL AUTO_INCREMENT,
  `User_like` int(11) NOT NULL,
  `Post_like` int(11) NOT NULL,
  `Date_like` date DEFAULT NULL,
  PRIMARY KEY (`Id_like`),
  KEY `User_like` (`User_like`),
  KEY `Post_like` (`Post_like`)
) ENGINE=MyISAM AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `liked`
--

INSERT INTO `liked` (`Id_like`, `User_like`, `Post_like`, `Date_like`) VALUES
(101, 15, 102, NULL),
(102, 16, 102, NULL),
(103, 17, 102, NULL),
(104, 14, 103, NULL),
(105, 16, 103, NULL),
(106, 19, 103, NULL),
(107, 16, 104, NULL),
(108, 19, 104, NULL),
(109, 19, 107, NULL),
(110, 15, 107, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `persons`
--

DROP TABLE IF EXISTS `persons`;
CREATE TABLE IF NOT EXISTS `persons` (
  `Id_user` int(11) NOT NULL,
  `Pseudo` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `PassWord` varchar(255) DEFAULT NULL,
  `Visuel_user` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `isActif` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id_user`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `persons`
--

INSERT INTO `persons` (`Id_user`, `Pseudo`, `Email`, `PassWord`, `Visuel_user`, `isAdmin`, `isActif`) VALUES
(10, 'Léa', 'Léa@mannia.fr', '100', NULL, NULL, NULL),
(11, 'Sophie', 'Sophie@mannia.fr', '111', NULL, NULL, NULL),
(12, 'Marie', 'Marie@mannia.fr', '122', NULL, NULL, NULL),
(13, 'Lucie', 'Lucie@mannia.fr', '133', NULL, NULL, NULL),
(14, 'Maria2', 'Maria@mannia.fr', '144', NULL, NULL, NULL),
(15, 'Laure', 'Laure@mannia.fr', '155', NULL, NULL, NULL),
(16, 'Anne', 'Anne@mannia.fr', '166', NULL, NULL, NULL),
(17, 'Amy', 'Amy@mannia.fr', '177', NULL, NULL, NULL),
(18, 'Aurore', 'Aurore@mannia.fr', '188', NULL, 1, NULL),
(19, 'Rose', 'Rosee@mannia.fr', '199', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `Post_id` int(11) NOT NULL AUTO_INCREMENT,
  `Post_user` int(11) NOT NULL,
  `Titre` varchar(500) NOT NULL,
  `Contenu` varchar(500) DEFAULT NULL,
  `Post_visuel` varchar(300) DEFAULT NULL,
  `Date_post` datetime DEFAULT NULL,
  `Likes` int(11) DEFAULT 0,
  `comment` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Post_id`),
  KEY `AuthorId` (`Post_user`)
) ENGINE=MyISAM AUTO_INCREMENT=125 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`Post_id`, `Post_user`, `Titre`, `Contenu`, `Post_visuel`, `Date_post`, `Likes`, `comment`) VALUES
(102, 14, 'Météo. En Bretagne !!', ' plusieurs records de froid sont tombés dans la nuit de dimanche à lundi', NULL, '2022-04-03 13:19:42', 0, 0),
(103, 11, 'EMétéo. En Bretagne ?, ', ' Il a fait jusqu’à – 5,2 °C à Pleucadeuc (Morbihan), – 4,2 °C à Fougères (Ille-et-Vilaine). Les températures remontent à partir de ce lundi.', NULL, '2022-04-03 13:19:42', 0, 0),
(104, 10, 'Elon Musk', 'Le PDG de Tesla et de SpaceX, Elon Musk, est désormais le premier actionnaire du réseau social Twitter. Des documents publiés le 4 avril par le régulateur de la Bourse américaine montrent que M. Musk a acquis 9,2 % des actions du réseau social', NULL, '2022-04-03 12:59:42', 0, 0),
(105, 10, 'Elon Musk2', ' Elon Musk, est nés le 4 avril par le régulateur du réseau social,', NULL, '2022-04-03 13:19:42', 0, 0),
(106, 11, 'GUERRE EN UKRAINE 1 : LA COLLECTION MOROZOV VA-T-ELLE POUVOIR RENTRER EN RUSSIE ?', 'Alors que l’exposition de la collection Morozov à la Fondation Louis Vuitton s’est terminée le dimanche 3 avril, la question du retour des œuvres en Russie interroge. Explications.Depuis le 22 septembre dernier, environ 200 œuvres  de Van Gogh, Gauguin, Renoir, Cézanne, Matisse, Bonnard, Monet ou encore Manet...,', NULL, '2022-04-03 13:29:42', 0, 0),
(107, 11, 'GUERRE EN UKRAINE 1 : LA COLLECTION MOROZOV?', 'Un tableau intitulé «Piotr Kontchalovski – Autoportrait» (1912) pose particulièrement problème puisqu’il provient de la collection particulière de Petr Aven, un oligarque russe proche de Vladimir Poutine qui figure sur la liste des personnalités russes.. ', NULL, '2022-04-03 13:29:42', 0, 0),
(108, 13, 'PRÉSIDENTIELLE 2022 : VOICI COMMENT CONNAÎTRE L ADRESSE DE SON BUREAU DE VOTE', ' grâce à un site Internet du service public. En cliquant ICI, vous pouvez en effet «interroger [votre situation] électorale». Cela permet à tout un chacun de', NULL, '2022-04-03 13:23:42', 0, 0),
(109, 15, 'PRÉSIDENTIELLE 2022  ..:', 'Attention également à respecter les consignes sanitaires mises en place pour éviter au maximum la propagation du coronavirus,', NULL, '2022-04-03 13:49:22', 0, 0),
(110, 15, 'PRÉSIDENTIELLE 2022 etc... :', ' Porter un masque, respecter les distances entre chaque personne, apporter son propre stylo pour émarger... ', NULL, '2022-04-03 13:49:22', 0, 0),
(111, 16, 'La PRÉSIDENTIELLE 2022 :', ' vous ne savez peut-être pas quel est votre bureau de vote. Pour y remédier, vous pouvez vérifier sur votre carte électorale.', NULL, '2022-04-03 13:49:22', 0, 0),
(112, 15, 'Programme TV Mystic River (Arte)', 'En mai 2003, Clint Eastwood présente au Festival de Cannes son vingt-quatrième long métrage : Mystic River. Le film repart bredouille,', NULL, '2022-04-03 13:49:12', 0, 0),
(113, 15, 'Mystic River', 'En fait, Mystic River est avant tout une tragédie. Une histoire d’une noirceur abyssale. Les personnages sont traversés de douleurs et habités d’une tristesse infinie', NULL, '2022-04-03 13:22:22', 0, 0),
(114, 15, 'Mystic River et puis quoi ?', 'Tim Robbins semble littéralement flirter avec la folie, Sean Penn fait preuve d’une intensité folle. A la limite de l’excès, il est un inoubliable,', NULL, '2022-04-03 13:22:22', 0, 0),
(115, 17, 'Boulevard de la mort', 'Face au redoutable meurtrier (le génial Kurt Russell), Tarantino fait défiler une bande de supernanas libérées – dans les actes comme dans leur torrent de paroles – qui s’offriront une vengeance délectable en forme d’apothéose sanglante.', NULL, '2022-04-03 13:22:22', 0, 0),
(116, 15, 'Boulevard de la mort un avis', 'Un cascadeur \"serial killer\" (Kurt Russell) pourchasse des jeunes femmes délurées au volant de son bolide... Entre amour inconditionnel et savoureuse dérision, un pastiche jubilatoire du cinéma d’exploitation des seventies par le maestro Quentin Tarantino. ', NULL, '2022-04-03 13:22:22', 0, 0),
(117, 18, 'Boulevard de la mort Girl power : ', 'Pour son sixième opus, passablement boudé par les spectateurs, entre les succès de \"Kill Bill\" et d’\"Inglourious Basterds\", Quentin Tarantino pousse à son paroxysme l’hommage au cinéma bis qui traverse sa flamboyante filmographie', NULL, '2022-04-03 13:22:22', 0, 0),
(118, 18, ' Boulevard de la mort Girl power l', ' Quatorze mois plus tard, le psychopathe, désormais dans le Tennessee et au volant d’une Dodge, se lance à la poursuite de Lee, Abernathy, Kim et Zoë, qui toutes travaillent dans le cinéma, dont l’une comme cascadeuse', NULL, '2022-04-03 13:21:22', 0, 0),
(119, 18, 'Boulevard de la mort Girl power 3: ', ' À Austin, après avoir explosé la tête d’une de ses victimes sur le tableau de bord, Mike prend en chasse trois copines, Arlene, Shanna et la DJ \"Jungle\" Julia, star d’une radio locale', NULL, '2022-04-03 13:22:42', 0, 0),
(120, 10, 'Caché le film ', 'Qui menace le célèbre journaliste littéraire Georges Laurent en lui envoyant des vidéos anonymes ? Un polar diabolique de Michael Haneke, primé à Cannes, et servi par Daniel Auteuil et Juliette Binoche.', NULL, '2022-04-03 13:19:42', 0, 0),
(121, 10, 'Caché le pitch', 'Michael Haneke fait durer le suspense jusqu\'à la dernière minute. D\'aucuns affirment que la réponse est dans le dernier plan', NULL, '2022-04-03 13:19:42', 0, 0),
(122, 11, 'Caché alors ?', 'Arrêt sur image C est un film splendide et vertigineux, riche de réflexions sur les blessures d\'enfance à jamais béantes, la solitude face aux démons intérieurs, les ravages du secret dans un couple, la manière dont la culpabilité ronge un individu et la revanche du refoulé\", écrivait Jean-Luc Douin', NULL, '2022-04-03 13:19:42', 0, 0),
(123, 13, 'PRÉSIDENTIELLE 2022 : COMMENT VOTER', '  Dans la plupart des villes, les bureaux ferment leurs portes à 18h. Dans les villes moyennes, la fermeture est généralement repoussée d une heure', NULL, '2022-04-03 13:23:42', 0, 0),
(124, 18, 'yuyuyyu', NULL, NULL, NULL, 0, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
