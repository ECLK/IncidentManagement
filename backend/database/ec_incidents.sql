-- MySQL dump 10.13  Distrib 8.0.13, for macos10.14 (x86_64)
--
-- Host: localhost    Database: kanban
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alembic_version`
--

DROP TABLE IF EXISTS `alembic_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alembic_version`
--

LOCK TABLES `alembic_version` WRITE;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version` VALUES ('5fe1860ff03b');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `top_category` varchar(1024) DEFAULT NULL,
  `sub_category` varchar(1024) DEFAULT NULL,
  `sn_sub_category` varchar(1024) DEFAULT NULL,
  `sn_top_category` varchar(1024) DEFAULT NULL,
  `tm_sub_category` varchar(1024) DEFAULT NULL,
  `tm_top_category` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Violation of election law','Misuse of public property',NULL,NULL,NULL,NULL),(2,'Violation of election law','Misuse of human resources',NULL,NULL,NULL,NULL),(3,'Violation of election law','Misuse of media',NULL,NULL,NULL,NULL),(4,'Violation of election law','Offering recruitment',NULL,NULL,NULL,NULL),(5,'Violation of election law','Offering goods ',NULL,NULL,NULL,NULL),(6,'Violation of election law','Meetings / rallies',NULL,NULL,NULL,NULL),(7,'Violation of election law','Posters / cutouts ',NULL,NULL,NULL,NULL),(8,'Violation of election law','Postal voting disturbances by public officers',NULL,NULL,NULL,NULL),(9,'Violence','Threat ',NULL,NULL,NULL,NULL),(10,'Violence','Physical harm',NULL,NULL,NULL,NULL),(11,'Violence','Interrupting propaganda',NULL,NULL,NULL,NULL),(12,'Violence','Damage to property ',NULL,NULL,NULL,NULL),(13,'Violence','Fire arms',NULL,NULL,NULL,NULL),(14,'Violence','Arson ',NULL,NULL,NULL,NULL),(15,'Violence','Loss of life',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `district`
--

DROP TABLE IF EXISTS `district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `district` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) DEFAULT NULL,
  `province` varchar(1024) DEFAULT NULL,
  `sn_name` varchar(1024) DEFAULT NULL,
  `sn_province` varchar(1024) DEFAULT NULL,
  `tm_name` varchar(1024) DEFAULT NULL,
  `tm_province` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `district`
--

LOCK TABLES `district` WRITE;
/*!40000 ALTER TABLE `district` DISABLE KEYS */;
INSERT INTO `district` VALUES (1,'Ampara','Eastern',NULL,NULL,NULL,NULL),(2,'Anuradhapura','North Central',NULL,NULL,NULL,NULL),(3,'Badulla','Uva',NULL,NULL,NULL,NULL),(4,'Batticaloa','Eastern',NULL,NULL,NULL,NULL),(5,'Colombo','Western',NULL,NULL,NULL,NULL),(6,'Galle','Southern',NULL,NULL,NULL,NULL),(7,'Gampaha','Western',NULL,NULL,NULL,NULL),(8,'Hambantota','Southern',NULL,NULL,NULL,NULL),(9,'Jaffna','Northern',NULL,NULL,NULL,NULL),(10,'Kalutara','Western',NULL,NULL,NULL,NULL),(11,'Kandy','Central',NULL,NULL,NULL,NULL),(12,'Kegalle','Sabaragamuwa',NULL,NULL,NULL,NULL),(13,'Kilinochchi','Northern',NULL,NULL,NULL,NULL),(14,'Kurunegala','North Western',NULL,NULL,NULL,NULL),(15,'Mannar','Northern',NULL,NULL,NULL,NULL),(16,'Matale','Central',NULL,NULL,NULL,NULL),(17,'Matara','Southern',NULL,NULL,NULL,NULL),(18,'Moneragala','Uva',NULL,NULL,NULL,NULL),(19,'Mullaitivu','Northern',NULL,NULL,NULL,NULL),(20,'Nuwara Eliya','Central',NULL,NULL,NULL,NULL),(21,'Polonnaruwa','North Central',NULL,NULL,NULL,NULL),(22,'Puttalam','North Western',NULL,NULL,NULL,NULL),(23,'Ratnapura','Sabaragamuwa',NULL,NULL,NULL,NULL),(24,'Trincomalee','Eastern',NULL,NULL,NULL,NULL),(25,'Vavuniya','Northern',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policestation`
--

DROP TABLE IF EXISTS `policestation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `policestation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `district_id` int(11) DEFAULT NULL,
  `name` varchar(1024) DEFAULT NULL,
  `division` varchar(1024) DEFAULT NULL,
  `sn_division` varchar(1024) DEFAULT NULL,
  `sn_name` varchar(1024) DEFAULT NULL,
  `tm_division` varchar(1024) DEFAULT NULL,
  `tm_name` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `district_id` (`district_id`),
  CONSTRAINT `policestation_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `district` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policestation`
--

LOCK TABLES `policestation` WRITE;
/*!40000 ALTER TABLE `policestation` DISABLE KEYS */;
INSERT INTO `policestation` VALUES (1,2,'Anuradapura','Anuradapura',NULL,NULL,NULL,NULL),(2,2,'Hidogama','Anuradapura',NULL,NULL,NULL,NULL),(3,2,'Udamaluwa','Anuradapura',NULL,NULL,NULL,NULL),(4,2,'Mihintale','Anuradapura',NULL,NULL,NULL,NULL),(5,2,'Kekirawa','Anuradapura',NULL,NULL,NULL,NULL),(6,2,'Thirappone','Anuradapura',NULL,NULL,NULL,NULL),(7,2,'Eppawala','Anuradapura',NULL,NULL,NULL,NULL),(8,2,'Galnewa','Anuradapura',NULL,NULL,NULL,NULL),(9,2,'Galkiriyagama','Anuradapura',NULL,NULL,NULL,NULL),(10,2,'Kebithigollawa','Anuradapura',NULL,NULL,NULL,NULL),(11,2,'Medawachchiya','Anuradapura',NULL,NULL,NULL,NULL),(12,2,'Padaviya','Anuradapura',NULL,NULL,NULL,NULL),(13,2,'Thambuttegama','Anuradapura',NULL,NULL,NULL,NULL),(14,2,'Rajangane','Anuradapura',NULL,NULL,NULL,NULL),(15,2,'Nochchiyagama','Anuradapura',NULL,NULL,NULL,NULL),(16,2,'Thalawa','Anuradapura',NULL,NULL,NULL,NULL),(17,2,'Horowpathana','Anuradapura',NULL,NULL,NULL,NULL),(18,2,'Kahatagasdigiliya','Anuradapura',NULL,NULL,NULL,NULL),(19,2,'Thanthirimalaya','Anuradapura',NULL,NULL,NULL,NULL),(20,2,'Mahawilachchiya','Anuradapura',NULL,NULL,NULL,NULL),(21,2,'Galenbidunuwewa','Anuradapura',NULL,NULL,NULL,NULL),(22,2,'Ipalogama','Anuradapura',NULL,NULL,NULL,NULL),(23,21,'Polonnaruwa','Polonnaruwa',NULL,NULL,NULL,NULL),(24,21,'Pulasthipura','Polonnaruwa',NULL,NULL,NULL,NULL),(25,21,'Welikanda','Polonnaruwa',NULL,NULL,NULL,NULL),(26,21,'Aralaganwila','Polonnaruwa',NULL,NULL,NULL,NULL),(27,21,'Hingurakgoda','Polonnaruwa',NULL,NULL,NULL,NULL),(28,21,'Medirigiriya','Polonnaruwa',NULL,NULL,NULL,NULL),(29,21,'Habarana','Polonnaruwa',NULL,NULL,NULL,NULL),(30,21,'Bakamuna','Polonnaruwa',NULL,NULL,NULL,NULL),(31,21,'Minneriya','Polonnaruwa',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `policestation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` enum('Backlog','To Do','In Progress','Testing','Done','Archived') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Backlog'),(2,'To Do'),(3,'In Progress'),(4,'Testing'),(5,'Done'),(6,'Archived');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(1024) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  KEY `state_id` (`state_id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`),
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Design the application',1,NULL,'2018-12-24 23:49:39','2018-12-25 00:31:44'),(2,'Implement the application',1,2,'2018-12-24 23:54:29','2018-12-25 03:44:55'),(3,'Design the app',6,NULL,'2018-12-25 03:42:27','2018-12-25 03:45:05');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'Kamal'),(2,'Nimal');
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

-- Dump completed on 2019-01-16 19:14:26
