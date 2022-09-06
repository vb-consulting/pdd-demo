DO $pdd_data$
BEGIN
--
-- PostgreSQL database dump
--
-- Dumped from database version 14.5 (Ubuntu 14.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.5
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
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (1, 'General', DEFAULT);
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (2, 'Enterprise', DEFAULT);
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (3, 'Fintech', DEFAULT);
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (4, 'Mobility', DEFAULT);
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (5, 'Insurtech', DEFAULT);
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (6, 'Big Data', DEFAULT);
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (7, 'Healthcare', DEFAULT);
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (8, 'Manufacturing', DEFAULT);
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (9, 'Hardware', DEFAULT);
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (10, 'Proptech', DEFAULT);
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (11, 'AI', DEFAULT);
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (12, 'Edtech', DEFAULT);
INSERT INTO public.business_areas OVERRIDING SYSTEM VALUE VALUES (13, 'Consumer', DEFAULT);
--
-- Data for Name: business_role_types; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO public.business_role_types OVERRIDING SYSTEM VALUE VALUES (1, 'Managerial', DEFAULT);
INSERT INTO public.business_role_types OVERRIDING SYSTEM VALUE VALUES (2, 'Design', DEFAULT);
INSERT INTO public.business_role_types OVERRIDING SYSTEM VALUE VALUES (3, 'Development', DEFAULT);
INSERT INTO public.business_role_types OVERRIDING SYSTEM VALUE VALUES (4, 'Devops', DEFAULT);
INSERT INTO public.business_role_types OVERRIDING SYSTEM VALUE VALUES (5, 'QA', DEFAULT);
INSERT INTO public.business_role_types OVERRIDING SYSTEM VALUE VALUES (6, 'Database', DEFAULT);
--
-- Data for Name: business_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (1, 'Product Owner', DEFAULT, 1);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (2, 'Project Manager', DEFAULT, 1);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (3, 'UX Designer', DEFAULT, 2);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (4, 'UI Designer', DEFAULT, 2);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (5, 'Business Analyst', DEFAULT, 1);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (6, 'Software Developer', DEFAULT, 3);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (7, 'Software Architect', DEFAULT, 3);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (8, 'Devops', DEFAULT, 4);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (9, 'Devops Engineer', DEFAULT, 4);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (10, 'Devops Lead', DEFAULT, 4);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (11, 'Tester', DEFAULT, 5);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (12, 'QA Lead', DEFAULT, 5);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (13, 'QA Engineer', DEFAULT, 5);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (14, 'Tech lead', DEFAULT, 1);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (15, 'Scrum master', DEFAULT, 1);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (16, 'Software Development Manager', DEFAULT, 1);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (17, 'Database Administrator', DEFAULT, 6);
INSERT INTO public.business_roles OVERRIDING SYSTEM VALUE VALUES (18, 'Database Developer', DEFAULT, 6);
--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO public.countries VALUES (474, 'MQ', 'MTQ', 'Martinique', DEFAULT, NULL);
INSERT INTO public.countries VALUES (478, 'MR', 'MRT', 'Mauritania', DEFAULT, NULL);
INSERT INTO public.countries VALUES (480, 'MU', 'MUS', 'Mauritius', DEFAULT, NULL);
INSERT INTO public.countries VALUES (175, 'YT', 'MYT', 'Mayotte', DEFAULT, NULL);
INSERT INTO public.countries VALUES (484, 'MX', 'MEX', 'Mexico', DEFAULT, 'es-MX');
INSERT INTO public.countries VALUES (583, 'FM', 'FSM', 'Micronesia, Federated States of', DEFAULT, NULL);
INSERT INTO public.countries VALUES (498, 'MD', 'MDA', 'Moldova, Republic of', DEFAULT, NULL);
INSERT INTO public.countries VALUES (492, 'MC', 'MCO', 'Monaco', DEFAULT, 'fr-MC');
INSERT INTO public.countries VALUES (496, 'MN', 'MNG', 'Mongolia', DEFAULT, 'mn');
INSERT INTO public.countries VALUES (500, 'MS', 'MSR', 'Montserrat', DEFAULT, NULL);
INSERT INTO public.countries VALUES (504, 'MA', 'MAR', 'Morocco', DEFAULT, 'ar-MA');
INSERT INTO public.countries VALUES (508, 'MZ', 'MOZ', 'Mozambique', DEFAULT, NULL);
INSERT INTO public.countries VALUES (104, 'MM', 'MMR', 'Myanmar', DEFAULT, NULL);
INSERT INTO public.countries VALUES (516, 'NA', 'NAM', 'Namibia', DEFAULT, NULL);
INSERT INTO public.countries VALUES (520, 'NR', 'NRU', 'Nauru', DEFAULT, NULL);
INSERT INTO public.countries VALUES (524, 'NP', 'NPL', 'Nepal', DEFAULT, NULL);
INSERT INTO public.countries VALUES (528, 'NL', 'NLD', 'Netherlands', DEFAULT, 'nl-NL');
INSERT INTO public.countries VALUES (530, 'AN', 'ANT', 'Netherlands Antilles', DEFAULT, NULL);
INSERT INTO public.countries VALUES (540, 'NC', 'NCL', 'New Caledonia', DEFAULT, NULL);
INSERT INTO public.countries VALUES (554, 'NZ', 'NZL', 'New Zealand', DEFAULT, 'en-NZ');
INSERT INTO public.countries VALUES (558, 'NI', 'NIC', 'Nicaragua', DEFAULT, 'es-NI');
INSERT INTO public.countries VALUES (562, 'NE', 'NER', 'Niger', DEFAULT, NULL);
INSERT INTO public.countries VALUES (566, 'NG', 'NGA', 'Nigeria', DEFAULT, NULL);
INSERT INTO public.countries VALUES (570, 'NU', 'NIU', 'Niue', DEFAULT, NULL);
INSERT INTO public.countries VALUES (574, 'NF', 'NFK', 'Norfolk Island', DEFAULT, NULL);
INSERT INTO public.countries VALUES (580, 'MP', 'MNP', 'Northern Mariana Islands', DEFAULT, NULL);
INSERT INTO public.countries VALUES (578, 'NO', 'NOR', 'Norway', DEFAULT, 'nb-NO');
INSERT INTO public.countries VALUES (512, 'OM', 'OMN', 'Oman', DEFAULT, 'ar-OM');
INSERT INTO public.countries VALUES (586, 'PK', 'PAK', 'Pakistan', DEFAULT, 'ur-PK');
INSERT INTO public.countries VALUES (585, 'PW', 'PLW', 'Palau', DEFAULT, NULL);
INSERT INTO public.countries VALUES (591, 'PA', 'PAN', 'Panama', DEFAULT, 'es-PA');
INSERT INTO public.countries VALUES (598, 'PG', 'PNG', 'Papua New Guinea', DEFAULT, NULL);
INSERT INTO public.countries VALUES (600, 'PY', 'PRY', 'Paraguay', DEFAULT, 'es-PY');
INSERT INTO public.countries VALUES (604, 'PE', 'PER', 'Peru', DEFAULT, 'es-PE');
INSERT INTO public.countries VALUES (608, 'PH', 'PHL', 'Philippines', DEFAULT, 'en-PH');
INSERT INTO public.countries VALUES (612, 'PN', 'PCN', 'Pitcairn', DEFAULT, NULL);
INSERT INTO public.countries VALUES (616, 'PL', 'POL', 'Poland', DEFAULT, 'pl-PL');
INSERT INTO public.countries VALUES (620, 'PT', 'PRT', 'Portugal', DEFAULT, 'pt-PT');
INSERT INTO public.countries VALUES (630, 'PR', 'PRI', 'Puerto Rico', DEFAULT, 'es-PR');
INSERT INTO public.countries VALUES (634, 'QA', 'QAT', 'Qatar', DEFAULT, 'ar-QA');
INSERT INTO public.countries VALUES (638, 'RE', 'REU', 'Reunion', DEFAULT, NULL);
INSERT INTO public.countries VALUES (642, 'RO', 'ROU', 'Romania', DEFAULT, 'ro');
INSERT INTO public.countries VALUES (643, 'RU', 'RUS', 'Russian Federation', DEFAULT, NULL);
INSERT INTO public.countries VALUES (646, 'RW', 'RWA', 'Rwanda', DEFAULT, NULL);
INSERT INTO public.countries VALUES (654, 'SH', 'SHN', 'Saint Helena', DEFAULT, NULL);
INSERT INTO public.countries VALUES (659, 'KN', 'KNA', 'Saint Kitts and Nevis', DEFAULT, NULL);
INSERT INTO public.countries VALUES (662, 'LC', 'LCA', 'Saint Lucia', DEFAULT, NULL);
INSERT INTO public.countries VALUES (666, 'PM', 'SPM', 'Saint Pierre and Miquelon', DEFAULT, NULL);
INSERT INTO public.countries VALUES (670, 'VC', 'VCT', 'Saint Vincent and the Grenadines', DEFAULT, NULL);
INSERT INTO public.countries VALUES (882, 'WS', 'WSM', 'Samoa', DEFAULT, NULL);
INSERT INTO public.countries VALUES (674, 'SM', 'SMR', 'San Marino', DEFAULT, NULL);
INSERT INTO public.countries VALUES (678, 'ST', 'STP', 'Sao Tome and Principe', DEFAULT, NULL);
INSERT INTO public.countries VALUES (682, 'SA', 'SAU', 'Saudi Arabia', DEFAULT, 'ar-SA');
INSERT INTO public.countries VALUES (686, 'SN', 'SEN', 'Senegal', DEFAULT, NULL);
INSERT INTO public.countries VALUES (688, 'RS', 'SRB', 'Serbia', DEFAULT, 'Cy-sr');
INSERT INTO public.countries VALUES (690, 'SC', 'SYC', 'Seychelles', DEFAULT, NULL);
INSERT INTO public.countries VALUES (694, 'SL', 'SLE', 'Sierra Leone', DEFAULT, NULL);
INSERT INTO public.countries VALUES (702, 'SG', 'SGP', 'Singapore', DEFAULT, 'zh-SG');
INSERT INTO public.countries VALUES (703, 'SK', 'SVK', 'Slovakia', DEFAULT, 'sk-SK');
INSERT INTO public.countries VALUES (705, 'SI', 'SVN', 'Slovenia', DEFAULT, 'sl');
INSERT INTO public.countries VALUES (90, 'SB', 'SLB', 'Solomon Islands', DEFAULT, NULL);
INSERT INTO public.countries VALUES (706, 'SO', 'SOM', 'Somalia', DEFAULT, NULL);
INSERT INTO public.countries VALUES (710, 'ZA', 'ZAF', 'South Africa', DEFAULT, 'af-ZA');
INSERT INTO public.countries VALUES (239, 'GS', 'SGS', 'South Georgia and the South Sandwich Islands', DEFAULT, NULL);
INSERT INTO public.countries VALUES (724, 'ES', 'ESP', 'Spain', DEFAULT, 'es-ES');
INSERT INTO public.countries VALUES (144, 'LK', 'LKA', 'Sri Lanka', DEFAULT, NULL);
INSERT INTO public.countries VALUES (736, 'SD', 'SDN', 'Sudan', DEFAULT, NULL);
INSERT INTO public.countries VALUES (740, 'SR', 'SUR', 'Suriname', DEFAULT, NULL);
INSERT INTO public.countries VALUES (744, 'SJ', 'SJM', 'Svalbard and Jan Mayen', DEFAULT, NULL);
INSERT INTO public.countries VALUES (748, 'SZ', 'SWZ', 'Swaziland', DEFAULT, NULL);
INSERT INTO public.countries VALUES (752, 'SE', 'SWE', 'Sweden', DEFAULT, 'sv-SE');
INSERT INTO public.countries VALUES (756, 'CH', 'CHE', 'Switzerland', DEFAULT, 'de-CH');
INSERT INTO public.countries VALUES (760, 'SY', 'SYR', 'Syrian Arab Republic', DEFAULT, NULL);
INSERT INTO public.countries VALUES (158, 'TW', 'TWN', 'Taiwan, Province of China', DEFAULT, NULL);
INSERT INTO public.countries VALUES (762, 'TJ', 'TJK', 'Tajikistan', DEFAULT, NULL);
INSERT INTO public.countries VALUES (834, 'TZ', 'TZA', 'Tanzania, United Republic of', DEFAULT, NULL);
INSERT INTO public.countries VALUES (764, 'TH', 'THA', 'Thailand', DEFAULT, 'th-TH');
INSERT INTO public.countries VALUES (626, 'TL', 'TLS', 'Timor-Leste', DEFAULT, NULL);
INSERT INTO public.countries VALUES (768, 'TG', 'TGO', 'Togo', DEFAULT, NULL);
INSERT INTO public.countries VALUES (772, 'TK', 'TKL', 'Tokelau', DEFAULT, NULL);
INSERT INTO public.countries VALUES (776, 'TO', 'TON', 'Tonga', DEFAULT, NULL);
INSERT INTO public.countries VALUES (50, 'BD', 'BGD', 'Bangladesh', DEFAULT, NULL);
INSERT INTO public.countries VALUES (52, 'BB', 'BRB', 'Barbados', DEFAULT, NULL);
INSERT INTO public.countries VALUES (112, 'BY', 'BLR', 'Belarus', DEFAULT, 'be');
INSERT INTO public.countries VALUES (56, 'BE', 'BEL', 'Belgium', DEFAULT, 'fr-BE');
INSERT INTO public.countries VALUES (84, 'BZ', 'BLZ', 'Belize', DEFAULT, 'en-BZ');
INSERT INTO public.countries VALUES (204, 'BJ', 'BEN', 'Benin', DEFAULT, NULL);
INSERT INTO public.countries VALUES (60, 'BM', 'BMU', 'Bermuda', DEFAULT, NULL);
INSERT INTO public.countries VALUES (64, 'BT', 'BTN', 'Bhutan', DEFAULT, NULL);
INSERT INTO public.countries VALUES (68, 'BO', 'BOL', 'Bolivia', DEFAULT, 'es-BO');
INSERT INTO public.countries VALUES (70, 'BA', 'BIH', 'Bosnia and Herzegovina', DEFAULT, NULL);
INSERT INTO public.countries VALUES (72, 'BW', 'BWA', 'Botswana', DEFAULT, NULL);
INSERT INTO public.countries VALUES (74, 'BV', 'BVT', 'Bouvet Island', DEFAULT, NULL);
INSERT INTO public.countries VALUES (76, 'BR', 'BRA', 'Brazil', DEFAULT, 'pt-BR');
INSERT INTO public.countries VALUES (86, 'IO', 'IOT', 'British Indian Ocean Territory', DEFAULT, NULL);
INSERT INTO public.countries VALUES (96, 'BN', 'BRN', 'Brunei Darussalam', DEFAULT, NULL);
INSERT INTO public.countries VALUES (100, 'BG', 'BGR', 'Bulgaria', DEFAULT, 'bg');
INSERT INTO public.countries VALUES (854, 'BF', 'BFA', 'Burkina Faso', DEFAULT, NULL);
INSERT INTO public.countries VALUES (108, 'BI', 'BDI', 'Burundi', DEFAULT, NULL);
INSERT INTO public.countries VALUES (116, 'KH', 'KHM', 'Cambodia', DEFAULT, NULL);
INSERT INTO public.countries VALUES (120, 'CM', 'CMR', 'Cameroon', DEFAULT, NULL);
INSERT INTO public.countries VALUES (132, 'CV', 'CPV', 'Cape Verde', DEFAULT, NULL);
INSERT INTO public.countries VALUES (136, 'KY', 'CYM', 'Cayman Islands', DEFAULT, NULL);
INSERT INTO public.countries VALUES (140, 'CF', 'CAF', 'Central African Republic', DEFAULT, NULL);
INSERT INTO public.countries VALUES (148, 'TD', 'TCD', 'Chad', DEFAULT, NULL);
INSERT INTO public.countries VALUES (152, 'CL', 'CHL', 'Chile', DEFAULT, 'es-CL');
INSERT INTO public.countries VALUES (156, 'CN', 'CHN', 'China', DEFAULT, 'zh-CN');
INSERT INTO public.countries VALUES (162, 'CX', 'CXR', 'Christmas Island', DEFAULT, NULL);
INSERT INTO public.countries VALUES (170, 'CO', 'COL', 'Colombia', DEFAULT, 'es-CO');
INSERT INTO public.countries VALUES (174, 'KM', 'COM', 'Comoros', DEFAULT, NULL);
INSERT INTO public.countries VALUES (178, 'CG', 'COG', 'Congo', DEFAULT, NULL);
INSERT INTO public.countries VALUES (180, 'CD', 'COD', 'Congo, the Democratic Republic of the', DEFAULT, NULL);
INSERT INTO public.countries VALUES (184, 'CK', 'COK', 'Cook Islands', DEFAULT, NULL);
INSERT INTO public.countries VALUES (188, 'CR', 'CRI', 'Costa Rica', DEFAULT, 'es-CR');
INSERT INTO public.countries VALUES (384, 'CI', 'CIV', 'Cote D''Ivoire', DEFAULT, NULL);
INSERT INTO public.countries VALUES (191, 'HR', 'HRV', 'Croatia', DEFAULT, 'hr');
INSERT INTO public.countries VALUES (192, 'CU', 'CUB', 'Cuba', DEFAULT, NULL);
INSERT INTO public.countries VALUES (196, 'CY', 'CYP', 'Cyprus', DEFAULT, NULL);
INSERT INTO public.countries VALUES (203, 'CZ', 'CZE', 'Czech Republic', DEFAULT, 'cs-CZ');
INSERT INTO public.countries VALUES (208, 'DK', 'DNK', 'Denmark', DEFAULT, 'da-DK');
INSERT INTO public.countries VALUES (262, 'DJ', 'DJI', 'Djibouti', DEFAULT, NULL);
INSERT INTO public.countries VALUES (212, 'DM', 'DMA', 'Dominica', DEFAULT, 'es-DO');
INSERT INTO public.countries VALUES (214, 'DO', 'DOM', 'Dominican Republic', DEFAULT, 'es-DO');
INSERT INTO public.countries VALUES (218, 'EC', 'ECU', 'Ecuador', DEFAULT, 'es-EC');
INSERT INTO public.countries VALUES (818, 'EG', 'EGY', 'Egypt', DEFAULT, 'ar-EG');
INSERT INTO public.countries VALUES (222, 'SV', 'SLV', 'El Salvador', DEFAULT, 'es-SV');
INSERT INTO public.countries VALUES (226, 'GQ', 'GNQ', 'Equatorial Guinea', DEFAULT, NULL);
INSERT INTO public.countries VALUES (232, 'ER', 'ERI', 'Eritrea', DEFAULT, NULL);
INSERT INTO public.countries VALUES (233, 'EE', 'EST', 'Estonia', DEFAULT, 'et');
INSERT INTO public.countries VALUES (231, 'ET', 'ETH', 'Ethiopia', DEFAULT, NULL);
INSERT INTO public.countries VALUES (238, 'FK', 'FLK', 'Falkland Islands (Malvinas)', DEFAULT, NULL);
INSERT INTO public.countries VALUES (234, 'FO', 'FRO', 'Faroe Islands', DEFAULT, 'fo-FO');
INSERT INTO public.countries VALUES (242, 'FJ', 'FJI', 'Fiji', DEFAULT, NULL);
INSERT INTO public.countries VALUES (246, 'FI', 'FIN', 'Finland', DEFAULT, 'fi-FI');
INSERT INTO public.countries VALUES (250, 'FR', 'FRA', 'France', DEFAULT, 'fr-FR');
INSERT INTO public.countries VALUES (254, 'GF', 'GUF', 'French Guiana', DEFAULT, NULL);
INSERT INTO public.countries VALUES (258, 'PF', 'PYF', 'French Polynesia', DEFAULT, NULL);
INSERT INTO public.countries VALUES (260, 'TF', 'ATF', 'French Southern Territories', DEFAULT, NULL);
INSERT INTO public.countries VALUES (266, 'GA', 'GAB', 'Gabon', DEFAULT, NULL);
INSERT INTO public.countries VALUES (270, 'GM', 'GMB', 'Gambia', DEFAULT, NULL);
INSERT INTO public.countries VALUES (268, 'GE', 'GEO', 'Georgia', DEFAULT, 'ka');
INSERT INTO public.countries VALUES (276, 'DE', 'DEU', 'Germany', DEFAULT, 'de-DE');
INSERT INTO public.countries VALUES (288, 'GH', 'GHA', 'Ghana', DEFAULT, NULL);
INSERT INTO public.countries VALUES (292, 'GI', 'GIB', 'Gibraltar', DEFAULT, NULL);
INSERT INTO public.countries VALUES (300, 'GR', 'GRC', 'Greece', DEFAULT, 'el-GR');
INSERT INTO public.countries VALUES (304, 'GL', 'GRL', 'Greenland', DEFAULT, NULL);
INSERT INTO public.countries VALUES (308, 'GD', 'GRD', 'Grenada', DEFAULT, NULL);
INSERT INTO public.countries VALUES (312, 'GP', 'GLP', 'Guadeloupe', DEFAULT, NULL);
INSERT INTO public.countries VALUES (316, 'GU', 'GUM', 'Guam', DEFAULT, NULL);
INSERT INTO public.countries VALUES (320, 'GT', 'GTM', 'Guatemala', DEFAULT, 'es-GT');
INSERT INTO public.countries VALUES (324, 'GN', 'GIN', 'Guinea', DEFAULT, NULL);
INSERT INTO public.countries VALUES (624, 'GW', 'GNB', 'Guinea-Bissau', DEFAULT, NULL);
INSERT INTO public.countries VALUES (328, 'GY', 'GUY', 'Guyana', DEFAULT, NULL);
INSERT INTO public.countries VALUES (332, 'HT', 'HTI', 'Haiti', DEFAULT, NULL);
INSERT INTO public.countries VALUES (334, 'HM', 'HMD', 'Heard Island and Mcdonald Islands', DEFAULT, NULL);
INSERT INTO public.countries VALUES (336, 'VA', 'VAT', 'Holy See (Vatican City State)', DEFAULT, NULL);
INSERT INTO public.countries VALUES (340, 'HN', 'HND', 'Honduras', DEFAULT, 'es-HN');
INSERT INTO public.countries VALUES (344, 'HK', 'HKG', 'Hong Kong', DEFAULT, 'zh-HK');
INSERT INTO public.countries VALUES (348, 'HU', 'HUN', 'Hungary', DEFAULT, 'hu-HU');
INSERT INTO public.countries VALUES (352, 'IS', 'ISL', 'Iceland', DEFAULT, 'is');
INSERT INTO public.countries VALUES (356, 'IN', 'IND', 'India', DEFAULT, 'gu-IN');
INSERT INTO public.countries VALUES (360, 'ID', 'IDN', 'Indonesia', DEFAULT, 'id');
INSERT INTO public.countries VALUES (364, 'IR', 'IRN', 'Iran, Islamic Republic of', DEFAULT, NULL);
INSERT INTO public.countries VALUES (368, 'IQ', 'IRQ', 'Iraq', DEFAULT, 'ar-IQ');
INSERT INTO public.countries VALUES (372, 'IE', 'IRL', 'Ireland', DEFAULT, 'en-IE');
INSERT INTO public.countries VALUES (376, 'IL', 'ISR', 'Israel', DEFAULT, 'he-IL');
INSERT INTO public.countries VALUES (380, 'IT', 'ITA', 'Italy', DEFAULT, 'it-IT');
INSERT INTO public.countries VALUES (388, 'JM', 'JAM', 'Jamaica', DEFAULT, 'en-JM');
INSERT INTO public.countries VALUES (392, 'JP', 'JPN', 'Japan', DEFAULT, 'ja');
INSERT INTO public.countries VALUES (400, 'JO', 'JOR', 'Jordan', DEFAULT, 'ar-JO');
INSERT INTO public.countries VALUES (398, 'KZ', 'KAZ', 'Kazakhstan', DEFAULT, 'kk-KZ');
INSERT INTO public.countries VALUES (404, 'KE', 'KEN', 'Kenya', DEFAULT, 'sw-KE');
INSERT INTO public.countries VALUES (296, 'KI', 'KIR', 'Kiribati', DEFAULT, NULL);
INSERT INTO public.countries VALUES (408, 'KP', 'PRK', 'Korea, Democratic People''s Republic of', DEFAULT, NULL);
INSERT INTO public.countries VALUES (410, 'KR', 'KOR', 'Korea, Republic of', DEFAULT, NULL);
INSERT INTO public.countries VALUES (414, 'KW', 'KWT', 'Kuwait', DEFAULT, 'ar-KW');
INSERT INTO public.countries VALUES (417, 'KG', 'KGZ', 'Kyrgyzstan', DEFAULT, NULL);
INSERT INTO public.countries VALUES (418, 'LA', 'LAO', 'Lao People''s Democratic Republic', DEFAULT, NULL);
INSERT INTO public.countries VALUES (428, 'LV', 'LVA', 'Latvia', DEFAULT, 'lv');
INSERT INTO public.countries VALUES (422, 'LB', 'LBN', 'Lebanon', DEFAULT, 'ar-LB');
INSERT INTO public.countries VALUES (426, 'LS', 'LSO', 'Lesotho', DEFAULT, NULL);
INSERT INTO public.countries VALUES (430, 'LR', 'LBR', 'Liberia', DEFAULT, NULL);
INSERT INTO public.countries VALUES (434, 'LY', 'LBY', 'Libyan Arab Jamahiriya', DEFAULT, NULL);
INSERT INTO public.countries VALUES (438, 'LI', 'LIE', 'Liechtenstein', DEFAULT, 'de-LI');
INSERT INTO public.countries VALUES (440, 'LT', 'LTU', 'Lithuania', DEFAULT, 'lt');
INSERT INTO public.countries VALUES (442, 'LU', 'LUX', 'Luxembourg', DEFAULT, 'de-LU');
INSERT INTO public.countries VALUES (446, 'MO', 'MAC', 'Macao', DEFAULT, NULL);
INSERT INTO public.countries VALUES (807, 'MK', 'MKD', 'North Macedonia', DEFAULT, NULL);
INSERT INTO public.countries VALUES (450, 'MG', 'MDG', 'Madagascar', DEFAULT, NULL);
INSERT INTO public.countries VALUES (454, 'MW', 'MWI', 'Malawi', DEFAULT, NULL);
INSERT INTO public.countries VALUES (458, 'MY', 'MYS', 'Malaysia', DEFAULT, 'ms-MY');
INSERT INTO public.countries VALUES (462, 'MV', 'MDV', 'Maldives', DEFAULT, 'div-MV');
INSERT INTO public.countries VALUES (466, 'ML', 'MLI', 'Mali', DEFAULT, NULL);
INSERT INTO public.countries VALUES (470, 'MT', 'MLT', 'Malta', DEFAULT, NULL);
INSERT INTO public.countries VALUES (584, 'MH', 'MHL', 'Marshall Islands', DEFAULT, NULL);
INSERT INTO public.countries VALUES (840, 'US', 'USA', 'United States', DEFAULT, 'en-US');
INSERT INTO public.countries VALUES (124, 'CA', 'CAN', 'Canada', DEFAULT, 'en-CA');
INSERT INTO public.countries VALUES (4, 'AF', 'AFG', 'Afghanistan', DEFAULT, NULL);
INSERT INTO public.countries VALUES (8, 'AL', 'ALB', 'Albania', DEFAULT, 'sq');
INSERT INTO public.countries VALUES (12, 'DZ', 'DZA', 'Algeria', DEFAULT, 'ar-DZ');
INSERT INTO public.countries VALUES (16, 'AS', 'ASM', 'American Samoa', DEFAULT, NULL);
INSERT INTO public.countries VALUES (20, 'AD', 'AND', 'Andorra', DEFAULT, NULL);
INSERT INTO public.countries VALUES (24, 'AO', 'AGO', 'Angola', DEFAULT, NULL);
INSERT INTO public.countries VALUES (660, 'AI', 'AIA', 'Anguilla', DEFAULT, NULL);
INSERT INTO public.countries VALUES (10, 'AQ', 'ATA', 'Antarctica', DEFAULT, NULL);
INSERT INTO public.countries VALUES (28, 'AG', 'ATG', 'Antigua and Barbuda', DEFAULT, NULL);
INSERT INTO public.countries VALUES (32, 'AR', 'ARG', 'Argentina', DEFAULT, 'es-AR');
INSERT INTO public.countries VALUES (51, 'AM', 'ARM', 'Armenia', DEFAULT, 'hy');
INSERT INTO public.countries VALUES (533, 'AW', 'ABW', 'Aruba', DEFAULT, NULL);
INSERT INTO public.countries VALUES (36, 'AU', 'AUS', 'Australia', DEFAULT, 'en-AU');
INSERT INTO public.countries VALUES (40, 'AT', 'AUT', 'Austria', DEFAULT, 'de-AT');
INSERT INTO public.countries VALUES (31, 'AZ', 'AZE', 'Azerbaijan', DEFAULT, 'Cy-az-AZ');
INSERT INTO public.countries VALUES (44, 'BS', 'BHS', 'Bahamas', DEFAULT, NULL);
INSERT INTO public.countries VALUES (48, 'BH', 'BHR', 'Bahrain', DEFAULT, 'ar-BH');
INSERT INTO public.countries VALUES (780, 'TT', 'TTO', 'Trinidad and Tobago', DEFAULT, 'en-TT');
INSERT INTO public.countries VALUES (788, 'TN', 'TUN', 'Tunisia', DEFAULT, 'ar-TN');
INSERT INTO public.countries VALUES (792, 'TR', 'TUR', 'Turkey', DEFAULT, 'tr-TR');
INSERT INTO public.countries VALUES (795, 'TM', 'TKM', 'Turkmenistan', DEFAULT, NULL);
INSERT INTO public.countries VALUES (796, 'TC', 'TCA', 'Turks and Caicos Islands', DEFAULT, NULL);
INSERT INTO public.countries VALUES (798, 'TV', 'TUV', 'Tuvalu', DEFAULT, NULL);
INSERT INTO public.countries VALUES (800, 'UG', 'UGA', 'Uganda', DEFAULT, NULL);
INSERT INTO public.countries VALUES (804, 'UA', 'UKR', 'Ukraine', DEFAULT, 'uk-UA');
INSERT INTO public.countries VALUES (784, 'AE', 'ARE', 'United Arab Emirates', DEFAULT, 'ar-AE');
INSERT INTO public.countries VALUES (826, 'GB', 'GBR', 'United Kingdom', DEFAULT, 'en-GB');
INSERT INTO public.countries VALUES (581, 'UM', 'UMI', 'United States Minor Outlying Islands', DEFAULT, NULL);
INSERT INTO public.countries VALUES (858, 'UY', 'URY', 'Uruguay', DEFAULT, 'es-UY');
INSERT INTO public.countries VALUES (860, 'UZ', 'UZB', 'Uzbekistan', DEFAULT, 'Cy-uz-UZ');
INSERT INTO public.countries VALUES (548, 'VU', 'VUT', 'Vanuatu', DEFAULT, NULL);
INSERT INTO public.countries VALUES (862, 'VE', 'VEN', 'Venezuela', DEFAULT, 'es-VE');
INSERT INTO public.countries VALUES (704, 'VN', 'VNM', 'Viet Nam', DEFAULT, NULL);
INSERT INTO public.countries VALUES (92, 'VG', 'VGB', 'Virgin Islands, British', DEFAULT, NULL);
INSERT INTO public.countries VALUES (850, 'VI', 'VIR', 'Virgin Islands, U.s.', DEFAULT, NULL);
INSERT INTO public.countries VALUES (876, 'WF', 'WLF', 'Wallis and Futuna', DEFAULT, NULL);
INSERT INTO public.countries VALUES (732, 'EH', 'ESH', 'Western Sahara', DEFAULT, NULL);
INSERT INTO public.countries VALUES (887, 'YE', 'YEM', 'Yemen', DEFAULT, 'ar-YE');
INSERT INTO public.countries VALUES (894, 'ZM', 'ZMB', 'Zambia', DEFAULT, NULL);
INSERT INTO public.countries VALUES (716, 'ZW', 'ZWE', 'Zimbabwe', DEFAULT, 'en-ZW');
INSERT INTO public.countries VALUES (499, 'ME', 'MNE', 'Montenegro', DEFAULT, NULL);
INSERT INTO public.countries VALUES (0, 'XK', 'XKX', 'Kosovo', DEFAULT, NULL);
INSERT INTO public.countries VALUES (248, 'AX', 'ALA', 'Aland Islands', DEFAULT, NULL);
INSERT INTO public.countries VALUES (535, 'BQ', 'BES', 'Bonaire, Sint Eustatius and Saba', DEFAULT, NULL);
INSERT INTO public.countries VALUES (531, 'CW', 'CUW', 'Curacao', DEFAULT, NULL);
INSERT INTO public.countries VALUES (831, 'GG', 'GGY', 'Guernsey', DEFAULT, NULL);
INSERT INTO public.countries VALUES (833, 'IM', 'IMN', 'Isle of Man', DEFAULT, NULL);
INSERT INTO public.countries VALUES (832, 'JE', 'JEY', 'Jersey', DEFAULT, NULL);
INSERT INTO public.countries VALUES (652, 'BL', 'BLM', 'Saint Barthelemy', DEFAULT, NULL);
INSERT INTO public.countries VALUES (663, 'MF', 'MAF', 'Saint Martin', DEFAULT, NULL);
INSERT INTO public.countries VALUES (534, 'SX', 'SXM', 'Sint Maarten', DEFAULT, NULL);
INSERT INTO public.countries VALUES (728, 'SS', 'SSD', 'South Sudan', DEFAULT, NULL);
--
-- Data for Name: employee_status; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO public.employee_status OVERRIDING SYSTEM VALUE VALUES (1, 'Employed', DEFAULT);
INSERT INTO public.employee_status OVERRIDING SYSTEM VALUE VALUES (2, 'Unemployed', DEFAULT);
INSERT INTO public.employee_status OVERRIDING SYSTEM VALUE VALUES (3, 'Open to opportunity', DEFAULT);
INSERT INTO public.employee_status OVERRIDING SYSTEM VALUE VALUES (4, 'Activly applying', DEFAULT);
INSERT INTO public.employee_status OVERRIDING SYSTEM VALUE VALUES (5, 'Retired', DEFAULT);
INSERT INTO public.employee_status OVERRIDING SYSTEM VALUE VALUES (6, 'Unemployable', DEFAULT);
--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (1, 'system', 'system', '{}', '{}', 'UTC', 'en-US', NULL, '2022-05-01 14:55:35.90698+02', '2022-07-09 10:54:32.545377+02');
--
-- Name: business_areas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
PERFORM pg_catalog.setval('public.business_areas_id_seq', 1, false);
--
-- Name: business_role_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
PERFORM pg_catalog.setval('public.business_role_types_id_seq', 5, true);
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
