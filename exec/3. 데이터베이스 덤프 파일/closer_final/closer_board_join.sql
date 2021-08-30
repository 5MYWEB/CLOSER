-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: closer
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
-- Table structure for table `board_join`
--

DROP TABLE IF EXISTS `board_join`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_join` (
  `join_pk` int NOT NULL AUTO_INCREMENT,
  `board_pk` int NOT NULL,
  `userId` varchar(20) NOT NULL,
  PRIMARY KEY (`join_pk`),
  KEY `userId` (`userId`),
  KEY `board_pk` (`board_pk`),
  CONSTRAINT `board_join_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `board_join_ibfk_2` FOREIGN KEY (`board_pk`) REFERENCES `board` (`board_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_join`
--

LOCK TABLES `board_join` WRITE;
/*!40000 ALTER TABLE `board_join` DISABLE KEYS */;
INSERT INTO `board_join` VALUES (1,20,'hyein'),(2,20,'hoyoung'),(3,23,'daejeon'),(4,24,'gumi'),(5,35,'minji'),(6,39,'sungjae'),(7,48,'hyein'),(8,67,'gumi'),(9,72,'sungjae'),(10,25,'gumi'),(11,28,'hyein'),(12,33,'yongmi'),(13,41,'gwangju'),(14,57,'minsu'),(15,62,'sungjae'),(16,64,'busan'),(17,69,'gwangju'),(18,74,'ssafy'),(19,26,'ssafy'),(20,31,'busan'),(21,38,'hoyoung'),(22,42,'seoul'),(23,44,'minsu'),(24,46,'jiyoon'),(25,49,'hyein'),(26,65,'daejeon'),(27,71,'jiyoon'),(28,63,'yongmi'),(29,76,'temp'),(30,20,'ssafy');
/*!40000 ALTER TABLE `board_join` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-19 17:20:40
