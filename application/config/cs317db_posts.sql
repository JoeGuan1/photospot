-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cs317db
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` mediumtext NOT NULL,
  `photopath` varchar(2048) NOT NULL,
  `thumbnail` varchar(2048) NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `post author_idx` (`fk_userid`),
  CONSTRAINT `post author` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'test','test','public\\images\\uploads\\d1230d735ad3b94a6ecfcf7413cc854f8afce4fd610a.png','public/images/uploads/thumbnail-d1230d735ad3b94a6ecfcf7413cc854f8afce4fd610a.png',1,'2021-12-12 06:38:58',3),(2,'test','test','public\\images\\uploads\\3ea25f6ebe3cf050cbe5b8a05be706e5800de01b969b.png','public/images/uploads/thumbnail-3ea25f6ebe3cf050cbe5b8a05be706e5800de01b969b.png',1,'2021-12-12 06:39:18',3),(3,'test','test','public\\images\\uploads\\7c661d935aea4ca4feaee7edf28e4d9ec93f73add737.png','public/images/uploads/thumbnail-7c661d935aea4ca4feaee7edf28e4d9ec93f73add737.png',1,'2021-12-12 06:39:32',3),(4,'test','test','public\\images\\uploads\\49da1738ec5719e2ff3c58cbeefc721b6db65d620c1e.png','public/images/uploads/thumbnail-49da1738ec5719e2ff3c58cbeefc721b6db65d620c1e.png',1,'2021-12-12 06:40:42',3),(5,'test','test','public\\images\\uploads\\8dab9b55231ec21de879db3bca1036fa07befda496a5.png','public/images/uploads/thumbnail-8dab9b55231ec21de879db3bca1036fa07befda496a5.png',1,'2021-12-12 06:41:01',3),(6,'test','test','public\\images\\uploads\\14678c6d7f4fc61ce056e760acb7f2a1706f9faf0aac.png','public/images/uploads/thumbnail-14678c6d7f4fc61ce056e760acb7f2a1706f9faf0aac.png',1,'2021-12-12 06:41:24',3),(7,'test1','test1','public\\images\\uploads\\6eab998aaa4bc316b56907df49063b64abb76f597faa.png','public/images/uploads/thumbnail-6eab998aaa4bc316b56907df49063b64abb76f597faa.png',1,'2021-12-12 06:42:37',3),(8,'test3','test3','public\\images\\uploads\\4ad7fc581898736c25826baea304a108a879a163caaa.png','public/images/uploads/thumbnail-4ad7fc581898736c25826baea304a108a879a163caaa.png',1,'2021-12-12 06:43:16',3),(9,'other',':)','public\\images\\uploads\\421551452ad398dcd1b792bc91947835a1f961c5cc5f.png','public/images/uploads/thumbnail-421551452ad398dcd1b792bc91947835a1f961c5cc5f.png',1,'2021-12-12 09:19:25',3),(10,'mole','reset','public\\images\\uploads\\5a6d9dd0dacd8be1e84bb7afbf0c9aa8ccb4acc9a69d.png','public/images/uploads/thumbnail-5a6d9dd0dacd8be1e84bb7afbf0c9aa8ccb4acc9a69d.png',1,'2021-12-12 09:19:45',3),(11,'vil','wern','public\\images\\uploads\\4a2952a6886b4b5adbfa55ff343cb4d0b95d61d1fc8d.png','public/images/uploads/thumbnail-4a2952a6886b4b5adbfa55ff343cb4d0b95d61d1fc8d.png',1,'2021-12-12 20:23:08',3),(12,'refact','hi','public\\images\\uploads\\9f3fe39805680b908449e9ca2a7b8116647773d256ad.png','public/images/uploads/thumbnail-9f3fe39805680b908449e9ca2a7b8116647773d256ad.png',1,'2021-12-12 20:29:25',3),(13,'refact','vil','public\\images\\uploads\\68aa489dd4c48b74e675c9263dd5169a2661c3f3a3b5.png','public/images/uploads/thumbnail-68aa489dd4c48b74e675c9263dd5169a2661c3f3a3b5.png',1,'2021-12-12 20:31:03',3);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-12 23:10:56
