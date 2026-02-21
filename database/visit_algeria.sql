-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : sam. 21 fév. 2026 à 16:17
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `visit_algeria`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','editor') NOT NULL DEFAULT 'editor',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `email`, `password_hash`, `role`, `created_at`) VALUES
(2, 'admin', 'admin@visitalgeria.dz', '$2b$10$HdS/7KmSqwP/ZQkFb8zxKOvWQo0mVzcRc90FZzhscq/OMWkxoFAH2', 'admin', '2026-02-10 19:46:24');

-- --------------------------------------------------------

--
-- Structure de la table `calendar_items`
--

CREATE TABLE `calendar_items` (
  `id` int(11) NOT NULL,
  `month_id` int(11) NOT NULL,
  `title_en` varchar(100) NOT NULL,
  `title_ar` varchar(100) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `calendar_items`
--

INSERT INTO `calendar_items` (`id`, `month_id`, `title_en`, `title_ar`, `image_url`, `sort_order`, `is_active`) VALUES
(1, 1, 'Oran coest', 'ساحل وهران', '/uploads/calendar/1771144173382-284281977.webp', 1, 1),
(2, 1, 'sahara', 'الصحراء', '/uploads/calendar/1771145156541-709970287.webp', 2, 1),
(3, 1, 'djurdjura', 'جبال جرجرة', '/uploads/calendar/1771145265870-260037631.jpg', 3, 1),
(4, 1, 'alger la blanche', 'الجزائر البيضاء', '/uploads/calendar/1771145341039-524129801.jpg', 4, 1),
(5, 1, 'annaba beach', 'شاطئ عنابة', '/uploads/calendar/1771145420740-463383877.jpg', 5, 1),
(6, 1, 'bejaia coast', 'ساحل بجاية', '/uploads/calendar/1771145587318-679918214.webp', 6, 1);

-- --------------------------------------------------------

--
-- Structure de la table `calendar_months`
--

CREATE TABLE `calendar_months` (
  `id` int(11) NOT NULL,
  `name_en` varchar(30) NOT NULL,
  `name_ar` varchar(30) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `calendar_months`
--

INSERT INTO `calendar_months` (`id`, `name_en`, `name_ar`, `sort_order`, `is_active`) VALUES
(1, 'December', '????????????', 1, 1),
(2, 'January', '??????????', 2, 1),
(3, 'February', '????????????', 3, 1),
(4, 'March', '????????', 4, 1);

-- --------------------------------------------------------

--
-- Structure de la table `destinations`
--

CREATE TABLE `destinations` (
  `id` int(11) NOT NULL,
  `name_en` varchar(100) NOT NULL,
  `name_ar` varchar(100) NOT NULL,
  `about_en` longtext DEFAULT NULL,
  `about_ar` longtext DEFAULT NULL,
  `background_image` varchar(500) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `population` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `climate_en` varchar(100) DEFAULT NULL,
  `climate_ar` varchar(100) DEFAULT NULL,
  `best_time_en` text DEFAULT NULL,
  `best_time_ar` text DEFAULT NULL,
  `cuisine_en` text DEFAULT NULL,
  `cuisine_ar` text DEFAULT NULL,
  `etiquette_en` text DEFAULT NULL,
  `etiquette_ar` text DEFAULT NULL,
  `transport_en` text DEFAULT NULL,
  `transport_ar` text DEFAULT NULL,
  `show_on_homepage` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `destinations`
--

INSERT INTO `destinations` (`id`, `name_en`, `name_ar`, `about_en`, `about_ar`, `background_image`, `sort_order`, `is_active`, `population`, `area`, `climate_en`, `climate_ar`, `best_time_en`, `best_time_ar`, `cuisine_en`, `cuisine_ar`, `etiquette_en`, `etiquette_ar`, `transport_en`, `transport_ar`, `show_on_homepage`) VALUES
(1, 'Adrar', 'أدرار', '<p></p>', '<p></p>', 'https://images.unsplash.com/photo-1599423300746-b62533397364?w=600&h=400&fit=crop', 10, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(2, 'Chlef', 'الشلف', '<p>The&nbsp;province&nbsp;of&nbsp;Chlef&nbsp;lies&nbsp;between&nbsp;the&nbsp;cities&nbsp;of&nbsp;Algiers&nbsp;and&nbsp;Oran,&nbsp;making&nbsp;it&nbsp;an&nbsp;important&nbsp;economic&nbsp;region&nbsp;for&nbsp;the&nbsp;country.&nbsp;It&nbsp;also&nbsp;boasts&nbsp;several&nbsp;important&nbsp;ports,&nbsp;such&nbsp;as&nbsp;Sidi&nbsp;Abdel&nbsp;Rahman,&nbsp;Ténès,&nbsp;and&nbsp;El&nbsp;Marsa,&nbsp;and&nbsp;most&nbsp;importantly,&nbsp;Abou&nbsp;Bekr&nbsp;Belkaid&nbsp;Airport.&nbsp;The&nbsp;city&nbsp;itself&nbsp;has&nbsp;a&nbsp;long-standing&nbsp;agricultural&nbsp;character,&nbsp;covering&nbsp;an&nbsp;area&nbsp;of&nbsp;​​263&nbsp;hectares,&nbsp;and&nbsp;its&nbsp;diverse&nbsp;geography&nbsp;and&nbsp;topography,&nbsp;including&nbsp;mountains,&nbsp;plains,&nbsp;waterfalls,&nbsp;and&nbsp;numerous&nbsp;expansive&nbsp;beaches,&nbsp;make&nbsp;it&nbsp;a&nbsp;significant&nbsp;tourist&nbsp;destination&nbsp;offering&nbsp;various&nbsp;forms&nbsp;of&nbsp;tourism,&nbsp;including&nbsp;leisure,&nbsp;historical,&nbsp;and&nbsp;ecotourism.</p><p></p><p><strong>Tourist&nbsp;Attractions:</strong></p><p></p><p><strong>The&nbsp;Ghoul&#39;s&nbsp;Tower</strong></p><p>The&nbsp;Ghoul&#39;s&nbsp;Tower&nbsp;is&nbsp;a&nbsp;historical&nbsp;landmark&nbsp;and&nbsp;one&nbsp;of&nbsp;the&nbsp;most&nbsp;important&nbsp;parts&nbsp;of&nbsp;the&nbsp;ancient&nbsp;city&nbsp;of&nbsp;Ténès.&nbsp;It&nbsp;overlooks&nbsp;the&nbsp;forested&nbsp;face&nbsp;of&nbsp;Mount&nbsp;Qaysar&nbsp;and&nbsp;the&nbsp;Alala&nbsp;Valley.&nbsp;The&nbsp;tower&nbsp;served&nbsp;as&nbsp;a&nbsp;defensive&nbsp;position,&nbsp;monitoring&nbsp;movements&nbsp;outside&nbsp;the&nbsp;city&nbsp;walls,&nbsp;and&nbsp;is&nbsp;one&nbsp;of&nbsp;its&nbsp;five&nbsp;gates:</p><p></p><p>&quot;Bab&nbsp;al-Khoukha,&nbsp;Bab&nbsp;Ibn&nbsp;Nasih,&nbsp;Bab&nbsp;al-Qibla,&nbsp;and&nbsp;Bab&nbsp;al-Bahr.&quot;&nbsp;It&nbsp;was&nbsp;built&nbsp;before&nbsp;the&nbsp;5th&nbsp;century&nbsp;AH&nbsp;(11th&nbsp;century&nbsp;CE).&nbsp;Its&nbsp;shape&nbsp;is&nbsp;square,&nbsp;measuring&nbsp;8&nbsp;meters&nbsp;in&nbsp;length,&nbsp;with&nbsp;a&nbsp;covered&nbsp;ground&nbsp;floor&nbsp;and&nbsp;an&nbsp;open&nbsp;upper&nbsp;floor.&nbsp;Conflicting&nbsp;accounts&nbsp;and&nbsp;legends&nbsp;surround&nbsp;this&nbsp;tower&nbsp;and&nbsp;its&nbsp;unusual&nbsp;name,&nbsp;which&nbsp;leans&nbsp;more&nbsp;towards&nbsp;myth&nbsp;and&nbsp;fantasy&nbsp;than&nbsp;reality.</p><p></p><p><strong>The&nbsp;Wadi&nbsp;Fadda&nbsp;Dam</strong></p><p>This&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;most&nbsp;famous&nbsp;and&nbsp;oldest&nbsp;dams&nbsp;in&nbsp;Algeria.&nbsp;Its&nbsp;construction&nbsp;dates&nbsp;back&nbsp;to&nbsp;1932,&nbsp;built&nbsp;by&nbsp;Algerian&nbsp;hands&nbsp;under&nbsp;orders&nbsp;from&nbsp;the&nbsp;French&nbsp;occupiers.&nbsp;The&nbsp;dam&nbsp;irrigates&nbsp;numerous&nbsp;orchards&nbsp;located&nbsp;along&nbsp;a&nbsp;long&nbsp;stretch&nbsp;of&nbsp;its&nbsp;eastern&nbsp;bank.&nbsp;It&nbsp;attracts&nbsp;many&nbsp;families&nbsp;and&nbsp;visitors&nbsp;from&nbsp;the&nbsp;provinces&nbsp;near&nbsp;Chlef,&nbsp;as&nbsp;well&nbsp;as&nbsp;tourists&nbsp;from&nbsp;around&nbsp;the&nbsp;world,&nbsp;who&nbsp;come&nbsp;to&nbsp;enjoy&nbsp;their&nbsp;time&nbsp;there.&nbsp;The&nbsp;embrace&nbsp;of&nbsp;breathtaking&nbsp;nature&nbsp;and&nbsp;beautiful&nbsp;views,&nbsp;in&nbsp;addition&nbsp;to&nbsp;the&nbsp;gushing&nbsp;springs&nbsp;surrounding&nbsp;the&nbsp;dam,&nbsp;add&nbsp;to&nbsp;its&nbsp;charm.</p><p></p><p><strong>The&nbsp;National&nbsp;Public&nbsp;Museum</strong></p><p>This&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;most&nbsp;important&nbsp;tourist&nbsp;attractions&nbsp;in&nbsp;the&nbsp;Chlef&nbsp;province.&nbsp;Strategically&nbsp;located&nbsp;near&nbsp;the&nbsp;city&nbsp;center,&nbsp;it&nbsp;houses&nbsp;many&nbsp;important&nbsp;ancient&nbsp;artifacts,&nbsp;handcrafted&nbsp;heritage&nbsp;items,&nbsp;and&nbsp;traditional&nbsp;arts.&nbsp;Numerous&nbsp;economic,&nbsp;recreational,&nbsp;and&nbsp;cultural&nbsp;events&nbsp;and&nbsp;celebrations&nbsp;are&nbsp;also&nbsp;held&nbsp;there,&nbsp;meticulously&nbsp;organized.</p><p></p><p><strong>The&nbsp;Phoenician&nbsp;Cemetery</strong></p><p>The&nbsp;mausoleum&nbsp;is&nbsp;situated&nbsp;along&nbsp;the&nbsp;sea,&nbsp;accessible&nbsp;via&nbsp;a&nbsp;concrete&nbsp;walkway&nbsp;dating&nbsp;back&nbsp;to&nbsp;the&nbsp;colonial&nbsp;period.&nbsp;This&nbsp;is&nbsp;due&nbsp;to&nbsp;its&nbsp;location&nbsp;on&nbsp;a&nbsp;rocky&nbsp;outcrop&nbsp;overlooking&nbsp;the&nbsp;sea.&nbsp;The&nbsp;cemetery&nbsp;contains&nbsp;approximately&nbsp;60&nbsp;tombs,&nbsp;each&nbsp;distinct&nbsp;from&nbsp;the&nbsp;others&nbsp;according&nbsp;to&nbsp;its&nbsp;natural&nbsp;setting.&nbsp;It&nbsp;covers&nbsp;an&nbsp;area&nbsp;of&nbsp;​​5&nbsp;hectares,&nbsp;and&nbsp;the&nbsp;tombs&nbsp;date&nbsp;back&nbsp;to&nbsp;the&nbsp;6th&nbsp;and&nbsp;7th&nbsp;centuries&nbsp;BC.</p><p></p><p><strong>The&nbsp;Arsunaria&nbsp;Archaeological&nbsp;Site</strong></p><p>The&nbsp;Arsunaria&nbsp;archaeological&nbsp;site&nbsp;is&nbsp;located&nbsp;south&nbsp;of&nbsp;El-Kalta,&nbsp;4&nbsp;kilometers&nbsp;from&nbsp;the&nbsp;municipality&nbsp;of&nbsp;El-Marsa.&nbsp;It&nbsp;covers&nbsp;an&nbsp;area&nbsp;of&nbsp;​​approximately&nbsp;15&nbsp;hectares,&nbsp;according&nbsp;to&nbsp;the&nbsp;official&nbsp;geographical&nbsp;definition&nbsp;prepared&nbsp;by&nbsp;the&nbsp;technical&nbsp;team&nbsp;of&nbsp;the&nbsp;Ministry&nbsp;of&nbsp;Culture:&nbsp;Natural&nbsp;Boundaries&nbsp;of&nbsp;the&nbsp;Elements&nbsp;The&nbsp;phenomenon,&nbsp;visible&nbsp;on&nbsp;the&nbsp;surface&nbsp;of&nbsp;the&nbsp;archaeological&nbsp;site,&nbsp;is&nbsp;estimated&nbsp;in&nbsp;archaeological&nbsp;and&nbsp;historical&nbsp;references&nbsp;to&nbsp;cover&nbsp;approximately&nbsp;40&nbsp;hectares,&nbsp;located&nbsp;in&nbsp;six&nbsp;locations&nbsp;west&nbsp;of&nbsp;the&nbsp;city&nbsp;of&nbsp;Ténès.&nbsp;According&nbsp;to&nbsp;the&nbsp;Antonine&nbsp;route,&nbsp;the&nbsp;town&nbsp;of&nbsp;Arsonaria&nbsp;was&nbsp;located&nbsp;59&nbsp;km&nbsp;from&nbsp;the&nbsp;city.&nbsp;The&nbsp;Roman&nbsp;town&nbsp;of&nbsp;El-Kouiza&nbsp;(Mostaganem)&nbsp;is&nbsp;located&nbsp;41&nbsp;km&nbsp;east&nbsp;of&nbsp;the&nbsp;present-day&nbsp;city&nbsp;of&nbsp;Ténès.</p><p></p><p>Bir&nbsp;Djenneb,&nbsp;or&nbsp;&quot;Bir&nbsp;El-Jenn&quot;&nbsp;(Well&nbsp;of&nbsp;the&nbsp;Jinn),&nbsp;is&nbsp;located&nbsp;in&nbsp;the&nbsp;municipality&nbsp;of&nbsp;Boukadir,&nbsp;Chlef&nbsp;Province,&nbsp;as&nbsp;it&nbsp;is&nbsp;locally&nbsp;known.&nbsp;It&nbsp;holds&nbsp;secrets&nbsp;related&nbsp;to&nbsp;this&nbsp;place,&nbsp;particularly&nbsp;concerning&nbsp;its&nbsp;historical&nbsp;and&nbsp;geological&nbsp;aspects.&nbsp;This&nbsp;well,&nbsp;which&nbsp;is&nbsp;approximately&nbsp;30&nbsp;meters&nbsp;in&nbsp;diameter&nbsp;and&nbsp;of&nbsp;unknown&nbsp;depth,&nbsp;is&nbsp;believed&nbsp;by&nbsp;eyewitnesses&nbsp;to&nbsp;the&nbsp;French&nbsp;occupation&nbsp;army&nbsp;throwing&nbsp;live&nbsp;resistance&nbsp;fighters&nbsp;into&nbsp;it,&nbsp;whose&nbsp;remains&nbsp;are&nbsp;thought&nbsp;to&nbsp;still&nbsp;lie&nbsp;at&nbsp;the&nbsp;bottom.</p><p></p><p><strong>Sidi&nbsp;Merouane&nbsp;Lighthouse</strong></p><p></p><p>The&nbsp;Sidi&nbsp;Merouane&nbsp;Lighthouse&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;oldest&nbsp;and&nbsp;most&nbsp;famous&nbsp;lighthouses&nbsp;in&nbsp;Algeria.&nbsp;Built&nbsp;in&nbsp;1861&nbsp;on&nbsp;the&nbsp;slopes&nbsp;of&nbsp;Mount&nbsp;Sidi&nbsp;Merouane,&nbsp;east&nbsp;of&nbsp;the&nbsp;port&nbsp;of&nbsp;Ténès,&nbsp;it&nbsp;rises&nbsp;approximately&nbsp;100&nbsp;meters&nbsp;above&nbsp;sea&nbsp;level.</p><p></p><p>The&nbsp;lighthouse&nbsp;is&nbsp;a&nbsp;historical&nbsp;landmark&nbsp;that&nbsp;continues&nbsp;to&nbsp;guide&nbsp;ships&nbsp;passing&nbsp;through&nbsp;the&nbsp;Mediterranean&nbsp;Sea,&nbsp;attracting&nbsp;tourists&nbsp;from&nbsp;all&nbsp;over&nbsp;the&nbsp;world.</p><p></p><p>To&nbsp;reach&nbsp;the&nbsp;lighthouse,&nbsp;one&nbsp;must&nbsp;travel&nbsp;along&nbsp;the&nbsp;winding&nbsp;coastal&nbsp;road&nbsp;of&nbsp;Mount&nbsp;Sidi&nbsp;Merouane,&nbsp;where&nbsp;the&nbsp;azure&nbsp;sea&nbsp;meets&nbsp;the&nbsp;verdant&nbsp;forests&nbsp;in&nbsp;a&nbsp;breathtaking&nbsp;and&nbsp;unparalleled&nbsp;scene.&nbsp;Ras&nbsp;Tinnis&nbsp;Lighthouse</p><p></p><p>This&nbsp;is&nbsp;the&nbsp;most&nbsp;famous&nbsp;and&nbsp;oldest&nbsp;historical&nbsp;site&nbsp;located&nbsp;in&nbsp;the&nbsp;heart&nbsp;of&nbsp;Chlef&nbsp;Province.&nbsp;Its&nbsp;construction&nbsp;dates&nbsp;back&nbsp;to&nbsp;1865&nbsp;during&nbsp;the&nbsp;French&nbsp;colonial&nbsp;period.&nbsp;The&nbsp;lighthouse&nbsp;is&nbsp;distinguished&nbsp;by&nbsp;its&nbsp;design&nbsp;and&nbsp;architectural&nbsp;columns,&nbsp;built&nbsp;in&nbsp;the&nbsp;French&nbsp;style.&nbsp;To&nbsp;this&nbsp;day,&nbsp;the&nbsp;lighthouse&nbsp;monitors&nbsp;maritime&nbsp;traffic&nbsp;and&nbsp;sends&nbsp;guidance&nbsp;to&nbsp;ships.&nbsp;It&nbsp;has&nbsp;also&nbsp;been&nbsp;a&nbsp;destination&nbsp;for&nbsp;many&nbsp;famous&nbsp;figures,&nbsp;including&nbsp;Joseph&nbsp;Stalin,&nbsp;the&nbsp;first&nbsp;leader&nbsp;of&nbsp;the&nbsp;Soviet&nbsp;Union,&nbsp;in&nbsp;1950.</p><p><strong>Dar&nbsp;El&nbsp;Baroud&nbsp;in&nbsp;the&nbsp;center&nbsp;of&nbsp;Chlef</strong></p><p>Dar&nbsp;El&nbsp;Baroud&nbsp;is&nbsp;a&nbsp;historical&nbsp;landmark&nbsp;located&nbsp;in&nbsp;the&nbsp;heart&nbsp;of&nbsp;Chlef,&nbsp;near&nbsp;the&nbsp;current&nbsp;town&nbsp;hall.&nbsp;It&nbsp;was&nbsp;built&nbsp;in&nbsp;1847&nbsp;on&nbsp;the&nbsp;ruins&nbsp;of&nbsp;a&nbsp;Roman&nbsp;well,&nbsp;by&nbsp;order&nbsp;of&nbsp;Eugène&nbsp;Cavaignac,&nbsp;the&nbsp;governor&nbsp;of&nbsp;Algiers&nbsp;at&nbsp;the&nbsp;time,&nbsp;and&nbsp;was&nbsp;used&nbsp;as&nbsp;an&nbsp;arms&nbsp;and&nbsp;ammunition&nbsp;depot.</p><p></p><p>The&nbsp;Dar&nbsp;El&nbsp;Baroud&nbsp;building&nbsp;is&nbsp;now&nbsp;a&nbsp;history&nbsp;museum,&nbsp;distinguished&nbsp;by&nbsp;its&nbsp;cylindrical&nbsp;shape.&nbsp;It&nbsp;contains&nbsp;historical&nbsp;artifacts&nbsp;dating&nbsp;back&nbsp;to&nbsp;prehistoric&nbsp;times&nbsp;and&nbsp;rare&nbsp;Roman&nbsp;mosaic&nbsp;panels.&nbsp;It&nbsp;also&nbsp;houses&nbsp;several&nbsp;handcrafted&nbsp;and&nbsp;traditional&nbsp;artifacts&nbsp;that&nbsp;tell&nbsp;the&nbsp;history&nbsp;of&nbsp;the&nbsp;city&nbsp;of&nbsp;Chlef&nbsp;(modern-day&nbsp;El&nbsp;Asnam).</p><p></p><p></p>', '<p class=\"ql-align-right\">تقع&nbsp;ولاية&nbsp;الشلف&nbsp;بين&nbsp;مدينة&nbsp;الجزائر&nbsp;ومدينة&nbsp;وهران،&nbsp;وهذا&nbsp;جعل&nbsp;منها&nbsp;منطقة&nbsp;اقتصادية&nbsp;مهمة&nbsp;للبلاد&nbsp;وأيضاً&nbsp;لامتلاكها&nbsp;عدة&nbsp;موانئ&nbsp;مهمة&nbsp;للمنطقة،&nbsp;مثل&nbsp;ميناء&nbsp;سيدي&nbsp;عبدالرحمن&nbsp;وميناء&nbsp;تنس&nbsp;والمرسى،&nbsp;والأهم&nbsp;هو&nbsp;وجود&nbsp;مطار&nbsp;أبو&nbsp;بكر&nbsp;بلقايد&nbsp;فيها،&nbsp;كما&nbsp;وتتمتع&nbsp;المدينة&nbsp;بطابع&nbsp;فلاحي&nbsp;عريق&nbsp;يحتل&nbsp;مساحة&nbsp;263&nbsp;هكتاراً،&nbsp;بالإضافة&nbsp;إلى&nbsp;تنوّع&nbsp;جغرافيتها&nbsp;وتضاريسها&nbsp;من&nbsp;حيث&nbsp;الجبال&nbsp;والسهول&nbsp;والشلالات&nbsp;والشواطئ&nbsp;الواسعة&nbsp;والمتعددة،&nbsp;وهذا&nbsp;ما&nbsp;جعل&nbsp;منها&nbsp;وجهة&nbsp;سياحية&nbsp;هامة&nbsp;يوجد&nbsp;فيها&nbsp;مختلف&nbsp;الأشكال&nbsp;كالسياحة&nbsp;الترفيهية&nbsp;والتاريخية&nbsp;والبيئية.</p><p class=\"ql-align-right\"><strong>المقومات&nbsp;السياحية:</strong></p><p class=\"ql-align-right\"><strong>برج&nbsp;الغولة</strong></p><p class=\"ql-align-right\">برج&nbsp;الغولة&nbsp;معلم&nbsp;تاريخي&nbsp;من&nbsp;أهم&nbsp;اجزاء&nbsp;مدينة&nbsp;تنس&nbsp;العريقة&nbsp;،يشرف&nbsp;على&nbsp;الواجهة&nbsp;الغابية&nbsp;لجبل&nbsp;قيصر&nbsp;و&nbsp;يطل&nbsp;على&nbsp;واد&nbsp;علالة&nbsp;،&nbsp;يعتبر&nbsp;البرج&nbsp;كموقع&nbsp;دفاعي&nbsp;يراقب&nbsp;التحركات&nbsp;خارج&nbsp;أسوار&nbsp;المدينة&nbsp;و&nbsp;هو&nbsp;أحد&nbsp;أبوابها&nbsp;الخمسة&nbsp;:</p><p class=\"ql-align-right\">”&nbsp;باب&nbsp;الخوخة&nbsp;،&nbsp;باب&nbsp;أبن&nbsp;ناصح&nbsp;،&nbsp;باب&nbsp;القبلة&nbsp;،&nbsp;باب&nbsp;البحر&nbsp;شيد&nbsp;قبل&nbsp;القرن&nbsp;5&nbsp;ه&nbsp;،&nbsp;أشكاله&nbsp;مربع&nbsp;بطول&nbsp;08&nbsp;م&nbsp;بطابق&nbsp;أرضي&nbsp;مغطى&nbsp;و&nbsp;طابق&nbsp;علوي&nbsp;مكشوف&nbsp;تضاربت&nbsp;الرويات&nbsp;و&nbsp;الأساطير&nbsp;المنقولة&nbsp;عن&nbsp;هذا&nbsp;البرج&nbsp;و&nbsp;تسميته&nbsp;الغريبة&nbsp;و&nbsp;التي&nbsp;تميل&nbsp;إلى&nbsp;الخرافة&nbsp;و&nbsp;الخيال&nbsp;أكثر&nbsp;منها&nbsp;إلى&nbsp;الواقع&nbsp;.</p><p class=\"ql-align-right\"><strong>سد&nbsp;وادي&nbsp;فضة</strong></p><p class=\"ql-align-right\">وهو&nbsp;أحد&nbsp;أشهر&nbsp;وأقدم&nbsp;السدود&nbsp;الموجودة&nbsp;في&nbsp;الجزائر،&nbsp;إذ&nbsp;يعود&nbsp;تاريخ&nbsp;تأسيسه&nbsp;إلى&nbsp;سنة&nbsp;1932،&nbsp;وتم&nbsp;تشييده&nbsp;بأيدي&nbsp;جزائرية&nbsp;تحت&nbsp;أوامر&nbsp;المحتل&nbsp;الفرنسي،&nbsp;ويسقي&nbsp;هذا&nbsp;السد&nbsp;العديد&nbsp;من&nbsp;البساتين&nbsp;الواقعة&nbsp;على&nbsp;مساحات&nbsp;طويلة&nbsp;على&nbsp;الجهة&nbsp;الشرقية&nbsp;منه،&nbsp;ويستقطب&nbsp;هذا&nbsp;السد&nbsp;الكثير&nbsp;من&nbsp;العائلات&nbsp;والزوار&nbsp;القاطنين&nbsp;في&nbsp;الولايات&nbsp;القريبة&nbsp;من&nbsp;ولاية&nbsp;الشلف،&nbsp;بالإضافة&nbsp;إلى&nbsp;السياح&nbsp;القادمين&nbsp;من&nbsp;مختلف&nbsp;دول&nbsp;العالم؛&nbsp;لقضاء&nbsp;أوقات&nbsp;ممتعة&nbsp;بين&nbsp;أحضان&nbsp;الطبيعة&nbsp;الخلابة&nbsp;والإطلالات&nbsp;الجميلة،&nbsp;بالإضافة&nbsp;إلى&nbsp;وجود&nbsp;عيون&nbsp;الماء&nbsp;المنفجرة&nbsp;حول&nbsp;السد&nbsp;لتضيف&nbsp;جمالاً&nbsp;آخراً&nbsp;إليه.</p><p class=\"ql-align-right\"><strong>المتحف&nbsp;العمومي&nbsp;الوطني</strong></p><p class=\"ql-align-right\">وهو&nbsp;أهم&nbsp;الأماكن&nbsp;السياحية&nbsp;الموجودة&nbsp;في&nbsp;ولاية&nbsp;الشلف،&nbsp;حيث&nbsp;يقع&nbsp;في&nbsp;مكان&nbsp;استراتيجي&nbsp;قرب&nbsp;مركز&nbsp;المدينة،&nbsp;ويحتوي&nbsp;على&nbsp;الكثير&nbsp;من&nbsp;القطع&nbsp;الأثرية&nbsp;القديمة&nbsp;المهمة&nbsp;والمصنوعات&nbsp;التراثية&nbsp;اليدوية&nbsp;والفنون&nbsp;التقليدية،&nbsp;كما&nbsp;وتقام&nbsp;العديد&nbsp;من&nbsp;الاحتفالات&nbsp;والفعاليات&nbsp;الاقتصادية&nbsp;والترفيهية&nbsp;والثقافية&nbsp;تُنظم&nbsp;بشكل&nbsp;متقن.</p><p class=\"ql-align-right\"><strong>المقبرة&nbsp;الفينيقية</strong></p><p class=\"ql-align-right\">قع&nbsp;الضريح&nbsp;بمحاذاة&nbsp;البحر&nbsp;حيث&nbsp;أن&nbsp;الوصول&nbsp;إليه&nbsp;يكون&nbsp;عبر&nbsp;ممر&nbsp;مبني&nbsp;بالإسمنت&nbsp;منذ&nbsp;الفترة&nbsp;الاستعمارية&nbsp;و&nbsp;هذا&nbsp;نظرا&nbsp;لوجوده&nbsp;بصخرة&nbsp;بحرية&nbsp;محفورة&nbsp;في&nbsp;الجهة&nbsp;المطلة&nbsp;على&nbsp;البحر،&nbsp;تحتوي&nbsp;المقبرة&nbsp;على&nbsp;مجموعة&nbsp;من&nbsp;القبور&nbsp;حوالي&nbsp;60&nbsp;قبر&nbsp;متميزة&nbsp;عن&nbsp;بعضها&nbsp;البعض&nbsp;حسب&nbsp;المنطقة&nbsp;الطبيعية&nbsp;الموجودة&nbsp;بها&nbsp;التي&nbsp;تمتد&nbsp;على&nbsp;مساحة&nbsp;5&nbsp;هكتار&nbsp;حيث&nbsp;تعود&nbsp;فترة&nbsp;استعمال&nbsp;هذه&nbsp;القبور&nbsp;إلى&nbsp;القرنين&nbsp;السادس&nbsp;و&nbsp;السابع&nbsp;قبل&nbsp;الميلاد،</p><p class=\"ql-align-right\"><strong>موقع&nbsp;ارسوناريا&nbsp;الأثري</strong></p><p class=\"ql-align-right\">يقع&nbsp;موقع&nbsp;ارسوناريا&nbsp;الأثري&nbsp;جنوب&nbsp;القلطة&nbsp;على&nbsp;بعد&nbsp;4&nbsp;كيلومترات&nbsp;من&nbsp;بلدية&nbsp;المرسى&nbsp;التي&nbsp;تبلغ&nbsp;مساحتها&nbsp;حوالي&nbsp;15&nbsp;هكتاراً&nbsp;حسب&nbsp;التعريف&nbsp;الجغرافي&nbsp;الذي&nbsp;أعده&nbsp;الفريق&nbsp;الفني&nbsp;بوزارة&nbsp;الثقافة&nbsp;رسمياً:&nbsp;الحدود&nbsp;الطبيعية&nbsp;للعناصر&nbsp;الظاهرة&nbsp;على&nbsp;سطح&nbsp;الأرض&nbsp;في&nbsp;الموقع&nbsp;الأثري&nbsp;،&nbsp;وتقدر&nbsp;في&nbsp;المراجع&nbsp;الأثرية&nbsp;والتاريخية&nbsp;بنحو&nbsp;40&nbsp;هكتاراً&nbsp;تقع&nbsp;في&nbsp;06&nbsp;أماكن&nbsp;غرب&nbsp;مدينة&nbsp;التنس.&nbsp;وفقًا&nbsp;للطريق&nbsp;الأنطوني&nbsp;،&nbsp;تم&nbsp;تحديد&nbsp;بلدة&nbsp;Arsonaria&nbsp;على&nbsp;مسافة&nbsp;59&nbsp;كم&nbsp;من&nbsp;المدينة</p><p class=\"ql-align-right\">الكويزة&nbsp;الرومانية&nbsp;(مستغانم)&nbsp;هي&nbsp;غرباء&nbsp;،&nbsp;على&nbsp;بعد&nbsp;41&nbsp;كم&nbsp;شرق&nbsp;مدينة&nbsp;كارتينا&nbsp;التنس&nbsp;حاليًا.</p><p class=\"ql-align-right\"><strong>بئر&nbsp;جنب”&nbsp;أو&nbsp;“بئر&nbsp;الجن”</strong></p><p class=\"ql-align-right\">يقع&nbsp;بئر&nbsp;الجنب&nbsp;ببلدية&nbsp;بوقادير&nbsp;ولاية&nbsp;الشلف&nbsp;،&nbsp;كما&nbsp;يسمّى&nbsp;محليًا،&nbsp;يتمتع&nbsp;بأسرار&nbsp;و&nbsp;المتعلقة&nbsp;بهذا&nbsp;المكان&nbsp;لاسيما&nbsp;فيما&nbsp;يتعلق&nbsp;بالجانبين&nbsp;التاريخي&nbsp;والجيولوجي،&nbsp;.هذا&nbsp;البئر&nbsp;الذي&nbsp;قطره&nbsp;يقارب&nbsp;30&nbsp;متر&nbsp;و&nbsp;عمق&nbsp;غير&nbsp;معروف&nbsp;لحد&nbsp;الان.حسب&nbsp;شهادات&nbsp;حية&nbsp;.قام&nbsp;جيش&nbsp;الاحتلال&nbsp;الفرنسي&nbsp;برمي&nbsp;فيه&nbsp;محاهدين&nbsp;أحياء&nbsp;يعتقد&nbsp;أن&nbsp;رفاتهم&nbsp;مزالوا&nbsp;في&nbsp;الأسفل.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\"><strong>منارة&nbsp;سيدي&nbsp;مروان&nbsp;البحرية</strong></p><p class=\"ql-align-right\">تعد&nbsp;منارة&nbsp;سيدي&nbsp;مروان&nbsp;من&nbsp;اقدم&nbsp;و&nbsp;اشهر&nbsp;منارة&nbsp;بحرية&nbsp;في&nbsp;الجزائر،&nbsp;حيث&nbsp;بنيت&nbsp;سنة&nbsp;1861&nbsp;م&nbsp;على&nbsp;سفح&nbsp;جبل&nbsp;سيدي&nbsp;مروان&nbsp;شرق&nbsp;ميناء&nbsp;تنس،&nbsp;و&nbsp;تعلو&nbsp;عن&nbsp;البحر&nbsp;حوالي&nbsp;100&nbsp;متر.</p><p class=\"ql-align-right\">المنارة&nbsp;هي&nbsp;عبارة&nbsp;عن&nbsp;معلم&nbsp;تاريخي،&nbsp;لا&nbsp;يزال&nbsp;ينير&nbsp;الدرب&nbsp;للسفن&nbsp;المارة&nbsp;في&nbsp;البحر&nbsp;الأبيض&nbsp;المتوسط،&nbsp;و&nbsp;التي&nbsp;تجلب&nbsp;السياح&nbsp;من&nbsp;كل&nbsp;الارجاء.</p><p class=\"ql-align-right\">للوصول&nbsp;إلى&nbsp;المنارة&nbsp;يتطلب&nbsp;الامر&nbsp;المرور&nbsp;بالطريق&nbsp;الساحلي&nbsp;المتعرج&nbsp;في&nbsp;جبل&nbsp;سيدي&nbsp;مروان،&nbsp;حيث&nbsp;تلتقي&nbsp;زرقة&nbsp;البحر&nbsp;و&nbsp;خضرة&nbsp;الغابات&nbsp;في&nbsp;مشهد&nbsp;خلاب&nbsp;لا&nbsp;مثيل&nbsp;له.</p><p class=\"ql-align-right\"><strong>منارة&nbsp;رأس&nbsp;تنيس</strong></p><p class=\"ql-align-right\">وهي&nbsp;أشهر&nbsp;وأقدم&nbsp;الأماكن&nbsp;التاريخية&nbsp;الواقعة&nbsp;في&nbsp;قلب&nbsp;ولاية&nbsp;الشلف،&nbsp;إذ&nbsp;يرجع&nbsp;تاريخ&nbsp;تأسيسها&nbsp;إلى&nbsp;سنة&nbsp;1865&nbsp;زمن&nbsp;الاستعمار&nbsp;الفرنسي،&nbsp;كما&nbsp;وتتميز&nbsp;المنارة&nbsp;بتصميمها&nbsp;وأعمدتها&nbsp;الهندسية&nbsp;المؤسسة&nbsp;على&nbsp;الطراز&nbsp;الفرنسي،&nbsp;وحتى&nbsp;هذا&nbsp;اليوم&nbsp;فتقوم&nbsp;المنارة&nbsp;بمراقبة&nbsp;حركات&nbsp;الملاحة&nbsp;وإرسال&nbsp;الإرشادات&nbsp;إلى&nbsp;السفن،&nbsp;بالإضافة&nbsp;إلى&nbsp;أنها&nbsp;كانت&nbsp;وجهة&nbsp;للكثير&nbsp;من&nbsp;الشخصيات&nbsp;المعروفة&nbsp;مثل&nbsp;جوزيف&nbsp;ستالين&nbsp;الرئيس&nbsp;الأول&nbsp;للاتحاد&nbsp;السوفيتي&nbsp;في&nbsp;سنة&nbsp;1950.</p><p class=\"ql-align-right\"><strong>دار&nbsp;البارود&nbsp;في&nbsp;وسط&nbsp;مدينة&nbsp;الشلف</strong></p><p class=\"ql-align-right\">دار&nbsp;البارود&nbsp;هي&nbsp;معلم&nbsp;تاريخي&nbsp;يقع&nbsp;في&nbsp;قلب&nbsp;مدينة&nbsp;الشلف،&nbsp;بالقرب&nbsp;من&nbsp;دار&nbsp;البلدية&nbsp;الحالية&nbsp;،&nbsp;حيث&nbsp;تم&nbsp;بناؤه&nbsp;في&nbsp;سنة&nbsp;1847&nbsp;م&nbsp;على&nbsp;أنقاض&nbsp;بئر&nbsp;رومانية،&nbsp;بأمر&nbsp;من&nbsp;“اوجين&nbsp;كافينياك”&nbsp;حاكم&nbsp;الجزائر&nbsp;في&nbsp;ذلك&nbsp;الفترة،&nbsp;و&nbsp;الذي&nbsp;تم&nbsp;استخدامه&nbsp;كمستودع&nbsp;للاسلحة&nbsp;و&nbsp;الذخيرة.</p><p class=\"ql-align-right\">مبنى&nbsp;دار&nbsp;البارود&nbsp;هو&nbsp;الآن&nbsp;عبارة&nbsp;عن&nbsp;متحف&nbsp;للتاريخ،&nbsp;يتميز&nbsp;بشكله&nbsp;الاسطواني.&nbsp;و&nbsp;يحوي&nbsp;قطعا&nbsp;أثرية&nbsp;تاريخية&nbsp;تعود&nbsp;الى&nbsp;عصور&nbsp;ما&nbsp;قبل&nbsp;التاريخ&nbsp;و&nbsp;لوحات&nbsp;فسيفسائية&nbsp;رومانية&nbsp;نادرة،&nbsp;كما&nbsp;يضم&nbsp;عدة&nbsp;تحف&nbsp;يدوية&nbsp;و&nbsp;تقليدية&nbsp;تروي&nbsp;تاريخ&nbsp;مدينة&nbsp;الأصنام&nbsp;الشلف&nbsp;حاليا</p><p class=\"ql-align-right\"><strong>دار&nbsp;القاضي&nbsp;في&nbsp;مجاجة&nbsp;شمال&nbsp;مدينة&nbsp;الشلف</strong></p><p class=\"ql-align-right\">هي&nbsp;عبارة&nbsp;عن&nbsp;جوهرة&nbsp;تاريخية&nbsp;نادرة،&nbsp;تتميز&nbsp;بنمطها&nbsp;المعماري&nbsp;الإسلامي&nbsp;العثماني،&nbsp;تقع&nbsp;في&nbsp;بلدية&nbsp;الأبيض&nbsp;مجاجة&nbsp;بنيت&nbsp;في&nbsp;القرن&nbsp;الماضي،&nbsp;اي&nbsp;خلال&nbsp;عهد&nbsp;الاستعمار&nbsp;الفرنسي،&nbsp;وقد&nbsp;سمي&nbsp;الدار&nbsp;بهذا&nbsp;الاسم&nbsp;نسبة&nbsp;الى&nbsp;شخصية&nbsp;القاضي&nbsp;سايح&nbsp;سي&nbsp;محمد&nbsp;بن&nbsp;هني،&nbsp;الذي&nbsp;شغل&nbsp;عدة&nbsp;مناصب&nbsp;في&nbsp;مدينة&nbsp;الشلف&nbsp;من&nbsp;أهم&nbsp;القضاء،&nbsp;حيث&nbsp;اشتهر&nbsp;نزاهته&nbsp;وعدالته.</p><p class=\"ql-align-right\">تتكون&nbsp;دار&nbsp;القاضي&nbsp;من&nbsp;صحن&nbsp;يتوسطها،&nbsp;حيث&nbsp;تنتظم&nbsp;من&nbsp;حولها&nbsp;الغرف،&nbsp;مع&nbsp;وجود&nbsp;اعمدة&nbsp;رخامية&nbsp;متوجة،&nbsp;تصطف&nbsp;حول&nbsp;الحصن&nbsp;ما&nbsp;يعطي&nbsp;جمالا&nbsp;و&nbsp;رونقا،&nbsp;يشبه&nbsp;كثيرا&nbsp;القصور&nbsp;الموجودة&nbsp;قصبة&nbsp;الجزائر.</p><p class=\"ql-align-right\">الغابات&nbsp;الرائعة&nbsp;لولاية&nbsp;الشلف</p><p class=\"ql-align-right\">يوجد&nbsp;في&nbsp;شلف&nbsp;عدة&nbsp;غابات&nbsp;خضراء&nbsp;تعتبر&nbsp;متنفسا&nbsp;للزوار،&nbsp;و&nbsp;مكان&nbsp;لتمضية&nbsp;وقت&nbsp;ممتع&nbsp;مع&nbsp;الأطفال،&nbsp;حيث&nbsp;تعتبر&nbsp;من&nbsp;افضل&nbsp;الوجهات&nbsp;السياحية&nbsp;في&nbsp;الشلف،&nbsp;و&nbsp;من&nbsp;أهم&nbsp;هذه&nbsp;الغابات،&nbsp;غابة&nbsp;بيسة&nbsp;التي</p>', '/uploads/destinations/1771101848348-70694633.jpg', 4, 1, '100 000', '4.975', 'HOT', 'حار', 'spring (March to May)', 'الربيع (من مارس إلى مايو)', '--', '--', 'classic codes of western Algerian culture', 'القواعد الكلاسيكية للثقافة الجزائرية الغربية', '--', '--', 1),
(3, 'Laghouat', 'الأغواط', '<p></p>', '<p></p>', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop', 5, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(4, 'Oum El Bouaghi', 'أم البواقي', '<p></p>', '<p></p>', 'https://images.unsplash.com/photo-1590076083220-8e12f9f8d6b7?w=600&h=400&fit=crop', 6, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(5, 'Batna', 'باتنة', '<p></p>', '<p></p>', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop', 7, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(6, 'Béjaïa', 'بجاية', '<p></p>', '<p></p>', 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=600&h=400&fit=crop', 9, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(7, 'Biskra', 'بسكرة', '<p>The&nbsp;province&nbsp;is&nbsp;nicknamed&nbsp;the&nbsp;Bride&nbsp;of&nbsp;the&nbsp;Ziban&nbsp;and&nbsp;the&nbsp;Gateway&nbsp;to&nbsp;the&nbsp;Sahara.</p><p></p><p>Biskra…&nbsp;Bride&nbsp;of&nbsp;the&nbsp;Ziban&nbsp;and&nbsp;Gateway&nbsp;to&nbsp;the&nbsp;Sahara</p><p>At&nbsp;the&nbsp;first&nbsp;embrace&nbsp;between&nbsp;the&nbsp;palm&nbsp;trees&nbsp;and&nbsp;the&nbsp;sand,&nbsp;Biskra&nbsp;welcomes&nbsp;you&nbsp;with&nbsp;the&nbsp;smile&nbsp;of&nbsp;the&nbsp;sun&nbsp;and&nbsp;the&nbsp;warmth&nbsp;of&nbsp;the&nbsp;desert.&nbsp;Here,&nbsp;in&nbsp;southeastern&nbsp;Algeria,&nbsp;the&nbsp;gateway&nbsp;to&nbsp;the&nbsp;Sahara&nbsp;opens&nbsp;its&nbsp;arms&nbsp;to&nbsp;visitors&nbsp;seeking&nbsp;tranquility,&nbsp;authenticity,&nbsp;and&nbsp;a&nbsp;unique&nbsp;experience&nbsp;unlike&nbsp;any&nbsp;other.</p><p></p><p>Biskra&nbsp;is&nbsp;nicknamed&nbsp;the&nbsp;Bride&nbsp;of&nbsp;the&nbsp;Ziban,&nbsp;a&nbsp;city&nbsp;steeped&nbsp;in&nbsp;history&nbsp;that&nbsp;has,&nbsp;throughout&nbsp;the&nbsp;ages,&nbsp;served&nbsp;as&nbsp;a&nbsp;link&nbsp;between&nbsp;north&nbsp;and&nbsp;south,&nbsp;and&nbsp;a&nbsp;passage&nbsp;for&nbsp;civilizations&nbsp;and&nbsp;caravans.&nbsp;Its&nbsp;unique&nbsp;geographical&nbsp;location,&nbsp;at&nbsp;a&nbsp;low&nbsp;altitude,&nbsp;has&nbsp;given&nbsp;it&nbsp;a&nbsp;mild&nbsp;winter&nbsp;climate&nbsp;and&nbsp;made&nbsp;it&nbsp;a&nbsp;favorite&nbsp;destination&nbsp;for&nbsp;relaxation&nbsp;and&nbsp;rejuvenation.</p><p></p><p>Green&nbsp;Oases&nbsp;in&nbsp;the&nbsp;Heart&nbsp;of&nbsp;the&nbsp;Desert</p><p>Biskra&nbsp;is&nbsp;home&nbsp;to&nbsp;millions&nbsp;of&nbsp;palm&nbsp;trees&nbsp;that&nbsp;stretch&nbsp;out&nbsp;like&nbsp;a&nbsp;captivating&nbsp;natural&nbsp;canvas,&nbsp;and&nbsp;is&nbsp;world-renowned&nbsp;for&nbsp;producing&nbsp;Deglet&nbsp;Nour&nbsp;dates,&nbsp;the&nbsp;pearl&nbsp;of&nbsp;Algerian&nbsp;dates.&nbsp;A&nbsp;stroll&nbsp;through&nbsp;the&nbsp;oases&nbsp;is&nbsp;not&nbsp;just&nbsp;a&nbsp;walk,&nbsp;but&nbsp;a&nbsp;sensory&nbsp;experience&nbsp;that&nbsp;restores&nbsp;balance&nbsp;to&nbsp;the&nbsp;soul.&nbsp;Healing…&nbsp;From&nbsp;the&nbsp;Depths&nbsp;of&nbsp;the&nbsp;Earth</p><p></p><p>In&nbsp;Hammam&nbsp;Essalihine,&nbsp;warm&nbsp;mineral&nbsp;waters&nbsp;spring&nbsp;forth,&nbsp;carrying&nbsp;with&nbsp;them&nbsp;ancient&nbsp;therapeutic&nbsp;traditions&nbsp;that&nbsp;have&nbsp;made&nbsp;Biskra&nbsp;a&nbsp;destination&nbsp;for&nbsp;thermal&nbsp;tourism&nbsp;and&nbsp;natural&nbsp;relaxation,&nbsp;where&nbsp;therapy&nbsp;meets&nbsp;tranquility.</p><p></p><p>Historical&nbsp;Landmarks&nbsp;and&nbsp;the&nbsp;Spirit&nbsp;of&nbsp;the&nbsp;Place</p><p>From&nbsp;the&nbsp;Mosque&nbsp;and&nbsp;Mausoleum&nbsp;of&nbsp;Uqba&nbsp;ibn&nbsp;Nafi,&nbsp;which&nbsp;recounts&nbsp;the&nbsp;beginnings&nbsp;of&nbsp;the&nbsp;Islamic&nbsp;conquest,&nbsp;to&nbsp;the&nbsp;city&nbsp;of&nbsp;El&nbsp;Kantara,&nbsp;known&nbsp;as&nbsp;the&nbsp;&quot;Mouth&nbsp;of&nbsp;the&nbsp;Sahara&quot;&nbsp;for&nbsp;its&nbsp;Roman&nbsp;bridge&nbsp;and&nbsp;mud-brick&nbsp;architecture,&nbsp;and&nbsp;on&nbsp;to&nbsp;M&#39;Chouneche&nbsp;and&nbsp;the&nbsp;ruins&nbsp;of&nbsp;Tahouda,&nbsp;Biskra&nbsp;takes&nbsp;you&nbsp;on&nbsp;a&nbsp;journey&nbsp;through&nbsp;successive&nbsp;civilizations.</p><p></p><p>Biskra&nbsp;offers&nbsp;comprehensive&nbsp;tourism&nbsp;programs&nbsp;that&nbsp;combine&nbsp;oases,&nbsp;mineral&nbsp;baths,&nbsp;historical&nbsp;sites,&nbsp;and&nbsp;shopping&nbsp;in&nbsp;date&nbsp;and&nbsp;spice&nbsp;markets,&nbsp;within&nbsp;short&nbsp;trips&nbsp;or&nbsp;multi-day&nbsp;stays.</p><p></p><p>Biskra&nbsp;is&nbsp;not&nbsp;just&nbsp;a&nbsp;destination…&nbsp;it&nbsp;is&nbsp;warmth,&nbsp;sunshine,&nbsp;and&nbsp;the&nbsp;pulse&nbsp;of&nbsp;life&nbsp;in&nbsp;the&nbsp;heart&nbsp;of&nbsp;the&nbsp;desert.</p><p></p><p>Tourist&nbsp;Attractions:</p><p>Health&nbsp;and&nbsp;Wellness&nbsp;Tourism:&nbsp;Hammam&nbsp;Essalihine&nbsp;and&nbsp;Hammam&nbsp;El&nbsp;Barka&nbsp;in&nbsp;the&nbsp;municipality&nbsp;of&nbsp;El&nbsp;Hadjeb&nbsp;are&nbsp;among&nbsp;the&nbsp;most&nbsp;famous&nbsp;traditional&nbsp;thermal&nbsp;and&nbsp;wellness&nbsp;sites,&nbsp;attracting&nbsp;thousands&nbsp;of&nbsp;visitors&nbsp;annually&nbsp;for&nbsp;natural&nbsp;treatment&nbsp;and&nbsp;relaxation.&nbsp;Nature&nbsp;and&nbsp;Oasis&nbsp;Tourism:&nbsp;The&nbsp;province&nbsp;boasts&nbsp;over&nbsp;4.5&nbsp;million&nbsp;palm&nbsp;trees,&nbsp;and&nbsp;the&nbsp;oases&nbsp;of&nbsp;Biskra,&nbsp;Bordj&nbsp;Ben&nbsp;Azzouz,&nbsp;and&nbsp;Laghrous&nbsp;form&nbsp;a&nbsp;magnificent&nbsp;natural&nbsp;landscape,&nbsp;in&nbsp;addition&nbsp;to&nbsp;the&nbsp;Landon&nbsp;Gardens&nbsp;(built&nbsp;in&nbsp;1870)&nbsp;and&nbsp;the&nbsp;water&nbsp;parks.</p><p></p><p>Historical&nbsp;and&nbsp;Cultural&nbsp;Tourism:</p><p></p><p>o&nbsp;The&nbsp;Mosque&nbsp;of&nbsp;Uqba&nbsp;ibn&nbsp;Nafi:&nbsp;A&nbsp;masterpiece&nbsp;of&nbsp;Islamic&nbsp;architecture,&nbsp;it&nbsp;houses&nbsp;the&nbsp;tomb&nbsp;of&nbsp;the&nbsp;companion&nbsp;of&nbsp;the&nbsp;Prophet.</p><p></p><p>o&nbsp;El&nbsp;Kantara:&nbsp;Known&nbsp;as&nbsp;the&nbsp;Gateway&nbsp;to&nbsp;the&nbsp;Sahara&nbsp;or&nbsp;the&nbsp;Mouth&nbsp;of&nbsp;the&nbsp;Sahara,&nbsp;El&nbsp;Kantara&#39;s&nbsp;historical&nbsp;significance&nbsp;is&nbsp;evident&nbsp;in&nbsp;its&nbsp;strategic&nbsp;location,&nbsp;which&nbsp;made&nbsp;it&nbsp;an&nbsp;important&nbsp;cultural&nbsp;crossroads&nbsp;between&nbsp;north&nbsp;and&nbsp;south&nbsp;since&nbsp;ancient&nbsp;times.&nbsp;The&nbsp;Roman&nbsp;bridge&nbsp;stands&nbsp;out&nbsp;as&nbsp;the&nbsp;most&nbsp;important&nbsp;historical&nbsp;landmark,&nbsp;an&nbsp;architectural&nbsp;marvel&nbsp;built&nbsp;to&nbsp;cross&nbsp;the&nbsp;valley&nbsp;through&nbsp;a&nbsp;majestic&nbsp;rocky&nbsp;gorge.&nbsp;It&nbsp;still&nbsp;stands&nbsp;as&nbsp;a&nbsp;testament&nbsp;to&nbsp;the&nbsp;genius&nbsp;of&nbsp;Roman&nbsp;engineering.&nbsp;The&nbsp;landscape&nbsp;is&nbsp;completed&nbsp;by&nbsp;the&nbsp;remains&nbsp;of&nbsp;ancient&nbsp;buildings,&nbsp;traditional&nbsp;alleyways,&nbsp;and&nbsp;the&nbsp;red&nbsp;clay&nbsp;village,&nbsp;reflecting&nbsp;the&nbsp;harmony&nbsp;between&nbsp;humankind&nbsp;and&nbsp;the&nbsp;surrounding&nbsp;rocky&nbsp;landscape,&nbsp;giving&nbsp;El&nbsp;Kantara&nbsp;a&nbsp;distinctive&nbsp;historical&nbsp;and&nbsp;cultural&nbsp;character.</p>', '<p class=\"ql-align-right\">تلقب&nbsp;الولاية&nbsp;بعروس&nbsp;<u><a href=\"https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D8%B2%D8%A7%D8%A8_(%D8%A7%D9%84%D8%AC%D8%B2%D8%A7%D8%A6%D8%B1)\" rel=\"noopener noreferrer\" target=\"_blank\">الزيبان</a></u>&nbsp;وبوابة&nbsp;الصحراء&nbsp;الكبرى.</p><p class=\"ql-align-right\"><strong>بسكرة…&nbsp;عروس&nbsp;الزيبان&nbsp;وبوابة&nbsp;الصحراء</strong></p><p class=\"ql-align-right\">عند&nbsp;أول&nbsp;عناق&nbsp;بين&nbsp;النخيل&nbsp;والرمال،&nbsp;تستقبلك&nbsp;بسكرة&nbsp;بابتسامة&nbsp;الشمس&nbsp;ودفء&nbsp;الصحراء.&nbsp;هنا،&nbsp;في&nbsp;الجنوب&nbsp;الشرقي&nbsp;للجزائر،&nbsp;تفتح&nbsp;بوابة&nbsp;الصحراء&nbsp;الكبرى&nbsp;ذراعيها&nbsp;لزائر&nbsp;يبحث&nbsp;عن&nbsp;السكينة،&nbsp;العراقة،&nbsp;وتجربة&nbsp;مختلفة&nbsp;لا&nbsp;تشبه&nbsp;سواها.</p><p class=\"ql-align-right\">تُلقّب&nbsp;بسكرة&nbsp;بـ&nbsp;عروس&nbsp;الزيبان،&nbsp;وهي&nbsp;مدينة&nbsp;ضاربة&nbsp;في&nbsp;التاريخ،&nbsp;شكّلت&nbsp;عبر&nbsp;العصور&nbsp;همزة&nbsp;وصل&nbsp;بين&nbsp;الشمال&nbsp;والجنوب،&nbsp;وممرًا&nbsp;للحضارات&nbsp;والقوافل.&nbsp;موقعها&nbsp;الجغرافي&nbsp;الفريد،&nbsp;على&nbsp;ارتفاع&nbsp;منخفض&nbsp;عن&nbsp;سطح&nbsp;البحر،&nbsp;منحها&nbsp;مناخًا&nbsp;معتدلًا&nbsp;شتاءً&nbsp;وجعلها&nbsp;وجهة&nbsp;مفضلة&nbsp;للاستجمام&nbsp;والراحة.</p><p class=\"ql-align-right\">واحات&nbsp;خضراء&nbsp;في&nbsp;قلب&nbsp;الصحراء</p><p class=\"ql-align-right\">تحتضن&nbsp;بسكرة&nbsp;ملايين&nbsp;النخيل&nbsp;التي&nbsp;تمتد&nbsp;كلوحة&nbsp;طبيعية&nbsp;ساحرة،&nbsp;وتشتهر&nbsp;عالميًا&nbsp;بإنتاج&nbsp;دقلة&nbsp;نور،&nbsp;لؤلؤة&nbsp;التمور&nbsp;الجزائرية.&nbsp;جولة&nbsp;بين&nbsp;الواحات&nbsp;ليست&nbsp;مجرد&nbsp;نزهة،&nbsp;بل&nbsp;تجربة&nbsp;حسّية&nbsp;تُعيد&nbsp;للروح&nbsp;توازنها.</p><p class=\"ql-align-right\">استشفاء…&nbsp;من&nbsp;عمق&nbsp;الأرض</p><p class=\"ql-align-right\">في&nbsp;حمام&nbsp;الصالحين،&nbsp;ينبع&nbsp;الماء&nbsp;المعدني&nbsp;الدافئ&nbsp;ليحمل&nbsp;معه&nbsp;تقاليد&nbsp;علاجية&nbsp;عريقة،&nbsp;جعلت&nbsp;من&nbsp;بسكرة&nbsp;مقصدًا&nbsp;للسياحة&nbsp;الحموية&nbsp;والاستجمام&nbsp;الطبيعي،&nbsp;حيث&nbsp;يلتقي&nbsp;العلاج&nbsp;بالهدوء.</p><p class=\"ql-align-right\">شواهد&nbsp;التاريخ&nbsp;وروح&nbsp;المكان</p><p class=\"ql-align-right\">من&nbsp;مسجد&nbsp;وضريح&nbsp;عقبة&nbsp;بن&nbsp;نافع،&nbsp;الذي&nbsp;يروي&nbsp;بدايات&nbsp;الفتح&nbsp;الإسلامي،&nbsp;إلى&nbsp;مدينة&nbsp;القنطرة&nbsp;المعروفة&nbsp;بـ&nbsp;فم&nbsp;الصحراء&nbsp;بجسرها&nbsp;الروماني&nbsp;وعمارتها&nbsp;الطينية،&nbsp;وصولًا&nbsp;إلى&nbsp;مشونش&nbsp;وآثار&nbsp;تهودة،&nbsp;تأخذك&nbsp;بسكرة&nbsp;في&nbsp;رحلة&nbsp;عبر&nbsp;حضارات&nbsp;متعاقبة.</p><p class=\"ql-align-right\">توفر&nbsp;بسكرة&nbsp;برامج&nbsp;سياحية&nbsp;متكاملة&nbsp;تجمع&nbsp;بين&nbsp;الواحات،&nbsp;الحمامات&nbsp;المعدنية،&nbsp;المواقع&nbsp;التاريخية،&nbsp;والتسوق&nbsp;في&nbsp;أسواق&nbsp;التمور&nbsp;والتوابل،&nbsp;ضمن&nbsp;رحلات&nbsp;قصيرة&nbsp;أو&nbsp;إقامات&nbsp;تمتد&nbsp;لعدة&nbsp;أيام.</p><p class=\"ql-align-right\">بسكرة&nbsp;ليست&nbsp;مجرد&nbsp;وجهة…&nbsp;إنها&nbsp;دفء،&nbsp;شمس،&nbsp;ونبض&nbsp;حياة&nbsp;في&nbsp;قلب&nbsp;الصحراء.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">&nbsp;</p><p class=\"ql-align-right\"><strong>المقومات&nbsp;السياحية</strong>:</p><ul><li><strong>السياحة&nbsp;الحموية&nbsp;والعلاجية</strong>:&nbsp;يعتبر&nbsp;حمام&nbsp;الصالحين&nbsp;&nbsp;و&nbsp;حمام&nbsp;البركة&nbsp;&nbsp;ببلدية&nbsp;الحاجب&nbsp;من&nbsp;أشهر&nbsp;المعالم&nbsp;الحموية&nbsp;التقليدية&nbsp;و&nbsp;الاستشفائية،&nbsp;ويجذب&nbsp;آلاف&nbsp;الزوار&nbsp;سنوياً&nbsp;للعلاج&nbsp;الطبيعي&nbsp;والاسترخاء.</li><li><strong>السياحة&nbsp;الطبيعية&nbsp;والواحاتية</strong>:&nbsp;تضم&nbsp;الولاية&nbsp;أكثر&nbsp;من&nbsp;4.5&nbsp;مليون&nbsp;نخلة،&nbsp;وتشكل&nbsp;واحات&nbsp;بسكرة،&nbsp;برج&nbsp;بن&nbsp;عزوز،&nbsp;ولغروس&nbsp;مشهداً&nbsp;طبيعياً&nbsp;رائعاً،&nbsp;بالإضافة&nbsp;إلى&nbsp;حدائق&nbsp;لاندون&nbsp;(بنيت&nbsp;عام&nbsp;1870)&nbsp;والحدائق&nbsp;المائية.</li><li><strong>السياحة&nbsp;التاريخية&nbsp;والثقافية</strong>:</li></ul><p class=\"ql-align-right\">o&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>مسجد&nbsp;عقبة&nbsp;بن&nbsp;نافع</strong>:&nbsp;يمثل&nbsp;تحفة&nbsp;معمارية&nbsp;إسلامية&nbsp;ويضم&nbsp;ضريح&nbsp;الصحابي.</p><p class=\"ql-align-right\">o&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>مدينة&nbsp;القنطرة</strong>:&nbsp;القنطرة،&nbsp;التي&nbsp;تُعرف&nbsp;ببوابة&nbsp;الصحراء&nbsp;أو&nbsp;فم&nbsp;الصحراء،&nbsp;يتجلّى&nbsp;البعد&nbsp;التاريخي&nbsp;بوضوح&nbsp;من&nbsp;خلال&nbsp;موقعها&nbsp;الاستراتيجي&nbsp;الذي&nbsp;جعلها&nbsp;معبرًا&nbsp;حضاريًا&nbsp;هامًا&nbsp;بين&nbsp;الشمال&nbsp;والجنوب&nbsp;منذ&nbsp;العصور&nbsp;القديمة.&nbsp;يبرز&nbsp;الجسر&nbsp;الروماني&nbsp;كأهم&nbsp;معلم&nbsp;تاريخي،&nbsp;وهو&nbsp;تحفة&nbsp;معمارية&nbsp;شُيّدت&nbsp;لعبور&nbsp;الوادي&nbsp;وسط&nbsp;شق&nbsp;صخري&nbsp;مهيب،&nbsp;ولا&nbsp;يزال&nbsp;قائمًا&nbsp;شاهدًا&nbsp;على&nbsp;عبقرية&nbsp;الهندسة&nbsp;الرومانية.&nbsp;وتُكمّل&nbsp;المشهد&nbsp;بقايا&nbsp;المباني&nbsp;القديمة،&nbsp;والأزقة&nbsp;التقليدية،&nbsp;والقرية&nbsp;الطينية&nbsp;الحمراء&nbsp;التي&nbsp;تعكس&nbsp;انسجام&nbsp;الإنسان&nbsp;مع&nbsp;الطبيعة&nbsp;الصخرية&nbsp;المحيطة،&nbsp;ما&nbsp;يمنح&nbsp;القنطرة&nbsp;طابعًا&nbsp;تاريخيًا&nbsp;وثقافيًا&nbsp;مميزًا.</p>', '/uploads/destinations/1771108110063-440668843.jpg', 11, 1, ' 600,000 inhabitants', '21,671 km²', 'HOT', 'حار', 'Biskra has a hot desert climate with very hot summers and mild, pleasant winters. The best time to visit is usually from November to March.', 'تميز بسكرة بمناخ صحراوي حار، صيف شديد الحرارة وشتاء معتدل ولطيف. أفضل فترة للزيارة تكون عادة من نوفمبر إلى مارس حيث تكون الحرارة مريحة وتستقبل المدينة الكثير من الزوار في فصل الشتاء', 'Biskra is a major center for Deglet Nour dates, which appear in many sweets and dishes. Local cuisine combines Saharan and North‑African flavors', ' تُعتَبَر بسكرة قلب إنتاج تمر دقلة نور، وتدخل التمور في كثير من الحلويات والأطباق المحلية. المطبخ يجمع بين نكهات الصحراء والمغرب العربي', 'Dress modestly, especially in traditional neighborhoods, oases, and religious sites like Sidi Okba.', 'يُفضَّل ارتداء لباس محتشم خصوصاً في الأحياء الشعبية والواحات والأماكن الدينية مثل سيدي عقبة.', 'Inside the city, people mainly use taxis and local buses, while many central areas, parks like Landon Garden, and parts of the palm groves are walkable in cooler hours.', 'داخل المدينة يعتمد السكان على سيارات الأجرة والحافلات المحلية، ويمكن التجوّل سيراً على الأقدام في وسط المدينة والحدائق مثل حديقة لاندون وبعض أطراف الواحات خلال الأوقات ذات الطقس المعتدل', 0),
(8, 'Béchar', 'بشار', '<p></p>', '<p></p>', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=400&fit=crop', 12, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(9, 'Blida', 'البليدة', '<p></p>', '<p></p>', '', 9, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(10, 'Bouïra', 'البويرة', '<p></p>', '<p></p>', '', 10, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(11, 'Tamanrasset', 'تمنراست', '<p></p>', '<p></p>', '', 11, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(12, 'Tébessa', 'تبسة', '<p></p>', '<p></p>', '', 12, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(13, 'Tlemcen', 'تلمسان', '<p></p>', '<p></p>', '', 13, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(14, 'Tiaret', 'تيارت', '<p></p>', '<p></p>', '', 14, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(15, 'Tizi Ouzou', 'تيزي وزو', '<p></p>', '<p></p>', '', 15, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(16, 'Algiers', 'الجزائر', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(71, 71, 71);\">Algiers&nbsp;is&nbsp;the&nbsp;capital&nbsp;city&nbsp;of&nbsp;Algeria,&nbsp;on&nbsp;the&nbsp;country’s&nbsp;Mediterranean&nbsp;coast.&nbsp;It’s&nbsp;known&nbsp;for&nbsp;the&nbsp;whitewashed&nbsp;buildings&nbsp;of&nbsp;the&nbsp;Kasbah,&nbsp;a&nbsp;medina&nbsp;with&nbsp;steep&nbsp;winding&nbsp;streets,&nbsp;Ottoman&nbsp;palaces&nbsp;and&nbsp;a&nbsp;ruined&nbsp;citadel.&nbsp;The&nbsp;17th-century&nbsp;Ketchaoua&nbsp;Mosque&nbsp;is&nbsp;flanked&nbsp;by&nbsp;2&nbsp;large&nbsp;minarets.&nbsp;The&nbsp;Great&nbsp;Mosque&nbsp;has&nbsp;marble&nbsp;columns&nbsp;and&nbsp;arches.&nbsp;The&nbsp;clifftop&nbsp;Catholic&nbsp;basilica&nbsp;of&nbsp;Notre-Dame&nbsp;d&#39;Afrique&nbsp;features&nbsp;a&nbsp;large&nbsp;silver&nbsp;dome&nbsp;and&nbsp;mosaics.</span><span style=\"background-color: rgb(255, 255, 255); color: rgb(99, 99, 99);\">&nbsp;―&nbsp;Google</span></p>', '<p><span style=\"color: rgb(71, 71, 71); background-color: rgb(255, 255, 255);\">Algiers&nbsp;is&nbsp;the&nbsp;capital&nbsp;city&nbsp;of&nbsp;Algeria,&nbsp;on&nbsp;the&nbsp;country’s&nbsp;Mediterranean&nbsp;coast.&nbsp;It’s&nbsp;known&nbsp;for&nbsp;the&nbsp;whitewashed&nbsp;buildings&nbsp;of&nbsp;the&nbsp;Kasbah,&nbsp;a&nbsp;medina&nbsp;with&nbsp;steep&nbsp;winding&nbsp;streets,&nbsp;Ottoman&nbsp;palaces&nbsp;and&nbsp;a&nbsp;ruined&nbsp;citadel.&nbsp;The&nbsp;17th-century&nbsp;Ketchaoua&nbsp;Mosque&nbsp;is&nbsp;flanked&nbsp;by&nbsp;2&nbsp;large&nbsp;minarets.&nbsp;The&nbsp;Great&nbsp;Mosque&nbsp;has&nbsp;marble&nbsp;columns&nbsp;and&nbsp;arches.&nbsp;The&nbsp;clifftop&nbsp;Catholic&nbsp;basilica&nbsp;of&nbsp;Notre-Dame&nbsp;d&#39;Afrique&nbsp;features&nbsp;a&nbsp;large&nbsp;silver&nbsp;dome&nbsp;and&nbsp;mosaics.</span><span style=\"color: rgb(99, 99, 99); background-color: rgb(255, 255, 255);\">&nbsp;―&nbsp;Google</span></p>', '/uploads/destinations/1771091884230-517598872.jpg', 16, 1, '100000', '100000', 'HOT', 'HOT', 'summer', 'summer', 'Cuisine ', 'Cuisine ', 'Etiquette ', 'Etiquette ', 'Getting Around (EN)', 'Getting Around (AR)', 1),
(17, 'Djelfa', 'الجلفة', '<p></p>', '<p></p>', '', 17, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(18, 'Jijel', 'جيجل', '<p></p>', '<p></p>', '', 18, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(19, 'Sétif', 'سطيف', '<p></p>', '<p></p>', '', 19, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(20, 'Saïda', 'سعيدة', '<p></p>', '<p></p>', '', 20, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(21, 'Skikda', 'سكيكدة', '<p></p>', '<p></p>', '', 21, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(22, 'Sidi Bel Abbès', 'سيدي بلعباس', '<p></p>', '<p></p>', '', 22, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0);
INSERT INTO `destinations` (`id`, `name_en`, `name_ar`, `about_en`, `about_ar`, `background_image`, `sort_order`, `is_active`, `population`, `area`, `climate_en`, `climate_ar`, `best_time_en`, `best_time_ar`, `cuisine_en`, `cuisine_ar`, `etiquette_en`, `etiquette_ar`, `transport_en`, `transport_ar`, `show_on_homepage`) VALUES
(23, 'Annaba', 'عنابة', '<p>Annaba…&nbsp;the&nbsp;pearl&nbsp;of&nbsp;eastern&nbsp;Algeria&nbsp;and&nbsp;the&nbsp;bride&nbsp;of&nbsp;the&nbsp;Mediterranean,&nbsp;where&nbsp;the&nbsp;azure&nbsp;sea&nbsp;meets&nbsp;the&nbsp;verdant&nbsp;mountains,&nbsp;and&nbsp;the&nbsp;fragrance&nbsp;of&nbsp;history&nbsp;embraces&nbsp;the&nbsp;gentle&nbsp;breeze&nbsp;of&nbsp;nature.&nbsp;It&nbsp;is&nbsp;a&nbsp;city&nbsp;that&nbsp;captivates&nbsp;hearts&nbsp;from&nbsp;the&nbsp;first&nbsp;moment,&nbsp;with&nbsp;its&nbsp;golden&nbsp;beaches,&nbsp;ancient&nbsp;landmarks,&nbsp;and&nbsp;vibrant&nbsp;atmosphere&nbsp;that&nbsp;pulsates&nbsp;with&nbsp;life&nbsp;in&nbsp;both&nbsp;summer&nbsp;and&nbsp;winter.&nbsp;In&nbsp;Annaba,&nbsp;you&nbsp;don&#39;t&nbsp;just&nbsp;visit&nbsp;a&nbsp;place;&nbsp;you&nbsp;live&nbsp;a&nbsp;complete&nbsp;experience&nbsp;that&nbsp;combines&nbsp;relaxation,&nbsp;discovery,&nbsp;and&nbsp;enjoyment.&nbsp;It&nbsp;is&nbsp;a&nbsp;destination&nbsp;for&nbsp;anyone&nbsp;seeking&nbsp;authentic&nbsp;beauty&nbsp;and&nbsp;warm&nbsp;hospitality&nbsp;amidst&nbsp;nature&nbsp;and&nbsp;history.</p><p></p><p>The&nbsp;city&nbsp;of&nbsp;Annaba&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;most&nbsp;prominent&nbsp;tourist&nbsp;destinations&nbsp;in&nbsp;eastern&nbsp;Algeria,&nbsp;combining&nbsp;the&nbsp;allure&nbsp;of&nbsp;the&nbsp;sea,&nbsp;the&nbsp;richness&nbsp;of&nbsp;history,&nbsp;and&nbsp;the&nbsp;splendor&nbsp;of&nbsp;nature,&nbsp;making&nbsp;it&nbsp;a&nbsp;city&nbsp;with&nbsp;all&nbsp;the&nbsp;necessary&nbsp;tourist&nbsp;attractions.</p><p></p><p>On&nbsp;the&nbsp;coast,&nbsp;Annaba&nbsp;boasts&nbsp;a&nbsp;coastline&nbsp;stretching&nbsp;over&nbsp;122&nbsp;kilometers,&nbsp;featuring&nbsp;stunning&nbsp;sandy&nbsp;and&nbsp;rocky&nbsp;beaches&nbsp;such&nbsp;as&nbsp;Djenane&nbsp;El&nbsp;Bay,&nbsp;Ain&nbsp;Achir,&nbsp;and&nbsp;Rafas&nbsp;Zahouana&nbsp;Beach.&nbsp;The&nbsp;Annaba&nbsp;Corniche&nbsp;is&nbsp;an&nbsp;ideal&nbsp;space&nbsp;for&nbsp;strolling&nbsp;and&nbsp;enjoying&nbsp;the&nbsp;sea&nbsp;views,&nbsp;while&nbsp;the&nbsp;Ras&nbsp;El&nbsp;Hamra&nbsp;area&nbsp;presents&nbsp;a&nbsp;captivating&nbsp;natural&nbsp;landscape&nbsp;that&nbsp;attracts&nbsp;photography&nbsp;enthusiasts&nbsp;and&nbsp;marine&nbsp;explorers.&nbsp;From&nbsp;a&nbsp;historical&nbsp;and&nbsp;archaeological&nbsp;perspective,&nbsp;the&nbsp;city&nbsp;boasts&nbsp;landmarks&nbsp;dating&nbsp;back&nbsp;to&nbsp;various&nbsp;eras,&nbsp;most&nbsp;notably&nbsp;the&nbsp;Roman&nbsp;ruins&nbsp;of&nbsp;Hippo&nbsp;Regius,&nbsp;which&nbsp;include&nbsp;the&nbsp;remains&nbsp;of&nbsp;an&nbsp;ancient&nbsp;city&nbsp;and&nbsp;a&nbsp;valuable&nbsp;archaeological&nbsp;museum.&nbsp;The&nbsp;Church&nbsp;of&nbsp;Saint&nbsp;Augustine,&nbsp;perched&nbsp;atop&nbsp;a&nbsp;hill&nbsp;overlooking&nbsp;the&nbsp;city,&nbsp;stands&nbsp;as&nbsp;a&nbsp;testament&nbsp;to&nbsp;a&nbsp;rich&nbsp;religious&nbsp;history.&nbsp;The&nbsp;old&nbsp;city,&nbsp;with&nbsp;its&nbsp;walls&nbsp;and&nbsp;traditional&nbsp;alleyways,&nbsp;also&nbsp;stands&nbsp;out,&nbsp;alongside&nbsp;the&nbsp;Bey&nbsp;Mosque,&nbsp;a&nbsp;prime&nbsp;example&nbsp;of&nbsp;Islamic&nbsp;architecture.</p><p></p><p>Annaba&#39;s&nbsp;appeal&nbsp;extends&nbsp;beyond&nbsp;its&nbsp;sea&nbsp;and&nbsp;history&nbsp;to&nbsp;its&nbsp;verdant&nbsp;mountains.&nbsp;The&nbsp;Seraïdi&nbsp;Mountains&nbsp;and&nbsp;Edough&nbsp;National&nbsp;Park&nbsp;offer&nbsp;ideal&nbsp;spaces&nbsp;for&nbsp;hiking&nbsp;and&nbsp;fresh&nbsp;air&nbsp;enthusiasts,&nbsp;as&nbsp;well&nbsp;as&nbsp;opportunities&nbsp;for&nbsp;ecotourism&nbsp;and&nbsp;sports&nbsp;activities&nbsp;such&nbsp;as&nbsp;mountain&nbsp;walking&nbsp;and&nbsp;cycling.</p><p></p><p>Historical&nbsp;and&nbsp;Archaeological&nbsp;Tourism:&nbsp;Annaba&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;oldest&nbsp;cities&nbsp;in&nbsp;Algeria,&nbsp;having&nbsp;been&nbsp;home&nbsp;to&nbsp;numerous&nbsp;civilizations,&nbsp;from&nbsp;the&nbsp;Phoenicians&nbsp;to&nbsp;the&nbsp;Romans,&nbsp;Vandals,&nbsp;Byzantines,&nbsp;the&nbsp;Islamic&nbsp;conquest,&nbsp;the&nbsp;Ottoman&nbsp;era,&nbsp;and&nbsp;French&nbsp;colonialism.&nbsp;This&nbsp;rich&nbsp;history&nbsp;has&nbsp;endowed&nbsp;it&nbsp;with&nbsp;a&nbsp;diverse&nbsp;and&nbsp;fascinating&nbsp;heritage.&nbsp;The&nbsp;ruins&nbsp;of&nbsp;Hippo&nbsp;Regius&nbsp;are&nbsp;among&nbsp;the&nbsp;most&nbsp;important&nbsp;archaeological&nbsp;sites&nbsp;in&nbsp;North&nbsp;Africa.&nbsp;It&nbsp;was&nbsp;the&nbsp;capital&nbsp;of&nbsp;the&nbsp;eastern&nbsp;Numidian&nbsp;kingdom&nbsp;before&nbsp;becoming&nbsp;a&nbsp;prosperous&nbsp;Roman&nbsp;city.&nbsp;The&nbsp;ruins&nbsp;include:</p><p></p><p>The&nbsp;Roman&nbsp;theater&nbsp;and&nbsp;baths.</p><p></p><p>The&nbsp;remains&nbsp;of&nbsp;Roman&nbsp;villas&nbsp;with&nbsp;mosaic&nbsp;floors.</p><p></p><p>Streets&nbsp;and&nbsp;columns&nbsp;that&nbsp;indicate&nbsp;a&nbsp;sophisticated&nbsp;urban&nbsp;plan.</p><p></p><p>The&nbsp;Hippo&nbsp;Museum,&nbsp;where&nbsp;you&nbsp;can&nbsp;see&nbsp;the&nbsp;ruins&nbsp;of&nbsp;various&nbsp;ancient&nbsp;structures,&nbsp;houses&nbsp;a&nbsp;remarkable&nbsp;collection&nbsp;of&nbsp;mosaics,&nbsp;artifacts,&nbsp;statues,&nbsp;and&nbsp;reliefs&nbsp;that&nbsp;reflect&nbsp;social&nbsp;and&nbsp;religious&nbsp;life&nbsp;during&nbsp;the&nbsp;Roman&nbsp;era.</p><p></p><p>Hippo&nbsp;is&nbsp;also&nbsp;associated&nbsp;with&nbsp;Saint&nbsp;Augustine,&nbsp;who&nbsp;was&nbsp;the&nbsp;city&#39;s&nbsp;bishop&nbsp;in&nbsp;the&nbsp;4th&nbsp;century&nbsp;AD,&nbsp;giving&nbsp;it&nbsp;a&nbsp;universal&nbsp;religious&nbsp;significance.</p><p></p><p>The&nbsp;Church&nbsp;of&nbsp;Saint&nbsp;Augustine,&nbsp;built&nbsp;in&nbsp;the&nbsp;late&nbsp;19th&nbsp;century&nbsp;on&nbsp;a&nbsp;hill&nbsp;overlooking&nbsp;the&nbsp;city,&nbsp;features&nbsp;Byzantine-Roman&nbsp;architectural&nbsp;styles.&nbsp;It&nbsp;houses&nbsp;a&nbsp;statue&nbsp;of&nbsp;Saint&nbsp;Augustine&nbsp;and&nbsp;some&nbsp;relics&nbsp;attributed&nbsp;to&nbsp;him,&nbsp;and&nbsp;is&nbsp;a&nbsp;destination&nbsp;for&nbsp;pilgrims&nbsp;and&nbsp;researchers&nbsp;of&nbsp;Christian&nbsp;history.&nbsp;The&nbsp;Church&nbsp;of&nbsp;Saint&nbsp;Augustine&nbsp;stands&nbsp;proudly&nbsp;atop&nbsp;one&nbsp;of&nbsp;the&nbsp;hills&nbsp;of&nbsp;Annaba,&nbsp;where&nbsp;the&nbsp;spirituality&nbsp;of&nbsp;the&nbsp;place&nbsp;blends&nbsp;seamlessly&nbsp;with&nbsp;the&nbsp;richness&nbsp;of&nbsp;history.&nbsp;Built&nbsp;in&nbsp;honor&nbsp;of&nbsp;the&nbsp;philosopher&nbsp;and&nbsp;saint&nbsp;Augustine,&nbsp;one&nbsp;of&nbsp;the&nbsp;most&nbsp;prominent&nbsp;intellectual&nbsp;figures&nbsp;in&nbsp;Christianity,&nbsp;the&nbsp;church&nbsp;houses&nbsp;a&nbsp;magnificent&nbsp;statue&nbsp;of&nbsp;the&nbsp;saint,&nbsp;along&nbsp;with&nbsp;a&nbsp;portion&nbsp;of&nbsp;his&nbsp;relics.&nbsp;A&nbsp;significant&nbsp;tourist&nbsp;and&nbsp;spiritual&nbsp;destination,&nbsp;the&nbsp;church&nbsp;attracts&nbsp;visitors&nbsp;from&nbsp;around&nbsp;the&nbsp;world&nbsp;to&nbsp;discover&nbsp;its&nbsp;history&nbsp;and&nbsp;captivating&nbsp;beauty.</p><p></p><p>The&nbsp;Old&nbsp;City&nbsp;and&nbsp;Islamic&nbsp;Monuments</p><p>The&nbsp;alleyways&nbsp;of&nbsp;the&nbsp;old&nbsp;city&nbsp;reflect&nbsp;traditional&nbsp;architectural&nbsp;styles,&nbsp;while&nbsp;the&nbsp;Hafsid&nbsp;fortress&nbsp;and&nbsp;the&nbsp;Bey&#39;s&nbsp;Mosque&nbsp;showcase&nbsp;the&nbsp;influence&nbsp;of&nbsp;the&nbsp;Ottoman&nbsp;era&nbsp;through&nbsp;their&nbsp;decorations,&nbsp;inscriptions,&nbsp;and&nbsp;Arabic&nbsp;calligraphy.&nbsp;This&nbsp;diversity&nbsp;reflects&nbsp;the&nbsp;fusion&nbsp;of&nbsp;civilizations&nbsp;within&nbsp;a&nbsp;single&nbsp;architectural&nbsp;fabric.</p><p></p><p>This&nbsp;historical&nbsp;depth&nbsp;gives&nbsp;Annaba&nbsp;significant&nbsp;potential&nbsp;for&nbsp;developing&nbsp;cultural&nbsp;and&nbsp;scientific&nbsp;tourism,&nbsp;through&nbsp;archaeological&nbsp;trails&nbsp;and&nbsp;guided&nbsp;tours&nbsp;for&nbsp;researchers&nbsp;and&nbsp;students.</p><p></p><p>The&nbsp;Salah&nbsp;Yai&nbsp;Mosque.&nbsp;This&nbsp;mosque&nbsp;is&nbsp;considered&nbsp;one&nbsp;of&nbsp;the&nbsp;mosques&nbsp;in&nbsp;Algeria&nbsp;that&nbsp;adopted&nbsp;the&nbsp;Anatolian&nbsp;Turkish&nbsp;style,&nbsp;making&nbsp;this&nbsp;ancient&nbsp;mosque&nbsp;beautiful&nbsp;and&nbsp;distinctive&nbsp;in&nbsp;terms&nbsp;of&nbsp;its&nbsp;ornate&nbsp;corners,&nbsp;doors,&nbsp;and&nbsp;arches,&nbsp;a&nbsp;blend&nbsp;of&nbsp;Andalusian&nbsp;and&nbsp;Ottoman&nbsp;architecture&nbsp;in&nbsp;beautiful&nbsp;colors.&nbsp;It&nbsp;was&nbsp;built&nbsp;in&nbsp;1792&nbsp;AD.</p><p></p><p>The&nbsp;minaret&nbsp;stands&nbsp;in&nbsp;the&nbsp;shape&nbsp;of&nbsp;a&nbsp;truncated&nbsp;pyramid&nbsp;with&nbsp;a&nbsp;square&nbsp;base,&nbsp;in&nbsp;the&nbsp;well-known&nbsp;Ottoman&nbsp;style.&nbsp;The&nbsp;mosque&nbsp;is&nbsp;named&nbsp;after&nbsp;Saleh&nbsp;Bey&nbsp;ibn&nbsp;Mustafa,&nbsp;who&nbsp;was&nbsp;born&nbsp;in&nbsp;eastern&nbsp;Izmir&nbsp;and&nbsp;was&nbsp;the&nbsp;Bey&nbsp;of&nbsp;the&nbsp;eastern&nbsp;Algerian&nbsp;Beylik.&nbsp;He&nbsp;ordered&nbsp;the&nbsp;construction&nbsp;of&nbsp;a&nbsp;mosque&nbsp;in&nbsp;the&nbsp;heart&nbsp;of&nbsp;the&nbsp;old&nbsp;city,&nbsp;which&nbsp;at&nbsp;that&nbsp;time&nbsp;was&nbsp;a&nbsp;destination&nbsp;for&nbsp;scholars&nbsp;and&nbsp;students&nbsp;of&nbsp;the&nbsp;Quran.&nbsp;It&nbsp;was&nbsp;a&nbsp;mosque.</p><p></p><p>Secondly:&nbsp;Natural&nbsp;and&nbsp;Mountain&nbsp;Tourism</p><p>Nature&nbsp;is&nbsp;no&nbsp;less&nbsp;important&nbsp;than&nbsp;history&nbsp;in&nbsp;Annaba,&nbsp;as&nbsp;mountains,&nbsp;forests,&nbsp;and&nbsp;the&nbsp;sea&nbsp;blend&nbsp;together&nbsp;in&nbsp;a&nbsp;unique&nbsp;natural&nbsp;landscape.</p><p></p><p>The&nbsp;Seraidi&nbsp;Mountains</p><p>Located&nbsp;at&nbsp;an&nbsp;altitude&nbsp;of&nbsp;over&nbsp;800&nbsp;meters&nbsp;above&nbsp;sea&nbsp;level,&nbsp;they&nbsp;are&nbsp;characterized&nbsp;by:</p><p>A&nbsp;mild&nbsp;climate&nbsp;in&nbsp;summer&nbsp;and&nbsp;a&nbsp;refreshing&nbsp;one&nbsp;in&nbsp;winter.</p><p></p><p>Dense&nbsp;forests&nbsp;of&nbsp;cork&nbsp;oak&nbsp;and&nbsp;pine.</p><p></p><p>Panoramic&nbsp;views&nbsp;of&nbsp;the&nbsp;Bay&nbsp;of&nbsp;Annaba.</p><p></p><p>Hiking&nbsp;and&nbsp;camping&nbsp;opportunities.</p><p></p><p>Seraïdi&nbsp;is&nbsp;also&nbsp;a&nbsp;family-friendly&nbsp;resort&nbsp;area&nbsp;thanks&nbsp;to&nbsp;its&nbsp;tranquility&nbsp;and&nbsp;pristine&nbsp;environment.</p><p></p><p>The&nbsp;Edough&nbsp;Massif&nbsp;and&nbsp;its&nbsp;National&nbsp;Park</p><p>represent&nbsp;a&nbsp;rich&nbsp;biodiversity&nbsp;ecosystem,&nbsp;home&nbsp;to:</p><p>Rare&nbsp;Mediterranean&nbsp;plant&nbsp;species.</p><p>Wild&nbsp;animals&nbsp;such&nbsp;as&nbsp;wild&nbsp;boar&nbsp;and&nbsp;various&nbsp;birds&nbsp;of&nbsp;prey.</p><p>Nature&nbsp;trails&nbsp;suitable&nbsp;for&nbsp;ecotourism&nbsp;and&nbsp;nature&nbsp;photography.</p><p></p><p>The&nbsp;area&nbsp;also&nbsp;serves&nbsp;as&nbsp;a&nbsp;research&nbsp;area&nbsp;for&nbsp;environmental&nbsp;and&nbsp;geological&nbsp;sciences.</p><p></p><p>Coastal&nbsp;Tourism&nbsp;in&nbsp;Annaba</p><p>Coastal&nbsp;tourism&nbsp;is&nbsp;the&nbsp;cornerstone&nbsp;of&nbsp;tourism&nbsp;in&nbsp;Annaba,&nbsp;thanks&nbsp;to&nbsp;its&nbsp;location&nbsp;overlooking&nbsp;a&nbsp;wide&nbsp;bay&nbsp;of&nbsp;the&nbsp;Mediterranean&nbsp;Sea&nbsp;and&nbsp;its&nbsp;coastline&nbsp;stretching&nbsp;over&nbsp;120&nbsp;km,&nbsp;which&nbsp;combines&nbsp;golden&nbsp;sandy&nbsp;beaches&nbsp;with&nbsp;stunning&nbsp;rock&nbsp;formations.</p><p></p><p>Beach&nbsp;Variety&nbsp;and&nbsp;Characteristics</p><p>Djenane&nbsp;El&nbsp;Bey&nbsp;Bay&nbsp;Beach:&nbsp;One&nbsp;of&nbsp;the&nbsp;most&nbsp;famous&nbsp;beaches&nbsp;in&nbsp;eastern&nbsp;Algeria,&nbsp;it&nbsp;is&nbsp;characterized&nbsp;by&nbsp;its&nbsp;soft&nbsp;sand&nbsp;and&nbsp;expansiveness,&nbsp;making&nbsp;it&nbsp;ideal&nbsp;for&nbsp;families&nbsp;and&nbsp;summer&nbsp;activities.</p><p></p><p>Ain&nbsp;Ashir&nbsp;Beach:&nbsp;Close&nbsp;to&nbsp;the&nbsp;city,&nbsp;known&nbsp;for&nbsp;its&nbsp;clear&nbsp;waters&nbsp;and&nbsp;good&nbsp;organization,&nbsp;attracting&nbsp;large&nbsp;numbers&nbsp;of&nbsp;visitors.</p>', '<p class=\"ql-direction-rtl ql-align-right\"><sub><strong>مدينة&nbsp;عنابة</strong></sub></p><p class=\"ql-direction-rtl ql-align-right\">عنابة…&nbsp;لؤلؤة&nbsp;الشرق&nbsp;الجزائري&nbsp;وعروس&nbsp;المتوسط،&nbsp;حيث&nbsp;يلتقي&nbsp;زرقة&nbsp;البحر&nbsp;بخضرة&nbsp;الجبال،&nbsp;ويعانق&nbsp;عبق&nbsp;التاريخ&nbsp;نسيم&nbsp;الطبيعة.&nbsp;إنها&nbsp;مدينة&nbsp;تأسر&nbsp;القلوب&nbsp;من&nbsp;اللحظة&nbsp;الأولى،&nbsp;بشواطئها&nbsp;الذهبية،&nbsp;ومعالمها&nbsp;العريقة،&nbsp;وأجوائها&nbsp;الحيوية&nbsp;التي&nbsp;تنبض&nbsp;بالحياة&nbsp;صيفًا&nbsp;وشتاءً.&nbsp;في&nbsp;عنابة&nbsp;لا&nbsp;تزور&nbsp;مكانًا&nbsp;فحسب،&nbsp;بل&nbsp;تعيش&nbsp;تجربة&nbsp;متكاملة&nbsp;تجمع&nbsp;بين&nbsp;الاستجمام،&nbsp;والاكتشاف،&nbsp;والمتعة.&nbsp;إنها&nbsp;وجهة&nbsp;لكل&nbsp;من&nbsp;يبحث&nbsp;عن&nbsp;الجمال&nbsp;الأصيل&nbsp;والضيافة&nbsp;الدافئة&nbsp;في&nbsp;حضن&nbsp;الطبيعة&nbsp;والتاريخ.</p><p class=\"ql-direction-rtl ql-align-right\">تُعدّ&nbsp;مدينة&nbsp;عنابة&nbsp;من&nbsp;أبرز&nbsp;الوجهات&nbsp;السياحية&nbsp;في&nbsp;شرق&nbsp;الجزائر،&nbsp;إذ&nbsp;تجمع&nbsp;بين&nbsp;سحر&nbsp;البحر&nbsp;وعبق&nbsp;التاريخ&nbsp;وروعة&nbsp;الطبيعة،&nbsp;مما&nbsp;يجعلها&nbsp;مدينة&nbsp;متكاملة&nbsp;المقومات&nbsp;السياحية.</p><p class=\"ql-direction-rtl ql-align-right\">فعلى&nbsp;الصعيد&nbsp;الساحلي،&nbsp;تتميز&nbsp;عنابة&nbsp;بشريط&nbsp;ساحلي&nbsp;يمتد&nbsp;لأكثر&nbsp;من&nbsp;122&nbsp;كلم،&nbsp;يضم&nbsp;شواطئ&nbsp;رملية&nbsp;وصخرية&nbsp;خلابة&nbsp;مثل&nbsp;جنان&nbsp;الباي،&nbsp;عين&nbsp;عشير،&nbsp;وشاطئ&nbsp;رفاس&nbsp;زهوانة.&nbsp;كما&nbsp;يُعتبر&nbsp;كورنيش&nbsp;عنابة&nbsp;فضاءً&nbsp;مثالياً&nbsp;للنزهة&nbsp;والاستمتاع&nbsp;بالمناظر&nbsp;البحرية،&nbsp;في&nbsp;حين&nbsp;تشكّل&nbsp;منطقة&nbsp;رأس&nbsp;الحمراء&nbsp;لوحة&nbsp;طبيعية&nbsp;ساحرة&nbsp;تجذب&nbsp;هواة&nbsp;التصوير&nbsp;والاستكشاف&nbsp;البحري.</p><p class=\"ql-direction-rtl ql-align-right\">أما&nbsp;من&nbsp;الناحية&nbsp;التاريخية&nbsp;والأثرية،&nbsp;فتزخر&nbsp;المدينة&nbsp;بمعالم&nbsp;تعود&nbsp;إلى&nbsp;عصور&nbsp;مختلفة،&nbsp;أبرزها&nbsp;آثار&nbsp;هيبون&nbsp;الرومانية&nbsp;التي&nbsp;تضم&nbsp;بقايا&nbsp;مدينة&nbsp;عريقة&nbsp;ومتحفاً&nbsp;أثرياً&nbsp;قيّماً.&nbsp;كما&nbsp;تتربع&nbsp;كنيسة&nbsp;القديس&nbsp;أوغستين&nbsp;على&nbsp;مرتفع&nbsp;مطل&nbsp;على&nbsp;المدينة،&nbsp;شاهدةً&nbsp;على&nbsp;تاريخ&nbsp;ديني&nbsp;عريق.&nbsp;وتبرز&nbsp;أيضاً&nbsp;المدينة&nbsp;القديمة&nbsp;بأسوارها&nbsp;وأزقتها&nbsp;التقليدية،&nbsp;إلى&nbsp;جانب&nbsp;مسجد&nbsp;الباي&nbsp;الذي&nbsp;يجسد&nbsp;روعة&nbsp;العمارة&nbsp;الإسلامية.</p><p class=\"ql-direction-rtl ql-align-right\">ولا&nbsp;تقتصر&nbsp;جاذبية&nbsp;عنابة&nbsp;على&nbsp;البحر&nbsp;والتاريخ&nbsp;فحسب،&nbsp;بل&nbsp;تمتد&nbsp;إلى&nbsp;طبيعتها&nbsp;الجبلية&nbsp;الخضراء،&nbsp;حيث&nbsp;توفر&nbsp;جبال&nbsp;سرايدي&nbsp;وحديقة&nbsp;إيدوغ&nbsp;الوطنية&nbsp;فضاءات&nbsp;مثالية&nbsp;لعشاق&nbsp;التنزه&nbsp;والهواء&nbsp;النقي،&nbsp;إضافة&nbsp;إلى&nbsp;إمكانية&nbsp;ممارسة&nbsp;السياحة&nbsp;البيئية&nbsp;والرياضية&nbsp;كالمشي&nbsp;الجبلي&nbsp;وركوب&nbsp;الدراجات.</p><p class=\"ql-direction-rtl ql-align-right\"></p><p class=\"ql-direction-rtl ql-align-right\"></p><p class=\"ql-direction-rtl ql-align-right\"><strong>السياحة&nbsp;التاريخية&nbsp;والأثرية&nbsp;</strong></p><p class=\"ql-direction-rtl ql-align-right\">تُعدّ&nbsp;عنابة&nbsp;من&nbsp;أقدم&nbsp;المدن&nbsp;في&nbsp;الجزائر،&nbsp;وقد&nbsp;تعاقبت&nbsp;عليها&nbsp;حضارات&nbsp;متعددة&nbsp;بدءًا&nbsp;من&nbsp;الفينيقيين&nbsp;مرورًا&nbsp;بالرومان&nbsp;والوندال&nbsp;والبيزنطيين&nbsp;ثم&nbsp;الفتح&nbsp;الإسلامي&nbsp;والعهد&nbsp;العثماني&nbsp;والاستعمار&nbsp;الفرنسي،&nbsp;وهو&nbsp;ما&nbsp;جعلها&nbsp;مدينة&nbsp;ذات&nbsp;رصيد&nbsp;تاريخي&nbsp;متنوع.</p><p class=\"ql-direction-rtl ql-align-right\">&nbsp;<strong>آثار&nbsp;هيبون&nbsp;(Hippo&nbsp;Regius</strong>)</p><p class=\"ql-direction-rtl ql-align-right\">تُعتبر&nbsp;من&nbsp;أهم&nbsp;المواقع&nbsp;الأثرية&nbsp;في&nbsp;شمال&nbsp;إفريقيا،&nbsp;وكانت&nbsp;عاصمة&nbsp;لمملكة&nbsp;نوميديا&nbsp;الشرقية&nbsp;قبل&nbsp;أن&nbsp;تصبح&nbsp;مدينة&nbsp;رومانية&nbsp;مزدهرة.&nbsp;تضم:</p><p class=\"ql-direction-rtl ql-align-right\">المسرح&nbsp;الروماني&nbsp;والحمّامات.</p><p class=\"ql-direction-rtl ql-align-right\">بقايا&nbsp;الفيلات&nbsp;الرومانية&nbsp;ذات&nbsp;الأرضيات&nbsp;الفسيفسائية.</p><p class=\"ql-direction-rtl ql-align-right\">شوارع&nbsp;وأعمدة&nbsp;تدل&nbsp;على&nbsp;تخطيط&nbsp;عمراني&nbsp;متطور.</p><p class=\"ql-direction-rtl ql-align-right\">متحف&nbsp;هيبون&nbsp;أين&nbsp;&nbsp;يمكنك&nbsp;رؤية&nbsp;أنقاض&nbsp;الهياكل&nbsp;القديمة&nbsp;المختلفة،&nbsp;ويضم&nbsp;المتحف&nbsp;مجموعة&nbsp;رائعة&nbsp;من&nbsp;الفسيفساء&nbsp;و&nbsp;قطع&nbsp;أثرية،&nbsp;تماثيل،&nbsp;ونقوش&nbsp;تعكس&nbsp;الحياة&nbsp;الاجتماعية&nbsp;والدينية&nbsp;في&nbsp;العهد&nbsp;الروماني.</p><p class=\"ql-direction-rtl ql-align-right\">كما&nbsp;ارتبطت&nbsp;هيبون&nbsp;بالقديس&nbsp;أوغستين&nbsp;الذي&nbsp;كان&nbsp;أسقف&nbsp;المدينة&nbsp;في&nbsp;القرن&nbsp;الرابع&nbsp;الميلادي،&nbsp;مما&nbsp;أكسبها&nbsp;بُعدًا&nbsp;دينيًا&nbsp;عالميًا.</p><p class=\"ql-direction-rtl ql-align-right\"><strong>&nbsp;كنيسة&nbsp;القديس&nbsp;أوغستين</strong></p><p class=\"ql-direction-rtl ql-align-right\">شُيّدت&nbsp;في&nbsp;أواخر&nbsp;القرن&nbsp;التاسع&nbsp;عشر&nbsp;فوق&nbsp;مرتفع&nbsp;يطل&nbsp;على&nbsp;المدينة،&nbsp;وتتميز&nbsp;بطراز&nbsp;معماري&nbsp;بيزنطي–روماني.&nbsp;تضم&nbsp;تمثالاً&nbsp;للقديس&nbsp;أوغستين&nbsp;وبعض&nbsp;الرفات&nbsp;المنسوبة&nbsp;إليه،&nbsp;وتُعدّ&nbsp;مقصدًا&nbsp;للحجاج&nbsp;والباحثين&nbsp;في&nbsp;التاريخ&nbsp;المسيحي.</p><p class=\"ql-direction-rtl ql-align-right\">تقف&nbsp;كنيسة&nbsp;القديس&nbsp;أوغسطين&nbsp;شامخة&nbsp;على&nbsp;إحدى&nbsp;تلال&nbsp;مدينة&nbsp;عنابة،&nbsp;حيث&nbsp;تمتزج&nbsp;روحانية&nbsp;المكان&nbsp;بعراقة&nbsp;التاريخ.&nbsp;بُنيت&nbsp;الكنيسة&nbsp;تكريمًا&nbsp;للفيلسوف&nbsp;والقديس&nbsp;أوغسطين،&nbsp;أحد&nbsp;أبرز&nbsp;الشخصيات&nbsp;الفكرية&nbsp;في&nbsp;المسيحية،&nbsp;داخلها،&nbsp;تحتضن&nbsp;الكنيسة&nbsp;تمثالًا&nbsp;رائعًا&nbsp;للقديس،&nbsp;إلى&nbsp;جانب&nbsp;جزء&nbsp;من&nbsp;رفاته&nbsp;المحفوظة&nbsp;هناك.&nbsp;تعد&nbsp;الكنيسة&nbsp;وجهة&nbsp;سياحية&nbsp;وروحية&nbsp;مهمة،&nbsp;حيث&nbsp;تجذب&nbsp;الزوار&nbsp;من&nbsp;مختلف&nbsp;أنحاء&nbsp;العالم&nbsp;لاكتشاف&nbsp;تاريخها&nbsp;وجمالها&nbsp;الأخّاذ</p><p class=\"ql-direction-rtl ql-align-right\"></p><p class=\"ql-direction-rtl ql-align-right\">&nbsp;<strong>المدينة&nbsp;القديمة&nbsp;والآثار&nbsp;الإسلامية</strong></p><p class=\"ql-direction-rtl ql-align-right\">تعكس&nbsp;أزقة&nbsp;المدينة&nbsp;القديمة&nbsp;الطابع&nbsp;العمراني&nbsp;التقليدي،&nbsp;كما&nbsp;تُبرز&nbsp;القلعة&nbsp;الحفصية&nbsp;ومسجد&nbsp;الباي&nbsp;تأثير&nbsp;الحقبة&nbsp;العثمانية&nbsp;من&nbsp;خلال&nbsp;الزخارف&nbsp;والنقوش&nbsp;والخط&nbsp;العربي.&nbsp;وهذا&nbsp;التنوع&nbsp;يعكس&nbsp;تمازج&nbsp;الحضارات&nbsp;في&nbsp;نسيج&nbsp;عمراني&nbsp;واحد.</p><p class=\"ql-direction-rtl ql-align-right\">&nbsp;إن&nbsp;هذا&nbsp;العمق&nbsp;التاريخي&nbsp;يمنح&nbsp;عنابة&nbsp;إمكانات&nbsp;كبيرة&nbsp;لتطوير&nbsp;السياحة&nbsp;الثقافية&nbsp;والعلمية،&nbsp;من&nbsp;خلال&nbsp;المسارات&nbsp;الأثرية&nbsp;والجولات&nbsp;الموجهة&nbsp;للباحثين&nbsp;والطلبة.</p><p class=\"ql-direction-rtl ql-align-right\"><strong>مسجد&nbsp;صالح&nbsp;ياي</strong>&nbsp;.&nbsp;يعتبر&nbsp;هذا&nbsp;المسجد&nbsp;من&nbsp;المساجد&nbsp;التي&nbsp;أخذت&nbsp;الطابع&nbsp;التركي&nbsp;الأناضولي&nbsp;بالجزائر&nbsp;مما&nbsp;جعل&nbsp;هذا&nbsp;المسجد&nbsp;العتيق&nbsp;جميلا&nbsp;ومميزا&nbsp;من&nbsp;حيث&nbsp;الزوايا&nbsp;والأبواب&nbsp;والأقواس&nbsp;المزركشة&nbsp;مزيجًا&nbsp;بين&nbsp;المعمار&nbsp;الأندلسي&nbsp;و&nbsp;العثماني&nbsp;بألوان&nbsp;جميلة&nbsp;&nbsp;و&nbsp;قد&nbsp;شُيّد&nbsp;عام&nbsp;1792م.</p><p class=\"ql-direction-rtl ql-align-right\">المئذنة&nbsp;تنتصب&nbsp;على&nbsp;شكل&nbsp;هرمي&nbsp;مقطوع&nbsp;ذي&nbsp;قاعدة&nbsp;مربعة&nbsp;بالطريقة&nbsp;العثمانية&nbsp;المعروفة،&nbsp;أما&nbsp;</p><p class=\"ql-direction-rtl ql-align-right\">تسمية&nbsp;هذا&nbsp;الجامع&nbsp;ترجع&nbsp;إلى&nbsp;صالح&nbsp;باي&nbsp;بن&nbsp;مصطفى&nbsp;المولود&nbsp;بإزمير&nbsp;الشرقية،&nbsp;والذي&nbsp;كان&nbsp;بايا&nbsp;على&nbsp;بايلك&nbsp;الشرق&nbsp;الجزائري&nbsp;،&nbsp;وهو&nbsp;الذي&nbsp;أمر&nbsp;ببناء&nbsp;مسجد&nbsp;في&nbsp;وسط&nbsp;المدينة&nbsp;العتيقة&nbsp;باعتبارها&nbsp;آنداك&nbsp;محجا&nbsp;للعلماء&nbsp;ومقصدًا&nbsp;لدارسي&nbsp;القرآن&nbsp;و&nbsp;كانت&nbsp;جامعًا&nbsp;</p><p class=\"ql-direction-rtl ql-align-right\"></p><p class=\"ql-direction-rtl ql-align-right\"><strong>&nbsp;ثانياً:&nbsp;السياحة&nbsp;الطبيعية&nbsp;والجبلية</strong></p><p class=\"ql-direction-rtl ql-align-right\">لا&nbsp;تقل&nbsp;الطبيعة&nbsp;أهمية&nbsp;عن&nbsp;التاريخ&nbsp;في&nbsp;عنابة،&nbsp;إذ&nbsp;تمتزج&nbsp;الجبال&nbsp;بالغابات&nbsp;والبحر&nbsp;في&nbsp;مشهد&nbsp;طبيعي&nbsp;فريد.</p><p class=\"ql-direction-rtl ql-align-right\">&nbsp;<strong>جبال&nbsp;سرايدي</strong></p><p class=\"ql-direction-rtl ql-align-right\">تقع&nbsp;على&nbsp;ارتفاع&nbsp;يزيد&nbsp;عن&nbsp;800&nbsp;متر&nbsp;فوق&nbsp;سطح&nbsp;البحر،&nbsp;وتتميز&nbsp;بـ:</p><p class=\"ql-direction-rtl ql-align-right\">مناخ&nbsp;معتدل&nbsp;صيفًا&nbsp;ومنعش&nbsp;شتاءً.</p><p class=\"ql-direction-rtl ql-align-right\">غابات&nbsp;كثيفة&nbsp;من&nbsp;الفلين&nbsp;والصنوبر.</p><p class=\"ql-direction-rtl ql-align-right\">إطلالات&nbsp;بانورامية&nbsp;على&nbsp;خليج&nbsp;عنابة.</p><p class=\"ql-direction-rtl ql-align-right\">إمكانية&nbsp;ممارسة&nbsp;رياضات&nbsp;المشي&nbsp;الجبلي&nbsp;(Randonnée)&nbsp;والتخييم.</p><p class=\"ql-direction-rtl ql-align-right\">وتُعدّ&nbsp;سرايدي&nbsp;أيضًا&nbsp;منطقة&nbsp;استجمام&nbsp;عائلية&nbsp;بفضل&nbsp;هدوئها&nbsp;ونقائها&nbsp;البيئي.</p><p class=\"ql-direction-rtl ql-align-right\"><strong>&nbsp;كتلة&nbsp;إيدوغ&nbsp;وحديقتها&nbsp;الوطنية</strong></p><p class=\"ql-direction-rtl ql-align-right\">تمثل&nbsp;نظامًا&nbsp;بيئيًا&nbsp;غنيًا&nbsp;بالتنوع&nbsp;البيولوجي،&nbsp;حيث&nbsp;تضم:</p><p class=\"ql-direction-rtl ql-align-right\">أنواعًا&nbsp;نباتية&nbsp;متوسطية&nbsp;نادرة.</p><p class=\"ql-direction-rtl ql-align-right\">حيوانات&nbsp;برية&nbsp;مثل&nbsp;الخنزير&nbsp;البري&nbsp;وبعض&nbsp;الطيور&nbsp;الجارحة.</p><p class=\"ql-direction-rtl ql-align-right\">مسالك&nbsp;طبيعية&nbsp;مناسبة&nbsp;للسياحة&nbsp;البيئية&nbsp;والتصوير&nbsp;الطبيعي.</p><p class=\"ql-direction-rtl ql-align-right\">كما&nbsp;تشكل&nbsp;المنطقة&nbsp;مجالاً&nbsp;للبحث&nbsp;العلمي&nbsp;في&nbsp;علوم&nbsp;البيئة&nbsp;والجيولوجيا.</p><p class=\"ql-direction-rtl ql-align-right\"><strong>&nbsp;السياحة&nbsp;الساحلية&nbsp;في&nbsp;عنابة</strong></p><p class=\"ql-direction-rtl ql-align-right\">تُعدّ&nbsp;السياحة&nbsp;الساحلية&nbsp;الركيزة&nbsp;الأساسية&nbsp;للنشاط&nbsp;السياحي&nbsp;في&nbsp;عنابة،&nbsp;بفضل&nbsp;موقعها&nbsp;المطل&nbsp;على&nbsp;خليج&nbsp;واسع&nbsp;من&nbsp;البحر&nbsp;الأبيض&nbsp;المتوسط،&nbsp;وشريطها&nbsp;الساحلي&nbsp;الذي&nbsp;يتجاوز&nbsp;120&nbsp;كلم،&nbsp;والذي&nbsp;يجمع&nbsp;بين&nbsp;الشواطئ&nbsp;الرملية&nbsp;الذهبية&nbsp;والتكوينات&nbsp;الصخرية&nbsp;الخلابة.</p><p class=\"ql-direction-rtl ql-align-right\">&nbsp;<strong>تنوع&nbsp;الشواطئ&nbsp;وخصائصها</strong></p><p class=\"ql-direction-rtl ql-align-right\"><strong>شاطئ&nbsp;خليج&nbsp;جنان&nbsp;الباي</strong>:&nbsp;يُعدّ&nbsp;من&nbsp;أشهر&nbsp;شواطئ&nbsp;الشرق&nbsp;الجزائري،&nbsp;يتميز&nbsp;برماله&nbsp;الناعمة&nbsp;واتساعه،&nbsp;ما&nbsp;يجعله&nbsp;مناسبًا&nbsp;للعائلات&nbsp;والأنشطة&nbsp;الصيفية.</p><p class=\"ql-direction-rtl ql-align-right\"><strong>شاطئ&nbsp;عين&nbsp;عشير</strong>:&nbsp;قريب&nbsp;من&nbsp;المدينة،&nbsp;معروف&nbsp;بمياهه&nbsp;الصافية&nbsp;وتنظيمه&nbsp;الجيد،&nbsp;ويستقطب&nbsp;أعدادًا&nbsp;كبيرة&nbsp;من&nbsp;المصطافين.</p><p class=\"ql-direction-rtl ql-align-right\"><strong>شاطئ&nbsp;رفاس&nbsp;زهوانة</strong>:&nbsp;يمتاز&nbsp;بجمال&nbsp;طبيعي&nbsp;وهدوء&nbsp;نسبي،&nbsp;مما&nbsp;يجعله&nbsp;مفضلًا&nbsp;لمحبي&nbsp;الاستجمام.</p><p class=\"ql-direction-rtl ql-align-right\"><strong>رأس&nbsp;الحمراء</strong>:&nbsp;منطقة&nbsp;صخرية&nbsp;بانورامية&nbsp;توفر&nbsp;مشاهد&nbsp;طبيعية&nbsp;مميزة،&nbsp;وتُعدّ&nbsp;موقعًا&nbsp;مثاليًا&nbsp;للتصوير&nbsp;ولمراقبة&nbsp;الغروب.</p><p class=\"ql-direction-rtl ql-align-right\">هذا&nbsp;التنوع&nbsp;يسمح&nbsp;بتلبية&nbsp;مختلف&nbsp;الأذواق،&nbsp;من&nbsp;السياحة&nbsp;العائلية&nbsp;إلى&nbsp;السياحة&nbsp;الشبابية&nbsp;والرياضية.</p><p class=\"ql-direction-rtl ql-align-right\"><strong>شاطئ&nbsp;سانت&nbsp;كلاود&nbsp;عنابة</strong></p><p class=\"ql-direction-rtl ql-align-right\">يُعدّ&nbsp;شاطئ&nbsp;سانت&nbsp;كلاود&nbsp;مثالاً&nbsp;عن&nbsp;الشواطئ&nbsp;التي&nbsp;تُوفّر&nbsp;مناظر&nbsp;بحرية&nbsp;جميلة&nbsp;وأجواء&nbsp;شاطئية&nbsp;رائعة،&nbsp;بل&nbsp;وكذلك&nbsp;من&nbsp;الشواطئ&nbsp;التي&nbsp;تتمتع&nbsp;بمياه&nbsp;نقيّة&nbsp;لامعة،&nbsp;وبهذا&nbsp;يُصنّف&nbsp;هذا&nbsp;الشاطئ&nbsp;الرملي&nbsp;العام&nbsp;من&nbsp;احسن&nbsp;شواطئ&nbsp;عنابة&nbsp;ومن&nbsp;أكثر&nbsp;الأماكن&nbsp;جذباً&nbsp;للزوّار.</p><p class=\"ql-direction-rtl ql-align-right\"><strong>شاطئ&nbsp;شابوي&nbsp;عنابة</strong></p><p class=\"ql-direction-rtl ql-align-right\">من&nbsp;بين&nbsp;عدّة&nbsp;شواطئ&nbsp;في&nbsp;عنابة&nbsp;،&nbsp;نجح&nbsp;شاطئ&nbsp;شابوي&nbsp;في&nbsp;إدهاش&nbsp;زائريه&nbsp;ببعض&nbsp;الأنشطة&nbsp;الرائعة&nbsp;وبمناظره&nbsp;اللافتة&nbsp;وأجواء&nbsp;الاستجمام&nbsp;والراحة&nbsp;التي&nbsp;ينعم&nbsp;بها&nbsp;كل&nbsp;من&nbsp;قام&nbsp;بزيارته،&nbsp;وهذا&nbsp;فقط&nbsp;هو&nbsp;أحد&nbsp;الأسباب&nbsp;التي&nbsp;جعلت&nbsp;هذا&nbsp;الشاطئ&nbsp;العام&nbsp;الرملي&nbsp;افضل&nbsp;شاطئ&nbsp;في&nbsp;عنابة&nbsp;،&nbsp;بالإضافة&nbsp;إلى&nbsp;ميزات&nbsp;أُخرى&nbsp;يتّسم&nbsp;بها&nbsp;الشاطئ&nbsp;كمياهه&nbsp;النقية&nbsp;البرّاقة.</p><p class=\"ql-direction-rtl ql-align-right\"><strong>شاطئ&nbsp;طوش&nbsp;عنابة</strong></p><p class=\"ql-direction-rtl ql-align-right\">يعدّ&nbsp;شاطئ&nbsp;طوش&nbsp;العام&nbsp;من&nbsp;افضل&nbsp;الشواطئ&nbsp;في&nbsp;عنابة&nbsp;وخيار&nbsp;مثالي&nbsp;للزيارة&nbsp;لكل&nbsp;من&nbsp;يبحث&nbsp;عن&nbsp;شواطئ&nbsp;في&nbsp;عنابة&nbsp;،&nbsp;حيث&nbsp;يجده&nbsp;الزوّار&nbsp;ملاذهم&nbsp;الوحيد&nbsp;الذي&nbsp;ينأى&nbsp;بهم&nbsp;بعيداً&nbsp;عن&nbsp;ضوضاء&nbsp;الحياة&nbsp;ويُقدّم&nbsp;لهم&nbsp;فرصة&nbsp;لا&nbsp;تُعوّض&nbsp;للاستمتاع&nbsp;بلحظات&nbsp;من&nbsp;الاسترخاء&nbsp;والراحة،&nbsp;وهو&nbsp;شاطئ&nbsp;رملي&nbsp;يتمتّع&nbsp;بمياه&nbsp;صافية.</p><p class=\"ql-direction-rtl ql-align-right\"><strong>شاطئ&nbsp;الخروب&nbsp;عنابة</strong></p><p class=\"ql-direction-rtl ql-align-right\">شاطئ&nbsp;الخروب&nbsp;هو&nbsp;من&nbsp;ضمن&nbsp;عدّة&nbsp;شواطئ&nbsp;في&nbsp;عنابة&nbsp;ندعوك&nbsp;لزيارتها،&nbsp;فهو&nbsp;شاطئ&nbsp;عام&nbsp;رملي،&nbsp;ذو&nbsp;مياه&nbsp;نقية&nbsp;برّاقة،&nbsp;و&nbsp;يُعتبر&nbsp;افضل&nbsp;شواطئ&nbsp;في&nbsp;عنابة&nbsp;،&nbsp;حيث&nbsp;باستطاعته&nbsp;تلبية&nbsp;أذواق&nbsp;الجميع&nbsp;بما&nbsp;يُتيحه&nbsp;من&nbsp;أنشطة&nbsp;مسليّة&nbsp;وما&nbsp;يُقدّمه&nbsp;للزوّار&nbsp;من&nbsp;لحظات&nbsp;مليئة&nbsp;بالاسترخاء&nbsp;والهدوء.</p><p class=\"ql-direction-rtl ql-align-right\"><strong>شاطئ&nbsp;بونا</strong></p><p class=\"ql-direction-rtl ql-align-right\">نوصيك&nbsp;بزيارة&nbsp;عدّة&nbsp;شواطئ&nbsp;في&nbsp;عنابة&nbsp;ومنها&nbsp;شاطئ&nbsp;بونا،&nbsp;فهو&nbsp;شاطئ&nbsp;خاص&nbsp;رملي،&nbsp;ذو&nbsp;مياه&nbsp;صافية&nbsp;لامعة،&nbsp;و&nbsp;يُصنّف&nbsp;اجمل&nbsp;شاطئ&nbsp;في&nbsp;عنابة&nbsp;،&nbsp;حيث&nbsp;باستطاعته&nbsp;إرضاء&nbsp;أذواق&nbsp;الجميع&nbsp;بما&nbsp;يُوفره&nbsp;من&nbsp;أنشطة&nbsp;ممتعة&nbsp;وما&nbsp;يُقدّمه&nbsp;للزوّار&nbsp;من&nbsp;أوقات&nbsp;مليئة&nbsp;بالاستجمام&nbsp;والهدوء.</p><p class=\"ql-direction-rtl ql-align-right\"></p><p class=\"ql-direction-rtl ql-align-right\"></p><p class=\"ql-direction-rtl ql-align-right\"></p><p class=\"ql-direction-rtl ql-align-right\">&nbsp;<strong>الكورنيش&nbsp;والواجهة&nbsp;البحرية</strong></p><p class=\"ql-direction-rtl ql-align-right\">يشكّل&nbsp;كورنيش&nbsp;عنابة&nbsp;فضاءً&nbsp;حضريًا&nbsp;سياحيًا&nbsp;بامتياز،&nbsp;حيث&nbsp;تنتشر&nbsp;المقاهي&nbsp;والمطاعم&nbsp;المطلة&nbsp;على&nbsp;البحر،&nbsp;إضافة&nbsp;إلى&nbsp;فضاءات&nbsp;التنزه&nbsp;ومناطق&nbsp;الترفيه.&nbsp;ويُعتبر&nbsp;نقطة&nbsp;جذب&nbsp;يومية&nbsp;للسكان&nbsp;والزوار،&nbsp;خاصة&nbsp;خلال&nbsp;فصل&nbsp;الصيف،&nbsp;لما&nbsp;يوفره&nbsp;من&nbsp;أجواء&nbsp;حيوية&nbsp;ومناظر&nbsp;بحرية&nbsp;خلابة.</p><p class=\"ql-direction-rtl ql-align-right\">&nbsp;<strong>الأنشطة&nbsp;البحرية&nbsp;والترفيهية</strong></p><p class=\"ql-direction-rtl ql-align-right\">توفر&nbsp;الواجهة&nbsp;الساحلية&nbsp;إمكانيات&nbsp;متعددة،&nbsp;منها:</p><p class=\"ql-direction-rtl ql-align-right\">السباحة&nbsp;والرياضات&nbsp;الشاطئية.</p><p class=\"ql-direction-rtl ql-align-right\">الصيد&nbsp;البحري&nbsp;التقليدي.</p><p class=\"ql-direction-rtl ql-align-right\">الرحلات&nbsp;البحرية&nbsp;القصيرة.</p><p class=\"ql-direction-rtl ql-align-right\">الرياضات&nbsp;المائية&nbsp;(مثل&nbsp;الزوارق&nbsp;و&quot;الجيت&nbsp;سكي&quot;&nbsp;في&nbsp;بعض&nbsp;المواسم).</p><p class=\"ql-direction-rtl ql-align-right\">كما&nbsp;يشكل&nbsp;ميناء&nbsp;عنابة&nbsp;عنصرًا&nbsp;اقتصاديًا&nbsp;وسياحيًا&nbsp;مهمًا،&nbsp;حيث&nbsp;يعكس&nbsp;النشاط&nbsp;البحري&nbsp;والتجاري&nbsp;للمدينة.</p>', '/uploads/destinations/1771160659765-140536028.jpg', 23, 1, '800,000', '576 km²', 'warm', 'دافئ', 'ideal from April–June or September–November for beaches (Oued Seguin, Sidi Achab), ruins, basilica visits, and avoiding peak heat/crowds.', ' مناخ متوسطي لطيف، صيف دافئ (32°م) وشتاء ممطر معتدل (10–15°م)؛ أبريل–يونيو أو سبتمبر–نوفمبر مثالي للشواطئ (وادي السيبوس، سيدي أشاب)، الآثار، والبازيليك دون حر شديد أو ازدحام.', 'Eastern Algerian seafood-heavy with French/Numidian touches', 'مطبخ شرق جزائري غني بالمأكولات البحرية مع لمسات فرنسية/نوميدية', 'Modest dress near basilica, ruins, mosques (Sidi Bou Merouane), and conservative neighborhoods.', 'لباس محتشم قرب البازيليك والآثار والمساجد (سيدي بو مروان) والأحياء التقليدية.', 'city buses/taxis cover center to beaches/ruins, trams for suburbs, walking for old town and corniche—cars for Edough Park (30km).', ' مركز رئيسي بمطار دولي، سكك حديد (الجزائر/تونس)، عبارات، وطرق سريعة؛ حافلات/أجرة للوسط والشواطئ/الآثار، ترام للضواحي، مشي للمدينة القديمة والكورنيش—سيارة لمتنزه الدوق (30 كلم).', 1),
(24, 'Guelma', 'قالمة', '<p></p>', '<p></p>', '', 24, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(25, 'Constantine', 'قسنطينة', '<p>Constantine…&nbsp;Where&nbsp;History&nbsp;Meets&nbsp;the&nbsp;Eternal&nbsp;Love&nbsp;of&nbsp;Rock</p><p></p><p>In&nbsp;the&nbsp;heart&nbsp;of&nbsp;northeastern&nbsp;Algeria,&nbsp;Constantine&nbsp;stands&nbsp;proudly&nbsp;atop&nbsp;its&nbsp;ancient&nbsp;rock,&nbsp;a&nbsp;city&nbsp;not&nbsp;merely&nbsp;to&nbsp;be&nbsp;visited,&nbsp;but&nbsp;to&nbsp;be&nbsp;lived.&nbsp;Here,&nbsp;where&nbsp;the&nbsp;Rhumel&nbsp;Valley&nbsp;embraces&nbsp;the&nbsp;city&#39;s&nbsp;depths,&nbsp;and&nbsp;where&nbsp;suspension&nbsp;bridges&nbsp;stretch&nbsp;like&nbsp;threads&nbsp;connecting&nbsp;the&nbsp;past&nbsp;to&nbsp;the&nbsp;present,&nbsp;an&nbsp;extraordinary&nbsp;journey&nbsp;through&nbsp;time&nbsp;begins.</p><p></p><p>Constantine&nbsp;is&nbsp;an&nbsp;ancient&nbsp;city,&nbsp;its&nbsp;history&nbsp;dating&nbsp;back&nbsp;more&nbsp;than&nbsp;2500&nbsp;years&nbsp;BC.&nbsp;Known&nbsp;throughout&nbsp;the&nbsp;ages&nbsp;as&nbsp;Cirta&nbsp;in&nbsp;the&nbsp;Phoenician&nbsp;era,&nbsp;it&nbsp;was&nbsp;the&nbsp;capital&nbsp;of&nbsp;Numidia&nbsp;during&nbsp;the&nbsp;reigns&nbsp;of&nbsp;Massinissa&nbsp;and&nbsp;Jugurtha,&nbsp;before&nbsp;flourishing&nbsp;in&nbsp;the&nbsp;Arab-Islamic&nbsp;and&nbsp;Ottoman&nbsp;periods&nbsp;as&nbsp;the&nbsp;capital&nbsp;of&nbsp;the&nbsp;Beylik&nbsp;of&nbsp;the&nbsp;East.&nbsp;This&nbsp;rich&nbsp;heritage&nbsp;has&nbsp;forged&nbsp;a&nbsp;unique&nbsp;city,&nbsp;where&nbsp;civilizations&nbsp;blend&nbsp;and&nbsp;are&nbsp;embodied&nbsp;in&nbsp;its&nbsp;architecture,&nbsp;culture,&nbsp;and&nbsp;the&nbsp;vibrant&nbsp;pulse&nbsp;of&nbsp;its&nbsp;streets.</p><p></p><p>City&nbsp;of&nbsp;Bridges…&nbsp;An&nbsp;Open-Air&nbsp;Museum</p><p></p><p>Constantine&nbsp;is&nbsp;famous&nbsp;for&nbsp;its&nbsp;seven&nbsp;breathtaking&nbsp;suspension&nbsp;bridges,&nbsp;most&nbsp;notably&nbsp;the&nbsp;Sidi&nbsp;Rached&nbsp;Bridge,&nbsp;the&nbsp;Mellah&nbsp;Slimane&nbsp;Bridge&nbsp;(also&nbsp;known&nbsp;as&nbsp;the&nbsp;Ghost&nbsp;Bridge),&nbsp;and&nbsp;the&nbsp;Salah&nbsp;Bey&nbsp;Bridge.&nbsp;These&nbsp;architectural&nbsp;masterpieces&nbsp;not&nbsp;only&nbsp;connect&nbsp;the&nbsp;two&nbsp;sides&nbsp;of&nbsp;the&nbsp;city&nbsp;but&nbsp;also&nbsp;connect&nbsp;visitors&nbsp;to&nbsp;its&nbsp;very&nbsp;soul.</p><p></p><p>A&nbsp;Journey&nbsp;Through&nbsp;History</p><p>From&nbsp;the&nbsp;Ahmed&nbsp;Bey&nbsp;Palace,&nbsp;where&nbsp;the&nbsp;walls&nbsp;tell&nbsp;tales&nbsp;of&nbsp;the&nbsp;Ottoman&nbsp;era,&nbsp;to&nbsp;the&nbsp;ancient&nbsp;city&nbsp;of&nbsp;Tiddis,&nbsp;which&nbsp;holds&nbsp;the&nbsp;secrets&nbsp;of&nbsp;Roman&nbsp;civilization,&nbsp;and&nbsp;passing&nbsp;through&nbsp;the&nbsp;old&nbsp;city&nbsp;and&nbsp;its&nbsp;venerable&nbsp;mosques,&nbsp;Constantine&nbsp;offers&nbsp;a&nbsp;vibrant&nbsp;historical&nbsp;experience.</p><p></p><p>Nature&nbsp;That&nbsp;Captivates&nbsp;the&nbsp;Senses</p><p>The&nbsp;city&nbsp;stands&nbsp;on&nbsp;a&nbsp;towering&nbsp;rock,&nbsp;offering&nbsp;visitors&nbsp;stunning&nbsp;panoramic&nbsp;views&nbsp;of&nbsp;the&nbsp;Rhumel&nbsp;Valley,&nbsp;making&nbsp;Constantine&nbsp;an&nbsp;ideal&nbsp;destination&nbsp;for&nbsp;nature&nbsp;lovers&nbsp;and&nbsp;photographers.</p><p></p><p>Palaces&nbsp;and&nbsp;Historical&nbsp;Landmarks</p><p></p><p>The&nbsp;Ahmed&nbsp;Bey&nbsp;Palace</p><p>One&nbsp;of&nbsp;the&nbsp;most&nbsp;important&nbsp;historical&nbsp;landmarks&nbsp;in&nbsp;Constantine&nbsp;and&nbsp;Algeria&nbsp;in&nbsp;general.&nbsp;Built&nbsp;in&nbsp;the&nbsp;19th&nbsp;century&nbsp;during&nbsp;the&nbsp;Ottoman&nbsp;era,&nbsp;it&nbsp;features&nbsp;unique&nbsp;Islamic-Ottoman&nbsp;architecture,&nbsp;intricate&nbsp;wall&nbsp;decorations,&nbsp;interior&nbsp;courtyards,&nbsp;and&nbsp;fountains.&nbsp;It&nbsp;served&nbsp;as&nbsp;the&nbsp;seat&nbsp;of&nbsp;government&nbsp;during&nbsp;the&nbsp;reign&nbsp;of&nbsp;Ahmed&nbsp;Bey,&nbsp;the&nbsp;last&nbsp;Bey&nbsp;of&nbsp;Constantine.&nbsp;It&nbsp;reflects&nbsp;the&nbsp;political&nbsp;and&nbsp;social&nbsp;life&nbsp;of&nbsp;that&nbsp;era&nbsp;and&nbsp;is&nbsp;considered&nbsp;a&nbsp;living&nbsp;museum&nbsp;of&nbsp;Ottoman&nbsp;heritage.</p><p></p><p>The&nbsp;Old&nbsp;City&nbsp;(Casbah)&nbsp;is&nbsp;a&nbsp;traditional,&nbsp;intricate&nbsp;urban&nbsp;fabric&nbsp;of&nbsp;narrow&nbsp;alleyways,&nbsp;ancient&nbsp;houses,&nbsp;and&nbsp;stone&nbsp;pathways.&nbsp;It&nbsp;encompasses&nbsp;a&nbsp;number&nbsp;of&nbsp;palaces,&nbsp;traditional&nbsp;houses,&nbsp;and&nbsp;old&nbsp;bathhouses.&nbsp;It&nbsp;reflects&nbsp;the&nbsp;social&nbsp;and&nbsp;urban&nbsp;character&nbsp;of&nbsp;Constantine&nbsp;throughout&nbsp;the&nbsp;ages.</p><p></p><p>The&nbsp;archaeological&nbsp;site&nbsp;of&nbsp;Tiddis&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;oldest&nbsp;and&nbsp;most&nbsp;important&nbsp;historical&nbsp;sites&nbsp;in&nbsp;the&nbsp;Constantine&nbsp;Province.&nbsp;Located&nbsp;approximately&nbsp;30&nbsp;km&nbsp;northwest&nbsp;of&nbsp;Constantine,&nbsp;it&nbsp;sits&nbsp;atop&nbsp;a&nbsp;rocky&nbsp;plateau&nbsp;overlooking&nbsp;breathtaking&nbsp;scenery.&nbsp;Tiddis&nbsp;stands&nbsp;as&nbsp;a&nbsp;living&nbsp;testament&nbsp;to&nbsp;the&nbsp;succession&nbsp;of&nbsp;civilizations&nbsp;that&nbsp;have&nbsp;passed&nbsp;through&nbsp;the&nbsp;region,&nbsp;from&nbsp;the&nbsp;Numidian&nbsp;to&nbsp;the&nbsp;Roman&nbsp;and&nbsp;then&nbsp;the&nbsp;Byzantine&nbsp;periods,&nbsp;making&nbsp;it&nbsp;an&nbsp;open-air&nbsp;museum.</p><p></p><p>The&nbsp;city&#39;s&nbsp;roots&nbsp;trace&nbsp;back&nbsp;to&nbsp;the&nbsp;Numidian&nbsp;period,&nbsp;when&nbsp;it&nbsp;was&nbsp;an&nbsp;ancient&nbsp;Berber&nbsp;settlement&nbsp;before&nbsp;being&nbsp;developed&nbsp;by&nbsp;the&nbsp;Romans&nbsp;into&nbsp;a&nbsp;prosperous&nbsp;city&nbsp;with&nbsp;a&nbsp;well-planned&nbsp;urban&nbsp;layout.&nbsp;Traces&nbsp;of&nbsp;this&nbsp;urban&nbsp;planning&nbsp;are&nbsp;still&nbsp;evident&nbsp;in&nbsp;the&nbsp;cobblestone&nbsp;streets,&nbsp;stone&nbsp;staircases,&nbsp;and&nbsp;remains&nbsp;of&nbsp;dwellings&nbsp;built&nbsp;in&nbsp;harmony&nbsp;with&nbsp;the&nbsp;rugged,&nbsp;mountainous&nbsp;terrain.</p><p></p><p>Tiddis&nbsp;boasts&nbsp;a&nbsp;number&nbsp;of&nbsp;prominent&nbsp;archaeological&nbsp;sites,&nbsp;including&nbsp;Roman&nbsp;baths&nbsp;that&nbsp;reflect&nbsp;the&nbsp;social&nbsp;life&nbsp;of&nbsp;the&nbsp;time,&nbsp;temples&nbsp;dedicated&nbsp;to&nbsp;religious&nbsp;rituals,&nbsp;and&nbsp;rock-cut&nbsp;tombs&nbsp;carefully&nbsp;carved&nbsp;into&nbsp;the&nbsp;surrounding&nbsp;mountains,&nbsp;bearing&nbsp;symbols&nbsp;indicative&nbsp;of&nbsp;ancient&nbsp;beliefs.&nbsp;Remains&nbsp;of&nbsp;defensive&nbsp;structures&nbsp;and&nbsp;walls&nbsp;that&nbsp;once&nbsp;protected&nbsp;the&nbsp;city&nbsp;are&nbsp;also&nbsp;visible.</p><p></p><p>Tiddis&nbsp;is&nbsp;distinguished&nbsp;by&nbsp;its&nbsp;unique&nbsp;natural&nbsp;setting,&nbsp;where&nbsp;history&nbsp;meets&nbsp;nature,&nbsp;offering&nbsp;visitors&nbsp;a&nbsp;rich&nbsp;cultural&nbsp;and&nbsp;tourist&nbsp;experience&nbsp;that&nbsp;combines&nbsp;archaeological&nbsp;exploration&nbsp;with&nbsp;panoramic&nbsp;views.&nbsp;A&nbsp;visit&nbsp;to&nbsp;Tiddis&nbsp;is&nbsp;a&nbsp;must-see&nbsp;for&nbsp;tourists&nbsp;in&nbsp;Constantine,&nbsp;especially&nbsp;for&nbsp;history&nbsp;enthusiasts&nbsp;and&nbsp;those&nbsp;seeking&nbsp;to&nbsp;delve&nbsp;into&nbsp;the&nbsp;depths&nbsp;of&nbsp;Algerian&nbsp;civilization,&nbsp;which&nbsp;spans&nbsp;thousands&nbsp;of&nbsp;years.</p><p></p><p>Mosques&nbsp;and&nbsp;Religious&nbsp;Sites</p><p>The&nbsp;Great&nbsp;Mosque</p><p>One&nbsp;of&nbsp;the&nbsp;oldest&nbsp;mosques&nbsp;in&nbsp;the&nbsp;city,&nbsp;dating&nbsp;back&nbsp;to&nbsp;the&nbsp;12th&nbsp;century&nbsp;AD.&nbsp;It&nbsp;is&nbsp;distinguished&nbsp;by&nbsp;its&nbsp;authentic&nbsp;Islamic&nbsp;architectural&nbsp;style&nbsp;and&nbsp;aesthetic&nbsp;simplicity.&nbsp;It&nbsp;has&nbsp;historically&nbsp;been&nbsp;an&nbsp;important&nbsp;religious&nbsp;and&nbsp;intellectual&nbsp;center.</p><p></p><p>The&nbsp;Great&nbsp;Mosque&nbsp;dates&nbsp;back&nbsp;to&nbsp;1135&nbsp;CE,&nbsp;during&nbsp;the&nbsp;reign&nbsp;of&nbsp;the&nbsp;Hammadid&nbsp;dynasty,&nbsp;a&nbsp;Sanhaja&nbsp;Berber&nbsp;dynasty&nbsp;that&nbsp;ruled&nbsp;Algeria&nbsp;between&nbsp;1014&nbsp;and&nbsp;1152.&nbsp;The&nbsp;mosque&nbsp;has&nbsp;undergone&nbsp;several&nbsp;expansions&nbsp;and&nbsp;restorations&nbsp;throughout&nbsp;its&nbsp;long&nbsp;history,&nbsp;including&nbsp;one&nbsp;during&nbsp;the&nbsp;Ottoman&nbsp;era&nbsp;in&nbsp;1766&nbsp;by&nbsp;the&nbsp;Bey&nbsp;of&nbsp;Constantine,&nbsp;and&nbsp;another&nbsp;during&nbsp;the&nbsp;French&nbsp;occupation&nbsp;of&nbsp;Algeria.&nbsp;The&nbsp;most&nbsp;recent&nbsp;restoration&nbsp;work&nbsp;was&nbsp;carried&nbsp;out&nbsp;in&nbsp;the&nbsp;last&nbsp;few&nbsp;years.</p><p></p><p>Sidi&nbsp;El&nbsp;Kettani&nbsp;Mosque</p>', '<p class=\"ql-align-right\"><strong>قسنطينة…&nbsp;حيث&nbsp;يلتقي&nbsp;التاريخ&nbsp;بالعشق&nbsp;الأزلي&nbsp;للصخر</strong></p><p class=\"ql-align-right\">في&nbsp;قلب&nbsp;الشمال&nbsp;الشرقي&nbsp;للجزائر،&nbsp;تتربع&nbsp;قسنطينة&nbsp;شامخة&nbsp;فوق&nbsp;صخرتها&nbsp;العتيقة،&nbsp;كمدينة&nbsp;لا&nbsp;تُزار&nbsp;فقط،&nbsp;بل&nbsp;تُعاش.&nbsp;هنا،&nbsp;حيث&nbsp;يعانق&nbsp;وادي&nbsp;الرمال&nbsp;أعماق&nbsp;المدينة،&nbsp;وحيث&nbsp;تمتد&nbsp;الجسور&nbsp;المعلّقة&nbsp;كخيوط&nbsp;تربط&nbsp;الماضي&nbsp;بالحاضر،&nbsp;تبدأ&nbsp;رحلة&nbsp;استثنائية&nbsp;عبر&nbsp;الزمن.</p><p class=\"ql-align-right\">قسنطينة&nbsp;مدينة&nbsp;ضاربة&nbsp;في&nbsp;القدم،&nbsp;يعود&nbsp;تاريخها&nbsp;إلى&nbsp;أكثر&nbsp;من&nbsp;2500&nbsp;سنة&nbsp;قبل&nbsp;الميلاد،&nbsp;عرفت&nbsp;عبر&nbsp;العصور&nbsp;باسم&nbsp;قيرطا&nbsp;في&nbsp;العهد&nbsp;الفينيقي،&nbsp;وكانت&nbsp;عاصمة&nbsp;نوميديا&nbsp;في&nbsp;زمن&nbsp;ماسينيسا&nbsp;ويوغرطة،&nbsp;قبل&nbsp;أن&nbsp;تزدهر&nbsp;في&nbsp;العهدين&nbsp;العربي&nbsp;الإسلامي&nbsp;والعثماني&nbsp;كعاصمة&nbsp;لـ&nbsp;بايلك&nbsp;الشرق.&nbsp;هذا&nbsp;الإرث&nbsp;العريق&nbsp;صنع&nbsp;مدينةً&nbsp;متفردة،&nbsp;تنصهر&nbsp;فيها&nbsp;الحضارات&nbsp;وتتجسد&nbsp;في&nbsp;معمارها،&nbsp;ثقافتها،&nbsp;ونبض&nbsp;شوارعها.</p><p class=\"ql-align-right\">مدينة&nbsp;الجسور…&nbsp;متحف&nbsp;مفتوح&nbsp;في&nbsp;الهواء&nbsp;الطلق</p><p class=\"ql-align-right\">تشتهر&nbsp;قسنطينة&nbsp;بجسورها&nbsp;السبعة&nbsp;المعلّقة&nbsp;التي&nbsp;تحبس&nbsp;الأنفاس،&nbsp;وعلى&nbsp;رأسها&nbsp;جسر&nbsp;سيدي&nbsp;راشد،&nbsp;جسر&nbsp;ملاح&nbsp;سليمان&nbsp;(قنطرة&nbsp;الأشباح)،&nbsp;وجسر&nbsp;صالح&nbsp;باي،&nbsp;تحف&nbsp;هندسية&nbsp;لا&nbsp;تكتفي&nbsp;بربط&nbsp;ضفتي&nbsp;المدينة،&nbsp;بل&nbsp;تربط&nbsp;الزائر&nbsp;بروح&nbsp;المكان.</p><p class=\"ql-align-right\">رحلة&nbsp;في&nbsp;عمق&nbsp;التاريخ</p><p class=\"ql-align-right\">من&nbsp;قصر&nbsp;أحمد&nbsp;باي،&nbsp;حيث&nbsp;تروي&nbsp;الجدران&nbsp;حكايات&nbsp;العهد&nbsp;العثماني،&nbsp;إلى&nbsp;مدينة&nbsp;تيديس&nbsp;الأثرية&nbsp;التي&nbsp;تختزن&nbsp;أسرار&nbsp;الحضارة&nbsp;الرومانية،&nbsp;مرورًا&nbsp;بالمدينة&nbsp;العتيقة&nbsp;ومساجدها&nbsp;العريقة،&nbsp;تعيش&nbsp;في&nbsp;قسنطينة&nbsp;تجربة&nbsp;تاريخية&nbsp;نابضة&nbsp;بالحياة.</p><p class=\"ql-align-right\">طبيعة&nbsp;تأسر&nbsp;الحواس</p><p class=\"ql-align-right\">تقف&nbsp;المدينة&nbsp;على&nbsp;صخرة&nbsp;شاهقة&nbsp;تمنح&nbsp;زائريها&nbsp;إطلالات&nbsp;بانورامية&nbsp;خلابة&nbsp;على&nbsp;وادي&nbsp;الرمال،&nbsp;في&nbsp;مشاهد&nbsp;تجعل&nbsp;من&nbsp;قسنطينة&nbsp;وجهة&nbsp;مثالية&nbsp;لعشاق&nbsp;الطبيعة&nbsp;والتصوير.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\"><strong><u>&nbsp;القصور&nbsp;والمعالم&nbsp;التاريخية</u></strong></p><p class=\"ql-align-right\"><strong>قصر&nbsp;أحمد&nbsp;باي</strong></p><p class=\"ql-align-right\">من&nbsp;أهم&nbsp;المعالم&nbsp;التاريخية&nbsp;في&nbsp;قسنطينة&nbsp;والجزائر&nbsp;عمومًا.&nbsp;شُيّد&nbsp;في&nbsp;القرن&nbsp;19&nbsp;خلال&nbsp;العهد&nbsp;العثماني.&nbsp;يتميز&nbsp;بفن&nbsp;معماري&nbsp;إسلامي–عثماني&nbsp;فريد،&nbsp;زخارف&nbsp;جدارية&nbsp;دقيقة،&nbsp;أفنية&nbsp;داخلية،&nbsp;ونوافير&nbsp;مياه.</p><p class=\"ql-align-right\">كان&nbsp;مقرًا&nbsp;للحكم&nbsp;في&nbsp;عهد&nbsp;أحمد&nbsp;باي،&nbsp;آخر&nbsp;بايات&nbsp;قسنطينة.&nbsp;يعكس&nbsp;نمط&nbsp;الحياة&nbsp;السياسية&nbsp;والاجتماعية&nbsp;في&nbsp;تلك&nbsp;الفترة،&nbsp;ويُعد&nbsp;متحفًا&nbsp;حيًا&nbsp;للتراث&nbsp;العثماني.</p><p class=\"ql-align-right\"><strong>المدينة&nbsp;القديمة&nbsp;(القصبة)&nbsp;</strong></p><p class=\"ql-align-right\">نسيج&nbsp;عمراني&nbsp;تقليدي&nbsp;متشابك&nbsp;من&nbsp;الأزقة&nbsp;الضيقة،&nbsp;البيوت&nbsp;العتيقة،&nbsp;والدروب&nbsp;الحجرية.تضم&nbsp;عددًا&nbsp;من&nbsp;القصور،&nbsp;الدور&nbsp;التقليدية،&nbsp;والحمامات&nbsp;القديمة.تعكس&nbsp;الطابع&nbsp;الاجتماعي&nbsp;والحضري&nbsp;لقسنطينة&nbsp;عبر&nbsp;العصور.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\"><strong>مدينة&nbsp;تيديس&nbsp;الأثرية&nbsp;</strong>&nbsp;تُعد&nbsp;من&nbsp;أقدم&nbsp;وأهم&nbsp;المواقع&nbsp;التاريخية&nbsp;في&nbsp;ولاية&nbsp;قسنطينة،&nbsp;وتقع&nbsp;على&nbsp;بُعد&nbsp;حوالي&nbsp;30&nbsp;كلم&nbsp;شمال&nbsp;غرب&nbsp;مدينة&nbsp;قسنطينة،&nbsp;فوق&nbsp;مرتفع&nbsp;صخري&nbsp;يطل&nbsp;على&nbsp;مناظر&nbsp;طبيعية&nbsp;خلابة.&nbsp;تمثل&nbsp;تيديس&nbsp;شاهداً&nbsp;حياً&nbsp;على&nbsp;تعاقب&nbsp;الحضارات&nbsp;التي&nbsp;مرّت&nbsp;بالمنطقة،&nbsp;من&nbsp;العهد&nbsp;النوميدي&nbsp;إلى&nbsp;الروماني&nbsp;ثم&nbsp;البيزنطي،&nbsp;ما&nbsp;يجعلها&nbsp;متحفاً&nbsp;مفتوحاً&nbsp;في&nbsp;الهواء&nbsp;الطلق.</p><p class=\"ql-align-right\">تعود&nbsp;جذور&nbsp;المدينة&nbsp;إلى&nbsp;الفترة&nbsp;النوميدية،&nbsp;حيث&nbsp;كانت&nbsp;مستوطنة&nbsp;أمازيغية&nbsp;قديمة،&nbsp;قبل&nbsp;أن&nbsp;يطوّرها&nbsp;الرومان&nbsp;ويجعلوا&nbsp;منها&nbsp;مدينة&nbsp;مزدهرة&nbsp;ذات&nbsp;تنظيم&nbsp;عمراني&nbsp;متكامل.&nbsp;ولا&nbsp;تزال&nbsp;آثار&nbsp;هذا&nbsp;التخطيط&nbsp;واضحة&nbsp;من&nbsp;خلال&nbsp;الشوارع&nbsp;المرصوفة&nbsp;بالحجارة،&nbsp;السلالم&nbsp;الصخرية،&nbsp;وبقايا&nbsp;المساكن&nbsp;التي&nbsp;بُنيت&nbsp;بانسجام&nbsp;مع&nbsp;الطبيعة&nbsp;الجبلية&nbsp;الوعرة&nbsp;للمكان.</p><p class=\"ql-align-right\">تزخر&nbsp;تيديس&nbsp;بعدد&nbsp;من&nbsp;المعالم&nbsp;الأثرية&nbsp;البارزة،&nbsp;من&nbsp;بينها&nbsp;الحمّامات&nbsp;الرومانية&nbsp;التي&nbsp;تعكس&nbsp;نمط&nbsp;الحياة&nbsp;الاجتماعية&nbsp;آنذاك،&nbsp;والمعابد&nbsp;المخصصة&nbsp;للطقوس&nbsp;الدينية،&nbsp;إضافة&nbsp;إلى&nbsp;المقابر&nbsp;الصخرية&nbsp;المنحوتة&nbsp;بعناية&nbsp;في&nbsp;الجبال&nbsp;المحيطة،&nbsp;والتي&nbsp;تحمل&nbsp;رموزاً&nbsp;تدل&nbsp;على&nbsp;المعتقدات&nbsp;القديمة.&nbsp;كما&nbsp;تظهر&nbsp;بقايا&nbsp;المنشآت&nbsp;الدفاعية&nbsp;والأسوار&nbsp;التي&nbsp;كانت&nbsp;تحمي&nbsp;المدينة.</p><p class=\"ql-align-right\">تتميّز&nbsp;مدينة&nbsp;تيديس&nbsp;بموقعها&nbsp;الطبيعي&nbsp;الفريد،&nbsp;حيث&nbsp;يلتقي&nbsp;التاريخ&nbsp;بالطبيعة،&nbsp;ما&nbsp;يمنح&nbsp;الزائر&nbsp;تجربة&nbsp;سياحية&nbsp;وثقافية&nbsp;غنية&nbsp;تجمع&nbsp;بين&nbsp;الاستكشاف&nbsp;الأثري&nbsp;والاستمتاع&nbsp;بالمناظر&nbsp;البانورامية.&nbsp;وتُعد&nbsp;الزيارة&nbsp;إلى&nbsp;تيديس&nbsp;محطة&nbsp;أساسية&nbsp;ضمن&nbsp;البرامج&nbsp;السياحية&nbsp;بقسنطينة،&nbsp;خاصة&nbsp;لعشّاق&nbsp;التاريخ&nbsp;والباحثين&nbsp;عن&nbsp;عمق&nbsp;الحضارة&nbsp;الجزائرية&nbsp;الممتدة&nbsp;لآلاف&nbsp;السنين.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\"><strong><u>&nbsp;المساجد&nbsp;والمعالم&nbsp;الدينية</u></strong></p><p class=\"ql-align-right\"><strong>الجامع&nbsp;الكبير</strong></p><p class=\"ql-align-right\">من&nbsp;أقدم&nbsp;مساجد&nbsp;المدينة،&nbsp;يعود&nbsp;تاريخه&nbsp;إلى&nbsp;القرن&nbsp;12&nbsp;ميلادي.&nbsp;يتميز&nbsp;بطرازه&nbsp;المعماري&nbsp;الإسلامي&nbsp;الأصيل&nbsp;وبساطته&nbsp;الجمالية.&nbsp;شكّل&nbsp;مركزًا&nbsp;دينيًا&nbsp;وعلميًا&nbsp;هامًا&nbsp;عبر&nbsp;التاريخ.</p><p class=\"ql-align-right\">يعود&nbsp;ناريخ&nbsp;بناء&nbsp;المسجد&nbsp;الجامع&nbsp;الكبير&nbsp;إلى&nbsp;العام&nbsp;1135&nbsp;م&nbsp;وذلك&nbsp;في&nbsp;فترة&nbsp;حكم&nbsp;دولة&nbsp;بني&nbsp;حماد،&nbsp;وهم&nbsp;سلالة&nbsp;صنهاجية&nbsp;حكمت&nbsp;الجزائر&nbsp;ما&nbsp;بين&nbsp;عامي&nbsp;1014&nbsp;و&nbsp;1152.&nbsp;شهد&nbsp;المسجد&nbsp;عدة&nbsp;توسعات&nbsp;وأعمال&nbsp;ترميم&nbsp;خلال&nbsp;تاريخه&nbsp;الطويل،&nbsp;منها&nbsp;خلال&nbsp;العهد&nbsp;العثماني&nbsp;وذلك&nbsp;في&nbsp;العام&nbsp;1766&nbsp;على&nbsp;يد&nbsp;باي&nbsp;قسنطينة،&nbsp;وأخرى&nbsp;خلال&nbsp;فترة&nbsp;الاحتلال&nbsp;الفرنسي&nbsp;للجزائر،&nbsp;أما&nbsp;آخر&nbsp;أعمال&nbsp;الترميم&nbsp;فقد&nbsp;أجريت&nbsp;خلال&nbsp;السنوات&nbsp;القليلة&nbsp;الماضية.</p><p class=\"ql-align-right\"><strong>مسجد&nbsp;سيدي&nbsp;الكتاني</strong></p><p></p>', '/uploads/destinations/1771109661997-204432488.jpg', 25, 1, '2,200 km²', '1 million inhabitants.', 'wet winters and hot, dry summers', 'شتاء معتدل ممطر وصيف حار جاف', 'Best visits are spring (March–May) or autumn (September–November) for comfortable weather to explore bridges, the Casbah', 'أفضل أوقات الزيارة هي فصل الربيع (مارس - مايو) أو الخريف (سبتمبر - نوفمبر) للاستمتاع بطقس معتدل لاستكشاف الجسور والقصبة.', 'Constantine\'s cuisine features eastern Algerian specialties: heavy on grilled meats (merguez, kebabs), chorba (lamb soup), couscous with mutton and turnips', 'المطبخ القسنطيني يبرز أطباق شرق الجزائر: لحوم مشوية (مرقاز، كباب)، شوربة لحم، كسكسي بلحم الخروف واللفت، معجنات محشوة (بريك، سمسة)، وحلويات مثل المقروض بالتمر أو اللوز؛ الأسواق توفر فواكه موسمية وزيت زيتون.', 'Dress modestly near the Casbah, mosques (e.g., Souq El Ghezal), and old medina.', 'ارتدِ لباساً محتشماً قرب القصبة والمساجد (مثل سوق الغزال) والمدينة القديمة.', ' locally, use taxis, trams, or buses, but walking suits the compact center and bridges—caution on steep paths and gorges.', 'محلياً سيارات أجرة، ترام، حافلات، والمشي مناسب للوسط والجسور—احذر المنحدرات والوديان', 0);
INSERT INTO `destinations` (`id`, `name_en`, `name_ar`, `about_en`, `about_ar`, `background_image`, `sort_order`, `is_active`, `population`, `area`, `climate_en`, `climate_ar`, `best_time_en`, `best_time_ar`, `cuisine_en`, `cuisine_ar`, `etiquette_en`, `etiquette_ar`, `transport_en`, `transport_ar`, `show_on_homepage`) VALUES
(26, 'Médéa', 'المدية', '<p>The&nbsp;historical&nbsp;roots&nbsp;of&nbsp;Medea&nbsp;province&nbsp;run&nbsp;deep,&nbsp;having&nbsp;witnessed&nbsp;the&nbsp;rise&nbsp;and&nbsp;fall&nbsp;of&nbsp;numerous&nbsp;civilizations&nbsp;and&nbsp;peoples.&nbsp;The&nbsp;ruins&nbsp;of&nbsp;Rhapedia&nbsp;and&nbsp;Tanarosuma&nbsp;bear&nbsp;witness&nbsp;to&nbsp;the&nbsp;Roman&nbsp;presence.&nbsp;During&nbsp;the&nbsp;Ottoman&nbsp;period,&nbsp;religious&nbsp;buildings&nbsp;such&nbsp;as&nbsp;mosques&nbsp;and&nbsp;Quranic&nbsp;schools&nbsp;were&nbsp;added.&nbsp;Today,&nbsp;the&nbsp;province,&nbsp;with&nbsp;its&nbsp;green&nbsp;spaces&nbsp;and&nbsp;diverse&nbsp;terrain,&nbsp;offers&nbsp;beautiful&nbsp;hiking&nbsp;trails&nbsp;and&nbsp;scenic&nbsp;landscapes.</p><p></p><p>Founded&nbsp;by&nbsp;the&nbsp;Romans&nbsp;as&nbsp;Lambdia,&nbsp;Medea&nbsp;became&nbsp;the&nbsp;center&nbsp;of&nbsp;power&nbsp;for&nbsp;the&nbsp;Ottoman&nbsp;Beys&nbsp;in&nbsp;the&nbsp;16th&nbsp;century.&nbsp;Its&nbsp;current&nbsp;name&nbsp;is&nbsp;said&nbsp;to&nbsp;derive&nbsp;from&nbsp;the&nbsp;Arabic&nbsp;word&nbsp;&quot;al-madya,&quot;&nbsp;meaning&nbsp;&quot;that&nbsp;which&nbsp;guides&nbsp;to&nbsp;good.&quot;&nbsp;As&nbsp;an&nbsp;administrative&nbsp;and&nbsp;agricultural&nbsp;center,&nbsp;it&nbsp;has&nbsp;preserved&nbsp;traces&nbsp;from&nbsp;every&nbsp;historical&nbsp;era:&nbsp;from&nbsp;its&nbsp;old&nbsp;city,&nbsp;ancient&nbsp;baths,&nbsp;and&nbsp;Ottoman&nbsp;citadel&nbsp;to&nbsp;colonial&nbsp;buildings,&nbsp;as&nbsp;well&nbsp;as&nbsp;a&nbsp;local&nbsp;culture&nbsp;deeply&nbsp;rooted&nbsp;in&nbsp;mountain&nbsp;traditions.&nbsp;Historical&nbsp;and&nbsp;Archaeological&nbsp;Landmarks:&nbsp;The&nbsp;province&nbsp;of&nbsp;Medea&nbsp;is&nbsp;rich&nbsp;in&nbsp;historical&nbsp;and&nbsp;archaeological&nbsp;landmarks,&nbsp;making&nbsp;it&nbsp;a&nbsp;prime&nbsp;tourist&nbsp;destination&nbsp;in&nbsp;the&nbsp;future.&nbsp;Among&nbsp;the&nbsp;most&nbsp;important&nbsp;of&nbsp;these&nbsp;are:</p><p></p><p>Achir:&nbsp;The&nbsp;ancient&nbsp;city&nbsp;of&nbsp;Achir,&nbsp;which&nbsp;was&nbsp;the&nbsp;capital&nbsp;of&nbsp;the&nbsp;Zirid&nbsp;dynasty,&nbsp;is&nbsp;located&nbsp;in&nbsp;the&nbsp;Ain&nbsp;Boucif&nbsp;region.&nbsp;Its&nbsp;founding&nbsp;dates&nbsp;back&nbsp;to&nbsp;936&nbsp;AD&nbsp;by&nbsp;Ziri&nbsp;ibn&nbsp;Manad.&nbsp;It&nbsp;was&nbsp;built&nbsp;on&nbsp;a&nbsp;mountain&nbsp;peak&nbsp;exceeding&nbsp;1400&nbsp;meters&nbsp;in&nbsp;altitude,&nbsp;overlooking&nbsp;the&nbsp;sea.&nbsp;One&nbsp;of&nbsp;the&nbsp;most&nbsp;notable&nbsp;features&nbsp;of&nbsp;this&nbsp;ancient&nbsp;city&nbsp;is&nbsp;its&nbsp;abundance&nbsp;of&nbsp;fresh&nbsp;water.</p><p></p><p>Rapidum:&nbsp;The&nbsp;Roman&nbsp;site&nbsp;of&nbsp;Rapidum&nbsp;is&nbsp;located&nbsp;in&nbsp;the&nbsp;municipality&nbsp;of&nbsp;Djouab,&nbsp;75&nbsp;km&nbsp;from&nbsp;the&nbsp;provincial&nbsp;capital.&nbsp;It&nbsp;covers&nbsp;an&nbsp;area&nbsp;of&nbsp;​​ten&nbsp;hectares&nbsp;and&nbsp;is&nbsp;situated&nbsp;amidst&nbsp;the&nbsp;plains&nbsp;of&nbsp;Djouab,&nbsp;known&nbsp;for&nbsp;their&nbsp;pastures,&nbsp;fertile&nbsp;lands,&nbsp;and&nbsp;valleys.&nbsp;It&nbsp;is&nbsp;also&nbsp;fortified&nbsp;by&nbsp;mountains&nbsp;on&nbsp;all&nbsp;sides.&nbsp;Its&nbsp;founding&nbsp;dates&nbsp;back&nbsp;to&nbsp;122&nbsp;AD.&nbsp;It&nbsp;was&nbsp;one&nbsp;of&nbsp;the&nbsp;most&nbsp;important&nbsp;cities&nbsp;of&nbsp;Mauretania&nbsp;Caesariensis.&nbsp;Firstly,&nbsp;due&nbsp;to&nbsp;its&nbsp;strategic&nbsp;location&nbsp;as&nbsp;a&nbsp;crossing&nbsp;point&nbsp;linking&nbsp;Cherchell&nbsp;and&nbsp;Carthage,&nbsp;and&nbsp;secondly,&nbsp;because&nbsp;it&nbsp;was&nbsp;fortified&nbsp;with&nbsp;sturdy&nbsp;stone&nbsp;walls.&nbsp;Upon&nbsp;visiting&nbsp;the&nbsp;city,&nbsp;tourists&nbsp;are&nbsp;captivated&nbsp;by&nbsp;the&nbsp;decorations&nbsp;and&nbsp;inscriptions&nbsp;carved&nbsp;on&nbsp;the&nbsp;mosaics,&nbsp;reflecting&nbsp;the&nbsp;luxurious&nbsp;and&nbsp;affluent&nbsp;lifestyle&nbsp;enjoyed&nbsp;by&nbsp;the&nbsp;city&#39;s&nbsp;inhabitants.</p>', '<p class=\"ql-align-right\">تضرب&nbsp;جذور&nbsp;ولاية&nbsp;المدية&nbsp;التاريخية&nbsp;في&nbsp;القدم،&nbsp;فقد&nbsp;مرّت&nbsp;على&nbsp;أرضها&nbsp;حضاراتٍ&nbsp;عدة،&nbsp;وسكنتها&nbsp;الكثير&nbsp;من&nbsp;الشعوب،&nbsp;وتشهد&nbsp;بقايا&nbsp;رابدي&nbsp;وتاناروسوما&nbsp;على&nbsp;الوجود&nbsp;الروماني&nbsp;فيها،&nbsp;وفي&nbsp;فترة&nbsp;الحكم&nbsp;التركي،&nbsp;تم&nbsp;إمدادها&nbsp;بالمباني&nbsp;الدينية&nbsp;مثل&nbsp;المساجد&nbsp;والمدارس&nbsp;القرآنية&nbsp;وما&nbsp;إلى&nbsp;ذلك،&nbsp;وتوفر&nbsp;الولاية&nbsp;اليوم&nbsp;بمساحاتها&nbsp;الخضراء&nbsp;وتضاريسها&nbsp;المتنوعة&nbsp;مسارات&nbsp;مشي&nbsp;جميلة&nbsp;ومناظر&nbsp;طبيعية&nbsp;تستحق&nbsp;المشاهدة.</p><p class=\"ql-align-right\">اسسها&nbsp;الرومان&nbsp;باسم&nbsp;&quot;لامبديا&quot;&nbsp;(Lambdia)،&nbsp;ثم&nbsp;أصبحت&nbsp;المدية&nbsp;في&nbsp;القرن&nbsp;السادس&nbsp;عشر&nbsp;مركزاً&nbsp;لسلطة&nbsp;البايات&nbsp;الأتراك&nbsp;في&nbsp;المنطقة.&nbsp;ويُقال&nbsp;إن&nbsp;اسمها&nbsp;الحالي&nbsp;مشتق&nbsp;من&nbsp;الكلمة&nbsp;العربية&nbsp;&quot;المدية&quot;،&nbsp;التي&nbsp;تعني&nbsp;&quot;التي&nbsp;تهدي&nbsp;إلى&nbsp;الخير&quot;.&nbsp;وباعتبارها&nbsp;مدينة&nbsp;إدارية&nbsp;وزراعية،&nbsp;فقد&nbsp;استطاعت&nbsp;الحفاظ&nbsp;على&nbsp;آثار&nbsp;من&nbsp;كل&nbsp;حقبة&nbsp;تاريخية:&nbsp;من&nbsp;مدينتها&nbsp;القديمة،&nbsp;وحماماتها&nbsp;العريقة،&nbsp;وقصبتها&nbsp;العثمانية،&nbsp;إلى&nbsp;المباني&nbsp;الاستعمارية،&nbsp;فضلاً&nbsp;عن&nbsp;ثقافة&nbsp;محلية&nbsp;متجذرة&nbsp;بعمق&nbsp;في&nbsp;التقاليد&nbsp;الجبلية.</p><p class=\"ql-align-right\">معالم&nbsp;تاريخية&nbsp;وأثرية:&nbsp;تزخر&nbsp;والية&nbsp;المدية&nbsp;بمعالم&nbsp;تاريخية&nbsp;وأثرية&nbsp;كثيرة&nbsp;مما&nbsp;يجعلها&nbsp;قطبا&nbsp;سياحيا&nbsp;بامتياز&nbsp;في&nbsp;المستقبل،&nbsp;أهم&nbsp;هذه&nbsp;المعالم&nbsp;الأثرية</p><p class=\"ql-align-right\">&nbsp;<strong>أشير</strong>:&nbsp;تقع&nbsp;مدينة&nbsp;أشير&nbsp;الاثرية&nbsp;التي&nbsp;كانت&nbsp;عاصمة&nbsp;للدولة&nbsp;الزيرية&nbsp;بمنطقة&nbsp;عين&nbsp;بوسيف،&nbsp;ويعود&nbsp;تأسيسها&nbsp;إلى&nbsp;سنة&nbsp;936&nbsp;ميالدية&nbsp;على&nbsp;يد&nbsp;زيري&nbsp;بن&nbsp;مناد&nbsp;ولقد&nbsp;شيدت&nbsp;على&nbsp;قمة&nbsp;جبلية&nbsp;يتعدى&nbsp;علوها&nbsp;1400&nbsp;متر&nbsp;على&nbsp;سطح&nbsp;19&nbsp;الصنهاجي.&nbsp;البحر.&nbsp;ومن&nbsp;أهم&nbsp;ما&nbsp;تتميز&nbsp;به&nbsp;هذه&nbsp;المدينة&nbsp;األثرية&nbsp;وفرة&nbsp;المياه&nbsp;العذبة.؛</p><p class=\"ql-align-right\">&nbsp;<strong>&nbsp;رابيدوم</strong>:&nbsp;تتواجد&nbsp;منطقة&nbsp;رابيدوم&nbsp;الرومانية&nbsp;ببلدية&nbsp;جواب&nbsp;على&nbsp;بعد&nbsp;75&nbsp;كلم&nbsp;عن&nbsp;مقر&nbsp;الولاية،&nbsp;حيث&nbsp;تتربع&nbsp;على&nbsp;مساحة&nbsp;قدرها&nbsp;عشر&nbsp;هكتارات،&nbsp;وهي&nbsp;تتوسط&nbsp;سهول&nbsp;جواب&nbsp;المعروفة&nbsp;بالمراعي&nbsp;والاراضي&nbsp;الخصبة&nbsp;واألودية،&nbsp;وهي&nbsp;أيضا&nbsp;محصنة&nbsp;بالجبال&nbsp;من&nbsp;كل&nbsp;النواحي.&nbsp;ويعود&nbsp;تأسيسها&nbsp;إلى&nbsp;سنة&nbsp;122&nbsp;بعد&nbsp;الميالد.&nbsp;وكانت&nbsp;تمثل&nbsp;أهم&nbsp;مدن&nbsp;موريتانيا&nbsp;القيصرية؛&nbsp;أوال&nbsp;لتموقعها&nbsp;االستراتيجي&nbsp;باعتبارها&nbsp;معبرا&nbsp;يربط&nbsp;بين&nbsp;يول&nbsp;شرشال&nbsp;وقرطاج،&nbsp;وثانيا&nbsp;لكونها&nbsp;محصنة&nbsp;بأسوار&nbsp;متينة&nbsp;مبنية&nbsp;بالحجارة.&nbsp;وعند&nbsp;زيارة&nbsp;المدينة&nbsp;بالداخل&nbsp;ينبهر&nbsp;السائح&nbsp;بالزخرفة&nbsp;والكتابات&nbsp;المنقوشة&nbsp;على&nbsp;؛&nbsp;20&nbsp;الفسيفساء،&nbsp;وهذا&nbsp;ما&nbsp;يعكس&nbsp;حياة&nbsp;الترف&nbsp;والرفاه&nbsp;التي&nbsp;كان&nbsp;سكان&nbsp;المدينة&nbsp;يعيشونها</p><p></p>', '/uploads/destinations/1771110595157-66861387.jpg', 26, 1, 'around 140,000–150,000', '8,700 km²', 'cold, snowy winters and hot, dry summers with good rainfall', 'شتاء بارد ومثلج، وصيف حار وجاف مع هطول أمطار جيدة', 'Spring (March–May) or autumn (September–October) offers mild weather for hiking Ouarsenis slopes, vineyards, and sites like Roman Lambdia ruins.', 'يوفر فصل الربيع (مارس - مايو) أو الخريف (سبتمبر - أكتوبر) طقساً معتدلاً للمشي لمسافات طويلة على منحدرات أوارسينيس، ومزارع الكروم، ومواقع مثل أطلال لامبيديا الرومانية.', 'Highland Algerian fare with Berber influences: couscous with lamb/vegetables, tagines of chicken or mutton with olives/prunes, chorba bean soup, fresh breads', 'أطباق جزائرية من المرتفعات مع لمسات بربرية: الكسكس مع لحم الضأن/الخضار، طواجن الدجاج أو لحم الضأن مع الزيتون/البرقوق، شوربة الفاصوليا، الخبز الطازج', 'Dress modestly in rural areas, markets, and mosques.', 'لباس محتشم في الريف والأسواق والمساجد.', ' walkable/taxi-friendly—cars needed for mountains, vineyards, and sites like Jebel Nador (1,108 m).', 'يمكن الوصول إليها سيراً على الأقدام/بواسطة سيارات الأجرة - السيارات ضرورية للجبال ومزارع الكروم ومواقع مثل جبل الناظور (1108 م).', 0),
(27, 'Mostaganem', 'مستغانم', '<p></p>', '<p></p>', '', 27, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(28, 'M\'Sila', 'المسيلة', '<p></p>', '<p></p>', '', 28, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(29, 'Mascara', 'معسكر', '<p></p>', '<p></p>', '', 29, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(30, 'Ouargla', 'ورقلة', '<p></p>', '<p></p>', '', 30, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(31, 'Oran', 'وهران', '<p><strong>Oran</strong></p><p>Located&nbsp;in&nbsp;northeastern&nbsp;Algeria,&nbsp;overlooking&nbsp;the&nbsp;Bay&nbsp;of&nbsp;Oran,&nbsp;Oran&nbsp;is&nbsp;the&nbsp;second&nbsp;largest&nbsp;city&nbsp;in&nbsp;the&nbsp;country.&nbsp;It&nbsp;boasts&nbsp;a&nbsp;rich&nbsp;cultural&nbsp;diversity,&nbsp;with&nbsp;numerous&nbsp;ancient&nbsp;and&nbsp;modern&nbsp;archaeological,&nbsp;religious,&nbsp;and&nbsp;cultural&nbsp;sites&nbsp;that&nbsp;attract&nbsp;tourists&nbsp;from&nbsp;all&nbsp;over&nbsp;the&nbsp;world.&nbsp;A&nbsp;cradle&nbsp;of&nbsp;many&nbsp;ancient&nbsp;civilizations&nbsp;throughout&nbsp;history,&nbsp;Oran&nbsp;has&nbsp;retained&nbsp;a&nbsp;distinctive&nbsp;Arab&nbsp;character.&nbsp;The&nbsp;city&nbsp;also&nbsp;features&nbsp;numerous&nbsp;churches,&nbsp;mosques,&nbsp;and&nbsp;temples&nbsp;built&nbsp;in&nbsp;the&nbsp;Roman&nbsp;and&nbsp;Byzantine&nbsp;styles,&nbsp;and&nbsp;offers&nbsp;a&nbsp;variety&nbsp;of&nbsp;elegant&nbsp;and&nbsp;luxurious&nbsp;hotels&nbsp;to&nbsp;suit&nbsp;all&nbsp;tourist&nbsp;needs.</p><p></p><p><strong>Tourist&nbsp;Attractions</strong></p><p><strong>Abdelhamid&nbsp;Ibn&nbsp;Badis&nbsp;Mosque</strong></p><p>The&nbsp;Abdelhamid&nbsp;Ibn&nbsp;Badis&nbsp;Mosque&nbsp;is&nbsp;one&nbsp;of&nbsp;Oran&#39;s&nbsp;most&nbsp;prominent&nbsp;landmarks,&nbsp;a&nbsp;must-see&nbsp;destination&nbsp;thanks&nbsp;to&nbsp;its&nbsp;unique&nbsp;architectural&nbsp;style&nbsp;and&nbsp;a&nbsp;favorite&nbsp;spot&nbsp;for&nbsp;tourists&nbsp;and&nbsp;dignitaries&nbsp;visiting&nbsp;the&nbsp;city.</p><p></p><p>The&nbsp;mosque&nbsp;is&nbsp;located&nbsp;in&nbsp;the&nbsp;Jamal&nbsp;Eddine&nbsp;district,&nbsp;specifically&nbsp;near&nbsp;its&nbsp;main&nbsp;roundabout,&nbsp;and&nbsp;covers&nbsp;an&nbsp;area&nbsp;of&nbsp;​​four&nbsp;hectares.&nbsp;It&nbsp;includes&nbsp;two&nbsp;large&nbsp;prayer&nbsp;halls&nbsp;(one&nbsp;for&nbsp;men&nbsp;and&nbsp;one&nbsp;for&nbsp;women)&nbsp;in&nbsp;addition&nbsp;to&nbsp;a&nbsp;vast&nbsp;courtyard,&nbsp;giving&nbsp;it&nbsp;a&nbsp;total&nbsp;capacity&nbsp;of&nbsp;up&nbsp;to&nbsp;25,000&nbsp;worshippers.</p><p></p><p>What&nbsp;distinguishes&nbsp;this&nbsp;edifice&nbsp;is&nbsp;its&nbsp;104-meter-high&nbsp;minaret,&nbsp;entirely&nbsp;covered&nbsp;in&nbsp;glass,&nbsp;and&nbsp;its&nbsp;design&nbsp;inspired&nbsp;by&nbsp;the&nbsp;Andalusian-Moorish&nbsp;architectural&nbsp;style.&nbsp;The&nbsp;building&nbsp;also&nbsp;features&nbsp;a&nbsp;64-meter-high&nbsp;dome&nbsp;and&nbsp;two&nbsp;gates&nbsp;made&nbsp;of&nbsp;wood&nbsp;and&nbsp;bronze.</p><p></p><p><strong>The&nbsp;Great&nbsp;Mosque&nbsp;of&nbsp;Bey&nbsp;Muhammad&nbsp;Uthman</strong></p><p></p><p>This&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;prominent&nbsp;tourist&nbsp;attractions&nbsp;in&nbsp;Oran.&nbsp;It&nbsp;was&nbsp;built&nbsp;at&nbsp;the&nbsp;request&nbsp;of&nbsp;Bey&nbsp;Muhammad&nbsp;Uthman&nbsp;after&nbsp;the&nbsp;end&nbsp;of&nbsp;the&nbsp;Spanish&nbsp;occupation&nbsp;in&nbsp;1792,&nbsp;with&nbsp;the&nbsp;aim&nbsp;of&nbsp;restoring&nbsp;the&nbsp;Islamic&nbsp;character&nbsp;of&nbsp;the&nbsp;city.&nbsp;A&nbsp;visit&nbsp;to&nbsp;it&nbsp;allows&nbsp;you&nbsp;to&nbsp;witness&nbsp;the&nbsp;splendor&nbsp;and&nbsp;creativity&nbsp;of&nbsp;Ottoman&nbsp;architecture,&nbsp;and&nbsp;it&nbsp;stands&nbsp;as&nbsp;an&nbsp;example&nbsp;of&nbsp;the&nbsp;richness&nbsp;of&nbsp;the&nbsp;past,&nbsp;given&nbsp;its&nbsp;proximity&nbsp;to&nbsp;some&nbsp;modern&nbsp;buildings.&nbsp;It&nbsp;is&nbsp;worth&nbsp;noting&nbsp;that&nbsp;Muhammad&nbsp;Uthman&nbsp;prepared&nbsp;a&nbsp;special&nbsp;family&nbsp;tomb,&nbsp;where&nbsp;he&nbsp;is&nbsp;buried.</p><p></p><p><strong>The&nbsp;Pasha&nbsp;Mosque</strong></p><p>The&nbsp;Pasha&nbsp;Mosque&nbsp;was&nbsp;built&nbsp;in&nbsp;1796&nbsp;during&nbsp;the&nbsp;reign&nbsp;of&nbsp;Muhammad&nbsp;Bey&nbsp;al-Kabir,&nbsp;commissioned&nbsp;by&nbsp;Sidi&nbsp;Baba&nbsp;Hassan&nbsp;Pasha&nbsp;of&nbsp;Algiers.&nbsp;The&nbsp;mosque&nbsp;was&nbsp;occupied&nbsp;by&nbsp;French&nbsp;forces&nbsp;during&nbsp;the&nbsp;French&nbsp;invasion.&nbsp;In&nbsp;1833,&nbsp;by&nbsp;order&nbsp;of&nbsp;General&nbsp;Desmichels,&nbsp;it&nbsp;was&nbsp;returned&nbsp;to&nbsp;the&nbsp;Muslims.&nbsp;Later,&nbsp;it&nbsp;was&nbsp;restored&nbsp;by&nbsp;order&nbsp;of&nbsp;Napoleon&nbsp;III.&nbsp;The&nbsp;US&nbsp;government&nbsp;donated&nbsp;$100,000&nbsp;and&nbsp;sent&nbsp;restoration&nbsp;and&nbsp;seismology&nbsp;experts&nbsp;to&nbsp;renovate&nbsp;the&nbsp;mosque&nbsp;in&nbsp;2007.&nbsp;This&nbsp;mosque&nbsp;is&nbsp;a&nbsp;historical&nbsp;monument&nbsp;of&nbsp;Oran,&nbsp;so&nbsp;don&#39;t&nbsp;miss&nbsp;the&nbsp;opportunity&nbsp;to&nbsp;visit&nbsp;it.</p><p></p><p><strong>Abdelkader&nbsp;Alloula&nbsp;Regional&nbsp;Theater</strong></p><p>The&nbsp;city&nbsp;of&nbsp;Oran&nbsp;boasts&nbsp;many&nbsp;historical&nbsp;monuments&nbsp;dating&nbsp;back&nbsp;more&nbsp;than&nbsp;two&nbsp;centuries,&nbsp;and&nbsp;the&nbsp;Abdelkader&nbsp;Alloula&nbsp;Regional&nbsp;Theater&nbsp;is&nbsp;one&nbsp;such&nbsp;example.&nbsp;Dating&nbsp;back&nbsp;to&nbsp;1907,&nbsp;it&nbsp;is&nbsp;a&nbsp;massive&nbsp;building,&nbsp;partially&nbsp;covered&nbsp;by&nbsp;a&nbsp;tiled&nbsp;roof&nbsp;and&nbsp;in&nbsp;other&nbsp;parts&nbsp;by&nbsp;a&nbsp;cement&nbsp;roof.&nbsp;Its&nbsp;main&nbsp;entrance&nbsp;overlooks&nbsp;Place&nbsp;du&nbsp;1er&nbsp;Novembre&nbsp;(November&nbsp;1st&nbsp;Square).&nbsp;Here,&nbsp;a&nbsp;variety&nbsp;of&nbsp;artistic&nbsp;performances&nbsp;are&nbsp;held!</p>', '<p class=\"ql-align-right\"><strong style=\"background-color: rgb(255, 255, 255); color: rgb(46, 46, 46);\">وهران</strong></p><p class=\"ql-align-right\"><span style=\"background-color: rgb(255, 255, 255); color: rgb(46, 46, 46);\">تقع&nbsp;مدينة&nbsp;وهران&nbsp;شمال&nbsp;شرق&nbsp;الجزائر،&nbsp;وتطل&nbsp;على&nbsp;خليج&nbsp;وهران،&nbsp;وتشكّل&nbsp;ثاني&nbsp;أكبر&nbsp;مدن&nbsp;الجزائر،&nbsp;وتتميز&nbsp;بتنوعها&nbsp;الحضاري&nbsp;الكبير،&nbsp;وتحتوي&nbsp;على&nbsp;العديد&nbsp;من&nbsp;الأماكن&nbsp;الأثرية&nbsp;والدينية&nbsp;والثقافية&nbsp;القديمة&nbsp;والحديثة&nbsp;الجاذبة&nbsp;للسياح&nbsp;من&nbsp;مختلف&nbsp;المناطق،&nbsp;فهي&nbsp;مهد&nbsp;للعديد&nbsp;من&nbsp;الحضارات&nbsp;القديمة&nbsp;التي&nbsp;توافدت&nbsp;عليها&nbsp;على&nbsp;مر&nbsp;العصور،&nbsp;إلا&nbsp;انها&nbsp;ظلت&nbsp;ذات&nbsp;طابع&nbsp;عربي&nbsp;مميز.&nbsp;كما&nbsp;تحتوي&nbsp;المدينة&nbsp;على&nbsp;العديد&nbsp;من&nbsp;الكنائس&nbsp;والمساجد&nbsp;والمعابد&nbsp;المبنية&nbsp;على&nbsp;الطراز&nbsp;الروماني&nbsp;والبيزنطي،&nbsp;وتتوفر&nbsp;فيها&nbsp;العديد&nbsp;من&nbsp;الفنادق&nbsp;المميزة&nbsp;والفاخرة&nbsp;التي&nbsp;تلبي&nbsp;جميع&nbsp;احتياجات&nbsp;السياح.</span></p><p class=\"ql-align-right\"><strong style=\"color: rgb(46, 46, 46);\">المقومات&nbsp;السياحية</strong></p><p class=\"ql-align-right\"><strong style=\"background-color: rgb(255, 255, 255); color: rgb(46, 46, 46);\">مسجد&nbsp;عبد&nbsp;الحميد&nbsp;ابن&nbsp;باديس</strong></p><p class=\"ql-align-right\"><span style=\"color: rgb(46, 46, 46);\">يعتبر&nbsp;مسجد&nbsp;عبد&nbsp;الحميد&nbsp;ابن&nbsp;باديس&nbsp;أحد&nbsp;أبرز&nbsp;معالم&nbsp;مدينة&nbsp;وهران،&nbsp;حيث&nbsp;صار&nbsp;مرجعاً&nbsp;لا&nbsp;غنى&nbsp;عنه&nbsp;بفضل&nbsp;نمطه&nbsp;المعماري&nbsp;المتميز،&nbsp;ووجهة&nbsp;مفضلة&nbsp;للسياح&nbsp;والشخصيات&nbsp;التي&nbsp;تزور&nbsp;المدينة.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(46, 46, 46);\">يقع&nbsp;المسجد&nbsp;في&nbsp;حي&nbsp;&quot;جمال&nbsp;الدين&quot;،&nbsp;وتحديداً&nbsp;بالقرب&nbsp;من&nbsp;المحور&nbsp;الدوران&nbsp;الكبير&nbsp;التابع&nbsp;له،&nbsp;على&nbsp;مساحة&nbsp;إجمالية&nbsp;تبلغ&nbsp;أربعة&nbsp;هكتارات.&nbsp;ويضم&nbsp;قاعتين&nbsp;كبيرتين&nbsp;للصلاة&nbsp;(للرجال&nbsp;والنساء)&nbsp;بالإضافة&nbsp;إلى&nbsp;ساحة&nbsp;شاسعة،&nbsp;مما&nbsp;يمنحه&nbsp;قدرة&nbsp;استيعاب&nbsp;إجمالية&nbsp;تصل&nbsp;إلى&nbsp;25,000&nbsp;مصلٍ.</span></p><p class=\"ql-align-right\"><span style=\"color: rgb(46, 46, 46);\">وما&nbsp;يميز&nbsp;هذا&nbsp;الصرح&nbsp;هو&nbsp;مئذنته&nbsp;التي&nbsp;يبلغ&nbsp;ارتفاعها&nbsp;104&nbsp;أمتار&nbsp;والمغطاة&nbsp;بالكامل&nbsp;بالزجاج،&nbsp;وتصميمه&nbsp;المستوحى&nbsp;من&nbsp;الطراز&nbsp;المعماري&nbsp;الأندلسي&nbsp;المغاربي.&nbsp;كما&nbsp;يتوفر&nbsp;المبنى&nbsp;على&nbsp;قبة&nbsp;بارتفاع&nbsp;64&nbsp;متراً&nbsp;وبوابتين&nbsp;مصنوعتين&nbsp;من&nbsp;الخشب&nbsp;والبرونز.</span></p><p class=\"ql-align-right\"><strong style=\"background-color: rgb(255, 255, 255); color: rgb(46, 46, 46);\">مسجد&nbsp;الباي&nbsp;محمد&nbsp;عثمان&nbsp;الكبير</strong></p><p class=\"ql-align-right\"><span style=\"background-color: rgb(255, 255, 255); color: rgb(46, 46, 46);\">هو&nbsp;أحد&nbsp;المزارات&nbsp;السياحية&nbsp;المميّزة&nbsp;في&nbsp;مدينة&nbsp;وهران&nbsp;وقد&nbsp;تم&nbsp;بناؤه&nbsp;بناء&nbsp;على&nbsp;طلب&nbsp;الباي&nbsp;محمد&nbsp;عثمان&nbsp;وذلك&nbsp;بعد&nbsp;انتهاء&nbsp;الاحتلال&nbsp;الإسباني&nbsp;عام&nbsp;1792م،&nbsp;وكان&nbsp;يهدف&nbsp;إلى&nbsp;إعادة&nbsp;الطابع&nbsp;الإسلامي&nbsp;للمدينة.&nbsp;وعند&nbsp;زيارته&nbsp;يمكنك&nbsp;رؤية&nbsp;روعة&nbsp;وإبداع&nbsp;الفن&nbsp;المعماري&nbsp;العثماني،&nbsp;ويُعد&nbsp;مثالا&nbsp;على&nbsp;عراقة&nbsp;الماضي&nbsp;نظرا&nbsp;لوقوعه&nbsp;بالقرب&nbsp;من&nbsp;بعض&nbsp;المباني&nbsp;الحديثة.&nbsp;ومن&nbsp;الجدير&nbsp;بالذّكر&nbsp;أن&nbsp;محمد&nbsp;عثمان&nbsp;قام&nbsp;بإعداد&nbsp;مقابر&nbsp;خاصة&nbsp;للعائلة&nbsp;ودُفن&nbsp;فيها.</span></p><h2 class=\"ql-align-right\"><strong style=\"background-color: rgb(255, 255, 255); color: rgb(46, 46, 46);\">مسجد&nbsp;الباشا</strong></h2><p class=\"ql-align-right\"><span style=\"background-color: rgb(255, 255, 255); color: rgb(46, 46, 46);\">تم&nbsp;بناء&nbsp;مسجد&nbsp;الباشا&nbsp;في&nbsp;عام&nbsp;1796&nbsp;في&nbsp;عهد&nbsp;محمد&nbsp;بيك&nbsp;الكبير&nbsp;وأمر&nbsp;سيدي&nbsp;بابا&nbsp;حسن&nbsp;باشا&nbsp;من&nbsp;الجزائر&nbsp;العاصمة.&nbsp;احتلت&nbsp;المسجد&nbsp;مجموعة&nbsp;من&nbsp;القوات&nbsp;الفرنسية،&nbsp;خلال&nbsp;الغزو&nbsp;الفرنسي&nbsp;.&nbsp;كما&nbsp;في&nbsp;عام&nbsp;1833،&nbsp;و&nbsp;بأمر&nbsp;من&nbsp;الجنرال&nbsp;ديميشيل،&nbsp;عاد&nbsp;المسجد&nbsp;للمسلمين.&nbsp;في&nbsp;وقت&nbsp;لاحق&nbsp;تم&nbsp;استعادة&nbsp;المسجد&nbsp;بأمر&nbsp;من&nbsp;نابليون&nbsp;الثالث.&nbsp;تبرعت&nbsp;الحكومة&nbsp;الأمريكية&nbsp;ب&nbsp;100000&nbsp;دولار&nbsp;أمريكي،&nbsp;وأرسلت&nbsp;خبراء&nbsp;في&nbsp;الترميم&nbsp;وعلم&nbsp;الزلازل&nbsp;من&nbsp;أجل&nbsp;تجديد&nbsp;المسجد&nbsp;في&nbsp;عام&nbsp;2007&nbsp;.&nbsp;يعد&nbsp;هذا&nbsp;المسجد&nbsp;نصب&nbsp;تاريخي&nbsp;لمدينة&nbsp;وهران،&nbsp;فلا&nbsp;تفوتوا&nbsp;فرصة&nbsp;زيارته.</span></p><h2 class=\"ql-align-right\"><strong style=\"background-color: rgb(255, 255, 255); color: rgb(46, 46, 46);\">المسرح&nbsp;الجهوي&nbsp;عبد&nbsp;القادر&nbsp;علولة</strong></h2><p class=\"ql-align-right\"><span style=\"background-color: rgb(255, 255, 255); color: rgb(46, 46, 46);\">تضم&nbsp;مدينة&nbsp;وهران&nbsp;العديد&nbsp;من&nbsp;المعالم&nbsp;الأثرية&nbsp;التاريخية&nbsp;التي&nbsp;تعود&nbsp;بتاريخها&nbsp;لأكثر&nbsp;من&nbsp;مائتي&nbsp;عام،&nbsp;والمسرح&nbsp;الجهوي&nbsp;عبد&nbsp;القادر&nbsp;علولة&nbsp;هو&nbsp;أحد&nbsp;الأمثلة&nbsp;الشاهدة&nbsp;على&nbsp;ذلك،&nbsp;والذي&nbsp;يعود&nbsp;بتاريخهِ&nbsp;لعام&nbsp;1907م،&nbsp;وهو&nbsp;عبارة&nbsp;عن&nbsp;بناية&nbsp;ضخمة&nbsp;مغطاة&nbsp;في&nbsp;بعض&nbsp;الأجزاء&nbsp;بسقفٍ&nbsp;من&nbsp;القرميد&nbsp;وفي&nbsp;البعض&nbsp;الأخر&nbsp;بسطح&nbsp;من&nbsp;الإسمنت،&nbsp;ويتميز&nbsp;بواجهة&nbsp;من&nbsp;مدخل&nbsp;رئيسي&nbsp;يطل&nbsp;على&nbsp;ساحة&nbsp;الأول&nbsp;من&nbsp;نوفمبر.&nbsp;وهنا،&nbsp;وفي&nbsp;هذا&nbsp;المسرح&nbsp;تُقام&nbsp;العديد&nbsp;من&nbsp;العروض&nbsp;الفنية&nbsp;المختلفة!</span></p><p></p>', '/uploads/destinations/1771103898815-946169135.jpg', 31, 1, '800,000', ' 64 km²', '', '', 'rom April to October, when the weather is warm and pleasant', 'من أبريل إلى أكتوبر، عندما يكون الطقس دافئًا ولطيفًا', 'Oran’s cuisine is Mediterranean and North‑African with strong Andalusian influence', 'يتميز مطبخ وهران بأنه متوسطي وشمال أفريقي مع تأثير أندلسي قوي', 'Dress modestly, especially in traditional neighborhoods and religious sites.', 'ارتدي ملابس محتشمة، خاصة في الأحياء التقليدية والمواقع الدينية.', 'Oran can be explored by taxi, tram, and bus, with many central sights reachable on foot ', 'يمكن استكشاف وهران بواسطة سيارات الأجرة والترام والحافلات، كما يمكن الوصول إلى العديد من المعالم السياحية المركزية سيرًا على الأقدام.', 1),
(32, 'El Bayadh', 'البيض', '<p></p>', '<p></p>', '', 32, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(33, 'Illizi', 'إليزي', '<p></p>', '<p></p>', '', 33, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(34, 'Bordj Bou Arréridj', 'برج بوعريريج', '<p></p>', '<p></p>', '', 34, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(35, 'Boumerdès', 'بومرداس', '<p></p>', '<p></p>', '', 35, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(36, 'El Tarf', 'الطارف', '<p></p>', '<p></p>', '', 36, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(37, 'Tindouf', 'تندوف', '<p></p>', '<p></p>', '', 37, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(38, 'Tissemsilt', 'تيسمسيلت', '<p>Tissemsilt&nbsp;is&nbsp;located&nbsp;in&nbsp;northwestern&nbsp;Algeria&nbsp;and&nbsp;is&nbsp;characterized&nbsp;by&nbsp;its&nbsp;beautiful&nbsp;mountainous&nbsp;and&nbsp;plateau&nbsp;terrain.&nbsp;The&nbsp;Ouarsenis&nbsp;Mountains,&nbsp;covered&nbsp;with&nbsp;dense&nbsp;forests,&nbsp;dot&nbsp;the&nbsp;landscape,&nbsp;alongside&nbsp;fertile&nbsp;plains&nbsp;and&nbsp;flowing&nbsp;valleys.&nbsp;Its&nbsp;Mediterranean&nbsp;mountain&nbsp;climate,&nbsp;with&nbsp;cold,&nbsp;rainy&nbsp;winters&nbsp;and&nbsp;mild&nbsp;summers,&nbsp;makes&nbsp;it&nbsp;one&nbsp;of&nbsp;the&nbsp;greenest&nbsp;and&nbsp;most&nbsp;naturally&nbsp;beautiful&nbsp;regions&nbsp;in&nbsp;Algeria.</p><p></p><p>The&nbsp;name&nbsp;Tissemsilt&nbsp;originates&nbsp;from&nbsp;the&nbsp;Berber&nbsp;language,&nbsp;where&nbsp;it&nbsp;is&nbsp;said&nbsp;to&nbsp;be&nbsp;composed&nbsp;of&nbsp;two&nbsp;parts:&nbsp;&quot;Tiss,&quot;&nbsp;meaning&nbsp;spring&nbsp;or&nbsp;well,&nbsp;and&nbsp;&quot;Msilt,&quot;&nbsp;meaning&nbsp;sloping&nbsp;place&nbsp;or&nbsp;waterway.&nbsp;Thus,&nbsp;the&nbsp;name&nbsp;can&nbsp;be&nbsp;translated&nbsp;as&nbsp;&quot;spring&nbsp;of&nbsp;the&nbsp;valley&quot;&nbsp;or&nbsp;&quot;watercourse,&quot;&nbsp;reflecting&nbsp;the&nbsp;region&#39;s&nbsp;rich&nbsp;natural&nbsp;beauty,&nbsp;with&nbsp;its&nbsp;numerous&nbsp;springs,&nbsp;valleys,&nbsp;and&nbsp;dense&nbsp;forests.</p><p></p><p>The&nbsp;Tissemsilt&nbsp;region&nbsp;has&nbsp;been&nbsp;inhabited&nbsp;since&nbsp;ancient&nbsp;times&nbsp;and&nbsp;has&nbsp;witnessed&nbsp;the&nbsp;passage&nbsp;of&nbsp;several&nbsp;civilizations,&nbsp;including&nbsp;the&nbsp;Numidians&nbsp;and&nbsp;the&nbsp;Romans,&nbsp;who&nbsp;left&nbsp;behind&nbsp;traces&nbsp;of&nbsp;their&nbsp;agricultural&nbsp;and&nbsp;military&nbsp;activity.&nbsp;During&nbsp;the&nbsp;Islamic&nbsp;era,&nbsp;it&nbsp;was&nbsp;part&nbsp;of&nbsp;the&nbsp;Tiaret&nbsp;region&nbsp;and&nbsp;later&nbsp;the&nbsp;Western&nbsp;Zab,&nbsp;and&nbsp;it&nbsp;experienced&nbsp;great&nbsp;prosperity&nbsp;during&nbsp;the&nbsp;Zayyanid&nbsp;dynasty.&nbsp;During&nbsp;the&nbsp;French&nbsp;occupation,&nbsp;it&nbsp;was&nbsp;a&nbsp;region&nbsp;of&nbsp;fierce&nbsp;resistance,&nbsp;as&nbsp;the&nbsp;Ouarsenis&nbsp;Mountains&nbsp;sheltered&nbsp;many&nbsp;mujahideen&nbsp;who&nbsp;fought&nbsp;the&nbsp;colonizer,&nbsp;and&nbsp;from&nbsp;there,&nbsp;significant&nbsp;operations&nbsp;were&nbsp;launched&nbsp;during&nbsp;the&nbsp;Algerian&nbsp;War&nbsp;of&nbsp;Independence.&nbsp;Tissemsilt&nbsp;became&nbsp;an&nbsp;independent&nbsp;province&nbsp;in&nbsp;1984,&nbsp;having&nbsp;previously&nbsp;been&nbsp;part&nbsp;of&nbsp;the&nbsp;Tiaret&nbsp;province.</p><p></p><p>The&nbsp;State&#39;s&nbsp;Tourist&nbsp;Attractions</p><p></p><p>The&nbsp;tourist&nbsp;areas&nbsp;of&nbsp;the&nbsp;Tissemsilt&nbsp;region&nbsp;possess&nbsp;a&nbsp;unique&nbsp;character&nbsp;and&nbsp;distinctive&nbsp;charm&nbsp;that&nbsp;attracts&nbsp;tourists,&nbsp;visitors,&nbsp;and&nbsp;investors&nbsp;alike.&nbsp;These&nbsp;include&nbsp;breathtakingly&nbsp;beautiful&nbsp;forest&nbsp;trails&nbsp;that&nbsp;tantalize&nbsp;those&nbsp;eager&nbsp;to&nbsp;explore&nbsp;the&nbsp;secrets&nbsp;of&nbsp;the&nbsp;Ouarsenis&nbsp;jungles,&nbsp;forest&nbsp;reserves&nbsp;rich&nbsp;in&nbsp;plant&nbsp;and&nbsp;animal&nbsp;life,&nbsp;mineral&nbsp;springs,&nbsp;majestic&nbsp;snow-capped&nbsp;mountains,&nbsp;and&nbsp;archaeological&nbsp;sites&nbsp;that&nbsp;tell&nbsp;the&nbsp;stories&nbsp;of&nbsp;bygone&nbsp;civilizations.</p><p></p><p>In&nbsp;addition&nbsp;to&nbsp;the&nbsp;tourist&nbsp;and&nbsp;archaeological&nbsp;sites,&nbsp;your&nbsp;journey&nbsp;of&nbsp;discovery&nbsp;in&nbsp;Tissemsilt&nbsp;will&nbsp;be&nbsp;accompanied&nbsp;by&nbsp;an&nbsp;artistic&nbsp;and&nbsp;folkloric&nbsp;heritage,&nbsp;musical&nbsp;styles,&nbsp;handicrafts,&nbsp;and&nbsp;customs&nbsp;and&nbsp;traditions&nbsp;as&nbsp;rich&nbsp;as&nbsp;the&nbsp;region&#39;s&nbsp;natural&nbsp;beauty.&nbsp;The&nbsp;present&nbsp;is&nbsp;geared&nbsp;towards&nbsp;the&nbsp;future,&nbsp;and&nbsp;among&nbsp;the&nbsp;most&nbsp;important&nbsp;of&nbsp;these&nbsp;tourist&nbsp;areas&nbsp;are:</p><p></p><p>Ain&nbsp;Antar&nbsp;National&nbsp;Park&nbsp;–&nbsp;Bougaid</p><p></p><p>The&nbsp;journey&nbsp;to&nbsp;discover&nbsp;the&nbsp;capital&nbsp;of&nbsp;the&nbsp;Ouarsenis&nbsp;will&nbsp;inevitably&nbsp;lead&nbsp;you&nbsp;to&nbsp;climb&nbsp;its&nbsp;high&nbsp;mountains&nbsp;and&nbsp;stand&nbsp;at&nbsp;the&nbsp;highest&nbsp;peak&nbsp;of&nbsp;the&nbsp;Ouarsenis&nbsp;–&nbsp;Sidi&nbsp;Amar&nbsp;–&nbsp;which&nbsp;reaches&nbsp;an&nbsp;altitude&nbsp;of&nbsp;1983&nbsp;meters.&nbsp;You&nbsp;will&nbsp;also&nbsp;discover&nbsp;the&nbsp;cedar&nbsp;trees&nbsp;of&nbsp;Ain&nbsp;Antar&nbsp;and&nbsp;learn&nbsp;the&nbsp;story&nbsp;of&nbsp;the&nbsp;two&nbsp;thousand-year-old&nbsp;trees&nbsp;(Sultan&nbsp;and&nbsp;Sultana)&nbsp;located&nbsp;within&nbsp;the&nbsp;region.&nbsp;The&nbsp;regional&nbsp;park&nbsp;in&nbsp;Bougaid.</p>', '<p class=\"ql-align-right\">تقع&nbsp;تيسمسيلت&nbsp;في&nbsp;الشمال&nbsp;الغربي&nbsp;للجزائر&nbsp;و&nbsp;تتميز&nbsp;بتضاريس&nbsp;جبلية&nbsp;وهضابية&nbsp;جميلة،&nbsp;حيث&nbsp;تنتشر&nbsp;جبال&nbsp;الونشريس&nbsp;المغطاة&nbsp;بالغابات&nbsp;الكثيفة،&nbsp;إلى&nbsp;جانب&nbsp;سهول&nbsp;خصبة&nbsp;ووديان&nbsp;متدفقة.&nbsp;مناخها&nbsp;متوسطي&nbsp;جبلي،&nbsp;بشتاء&nbsp;بارد&nbsp;ممطر&nbsp;وصيف&nbsp;معتدل،&nbsp;مما&nbsp;يجعلها&nbsp;من&nbsp;أكثر&nbsp;مناطق&nbsp;الجزائر&nbsp;خضرة&nbsp;وجمالًا&nbsp;طبيعيًا</p><p class=\"ql-align-right\">يرجع&nbsp;أصل&nbsp;اسم&nbsp;تيسمسيلت&nbsp;إلى&nbsp;اللغة&nbsp;الأمازيغية،&nbsp;حيث&nbsp;يُقال&nbsp;إن&nbsp;الكلمة&nbsp;تتكون&nbsp;من&nbsp;مقطعين:&nbsp;<em>تيس</em>&nbsp;وتعني&nbsp;الينبوع&nbsp;أو&nbsp;العين،&nbsp;و<em>مسيلت</em>&nbsp;وتعني&nbsp;المكان&nbsp;المنحدر&nbsp;أو&nbsp;الممر&nbsp;المائي.&nbsp;وبذلك&nbsp;يمكن&nbsp;أن&nbsp;يُترجم&nbsp;الاسم&nbsp;إلى&nbsp;عين&nbsp;الوادي&nbsp;أو&nbsp;مجرى&nbsp;الماء،&nbsp;وهو&nbsp;ما&nbsp;يعكس&nbsp;طبيعة&nbsp;الولاية&nbsp;الغنية&nbsp;بالينابيع&nbsp;والوديان&nbsp;والغابات&nbsp;الكثيفة.</p><p class=\"ql-align-right\">عرفت&nbsp;منطقة&nbsp;تيسمسيلت&nbsp;وجود&nbsp;الإنسان&nbsp;منذ&nbsp;العصور&nbsp;القديمة،&nbsp;وشهدت&nbsp;مرور&nbsp;عدة&nbsp;حضارات&nbsp;مثل&nbsp;النوميديين&nbsp;والرومان&nbsp;الذين&nbsp;تركوا&nbsp;آثارًا&nbsp;تدل&nbsp;على&nbsp;نشاطهم&nbsp;الزراعي&nbsp;والعسكري.&nbsp;في&nbsp;العهد&nbsp;الإسلامي،&nbsp;كانت&nbsp;جزءًا&nbsp;من&nbsp;إقليم&nbsp;تيهرت&nbsp;ثم&nbsp;الزاب&nbsp;الغربي،&nbsp;وعرفت&nbsp;ازدهارًا&nbsp;كبيرًا&nbsp;خلال&nbsp;حكم&nbsp;الدولة&nbsp;الزيانية.&nbsp;في&nbsp;فترة&nbsp;الاحتلال&nbsp;الفرنسي،&nbsp;كانت&nbsp;منطقة&nbsp;مقاومة&nbsp;شرسة،&nbsp;إذ&nbsp;احتضنت&nbsp;جبال&nbsp;الونشريس&nbsp;العديد&nbsp;من&nbsp;المجاهدين&nbsp;الذين&nbsp;قاوموا&nbsp;المستعمر،&nbsp;ومنها&nbsp;انطلقت&nbsp;عمليات&nbsp;بارزة&nbsp;أثناء&nbsp;الثورة&nbsp;التحريرية&nbsp;المباركة.&nbsp;أصبحت&nbsp;تيسمسيلت&nbsp;ولاية&nbsp;قائمة&nbsp;بذاتها&nbsp;سنة&nbsp;1984&nbsp;بعد&nbsp;أن&nbsp;كانت&nbsp;تابعة&nbsp;لولاية&nbsp;تيارت.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\"><strong><u>المقومات&nbsp;السياحية&nbsp;للولاية</u></strong></p><p class=\"ql-align-right\">للفضاءات&nbsp;السياحية&nbsp;بمنطقة&nbsp;تيسمسيلت&nbsp;طابع&nbsp;خاص&nbsp;ونكهة&nbsp;مميز&nbsp;تغري&nbsp;السائح&nbsp;والزائر&nbsp;والمستثمر&nbsp;على&nbsp;حد&nbsp;سواء&nbsp;–&nbsp;مسالك&nbsp;سياحية&nbsp;غابية&nbsp;روعة&nbsp;في&nbsp;الجمال&nbsp;تفشي&nbsp;غليل&nbsp;محبي&nbsp;الإطلاع&nbsp;على&nbsp;أسرار&nbsp;أدغال&nbsp;الونشريس&nbsp;،&nbsp;حظائر&nbsp;غابية&nbsp;ثرية&nbsp;بثرواتها&nbsp;النباتية&nbsp;والحيوانية&nbsp;–&nbsp;ينابع&nbsp;معدنية&nbsp;جبال&nbsp;شامخة&nbsp;مغطاة&nbsp;بالثلوج&nbsp;،&nbsp;معالم&nbsp;أثرية&nbsp;تروي&nbsp;حكايات&nbsp;حضارات&nbsp;ولت&nbsp;</p><p class=\"ql-align-right\">يصاحبك&nbsp;في&nbsp;رحلة&nbsp;اكتشاف&nbsp;تيسمسيلت&nbsp;إضافة&nbsp;إلى&nbsp;المعالم&nbsp;السياحية&nbsp;والأثرية&nbsp;تراث&nbsp;فني&nbsp;وفلكلوري&nbsp;،&nbsp;طبوع&nbsp;موسيقية&nbsp;،&nbsp;صناعات&nbsp;حرفية&nbsp;،&nbsp;عادات&nbsp;وتقاليد&nbsp;ثرية&nbsp;ثراء&nbsp;المنطقة&nbsp;الطبيعي،&nbsp;الحاضر&nbsp;من&nbsp;أجل&nbsp;المستقبل&nbsp;،&nbsp;ومن&nbsp;أهم&nbsp;هذه&nbsp;الفضاءات&nbsp;السياحية&nbsp;</p><p class=\"ql-align-right\"><strong><u>حظيرة&nbsp;–&nbsp;عين&nbsp;عنتر&nbsp;–&nbsp;بوقايد</u></strong></p><p class=\"ql-align-right\">&nbsp;إن&nbsp;رحلة&nbsp;اكتشاف&nbsp;عاصمة&nbsp;الونشريس&nbsp;تقودك&nbsp;حتما&nbsp;إلى&nbsp;تسلق&nbsp;أعالي&nbsp;جبالها&nbsp;والوقوف&nbsp;عند&nbsp;أعلى&nbsp;قمة&nbsp;الونشريس&nbsp;–&nbsp;بسيدي&nbsp;اعمر&nbsp;–&nbsp;التي&nbsp;تبلغ&nbsp;علوها&nbsp;1983&nbsp;م&nbsp;.مع&nbsp;إكتشاف&nbsp;أشجار&nbsp;غابة&nbsp;الأرز&nbsp;بعين&nbsp;عنتر&nbsp;والتعرف&nbsp;على&nbsp;حكاية&nbsp;شجرتي&nbsp;الألفية&nbsp;(&nbsp;سلطان&nbsp;وسلطانة&nbsp;)&nbsp;الواقعة&nbsp;داخل&nbsp;إقليم&nbsp;الحظيرة&nbsp;الجهوية&nbsp;ببوقايد.</p>', '/uploads/destinations/1771108998133-83241878.jpg', 38, 1, '362,000', '3,152 km', 'cold', 'بارد ', 'Optimal visiting time is late spring (April–June) or early autumn (September–October) for mild weather', 'يُعد أواخر الربيع (أبريل - يونيو) أو أوائل الخريف (سبتمبر - أكتوبر) أفضل وقت للزيارة للاستمتاع بالطقس المعتدل', 'Cuisine reflects highland Berber-Algerian roots with hearty, warming dishes', 'المطبخ يعكس جذوراً بربرية جزائرية هضبية', 'Opt for modest clothing, particularly in rural forests, villages, and mosques.', 'ارتدِ لباساً محتشماً خاصة في الغابات والقرى والمساجد.', 'uses intercity buses, shared taxis, and national roads RN4/RN40; locally, rely on taxis or walking in the compact center,', 'تستخدم الحافلات بين المدن وسيارات الأجرة المشتركة والطرق الوطنية RN4/RN40؛ أما محلياً، فيعتمد السكان على سيارات الأجرة أو المشي في المركز المكتظ.', 0),
(39, 'El Oued', 'الوادي', '<p></p>', '<p></p>', '', 39, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(40, 'Khenchela', 'خنشلة', '<p>Khenchela&nbsp;Province&nbsp;is&nbsp;located&nbsp;in&nbsp;northeastern&nbsp;Algeria,&nbsp;specifically&nbsp;in&nbsp;the&nbsp;Aurès&nbsp;region.&nbsp;It&nbsp;is&nbsp;believed&nbsp;that&nbsp;the&nbsp;city&nbsp;derives&nbsp;its&nbsp;name&nbsp;from&nbsp;the&nbsp;daughter&nbsp;of&nbsp;the&nbsp;Berber&nbsp;queen&nbsp;Dihya,&nbsp;known&nbsp;to&nbsp;the&nbsp;Arabs&nbsp;as&nbsp;Kahina.</p><p></p><p>The&nbsp;city&nbsp;is&nbsp;approximately&nbsp;600&nbsp;km&nbsp;from&nbsp;the&nbsp;capital,&nbsp;Algiers,&nbsp;and&nbsp;has&nbsp;a&nbsp;population&nbsp;of&nbsp;around&nbsp;384,268,&nbsp;covering&nbsp;an&nbsp;area&nbsp;of&nbsp;​​approximately&nbsp;9,715&nbsp;square&nbsp;kilometers.</p><p></p><p>Khenchela&#39;s&nbsp;history&nbsp;traces&nbsp;back&nbsp;to&nbsp;Berber&nbsp;origins&nbsp;that&nbsp;evolved&nbsp;through&nbsp;ancient&nbsp;civilizations.&nbsp;The&nbsp;region&nbsp;was&nbsp;a&nbsp;stage&nbsp;for&nbsp;significant&nbsp;events&nbsp;and&nbsp;a&nbsp;refuge&nbsp;for&nbsp;prominent&nbsp;Berber&nbsp;figures,&nbsp;such&nbsp;as&nbsp;Iabdas,&nbsp;and&nbsp;the&nbsp;legendary&nbsp;queen&nbsp;Kahina,&nbsp;who&nbsp;left&nbsp;an&nbsp;important&nbsp;mark&nbsp;on&nbsp;Algerian&nbsp;history.&nbsp;The&nbsp;Romans&nbsp;called&nbsp;it&nbsp;Mascula,&nbsp;founded&nbsp;by&nbsp;the&nbsp;third&nbsp;Roman&nbsp;garrison&nbsp;(Auguristus)&nbsp;in&nbsp;the&nbsp;first&nbsp;century&nbsp;AD.&nbsp;The&nbsp;importance&nbsp;and&nbsp;number&nbsp;of&nbsp;archaeological&nbsp;sites&nbsp;scattered&nbsp;throughout&nbsp;the&nbsp;region&nbsp;testify&nbsp;to&nbsp;its&nbsp;vitality&nbsp;and&nbsp;the&nbsp;actual&nbsp;presence&nbsp;of&nbsp;the&nbsp;Romans,&nbsp;who&nbsp;achieved&nbsp;military&nbsp;penetration,&nbsp;particularly&nbsp;through&nbsp;Nefest&nbsp;(Tebessa)&nbsp;and&nbsp;Lambèse,&nbsp;passing&nbsp;through&nbsp;Mascula&nbsp;and&nbsp;Baghai.&nbsp;The&nbsp;region&nbsp;also&nbsp;formed&nbsp;the&nbsp;first&nbsp;stronghold&nbsp;(obstacle)&nbsp;to&nbsp;the&nbsp;Byzantines&#39;&nbsp;attempts&nbsp;to&nbsp;reconquer&nbsp;the&nbsp;Aurès&nbsp;region&nbsp;during&nbsp;the&nbsp;Middle&nbsp;Ages.&nbsp;Baghai&nbsp;and&nbsp;Mascula&nbsp;experienced&nbsp;a&nbsp;prosperous&nbsp;and&nbsp;eventful&nbsp;life&nbsp;until&nbsp;the&nbsp;arrival&nbsp;of&nbsp;the&nbsp;Ottomans,&nbsp;who&nbsp;exercised&nbsp;only&nbsp;relative&nbsp;rule&nbsp;and&nbsp;control&nbsp;over&nbsp;Khenchela&nbsp;and&nbsp;its&nbsp;surroundings.&nbsp;The&nbsp;French&nbsp;occupation,&nbsp;however,&nbsp;witnessed&nbsp;numerous&nbsp;uprisings&nbsp;and&nbsp;acts&nbsp;of&nbsp;resistance&nbsp;until&nbsp;the&nbsp;day&nbsp;the&nbsp;anthem&nbsp;of&nbsp;the&nbsp;immortal&nbsp;November&nbsp;1st&nbsp;Revolution&nbsp;was&nbsp;heard.</p><p></p><p><strong>1-&nbsp;Tourist&nbsp;Attractions:</strong></p><p></p><p>The&nbsp;province&nbsp;of&nbsp;Khenchela&nbsp;possesses&nbsp;significant&nbsp;tourist&nbsp;potential,&nbsp;particularly&nbsp;in&nbsp;the&nbsp;following&nbsp;areas:</p><p></p><p><strong>1-1&nbsp;Tourist&nbsp;Sites&nbsp;and&nbsp;Monuments:</strong></p><p>The&nbsp;province&nbsp;of&nbsp;Khenchela&nbsp;boasts&nbsp;a&nbsp;rich&nbsp;cultural&nbsp;and&nbsp;historical&nbsp;heritage,&nbsp;distributed&nbsp;as&nbsp;follows:</p><p></p><p><strong>1-1-1&nbsp;Monuments&nbsp;and&nbsp;Historical&nbsp;Sites:</strong></p><p>Roman&nbsp;Ruins:</p><p>The&nbsp;Archaeological&nbsp;and&nbsp;Ecological&nbsp;Atlas&nbsp;of&nbsp;Algeria&nbsp;lists&nbsp;approximately&nbsp;175&nbsp;Roman&nbsp;archaeological&nbsp;sites&nbsp;across&nbsp;the&nbsp;province&nbsp;of&nbsp;Khenchela,&nbsp;the&nbsp;most&nbsp;important&nbsp;of&nbsp;which&nbsp;are:</p><p></p><p>-&nbsp;Kahina&nbsp;Palace&nbsp;in&nbsp;the&nbsp;municipality&nbsp;of&nbsp;Baghai</p><p>-&nbsp;The&nbsp;Citadel&nbsp;in&nbsp;the&nbsp;municipality&nbsp;of&nbsp;Chechar</p><p>-&nbsp;Roumia&nbsp;Palace&nbsp;in&nbsp;the&nbsp;municipality&nbsp;of&nbsp;Lemsara</p><p>-&nbsp;The&nbsp;Mausoleum&nbsp;of&nbsp;Sidias&nbsp;(Kasr&nbsp;El&nbsp;Djazia)&nbsp;in&nbsp;the&nbsp;municipality&nbsp;of&nbsp;El&nbsp;Mahmel</p><p></p><p><strong>1-1-2-&nbsp;Natural&nbsp;Sites:</strong></p><p>The&nbsp;province&nbsp;possesses&nbsp;important&nbsp;and&nbsp;diverse&nbsp;natural&nbsp;tourist&nbsp;resources.&nbsp;It&nbsp;features&nbsp;a&nbsp;magnificent&nbsp;geological&nbsp;range&nbsp;in&nbsp;the&nbsp;northeast&nbsp;of&nbsp;the&nbsp;majestic&nbsp;Aurès&nbsp;Mountains.&nbsp;This&nbsp;range&nbsp;includes&nbsp;the&nbsp;highest&nbsp;peak,&nbsp;Mount&nbsp;Chelia,&nbsp;at&nbsp;2328&nbsp;meters.&nbsp;In&nbsp;addition,&nbsp;there&nbsp;are&nbsp;cedar&nbsp;forests,&nbsp;considered&nbsp;among&nbsp;the&nbsp;most&nbsp;beautiful&nbsp;and&nbsp;pristine&nbsp;in&nbsp;the&nbsp;Mediterranean&nbsp;basin,&nbsp;such&nbsp;as&nbsp;the&nbsp;forests&nbsp;of&nbsp;Beni&nbsp;Oujana&nbsp;and&nbsp;Beni&nbsp;Amelloul.&nbsp;The&nbsp;forests&nbsp;of&nbsp;Ouled&nbsp;Yaakoub,&nbsp;the&nbsp;Wadi&nbsp;El&nbsp;Arab,&nbsp;and&nbsp;Beni&nbsp;Berber.&nbsp;This&nbsp;magnificent&nbsp;natural&nbsp;landscape&nbsp;is&nbsp;a&nbsp;major&nbsp;attraction&nbsp;for&nbsp;visitors&nbsp;and&nbsp;tourists.</p><p></p><p>Mineral&nbsp;Springs:</p><p>-&nbsp;Hammam&nbsp;Essalihine:</p><p>Located&nbsp;in&nbsp;the&nbsp;municipality&nbsp;of&nbsp;El&nbsp;Hamma,&nbsp;this&nbsp;spa&nbsp;resort&nbsp;is&nbsp;about&nbsp;4&nbsp;km&nbsp;from&nbsp;the&nbsp;provincial&nbsp;capital.&nbsp;Its&nbsp;history&nbsp;dates&nbsp;back&nbsp;to&nbsp;the&nbsp;Roman&nbsp;era,&nbsp;when&nbsp;it&nbsp;was&nbsp;developed&nbsp;by&nbsp;Flaviana.&nbsp;The&nbsp;water&nbsp;temperature&nbsp;is&nbsp;around&nbsp;70°C,&nbsp;and&nbsp;its&nbsp;chemical&nbsp;composition&nbsp;gives&nbsp;it&nbsp;therapeutic&nbsp;properties,&nbsp;particularly&nbsp;for&nbsp;treating&nbsp;joint,&nbsp;respiratory,&nbsp;and&nbsp;skin&nbsp;diseases,&nbsp;as&nbsp;well&nbsp;as&nbsp;chronic&nbsp;rheumatism,&nbsp;etc.</p><p></p><p>It&nbsp;consists&nbsp;of&nbsp;46&nbsp;bathing&nbsp;rooms,&nbsp;5&nbsp;swimming&nbsp;pools&nbsp;(2&nbsp;of&nbsp;which&nbsp;are&nbsp;open-air&nbsp;and&nbsp;3&nbsp;are&nbsp;for&nbsp;women),&nbsp;and&nbsp;52&nbsp;relaxation&nbsp;rooms.&nbsp;Its&nbsp;annual&nbsp;capacity&nbsp;reaches&nbsp;700,000&nbsp;visitors.&nbsp;The&nbsp;beauty&nbsp;of&nbsp;this&nbsp;archaeological&nbsp;site&nbsp;is&nbsp;further&nbsp;enhanced&nbsp;by&nbsp;its&nbsp;location&nbsp;in&nbsp;a&nbsp;forested&nbsp;area&nbsp;with&nbsp;a&nbsp;unique&nbsp;climate,&nbsp;which&nbsp;has&nbsp;attracted&nbsp;many&nbsp;tourists.&nbsp;In&nbsp;addition&nbsp;to&nbsp;the&nbsp;magnificent&nbsp;archaeological&nbsp;and&nbsp;natural&nbsp;site&nbsp;where&nbsp;the&nbsp;Hammam&nbsp;Essalihine&nbsp;thermal&nbsp;baths&nbsp;are&nbsp;located:</p><p></p><p>*&nbsp;The&nbsp;chemical&nbsp;composition&nbsp;of&nbsp;the&nbsp;Hammam&nbsp;Essalihine&nbsp;waters:&nbsp;Bicarbonate&nbsp;-&nbsp;Chloride&nbsp;-&nbsp;Sulfate&nbsp;-&nbsp;Sodium&nbsp;-&nbsp;Nitrate&nbsp;-&nbsp;Magnesium&nbsp;-&nbsp;Potassium&nbsp;-&nbsp;Sodium</p><p></p><p>The&nbsp;Hammam&nbsp;El&nbsp;Khenif&nbsp;steam&nbsp;thermal&nbsp;baths:</p><p>This&nbsp;steam&nbsp;baths&nbsp;are&nbsp;located&nbsp;in&nbsp;the&nbsp;municipality&nbsp;of&nbsp;Baghai&nbsp;and&nbsp;contain&nbsp;two&nbsp;communal&nbsp;rooms&nbsp;with&nbsp;a&nbsp;capacity&nbsp;of&nbsp;up&nbsp;to&nbsp;4,000&nbsp;people&nbsp;annually.&nbsp;The&nbsp;baths&nbsp;are&nbsp;also&nbsp;considered&nbsp;to&nbsp;have&nbsp;health&nbsp;benefits,&nbsp;treating&nbsp;rheumatism,&nbsp;skin&nbsp;diseases,&nbsp;etc.</p><p></p><p>The&nbsp;Bouhamama&nbsp;climatic&nbsp;baths:</p><p>Located&nbsp;12&nbsp;km&nbsp;from&nbsp;the&nbsp;municipality&nbsp;headquarters&nbsp;on&nbsp;the&nbsp;edge&nbsp;of&nbsp;Mount&nbsp;Chelia,&nbsp;these&nbsp;baths&nbsp;serve&nbsp;as&nbsp;a&nbsp;recreation&nbsp;center&nbsp;and&nbsp;accommodation&nbsp;facility.&nbsp;They&nbsp;include&nbsp;a&nbsp;hotel&nbsp;with&nbsp;four&nbsp;dormitories&nbsp;and&nbsp;four&nbsp;wooden&nbsp;cabins&nbsp;with&nbsp;a&nbsp;total&nbsp;capacity&nbsp;of&nbsp;over&nbsp;100&nbsp;beds&nbsp;and&nbsp;100&nbsp;plates.&nbsp;The&nbsp;baths&nbsp;are&nbsp;also&nbsp;suitable&nbsp;for&nbsp;camping.</p>', '<p class=\"ql-align-right\">تقع&nbsp;ولاية&nbsp;خنشلة&nbsp;في&nbsp;الشرق&nbsp;الشمالي&nbsp;الجزائري&nbsp;وبالتحديد&nbsp;في&nbsp;منطقة&nbsp;الاوراس,&nbsp;يعتقد&nbsp;أن&nbsp;المدينة&nbsp;استمدت&nbsp;اسمها&nbsp;من&nbsp;اسم&nbsp;ابنة&nbsp;الملكة&nbsp;الأمازيغية&nbsp;ديهيا&nbsp;المعروفة&nbsp;عند&nbsp;العرب&nbsp;باسم&nbsp;الكاهنة.</p><p class=\"ql-align-right\">وتبعد&nbsp;المدينة&nbsp;عن&nbsp;العاصمة&nbsp;الجزائر&nbsp;حوالي&nbsp;600&nbsp;كم،&nbsp;حيث&nbsp;يصل&nbsp;عدد&nbsp;سكانها&nbsp;الى&nbsp;ما&nbsp;يقارب&nbsp;384,268&nbsp;نسمة،&nbsp;وتصل&nbsp;مساحتها&nbsp;الى&nbsp;حوالي&nbsp;9,715&nbsp;كم&nbsp;مربع<span style=\"color: rgb(95, 114, 127);\">.</span></p><p class=\"ql-align-right\">إن&nbsp;تاريـخ&nbsp;خنشلـة&nbsp;يعود&nbsp;للأصـول&nbsp;البربريـة&nbsp;التي&nbsp;تطورت&nbsp;عبر&nbsp;الحضارات&nbsp;القديمة&nbsp;،&nbsp;اذ&nbsp;كان&nbsp;إقليميــا&nbsp;مسرحا&nbsp;لأحداث&nbsp;هامة&nbsp;وملجأ&nbsp;لكبار&nbsp;برابــرة&nbsp;–&nbsp;غليس&nbsp;–&nbsp;مثـل&nbsp;ايعابداس&nbsp;،&nbsp;والملكـة&nbsp;الأسطورية&nbsp;”&nbsp;الكاهنـــة&nbsp;”&nbsp;تاركة&nbsp;بصمات&nbsp;هامـة&nbsp;فـي&nbsp;تاريـــخ&nbsp;الجزائـر&nbsp;أطلـق&nbsp;عليهـا&nbsp;الرومان&nbsp;اسـم&nbsp;”&nbsp;ماسكـولا”&nbsp;التي&nbsp;اسستها&nbsp;الحامية&nbsp;الرومانيـة&nbsp;الثالثــة&nbsp;(اوغرست)&nbsp;في&nbsp;القـــرن&nbsp;الأول&nbsp;بعــد&nbsp;الميـلاد.&nbsp;أهمية&nbsp;وعدد&nbsp;الآثار&nbsp;المنتشرة&nbsp;على&nbsp;كامل&nbsp;إقليـم&nbsp;المنطقة&nbsp;يشهد&nbsp;على&nbsp;حيوية&nbsp;هذه&nbsp;الأخيـرة&nbsp;،&nbsp;وعلى&nbsp;التواجد&nbsp;الفعلي&nbsp;للرومان&nbsp;الذي&nbsp;أستطاع&nbsp;الإختراق&nbsp;العسكري&nbsp;خاصة&nbsp;بـ&nbsp;:&nbsp;نيفست&nbsp;(تبسـة)&nbsp;ولمباز&nbsp;مرورا&nbsp;بماسكولا&nbsp;وبغاي&nbsp;كما&nbsp;شكلت&nbsp;المنطقـة&nbsp;أول&nbsp;حصـن&nbsp;(عقبـة)&nbsp;أمام&nbsp;البزنطييـن&nbsp;لإعـادة&nbsp;غـزو&nbsp;منطقـة&nbsp;الأوراس&nbsp;في&nbsp;العصر&nbsp;الوسيط&nbsp;عرفت&nbsp;يغـايوماسكـــولا&nbsp;حياة&nbsp;مزدهرة&nbsp;ثرية&nbsp;بالأحداث&nbsp;الى&nbsp;غاية&nbsp;مجيء&nbsp;الأتراك&nbsp;الذين&nbsp;لم&nbsp;يمارسوا&nbsp;على&nbsp;خنشلة&nbsp;وضواحيها&nbsp;سوى&nbsp;حكما&nbsp;ورقابة&nbsp;نسبيــة&nbsp;،&nbsp;فيما&nbsp;سجل&nbsp;الإحتلال&nbsp;الفرنسي&nbsp;العديد&nbsp;من&nbsp;الثروت&nbsp;والمقاومات&nbsp;الى&nbsp;غايــة&nbsp;اليوم&nbsp;الذي&nbsp;سمـع&nbsp;فيه&nbsp;لحـن&nbsp;تورة&nbsp;أول&nbsp;نوفمبـر&nbsp;الخالـــــدة.</p><ol><li><strong><u>المقومات&nbsp;السياحية&nbsp;&nbsp;:</u></strong></li></ol><p class=\"ql-align-right\">تتوفر&nbsp;ولاية&nbsp;خنشلة&nbsp;على&nbsp;إمكانيات&nbsp;سياحية&nbsp;مهمة&nbsp;لاسيما&nbsp;فيما&nbsp;يخص&nbsp;:</p><p class=\"ql-align-right\">1-1&nbsp;&nbsp;المواقع&nbsp;السياحية&nbsp;و&nbsp;النصب&nbsp;التذكارية&nbsp;:</p><p class=\"ql-align-right\">تتميز&nbsp;ولاية&nbsp;خنشلة&nbsp;بتراث&nbsp;ثقافي&nbsp;و&nbsp;تاريخي&nbsp;مهم&nbsp;بتوزع&nbsp;كما&nbsp;يلي&nbsp;:</p><p class=\"ql-align-right\">1-1-1&nbsp;النصب&nbsp;و&nbsp;المواقع&nbsp;التاريخية&nbsp;:</p><p class=\"ql-align-right\">الأثار&nbsp;الرومانية&nbsp;:</p><p class=\"ql-align-right\">الأطلس&nbsp;الأثري&nbsp;اليكولوجي&nbsp;بالجزائر&nbsp;يحصى&nbsp;تقريبا&nbsp;175&nbsp;موقع&nbsp;اثري&nbsp;روماني&nbsp;عبر&nbsp;ولاية&nbsp;خنشلة&nbsp;من&nbsp;أهمها:</p><p class=\"ql-align-right\">&nbsp;-&nbsp;قصر&nbsp;الكاهنة&nbsp;ببلدية&nbsp;بغاي&nbsp;&nbsp;</p><p class=\"ql-align-right\">-&nbsp;القلعة&nbsp;بلدية&nbsp;ششار</p><p class=\"ql-align-right\">-&nbsp;قصر&nbsp;الرومية&nbsp;ببلدية&nbsp;لمصارة&nbsp;</p><p class=\"ql-align-right\">-&nbsp;ضريح&nbsp;سيدياس(قصر&nbsp;الجازية)&nbsp;ببلدية&nbsp;المحمل</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">1-1-2-&nbsp;المواقع&nbsp;الطبيعية:</p><p class=\"ql-align-right\">تتوفر&nbsp;الولاية&nbsp;على&nbsp;موارد&nbsp;سياحية&nbsp;طبيعية&nbsp;هامة&nbsp;و&nbsp;متعددة&nbsp;،&nbsp;إذ&nbsp;تحتوي&nbsp;على&nbsp;سلسلة&nbsp;جيولوجية&nbsp;رائعة&nbsp;بالشمال&nbsp;الشرقي&nbsp;&nbsp;لجبال&nbsp;الأوراس&nbsp;الأشم&nbsp;هذه&nbsp;السلسلة&nbsp;توجد&nbsp;بها&nbsp;أعلى&nbsp;قمة&nbsp;بجبل&nbsp;شليا&nbsp;الشامخ&nbsp;بعلو&nbsp;2328م&nbsp;،&nbsp;أضف&nbsp;إلى&nbsp;ذلك&nbsp;غابات&nbsp;الأرز&nbsp;التي&nbsp;تعد&nbsp;من&nbsp;أجمل&nbsp;و&nbsp;أحسن&nbsp;في&nbsp;حوض&nbsp;البحر&nbsp;المتوسط&nbsp;مثل&nbsp;:&nbsp;غابات&nbsp;بني&nbsp;أوجانة&nbsp;و&nbsp;بني&nbsp;أملول&nbsp;.&nbsp;غابات&nbsp;أولاد&nbsp;يعقوب&nbsp;&nbsp;مساحات&nbsp;واد&nbsp;العرب&nbsp;و&nbsp;بني&nbsp;بربر&nbsp;.&nbsp;هذه&nbsp;التشكيلة&nbsp;الطبيعية&nbsp;الرائعة&nbsp;قابلة&nbsp;لإستقطاب&nbsp;الزوار&nbsp;و&nbsp;السواح&nbsp;.</p><p class=\"ql-align-right\">المنابـــــــــــع&nbsp;المعدنيــــــة&nbsp;:</p><p class=\"ql-align-right\">-&nbsp;حمام&nbsp;الصالحين&nbsp;:</p><p class=\"ql-align-right\">يقع&nbsp;ببلدية&nbsp;الحامة&nbsp;وهي&nbsp;عبارة&nbsp;عن&nbsp;مرفق&nbsp;سياحي&nbsp;إستشفائي&nbsp;يبعد&nbsp;عن&nbsp;عاصمة&nbsp;الولاية&nbsp;بحوالي&nbsp;04&nbsp;كلم&nbsp;يعود&nbsp;تاريخ&nbsp;إستغلاله&nbsp;إلى&nbsp;العهد&nbsp;الروماني&nbsp;على&nbsp;يد&nbsp;(FLAVIANA)تبلغ&nbsp;درجة&nbsp;حرارة&nbsp;&nbsp;مياهه&nbsp;حوالي&nbsp;70°&nbsp;&nbsp;درجة&nbsp;و&nbsp;هي&nbsp;ذات&nbsp;تركيبة&nbsp;كيميائية&nbsp;تجعله&nbsp;ذو&nbsp;خصائص&nbsp;إستشفائية&nbsp;،&nbsp;خاصة&nbsp;لمعالجة&nbsp;أمراض&nbsp;:&nbsp;المفاصل&nbsp;–&nbsp;الأمراض&nbsp;التنفسية&nbsp;و&nbsp;الجلدية&nbsp;&nbsp;و&nbsp;الروماتيزم&nbsp;المزمن...إلخ</p><p class=\"ql-align-right\">يتكون&nbsp;من&nbsp;&nbsp;46&nbsp;غرفة&nbsp;للإستحمام&nbsp;،&nbsp;05&nbsp;خمسة&nbsp;مسابح&nbsp;من&nbsp;بينها&nbsp;02&nbsp;إثنان&nbsp;&nbsp;على&nbsp;الهواء&nbsp;الطلق&nbsp;و&nbsp;من&nbsp;عهد&nbsp;الرومانو&nbsp;03&nbsp;للنساء&nbsp;&nbsp;و&nbsp;52&nbsp;غرفة&nbsp;للراحة&nbsp;،&nbsp;قدرته&nbsp;الإستعابية&nbsp;&nbsp;تصل&nbsp;إلى&nbsp;700&nbsp;ألف&nbsp;شخص&nbsp;سنويا&nbsp;.&nbsp;و&nbsp;ما&nbsp;زاد&nbsp;في&nbsp;جمال&nbsp;هذا&nbsp;الموقع&nbsp;الأثري&nbsp;وجوده&nbsp;&nbsp;في&nbsp;منطقة&nbsp;غابية&nbsp;ذات&nbsp;مناخ&nbsp;متميز&nbsp;عمل&nbsp;على&nbsp;جلب&nbsp;العديد&nbsp;من&nbsp;السواح.</p><p class=\"ql-align-right\">إضافة&nbsp;إلى&nbsp;الموقع&nbsp;الأثري&nbsp;و&nbsp;الطبيعي&nbsp;الرائع&nbsp;الذي&nbsp;&nbsp;تتواجد&nbsp;به&nbsp;محطة&nbsp;حمام&nbsp;الصالحين&nbsp;</p><p class=\"ql-align-right\">*&nbsp;التركيبة&nbsp;الكيميائية&nbsp;لمياه&nbsp;حمام&nbsp;الصالحين&nbsp;:بيكربونات&nbsp;-&nbsp;كلورير-سولفات&nbsp;-سوفر-نترات&nbsp;-&nbsp;مغنيزيوم&nbsp;-&nbsp;بوتاسيوم&nbsp;-&nbsp;صوديوم</p><p class=\"ql-align-right\">المحطة&nbsp;الحموية&nbsp;حمام&nbsp;الكنيف&nbsp;البخارية</p><p class=\"ql-align-right\">هي&nbsp;محطة&nbsp;بخارية&nbsp;توجد&nbsp;ببلدية&nbsp;بغاي&nbsp;تحتوي&nbsp;على&nbsp;غرفتين&nbsp;جماعيتين&nbsp;القدرة&nbsp;الإستعابية&nbsp;تصل&nbsp;إلى&nbsp;4000&nbsp;شخص&nbsp;سنويا&nbsp;كما&nbsp;تعتبر&nbsp;المحطة&nbsp;&nbsp;ذات&nbsp;منفع&nbsp;صحية&nbsp;:&nbsp;علاح&nbsp;أمراض&nbsp;الرومتيزم&nbsp;،&nbsp;الأمراض&nbsp;الجلدية&nbsp;...إلخ</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">المحطة&nbsp;المناخية&nbsp;ببلدية&nbsp;بوحمامة&nbsp;</p><p class=\"ql-align-right\">تبعد&nbsp;عن&nbsp;مقر&nbsp;البلدية&nbsp;بـ&nbsp;:12&nbsp;كلم&nbsp;حيث&nbsp;تقع&nbsp;على&nbsp;حافة&nbsp;جبل&nbsp;شيليا&nbsp;تعتبر&nbsp;كمركز&nbsp;للإستجمام&nbsp;&nbsp;و&nbsp;مؤسسة&nbsp;للإستقبال&nbsp;تتوفرعلى&nbsp;فندق&nbsp;به&nbsp;04&nbsp;مراقد&nbsp;و&nbsp;مساكن&nbsp;خشبية&nbsp;ذو&nbsp;04&nbsp;غرف&nbsp;&nbsp;القدرة&nbsp;الإستعابية&nbsp;تفوق&nbsp;100&nbsp;سرير&nbsp;و&nbsp;100&nbsp;طبق&nbsp;المحطة&nbsp;تعد&nbsp;مكان&nbsp;ملائم&nbsp;للتخييم.</p>', '/uploads/destinations/1771105038202-150575394.jpg', 40, 1, '100,000–110,000 inhabitants', '9,715 km²', 'Cold', 'بارد', ' The most comfortable time to visit is typically from late April to early October, when temperatures are milder', 'أفضل وقت للزيارة عادةً ما يكون من أواخر أبريل إلى أوائل أكتوبر، عندما تكون درجات الحرارة أكثر اعتدالاً.', 'Local food around Khenchela leans toward hearty Aurès/Chaoui and Algerian mountain dishes', 'المطبخ في خنشلة يميل إلى أطباق الأوراس/الشاوية والجبال الجزائرية', 'Dress modestly, especially in traditional neighborhoods and rural surroundings.', 'يُفضَّل ارتداء لباس محتشم خصوصاً في الأحياء الشعبية والقرى المحيطة.', 'most intercity travel is by car, shared taxi, or coach. Inside the city, movement is mainly by local taxis and buses', 'تتم معظم الرحلات بين المدن بالسيارة أو سيارة الأجرة المشتركة أو الحافلة. أما داخل المدينة، فيتم التنقل بشكل رئيسي بواسطة سيارات الأجرة والحافلات المحلية.', 0),
(41, 'Souk Ahras', 'سوق أهراس', '<p></p>', '<p></p>', '', 41, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(42, 'Tipaza', 'تيبازة', '<p></p>', '<p></p>', '', 42, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(43, 'Mila', 'ميلة', '<p></p>', '<p></p>', '', 43, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(44, 'Aïn Defla', 'عين الدفلى', '<p></p>', '<p></p>', '', 44, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(45, 'Naâma', 'النعامة', '<p></p>', '<p></p>', '', 45, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(46, 'Aïn Témouchent', 'عين تيموشنت', '<p></p>', '<p></p>', '', 46, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(47, 'Ghardaïa', 'غرداية', '<p></p>', '<p></p>', '', 47, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(48, 'Relizane', 'غليزان', '<p></p>', '<p></p>', '', 48, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0);
INSERT INTO `destinations` (`id`, `name_en`, `name_ar`, `about_en`, `about_ar`, `background_image`, `sort_order`, `is_active`, `population`, `area`, `climate_en`, `climate_ar`, `best_time_en`, `best_time_ar`, `cuisine_en`, `cuisine_ar`, `etiquette_en`, `etiquette_ar`, `transport_en`, `transport_ar`, `show_on_homepage`) VALUES
(49, 'Timimoun', 'تيميمون', '<p>Timimoun&nbsp;Province,&nbsp;or&nbsp;the&nbsp;&quot;Red&nbsp;Oasis&quot;&nbsp;as&nbsp;some&nbsp;prefer&nbsp;to&nbsp;call&nbsp;it,&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;most&nbsp;prominent&nbsp;desert&nbsp;tourist&nbsp;destinations&nbsp;in&nbsp;Algeria.&nbsp;This&nbsp;is&nbsp;due&nbsp;to&nbsp;its&nbsp;wealth&nbsp;of&nbsp;landmarks&nbsp;and&nbsp;attractions,&nbsp;as&nbsp;well&nbsp;as&nbsp;its&nbsp;unique&nbsp;architecture,&nbsp;which&nbsp;contrasts&nbsp;sharply&nbsp;with&nbsp;the&nbsp;golden&nbsp;sand&nbsp;dunes&nbsp;of&nbsp;the&nbsp;Grand&nbsp;Erg&nbsp;Oriental&nbsp;in&nbsp;the&nbsp;Sahara&nbsp;Desert.&nbsp;Not&nbsp;to&nbsp;mention&nbsp;its&nbsp;enchanting&nbsp;natural&nbsp;scenery,&nbsp;which&nbsp;has&nbsp;made&nbsp;it&nbsp;a&nbsp;highly&nbsp;sought-after&nbsp;tourist&nbsp;destination.&nbsp;Its&nbsp;attractions&nbsp;include:</p><p></p><p>Oases:&nbsp;125</p><p>Fortresses:&nbsp;50</p><p>1&nbsp;Salt&nbsp;Flat</p><p>1&nbsp;Ramsar&nbsp;Convention&nbsp;Wetland</p><p>1&nbsp;National&nbsp;Park</p><p>Archaeological&nbsp;Sites:&nbsp;Neolithic&nbsp;sites&nbsp;and&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Erg&nbsp;Chech&nbsp;area</p><p>Petrified&nbsp;Forests</p><p>The&nbsp;edges&nbsp;of&nbsp;the&nbsp;salt&nbsp;flats&nbsp;teem&nbsp;with&nbsp;diverse&nbsp;species&nbsp;of&nbsp;shells&nbsp;and&nbsp;fish,&nbsp;including&nbsp;ancient&nbsp;siliceous&nbsp;species</p><p>Plateaus,&nbsp;caves,&nbsp;and&nbsp;grottos</p><p>Architectural&nbsp;and&nbsp;urban&nbsp;monuments&nbsp;(fortified&nbsp;villages,&nbsp;kasbahs,&nbsp;mausoleums)</p><p>Museums</p><p>Zawiyas:&nbsp;10</p><p>Ancient&nbsp;and&nbsp;historical&nbsp;mosques:&nbsp;The&nbsp;Old&nbsp;Mosque&nbsp;Timimoun</p><p>Tourist&nbsp;Attractions</p><p>Tourist&nbsp;Sites&nbsp;in&nbsp;Timimoun:</p><p>Bab&nbsp;Sudan</p><p>Tourist&nbsp;Office</p><p>Old&nbsp;Market</p><p>Municipal&nbsp;Museum</p>', '<p class=\"ql-align-right\">ولاية&nbsp;تيميمون&nbsp;أو&nbsp;”&nbsp;الواحة&nbsp;الحمراء”&nbsp;كما&nbsp;يحلو&nbsp;البعض&nbsp;تسميتها&nbsp;من&nbsp;أبرز&nbsp;الوجهات&nbsp;السياحية&nbsp;الصحراوية&nbsp;في&nbsp;الجزائر،&nbsp;نظرا&nbsp;لما&nbsp;تزخر&nbsp;به&nbsp;من&nbsp;معالم&nbsp;و&nbsp;مقومات&nbsp;الجذب&nbsp;السياحي،&nbsp;بالإضافة&nbsp;إلى&nbsp;هندستها&nbsp;المعمارية&nbsp;والذي&nbsp;يتناقض&nbsp;مع&nbsp;اللون&nbsp;الذهبي&nbsp;للكثبان&nbsp;الرملية&nbsp;في&nbsp;العرق&nbsp;الشرقي&nbsp;الكبير&nbsp;في&nbsp;الصحراء&nbsp;الكبرى،&nbsp;دون&nbsp;أن&nbsp;ننسى&nbsp;مناظرها&nbsp;الطبيعية&nbsp;الساحرة&nbsp;مما&nbsp;جعلها&nbsp;مرغوبة&nbsp;و&nbsp;مطلوبة&nbsp;سياحيا&nbsp;ب:</p><ul><li>الواحات:&nbsp;125</li><li>القصور:&nbsp;50</li><li>01&nbsp;سبخة&nbsp;01&nbsp;منطقة&nbsp;رطبة&nbsp;مصنفة&nbsp;اتفاقية&nbsp;Ramssar</li><li>الحظائر&nbsp;الوطنية&nbsp;الطبيعية01&nbsp;</li><li>المواقع&nbsp;الأثرية:&nbsp;المواقع&nbsp;والودائع&nbsp;الأثرية&nbsp;التي&nbsp;تعود&nbsp;للعصر&nbsp;الحجري&nbsp;الحديث&nbsp;في&nbsp;عرق&nbsp;شاش</li><li>غابات&nbsp;الأشجار&nbsp;المتحجرة</li><li>أطراف&nbsp;السبخات&nbsp;تعج&nbsp;بأعداد&nbsp;متنوعة&nbsp;من&nbsp;القواقع&nbsp;والأسماك&nbsp;من&nbsp;أصناف&nbsp;&quot;&nbsp;السليسيك&nbsp;القديم&nbsp;&quot;</li><li>الهضاب&nbsp;والمغارات&nbsp;والكهوف</li><li>الشواهد&nbsp;العمرانية&nbsp;والمعمارية&nbsp;(قصور،&nbsp;قصبات،&nbsp;أضرحة)</li><li>المتاحف</li><li>الزوايا:10</li><li>المساجد&nbsp;العتيقة&nbsp;والأثرية:المسجد&nbsp;العتيق&nbsp;تيميمون</li></ul><p class=\"ql-align-right\"><strong><u>المقومات&nbsp;السياحية</u></strong></p><p class=\"ql-align-right\"><strong>المواقع&nbsp;السياحية&nbsp;بتيميمون:</strong></p><ul><li>باب&nbsp;السودان&nbsp;</li><li>الديوان&nbsp;السياحي</li><li>السوق&nbsp;القديم</li><li>المتحف&nbsp;البلدي</li></ul><p></p>', '/uploads/destinations/1771110142051-482143064.jpg', 49, 1, 'around 23,000–35,000 inhabitants', '1,000 km²', 'HOT', 'حار', 'Timimoun\'s extreme Saharan climate features scorching summers over 45°C and mild winters; the ideal period is November to March, with daytime highs around 25°C and cooler nights', ' مناخ صحراوي قاسٍ بصيف يفوق 45°م والشتاء معتدل؛ أفضل زيارة نوفمبر–مارس (25°م نهاراً، ليالٍ باردة)، مثالية للكواسر والفُقّارات والكثبان ومهرجان السْبُوع.', 'Hearty Saharan fare emphasizes dates from vast palmeraies (like El H’mira variety), couscous with goat or camel meat, tagines with veggies and spices, chorba soup', 'Arabic: أطباق صحراوية تعتمد على التمر من النخيل (مثل الهْمْرَة)، كسكسي بلحم الماعز أو الجمل، طواجن خضار وتوابل، شوربة، خبز مسطّح، وحلويات تمر؛ أسواق تعرِّف بمأكولات الحراتينة-البربر-الطوارق.', 'Dress modestly (loose, covering clothes) for heat and respect in ksars, mosques, and conservative Berber/Tuareg communities.\n', 'ارتدِ لباساً محتشماً (واسع مغطّى) للحرارة واحترام الكواسر والمساجد والمجتمعات البربرية/الطوارقية.', 'walk narrow shaded streets of the old ksar, use taxis/4x4s for palm groves, sebkhas, Ighzer ksar (20km), dunes, and foggaras—private guides recommended for desert outings.', 'مشي في الزقاق المظللة بالكسار القديم، سيارات أجرة/4x4 للنخيل والسبخات وإغزر (20كلم) والكثبان والفُقّارات—مرشد خاص للصحراء.', 0),
(50, 'Bordj Badji Mokhtar', 'برج باجي مختار', '<p></p>', '<p></p>', '', 50, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(51, 'Ouled Djellal', 'أولاد جلال', '<p></p>', '<p></p>', '', 51, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(52, 'Béni Abbès', 'بني عباس', '<p></p>', '<p></p>', '', 52, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(53, 'Aïn Salah', 'عين صالح', '<p></p>', '<p></p>', '', 53, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(54, 'Aïn Guezzam', 'عين قزام', '<p></p>', '<p></p>', '', 54, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(55, 'Touggourt', 'تقرت', '<p></p>', '<p></p>', '', 55, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(56, 'Djanet', 'جانت', '<p></p>', '<p></p>', '', 56, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(57, 'El M\'Ghair', 'المغير', '<p></p>', '<p></p>', '', 57, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0),
(58, 'El Menia', 'المنيعة', '<p></p>', '<p></p>', '', 58, 0, '', '', '', '', '', '', '', '', '', '', '', '', 0);

-- --------------------------------------------------------

--
-- Structure de la table `destination_gallery`
--

CREATE TABLE `destination_gallery` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `type` enum('image','video') DEFAULT 'image',
  `sort_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `destination_gallery`
--

INSERT INTO `destination_gallery` (`id`, `destination_id`, `image_url`, `type`, `sort_order`) VALUES
(18, 16, '/uploads/destinations/1771091937473-399626786.jpg', 'image', 0),
(19, 16, '/uploads/destinations/1771091937484-754888790.jpg', 'image', 1),
(20, 16, '/uploads/destinations/1771091937498-350827932.jpg', 'image', 2),
(21, 16, '/uploads/destinations/1771091937647-125478234.jpg', 'image', 3),
(22, 16, '/uploads/destinations/1771097692242-621150601.mp4', 'video', 4),
(23, 2, '/uploads/destinations/1771101575553-229849323.jpg', 'image', 0),
(24, 2, '/uploads/destinations/1771101575560-222686912.jpg', 'image', 1),
(25, 2, '/uploads/destinations/1771101575569-954597350.jpg', 'image', 2),
(26, 2, '/uploads/destinations/1771101575584-363086411.jpg', 'image', 3),
(27, 2, '/uploads/destinations/1771101575597-966578171.jpg', 'image', 4),
(28, 2, '/uploads/destinations/1771101575612-220126340.jpg', 'image', 5),
(29, 2, '/uploads/destinations/1771101575628-227847571.jpg', 'image', 6),
(30, 2, '/uploads/destinations/1771101575643-323155202.jpg', 'image', 7),
(31, 2, '/uploads/destinations/1771101575661-450665248.jpg', 'image', 8),
(32, 2, '/uploads/destinations/1771101575674-943326809.jpg', 'image', 9),
(33, 31, '/uploads/destinations/1771103953649-96266860.jpg', 'image', 0),
(34, 31, '/uploads/destinations/1771103953658-547457028.jpg', 'image', 1),
(35, 31, '/uploads/destinations/1771103953670-584681511.jpg', 'image', 2),
(36, 31, '/uploads/destinations/1771103953683-570595329.jpg', 'image', 3),
(37, 31, '/uploads/destinations/1771103953697-89236148.jpg', 'image', 4),
(38, 31, '/uploads/destinations/1771103953711-568083773.jpg', 'image', 5),
(39, 31, '/uploads/destinations/1771103953724-270959826.jpg', 'image', 6),
(40, 31, '/uploads/destinations/1771103953739-502472440.jpg', 'image', 7),
(41, 40, '/uploads/destinations/1771105014013-422470529.jpg', 'image', 0),
(42, 40, '/uploads/destinations/1771105014018-980709921.jpg', 'image', 1),
(43, 40, '/uploads/destinations/1771105014027-298241360.jpg', 'image', 2),
(44, 40, '/uploads/destinations/1771105014036-341645822.JPG', 'image', 3),
(45, 40, '/uploads/destinations/1771105016276-671061479.JPG', 'image', 4),
(46, 40, '/uploads/destinations/1771105016292-475858631.JPG', 'image', 5),
(63, 7, '/uploads/destinations/1771108522418-427956490.jpg', 'image', 0),
(64, 7, '/uploads/destinations/1771108522423-160164619.jpg', 'image', 1),
(65, 7, '/uploads/destinations/1771108522432-882291275.jpg', 'image', 2),
(66, 7, '/uploads/destinations/1771108522445-429902035.jpg', 'image', 3),
(67, 7, '/uploads/destinations/1771108522463-721979405.jpg', 'image', 4),
(68, 7, '/uploads/destinations/1771108522476-120340798.jpg', 'image', 5),
(69, 7, '/uploads/destinations/1771108523708-465334274.jpg', 'image', 6),
(70, 38, '/uploads/destinations/1771109046600-726599198.jpg', 'image', 0),
(71, 38, '/uploads/destinations/1771109046606-490556696.jpg', 'image', 1),
(72, 38, '/uploads/destinations/1771109071143-702321345.jpg', 'image', 2),
(73, 38, '/uploads/destinations/1771109071147-361818501.jpg', 'image', 3),
(74, 38, '/uploads/destinations/1771109071157-211919766.jpg', 'image', 4),
(75, 38, '/uploads/destinations/1771109071170-485704909.jpg', 'image', 5),
(76, 38, '/uploads/destinations/1771109071183-941298214.jpg', 'image', 6),
(77, 38, '/uploads/destinations/1771109071196-841355128.jpg', 'image', 7),
(78, 38, '/uploads/destinations/1771109071210-500002581.jpg', 'image', 8),
(79, 25, '/uploads/destinations/1771109755932-548564015.jpg', 'image', 0),
(80, 25, '/uploads/destinations/1771109755936-958367384.jpg', 'image', 1),
(81, 25, '/uploads/destinations/1771109755952-443848345.jpg', 'image', 2),
(82, 25, '/uploads/destinations/1771109755963-413577502.jpg', 'image', 3),
(83, 25, '/uploads/destinations/1771109755977-802375297.jpg', 'image', 4),
(84, 25, '/uploads/destinations/1771109755990-761545587.jpg', 'image', 5),
(85, 25, '/uploads/destinations/1771109756006-650311907.jpg', 'image', 6),
(86, 25, '/uploads/destinations/1771109756019-238225024.jpg', 'image', 7),
(87, 25, '/uploads/destinations/1771109756032-426082250.jpg', 'image', 8),
(88, 49, '/uploads/destinations/1771110279436-827817055.jpg', 'image', 0),
(89, 49, '/uploads/destinations/1771110279440-151478595.jpg', 'image', 1),
(90, 49, '/uploads/destinations/1771110279448-997682934.jpg', 'image', 2),
(91, 49, '/uploads/destinations/1771110279464-87036706.jpg', 'image', 3),
(92, 26, '/uploads/destinations/1771110681383-701199854.jpg', 'image', 0),
(93, 26, '/uploads/destinations/1771110682394-287114610.jpg', 'image', 1),
(94, 26, '/uploads/destinations/1771110682419-698575173.jpg', 'image', 2),
(95, 26, '/uploads/destinations/1771110682432-5029676.jpg', 'image', 3),
(96, 26, '/uploads/destinations/1771110682446-392761688.jpg', 'image', 4),
(97, 26, '/uploads/destinations/1771110682463-414115317.jpg', 'image', 5),
(98, 26, '/uploads/destinations/1771110682481-336912912.jpg', 'image', 6),
(99, 26, '/uploads/destinations/1771110682499-438790715.jpg', 'image', 7),
(113, 23, '/uploads/destinations/1771160705571-548642582.jpg', 'image', 0),
(114, 23, '/uploads/destinations/1771160705579-91222372.jpg', 'image', 1),
(115, 23, '/uploads/destinations/1771160710562-329110481.jpg', 'image', 2),
(116, 23, '/uploads/destinations/1771160808003-62511840.jpg', 'image', 3),
(117, 23, '/uploads/destinations/1771160808010-879765707.jpg', 'image', 4),
(118, 23, '/uploads/destinations/1771160808022-742084300.jpg', 'image', 5),
(119, 23, '/uploads/destinations/1771160808039-50959744.jpg', 'image', 6),
(120, 23, '/uploads/destinations/1771160808054-789162812.jpg', 'image', 7),
(121, 23, '/uploads/destinations/1771160808066-592496790.jpg', 'image', 8),
(122, 23, '/uploads/destinations/1771160808074-503203018.jpg', 'image', 9);

-- --------------------------------------------------------

--
-- Structure de la table `destination_tags`
--

CREATE TABLE `destination_tags` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) DEFAULT NULL,
  `name_en` varchar(100) DEFAULT NULL,
  `name_ar` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `destination_tags`
--

INSERT INTO `destination_tags` (`id`, `destination_id`, `name_en`, `name_ar`) VALUES
(5, 16, 'HOT', 'HOT'),
(6, 2, 'chlef', 'الشلف'),
(7, 2, 'The Ghouls Tower', 'برج الغولة'),
(8, 2, 'The Wadi Fadda Dam', 'سد وادي فضة'),
(9, 31, 'Coastal', 'ساحلية'),
(10, 31, 'Lively', 'حيوية'),
(11, 31, 'Historic', 'تاريخية'),
(12, 31, 'Mediterranean', 'متوسطية'),
(13, 40, 'Mountainous', 'جبلية'),
(14, 40, 'Amazigh (Chaoui)', 'أمازيغية (شاوية)'),
(15, 40, 'Historic', 'تاريخية'),
(16, 40, 'Cold‑winter', 'شتاؤها بارد'),
(25, 7, 'Desert‑oasis', 'واحة صحراوية'),
(26, 7, 'Sunny', 'مشمِسة'),
(27, 7, 'Date‑growing', 'مشهورة بالتمور'),
(28, 7, 'Thermal', 'حمّامات حرارية'),
(29, 38, 'Highland', 'هضبية'),
(30, 38, 'Forested', 'غابات'),
(31, 38, 'Agricultural', 'زراعية'),
(32, 38, 'Historic', 'تاريخية'),
(33, 25, 'Bridges-city', 'مدينة الجسور'),
(34, 25, 'Historic', 'تاريخية'),
(35, 25, 'Elevated', 'مرتفعة'),
(36, 25, 'Cultural', 'ثقافية'),
(37, 49, 'Red-oasis', 'واحة حمراء'),
(38, 49, 'Desertic', 'صحراوية'),
(39, 49, 'Historic-ksar', 'قصر تاريخي'),
(40, 49, 'Palm-shaded', 'مظللة بالنخيل'),
(41, 26, 'Mountainous', 'جبلية'),
(42, 26, 'Agricultural', 'زراعية'),
(43, 26, 'Titteri', 'تيترية'),
(48, 23, 'Coastal-port', 'ميناء ساحلي'),
(49, 23, 'Historic-Hippo', 'هيبّو التاريخية');

-- --------------------------------------------------------

--
-- Structure de la table `digital_library`
--

CREATE TABLE `digital_library` (
  `id` int(11) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_ar` varchar(255) DEFAULT '',
  `category_id` int(11) DEFAULT NULL,
  `file_url` varchar(500) NOT NULL,
  `file_type` varchar(50) DEFAULT 'pdf',
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `digital_library`
--

INSERT INTO `digital_library` (`id`, `name_en`, `name_ar`, `category_id`, `file_url`, `file_type`, `sort_order`, `is_active`, `created_at`) VALUES
(1, 'pdf', 'pdf arabic', 1, '/uploads/digital-library/1771402268496-74201238.png', 'pdf', 1, 1, '2026-02-18 08:11:09');

-- --------------------------------------------------------

--
-- Structure de la table `discover_cards`
--

CREATE TABLE `discover_cards` (
  `id` int(11) NOT NULL,
  `title_en` varchar(150) NOT NULL,
  `title_ar` varchar(150) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `card_size` enum('title','wide','narrow') NOT NULL DEFAULT 'wide',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `discover_cards`
--

INSERT INTO `discover_cards` (`id`, `title_en`, `title_ar`, `image_url`, `card_size`, `sort_order`, `is_active`) VALUES
(1, 'Creator\'s Cut', '???????????? ????????????????', '', 'narrow', 1, 1),
(2, 'Autumn Discovery', '???????????? ????????????', '', 'narrow', 2, 1),
(3, 'Sustainable Destinations', '?????????? ??????????????', NULL, 'narrow', 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `discover_categories`
--

CREATE TABLE `discover_categories` (
  `id` int(11) NOT NULL,
  `name_en` varchar(100) NOT NULL,
  `name_ar` varchar(100) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `discover_categories`
--

INSERT INTO `discover_categories` (`id`, `name_en`, `name_ar`, `sort_order`, `is_active`) VALUES
(1, 'Art & Culture', '???????? ????????????????', 1, 1),
(2, 'Architecture', '??????????????', 2, 1),
(3, 'Museums', '??????????????', 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `discover_items`
--

CREATE TABLE `discover_items` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title_en` varchar(150) NOT NULL,
  `title_ar` varchar(150) NOT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `tag_en` varchar(50) DEFAULT NULL,
  `tag_ar` varchar(50) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `card_size` enum('small','medium','large') NOT NULL DEFAULT 'medium',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `discover_items`
--

INSERT INTO `discover_items` (`id`, `category_id`, `title_en`, `title_ar`, `description_en`, `description_ar`, `tag_en`, `tag_ar`, `image_url`, `card_size`, `sort_order`, `is_active`) VALUES
(1, 1, 'Traditional Crafts', '?????????? ??????????????????', 'Discover centuries-old artisan techniques passed down through generations.', '?????????? ???????????? ?????????? ?????????? ???????? ???????????????? ??????????????.', NULL, NULL, 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&fit=crop', 'medium', 1, 1),
(2, 1, 'Music & Rhythms', '???????????????? ????????????????????', 'From chaabi to ra??, explore Algeria\'s rich musical heritage.', '???? ???????????? ?????? ???????????? ???????????? ???????????? ???????????????? ?????????? ??????????????.', NULL, NULL, 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&fit=crop', 'medium', 2, 1),
(3, 1, 'Cultural Events', '?????????????????? ????????????????', 'Year-round festivals celebrating Algeria\'s diverse cultural identity.', '???????????????? ?????? ???????? ?????????? ?????????? ?????????????? ???????????????? ???????????????? ??????????????.', NULL, NULL, 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&fit=crop', 'medium', 3, 1),
(4, 2, 'Casbah of Algiers', '???????? ??????????????', NULL, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&fit=crop', 'large', 1, 1),
(5, 2, 'Great Mosque', '???????????? ????????????', NULL, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?w=600&fit=crop', 'small', 2, 1),
(6, 2, 'Constantine', '??????????????', NULL, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&fit=crop', 'small', 3, 1),
(7, 2, 'Timgad Ruins', '?????????? ????????????', NULL, NULL, NULL, NULL, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&fit=crop', 'medium', 4, 1);

-- --------------------------------------------------------

--
-- Structure de la table `discover_page_settings`
--

CREATE TABLE `discover_page_settings` (
  `id` int(11) NOT NULL,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `discover_page_settings`
--

INSERT INTO `discover_page_settings` (`id`, `setting_key`, `setting_value`) VALUES
(1, 'tag_en', 'Discover Algeria Now'),
(2, 'tag_ar', 'اكتشف الجزائر الآن'),
(3, 'title_en', 'Discover Destinations'),
(4, 'title_ar', 'اكتشف الوجهات'),
(5, 'subtitle_en', 'Explore the beauty, culture, and heritage of Algeria'),
(6, 'subtitle_ar', 'استكشف جمال الجزائر وثقافتها وتراثها'),
(7, 'background_image', '/uploads/discover/1771026927674-709739070.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `discover_places`
--

CREATE TABLE `discover_places` (
  `id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `name_en` varchar(200) NOT NULL,
  `name_ar` varchar(200) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `info_en` longtext DEFAULT NULL,
  `info_ar` longtext DEFAULT NULL,
  `show_on_homepage` tinyint(1) NOT NULL DEFAULT 0,
  `show_on_unesco` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `discover_places`
--

INSERT INTO `discover_places` (`id`, `section_id`, `name_en`, `name_ar`, `image_url`, `region`, `info_en`, `info_ar`, `show_on_homepage`, `show_on_unesco`, `sort_order`, `is_active`, `created_at`) VALUES
(1, 4, 'tipaza', 'tipaza', '/uploads/discover/1771143356411-629001720.webp', 'Annaba', '<p>Tipaza&nbsp;is&nbsp;one&nbsp;of&nbsp;Algeria’s&nbsp;most&nbsp;mesmerizing&nbsp;destinations,&nbsp;where&nbsp;the&nbsp;deep&nbsp;blue&nbsp;of&nbsp;the&nbsp;Mediterranean&nbsp;meets&nbsp;the&nbsp;golden&nbsp;stone&nbsp;of&nbsp;ancient&nbsp;civilizations.&nbsp;Located&nbsp;about&nbsp;70&nbsp;km&nbsp;west&nbsp;of&nbsp;Algiers,&nbsp;it&nbsp;is&nbsp;a&nbsp;place&nbsp;where&nbsp;history&nbsp;feels&nbsp;alive,&nbsp;famously&nbsp;described&nbsp;by&nbsp;the&nbsp;philosopher&nbsp;Albert&nbsp;Camus&nbsp;as&nbsp;a&nbsp;city&nbsp;&quot;inhabited&nbsp;by&nbsp;gods.&quot;</p><p>Here&nbsp;is&nbsp;a&nbsp;presentation&nbsp;of&nbsp;Tipaza,&nbsp;covering&nbsp;its&nbsp;history,&nbsp;main&nbsp;attractions,&nbsp;and&nbsp;local&nbsp;charm.</p><h2>🏛️&nbsp;A&nbsp;Layered&nbsp;History</h2><p>Tipaza&nbsp;(historically&nbsp;<em>Tipasa</em>)&nbsp;was&nbsp;not&nbsp;built&nbsp;by&nbsp;a&nbsp;single&nbsp;empire&nbsp;but&nbsp;grew&nbsp;through&nbsp;layers&nbsp;of&nbsp;Mediterranean&nbsp;history:</p><ul><li><strong>Punic&nbsp;Origins:</strong>&nbsp;Originally&nbsp;a&nbsp;small&nbsp;Phoenician&nbsp;trading&nbsp;post&nbsp;(6th&nbsp;century&nbsp;BC).</li><li><strong>Roman&nbsp;Splendor:</strong>&nbsp;Conquered&nbsp;by&nbsp;Rome&nbsp;and&nbsp;turned&nbsp;into&nbsp;a&nbsp;strategic&nbsp;military&nbsp;colony&nbsp;under&nbsp;Emperor&nbsp;Claudius.&nbsp;It&nbsp;became&nbsp;a&nbsp;vital&nbsp;port&nbsp;for&nbsp;the&nbsp;conquest&nbsp;of&nbsp;Mauretania.</li><li><strong>Christian&nbsp;Hub:</strong>&nbsp;By&nbsp;the&nbsp;3rd&nbsp;and&nbsp;4th&nbsp;centuries,&nbsp;it&nbsp;was&nbsp;a&nbsp;major&nbsp;center&nbsp;for&nbsp;early&nbsp;Christianity,&nbsp;home&nbsp;to&nbsp;some&nbsp;of&nbsp;the&nbsp;largest&nbsp;basilicas&nbsp;in&nbsp;North&nbsp;Africa.</li><li><strong>UNESCO&nbsp;Recognition:</strong>&nbsp;Inscribed&nbsp;as&nbsp;a&nbsp;<strong>World&nbsp;Heritage&nbsp;Site&nbsp;in&nbsp;1982</strong>&nbsp;for&nbsp;its&nbsp;unique&nbsp;blend&nbsp;of&nbsp;Phoenician,&nbsp;Roman,&nbsp;Paleochristian,&nbsp;and&nbsp;Byzantine&nbsp;ruins.</li></ul><h2>📍&nbsp;Key&nbsp;Landmarks&nbsp;&amp;&nbsp;Attractions</h2><h3>1.&nbsp;The&nbsp;Archaeological&nbsp;Park&nbsp;(The&nbsp;Roman&nbsp;Ruins)</h3><p>The&nbsp;main&nbsp;site&nbsp;is&nbsp;a&nbsp;stunning&nbsp;open-air&nbsp;museum&nbsp;set&nbsp;right&nbsp;on&nbsp;the&nbsp;water&#39;s&nbsp;edge.</p><ul><li><strong>The&nbsp;Amphitheater:</strong>&nbsp;A&nbsp;massive&nbsp;arena&nbsp;once&nbsp;used&nbsp;for&nbsp;gladiator&nbsp;contests.</li><li><strong>The&nbsp;Great&nbsp;Basilica:</strong>&nbsp;One&nbsp;of&nbsp;the&nbsp;most&nbsp;significant&nbsp;early&nbsp;Christian&nbsp;monuments&nbsp;in&nbsp;North&nbsp;Africa.</li><li><strong>The&nbsp;Villa&nbsp;of&nbsp;Frescoes:</strong>&nbsp;A&nbsp;Roman&nbsp;residence&nbsp;where&nbsp;you&nbsp;can&nbsp;still&nbsp;see&nbsp;traces&nbsp;of&nbsp;ancient&nbsp;luxury.</li><li><strong>Camus’&nbsp;Stele:</strong>&nbsp;A&nbsp;monument&nbsp;dedicated&nbsp;to&nbsp;Albert&nbsp;Camus,&nbsp;overlooking&nbsp;the&nbsp;sea,&nbsp;inscribed&nbsp;with&nbsp;his&nbsp;words:&nbsp;<em>&quot;Here,&nbsp;I&nbsp;understand&nbsp;what&nbsp;they&nbsp;call&nbsp;glory:&nbsp;the&nbsp;right&nbsp;to&nbsp;love&nbsp;without&nbsp;measure.&quot;</em></li></ul>', '<p class=\"ql-align-right\">تيبازة،&nbsp;إحدى&nbsp;أكثر&nbsp;الوجهات&nbsp;سحرًا&nbsp;في&nbsp;الجزائر،&nbsp;حيث&nbsp;يلتقي&nbsp;زرقة&nbsp;البحر&nbsp;الأبيض&nbsp;المتوسط&nbsp;​​العميقة&nbsp;بحجر&nbsp;الحضارات&nbsp;القديمة&nbsp;الذهبي.&nbsp;تقع&nbsp;على&nbsp;بُعد&nbsp;حوالي&nbsp;70&nbsp;كيلومترًا&nbsp;غرب&nbsp;الجزائر&nbsp;العاصمة،&nbsp;وهي&nbsp;مدينة&nbsp;تنبض&nbsp;بالحياة&nbsp;التاريخية،&nbsp;وقد&nbsp;وصفها&nbsp;الفيلسوف&nbsp;ألبير&nbsp;كامو&nbsp;بأنها&nbsp;مدينة&nbsp;&quot;تسكنها&nbsp;الآلهة&quot;.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">إليكم&nbsp;عرضًا&nbsp;عن&nbsp;تيبازة،&nbsp;يشمل&nbsp;تاريخها،&nbsp;وأهم&nbsp;معالمها&nbsp;السياحية،&nbsp;وسحرها&nbsp;المحلي.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">🏛️&nbsp;تاريخ&nbsp;عريق</p><p class=\"ql-align-right\">لم&nbsp;تُبنَ&nbsp;تيبازة&nbsp;(تاريخيًا&nbsp;تيبازة)&nbsp;على&nbsp;يد&nbsp;إمبراطورية&nbsp;واحدة،&nbsp;بل&nbsp;نمت&nbsp;عبر&nbsp;طبقات&nbsp;من&nbsp;تاريخ&nbsp;البحر&nbsp;الأبيض&nbsp;المتوسط:</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">أصولها&nbsp;البونية:&nbsp;كانت&nbsp;في&nbsp;الأصل&nbsp;مركزًا&nbsp;تجاريًا&nbsp;فينيقيًا&nbsp;صغيرًا&nbsp;(القرن&nbsp;السادس&nbsp;قبل&nbsp;الميلاد).</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">عظمتها&nbsp;الرومانية:&nbsp;غزاها&nbsp;الرومان&nbsp;وحولوها&nbsp;إلى&nbsp;مستعمرة&nbsp;عسكرية&nbsp;استراتيجية&nbsp;في&nbsp;عهد&nbsp;الإمبراطور&nbsp;كلوديوس.&nbsp;وأصبحت&nbsp;ميناءً&nbsp;حيويًا&nbsp;لغزو&nbsp;موريتانيا.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">مركزها&nbsp;المسيحي:&nbsp;بحلول&nbsp;القرنين&nbsp;الثالث&nbsp;والرابع&nbsp;الميلاديين،&nbsp;كانت&nbsp;مركزًا&nbsp;رئيسيًا&nbsp;للمسيحية&nbsp;المبكرة،&nbsp;وموطنًا&nbsp;لبعض&nbsp;أكبر&nbsp;الكنائس&nbsp;في&nbsp;شمال&nbsp;إفريقيا.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">اعتراف&nbsp;اليونسكو:&nbsp;أُدرجت&nbsp;ضمن&nbsp;مواقع&nbsp;التراث&nbsp;العالمي&nbsp;عام&nbsp;١٩٨٢&nbsp;لما&nbsp;تتميز&nbsp;به&nbsp;من&nbsp;مزيج&nbsp;فريد&nbsp;من&nbsp;الآثار&nbsp;الفينيقية&nbsp;والرومانية&nbsp;والمسيحية&nbsp;القديمة&nbsp;والبيزنطية.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">📍&nbsp;أهم&nbsp;المعالم&nbsp;السياحية</p><p class=\"ql-align-right\">١.&nbsp;الحديقة&nbsp;الأثرية&nbsp;(الآثار&nbsp;الرومانية)</p><p class=\"ql-align-right\">الموقع&nbsp;الرئيسي&nbsp;عبارة&nbsp;عن&nbsp;متحف&nbsp;مذهل&nbsp;في&nbsp;الهواء&nbsp;الطلق&nbsp;يقع&nbsp;على&nbsp;شاطئ&nbsp;البحر&nbsp;مباشرةً.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">المدرج:&nbsp;ساحة&nbsp;ضخمة&nbsp;كانت&nbsp;تُستخدم&nbsp;في&nbsp;السابق&nbsp;لمباريات&nbsp;المصارعة.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">الكاتدرائية&nbsp;الكبرى:&nbsp;أحد&nbsp;أهم&nbsp;المعالم&nbsp;المسيحية&nbsp;المبكرة&nbsp;في&nbsp;شمال&nbsp;إفريقيا.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">فيلا&nbsp;الجداريات:&nbsp;مسكن&nbsp;روماني&nbsp;لا&nbsp;تزال&nbsp;آثار&nbsp;الفخامة&nbsp;القديمة&nbsp;باديةً&nbsp;فيه.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">نصب&nbsp;كامو&nbsp;التذكاري:&nbsp;نصب&nbsp;تذكاري&nbsp;مُهدى&nbsp;لألبير&nbsp;كامو،&nbsp;يُطل&nbsp;على&nbsp;البحر،&nbsp;نُقشت&nbsp;عليه&nbsp;كلماته:&nbsp;&quot;هنا،&nbsp;أفهم&nbsp;ما&nbsp;يُسمونه&nbsp;المجد:&nbsp;الحق&nbsp;في&nbsp;الحب&nbsp;بلا&nbsp;حدود&quot;.</p>', 1, 1, 1, 1, '2026-02-14 00:00:53'),
(2, 4, 'Timgad', '', '/uploads/discover/1771143857276-51839389.jpg', 'Batna', '<p><strong>Timgad</strong>&nbsp;(ancient&nbsp;<em>Thamugadi</em>)&nbsp;is&nbsp;the&nbsp;&quot;rational&quot;&nbsp;masterpiece&nbsp;of&nbsp;the&nbsp;mountains.</p><p>Located&nbsp;about&nbsp;35&nbsp;km&nbsp;east&nbsp;of&nbsp;<strong>Batna</strong>&nbsp;in&nbsp;the&nbsp;Aurès&nbsp;region,&nbsp;Timgad&nbsp;is&nbsp;often&nbsp;called&nbsp;the&nbsp;<strong>&quot;Pompeii&nbsp;of&nbsp;North&nbsp;Africa.&quot;</strong>&nbsp;It&nbsp;is&nbsp;famous&nbsp;worldwide&nbsp;for&nbsp;being&nbsp;the&nbsp;most&nbsp;perfect&nbsp;surviving&nbsp;example&nbsp;of&nbsp;a&nbsp;Roman&nbsp;&quot;grid&quot;&nbsp;city&nbsp;plan.</p><h2>🏛️&nbsp;The&nbsp;&quot;Ex&nbsp;Nihilo&quot;&nbsp;City</h2><p>Unlike&nbsp;other&nbsp;cities&nbsp;that&nbsp;grew&nbsp;organically,&nbsp;Timgad&nbsp;was&nbsp;built&nbsp;<strong>&quot;ex&nbsp;nihilo&quot;</strong>&nbsp;(from&nbsp;nothing)&nbsp;in&nbsp;<strong>100&nbsp;AD</strong>&nbsp;by&nbsp;Emperor&nbsp;Trajan.</p><ul><li><strong>The&nbsp;Purpose:</strong>&nbsp;It&nbsp;was&nbsp;designed&nbsp;as&nbsp;a&nbsp;retirement&nbsp;colony&nbsp;for&nbsp;veterans&nbsp;of&nbsp;the&nbsp;<strong>Parthian&nbsp;Legions</strong>&nbsp;(Legio&nbsp;III&nbsp;Augusta).</li><li><strong>The&nbsp;Layout:</strong>&nbsp;It&nbsp;is&nbsp;a&nbsp;perfect&nbsp;square,&nbsp;strictly&nbsp;divided&nbsp;by&nbsp;the&nbsp;<strong>Cardo</strong>&nbsp;(North-South&nbsp;street)&nbsp;and&nbsp;the&nbsp;<strong>Decumanus&nbsp;Maximus</strong>&nbsp;(East-West&nbsp;street).</li><li><strong>UNESCO&nbsp;Site:</strong>&nbsp;Like&nbsp;Tipaza,&nbsp;it&nbsp;has&nbsp;been&nbsp;a&nbsp;UNESCO&nbsp;World&nbsp;Heritage&nbsp;site&nbsp;since&nbsp;1982.</li></ul><h2>📍&nbsp;Key&nbsp;Landmarks</h2><h3>1.&nbsp;The&nbsp;Arch&nbsp;of&nbsp;Trajan</h3><p>The&nbsp;undisputed&nbsp;symbol&nbsp;of&nbsp;the&nbsp;city.&nbsp;This&nbsp;12-meter-high&nbsp;triumphal&nbsp;arch&nbsp;stands&nbsp;at&nbsp;the&nbsp;western&nbsp;end&nbsp;of&nbsp;the&nbsp;Decumanus.&nbsp;It&nbsp;is&nbsp;remarkably&nbsp;well-preserved,&nbsp;showcasing&nbsp;intricate&nbsp;Corinthian&nbsp;columns&nbsp;and&nbsp;carvings&nbsp;that&nbsp;once&nbsp;welcomed&nbsp;travelers&nbsp;arriving&nbsp;from&nbsp;the&nbsp;west.</p><h3>2.&nbsp;The&nbsp;Public&nbsp;Library</h3><p>Timgad&nbsp;houses&nbsp;one&nbsp;of&nbsp;the&nbsp;<strong>only&nbsp;two&nbsp;known&nbsp;Roman-period&nbsp;public&nbsp;libraries</strong>&nbsp;in&nbsp;the&nbsp;world&nbsp;(the&nbsp;other&nbsp;is&nbsp;in&nbsp;Ephesus,&nbsp;Turkey).&nbsp;You&nbsp;can&nbsp;still&nbsp;see&nbsp;the&nbsp;rectangular&nbsp;niches&nbsp;in&nbsp;the&nbsp;walls&nbsp;where&nbsp;papyrus&nbsp;scrolls&nbsp;were&nbsp;once&nbsp;stored.</p><h3>3.&nbsp;The&nbsp;Theater</h3><p>Carved&nbsp;into&nbsp;a&nbsp;hillside,&nbsp;this&nbsp;massive&nbsp;amphitheater&nbsp;could&nbsp;seat&nbsp;nearly&nbsp;<strong>4,000&nbsp;spectators</strong>.&nbsp;Even&nbsp;today,&nbsp;the&nbsp;acoustics&nbsp;are&nbsp;so&nbsp;perfect&nbsp;that&nbsp;a&nbsp;whisper&nbsp;on&nbsp;the&nbsp;stage&nbsp;can&nbsp;be&nbsp;heard&nbsp;in&nbsp;the&nbsp;top&nbsp;rows.&nbsp;It&nbsp;still&nbsp;hosts&nbsp;the&nbsp;<strong>Timgad&nbsp;International&nbsp;Music&nbsp;Festival</strong>&nbsp;every&nbsp;summer.</p><h3>4.&nbsp;The&nbsp;Forum&nbsp;&amp;&nbsp;&quot;The&nbsp;Slogan&quot;</h3><p>The&nbsp;heart&nbsp;of&nbsp;public&nbsp;life.&nbsp;On&nbsp;the&nbsp;stone&nbsp;steps&nbsp;of&nbsp;the&nbsp;Forum,&nbsp;you&nbsp;can&nbsp;find&nbsp;a&nbsp;famous&nbsp;engraved&nbsp;inscription&nbsp;that&nbsp;perfectly&nbsp;summarizes&nbsp;the&nbsp;Roman&nbsp;colonial&nbsp;mindset:</p><blockquote><em>“Venari,&nbsp;lavari,&nbsp;ludere,&nbsp;ridere,&nbsp;occ&nbsp;est&nbsp;vivere.”</em>&nbsp;(<strong>To&nbsp;hunt,&nbsp;to&nbsp;bathe,&nbsp;to&nbsp;play,&nbsp;to&nbsp;laugh—that&nbsp;is&nbsp;to&nbsp;live.</strong>)</blockquote><h3>5.&nbsp;The&nbsp;Great&nbsp;Baths</h3><p>Timgad&nbsp;had&nbsp;over&nbsp;<strong>14&nbsp;public&nbsp;baths</strong>,&nbsp;but&nbsp;the&nbsp;Northern&nbsp;Baths&nbsp;are&nbsp;the&nbsp;most&nbsp;impressive.&nbsp;They&nbsp;feature&nbsp;a&nbsp;sophisticated&nbsp;underfloor&nbsp;heating&nbsp;system&nbsp;(<em>hypocaust</em>)&nbsp;that&nbsp;is&nbsp;still&nbsp;visible&nbsp;today.</p>', '<p class=\"ql-align-right\">تيمقاد&nbsp;(ثاموغادي&nbsp;سابقًا)&nbsp;هي&nbsp;تحفة&nbsp;معمارية&nbsp;&quot;عقلانية&quot;&nbsp;في&nbsp;الجبال.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">تقع&nbsp;تيمقاد&nbsp;على&nbsp;بُعد&nbsp;حوالي&nbsp;35&nbsp;كيلومترًا&nbsp;شرق&nbsp;باتنة&nbsp;في&nbsp;منطقة&nbsp;الأوراس،&nbsp;وغالبًا&nbsp;ما&nbsp;تُلقب&nbsp;بـ&quot;بومبي&nbsp;شمال&nbsp;إفريقيا&quot;.&nbsp;تشتهر&nbsp;عالميًا&nbsp;بكونها&nbsp;المثال&nbsp;الأكمل&nbsp;الباقي&nbsp;على&nbsp;تخطيط&nbsp;المدن&nbsp;الرومانية&nbsp;الشبكي.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">🏛️&nbsp;مدينة&nbsp;&quot;من&nbsp;العدم&quot;</p><p class=\"ql-align-right\">على&nbsp;عكس&nbsp;المدن&nbsp;الأخرى&nbsp;التي&nbsp;نمت&nbsp;بشكل&nbsp;عفوي،&nbsp;بُنيت&nbsp;تيمقاد&nbsp;&quot;من&nbsp;العدم&quot;&nbsp;(ex&nbsp;nihilo)&nbsp;عام&nbsp;100&nbsp;ميلادي&nbsp;على&nbsp;يد&nbsp;الإمبراطور&nbsp;تراجان.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">الغرض:&nbsp;صُممت&nbsp;لتكون&nbsp;مستعمرة&nbsp;تقاعد&nbsp;لقدامى&nbsp;المحاربين&nbsp;في&nbsp;الفيالق&nbsp;البارثية&nbsp;(الفيلق&nbsp;الثالث&nbsp;أوغستا).</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">التصميم:&nbsp;هي&nbsp;عبارة&nbsp;عن&nbsp;ساحة&nbsp;مثالية،&nbsp;مقسمة&nbsp;بدقة&nbsp;بواسطة&nbsp;شارع&nbsp;كاردو&nbsp;(شارع&nbsp;يمتد&nbsp;من&nbsp;الشمال&nbsp;إلى&nbsp;الجنوب)&nbsp;وشارع&nbsp;ديكومانوس&nbsp;ماكسيموس&nbsp;(شارع&nbsp;يمتد&nbsp;من&nbsp;الشرق&nbsp;إلى&nbsp;الغرب).</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">موقع&nbsp;اليونسكو:&nbsp;مثل&nbsp;تيبازة،&nbsp;أُدرجت&nbsp;تيمقاد&nbsp;ضمن&nbsp;مواقع&nbsp;التراث&nbsp;العالمي&nbsp;لليونسكو&nbsp;منذ&nbsp;عام&nbsp;١٩٨٢.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">📍المعالم&nbsp;الرئيسية</p><p class=\"ql-align-right\">١.&nbsp;قوس&nbsp;تراجان</p><p class=\"ql-align-right\">الرمز&nbsp;الأبرز&nbsp;للمدينة.&nbsp;يقع&nbsp;هذا&nbsp;القوس&nbsp;الشامخ،&nbsp;الذي&nbsp;يبلغ&nbsp;ارتفاعه&nbsp;١٢&nbsp;مترًا،&nbsp;في&nbsp;الطرف&nbsp;الغربي&nbsp;من&nbsp;ديكومانوس.&nbsp;وهو&nbsp;محفوظ&nbsp;بشكل&nbsp;رائع،&nbsp;ويضم&nbsp;أعمدة&nbsp;كورنثية&nbsp;متقنة&nbsp;الصنع&nbsp;ونقوشًا&nbsp;كانت&nbsp;تستقبل&nbsp;المسافرين&nbsp;القادمين&nbsp;من&nbsp;الغرب.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">٢.&nbsp;المكتبة&nbsp;العامة</p><p class=\"ql-align-right\">تضم&nbsp;تيمقاد&nbsp;إحدى&nbsp;المكتبتين&nbsp;العامتين&nbsp;الوحيدتين&nbsp;المعروفتين&nbsp;في&nbsp;العالم&nbsp;اللتين&nbsp;تعودان&nbsp;إلى&nbsp;العصر&nbsp;الروماني&nbsp;(الأخرى&nbsp;في&nbsp;أفسس،&nbsp;تركيا).&nbsp;لا&nbsp;يزال&nbsp;بإمكانك&nbsp;رؤية&nbsp;المحاريب&nbsp;المستطيلة&nbsp;في&nbsp;الجدران&nbsp;حيث&nbsp;كانت&nbsp;تُحفظ&nbsp;لفائف&nbsp;البردي.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">٣.&nbsp;المسرح</p><p class=\"ql-align-right\">نُحت&nbsp;هذا&nbsp;المدرج&nbsp;الضخم&nbsp;في&nbsp;سفح&nbsp;تل،&nbsp;ويتسع&nbsp;لما&nbsp;يقارب&nbsp;٤٠٠٠&nbsp;متفرج.&nbsp;وحتى&nbsp;اليوم،&nbsp;لا&nbsp;تزال&nbsp;جودة&nbsp;الصوت&nbsp;فيه&nbsp;مثالية&nbsp;لدرجة&nbsp;أنه&nbsp;يُمكن&nbsp;سماع&nbsp;الهمس&nbsp;على&nbsp;خشبة&nbsp;المسرح&nbsp;في&nbsp;الصفوف&nbsp;العلوية.&nbsp;لا&nbsp;تزال&nbsp;تيمجاد&nbsp;تستضيف&nbsp;مهرجان&nbsp;تيمجاد&nbsp;الدولي&nbsp;للموسيقى&nbsp;كل&nbsp;صيف.</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">٤.&nbsp;المنتدى&nbsp;و&quot;الشعار&quot;</p><p class=\"ql-align-right\">قلب&nbsp;الحياة&nbsp;العامة.&nbsp;على&nbsp;درجات&nbsp;المنتدى&nbsp;الحجرية،&nbsp;ستجد&nbsp;نقشًا&nbsp;شهيرًا&nbsp;يلخص&nbsp;تمامًا&nbsp;عقلية&nbsp;الاستعمار&nbsp;الروماني:</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">&quot;Venari,&nbsp;lavari,&nbsp;ludere,&nbsp;ridere,&nbsp;occ&nbsp;est&nbsp;vivere.&quot;</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">(الصيد،&nbsp;الاستحمام،&nbsp;اللعب،&nbsp;الضحك&nbsp;-&nbsp;تلك&nbsp;هي&nbsp;الحياة).</p><p class=\"ql-align-right\"></p><p class=\"ql-align-right\">٥.&nbsp;الحمامات&nbsp;الكبرى</p><p class=\"ql-align-right\">كان&nbsp;في&nbsp;تيمجاد&nbsp;أكثر&nbsp;من&nbsp;١٤&nbsp;حمامًا&nbsp;عامًا،&nbsp;لكن&nbsp;الحمامات&nbsp;الشمالية&nbsp;هي&nbsp;الأكثر&nbsp;إثارة&nbsp;للإعجاب.&nbsp;تتميز&nbsp;بنظام&nbsp;تدفئة&nbsp;أرضية&nbsp;متطور&nbsp;(هيبوكاوست)&nbsp;لا&nbsp;يزال&nbsp;قائمًا&nbsp;حتى&nbsp;اليوم.</p>', 1, 1, 1, 1, '2026-02-15 08:25:17');

-- --------------------------------------------------------

--
-- Structure de la table `discover_place_categories`
--

CREATE TABLE `discover_place_categories` (
  `id` int(11) NOT NULL,
  `place_id` int(11) NOT NULL,
  `name_en` varchar(100) NOT NULL,
  `name_ar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `discover_place_categories`
--

INSERT INTO `discover_place_categories` (`id`, `place_id`, `name_en`, `name_ar`) VALUES
(8, 2, 'roman', 'تيمقاد'),
(9, 2, 'UNESCO', 'اليونسكو'),
(10, 1, 'history', 'history');

-- --------------------------------------------------------

--
-- Structure de la table `discover_place_gallery`
--

CREATE TABLE `discover_place_gallery` (
  `id` int(11) NOT NULL,
  `place_id` int(11) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `discover_place_gallery`
--

INSERT INTO `discover_place_gallery` (`id`, `place_id`, `image_url`, `sort_order`) VALUES
(24, 2, '/uploads/discover/1771143863633-382127246.jpg', 1),
(25, 2, '/uploads/discover/1771143863639-790906865.jpeg', 2),
(26, 2, '/uploads/discover/1771143863657-565324215.jpeg', 3),
(27, 1, '/uploads/discover/1771143372985-79971572.webp', 1),
(28, 1, '/uploads/discover/1771143372991-495766138.webp', 2),
(29, 1, '/uploads/discover/1771143373006-752681096.webp', 3),
(30, 1, '/uploads/discover/1771143373014-738391162.webp', 4),
(31, 1, '/uploads/discover/1771143373028-872347431.webp', 5),
(32, 1, '/uploads/discover/1771143373039-511141882.webp', 6),
(33, 1, '/uploads/discover/1771143373046-753702356.webp', 7);

-- --------------------------------------------------------

--
-- Structure de la table `discover_sections`
--

CREATE TABLE `discover_sections` (
  `id` int(11) NOT NULL,
  `name_en` varchar(150) NOT NULL,
  `name_ar` varchar(150) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `discover_sections`
--

INSERT INTO `discover_sections` (`id`, `name_en`, `name_ar`, `sort_order`, `is_active`) VALUES
(1, 'Art & Culture', 'الفنون والثقافة', 1, 1),
(2, 'Architecture', 'هندسة معمارية ', 2, 1),
(3, 'Museums', 'المتاحف', 3, 1),
(4, 'UNESCO World Heritage', 'موقع تراث عالمي لليونسكو', 4, 1);

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title_en` varchar(200) NOT NULL,
  `title_ar` varchar(200) NOT NULL,
  `subtitle_en` varchar(255) DEFAULT NULL,
  `subtitle_ar` varchar(255) DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `category` enum('festivals','exhibitions','concerts','sports','other') NOT NULL DEFAULT 'other',
  `region` varchar(100) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `place` varchar(200) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `time_start` time DEFAULT NULL,
  `time_end` time DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `contact_phone` varchar(30) DEFAULT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  `homepage` varchar(300) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `title_en`, `title_ar`, `subtitle_en`, `subtitle_ar`, `description_en`, `description_ar`, `category`, `region`, `location`, `address`, `place`, `date_start`, `date_end`, `time_start`, `time_end`, `image_url`, `contact_phone`, `contact_email`, `homepage`, `is_featured`, `sort_order`, `is_active`, `created_at`) VALUES
(1, 'Sahara Cultural Festival', 'مهرجان الصحراء الثقافي', 'Experience the vibrant traditions of the Tuareg people through music', 'ستمتع بتجربة التقاليد النابضة بالحياة لشعب الطوارق من خلال الموسيقى', 'Experience the vibrant traditions of the Tuareg people through music, dance, and storytelling under a canopy of stars in the world\'s greatest desert.', 'استمتع بتجربة التقاليد النابضة بالحياة لشعب الطوارق من خلال الموسيقى والرقص ورواية القصص تحت سماء مرصعة بالنجوم في أعظم صحراء في العالم.', 'festivals', 'Tamanrasset', 'Tamanrasset, Sahara', 'city 1000 logs, zeralda, alger, algerie, Bat 27 Numéro 06', 'city 1000 logs', '2026-02-08', '2026-02-24', '18:00:00', '23:00:00', 'https://images.unsplash.com/photo-1575664274476-e02d99195164?w=800&fit=crop', '0698095449', 'ilyes.bourouba7@gmail.com', 'http://localhost/phpmyadmin/index.php?route=/', 1, 1, 1, '2026-02-10 19:36:12'),
(2, 'Timgad International Music Festival', '???????????? ???????????? ???????????? ????????????????', '', '', 'A legendary open-air concert held in the ancient Roman theater of Timgad. World-class artists perform against a backdrop of 2,000-year-old ruins.', '?????? ???????????? ???????????? ???? ???????????? ?????????? ?????????? ???? ???????????? ???????????????? ???????????? ??????????????. ???????????? ?????????????? ?????????? ?????? ?????????? ?????????? ?????????? 2000 ??????.', 'concerts', 'Batna', 'Timgad', '', '', '2025-07-04', '2025-07-11', '19:00:00', '01:00:00', 'https://images.unsplash.com/photo-1549145177-238518f1ec1a?w=800&fit=crop', '', '', '', 1, 2, 1, '2026-02-10 19:36:12'),
(3, 'Mediterranean Coastal Tour', '???????? ???????????? ????????????????', '', '', 'Discover Algeria\'s stunning 1,200km coastline with pristine beaches, hidden coves, and charming coastal towns. Crystal-clear waters and fresh seafood await.', '?????????? ???????? ?????????????? ???????????? ???????????? ?????? 1200 ???? ???? ?????????? ???????? ???????????? ?????????? ???????? ???????????? ??????????.', 'other', 'Algiers', 'Algerian Coast', '', '', '2025-04-28', '2025-09-27', '08:00:00', '20:00:00', 'https://images.unsplash.com/photo-1642088995585-e97a4af093ef?w=800&fit=crop', '', '', '', 1, 3, 1, '2026-02-10 19:36:12'),
(4, 'Timgad Festival', '???????????? ????????????', NULL, NULL, 'Annual international music festival at the Roman theater of Timgad.', '???????????? ???????????????? ???????????? ???????????? ???? ???????????? ???????????????? ??????????????.', 'festivals', 'Batna', 'Timgad', NULL, NULL, '2025-07-05', '2025-07-12', '19:00:00', '01:00:00', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&fit=crop', NULL, NULL, NULL, 0, 4, 1, '2026-02-10 19:36:12'),
(5, 'Puppet Festival', '???????????? ??????????', NULL, NULL, 'International puppet theater festival.', '???????????? ???????? ?????????? ????????????.', 'festivals', 'A??n T??mouchent', 'A??n T??mouchent', NULL, NULL, '2025-08-15', '2025-08-20', '10:00:00', '18:00:00', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&fit=crop', NULL, NULL, NULL, 0, 5, 1, '2026-02-10 19:36:12'),
(6, 'Sbiba Festival', '???????????? ??????????????', NULL, NULL, 'Traditional Tuareg celebration in the heart of the Sahara.', '???????????? ???????????? ?????????????? ???? ?????? ??????????????.', 'festivals', 'Illizi', 'Djanet, Sahara', NULL, NULL, '2025-09-10', '2025-09-12', '08:00:00', '23:00:00', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&fit=crop', NULL, NULL, NULL, 0, 6, 1, '2026-02-10 19:36:12');

-- --------------------------------------------------------

--
-- Structure de la table `event_categories`
--

CREATE TABLE `event_categories` (
  `id` int(11) NOT NULL,
  `name_en` varchar(100) NOT NULL,
  `name_ar` varchar(100) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `event_categories`
--

INSERT INTO `event_categories` (`id`, `name_en`, `name_ar`, `sort_order`, `is_active`, `created_at`) VALUES
(1, 'Festivals.', 'مهرجانات', 1, 1, '2026-02-13 14:54:42'),
(2, 'Exhibitions', 'معارض', 2, 1, '2026-02-13 14:54:42'),
(3, 'Concerts', 'حفلات', 3, 1, '2026-02-13 14:54:42'),
(4, 'Sports', 'رياضة', 4, 1, '2026-02-13 14:54:42'),
(5, 'Conferences', 'مؤتمرات', 5, 1, '2026-02-13 14:54:42'),
(6, 'Cultural', 'ثقافية', 6, 1, '2026-02-13 14:54:42'),
(7, 'Other', 'أخرى', 7, 1, '2026-02-13 14:54:42'),
(8, 'test', 'إيليس', 9, 1, '2026-02-13 15:06:35'),
(9, 'Hiking', 'جولة على الأقدام', 5, 1, '2026-02-17 11:22:06');

-- --------------------------------------------------------

--
-- Structure de la table `event_category_map`
--

CREATE TABLE `event_category_map` (
  `event_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `event_category_map`
--

INSERT INTO `event_category_map` (`event_id`, `category_id`) VALUES
(1, 8),
(2, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `event_gallery`
--

CREATE TABLE `event_gallery` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `event_gallery`
--

INSERT INTO `event_gallery` (`id`, `event_id`, `image_url`, `sort_order`) VALUES
(1, 1, '/uploads/events/1770996496094-27628686.jpg', 1),
(2, 1, '/uploads/events/1770996496107-294085983.jpg', 2),
(3, 1, '/uploads/events/1770996496131-40217551.jpg', 3);

-- --------------------------------------------------------

--
-- Structure de la table `event_tags`
--

CREATE TABLE `event_tags` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `tag_en` varchar(50) NOT NULL,
  `tag_ar` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `event_tags`
--

INSERT INTO `event_tags` (`id`, `event_id`, `tag_en`, `tag_ar`) VALUES
(1, 1, 'Festival', '????????????'),
(2, 1, 'Culture', '??????????'),
(3, 2, 'Music', '????????????'),
(4, 2, 'Heritage', '????????'),
(5, 3, 'Beach', '????????'),
(6, 3, 'Nature', '??????????');

-- --------------------------------------------------------

--
-- Structure de la table `hero_slides`
--

CREATE TABLE `hero_slides` (
  `id` int(11) NOT NULL,
  `title_en` varchar(100) NOT NULL,
  `title_ar` varchar(100) NOT NULL,
  `subtitle_en` varchar(255) DEFAULT NULL,
  `subtitle_ar` varchar(255) DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `bg_image_url` varchar(500) DEFAULT NULL,
  `wilaya_ids` varchar(500) DEFAULT NULL,
  `video_url` varchar(500) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `hero_slides`
--

INSERT INTO `hero_slides` (`id`, `title_en`, `title_ar`, `subtitle_en`, `subtitle_ar`, `description_en`, `description_ar`, `bg_image_url`, `wilaya_ids`, `video_url`, `sort_order`, `is_active`) VALUES
(1, 'Summer Vacation', 'العطلات الصيفية', 'Lorem Ipsum', 'Lorem Ipsum', '<p class=\"ql-align-justify\"><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem&nbsp;Ipsum</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">&nbsp;is&nbsp;simply&nbsp;dummy&nbsp;text&nbsp;of&nbsp;the&nbsp;printing&nbsp;and&nbsp;typesetting&nbsp;industry.&nbsp;Lorem&nbsp;Ipsum&nbsp;has&nbsp;been&nbsp;the&nbsp;industry&#39;s&nbsp;standard&nbsp;dummy&nbsp;text&nbsp;ever&nbsp;since&nbsp;the&nbsp;1500s,&nbsp;when&nbsp;an&nbsp;unknown&nbsp;printer&nbsp;took&nbsp;a&nbsp;galley&nbsp;of&nbsp;type&nbsp;and&nbsp;scrambled&nbsp;it&nbsp;to&nbsp;make&nbsp;a&nbsp;type&nbsp;specimen&nbsp;book.&nbsp;It&nbsp;has&nbsp;survived&nbsp;not&nbsp;only&nbsp;five&nbsp;centuries,&nbsp;but&nbsp;also&nbsp;the&nbsp;leap&nbsp;into&nbsp;electronic&nbsp;typesetting,&nbsp;remaining&nbsp;essentially&nbsp;unchanged.&nbsp;It&nbsp;was&nbsp;popularised&nbsp;in&nbsp;the&nbsp;1960s&nbsp;with&nbsp;the&nbsp;release&nbsp;of&nbsp;Letraset&nbsp;sheets&nbsp;containing&nbsp;Lorem&nbsp;Ipsum&nbsp;passages,&nbsp;and&nbsp;more&nbsp;recently&nbsp;with&nbsp;desktop&nbsp;publishing&nbsp;software&nbsp;like&nbsp;Aldus&nbsp;PageMaker&nbsp;including&nbsp;versions&nbsp;of&nbsp;Lorem&nbsp;Ipsum.</span></p>', '<p class=\"ql-align-justify\"><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem&nbsp;Ipsum</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">&nbsp;is&nbsp;simply&nbsp;dummy&nbsp;text&nbsp;of&nbsp;the&nbsp;printing&nbsp;and&nbsp;typesetting&nbsp;industry.&nbsp;Lorem&nbsp;Ipsum&nbsp;has&nbsp;been&nbsp;the&nbsp;industry&#39;s&nbsp;standard&nbsp;dummy&nbsp;text&nbsp;ever&nbsp;since&nbsp;the&nbsp;1500s,&nbsp;when&nbsp;an&nbsp;unknown&nbsp;printer&nbsp;took&nbsp;a&nbsp;galley&nbsp;of&nbsp;type&nbsp;and&nbsp;scrambled&nbsp;it&nbsp;to&nbsp;make&nbsp;a&nbsp;type&nbsp;specimen&nbsp;book.&nbsp;It&nbsp;has&nbsp;survived&nbsp;not&nbsp;only&nbsp;five&nbsp;centuries,&nbsp;but&nbsp;also&nbsp;the&nbsp;leap&nbsp;into&nbsp;electronic&nbsp;typesetting,&nbsp;remaining&nbsp;essentially&nbsp;unchanged.&nbsp;It&nbsp;was&nbsp;popularised&nbsp;in&nbsp;the&nbsp;1960s&nbsp;with&nbsp;the&nbsp;release&nbsp;of&nbsp;Letraset&nbsp;sheets&nbsp;containing&nbsp;Lorem&nbsp;Ipsum&nbsp;passages,&nbsp;and&nbsp;more&nbsp;recently&nbsp;with&nbsp;desktop&nbsp;publishing&nbsp;software&nbsp;like&nbsp;Aldus&nbsp;PageMaker&nbsp;including&nbsp;versions&nbsp;of&nbsp;Lorem&nbsp;Ipsum.</span></p>', '/uploads/hero-slides/1771507195380-544070194.jpg', '16,31,49', '/uploads/hero-slides/1770839717003-854168536.mp4', 1, 1),
(2, 'Beaches', '??????????????', NULL, NULL, NULL, NULL, NULL, NULL, '', 4, 0),
(3, 'Family Activities', 'أنشطة عائلية', NULL, NULL, NULL, NULL, NULL, NULL, '', 2, 1),
(4, 'Historical Sites', 'المواقع التاريخية', NULL, NULL, NULL, NULL, NULL, NULL, '', 3, 1),
(6, 'Hiking', '?????????? ?????????????? ??????????', NULL, NULL, NULL, NULL, NULL, NULL, '', 5, 0),
(7, 'Sahara Desert', '?????????????? ????????????', NULL, NULL, NULL, NULL, NULL, NULL, '', 6, 0);

-- --------------------------------------------------------

--
-- Structure de la table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(11) NOT NULL,
  `name_en` varchar(200) NOT NULL,
  `name_ar` varchar(200) DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `stars` tinyint(4) DEFAULT 3,
  `price` decimal(10,2) DEFAULT 0.00,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `web_link` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `hotels`
--

INSERT INTO `hotels` (`id`, `name_en`, `name_ar`, `description_en`, `description_ar`, `image_url`, `region`, `stars`, `price`, `sort_order`, `is_active`, `web_link`) VALUES
(1, 'AZ', 'AZ', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Nos&nbsp;hôtels&nbsp;sont&nbsp;conçus&nbsp;pour&nbsp;vous&nbsp;recevoir&nbsp;dans&nbsp;le&nbsp;meilleur&nbsp;confort&nbsp;que&nbsp;vous&nbsp;soyez&nbsp;en&nbsp;déplacement&nbsp;professionnel&nbsp;ou&nbsp;en&nbsp;famille.&nbsp;Situé&nbsp;dans&nbsp;la&nbsp;wilaya&nbsp;d&#39;Alger&nbsp;et&nbsp;la&nbsp;wilaya&nbsp;de&nbsp;Mostaganem&nbsp;AZ&nbsp;Hôtels&nbsp;n&#39;a&nbsp;pour&nbsp;but&nbsp;que&nbsp;de&nbsp;faciliter&nbsp;votre&nbsp;séjour&nbsp;et&nbsp;de&nbsp;le&nbsp;rendre&nbsp;le&nbsp;plus&nbsp;agréable&nbsp;possible.&nbsp;Vous&nbsp;trouverez&nbsp;toute&nbsp;l&#39;année&nbsp;une&nbsp;opportunité&nbsp;de&nbsp;séjourner&nbsp;au&nbsp;meilleur&nbsp;prix.&nbsp;AZ&nbsp;Hôtels,&nbsp;l&#39;empreinte&nbsp;de&nbsp;l&#39;élégance&nbsp;et&nbsp;du&nbsp;raffinement.</span></p>', '<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Nos&nbsp;hôtels&nbsp;sont&nbsp;conçus&nbsp;pour&nbsp;vous&nbsp;recevoir&nbsp;dans&nbsp;le&nbsp;meilleur&nbsp;confort&nbsp;que&nbsp;vous&nbsp;soyez&nbsp;en&nbsp;déplacement&nbsp;professionnel&nbsp;ou&nbsp;en&nbsp;famille.&nbsp;Situé&nbsp;dans&nbsp;la&nbsp;wilaya&nbsp;d&#39;Alger&nbsp;et&nbsp;la&nbsp;wilaya&nbsp;de&nbsp;Mostaganem&nbsp;AZ&nbsp;Hôtels&nbsp;n&#39;a&nbsp;pour&nbsp;but&nbsp;que&nbsp;de&nbsp;faciliter&nbsp;votre&nbsp;séjour&nbsp;et&nbsp;de&nbsp;le&nbsp;rendre&nbsp;le&nbsp;plus&nbsp;agréable&nbsp;possible.&nbsp;Vous&nbsp;trouverez&nbsp;toute&nbsp;l&#39;année&nbsp;une&nbsp;opportunité&nbsp;de&nbsp;séjourner&nbsp;au&nbsp;meilleur&nbsp;prix.&nbsp;AZ&nbsp;Hôtels,&nbsp;l&#39;empreinte&nbsp;de&nbsp;l&#39;élégance&nbsp;et&nbsp;du&nbsp;raffinement.</span></p>', '/uploads/hotels/1771426485477-78690414.png', 'Algiers', 4, 7999.00, 1, 1, 'https://www.azhotels.com.dz/');

-- --------------------------------------------------------

--
-- Structure de la table `hotel_tags`
--

CREATE TABLE `hotel_tags` (
  `id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `tag_en` varchar(100) DEFAULT NULL,
  `tag_ar` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `hotel_tags`
--

INSERT INTO `hotel_tags` (`id`, `hotel_id`, `tag_en`, `tag_ar`) VALUES
(10, 1, 'alger', 'alger'),
(11, 1, 'AZ', 'AZ'),
(12, 1, 'ville ', 'ville');

-- --------------------------------------------------------

--
-- Structure de la table `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `code` varchar(10) NOT NULL,
  `name_en` varchar(50) NOT NULL,
  `name_native` varchar(50) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `languages`
--

INSERT INTO `languages` (`id`, `code`, `name_en`, `name_native`, `is_active`, `sort_order`) VALUES
(1, 'fr', 'French', 'Français', 1, 1),
(3, 'de', 'German', 'Deutsch', 1, 2),
(4, 'it', 'Italian', 'Italiano', 1, 3),
(8, 'es', 'Spanish', 'Español', 1, 4),
(9, 'nl', 'Dutch', 'Nederlands', 1, 5);

-- --------------------------------------------------------

--
-- Structure de la table `library_categories`
--

CREATE TABLE `library_categories` (
  `id` int(11) NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_ar` varchar(255) DEFAULT '',
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `library_categories`
--

INSERT INTO `library_categories` (`id`, `name_en`, `name_ar`, `sort_order`, `is_active`, `created_at`) VALUES
(1, 'ilyes', 'yacine', 1, 1, '2026-02-18 08:05:41');

-- --------------------------------------------------------

--
-- Structure de la table `panoramas`
--

CREATE TABLE `panoramas` (
  `id` int(11) NOT NULL,
  `title_en` varchar(150) NOT NULL,
  `title_ar` varchar(150) NOT NULL,
  `tag_en` varchar(50) DEFAULT NULL,
  `tag_ar` varchar(50) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `panoramas`
--

INSERT INTO `panoramas` (`id`, `title_en`, `title_ar`, `tag_en`, `tag_ar`, `image_url`, `sort_order`, `is_active`) VALUES
(1, 'tipaza roman ruins', 'الآثار الرومانية في تيبازا', 'ruins', 'آثار', '/uploads/panoramas/1771142994274-341317920.jpg', 1, 1),
(2, 'setif snow', 'ثلج سطيف', 'Snow', 'ثلج', '/uploads/panoramas/1771143190336-890923025.jpg', 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL,
  `setting_key` varchar(50) NOT NULL,
  `setting_value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `site_settings`
--

INSERT INTO `site_settings` (`id`, `setting_key`, `setting_value`) VALUES
(1, 'unesco_badge_en', 'UNESCO World Heritage'),
(2, 'unesco_badge_ar', '???????????? ?????????????? ????????????????'),
(3, 'unesco_headline_en', 'Discover Algeria\'s UNESCO World Heritage Sites'),
(4, 'unesco_headline_ar', '?????????? ?????????? ???????????? ?????????????? ???? ??????????????'),
(5, 'unesco_description_en', 'Algeria is home to seven exceptional sites recognized by UNESCO for their outstanding universal value.'),
(6, 'unesco_description_ar', '?????? ?????????????? ???????? ?????????? ?????????????????? ?????????? ?????? ???? ?????? ???????????????? ?????????????? ???????????????? ????????????????.'),
(7, 'unesco_cta_en', 'Explore Heritage Sites'),
(8, 'unesco_cta_ar', '???????????? ?????????? ????????????'),
(9, 'hero_subtitle_en', 'Discover the beauty of Algeria'),
(10, 'hero_subtitle_ar', '?????????? ???????? ??????????????'),
(11, 'footer_tagline_en', 'Your gateway to Algeria\'s beauty and heritage.'),
(12, 'footer_tagline_ar', '???????????? ?????????? ?????????????? ??????????????.'),
(13, 'contact_address', '02, Rue Amar El Kama, Algiers, Algeria'),
(14, 'contact_phone', '+213 (0) 21 71 30 60'),
(15, 'contact_email', 'contact@visitalgeria.dz'),
(16, 'tg_hero_bg', 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&q=80&w=1600'),
(17, 'tg_hero_badge_en', 'VIRTUAL TOUR'),
(18, 'tg_hero_badge_ar', 'جولة افتراضية'),
(19, 'tg_hero_title_en', 'ALGERIA VIRTUAL HERITAGE'),
(20, 'tg_hero_title_ar', 'التراث الافتراضي للجزائر'),
(21, 'tg_hero_subtitle_en', 'Embark on an immersive journey through the ancient Casbahs, Sahara dunes, and Roman ruins from your home.'),
(22, 'tg_hero_subtitle_ar', 'انطلق في رحلة غامرة عبر القصبات القديمة وكثبان الصحراء والآثار الرومانية من منزلك.'),
(23, 'social_facebook', 'https://facebook.com'),
(24, 'social_instagram', 'instagram.com'),
(25, 'social_tiktok', 'tiktok.com'),
(26, 'social_youtube', ''),
(27, 'social_twitter', ''),
(28, 'social_linkedin', ''),
(29, 'social_pinterest', '');

-- --------------------------------------------------------

--
-- Structure de la table `suggestions`
--

CREATE TABLE `suggestions` (
  `id` int(11) NOT NULL,
  `tag_en` varchar(50) NOT NULL,
  `tag_ar` varchar(50) NOT NULL,
  `title_en` varchar(150) NOT NULL,
  `title_ar` varchar(150) NOT NULL,
  `description_en` text NOT NULL,
  `description_ar` text NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `suggestions`
--

INSERT INTO `suggestions` (`id`, `tag_en`, `tag_ar`, `title_en`, `title_ar`, `description_en`, `description_ar`, `image_url`, `sort_order`, `is_active`) VALUES
(1, 'Top Attractions', '???????? ??????????????', 'The Aur??s Mountains', '???????? ??????????????', 'Discover the majestic Aur??s mountains, home to ancient Berber civilizations, dramatic gorges, and traditional villages perched on rocky cliffs.', '?????????? ???????? ?????????????? ???????????????? ???????? ???????????????? ???????????????????? ?????????????? ?????????????????? ???????????????????????? ???????????? ??????????????????.', '/uploads/suggestions/1770842405426-138320626.png', 1, 1),
(2, 'World Heritage', '???????? ??????????', 'Timgad Roman City', '?????????? ???????????? ??????????????????', 'Walk through the remarkably preserved ruins of this Roman colonial city founded by Emperor Trajan around 100 AD.', '???????? ???? ?????????????? ???????????????? ???????? ???????? ???????? ?????????????? ?????????????????????? ??????????????????.', NULL, 2, 1),
(3, 'Nature', '??????????', 'Djurdjura National Park', '?????????? ?????????? ??????????????', 'Experience the breathtaking landscapes of the Djurdjura range, from snow-capped peaks to lush cedar forests.', '?????? ?????????????? ???????????????? ?????????????? ???????????? ?????????? ???? ?????????? ?????????????? ?????????????? ?????? ?????????? ??????????.', NULL, 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `tour_guide_hero`
--

CREATE TABLE `tour_guide_hero` (
  `id` int(11) NOT NULL DEFAULT 1,
  `bg_image_url` varchar(255) DEFAULT NULL,
  `badge_en` varchar(100) DEFAULT NULL,
  `badge_ar` varchar(100) DEFAULT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `title_ar` varchar(255) DEFAULT NULL,
  `subtitle_en` text DEFAULT NULL,
  `subtitle_ar` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `tour_guide_hero`
--

INSERT INTO `tour_guide_hero` (`id`, `bg_image_url`, `badge_en`, `badge_ar`, `title_en`, `title_ar`, `subtitle_en`, `subtitle_ar`, `updated_at`) VALUES
(1, '/uploads/tour-guide-hero/1770990316391-185550521.avif', 'VIRTUAL TOUR', 'جولة افتراضية', 'ALGERIA VIRTUAL HERITAGE', 'التراث الافتراضي للجزائر', 'Embark on an immersive journey through the ancient Casbahs, Sahara dunes, and Roman ruins from your home.', 'انطلق في رحلة غامرة عبر القصبات القديمة وكثبان الصحراء والآثار الرومانية من منزلك.', '2026-02-13 13:45:17');

-- --------------------------------------------------------

--
-- Structure de la table `tour_locations`
--

CREATE TABLE `tour_locations` (
  `id` int(11) NOT NULL,
  `title_en` varchar(150) NOT NULL,
  `title_ar` varchar(150) NOT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `matterport_url` varchar(500) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `tour_locations`
--

INSERT INTO `tour_locations` (`id`, `title_en`, `title_ar`, `description_en`, `description_ar`, `image_url`, `matterport_url`, `region`, `sort_order`, `is_active`) VALUES
(2, 'Timgad: The Roman Outpost', '????????????: ?????????? ????????????????', 'Walk through the remarkably preserved Roman colonial city founded by Emperor Trajan around 100 AD.', '???????? ???? ?????????????? ?????????????????????? ?????????????????? ???????????????? ???????? ???????? ???????? ?????????? ???????????????????? ????????????.', 'https://images.unsplash.com/photo-1549145177-238518f1ec1a?w=800&fit=crop', 'https://my.matterport.com/show/?m=M6gCqdgrcmQ', NULL, 2, 1),
(3, 'Casbah of Algiers', '???????? ??????????????', 'Navigate the labyrinthine streets of the historic Casbah, a UNESCO World Heritage Site since 1992.', '???????? ?????? ?????????????? ?????????????? ???????????? ???????????????????? ???????? ???????? ?????????? ???????????????? ?????? 1992.', '/uploads/tour-locations/1770988919715-279827671.jpg', 'https://my.matterport.com/show/?m=M6gCqdgrcmQ', NULL, 3, 1),
(4, 'Zeralda', 'زيرالدا', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'ي هذه الصناعة منذ القرن السادس عشر، عندما قام طابع مجهول بأخذ مجموعة من الحروف وخلطها لإنشاء كتاب عينات طباعية. وقد صمد هذا النص ليس فقط لخمسة قرون، بل أيضًا أمام ثورة الطباعة الإلكترونية، وبقي دون تغيير يُذكر. وقد شاع استخدامه في ستينيات القرن الماضي مع إصدار أوراق ليتراسيت التي تحتوي على مقاطع من لوريم إيبسوم، ومؤخرًا مع برامج النشر المكتبي مثل ألدوس بيج ميكر التي تتضمن نسخًا منه.', '/uploads/tour-locations/1770990203459-947727001.jpg', 'https://my.matterport.com/show/?m=M6gCqdgrcmQ', 'Algiers', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `tour_location_tags`
--

CREATE TABLE `tour_location_tags` (
  `id` int(11) NOT NULL,
  `tour_location_id` int(11) NOT NULL,
  `tag_en` varchar(50) NOT NULL,
  `tag_ar` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `tour_location_tags`
--

INSERT INTO `tour_location_tags` (`id`, `tour_location_id`, `tag_en`, `tag_ar`) VALUES
(4, 2, 'History', '??????????'),
(5, 2, 'Ruins', '??????????'),
(6, 2, 'Interactive', '????????????'),
(12, 3, 'Culture', '??????????'),
(13, 3, 'Labyrinth', '??????????'),
(16, 4, 'solar', 'شمسي');

-- --------------------------------------------------------

--
-- Structure de la table `travel_agencies`
--

CREATE TABLE `travel_agencies` (
  `id` int(11) NOT NULL,
  `name_en` varchar(200) NOT NULL,
  `name_ar` varchar(200) DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `web_link` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `travel_agency_tags`
--

CREATE TABLE `travel_agency_tags` (
  `id` int(11) NOT NULL,
  `travel_agency_id` int(11) NOT NULL,
  `tag_en` varchar(100) DEFAULT NULL,
  `tag_ar` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `unesco_sites`
--

CREATE TABLE `unesco_sites` (
  `id` int(11) NOT NULL,
  `name_en` varchar(100) NOT NULL,
  `name_ar` varchar(100) NOT NULL,
  `year_inscribed` varchar(30) NOT NULL,
  `year_inscribed_ar` varchar(30) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `description_en` text DEFAULT NULL,
  `description_ar` text DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `unesco_sites`
--

INSERT INTO `unesco_sites` (`id`, `name_en`, `name_ar`, `year_inscribed`, `year_inscribed_ar`, `image_url`, `description_en`, `description_ar`, `sort_order`, `is_active`) VALUES
(1, 'Tipasa', '????????????', 'Inscribed 1982', '?????????? 1982', 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&fit=crop', NULL, NULL, 1, 1),
(2, 'Dj??mila', '??????????', 'Inscribed 1982', '?????????? 1982', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&fit=crop', NULL, NULL, 2, 1),
(3, 'Timgad', '????????????', 'Inscribed 1982', '?????????? 1982', 'https://images.unsplash.com/photo-1549145177-238518f1ec1a?w=800&fit=crop', NULL, NULL, 3, 1),
(4, 'M\'Zab Valley', '???????? ??????????', 'Inscribed 1982', '?????????? 1982', 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&fit=crop', NULL, NULL, 4, 1),
(5, 'Tassili n\'Ajjer', '???????????? ????????', 'Inscribed 1982', '?????????? 1982', 'https://images.unsplash.com/photo-1575664274476-e02d99195164?w=800&fit=crop', NULL, NULL, 5, 1),
(6, 'Casbah of Algiers', '???????? ??????????????', 'Inscribed 1992', '?????????? 1992', 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&fit=crop', NULL, NULL, 6, 1),
(7, 'B??ni Hammad Fort', '???????? ?????? ????????', 'Inscribed 1980', '?????????? 1980', 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&fit=crop', NULL, NULL, 7, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `calendar_items`
--
ALTER TABLE `calendar_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `month_id` (`month_id`);

--
-- Index pour la table `calendar_months`
--
ALTER TABLE `calendar_months`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `destination_gallery`
--
ALTER TABLE `destination_gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Index pour la table `destination_tags`
--
ALTER TABLE `destination_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Index pour la table `digital_library`
--
ALTER TABLE `digital_library`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Index pour la table `discover_cards`
--
ALTER TABLE `discover_cards`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `discover_categories`
--
ALTER TABLE `discover_categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `discover_items`
--
ALTER TABLE `discover_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Index pour la table `discover_page_settings`
--
ALTER TABLE `discover_page_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`);

--
-- Index pour la table `discover_places`
--
ALTER TABLE `discover_places`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_id` (`section_id`);

--
-- Index pour la table `discover_place_categories`
--
ALTER TABLE `discover_place_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `place_id` (`place_id`);

--
-- Index pour la table `discover_place_gallery`
--
ALTER TABLE `discover_place_gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `place_id` (`place_id`);

--
-- Index pour la table `discover_sections`
--
ALTER TABLE `discover_sections`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `event_categories`
--
ALTER TABLE `event_categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `event_category_map`
--
ALTER TABLE `event_category_map`
  ADD PRIMARY KEY (`event_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Index pour la table `event_gallery`
--
ALTER TABLE `event_gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Index pour la table `event_tags`
--
ALTER TABLE `event_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Index pour la table `hero_slides`
--
ALTER TABLE `hero_slides`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `hotel_tags`
--
ALTER TABLE `hotel_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Index pour la table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Index pour la table `library_categories`
--
ALTER TABLE `library_categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `panoramas`
--
ALTER TABLE `panoramas`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`);

--
-- Index pour la table `suggestions`
--
ALTER TABLE `suggestions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tour_guide_hero`
--
ALTER TABLE `tour_guide_hero`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tour_locations`
--
ALTER TABLE `tour_locations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tour_location_tags`
--
ALTER TABLE `tour_location_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tour_location_id` (`tour_location_id`);

--
-- Index pour la table `travel_agencies`
--
ALTER TABLE `travel_agencies`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `travel_agency_tags`
--
ALTER TABLE `travel_agency_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `travel_agency_id` (`travel_agency_id`);

--
-- Index pour la table `unesco_sites`
--
ALTER TABLE `unesco_sites`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `calendar_items`
--
ALTER TABLE `calendar_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `calendar_months`
--
ALTER TABLE `calendar_months`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT pour la table `destination_gallery`
--
ALTER TABLE `destination_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT pour la table `destination_tags`
--
ALTER TABLE `destination_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT pour la table `digital_library`
--
ALTER TABLE `digital_library`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `discover_cards`
--
ALTER TABLE `discover_cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `discover_categories`
--
ALTER TABLE `discover_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `discover_items`
--
ALTER TABLE `discover_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `discover_page_settings`
--
ALTER TABLE `discover_page_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `discover_places`
--
ALTER TABLE `discover_places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `discover_place_categories`
--
ALTER TABLE `discover_place_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `discover_place_gallery`
--
ALTER TABLE `discover_place_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `discover_sections`
--
ALTER TABLE `discover_sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `event_categories`
--
ALTER TABLE `event_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `event_gallery`
--
ALTER TABLE `event_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `event_tags`
--
ALTER TABLE `event_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `hero_slides`
--
ALTER TABLE `hero_slides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `hotel_tags`
--
ALTER TABLE `hotel_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `library_categories`
--
ALTER TABLE `library_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `panoramas`
--
ALTER TABLE `panoramas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `suggestions`
--
ALTER TABLE `suggestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `tour_locations`
--
ALTER TABLE `tour_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `tour_location_tags`
--
ALTER TABLE `tour_location_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `travel_agencies`
--
ALTER TABLE `travel_agencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `travel_agency_tags`
--
ALTER TABLE `travel_agency_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `unesco_sites`
--
ALTER TABLE `unesco_sites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `calendar_items`
--
ALTER TABLE `calendar_items`
  ADD CONSTRAINT `calendar_items_ibfk_1` FOREIGN KEY (`month_id`) REFERENCES `calendar_months` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `destination_gallery`
--
ALTER TABLE `destination_gallery`
  ADD CONSTRAINT `destination_gallery_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `destination_tags`
--
ALTER TABLE `destination_tags`
  ADD CONSTRAINT `destination_tags_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `digital_library`
--
ALTER TABLE `digital_library`
  ADD CONSTRAINT `digital_library_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `library_categories` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `discover_items`
--
ALTER TABLE `discover_items`
  ADD CONSTRAINT `discover_items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `discover_categories` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `discover_places`
--
ALTER TABLE `discover_places`
  ADD CONSTRAINT `discover_places_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `discover_sections` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `discover_place_categories`
--
ALTER TABLE `discover_place_categories`
  ADD CONSTRAINT `discover_place_categories_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `discover_places` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `discover_place_gallery`
--
ALTER TABLE `discover_place_gallery`
  ADD CONSTRAINT `discover_place_gallery_ibfk_1` FOREIGN KEY (`place_id`) REFERENCES `discover_places` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `event_category_map`
--
ALTER TABLE `event_category_map`
  ADD CONSTRAINT `event_category_map_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `event_category_map_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `event_categories` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `event_gallery`
--
ALTER TABLE `event_gallery`
  ADD CONSTRAINT `event_gallery_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `event_tags`
--
ALTER TABLE `event_tags`
  ADD CONSTRAINT `event_tags_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `hotel_tags`
--
ALTER TABLE `hotel_tags`
  ADD CONSTRAINT `hotel_tags_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `tour_location_tags`
--
ALTER TABLE `tour_location_tags`
  ADD CONSTRAINT `tour_location_tags_ibfk_1` FOREIGN KEY (`tour_location_id`) REFERENCES `tour_locations` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `travel_agency_tags`
--
ALTER TABLE `travel_agency_tags`
  ADD CONSTRAINT `travel_agency_tags_ibfk_1` FOREIGN KEY (`travel_agency_id`) REFERENCES `travel_agencies` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
