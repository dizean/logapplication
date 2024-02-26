-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2024 at 10:16 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_lkeylog`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `username`, `password`) VALUES
(13, 'admin', '$2a$10$Hq/myISoCS82jdhxDMejguOWqEdHxGcpuX8y6tqTwe.Ht9vhezJo6'),
(14, '12345678', '$2a$10$eI.IreB5bud9lItfJ8s7weeeKCOeaUr6kyouDuJImJL4ie7oR5pBi');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_booking`
--

CREATE TABLE `tbl_booking` (
  `id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `booked_date` varchar(100) NOT NULL,
  `booker_name` varchar(100) NOT NULL,
  `purpose` text NOT NULL,
  `from_time` varchar(100) NOT NULL,
  `until_time` varchar(100) NOT NULL,
  `status` varchar(255) NOT NULL,
  `admin_assigned` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_booking`
--

INSERT INTO `tbl_booking` (`id`, `room_id`, `booked_date`, `booker_name`, `purpose`, `from_time`, `until_time`, `status`, `admin_assigned`) VALUES
(47, 9, '2024-01-16', 'sample', 'sample', '11:45', '02:45', 'Done', 'null'),
(48, 9, '2024-01-16', 'sample', 'sample', '00:57', '00:57', 'Done', 'admin'),
(49, 9, '2024-01-16', 'sample', 'sample', '04:59', '07:59', 'Done', 'admin'),
(50, 9, '2024-01-16', 'ok', 'ok', '16:09', '18:09', 'Done', 'admin'),
(51, 9, '2024-01-16', 'aj', 'a', '15:00', '16:00', 'Booked', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_borrowers`
--

CREATE TABLE `tbl_borrowers` (
  `id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `room` varchar(100) NOT NULL,
  `date` varchar(255) NOT NULL,
  `name_borrower` varchar(255) NOT NULL,
  `time_borrowed` varchar(100) NOT NULL,
  `name_returner` varchar(100) NOT NULL,
  `time_returned` varchar(100) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `admin_assigned` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_borrowers`
--

INSERT INTO `tbl_borrowers` (`id`, `room_id`, `room`, `date`, `name_borrower`, `time_borrowed`, `name_returner`, `time_returned`, `status`, `admin_assigned`) VALUES
(130, 9, '510', '2024-02-07', 'sample', '5:22:07 PM', 'sampler', '5:22:25 PM', 'Returned', 'admin'),
(131, 9, '510', '', 'Felipe Junnie', '3:52:32 PM', '', '3:52:45 PM', 'Returned', 'admin'),
(132, 9, '510', '2024-02-10', 'VV', '9:23:43 PM', 'sass', '9:36:54 PM', 'Returned', 'admin'),
(133, 9, '510', '2024-02-11', 'zakero', '11:49:17 AM', 'ora', '11:53:41 AM', 'Returned', 'admin'),
(134, 10, '214', '2024-02-11', 'charliesangel', '7:18:13 PM', 'polli', '7:18:29 PM', 'Returned', 'admin'),
(135, 11, '215', '2024-02-11', 'sas', '7:24:32 PM', 'ds', '7:24:50 PM', 'Returned', 'admin'),
(136, 10, '214', '2024-02-11', 'sas', '10:02:03 PM', 'sas', '10:02:09 PM', 'Returned', 'admin'),
(137, 10, '214', '2024-02-11', 'sfdfd', '10:05:39 PM', 'sasa', '10:05:43 PM', 'Returned', 'admin'),
(138, 9, '510', '2024-02-23', 'chalrws', '9:47:28 AM', 'sasa', '9:49:16 AM', 'Returned', 'admin'),
(139, 9, '510', '2024-02-23', 'sasas', '11:13:57 AM', 'sasasasadee3r3', '11:15:50 AM', 'Returned', 'admin'),
(140, 9, '510', '2024-02-23', 'sasasadfe', '11:15:44 AM', 'sasafee454', '11:17:20 AM', 'Returned', 'admin'),
(141, 13, '200', '2024-02-23', 'ksask', '11:16:46 AM', 'sasafe', '11:16:52 AM', 'Returned', 'admin'),
(143, 12, 'MC 508', '2024-02-23', 'charles', '11:38:25 AM', 'charles', '11:38:31 AM', 'Returned', 'admin'),
(144, 10, '214', '2024-02-23', 'sasa', '2:27:08 PM', 'sasa', '2:27:13 PM', 'Returned', 'admin'),
(145, 11, '215', '2024-02-23', 'sasasa', '2:38:53 PM', 'dsds', '2:39:01 PM', 'Returned', 'admin'),
(146, 10, '214', '2024-02-23', 'charles', '3:02:21 PM', 'gabriel', '3:02:30 PM', 'Returned', 'admin'),
(147, 11, '215', '2024-02-23', 'sir boks', '3:02:47 PM', 'smaple', '3:03:47 PM', 'Returned', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_deletedrooms`
--

CREATE TABLE `tbl_deletedrooms` (
  `id` int(11) NOT NULL,
  `room` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employees`
--

CREATE TABLE `tbl_employees` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `classification` varchar(255) NOT NULL,
  `department` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `work_status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_employees`
--

INSERT INTO `tbl_employees` (`id`, `name`, `classification`, `department`, `status`, `work_status`) VALUES
(7, 'Lenuel Betita', 'Teaching Personnel', 'School of Business and Information Technology', 'Full Time', 'Inactive'),
(8, 'Charles TorresS', 'Teaching Personnel', 'School of Fine Arts, Architecture and Interior Design', 'Full Time', 'Active'),
(29, 'sample', 'Teaching Personnel', 'School of Fine Arts, Architecture and Interior Design', 'Full Time', 'Inactive'),
(30, 'sample', 'Academic Non Teaching Personnel', 'School of Fine Arts, Architecture and Interior Design', 'Part Time', 'Inactive');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employee_log`
--

CREATE TABLE `tbl_employee_log` (
  `id` int(11) NOT NULL,
  `date` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `time_in` varchar(50) NOT NULL,
  `time_out` varchar(50) NOT NULL,
  `admin_assigned` varchar(50) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_employee_log`
--

INSERT INTO `tbl_employee_log` (`id`, `date`, `name`, `time_in`, `time_out`, `admin_assigned`, `employee_id`, `status`) VALUES
(98, '2024-02-11', 'Lenuelito Betita', '8:39:27 PM', '8:39:37 PM', 'admin', 7, 'Out'),
(99, '2024-02-22', 'Lenuelito Betita', '11:24:25 PM', '3:57:21 AM', 'admin', 7, 'Out'),
(100, '2024-02-22', 'Lenuelito Betita', '5:06:37 AM', '5:08:38 AM', 'admin', 7, 'Out'),
(101, '2024-02-22', 'Charles Torres', '5:14:17 AM', '5:14:26 AM', 'admin', 8, 'Out'),
(103, '2024-02-23', 'Lenuel Betita', '11:12:01 AM', '11:13:05 AM', 'admin', 7, 'Out'),
(104, '2024-02-23', 'Lenuel Betita', '11:14:14 AM', '11:27:57 AM', 'admin', 7, 'Out'),
(106, '2024-02-23', 'Charles Torres', '1:18:50 PM', '1:19:20 PM', 'admin', 8, 'Out'),
(107, '2024-02-23', 'Lenuel Betita', '1:19:23 PM', '1:29:03 PM', 'admin', 7, 'Out'),
(109, '2024-02-23', 'Lenuel Betita', '2:23:43 PM', '2:25:01 PM', 'admin', 7, 'Out'),
(110, '2024-02-23', 'Lenuel Betita', '2:26:32 PM', '2:26:42 PM', 'admin', 7, 'Out'),
(111, '2024-02-23', 'Lenuel Betita', '2:58:57 PM', '2:59:04 PM', 'admin', 7, 'Out'),
(112, '2024-02-23', 'Charles TorresS', '3:01:43 PM', '', 'admin', 8, 'In');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_rooms`
--

CREATE TABLE `tbl_rooms` (
  `id` int(11) NOT NULL,
  `room` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_rooms`
--

INSERT INTO `tbl_rooms` (`id`, `room`, `location`, `status`) VALUES
(9, '510', 'MC College Building 5th Floor', 'Available'),
(10, '214', 'College Building 2nd Floor', 'Available'),
(11, '215', 'College Building 2nd Floor', 'Available'),
(12, 'MC 508', 'MC BUILDING 5TH FLOOR', 'Available'),
(13, '200', 'College Building 3rdFloor', 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_visitors`
--

CREATE TABLE `tbl_visitors` (
  `id` int(11) NOT NULL,
  `date` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `purpose` text NOT NULL,
  `place` varchar(100) NOT NULL,
  `time` varchar(50) NOT NULL,
  `admin_assigned` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_visitors`
--

INSERT INTO `tbl_visitors` (`id`, `date`, `name`, `purpose`, `place`, `time`, `admin_assigned`) VALUES
(14, '2024-01-16', 'sample', 'sample', '', '11:46:29 AM', 'nul;'),
(15, '2024-01-16', 'vistor', 'vists', '', '11:58:23 AM', 'admin'),
(16, '2024-01-16', 'name', 'sa 215', '', '3:11:17 PM', 'admin'),
(17, '2024-01-16', 'sample', 'sample', '', '3:27:00 PM', 'admin'),
(18, '2024-01-29', 'charles', 'to visti sir boks', 'room 510', '3:58:24 PM', 'admin'),
(19, '2024-02-05', 'sac', 'uououiouo', 'room 510', '7:33:49 PM', 'admin'),
(20, '2024-02-11', 'charles', 'talk to teacher', 'mc 510', '11:52:42 AM', 'admin'),
(21, '2024-02-23', 'sasas', 'sasas', 'asasa', '10:25:38 AM', 'admin'),
(22, '2024-02-23', 'charles', 'asoako', 'okok', '11:41:52 AM', 'admin'),
(23, '2024-02-23', 'charles', 'MEETING', '510', '2:32:39 PM', 'admin'),
(24, '2024-02-23', 'sasasa', 'sasa', 'sas', '2:35:02 PM', 'admin'),
(25, '2024-02-23', 'sample', 'sample', 'sample', '3:03:25 PM', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_booking`
--
ALTER TABLE `tbl_booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `tbl_borrowers`
--
ALTER TABLE `tbl_borrowers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `tbl_deletedrooms`
--
ALTER TABLE `tbl_deletedrooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_employees`
--
ALTER TABLE `tbl_employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_employee_log`
--
ALTER TABLE `tbl_employee_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `tbl_rooms`
--
ALTER TABLE `tbl_rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_visitors`
--
ALTER TABLE `tbl_visitors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_booking`
--
ALTER TABLE `tbl_booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `tbl_borrowers`
--
ALTER TABLE `tbl_borrowers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT for table `tbl_deletedrooms`
--
ALTER TABLE `tbl_deletedrooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_employees`
--
ALTER TABLE `tbl_employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tbl_employee_log`
--
ALTER TABLE `tbl_employee_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `tbl_rooms`
--
ALTER TABLE `tbl_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tbl_visitors`
--
ALTER TABLE `tbl_visitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_booking`
--
ALTER TABLE `tbl_booking`
  ADD CONSTRAINT `tbl_booking_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `tbl_rooms` (`id`);

--
-- Constraints for table `tbl_borrowers`
--
ALTER TABLE `tbl_borrowers`
  ADD CONSTRAINT `tbl_borrowers_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `tbl_rooms` (`id`);

--
-- Constraints for table `tbl_employee_log`
--
ALTER TABLE `tbl_employee_log`
  ADD CONSTRAINT `tbl_employee_log_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `tbl_employees` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
