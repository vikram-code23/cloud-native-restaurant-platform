-- MySQL dump 10.13  Distrib 8.4.9, for Linux (x86_64)
--
-- Host: localhost    Database: vk_restaurant
-- ------------------------------------------------------
-- Server version	8.4.9

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `foods`
--

DROP TABLE IF EXISTS `foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foods`
--

LOCK TABLES `foods` WRITE;
/*!40000 ALTER TABLE `foods` DISABLE KEYS */;
INSERT INTO `foods` VALUES (1,'Chicken Biryani',180.00,'images/biryani.jpg','Biryani'),(2,'Pepperoni Pizza',250.00,'images/pizza.jpg','Pizza'),(3,'Burger',120.00,'images/burger.jpg','Burger'),(4,'Fried Rice',150.00,'images/friedrice.jpg','Chinese'),(5,'Chicken Biryani',180.00,'images/biryani.jpg','Biryani'),(6,'Mutton Biryani',250.00,'images/mutton.jpg','Biryani'),(7,'Egg Biryani',140.00,'images/egg.jpg','Biryani'),(8,'Pepperoni Pizza',300.00,'images/pizza.jpg','Pizza'),(9,'Cheese Pizza',250.00,'images/cheese-pizza.jpg','Pizza'),(10,'Veg Pizza',220.00,'images/veg-pizza.jpg','Pizza'),(11,'Burger',120.00,'images/burger.jpg','Burger'),(12,'Chicken Burger',150.00,'images/chicken-burger.jpg','Burger'),(13,'Cheese Burger',170.00,'images/cheese-burger.jpg','Burger'),(14,'Fried Rice',150.00,'images/friedrice.jpg','Chinese'),(15,'Noodles',130.00,'images/noodles.jpg','Chinese'),(16,'Chicken Noodles',180.00,'images/chicken-noodles.jpg','Chinese'),(17,'French Fries',90.00,'images/fries.jpg','Snacks'),(18,'Sandwich',110.00,'images/sandwich.jpg','Snacks'),(19,'Coke',40.00,'images/coke.jpg','Drinks'),(20,'Pepsi',40.00,'images/pepsi.jpg','Drinks'),(21,'Sprite',40.00,'images/sprite.jpg','Drinks'),(22,'Green Mutton Curry',320.00,'images/green-mutton.jpg','Mutton Specials'),(23,'Mutton Kebab',280.00,'images/mutton-kebab.jpg','Mutton Specials'),(24,'Mutton Chukka',300.00,'images/mutton-chukka.jpg','Mutton Specials'),(25,'Chicken Shawarma',180.00,'images/shawarma.jpg','Arabic'),(26,'Al Faham Chicken',450.00,'images/alfaham.jpg','Arabic'),(27,'Grill Chicken',380.00,'images/grill-chicken.jpg','Arabic'),(28,'BBQ Chicken Wings',240.00,'images/bbq-wings.jpg','BBQ'),(29,'Smoked BBQ Chicken',420.00,'images/smoked-bbq.jpg','BBQ'),(30,'Fish Fry',220.00,'images/fish-fry.jpg','Seafood'),(31,'Prawn Fry',280.00,'images/prawn-fry.jpg','Seafood'),(32,'Crab Masala',350.00,'images/crab.jpg','Seafood'),(33,'Paneer Butter Masala',190.00,'images/paneer.jpg','Veg Specials'),(34,'Gobi Manchurian',140.00,'images/gobi.jpg','Veg Specials'),(35,'Mushroom Fried Rice',170.00,'images/mushroom-rice.jpg','Veg Specials'),(36,'Chocolate Cake',120.00,'images/choco-cake.jpg','Desserts'),(37,'Black Forest Cake',140.00,'images/blackforest.jpg','Desserts'),(38,'Vanilla Ice Cream',90.00,'images/vanilla.jpg','Desserts'),(39,'Brownie Ice Cream',160.00,'images/brownie.jpg','Desserts'),(40,'Mojito',110.00,'images/mojito.jpg','Mocktails'),(41,'Blue Lagoon',130.00,'images/blue-lagoon.jpg','Mocktails'),(42,'Watermelon Juice',90.00,'images/watermelon.jpg','Mocktails'),(43,'Oreo Milkshake',150.00,'images/oreo.jpg','Mocktails'),(44,'Tandoori Chicken',420.00,'images/tandoori.jpg','Indian'),(45,'Butter Naan',50.00,'images/naan.jpg','Indian'),(46,'Butter Chicken',260.00,'images/butter-chicken.jpg','Indian'),(47,'Pacha Color Mutton',350.00,'images/pacha-mutton.jpg','Mutton Specials'),(48,'Creamy Mushroom Momos',130.00,'images/mushroom-momos.jpg','Snacks'),(49,'Chicken Tenders',200.00,'images/chicken-tenders.jpg','Snacks'),(50,'White Sauce Pasta',190.00,'images/white-sauce-pasta.jpg','Italian'),(51,'White Sauce Pasta Large',230.00,'images/white-sauce-pasta-large.jpg','Italian'),(52,'Potato Cheese Shots (8Pcs)',110.00,'images/cheese-shots.jpg','Snacks'),(53,'Rava Payasam',100.00,'images/rava-payasam.jpg','Desserts'),(54,'Masala Mushroom',200.00,'images/masala-mushroom.jpg','Veg Specials'),(55,'Mushroom Peas Pulav',150.00,'images/mushroom-pulav.jpg','Veg Specials'),(56,'Peri Peri Chicken (4Pcs)',120.00,'images/peri-peri.jpg','BBQ'),(57,'Peri Peri Chicken Large (4Pcs)',150.00,'images/peri-peri-large.jpg','BBQ'),(58,'Loaded Macken Chick',125.00,'images/macken-chick.jpg','Burger');
/*!40000 ALTER TABLE `foods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `checkout_id` varchar(255) DEFAULT NULL,
  `food_name` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `table_no` varchar(50) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'CHK1779700065065','Chicken Biryani',1,180.00,180.00,'Delivered','T1','2026-05-25T09:07:45.065Z'),(2,1,'CHK1779730241187','Veg Pizza',1,220.00,220.00,'Delivered','T1','2026-05-25T17:30:41.187Z');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'VIKRAM T','vk@gmail.com','12345');
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

-- Dump completed on 2026-05-26 17:34:17
