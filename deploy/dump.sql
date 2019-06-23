SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `author` varchar(250) NOT NULL,
  `text` text NOT NULL,
  `section` varchar(250) NOT NULL,
  `type` enum('post','comment') NOT NULL DEFAULT 'post',
  `parent` int(11) NOT NULL DEFAULT '0',
  `createDate` int(20) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `bumped` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `pvd_chat` (
  `id` int(11) NOT NULL,
  `text` text CHARACTER SET utf8mb4 NOT NULL,
  `author` varchar(250) CHARACTER SET utf8mb4 NOT NULL,
  `createDate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `pvd_targets` (
  `id` int(11) NOT NULL,
  `link` varchar(250) CHARACTER SET utf8mb4 NOT NULL,
  `author` varchar(250) CHARACTER SET utf8mb4 NOT NULL,
  `createDate` int(11) NOT NULL,
  `enabled` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `address` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `admin` varchar(250) NOT NULL,
  `createDate` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `code` varchar(250) NOT NULL,
  `login` varchar(250) NOT NULL,
  `expires` int(11) NOT NULL,
  `createDate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `joinDate` int(20) NOT NULL,
  `ip` varchar(250) NOT NULL,
  `ugroup` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author` (`author`),
  ADD KEY `section` (`section`);

ALTER TABLE `pvd_chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author` (`author`);

ALTER TABLE `pvd_targets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author` (`author`);

ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `address_2` (`address`),
  ADD UNIQUE KEY `address_3` (`address`),
  ADD KEY `address` (`address`),
  ADD KEY `admin` (`admin`);

ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `login` (`login`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `login` (`login`),
  ADD KEY `ip` (`ip`),
  ADD KEY `ugroup` (`ugroup`);

ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pvd_chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `pvd_targets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
