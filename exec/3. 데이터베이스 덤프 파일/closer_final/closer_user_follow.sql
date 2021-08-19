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
-- Table structure for table `user_follow`
--

DROP TABLE IF EXISTS `user_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_follow` (
  `follow_pk` int NOT NULL AUTO_INCREMENT,
  `activeUser` varchar(20) NOT NULL,
  `passiveUser` varchar(20) NOT NULL,
  PRIMARY KEY (`follow_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_follow`
--

LOCK TABLES `user_follow` WRITE;
/*!40000 ALTER TABLE `user_follow` DISABLE KEYS */;
INSERT INTO `user_follow` VALUES (1,'hyein','ssafy'),(2,'hyein','minji'),(3,'hyein','hoyoung'),(4,'busan','hyein'),(5,'yongmi','hyein'),(6,'minsu','hyein'),(7,'minsu','youngcheol'),(8,'minsu','gumi'),(9,'minsu','ssafy'),(10,'jiyoon','hyein'),(11,'hyein','daejeon'),(12,'hyein','gwangju'),(13,'minsu','jiyoon'),(14,'busan','minsu'),(15,'minji','minsu'),(16,'youngcheol','minsu'),(17,'jiyoon','minsu'),(18,'youngcheol','hyein'),(19,'ssafy','gumi'),(20,'ssafy','hoyoung'),(21,'ssafy','minsu'),(22,'ssafy','hyein'),(23,'ssafy','youngcheol'),(24,'ssafy','temp2'),(25,'ssafy','temp'),(26,'ssafy','minji'),(27,'yongmi','ssafy'),(28,'minji','ssafy'),(29,'youngcheol','ssafy'),(30,'jiyoon','ssafy'),(31,'busan','ssafy');
/*!40000 ALTER TABLE `user_follow` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-19 17:20:42
