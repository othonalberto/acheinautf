CREATE DATABASE acheinautf;

use acheinautf;

CREATE TABLE `usuarios` (
  `id` int(11) unsigned NOT NULL COMMENT 'R.A.',
  `nome` varchar(255) NOT NULL DEFAULT '',
  `campus` varchar(255) NOT NULL DEFAULT '',
  `contato` text NOT NULL,
  `senha` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `posts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL DEFAULT '',
  `lugar` varchar(255) NOT NULL DEFAULT '',
  `descricao` text NOT NULL,
  `datahorapost` datetime DEFAULT NULL,
  `achado` tinyint(1) DEFAULT '0',
  `foto` mediumtext,
  `donopost` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `donopost` (`donopost`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`donopost`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;