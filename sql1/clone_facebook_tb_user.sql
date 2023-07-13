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
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user` (
  `user_id` int NOT NULL,
  `user_firstName` varchar(45) NOT NULL,
  `user_lastName` varchar(45) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `user_birthday_year` varchar(9) NOT NULL,
  `user_birthday_month` varchar(3) NOT NULL,
  `user_birthday_day` varchar(3) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_gender` varchar(2) NOT NULL,
  `user_phone` varchar(45) DEFAULT NULL,
  `user_avatar` varchar(255) DEFAULT NULL,
  `tb_about` text,
  `user_cover` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (9352,'Gia ','Quân','giaquan@gmail.com','1997','1','1','$2b$10$qXYvcchS3Z5C4wHq79YCu.TEVeMxZviY9KLFVE4Fddoykg.tmmmRa','2',NULL,'https://kenh14cdn.com/203336854389633024/2021/11/4/2460465803146666285565083663233461872109477n-16360450989771612584981.jpg',NULL,NULL),(13734,'Lê','Mạnh','manh.ld2402@gmail.com','1999','02','24','$2b$10$ofZ/x0Cbn6ADnpFLmUnS1.B.aFYpryENEJa.KG8pKpF/6gT1Bua5C','1',NULL,'https://nguoinoitieng.tv/images/nnt/107/0/bj2b.jpg',NULL,NULL),(28705,'Linh','Ngu','linhngu@gmail.com','2007','4','8','$2b$10$s9L.fxOsbym/ALg7tD4BDu5TrIrL5OVSYHFl0BYndi.eYUsx3APvS','2',NULL,'https://anhgaisexy.net/wp-content/uploads/2022/08/anh-cua-kha-ngan-001.jpg',NULL,NULL),(37120,'Trường ','Con','truongcon@gmail.com','1997','4','8','$2b$10$LC3/VBqfSvE94tCB1q7aS.BJWMK2.cpoN45foEY8xOqU/ShhuJKy2','2',NULL,'https://images.unsplash.com/photo-1599032909756-5deb82fea3b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhdXR5JTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',NULL,NULL),(44667,'Tiến ','Dog','tiendog@gmail.com','2007','7','10','$2b$10$KQAI80OcdVeKzD1EGUygJuajjBZjzmNDV/8cr2j56145sMnb/ybMK','2',NULL,'https://i.pinimg.com/550x/57/14/96/571496d0e562669c7e3b39373cc3b4af.jpg',NULL,NULL),(83218,'Hữu','Dương','huuduong@gmail.com','1997','4','8','$2b$10$XH5mxkz1tJcDLNaCoLG.u.17gNtelYWvyjzeSWQes8sffIv016b6C','2',NULL,'https://netstorage-tuko.akamaized.net/images/5f2634a166e1f995.jpg?imwidth=900',NULL,NULL),(83972,'Minh','Quân','minhduong@gmail.com','1997','4','8','$2b$10$3nebqsDw4ibZqDfCjeeG7unRi.ARQMwn5kskrtKfkSQhoil3HX86G','2',NULL,'https://icdn.dantri.com.vn/thumb_w/680/2023/07/04/lisa-6-1688440130770.jpg',NULL,NULL),(88232,'Vợ của','Lía','quynhanh@gmail.com','2014','2','2','$2b$10$02chgMuA9Oi9./6mOhMhauo/cdvLKYyORiOevmopyzMeirE5KdsiK','1',NULL,'https://icdn.dantri.com.vn/thumb_w/680/2023/07/04/lisa-6-1688440130770.jpg',NULL,NULL);
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
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
