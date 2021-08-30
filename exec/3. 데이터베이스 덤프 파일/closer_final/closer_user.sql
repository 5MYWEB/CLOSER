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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` varchar(20) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `addr` varchar(100) NOT NULL,
  `homeAlone` int DEFAULT NULL,
  `intro` varchar(100) DEFAULT NULL,
  `profileImg` varchar(200) DEFAULT NULL,
  `profilePriv` tinyint NOT NULL DEFAULT '1',
  `addrPriv` tinyint NOT NULL DEFAULT '1',
  `phone` varchar(15) DEFAULT NULL,
  `chattoken` text,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('busan','자취지망생','busan','busan@ssafy.com','인천광역시 연수구 연수동',0,NULL,' ',1,1,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYnVzYW4ifQ.y5QTqD2o6THpctXDIfA4CtEVykdO6TbedJfYJfimZ8c'),('daejeon','동구밭과수원길','daejeon','daejeon@ssafy.com','인천광역시 연수구 청학동',2017,NULL,'https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/daejeon/daejeon_profile.jpg',1,1,'01056781234','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGFlamVvbiJ9.mxrU-ejy0tRZyxoxD3O6ePove8-pJ3BmCL3B-7JQjIg'),('gumi','마이구미','gumi','gumi@ssafy.com','인천광역시 연수구 동춘동',2016,'마이구미 사랑해','https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/gumi/gumi_profile.jpg',1,1,'01098765432','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZ3VtaSJ9.WXzZJfBLd-xaXeZJZ9ST5iUs9sy-3YtEeze-TFTTi9M'),('gwangju','해결사','gwangju','gwangju@ssafy.com','인천광역시 연수구 옥련동',0,NULL,' ',1,1,'01056781234','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiIGd3YW5nanUifQ.W8HZxPyav_rmy1KtI_K-oFM35HYh03kctnwBYknI4Xc'),('hoyoung','세스코','hoyoung','hoyoung@ssafy.com','인천광역시 연수구 청학동',2018,'벌레? 내가 다 죽여주지','https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/hoyoung/hoyoung_profile.jpg',1,1,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaG95b3VuZyJ9.iV1LTUXzv5Kmv264-z8sBilsdVpHM75HlwbPGw0AqLo'),('hyein','커피홀릭','hyein','hyein@ssafy.com','인천광역시 연수구 청학동',2018,'커피러버의 SNS','https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/hyein/hyein_profile.jpg',1,1,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaHllaW4ifQ.sjtG2zMTqbNYsIDiJH5R-qhci-5LHHEEO2rpBVpapF0'),('jiyoon','디자인장인','jiyoon','jiyoon@ssafy.com','인천광역시 연수구 청학동',2021,NULL,' ',1,1,'01098765432','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaml5b29uIn0.wAgM-CJhCAL_nW0x2M__n5Ga3Gq8sMhPPz1tph92PuM'),('minji','백종원비켜','minji','minji@ssafy.com','인천광역시 연수구 선학동',0,'요리 레시피 내가 접수한다','https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/minji/minji_profile.jpg',1,1,'01056781234','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibWluamkifQ.Oi0mVpKxvzzjgjQK4lt4PZmaBNYxZIpf49NhqKd4K9k'),('minsu','민수르','minsu','minsu@ssafy.com','인천광역시 연수구 송도동',0,'부자가 되고 싶다','https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/minsu/minsu_profile.jpg',1,1,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibWluc3UifQ.lxrO8szvM1YlpdT7lhm660QAakadoWbODAci5G2yMLs'),('seoul','감자덕후','seoul','seoul@ssafy.com','인천광역시 연수구 송도동',2019,'감자감자감자감자','https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/seoul/seoul_profile.jpg',1,1,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic2VvdWwifQ.SUSTbB_aX_Zcj4G511UWXRu6H5gGAf0KELBZt8xbpaE'),('ssafy','싸피최고','ssafy','ssafy@ssafy.com','인천광역시 연수구 옥련동',0,'','https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/ssafy/ssafy_profile.jpg',1,1,'01056781234','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic3NhZnkifQ.nM7HAbiG25CLUi20wW7zE4JgS40Sr0nXOvPOjDMAzfA'),('sungjae','최고의개발자','sungjae','sungjae@ssafy.com','인천광역시 연수구 연수동',2013,NULL,' ',1,1,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic3VuZ2phZSJ9.Y0__n5g3YD137nrIVnMNlM9vUkg7cuO0GW1yb5pIiAM'),('temp','쉼표','temp','temp@ssafy.com','서울특별시 강남구 역삼동',2019,'커피를 통해 행복을 얻는 자취러','https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/temp/temp_profile.jpg',1,1,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidGVtcCJ9.mpRj6gewMVaUD15uieL_zJRXxmTNHssKpwU4hJVQdTM'),('temp1','카페사랑나라사랑','temp1','temp1@ssafy.com','서울특별시 강남구 삼성동',0,NULL,' ',1,1,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidGVtcDEifQ.-_hNQWLySxOUchAyJL17pl87blt0c2OkjPNm2chH_dc'),('temp2','바다','temp2','temp2@ssafy.com','부산광역시 해운대구 송정동',2018,NULL,' ',1,1,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidGVtcDIifQ.DYJaonpgXcEfrCfa8fylB6bY_26sYhbQI--t2ZpJwoU'),('yongmi','자취고수는맛없어','yongmi','yongmi@ssafy,com','인천광역시 연수구 청학동',2012,NULL,' ',1,1,'01012345678','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoieW9uZ21pIn0.s7L3zXX2aoBmCIPM-Vr6GU-y_S8kDPTUlNS1tw04NHY'),('youngcheol','Honey팁','youngcheol','youngcheol@ssafy.com','인천광역시 연수구 청학동',2019,NULL,'https://photo-album-hy.s3.ap-northeast-2.amazonaws.com/youngcheol/youngcheol_profile.jpg',1,1,'01098765432','eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoieW91bmdjaGVvbCJ9.ly6c8Re68Xod_ahX7GJP1Wsuif645pIH1Mm0FkIQXTE');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-19 17:20:41
