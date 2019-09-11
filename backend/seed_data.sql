-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: lsf
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
INSERT INTO `auth_group` VALUES (1,'leadership',1),(2,'cheif-coordinator',2),(3,'manager',3),(4,'coordinator',4),(5,'guest',5);
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
INSERT INTO `auth_group_permissions` VALUES (1,1,57),(2,1,63),(3,2,57),(4,2,62),(5,3,57),(6,3,63);
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add category',7,'add_category'),(26,'Can change category',7,'change_category'),(27,'Can delete category',7,'delete_category'),(28,'Can view category',7,'view_category'),(29,'Can add channel',8,'add_channel'),(30,'Can change channel',8,'change_channel'),(31,'Can delete channel',8,'delete_channel'),(32,'Can view channel',8,'view_channel'),(33,'Can add district',9,'add_district'),(34,'Can change district',9,'change_district'),(35,'Can delete district',9,'delete_district'),(36,'Can view district',9,'view_district'),(37,'Can add ward',10,'add_ward'),(38,'Can change ward',10,'change_ward'),(39,'Can delete ward',10,'delete_ward'),(40,'Can view ward',10,'view_ward'),(41,'Can add polling station',11,'add_pollingstation'),(42,'Can change polling station',11,'change_pollingstation'),(43,'Can delete polling station',11,'delete_pollingstation'),(44,'Can view polling station',11,'view_pollingstation'),(45,'Can add police station',12,'add_policestation'),(46,'Can change police station',12,'change_policestation'),(47,'Can delete police station',12,'delete_policestation'),(48,'Can view police station',12,'view_policestation'),(49,'Can add ds division',13,'add_dsdivision'),(50,'Can change ds division',13,'change_dsdivision'),(51,'Can delete ds division',13,'delete_dsdivision'),(52,'Can view ds division',13,'view_dsdivision'),(53,'Can add incident',14,'add_incident'),(54,'Can change incident',14,'change_incident'),(55,'Can delete incident',14,'delete_incident'),(56,'Can view incident',14,'view_incident'),(57,'Can directly change assignee',14,'can_change_assignee'),(58,'Can add reporter',15,'add_reporter'),(59,'Can change reporter',15,'change_reporter'),(60,'Can delete reporter',15,'delete_reporter'),(61,'Can view reporter',15,'view_reporter'),(62,'Can add incident status',16,'add_incidentstatus'),(63,'Can change incident status',16,'change_incidentstatus'),(64,'Can delete incident status',16,'delete_incidentstatus'),(65,'Can view incident status',16,'view_incidentstatus'),(66,'Can directly change status',16,'can_change_status'),(67,'Can request to change status',16,'can_request_status_change'),(68,'Can approve a status change request',16,'can_approve_status_change'),(69,'Can reject a status change request',16,'can_reject_status_change'),(70,'Can add incident severity',17,'add_incidentseverity'),(71,'Can change incident severity',17,'change_incidentseverity'),(72,'Can delete incident severity',17,'delete_incidentseverity'),(73,'Can view incident severity',17,'view_incidentseverity'),(74,'Can directly change severity',17,'can_change_severity'),(75,'Can request to change severity',17,'can_request_severity_change'),(76,'Can approve a severity change request',17,'can_approve_severity_change'),(77,'Can reject a severity change request',17,'can_reject_severity_change'),(78,'Can add incident police report',18,'add_incidentpolicereport'),(79,'Can change incident police report',18,'change_incidentpolicereport'),(80,'Can delete incident police report',18,'delete_incidentpolicereport'),(81,'Can view incident police report',18,'view_incidentpolicereport'),(82,'Can add incident comment',19,'add_incidentcomment'),(83,'Can change incident comment',19,'change_incidentcomment'),(84,'Can delete incident comment',19,'delete_incidentcomment'),(85,'Can view incident comment',19,'view_incidentcomment'),(86,'Can add event',20,'add_event'),(87,'Can change event',20,'change_event'),(88,'Can delete event',20,'delete_event'),(89,'Can view event',20,'view_event'),(90,'Can add file',21,'add_file'),(91,'Can change file',21,'change_file'),(92,'Can delete file',21,'delete_file'),(93,'Can view file',21,'view_file');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$150000$PG7pIV9kn8UW$HO4onDPlUFjErVSNDXREHqBndt7wVacfXikD7cpzav4=','2019-09-09 02:40:07.008582',1,'root','','','',1,1,'2019-09-07 06:21:29.925729'),(2,'pbkdf2_sha256$150000$4kGLElo8QEy8$xsaoIwKW1r7SbMMS1fNThcr5i4r/RW/PVkG0wKygdUU=','2019-09-11 13:15:24.000000',1,'dehan','Dehan','de Croos','dehandecroos@gmail.com',1,1,'2019-09-11 13:14:46.000000'),(3,'pbkdf2_sha256$150000$FodVe0wfFqBK$ljYXinwkgP7Tx1LfD8GvQ0TE3JViKG8U4U4cw01twTE=','2019-09-11 13:28:41.000000',0,'guest','user','user','mock@user.com',0,1,'2019-09-11 13:28:16.000000'),(4,'pbkdf2_sha256$150000$MFCxAcTfugt0$aQXoHjQiMWvmQyxR3DuvNQERTBUK1k0nJL3IR03LsAg=','2019-09-11 13:37:11.000000',0,'coordinator','Dehan','de Croos','dehandecroos@gmail.com',0,1,'2019-09-11 13:36:41.000000');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
INSERT INTO `auth_user_groups` VALUES (1,2,2),(2,3,5),(3,4,4);
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-11 19:42:41
