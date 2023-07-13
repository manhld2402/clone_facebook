-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: clone_facebook
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `tb_post`
--

DROP TABLE IF EXISTS `tb_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_authorId` int NOT NULL,
  `post_active` int NOT NULL DEFAULT '0',
  `post_content` longtext,
  `post_urlPicture` varchar(256) DEFAULT NULL,
  `post_time` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `user_post_contraint_idx` (`post_authorId`),
  CONSTRAINT `user_post_contraint` FOREIGN KEY (`post_authorId`) REFERENCES `tb_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=90939 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_post`
--

LOCK TABLES `tb_post` WRITE;
/*!40000 ALTER TABLE `tb_post` DISABLE KEYS */;
INSERT INTO `tb_post` VALUES (2255,13734,3,'Lê Mạnh active=3 part 4','http://localhost:8000/assits/file-1688920380914-212591042.png','2023-07-09 23:33:01'),(2628,88232,3,'Quỳnh Anh active = 2 part 3','http://localhost:8000/assits/file-1688954222158-803171032.jpeg','2023-07-10 08:57:02'),(4691,88232,2,'Quỳnh Anh active = 1 part 2','http://localhost:8000/assits/file-1688954244302-825496442.jpeg','2023-07-10 08:57:24'),(6427,88232,3,'Quỳnh Anh active = 3 part 3','http://localhost:8000/assits/file-1688954210299-250432279.jpeg','2023-07-10 08:56:50'),(7817,88232,3,'Quỳnh Anh active = 3 part 2','http://localhost:8000/assits/file-1688954207675-425692900.jpeg','2023-07-10 08:56:47'),(9470,13734,2,'Lê Mạnh active=2 part4','http://localhost:8000/assits/file-1688920573600-815325458.png','2023-07-09 23:36:13'),(13338,88232,2,'Quỳnh Anh active = 1 part 1','http://localhost:8000/assits/file-1688954246005-483859735.jpeg','2023-07-10 08:57:26'),(13439,88232,2,'Quỳnh Anh active = 2 part 2','http://localhost:8000/assits/file-1688954233758-735141982.jpeg','2023-07-10 08:57:13'),(17710,88232,3,'Quỳnh Anh active = 2 part 4','http://localhost:8000/assits/file-1688954224104-852685698.jpeg','2023-07-10 08:57:04'),(22163,88232,2,'Quỳnh Anh active = 2 part 1','http://localhost:8000/assits/file-1688954232025-427013231.jpeg','2023-07-10 08:57:12'),(25493,88232,2,'Quỳnh Anh active = 2 part 4','http://localhost:8000/assits/file-1688954237862-329946176.jpeg','2023-07-10 08:57:17'),(26083,13734,3,'Lê Mạnh active=3 part 2','http://localhost:8000/assits/file-1688920368038-827620294.png','2023-07-09 23:32:48'),(33011,88232,2,'Quỳnh Anh active = 1 part 4','http://localhost:8000/assits/file-1688954240073-763437132.jpeg','2023-07-10 08:57:20'),(44488,13734,2,'Lê Mạnh active=2 part3','http://localhost:8000/assits/file-1688920570454-35314712.png','2023-07-09 23:36:10'),(46628,88232,2,'Quỳnh Anh active = 2 part 3','http://localhost:8000/assits/file-1688954235743-13954951.jpeg','2023-07-10 08:57:15'),(47477,13734,1,'Lê Mạnh active=1 part4','http://localhost:8000/assits/file-1688920594363-546289624.png','2023-07-09 23:36:34'),(51852,13734,3,'Lê Mạnh active=3 part 3','http://localhost:8000/assits/file-1688920374295-355797623.png','2023-07-09 23:32:54'),(56091,88232,3,'Quỳnh Anh active = 2 part 2','http://localhost:8000/assits/file-1688954220082-699359322.jpeg','2023-07-10 08:57:00'),(56527,13734,1,'Lê Mạnh active=1 part3','http://localhost:8000/assits/file-1688920592071-598286917.png','2023-07-09 23:36:32'),(60633,13734,1,'Lê Mạnh active=1 part1','http://localhost:8000/assits/file-1688920587546-212823152.png','2023-07-09 23:36:27'),(67754,88232,3,'Quỳnh Anh active = 2 part 1','http://localhost:8000/assits/file-1688954218193-179118371.jpeg','2023-07-10 08:56:58'),(69221,88232,2,'Quỳnh Anh active = 1 part 3','http://localhost:8000/assits/file-1688954242351-425597546.jpeg','2023-07-10 08:57:22'),(70175,88232,3,'Quỳnh Anh active = 3 part 4','http://localhost:8000/assits/file-1688954213287-327707769.jpeg','2023-07-10 08:56:53'),(72977,13734,2,'Lê Mạnh active=2 part2','http://localhost:8000/assits/file-1688920568144-960344627.png','2023-07-09 23:36:08'),(73237,13734,2,'Lê Mạnh active=2 part1','http://localhost:8000/assits/file-1688920555233-225130205.png','2023-07-09 23:35:55'),(73946,13734,2,'Lê Mạnh active=2 part1','http://localhost:8000/assits/file-1688920563924-840838949.png','2023-07-09 23:36:04'),(74156,13734,1,'Lê Mạnh active=1 part2','http://localhost:8000/assits/file-1688920589494-309367881.png','2023-07-09 23:36:29'),(85151,88232,3,'Quỳnh Anh active = 3 part 1','http://localhost:8000/assits/file-1688954203381-409803073.jpeg','2023-07-10 08:56:43'),(90938,13734,3,'Lê Mạnh active=3 part 1','http://localhost:8000/assits/file-1688920360312-13747849.png','2023-07-09 23:32:40');
/*!40000 ALTER TABLE `tb_post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-10 11:16:36
