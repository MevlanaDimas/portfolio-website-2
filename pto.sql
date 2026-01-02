-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 02 Jan 2026 pada 01.37
-- Versi server: 8.4.3
-- Versi PHP: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Basis data: `pto`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `abouts`
--

CREATE TABLE `abouts` (
  `id` bigint UNSIGNED NOT NULL,
  `photo_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `activate` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `abouts`
--

INSERT INTO `abouts` (`id`, `photo_url`, `photo_name`, `bio`, `activate`, `created_at`, `updated_at`) VALUES
(1, 'https://storage.googleapis.com/dimas_portofolio/photos/1767140082-67ab08080be7b-removebg-preview.png', '67ab08080be7b-removebg-preview.png', 'A recent Electrical Engineering graduate, I specialize in biomedical research, data science, and backend developing. I am highly motivated and eager to learn new technologies and methodologies. My strengths include adaptability, critical thinking, and collaboration in team settings. My organizational and work experiences have sharpened my leadership abilities, enhanced my communication skills, and honed my strategic thinking.', 1, '2025-12-30 17:14:44', '2025-12-30 17:14:52');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(26, '0001_01_01_000000_create_users_table', 1),
(27, '0001_01_01_000001_create_cache_table', 1),
(28, '0001_01_01_000002_create_jobs_table', 1),
(29, '2025_08_26_100418_add_two_factor_columns_to_users_table', 1),
(30, '2025_12_30_132532_create_abouts_table', 1),
(31, '2025_12_30_132542_create_projects_table', 1),
(32, '2025_12_30_132606_create_project_photos_table', 1),
(33, '2025_12_30_225451_add_tags_row_to_projects', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `projects`
--

CREATE TABLE `projects` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `github_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `projects`
--

INSERT INTO `projects` (`id`, `title`, `description`, `link`, `github_link`, `tags`, `created_at`, `updated_at`) VALUES
(1, 'Prediction of Benign Breast Cancer Using the ANN Method', 'This project focuses on developing a prediction model to detect benign breast cancer using the Artificial Neural Network (ANN) method. The objective is to assist medical professionals in providing early, intensive treatment, recognizing that benign breast cancer can develop into a malignant form. This model utilizes secondary data from a previous study for its training and testing phases. The results demonstrate that the proposed ANN model successfully achieves an accuracy rate of 82.35%. This outcome is superior to the binary logistic regression method from the prior study, which only reached an accuracy of 79.2%.', NULL, 'https://github.com/MevlanaDimas/ANN_3_Layers_Breast_Cancer_Prediction.git', 'Python, ANN, Artificial Neural Network, Binary Logistic Regression, AI', '2025-12-30 17:19:09', '2025-12-30 17:41:43'),
(2, 'Comparison of Classification between ANN and Binary Gradient Boosted Decision Tree in Malaria-Infected Red Blood Cell Images', 'This project provides a comparison between two machine learning methods, Artificial Neural Network (ANN) and Light Gradient Boosted Machine (LGBM), for the classification of red blood cell images infected with malaria. Using 127 features manually extracted from a total of 27,600 images, both models were tested to determine their performance. The results indicate that the Decision Tree-based LGBM model achieved a superior accuracy of 91%. In contrast, the ANN model only managed an accuracy of 62%. The conclusion is that traditional machine learning methods like LGBM are more effective for data with manually extracted features.', NULL, 'https://github.com/MevlanaDimas/Classification_of_Red_Blood_Cell_Infected_by_Malaria_using_ANN.git', 'Artificial Neural Network, ANN, Light Gradient Boosted Machine, LGBM, Decision Tree, AI, Python', '2025-12-30 18:20:13', '2025-12-30 18:20:13'),
(3, 'Clinic Management System', 'A full-stack medical administration tool demonstrating advanced implementation of Inertia.js to bridge a Laravel backend with a reactive React frontend. This project features a secure, role-based access control (RBAC) system for doctors and staff, real-time data synchronization, and a modular component architecture. By utilizing SSR, the platform ensures near-instantaneous page transitions and optimized performance for clinical environments.', NULL, 'https://github.com/MevlanaDimas/clinic-app.git', 'PHP, Laravel, Inertia SSR, JavaScript, TypeScript, SQL, MySQL, Role Based, Secure 2FA', '2026-01-01 07:53:18', '2026-01-01 07:53:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `project_photos`
--

CREATE TABLE `project_photos` (
  `id` bigint UNSIGNED NOT NULL,
  `project_id` bigint UNSIGNED NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `project_photos`
--

INSERT INTO `project_photos` (`id`, `project_id`, `image_url`, `image_name`, `created_at`, `updated_at`) VALUES
(2, 1, 'https://storage.googleapis.com/dimas_portofolio/projects/1767141704-67b44ad631a63.jpeg', '67b44ad631a63.jpeg', '2025-12-30 17:41:44', '2025-12-30 17:41:44'),
(3, 2, 'https://storage.googleapis.com/dimas_portofolio/projects/1767144013-67b44e1e31e1d.jpeg', '67b44e1e31e1d.jpeg', '2025-12-30 18:20:17', '2025-12-30 18:20:17'),
(4, 3, 'https://storage.googleapis.com/dimas_portofolio/projects/1767279198-mock-up-1.png', 'mock-up-1.png', '2026-01-01 07:53:22', '2026-01-01 07:53:22'),
(5, 3, 'https://storage.googleapis.com/dimas_portofolio/projects/1767279202-mock-up-2.png', 'mock-up-2.png', '2026-01-01 07:53:23', '2026-01-01 07:53:23'),
(6, 3, 'https://storage.googleapis.com/dimas_portofolio/projects/1767279203-mock-up-3.png', 'mock-up-3.png', '2026-01-01 07:53:24', '2026-01-01 07:53:24'),
(7, 3, 'https://storage.googleapis.com/dimas_portofolio/projects/1767279204-mock-up-4.png', 'mock-up-4.png', '2026-01-01 07:53:24', '2026-01-01 07:53:24'),
(8, 3, 'https://storage.googleapis.com/dimas_portofolio/projects/1767279204-mock-up-5.png', 'mock-up-5.png', '2026-01-01 07:53:25', '2026-01-01 07:53:25'),
(9, 3, 'https://storage.googleapis.com/dimas_portofolio/projects/1767279205-mock-up-6.png', 'mock-up-6.png', '2026-01-01 07:53:25', '2026-01-01 07:53:25'),
(10, 3, 'https://storage.googleapis.com/dimas_portofolio/projects/1767279205-mock-up-7.png', 'mock-up-7.png', '2026-01-01 07:53:26', '2026-01-01 07:53:26'),
(11, 3, 'https://storage.googleapis.com/dimas_portofolio/projects/1767279206-mock-up-8.png', 'mock-up-8.png', '2026-01-01 07:53:26', '2026-01-01 07:53:26');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('R08iYnmSwY3arCGx5Jf70AuJEyQ4guWyBo2HqpfM', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUVJVR2ZTa2pQbzlzcFZ5YmtxQm93Z0x6UEZWaG40ZkZDaUhhM1ZXVyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo1OiJsb2dpbiI7YTowOnt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1767316519);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Dimas Maulana Arbi', 'maulana.arby10@gmail.com', NULL, '$2y$12$ZRKYpgkRzsF7JxtoXIEyGeDtsgNym2/zH2Y.CcrLz8aD2AfIlNW4i', 'eyJpdiI6InJaZGJWM2NHR3lydXFxd0lqUSthRHc9PSIsInZhbHVlIjoiNUpLd05pemlXRnJxS1grdWdTRm8vQTEySUg5U3hFZ0N4dnBEQ05rVU4vRT0iLCJtYWMiOiIwMmM4MDZiNjlkZmY3ZGMxNjM4ZTY2OGE4ZWI4MGI5YWFmMDRiMDA4MTA0NzNjNzhhZjYwNzIxZTNiMWU0ZmYzIiwidGFnIjoiIn0=', 'eyJpdiI6IkJHa0h4VGNUV0JWaVB2TlZ6LzV4cmc9PSIsInZhbHVlIjoic0RDZlZsZWxjdEYzcldsY0tYQ3puZ3NrcHh6c0ZsWUNUaVYvK3EvK2pjSU8xTzRFMWVVZnhIZnlMWXZwdFRzVU42K2pQMjVjaDVKQzVoTXd3b0lvQm9lWXVjN2hxYWg1RHFlck4zMXh4R3d6SWQxL3RVS2NQaURZUTI1eHBSWGFZWHBrcEExdlNSU3RNY01STGFZQ1V1U3BwMnEwQTR2TGlWdVdyeUYrcXFuY2FkZ096Z3MxSURINnhQRG9nNkxLWFhVWG5mNVVFdDJUWS9CVHBSZ0Q0OEVSRlIrd1hlemxNNzdhWGd6R1VXOGYxbG90U20xY00vankxbVBCdTFMN3pQOE1WTVE1VnlPeGxNWVg3UHUvN0E9PSIsIm1hYyI6IjUzNTQxZjFlMmI5OWU0ZjJhZThlODBmNGI2MTk1ZmM3NDI1NTc3OGJlODY4MTFiOTExNDA1OWM5ODcyNTk5MmEiLCJ0YWciOiIifQ==', '2026-01-01 10:33:51', NULL, '2025-12-30 15:46:04', '2026-01-01 10:33:51');

--
-- Indeks untuk tabel yang dibuang
--

--
-- Indeks untuk tabel `abouts`
--
ALTER TABLE `abouts`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeks untuk tabel `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `project_photos`
--
ALTER TABLE `project_photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_projec_photos` (`project_id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `abouts`
--
ALTER TABLE `abouts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT untuk tabel `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `project_photos`
--
ALTER TABLE `project_photos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `project_photos`
--
ALTER TABLE `project_photos`
  ADD CONSTRAINT `id_projec_photos` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
