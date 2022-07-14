DO $pdd_data$
BEGIN
--
-- PostgreSQL database dump
--
-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
PERFORM pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
--
-- Data for Name: business_areas; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (1, 'General', 'general');
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (2, 'Enterprise', 'enterprise');
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (3, 'Fintech', 'fintech');
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (4, 'Mobility', 'mobility');
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (5, 'Insurtech', 'insurtech');
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (6, 'Big Data', 'big data');
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (7, 'Healthcare', 'healthcare');
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (8, 'Manufacturing', 'manufacturing');
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (9, 'Hardware', 'hardware');
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (10, 'Proptech', 'proptech');
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (11, 'AI', 'ai');
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (12, 'Edtech', 'edtech');
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (13, 'Consumer', 'consumer');
--
-- Data for Name: business_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (1, 'Product Owner', 'product owner');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (2, 'Project Manager', 'project manager');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (3, 'UX Designer', 'ux designer');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (4, 'UI Designer', 'ui designer');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (5, 'Business Analyst', 'business analyst');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (6, 'Software Developer', 'software developer');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (7, 'Software Architect', 'software architect');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (8, 'Devops', 'devops');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (9, 'Devops Engineer', 'devops engineer');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (10, 'Devops Lead', 'devops lead');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (11, 'Tester', 'tester');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (12, 'QA Lead', 'qa lead');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (13, 'QA Engineer', 'qa engineer');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (14, 'Tech lead', 'tech lead');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (15, 'Scrum master', 'scrum master');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (16, 'Software Development Manager', 'software development manager');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (17, 'Database Administrator', 'database administrator');
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (18, 'Database Developer', 'database developer');
--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO public.countries VALUES (474, 'MQ', 'MTQ', 'Martinique', 'martinique', NULL);
INSERT INTO public.countries VALUES (478, 'MR', 'MRT', 'Mauritania', 'mauritania', NULL);
INSERT INTO public.countries VALUES (480, 'MU', 'MUS', 'Mauritius', 'mauritius', NULL);
INSERT INTO public.countries VALUES (175, 'YT', 'MYT', 'Mayotte', 'mayotte', NULL);
INSERT INTO public.countries VALUES (484, 'MX', 'MEX', 'Mexico', 'mexico', 'es-MX');
INSERT INTO public.countries VALUES (583, 'FM', 'FSM', 'Micronesia, Federated States of', 'micronesia, federated states of', NULL);
INSERT INTO public.countries VALUES (498, 'MD', 'MDA', 'Moldova, Republic of', 'moldova, republic of', NULL);
INSERT INTO public.countries VALUES (492, 'MC', 'MCO', 'Monaco', 'monaco', 'fr-MC');
INSERT INTO public.countries VALUES (496, 'MN', 'MNG', 'Mongolia', 'mongolia', 'mn');
INSERT INTO public.countries VALUES (500, 'MS', 'MSR', 'Montserrat', 'montserrat', NULL);
INSERT INTO public.countries VALUES (504, 'MA', 'MAR', 'Morocco', 'morocco', 'ar-MA');
INSERT INTO public.countries VALUES (508, 'MZ', 'MOZ', 'Mozambique', 'mozambique', NULL);
INSERT INTO public.countries VALUES (104, 'MM', 'MMR', 'Myanmar', 'myanmar', NULL);
INSERT INTO public.countries VALUES (516, 'NA', 'NAM', 'Namibia', 'namibia', NULL);
INSERT INTO public.countries VALUES (520, 'NR', 'NRU', 'Nauru', 'nauru', NULL);
INSERT INTO public.countries VALUES (524, 'NP', 'NPL', 'Nepal', 'nepal', NULL);
INSERT INTO public.countries VALUES (528, 'NL', 'NLD', 'Netherlands', 'netherlands', 'nl-NL');
INSERT INTO public.countries VALUES (530, 'AN', 'ANT', 'Netherlands Antilles', 'netherlands antilles', NULL);
INSERT INTO public.countries VALUES (540, 'NC', 'NCL', 'New Caledonia', 'new caledonia', NULL);
INSERT INTO public.countries VALUES (554, 'NZ', 'NZL', 'New Zealand', 'new zealand', 'en-NZ');
INSERT INTO public.countries VALUES (558, 'NI', 'NIC', 'Nicaragua', 'nicaragua', 'es-NI');
INSERT INTO public.countries VALUES (562, 'NE', 'NER', 'Niger', 'niger', NULL);
INSERT INTO public.countries VALUES (566, 'NG', 'NGA', 'Nigeria', 'nigeria', NULL);
INSERT INTO public.countries VALUES (570, 'NU', 'NIU', 'Niue', 'niue', NULL);
INSERT INTO public.countries VALUES (574, 'NF', 'NFK', 'Norfolk Island', 'norfolk island', NULL);
INSERT INTO public.countries VALUES (580, 'MP', 'MNP', 'Northern Mariana Islands', 'northern mariana islands', NULL);
INSERT INTO public.countries VALUES (578, 'NO', 'NOR', 'Norway', 'norway', 'nb-NO');
INSERT INTO public.countries VALUES (512, 'OM', 'OMN', 'Oman', 'oman', 'ar-OM');
INSERT INTO public.countries VALUES (586, 'PK', 'PAK', 'Pakistan', 'pakistan', 'ur-PK');
INSERT INTO public.countries VALUES (585, 'PW', 'PLW', 'Palau', 'palau', NULL);
INSERT INTO public.countries VALUES (591, 'PA', 'PAN', 'Panama', 'panama', 'es-PA');
INSERT INTO public.countries VALUES (598, 'PG', 'PNG', 'Papua New Guinea', 'papua new guinea', NULL);
INSERT INTO public.countries VALUES (600, 'PY', 'PRY', 'Paraguay', 'paraguay', 'es-PY');
INSERT INTO public.countries VALUES (604, 'PE', 'PER', 'Peru', 'peru', 'es-PE');
INSERT INTO public.countries VALUES (608, 'PH', 'PHL', 'Philippines', 'philippines', 'en-PH');
INSERT INTO public.countries VALUES (612, 'PN', 'PCN', 'Pitcairn', 'pitcairn', NULL);
INSERT INTO public.countries VALUES (616, 'PL', 'POL', 'Poland', 'poland', 'pl-PL');
INSERT INTO public.countries VALUES (620, 'PT', 'PRT', 'Portugal', 'portugal', 'pt-PT');
INSERT INTO public.countries VALUES (630, 'PR', 'PRI', 'Puerto Rico', 'puerto rico', 'es-PR');
INSERT INTO public.countries VALUES (634, 'QA', 'QAT', 'Qatar', 'qatar', 'ar-QA');
INSERT INTO public.countries VALUES (638, 'RE', 'REU', 'Reunion', 'reunion', NULL);
INSERT INTO public.countries VALUES (642, 'RO', 'ROU', 'Romania', 'romania', 'ro');
INSERT INTO public.countries VALUES (643, 'RU', 'RUS', 'Russian Federation', 'russian federation', NULL);
INSERT INTO public.countries VALUES (646, 'RW', 'RWA', 'Rwanda', 'rwanda', NULL);
INSERT INTO public.countries VALUES (654, 'SH', 'SHN', 'Saint Helena', 'saint helena', NULL);
INSERT INTO public.countries VALUES (659, 'KN', 'KNA', 'Saint Kitts and Nevis', 'saint kitts and nevis', NULL);
INSERT INTO public.countries VALUES (662, 'LC', 'LCA', 'Saint Lucia', 'saint lucia', NULL);
INSERT INTO public.countries VALUES (666, 'PM', 'SPM', 'Saint Pierre and Miquelon', 'saint pierre and miquelon', NULL);
INSERT INTO public.countries VALUES (670, 'VC', 'VCT', 'Saint Vincent and the Grenadines', 'saint vincent and the grenadines', NULL);
INSERT INTO public.countries VALUES (882, 'WS', 'WSM', 'Samoa', 'samoa', NULL);
INSERT INTO public.countries VALUES (674, 'SM', 'SMR', 'San Marino', 'san marino', NULL);
INSERT INTO public.countries VALUES (678, 'ST', 'STP', 'Sao Tome and Principe', 'sao tome and principe', NULL);
INSERT INTO public.countries VALUES (682, 'SA', 'SAU', 'Saudi Arabia', 'saudi arabia', 'ar-SA');
INSERT INTO public.countries VALUES (686, 'SN', 'SEN', 'Senegal', 'senegal', NULL);
INSERT INTO public.countries VALUES (688, 'RS', 'SRB', 'Serbia', 'serbia', 'Cy-sr');
INSERT INTO public.countries VALUES (690, 'SC', 'SYC', 'Seychelles', 'seychelles', NULL);
INSERT INTO public.countries VALUES (694, 'SL', 'SLE', 'Sierra Leone', 'sierra leone', NULL);
INSERT INTO public.countries VALUES (702, 'SG', 'SGP', 'Singapore', 'singapore', 'zh-SG');
INSERT INTO public.countries VALUES (703, 'SK', 'SVK', 'Slovakia', 'slovakia', 'sk-SK');
INSERT INTO public.countries VALUES (705, 'SI', 'SVN', 'Slovenia', 'slovenia', 'sl');
INSERT INTO public.countries VALUES (90, 'SB', 'SLB', 'Solomon Islands', 'solomon islands', NULL);
INSERT INTO public.countries VALUES (706, 'SO', 'SOM', 'Somalia', 'somalia', NULL);
INSERT INTO public.countries VALUES (710, 'ZA', 'ZAF', 'South Africa', 'south africa', 'af-ZA');
INSERT INTO public.countries VALUES (239, 'GS', 'SGS', 'South Georgia and the South Sandwich Islands', 'south georgia and the south sandwich islands', NULL);
INSERT INTO public.countries VALUES (724, 'ES', 'ESP', 'Spain', 'spain', 'es-ES');
INSERT INTO public.countries VALUES (144, 'LK', 'LKA', 'Sri Lanka', 'sri lanka', NULL);
INSERT INTO public.countries VALUES (736, 'SD', 'SDN', 'Sudan', 'sudan', NULL);
INSERT INTO public.countries VALUES (740, 'SR', 'SUR', 'Suriname', 'suriname', NULL);
INSERT INTO public.countries VALUES (744, 'SJ', 'SJM', 'Svalbard and Jan Mayen', 'svalbard and jan mayen', NULL);
INSERT INTO public.countries VALUES (748, 'SZ', 'SWZ', 'Swaziland', 'swaziland', NULL);
INSERT INTO public.countries VALUES (752, 'SE', 'SWE', 'Sweden', 'sweden', 'sv-SE');
INSERT INTO public.countries VALUES (756, 'CH', 'CHE', 'Switzerland', 'switzerland', 'de-CH');
INSERT INTO public.countries VALUES (760, 'SY', 'SYR', 'Syrian Arab Republic', 'syrian arab republic', NULL);
INSERT INTO public.countries VALUES (158, 'TW', 'TWN', 'Taiwan, Province of China', 'taiwan, province of china', NULL);
INSERT INTO public.countries VALUES (762, 'TJ', 'TJK', 'Tajikistan', 'tajikistan', NULL);
INSERT INTO public.countries VALUES (834, 'TZ', 'TZA', 'Tanzania, United Republic of', 'tanzania, united republic of', NULL);
INSERT INTO public.countries VALUES (764, 'TH', 'THA', 'Thailand', 'thailand', 'th-TH');
INSERT INTO public.countries VALUES (626, 'TL', 'TLS', 'Timor-Leste', 'timor-leste', NULL);
INSERT INTO public.countries VALUES (768, 'TG', 'TGO', 'Togo', 'togo', NULL);
INSERT INTO public.countries VALUES (772, 'TK', 'TKL', 'Tokelau', 'tokelau', NULL);
INSERT INTO public.countries VALUES (776, 'TO', 'TON', 'Tonga', 'tonga', NULL);
INSERT INTO public.countries VALUES (50, 'BD', 'BGD', 'Bangladesh', 'bangladesh', NULL);
INSERT INTO public.countries VALUES (52, 'BB', 'BRB', 'Barbados', 'barbados', NULL);
INSERT INTO public.countries VALUES (112, 'BY', 'BLR', 'Belarus', 'belarus', 'be');
INSERT INTO public.countries VALUES (56, 'BE', 'BEL', 'Belgium', 'belgium', 'fr-BE');
INSERT INTO public.countries VALUES (84, 'BZ', 'BLZ', 'Belize', 'belize', 'en-BZ');
INSERT INTO public.countries VALUES (204, 'BJ', 'BEN', 'Benin', 'benin', NULL);
INSERT INTO public.countries VALUES (60, 'BM', 'BMU', 'Bermuda', 'bermuda', NULL);
INSERT INTO public.countries VALUES (64, 'BT', 'BTN', 'Bhutan', 'bhutan', NULL);
INSERT INTO public.countries VALUES (68, 'BO', 'BOL', 'Bolivia', 'bolivia', 'es-BO');
INSERT INTO public.countries VALUES (70, 'BA', 'BIH', 'Bosnia and Herzegovina', 'bosnia and herzegovina', NULL);
INSERT INTO public.countries VALUES (72, 'BW', 'BWA', 'Botswana', 'botswana', NULL);
INSERT INTO public.countries VALUES (74, 'BV', 'BVT', 'Bouvet Island', 'bouvet island', NULL);
INSERT INTO public.countries VALUES (76, 'BR', 'BRA', 'Brazil', 'brazil', 'pt-BR');
INSERT INTO public.countries VALUES (86, 'IO', 'IOT', 'British Indian Ocean Territory', 'british indian ocean territory', NULL);
INSERT INTO public.countries VALUES (96, 'BN', 'BRN', 'Brunei Darussalam', 'brunei darussalam', NULL);
INSERT INTO public.countries VALUES (100, 'BG', 'BGR', 'Bulgaria', 'bulgaria', 'bg');
INSERT INTO public.countries VALUES (854, 'BF', 'BFA', 'Burkina Faso', 'burkina faso', NULL);
INSERT INTO public.countries VALUES (108, 'BI', 'BDI', 'Burundi', 'burundi', NULL);
INSERT INTO public.countries VALUES (116, 'KH', 'KHM', 'Cambodia', 'cambodia', NULL);
INSERT INTO public.countries VALUES (120, 'CM', 'CMR', 'Cameroon', 'cameroon', NULL);
INSERT INTO public.countries VALUES (132, 'CV', 'CPV', 'Cape Verde', 'cape verde', NULL);
INSERT INTO public.countries VALUES (136, 'KY', 'CYM', 'Cayman Islands', 'cayman islands', NULL);
INSERT INTO public.countries VALUES (140, 'CF', 'CAF', 'Central African Republic', 'central african republic', NULL);
INSERT INTO public.countries VALUES (148, 'TD', 'TCD', 'Chad', 'chad', NULL);
INSERT INTO public.countries VALUES (152, 'CL', 'CHL', 'Chile', 'chile', 'es-CL');
INSERT INTO public.countries VALUES (156, 'CN', 'CHN', 'China', 'china', 'zh-CN');
INSERT INTO public.countries VALUES (162, 'CX', 'CXR', 'Christmas Island', 'christmas island', NULL);
INSERT INTO public.countries VALUES (170, 'CO', 'COL', 'Colombia', 'colombia', 'es-CO');
INSERT INTO public.countries VALUES (174, 'KM', 'COM', 'Comoros', 'comoros', NULL);
INSERT INTO public.countries VALUES (178, 'CG', 'COG', 'Congo', 'congo', NULL);
INSERT INTO public.countries VALUES (180, 'CD', 'COD', 'Congo, the Democratic Republic of the', 'congo, the democratic republic of the', NULL);
INSERT INTO public.countries VALUES (184, 'CK', 'COK', 'Cook Islands', 'cook islands', NULL);
INSERT INTO public.countries VALUES (188, 'CR', 'CRI', 'Costa Rica', 'costa rica', 'es-CR');
INSERT INTO public.countries VALUES (384, 'CI', 'CIV', 'Cote D''Ivoire', 'cote d''ivoire', NULL);
INSERT INTO public.countries VALUES (191, 'HR', 'HRV', 'Croatia', 'croatia', 'hr');
INSERT INTO public.countries VALUES (192, 'CU', 'CUB', 'Cuba', 'cuba', NULL);
INSERT INTO public.countries VALUES (196, 'CY', 'CYP', 'Cyprus', 'cyprus', NULL);
INSERT INTO public.countries VALUES (203, 'CZ', 'CZE', 'Czech Republic', 'czech republic', 'cs-CZ');
INSERT INTO public.countries VALUES (208, 'DK', 'DNK', 'Denmark', 'denmark', 'da-DK');
INSERT INTO public.countries VALUES (262, 'DJ', 'DJI', 'Djibouti', 'djibouti', NULL);
INSERT INTO public.countries VALUES (212, 'DM', 'DMA', 'Dominica', 'dominica', 'es-DO');
INSERT INTO public.countries VALUES (214, 'DO', 'DOM', 'Dominican Republic', 'dominican republic', 'es-DO');
INSERT INTO public.countries VALUES (218, 'EC', 'ECU', 'Ecuador', 'ecuador', 'es-EC');
INSERT INTO public.countries VALUES (818, 'EG', 'EGY', 'Egypt', 'egypt', 'ar-EG');
INSERT INTO public.countries VALUES (222, 'SV', 'SLV', 'El Salvador', 'el salvador', 'es-SV');
INSERT INTO public.countries VALUES (226, 'GQ', 'GNQ', 'Equatorial Guinea', 'equatorial guinea', NULL);
INSERT INTO public.countries VALUES (232, 'ER', 'ERI', 'Eritrea', 'eritrea', NULL);
INSERT INTO public.countries VALUES (233, 'EE', 'EST', 'Estonia', 'estonia', 'et');
INSERT INTO public.countries VALUES (231, 'ET', 'ETH', 'Ethiopia', 'ethiopia', NULL);
INSERT INTO public.countries VALUES (238, 'FK', 'FLK', 'Falkland Islands (Malvinas)', 'falkland islands (malvinas)', NULL);
INSERT INTO public.countries VALUES (234, 'FO', 'FRO', 'Faroe Islands', 'faroe islands', 'fo-FO');
INSERT INTO public.countries VALUES (242, 'FJ', 'FJI', 'Fiji', 'fiji', NULL);
INSERT INTO public.countries VALUES (246, 'FI', 'FIN', 'Finland', 'finland', 'fi-FI');
INSERT INTO public.countries VALUES (250, 'FR', 'FRA', 'France', 'france', 'fr-FR');
INSERT INTO public.countries VALUES (254, 'GF', 'GUF', 'French Guiana', 'french guiana', NULL);
INSERT INTO public.countries VALUES (258, 'PF', 'PYF', 'French Polynesia', 'french polynesia', NULL);
INSERT INTO public.countries VALUES (260, 'TF', 'ATF', 'French Southern Territories', 'french southern territories', NULL);
INSERT INTO public.countries VALUES (266, 'GA', 'GAB', 'Gabon', 'gabon', NULL);
INSERT INTO public.countries VALUES (270, 'GM', 'GMB', 'Gambia', 'gambia', NULL);
INSERT INTO public.countries VALUES (268, 'GE', 'GEO', 'Georgia', 'georgia', 'ka');
INSERT INTO public.countries VALUES (276, 'DE', 'DEU', 'Germany', 'germany', 'de-DE');
INSERT INTO public.countries VALUES (288, 'GH', 'GHA', 'Ghana', 'ghana', NULL);
INSERT INTO public.countries VALUES (292, 'GI', 'GIB', 'Gibraltar', 'gibraltar', NULL);
INSERT INTO public.countries VALUES (300, 'GR', 'GRC', 'Greece', 'greece', 'el-GR');
INSERT INTO public.countries VALUES (304, 'GL', 'GRL', 'Greenland', 'greenland', NULL);
INSERT INTO public.countries VALUES (308, 'GD', 'GRD', 'Grenada', 'grenada', NULL);
INSERT INTO public.countries VALUES (312, 'GP', 'GLP', 'Guadeloupe', 'guadeloupe', NULL);
INSERT INTO public.countries VALUES (316, 'GU', 'GUM', 'Guam', 'guam', NULL);
INSERT INTO public.countries VALUES (320, 'GT', 'GTM', 'Guatemala', 'guatemala', 'es-GT');
INSERT INTO public.countries VALUES (324, 'GN', 'GIN', 'Guinea', 'guinea', NULL);
INSERT INTO public.countries VALUES (624, 'GW', 'GNB', 'Guinea-Bissau', 'guinea-bissau', NULL);
INSERT INTO public.countries VALUES (328, 'GY', 'GUY', 'Guyana', 'guyana', NULL);
INSERT INTO public.countries VALUES (332, 'HT', 'HTI', 'Haiti', 'haiti', NULL);
INSERT INTO public.countries VALUES (334, 'HM', 'HMD', 'Heard Island and Mcdonald Islands', 'heard island and mcdonald islands', NULL);
INSERT INTO public.countries VALUES (336, 'VA', 'VAT', 'Holy See (Vatican City State)', 'holy see (vatican city state)', NULL);
INSERT INTO public.countries VALUES (340, 'HN', 'HND', 'Honduras', 'honduras', 'es-HN');
INSERT INTO public.countries VALUES (344, 'HK', 'HKG', 'Hong Kong', 'hong kong', 'zh-HK');
INSERT INTO public.countries VALUES (348, 'HU', 'HUN', 'Hungary', 'hungary', 'hu-HU');
INSERT INTO public.countries VALUES (352, 'IS', 'ISL', 'Iceland', 'iceland', 'is');
INSERT INTO public.countries VALUES (356, 'IN', 'IND', 'India', 'india', 'gu-IN');
INSERT INTO public.countries VALUES (360, 'ID', 'IDN', 'Indonesia', 'indonesia', 'id');
INSERT INTO public.countries VALUES (364, 'IR', 'IRN', 'Iran, Islamic Republic of', 'iran, islamic republic of', NULL);
INSERT INTO public.countries VALUES (368, 'IQ', 'IRQ', 'Iraq', 'iraq', 'ar-IQ');
INSERT INTO public.countries VALUES (372, 'IE', 'IRL', 'Ireland', 'ireland', 'en-IE');
INSERT INTO public.countries VALUES (376, 'IL', 'ISR', 'Israel', 'israel', 'he-IL');
INSERT INTO public.countries VALUES (380, 'IT', 'ITA', 'Italy', 'italy', 'it-IT');
INSERT INTO public.countries VALUES (388, 'JM', 'JAM', 'Jamaica', 'jamaica', 'en-JM');
INSERT INTO public.countries VALUES (392, 'JP', 'JPN', 'Japan', 'japan', 'ja');
INSERT INTO public.countries VALUES (400, 'JO', 'JOR', 'Jordan', 'jordan', 'ar-JO');
INSERT INTO public.countries VALUES (398, 'KZ', 'KAZ', 'Kazakhstan', 'kazakhstan', 'kk-KZ');
INSERT INTO public.countries VALUES (404, 'KE', 'KEN', 'Kenya', 'kenya', 'sw-KE');
INSERT INTO public.countries VALUES (296, 'KI', 'KIR', 'Kiribati', 'kiribati', NULL);
INSERT INTO public.countries VALUES (408, 'KP', 'PRK', 'Korea, Democratic People''s Republic of', 'korea, democratic people''s republic of', NULL);
INSERT INTO public.countries VALUES (410, 'KR', 'KOR', 'Korea, Republic of', 'korea, republic of', NULL);
INSERT INTO public.countries VALUES (414, 'KW', 'KWT', 'Kuwait', 'kuwait', 'ar-KW');
INSERT INTO public.countries VALUES (417, 'KG', 'KGZ', 'Kyrgyzstan', 'kyrgyzstan', NULL);
INSERT INTO public.countries VALUES (418, 'LA', 'LAO', 'Lao People''s Democratic Republic', 'lao people''s democratic republic', NULL);
INSERT INTO public.countries VALUES (428, 'LV', 'LVA', 'Latvia', 'latvia', 'lv');
INSERT INTO public.countries VALUES (422, 'LB', 'LBN', 'Lebanon', 'lebanon', 'ar-LB');
INSERT INTO public.countries VALUES (426, 'LS', 'LSO', 'Lesotho', 'lesotho', NULL);
INSERT INTO public.countries VALUES (430, 'LR', 'LBR', 'Liberia', 'liberia', NULL);
INSERT INTO public.countries VALUES (434, 'LY', 'LBY', 'Libyan Arab Jamahiriya', 'libyan arab jamahiriya', NULL);
INSERT INTO public.countries VALUES (438, 'LI', 'LIE', 'Liechtenstein', 'liechtenstein', 'de-LI');
INSERT INTO public.countries VALUES (440, 'LT', 'LTU', 'Lithuania', 'lithuania', 'lt');
INSERT INTO public.countries VALUES (442, 'LU', 'LUX', 'Luxembourg', 'luxembourg', 'de-LU');
INSERT INTO public.countries VALUES (446, 'MO', 'MAC', 'Macao', 'macao', NULL);
INSERT INTO public.countries VALUES (807, 'MK', 'MKD', 'North Macedonia', 'north macedonia', NULL);
INSERT INTO public.countries VALUES (450, 'MG', 'MDG', 'Madagascar', 'madagascar', NULL);
INSERT INTO public.countries VALUES (454, 'MW', 'MWI', 'Malawi', 'malawi', NULL);
INSERT INTO public.countries VALUES (458, 'MY', 'MYS', 'Malaysia', 'malaysia', 'ms-MY');
INSERT INTO public.countries VALUES (462, 'MV', 'MDV', 'Maldives', 'maldives', 'div-MV');
INSERT INTO public.countries VALUES (466, 'ML', 'MLI', 'Mali', 'mali', NULL);
INSERT INTO public.countries VALUES (470, 'MT', 'MLT', 'Malta', 'malta', NULL);
INSERT INTO public.countries VALUES (584, 'MH', 'MHL', 'Marshall Islands', 'marshall islands', NULL);
INSERT INTO public.countries VALUES (840, 'US', 'USA', 'United States', 'united states', 'en-US');
INSERT INTO public.countries VALUES (124, 'CA', 'CAN', 'Canada', 'canada', 'en-CA');
INSERT INTO public.countries VALUES (4, 'AF', 'AFG', 'Afghanistan', 'afghanistan', NULL);
INSERT INTO public.countries VALUES (8, 'AL', 'ALB', 'Albania', 'albania', 'sq');
INSERT INTO public.countries VALUES (12, 'DZ', 'DZA', 'Algeria', 'algeria', 'ar-DZ');
INSERT INTO public.countries VALUES (16, 'AS', 'ASM', 'American Samoa', 'american samoa', NULL);
INSERT INTO public.countries VALUES (20, 'AD', 'AND', 'Andorra', 'andorra', NULL);
INSERT INTO public.countries VALUES (24, 'AO', 'AGO', 'Angola', 'angola', NULL);
INSERT INTO public.countries VALUES (660, 'AI', 'AIA', 'Anguilla', 'anguilla', NULL);
INSERT INTO public.countries VALUES (10, 'AQ', 'ATA', 'Antarctica', 'antarctica', NULL);
INSERT INTO public.countries VALUES (28, 'AG', 'ATG', 'Antigua and Barbuda', 'antigua and barbuda', NULL);
INSERT INTO public.countries VALUES (32, 'AR', 'ARG', 'Argentina', 'argentina', 'es-AR');
INSERT INTO public.countries VALUES (51, 'AM', 'ARM', 'Armenia', 'armenia', 'hy');
INSERT INTO public.countries VALUES (533, 'AW', 'ABW', 'Aruba', 'aruba', NULL);
INSERT INTO public.countries VALUES (36, 'AU', 'AUS', 'Australia', 'australia', 'en-AU');
INSERT INTO public.countries VALUES (40, 'AT', 'AUT', 'Austria', 'austria', 'de-AT');
INSERT INTO public.countries VALUES (31, 'AZ', 'AZE', 'Azerbaijan', 'azerbaijan', 'Cy-az-AZ');
INSERT INTO public.countries VALUES (44, 'BS', 'BHS', 'Bahamas', 'bahamas', NULL);
INSERT INTO public.countries VALUES (48, 'BH', 'BHR', 'Bahrain', 'bahrain', 'ar-BH');
INSERT INTO public.countries VALUES (780, 'TT', 'TTO', 'Trinidad and Tobago', 'trinidad and tobago', 'en-TT');
INSERT INTO public.countries VALUES (788, 'TN', 'TUN', 'Tunisia', 'tunisia', 'ar-TN');
INSERT INTO public.countries VALUES (792, 'TR', 'TUR', 'Turkey', 'turkey', 'tr-TR');
INSERT INTO public.countries VALUES (795, 'TM', 'TKM', 'Turkmenistan', 'turkmenistan', NULL);
INSERT INTO public.countries VALUES (796, 'TC', 'TCA', 'Turks and Caicos Islands', 'turks and caicos islands', NULL);
INSERT INTO public.countries VALUES (798, 'TV', 'TUV', 'Tuvalu', 'tuvalu', NULL);
INSERT INTO public.countries VALUES (800, 'UG', 'UGA', 'Uganda', 'uganda', NULL);
INSERT INTO public.countries VALUES (804, 'UA', 'UKR', 'Ukraine', 'ukraine', 'uk-UA');
INSERT INTO public.countries VALUES (784, 'AE', 'ARE', 'United Arab Emirates', 'united arab emirates', 'ar-AE');
INSERT INTO public.countries VALUES (826, 'GB', 'GBR', 'United Kingdom', 'united kingdom', 'en-GB');
INSERT INTO public.countries VALUES (581, 'UM', 'UMI', 'United States Minor Outlying Islands', 'united states minor outlying islands', NULL);
INSERT INTO public.countries VALUES (858, 'UY', 'URY', 'Uruguay', 'uruguay', 'es-UY');
INSERT INTO public.countries VALUES (860, 'UZ', 'UZB', 'Uzbekistan', 'uzbekistan', 'Cy-uz-UZ');
INSERT INTO public.countries VALUES (548, 'VU', 'VUT', 'Vanuatu', 'vanuatu', NULL);
INSERT INTO public.countries VALUES (862, 'VE', 'VEN', 'Venezuela', 'venezuela', 'es-VE');
INSERT INTO public.countries VALUES (704, 'VN', 'VNM', 'Viet Nam', 'viet nam', NULL);
INSERT INTO public.countries VALUES (92, 'VG', 'VGB', 'Virgin Islands, British', 'virgin islands, british', NULL);
INSERT INTO public.countries VALUES (850, 'VI', 'VIR', 'Virgin Islands, U.s.', 'virgin islands, u.s.', NULL);
INSERT INTO public.countries VALUES (876, 'WF', 'WLF', 'Wallis and Futuna', 'wallis and futuna', NULL);
INSERT INTO public.countries VALUES (732, 'EH', 'ESH', 'Western Sahara', 'western sahara', NULL);
INSERT INTO public.countries VALUES (887, 'YE', 'YEM', 'Yemen', 'yemen', 'ar-YE');
INSERT INTO public.countries VALUES (894, 'ZM', 'ZMB', 'Zambia', 'zambia', NULL);
INSERT INTO public.countries VALUES (716, 'ZW', 'ZWE', 'Zimbabwe', 'zimbabwe', 'en-ZW');
INSERT INTO public.countries VALUES (499, 'ME', 'MNE', 'Montenegro', 'montenegro', NULL);
INSERT INTO public.countries VALUES (0, 'XK', 'XKX', 'Kosovo', 'kosovo', NULL);
INSERT INTO public.countries VALUES (248, 'AX', 'ALA', 'Aland Islands', 'aland islands', NULL);
INSERT INTO public.countries VALUES (535, 'BQ', 'BES', 'Bonaire, Sint Eustatius and Saba', 'bonaire, sint eustatius and saba', NULL);
INSERT INTO public.countries VALUES (531, 'CW', 'CUW', 'Curacao', 'curacao', NULL);
INSERT INTO public.countries VALUES (831, 'GG', 'GGY', 'Guernsey', 'guernsey', NULL);
INSERT INTO public.countries VALUES (833, 'IM', 'IMN', 'Isle of Man', 'isle of man', NULL);
INSERT INTO public.countries VALUES (832, 'JE', 'JEY', 'Jersey', 'jersey', NULL);
INSERT INTO public.countries VALUES (652, 'BL', 'BLM', 'Saint Barthelemy', 'saint barthelemy', NULL);
INSERT INTO public.countries VALUES (663, 'MF', 'MAF', 'Saint Martin', 'saint martin', NULL);
INSERT INTO public.countries VALUES (534, 'SX', 'SXM', 'Sint Maarten', 'sint maarten', NULL);
INSERT INTO public.countries VALUES (728, 'SS', 'SSD', 'South Sudan', 'south sudan', NULL);
--
-- Data for Name: employee_status; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO public.employee_status OVERRIDING SYSTEM VALUE VALUES (1, 'Employed', 'employed');
INSERT INTO public.employee_status OVERRIDING SYSTEM VALUE VALUES (2, 'Unemployed', 'unemployed');
INSERT INTO public.employee_status OVERRIDING SYSTEM VALUE VALUES (3, 'Open to opportunity', 'open to opportunity');
INSERT INTO public.employee_status OVERRIDING SYSTEM VALUE VALUES (4, 'Activly applying', 'activly applying');
INSERT INTO public.employee_status OVERRIDING SYSTEM VALUE VALUES (5, 'Retired', 'retired');
INSERT INTO public.employee_status OVERRIDING SYSTEM VALUE VALUES (6, 'Unemployable', 'unemployable');
--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (1, 'system', 'system', '{}', '{}', 'UTC', 'en-US', NULL, '2022-05-01 14:55:35.90698+02', '2022-07-09 10:54:32.545377+02');
--
-- Name: business_areas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
PERFORM pg_catalog.setval('public.business_areas_id_seq', 1, false);
--
-- Name: business_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
PERFORM pg_catalog.setval('public.business_roles_id_seq', 18, true);
--
-- Name: employee_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
PERFORM pg_catalog.setval('public.employee_status_id_seq', 1, false);
--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
PERFORM pg_catalog.setval('public.users_id_seq', 1, false);
--
-- PostgreSQL database dump complete
--
END $pdd_data$
LANGUAGE plpgsql;
