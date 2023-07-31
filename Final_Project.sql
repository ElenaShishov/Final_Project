CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id_followers` int NOT NULL AUTO_INCREMENT,
  `vacation_code` int NOT NULL,
  `user_code` int NOT NULL,
  PRIMARY KEY (`id_followers`),
  KEY `fk_follower_user` (`user_code`),
  KEY `fk_follower_vacation` (`vacation_code`),
  CONSTRAINT `fk_follower_user` FOREIGN KEY (`user_code`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_follower_vacation` FOREIGN KEY (`vacation_code`) REFERENCES `holidays` (`holidayCode`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (1,10,1),(2,11,1),(6,1,2),(7,3,2),(14,10,2),(22,1,6),(27,2,15),(28,3,15),(29,4,16),(30,11,1),(31,11,6),(50,6,6),(77,9,6),(78,2,6),(79,19,6),(83,7,7),(85,7,6),(86,8,7),(87,12,7),(88,5,7),(92,6,7);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holidays`
--

DROP TABLE IF EXISTS `holidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holidays` (
  `holidayCode` int NOT NULL AUTO_INCREMENT,
  `holidayDestination` varchar(45) NOT NULL,
  `holidayDescription` text NOT NULL,
  `holidayStartDate` datetime NOT NULL,
  `holidayEndDate` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `holidayImage` varchar(255) NOT NULL,
  PRIMARY KEY (`holidayCode`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holidays`
--

LOCK TABLES `holidays` WRITE;
/*!40000 ALTER TABLE `holidays` DISABLE KEYS */;
INSERT INTO `holidays` VALUES (1,'Maldives','Enjoy pristine beaches, crystal-clear waters, and luxury resorts in this tropical paradise.','2023-08-01 00:00:00','2023-08-07 00:00:00',2500.00,'https://upload.wikimedia.org/wikipedia/commons/3/33/A_beach_in_Maldives.jpg'),(2,'Paris, France','Explore the romantic streets, visit the iconic Eiffel Tower, and indulge in delicious French cuisine.','2023-09-10 00:00:00','2023-09-17 00:00:00',1800.00,'https://cdn.mos.cms.futurecdn.net/pD3bsKPrjsqNiFDGRL5oq6-1200-80.jpg'),(3,'Bali, Indonesia','Relax on stunning beaches, visit ancient temples, and immerse yourself in the rich Balinese culture.','2023-07-10 00:00:00','2023-08-03 00:00:00',2000.00,'https://balidave.com/wp-content/uploads/2022/11/best-hotel-bali.jpeg'),(4,'Rome, Italy','Discover ancient history, visit the Colosseum and Vatican City, and savor authentic Italian pizza and gelato.','2023-07-09 00:00:00','2023-10-12 00:00:00',2200.00,'https://www.fodors.com/assets/destinations/54492/colosseum-ancient-rome-rome-italy-europe_980x650.jpg'),(5,'New York City, USA','Experience the bustling city life, explore famous landmarks like Times Square and Central Park, and enjoy Broadway shows.','2023-09-12 00:00:00','2023-09-16 00:00:00',1900.00,'https://www.nationsonline.org/gallery/USA/Times-Square-New-York.jpg'),(6,'Tokyo, Japan','Immerse yourself in a mix of traditional and modern culture, visit historic temples, and try delicious sushi.','2023-09-05 00:00:00','2023-09-12 00:00:00',2300.00,'https://media.nomadicmatt.com/2022/tokyoguide1.jpeg'),(7,'Cape Town, South Africa','Enjoy breathtaking scenery, go on a safari to spot wildlife, and visit the iconic Table Mountain.','2023-07-08 00:00:00','2023-08-27 00:00:00',2800.00,'https://www.ncl.com/sites/default/files/900px_Cape_Town_South_Africa_shutterstock_507382921.jpg'),(8,'Santorini, Greece','Admire the stunning white-washed buildings, enjoy the beautiful sunsets, and explore ancient ruins.','2023-07-12 00:00:00','2023-07-16 00:00:00',2100.00,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEKNPYYPo0KtUB8wrNAiuXvkXXVaMH2l3kxA&usqp=CAU'),(9,'Sydney, Australia','Visit the iconic Sydney Opera House, relax on beautiful beaches, and explore the vibrant city.','2023-10-20 00:00:00','2023-10-27 00:00:00',2400.00,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUveBMHKWCgp7opmxXzZxi9STrqgEoJKQLog&usqp=CAU'),(10,'Rio de Janeiro, Brazil','Experience the vibrant Carnival atmosphere, relax on Copacabana Beach, and visit the iconic Christ the Redeemer statue.','2023-11-05 00:00:00','2023-11-12 00:00:00',1700.00,'https://st2.depositphotos.com/6644020/11217/i/450/depositphotos_112172136-stock-photo-rio-de-janeiro-aerial.jpg'),(11,'Cancun, Mexico','Enjoy white sandy beaches, swim in crystal-clear waters, and explore ancient Mayan ruins.','2023-09-15 00:00:00','2023-08-22 00:00:00',1800.00,'https://cdn.pixabay.com/photo/2016/02/29/06/43/cancun-1228131_1280.jpg'),(12,'Dubai, United Arab Emirates','Marvel at the modern architecture, go shopping in luxurious malls, and experience desert safaris.','2023-11-16 00:00:00','2023-12-08 00:00:00',2600.00,'https://thumbs.dreamstime.com/b/dubai-marina-beauty-view-rooftop-showing-cityscape-boats-sea-view-51444879.jpg'),(14,'hawaiiiii','Hawaii entices with its enchanting blend of stunning beaches, lush tropical landscapes, and vibrant culture, making it a paradise for travelers seeking a slice of heaven.','2023-11-29 22:00:00','2029-05-04 21:00:00',450000.00,'jgfkf.jpg'),(15,'safari','Safari offers an exhilarating opportunity to witness wildlife in its natural habitat, surrounded by untamed wilderness and breathtaking landscapes.','2023-11-29 20:00:00','2023-05-04 18:00:00',900.00,'https://wallpapercave.com/wp/wp5166870.jpg'),(16,'dfsdfdf','dsfdsfsdf','2026-07-14 00:00:00','2028-07-27 00:00:00',1000.00,'gasdsf.jpg'),(17,'dfsdfdf','dsfdsfsdf','2027-07-04 00:00:00','2028-07-27 00:00:00',1000.00,'gasdsf.jpg'),(18,'san-frantsisko','kalifornia','2027-07-13 15:00:00','2028-08-02 15:00:00',333.00,'werwer'),(19,'hawaiiiiii','Hawaii entices with its enchanting blend of stunning beaches, lush tropical landscapes, and vibrant culture, making it a paradise for travelers seeking a slice of heaven.','2023-07-30 21:00:00','2023-08-03 21:00:00',200.00,'https://wallpapercave.com/wp/MVb5sQj.jpg');
/*!40000 ALTER TABLE `holidays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `siteusers`
--

DROP TABLE IF EXISTS `siteusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `siteusers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL DEFAULT 'na',
  `user_email` varchar(90) NOT NULL DEFAULT 'na',
  `password` varchar(45) DEFAULT NULL,
  `user_create` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `siteusers`
--

LOCK TABLES `siteusers` WRITE;
/*!40000 ALTER TABLE `siteusers` DISABLE KEYS */;
/*!40000 ALTER TABLE `siteusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL DEFAULT 'na',
  `user_email` varchar(90) NOT NULL DEFAULT 'na',
  `password` varchar(45) DEFAULT NULL,
  `user_create` datetime DEFAULT NULL,
  `user_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@admin2.com','admin','2023-07-05 00:00:00','admin'),(2,'elena','elena@shishov.com','123456','2023-08-20 00:00:00','admin'),(6,'kot','adam@adam2adam3.com','1234','2023-05-20 02:12:00','regular'),(7,'adam','adam@adam3.com','123456789','2023-10-20 02:02:00','regular'),(8,'addam','addam@adam3.com','1234556789','2023-10-20 02:02:00','regular'),(11,'elenaadam','asda@jdd','123233286565','2023-07-05 00:00:00','regular'),(12,'alsk','axnd@com','93475938457938','2023-07-14 15:21:00','regular'),(13,'ejksdskdjf','asdasdf@sdfsdf','23234234','2023-07-14 16:13:17','regular'),(15,'elenaaaaaaaaaaa','aaaaam@j3.com','undefined','2055-07-30 06:06:10','admin'),(16,'werew','werwer@sdfsdf','324234234','2023-07-26 14:38:03','regular'),(17,'ereur','dfkgskjdfgkdjg@mxvfdv','3434','2023-07-26 14:41:26','undefined'),(19,'elenaaa','am@j3.com','12345','2055-07-30 06:06:10','admin'),(20,'wewe','were@sdfs','sdsdfsdf','2023-07-30 14:24:53','regular');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-30 18:57:44
