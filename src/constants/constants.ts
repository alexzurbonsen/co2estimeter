// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
// SPDX-FileCopyrightText: co2.js authors (https://github.com/thegreenwebfoundation/co2.js)
//
// SPDX-License-Identifier: Apache-2.0
export const STORAGE_KEYS = {
  DOMAIN_STATS: 'domainStats',
  MONITORING_ACTIVE: 'monitoringActive',
  GREEN_HOSTING_FACTOR: 'greenHostingFactor',
  GRID_INTENSITIES: 'gridIntensities',
};

export const LOGGER_PREFIX = 'WEBEXT-CO2';
export const SET_CONFIG_DEBOUNCE_INTERVAL = 500; // ms
export const RE_FETCH_INTERVAL = 5000; // ms

export interface CountryCode {
  alpha3: string;
  country: string;
  gridIntensity: number;
}

// according to https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
// export const COUNTRY_CODE_OPTIONS: readonly CountryCode[] = [
//   { alpha3: 'ABW', country: 'Aruba' },
//   { alpha3: 'AFG', country: 'Afghanistan' },
//   { alpha3: 'AGO', country: 'Angola' },
//   { alpha3: 'AIA', country: 'Anguilla' },
//   { alpha3: 'ALA', country: 'Åland Islands' },
//   { alpha3: 'ALB', country: 'Albania' },
//   { alpha3: 'AND', country: 'Andorra' },
//   { alpha3: 'ARE', country: 'United Arab Emirates' },
//   { alpha3: 'ARG', country: 'Argentina' },
//   { alpha3: 'ARM', country: 'Armenia' },
//   { alpha3: 'ASM', country: 'American Samoa' },
//   { alpha3: 'ATA', country: 'Antarctica' },
//   { alpha3: 'ATF', country: 'French Southern Territories' },
//   { alpha3: 'ATG', country: 'Antigua and Barbuda' },
//   { alpha3: 'AUS', country: 'Australia' },
//   { alpha3: 'AUT', country: 'Austria' },
//   { alpha3: 'AZE', country: 'Azerbaijan' },
//   { alpha3: 'BDI', country: 'Burundi' },
//   { alpha3: 'BEL', country: 'Belgium' },
//   { alpha3: 'BEN', country: 'Benin' },
//   { alpha3: 'BES', country: 'Bonaire, Sint Eustatius and Saba' },
//   { alpha3: 'BFA', country: 'Burkina Faso' },
//   { alpha3: 'BGD', country: 'Bangladesh' },
//   { alpha3: 'BGR', country: 'Bulgaria' },
//   { alpha3: 'BHR', country: 'Bahrain' },
//   { alpha3: 'BHS', country: 'Bahamas' },
//   { alpha3: 'BIH', country: 'Bosnia and Herzegovina' },
//   { alpha3: 'BLM', country: 'Saint Barthélemy' },
//   { alpha3: 'BLR', country: 'Belarus' },
//   { alpha3: 'BLZ', country: 'Belize' },
//   { alpha3: 'BMU', country: 'Bermuda' },
//   { alpha3: 'BOL', country: 'Bolivia, Plurinational State of' },
//   { alpha3: 'BRA', country: 'Brazil' },
//   { alpha3: 'BRB', country: 'Barbados' },
//   { alpha3: 'BRN', country: 'Brunei Darussalam' },
//   { alpha3: 'BTN', country: 'Bhutan' },
//   { alpha3: 'BVT', country: 'Bouvet Island' },
//   { alpha3: 'BWA', country: 'Botswana' },
//   { alpha3: 'CAF', country: 'Central African Republic' },
//   { alpha3: 'CAN', country: 'Canada' },
//   { alpha3: 'CCK', country: 'Cocos (Keeling) Islands' },
//   { alpha3: 'CHE', country: 'Switzerland' },
//   { alpha3: 'CHL', country: 'Chile' },
//   { alpha3: 'CHN', country: 'China' },
//   { alpha3: 'CIV', country: "Côte d'Ivoire" },
//   { alpha3: 'CMR', country: 'Cameroon' },
//   { alpha3: 'COD', country: 'Congo, Democratic Republic of the' },
//   { alpha3: 'COG', country: 'Congo' },
//   { alpha3: 'COK', country: 'Cook Islands' },
//   { alpha3: 'COL', country: 'Colombia' },
//   { alpha3: 'COM', country: 'Comoros' },
//   { alpha3: 'CPV', country: 'Cabo Verde' },
//   { alpha3: 'CRI', country: 'Costa Rica' },
//   { alpha3: 'CUB', country: 'Cuba' },
//   { alpha3: 'CUW', country: 'Curaçao' },
//   { alpha3: 'CXR', country: 'Christmas Island' },
//   { alpha3: 'CYM', country: 'Cayman Islands' },
//   { alpha3: 'CYP', country: 'Cyprus' },
//   { alpha3: 'CZE', country: 'Czechia' },
//   { alpha3: 'DEU', country: 'Germany' },
//   { alpha3: 'DJI', country: 'Djibouti' },
//   { alpha3: 'DMA', country: 'Dominica' },
//   { alpha3: 'DNK', country: 'Denmark' },
//   { alpha3: 'DOM', country: 'Dominican Republic' },
//   { alpha3: 'DZA', country: 'Algeria' },
//   { alpha3: 'ECU', country: 'Ecuador' },
//   { alpha3: 'EGY', country: 'Egypt' },
//   { alpha3: 'ERI', country: 'Eritrea' },
//   { alpha3: 'ESH', country: 'Western Sahara' },
//   { alpha3: 'ESP', country: 'Spain' },
//   { alpha3: 'EST', country: 'Estonia' },
//   { alpha3: 'ETH', country: 'Ethiopia' },
//   { alpha3: 'FIN', country: 'Finland' },
//   { alpha3: 'FJI', country: 'Fiji' },
//   { alpha3: 'FLK', country: 'Falkland Islands (Malvinas)' },
//   { alpha3: 'FRA', country: 'France' },
//   { alpha3: 'FRO', country: 'Faroe Islands' },
//   { alpha3: 'FSM', country: 'Micronesia, Federated States of' },
//   { alpha3: 'GAB', country: 'Gabon' },
//   {
//     alpha3: 'GBR',
//     country: 'United Kingdom of Great Britain and Northern Ireland',
//   },
//   { alpha3: 'GEO', country: 'Georgia' },
//   { alpha3: 'GGY', country: 'Guernsey' },
//   { alpha3: 'GHA', country: 'Ghana' },
//   { alpha3: 'GIB', country: 'Gibraltar' },
//   { alpha3: 'GIN', country: 'Guinea' },
//   { alpha3: 'GLP', country: 'Guadeloupe' },
//   { alpha3: 'GMB', country: 'Gambia' },
//   { alpha3: 'GNB', country: 'Guinea-Bissau' },
//   { alpha3: 'GNQ', country: 'Equatorial Guinea' },
//   { alpha3: 'GRC', country: 'Greece' },
//   { alpha3: 'GRD', country: 'Grenada' },
//   { alpha3: 'GRL', country: 'Greenland' },
//   { alpha3: 'GTM', country: 'Guatemala' },
//   { alpha3: 'GUF', country: 'French Guiana' },
//   { alpha3: 'GUM', country: 'Guam' },
//   { alpha3: 'GUY', country: 'Guyana' },
//   { alpha3: 'HKG', country: 'Hong Kong' },
//   { alpha3: 'HMD', country: 'Heard Island and McDonald Islands' },
//   { alpha3: 'HND', country: 'Honduras' },
//   { alpha3: 'HRV', country: 'Croatia' },
//   { alpha3: 'HTI', country: 'Haiti' },
//   { alpha3: 'HUN', country: 'Hungary' },
//   { alpha3: 'IDN', country: 'Indonesia' },
//   { alpha3: 'IMN', country: 'Isle of Man' },
//   { alpha3: 'IND', country: 'India' },
//   { alpha3: 'IOT', country: 'British Indian Ocean Territory' },
//   { alpha3: 'IRL', country: 'Ireland' },
//   { alpha3: 'IRN', country: 'Iran, Islamic Republic of' },
//   { alpha3: 'IRQ', country: 'Iraq' },
//   { alpha3: 'ISL', country: 'Iceland' },
//   { alpha3: 'ISR', country: 'Israel' },
//   { alpha3: 'ITA', country: 'Italy' },
//   { alpha3: 'JAM', country: 'Jamaica' },
//   { alpha3: 'JEY', country: 'Jersey' },
//   { alpha3: 'JOR', country: 'Jordan' },
//   { alpha3: 'JPN', country: 'Japan' },
//   { alpha3: 'KAZ', country: 'Kazakhstan' },
//   { alpha3: 'KEN', country: 'Kenya' },
//   { alpha3: 'KGZ', country: 'Kyrgyzstan' },
//   { alpha3: 'KHM', country: 'Cambodia' },
//   { alpha3: 'KIR', country: 'Kiribati' },
//   { alpha3: 'KNA', country: 'Saint Kitts and Nevis' },
//   { alpha3: 'KOR', country: 'Korea, Republic of' },
//   { alpha3: 'KWT', country: 'Kuwait' },
//   { alpha3: 'LAO', country: "Lao People's Democratic Republic" },
//   { alpha3: 'LBN', country: 'Lebanon' },
//   { alpha3: 'LBR', country: 'Liberia' },
//   { alpha3: 'LBY', country: 'Libya' },
//   { alpha3: 'LCA', country: 'Saint Lucia' },
//   { alpha3: 'LIE', country: 'Liechtenstein' },
//   { alpha3: 'LKA', country: 'Sri Lanka' },
//   { alpha3: 'LSO', country: 'Lesotho' },
//   { alpha3: 'LTU', country: 'Lithuania' },
//   { alpha3: 'LUX', country: 'Luxembourg' },
//   { alpha3: 'LVA', country: 'Latvia' },
//   { alpha3: 'MAC', country: 'Macao' },
//   { alpha3: 'MAF', country: 'Saint Martin (French part)' },
//   { alpha3: 'MAR', country: 'Morocco' },
//   { alpha3: 'MCO', country: 'Monaco' },
//   { alpha3: 'MDA', country: 'Moldova, Republic of' },
//   { alpha3: 'MDG', country: 'Madagascar' },
//   { alpha3: 'MDV', country: 'Maldives' },
//   { alpha3: 'MEX', country: 'Mexico' },
//   { alpha3: 'MHL', country: 'Marshall Islands' },
//   { alpha3: 'MKD', country: 'North Macedonia' },
//   { alpha3: 'MLI', country: 'Mali' },
//   { alpha3: 'MLT', country: 'Malta' },
//   { alpha3: 'MMR', country: 'Myanmar' },
//   { alpha3: 'MNE', country: 'Montenegro' },
//   { alpha3: 'MNG', country: 'Mongolia' },
//   { alpha3: 'MNP', country: 'Northern Mariana Islands' },
//   { alpha3: 'MOZ', country: 'Mozambique' },
//   { alpha3: 'MRT', country: 'Mauritania' },
//   { alpha3: 'MSR', country: 'Montserrat' },
//   { alpha3: 'MTQ', country: 'Martinique' },
//   { alpha3: 'MUS', country: 'Mauritius' },
//   { alpha3: 'MWI', country: 'Malawi' },
//   { alpha3: 'MYS', country: 'Malaysia' },
//   { alpha3: 'MYT', country: 'Mayotte' },
//   { alpha3: 'NAM', country: 'Namibia' },
//   { alpha3: 'NCL', country: 'New Caledonia' },
//   { alpha3: 'NER', country: 'Niger' },
//   { alpha3: 'NFK', country: 'Norfolk Island' },
//   { alpha3: 'NGA', country: 'Nigeria' },
//   { alpha3: 'NIC', country: 'Nicaragua' },
//   { alpha3: 'NIU', country: 'Niue' },
//   { alpha3: 'NLD', country: 'Netherlands, Kingdom of the' },
//   { alpha3: 'NOR', country: 'Norway' },
//   { alpha3: 'NPL', country: 'Nepal' },
//   { alpha3: 'NRU', country: 'Nauru' },
//   { alpha3: 'NZL', country: 'New Zealand' },
//   { alpha3: 'OMN', country: 'Oman' },
//   { alpha3: 'PAK', country: 'Pakistan' },
//   { alpha3: 'PAN', country: 'Panama' },
//   { alpha3: 'PCN', country: 'Pitcairn' },
//   { alpha3: 'PER', country: 'Peru' },
//   { alpha3: 'PHL', country: 'Philippines' },
//   { alpha3: 'PLW', country: 'Palau' },
//   { alpha3: 'PNG', country: 'Papua New Guinea' },
//   { alpha3: 'POL', country: 'Poland' },
//   { alpha3: 'PRI', country: 'Puerto Rico' },
//   { alpha3: 'PRK', country: "Korea, Democratic People's Republic of" },
//   { alpha3: 'PRT', country: 'Portugal' },
//   { alpha3: 'PRY', country: 'Paraguay' },
//   { alpha3: 'PSE', country: 'Palestine, State of' },
//   { alpha3: 'PYF', country: 'French Polynesia' },
//   { alpha3: 'QAT', country: 'Qatar' },
//   { alpha3: 'REU', country: 'Réunion' },
//   { alpha3: 'ROU', country: 'Romania' },
//   { alpha3: 'RUS', country: 'Russian Federation' },
//   { alpha3: 'RWA', country: 'Rwanda' },
//   { alpha3: 'SAU', country: 'Saudi Arabia' },
//   { alpha3: 'SDN', country: 'Sudan' },
//   { alpha3: 'SEN', country: 'Senegal' },
//   { alpha3: 'SGP', country: 'Singapore' },
//   { alpha3: 'SGS', country: 'South Georgia and the South Sandwich Islands' },
//   { alpha3: 'SHN', country: 'Saint Helena, Ascension and Tristan da Cunha' },
//   { alpha3: 'SJM', country: 'Svalbard and Jan Mayen' },
//   { alpha3: 'SLB', country: 'Solomon Islands' },
//   { alpha3: 'SLE', country: 'Sierra Leone' },
//   { alpha3: 'SLV', country: 'El Salvador' },
//   { alpha3: 'SMR', country: 'San Marino' },
//   { alpha3: 'SOM', country: 'Somalia' },
//   { alpha3: 'SPM', country: 'Saint Pierre and Miquelon' },
//   { alpha3: 'SRB', country: 'Serbia' },
//   { alpha3: 'SSD', country: 'South Sudan' },
//   { alpha3: 'STP', country: 'Sao Tome and Principe' },
//   { alpha3: 'SUR', country: 'Suriname' },
//   { alpha3: 'SVK', country: 'Slovakia' },
//   { alpha3: 'SVN', country: 'Slovenia' },
//   { alpha3: 'SWE', country: 'Sweden' },
//   { alpha3: 'SWZ', country: 'Eswatini' },
//   { alpha3: 'SXM', country: 'Sint Maarten (Dutch part)' },
//   { alpha3: 'SYC', country: 'Seychelles' },
//   { alpha3: 'SYR', country: 'Syrian Arab Republic' },
//   { alpha3: 'TCA', country: 'Turks and Caicos Islands' },
//   { alpha3: 'TCD', country: 'Chad' },
//   { alpha3: 'TGO', country: 'Togo' },
//   { alpha3: 'THA', country: 'Thailand' },
//   { alpha3: 'TJK', country: 'Tajikistan' },
//   { alpha3: 'TKL', country: 'Tokelau' },
//   { alpha3: 'TKM', country: 'Turkmenistan' },
//   { alpha3: 'TLS', country: 'Timor-Leste' },
//   { alpha3: 'TON', country: 'Tonga' },
//   { alpha3: 'TTO', country: 'Trinidad and Tobago' },
//   { alpha3: 'TUN', country: 'Tunisia' },
//   { alpha3: 'TUR', country: 'Türkiye' },
//   { alpha3: 'TUV', country: 'Tuvalu' },
//   { alpha3: 'TWN', country: 'Taiwan, Province of China' },
//   { alpha3: 'TZA', country: 'Tanzania, United Republic of' },
//   { alpha3: 'UGA', country: 'Uganda' },
//   { alpha3: 'UKR', country: 'Ukraine' },
//   { alpha3: 'UMI', country: 'United States Minor Outlying Islands' },
//   { alpha3: 'URY', country: 'Uruguay' },
//   { alpha3: 'USA', country: 'United States of America' },
//   { alpha3: 'UZB', country: 'Uzbekistan' },
//   { alpha3: 'VAT', country: 'Holy See' },
//   { alpha3: 'VCT', country: 'Saint Vincent and the Grenadines' },
//   { alpha3: 'VEN', country: 'Venezuela, Bolivarian Republic of' },
//   { alpha3: 'VGB', country: 'Virgin Islands (British)' },
//   { alpha3: 'VIR', country: 'Virgin Islands (U.S.)' },
//   { alpha3: 'VNM', country: 'Viet Nam' },
//   { alpha3: 'VUT', country: 'Vanuatu' },
//   { alpha3: 'WLF', country: 'Wallis and Futuna' },
//   { alpha3: 'WSM', country: 'Samoa' },
//   { alpha3: 'YEM', country: 'Yemen' },
//   { alpha3: 'ZAF', country: 'South Africa' },
//   { alpha3: 'ZMB', country: 'Zambia' },
//   { alpha3: 'ZWE', country: 'Zimbabwe' },
// ];

// "AFRICA":544.76,
// "ASEAN":571.29,
// "ASIA":590.01,
// "EUROPE":301.99,
// "LATIN AMERICA AND CARIBBEAN":260.09,
// "MIDDLE EAST":657.52,
// "NORTH AMERICA":343.66,
// "OCEANIA":489.59,
// "OECD":341.19,
// "WORLD":481.45,

export const COUNTRY_CODE_OPTIONS: ReadonlyArray<CountryCode> = [
  { alpha3: 'AFG', country: 'Afghanistan', gridIntensity: 132.53 },
  { alpha3: 'ALB', country: 'Albania', gridIntensity: 24.29 },
  { alpha3: 'DZA', country: 'Algeria', gridIntensity: 634.61 },
  { alpha3: 'ASM', country: 'American Samoa', gridIntensity: 611.11 },
  { alpha3: 'AGO', country: 'Angola', gridIntensity: 174.73 },
  { alpha3: 'ATG', country: 'Antigua and Barbuda', gridIntensity: 611.11 },
  { alpha3: 'ARG', country: 'Argentina', gridIntensity: 354.1 },
  { alpha3: 'ARM', country: 'Armenia', gridIntensity: 264.54 },
  { alpha3: 'ABW', country: 'Aruba', gridIntensity: 561.22 },
  { alpha3: 'AUS', country: 'Australia', gridIntensity: 548.65 },
  { alpha3: 'AUT', country: 'Austria', gridIntensity: 110.81 },
  { alpha3: 'AZE', country: 'Azerbaijan', gridIntensity: 671.39 },
  { alpha3: 'BHS', country: 'Bahamas', gridIntensity: 660.1 },
  { alpha3: 'BHR', country: 'Bahrain', gridIntensity: 904.62 },
  { alpha3: 'BGD', country: 'Bangladesh', gridIntensity: 691.41 },
  { alpha3: 'BRB', country: 'Barbados', gridIntensity: 605.51 },
  { alpha3: 'BLR', country: 'Belarus', gridIntensity: 441.74 },
  { alpha3: 'BEL', country: 'Belgium', gridIntensity: 138.11 },
  { alpha3: 'BLZ', country: 'Belize', gridIntensity: 225.81 },
  { alpha3: 'BEN', country: 'Benin', gridIntensity: 584.07 },
  { alpha3: 'BTN', country: 'Bhutan', gridIntensity: 23.33 },
  {
    alpha3: 'BOL',
    country: 'Bolivia, Plurinational State of',
    gridIntensity: 531.69,
  },
  { alpha3: 'BIH', country: 'Bosnia and Herzegovina', gridIntensity: 601.29 },
  { alpha3: 'BWA', country: 'Botswana', gridIntensity: 847.91 },
  { alpha3: 'BRA', country: 'Brazil', gridIntensity: 98.31 },
  { alpha3: 'BRN', country: 'Brunei Darussalam', gridIntensity: 893.91 },
  { alpha3: 'BGR', country: 'Bulgaria', gridIntensity: 335.33 },
  { alpha3: 'BFA', country: 'Burkina Faso', gridIntensity: 467.53 },
  { alpha3: 'BDI', country: 'Burundi', gridIntensity: 250 },
  { alpha3: 'CPV', country: 'Cabo Verde', gridIntensity: 558.14 },
  { alpha3: 'KHM', country: 'Cambodia', gridIntensity: 417.71 },
  { alpha3: 'CMR', country: 'Cameroon', gridIntensity: 305.42 },
  { alpha3: 'CAN', country: 'Canada', gridIntensity: 171.12 },
  { alpha3: 'CYM', country: 'Cayman Islands', gridIntensity: 642.86 },
  { alpha3: 'CAF', country: 'Central African Republic', gridIntensity: 0 },
  { alpha3: 'TCD', country: 'Chad', gridIntensity: 628.57 },
  { alpha3: 'CHL', country: 'Chile', gridIntensity: 291.11 },
  { alpha3: 'CHN', country: 'China', gridIntensity: 582.2 },
  { alpha3: 'COL', country: 'Colombia', gridIntensity: 259.51 },
  { alpha3: 'COM', country: 'Comoros', gridIntensity: 642.86 },
  { alpha3: 'COG', country: 'Congo', gridIntensity: 700 },
  {
    alpha3: 'COD',
    country: 'Congo, Democratic Republic of the',
    gridIntensity: 24.46,
  },
  { alpha3: 'COK', country: 'Cook Islands', gridIntensity: 250 },
  { alpha3: 'CRI', country: 'Costa Rica', gridIntensity: 53.38 },
  { alpha3: 'CIV', country: "Côte d'Ivoire", gridIntensity: 393.89 },
  { alpha3: 'HRV', country: 'Croatia', gridIntensity: 204.96 },
  { alpha3: 'CUB', country: 'Cuba', gridIntensity: 637.61 },
  { alpha3: 'CYP', country: 'Cyprus', gridIntensity: 534.32 },
  { alpha3: 'CZE', country: 'Czechia', gridIntensity: 449.72 },
  { alpha3: 'DNK', country: 'Denmark', gridIntensity: 151.65 },
  { alpha3: 'DJI', country: 'Djibouti', gridIntensity: 692.31 },
  { alpha3: 'DMA', country: 'Dominica', gridIntensity: 529.41 },
  { alpha3: 'DOM', country: 'Dominican Republic', gridIntensity: 580.78 },
  { alpha3: 'ECU', country: 'Ecuador', gridIntensity: 166.91 },
  { alpha3: 'EGY', country: 'Egypt', gridIntensity: 569.59 },
  { alpha3: 'SLV', country: 'El Salvador', gridIntensity: 224.76 },
  { alpha3: 'GNQ', country: 'Equatorial Guinea', gridIntensity: 591.84 },
  { alpha3: 'ERI', country: 'Eritrea', gridIntensity: 631.58 },
  { alpha3: 'EST', country: 'Estonia', gridIntensity: 416.67 },
  { alpha3: 'SWZ', country: 'Eswatini', gridIntensity: 172.41 },
  { alpha3: 'ETH', country: 'Ethiopia', gridIntensity: 24.64 },
  { alpha3: 'FLK', country: 'Falkland Islands (Malvinas)', gridIntensity: 500 },
  { alpha3: 'FRO', country: 'Faroe Islands', gridIntensity: 404.76 },
  { alpha3: 'FJI', country: 'Fiji', gridIntensity: 288.46 },
  { alpha3: 'FIN', country: 'Finland', gridIntensity: 79.16 },
  { alpha3: 'FRA', country: 'France', gridIntensity: 56.02 },
  { alpha3: 'GUF', country: 'French Guiana', gridIntensity: 217.82 },
  { alpha3: 'PYF', country: 'French Polynesia', gridIntensity: 442.86 },
  { alpha3: 'GAB', country: 'Gabon', gridIntensity: 491.6 },
  { alpha3: 'GMB', country: 'Gambia', gridIntensity: 666.67 },
  { alpha3: 'GEO', country: 'Georgia', gridIntensity: 167.59 },
  { alpha3: 'DEU', country: 'Germany', gridIntensity: 381.16 },
  { alpha3: 'GHA', country: 'Ghana', gridIntensity: 484 },
  { alpha3: 'GRC', country: 'Greece', gridIntensity: 336.57 },
  { alpha3: 'GRL', country: 'Greenland', gridIntensity: 178.57 },
  { alpha3: 'GRD', country: 'Grenada', gridIntensity: 640 },
  { alpha3: 'GLP', country: 'Guadeloupe', gridIntensity: 500 },
  { alpha3: 'GUM', country: 'Guam', gridIntensity: 622.86 },
  { alpha3: 'GTM', country: 'Guatemala', gridIntensity: 328.27 },
  { alpha3: 'GIN', country: 'Guinea', gridIntensity: 236.84 },
  { alpha3: 'GNB', country: 'Guinea-Bissau', gridIntensity: 625 },
  { alpha3: 'GUY', country: 'Guyana', gridIntensity: 640.35 },
  { alpha3: 'HTI', country: 'Haiti', gridIntensity: 567.31 },
  { alpha3: 'HND', country: 'Honduras', gridIntensity: 282.27 },
  { alpha3: 'HKG', country: 'Hong Kong', gridIntensity: 699.5 },
  { alpha3: 'HUN', country: 'Hungary', gridIntensity: 204.19 },
  { alpha3: 'ISL', country: 'Iceland', gridIntensity: 27.68 },
  { alpha3: 'IND', country: 'India', gridIntensity: 713.44 },
  { alpha3: 'IDN', country: 'Indonesia', gridIntensity: 682.43 },
  {
    alpha3: 'IRN',
    country: 'Iran, Islamic Republic of',
    gridIntensity: 655.13,
  },
  { alpha3: 'IRQ', country: 'Iraq', gridIntensity: 688.81 },
  { alpha3: 'IRL', country: 'Ireland', gridIntensity: 282.98 },
  { alpha3: 'ISR', country: 'Israel', gridIntensity: 582.93 },
  { alpha3: 'ITA', country: 'Italy', gridIntensity: 330.72 },
  { alpha3: 'JAM', country: 'Jamaica', gridIntensity: 555.56 },
  { alpha3: 'JPN', country: 'Japan', gridIntensity: 485.39 },
  { alpha3: 'JOR', country: 'Jordan', gridIntensity: 540.92 },
  { alpha3: 'KAZ', country: 'Kazakhstan', gridIntensity: 821.39 },
  { alpha3: 'KEN', country: 'Kenya', gridIntensity: 71.2 },
  { alpha3: 'KIR', country: 'Kiribati', gridIntensity: 666.67 },
  { alpha3: 'KWT', country: 'Kuwait', gridIntensity: 649.16 },
  { alpha3: 'KGZ', country: 'Kyrgyzstan', gridIntensity: 147.29 },
  {
    alpha3: 'LAO',
    country: "Lao People's Democratic Republic",
    gridIntensity: 265.51,
  },
  { alpha3: 'LVA', country: 'Latvia', gridIntensity: 123.99 },
  { alpha3: 'LBN', country: 'Lebanon', gridIntensity: 599.01 },
  { alpha3: 'LSO', country: 'Lesotho', gridIntensity: 20 },
  { alpha3: 'LBR', country: 'Liberia', gridIntensity: 227.85 },
  { alpha3: 'LBY', country: 'Libya', gridIntensity: 818.69 },
  { alpha3: 'LTU', country: 'Lithuania', gridIntensity: 160.07 },
  { alpha3: 'LUX', country: 'Luxembourg', gridIntensity: 105.26 },
  { alpha3: 'MAC', country: 'Macao', gridIntensity: 448.98 },
  { alpha3: 'MDG', country: 'Madagascar', gridIntensity: 436.44 },
  { alpha3: 'MWI', country: 'Malawi', gridIntensity: 66.67 },
  { alpha3: 'MYS', country: 'Malaysia', gridIntensity: 605.32 },
  { alpha3: 'MDV', country: 'Maldives', gridIntensity: 611.77 },
  { alpha3: 'MLI', country: 'Mali', gridIntensity: 408 },
  { alpha3: 'MLT', country: 'Malta', gridIntensity: 459.14 },
  { alpha3: 'MTQ', country: 'Martinique', gridIntensity: 523.18 },
  { alpha3: 'MRT', country: 'Mauritania', gridIntensity: 464.71 },
  { alpha3: 'MUS', country: 'Mauritius', gridIntensity: 632.48 },
  { alpha3: 'MEX', country: 'Mexico', gridIntensity: 507.25 },
  { alpha3: 'MDA', country: 'Moldova, Republic of', gridIntensity: 643.46 },
  { alpha3: 'MNG', country: 'Mongolia', gridIntensity: 775.31 },
  { alpha3: 'MNE', country: 'Montenegro', gridIntensity: 418.09 },
  { alpha3: 'MSR', country: 'Montserrat', gridIntensity: 1000 },
  { alpha3: 'MAR', country: 'Morocco', gridIntensity: 624.45 },
  { alpha3: 'MOZ', country: 'Mozambique', gridIntensity: 135.65 },
  { alpha3: 'MMR', country: 'Myanmar', gridIntensity: 436.92 },
  { alpha3: 'NAM', country: 'Namibia', gridIntensity: 59.26 },
  { alpha3: 'NRU', country: 'Nauru', gridIntensity: 750 },
  { alpha3: 'NPL', country: 'Nepal', gridIntensity: 24.44 },
  {
    alpha3: 'NLD',
    country: 'Netherlands, Kingdom of the',
    gridIntensity: 268.48,
  },
  { alpha3: 'NCL', country: 'New Caledonia', gridIntensity: 660.58 },
  { alpha3: 'NZL', country: 'New Zealand', gridIntensity: 112.76 },
  { alpha3: 'NIC', country: 'Nicaragua', gridIntensity: 265.12 },
  { alpha3: 'NER', country: 'Niger', gridIntensity: 670.89 },
  { alpha3: 'NGA', country: 'Nigeria', gridIntensity: 523.25 },
  {
    alpha3: 'PRK',
    country: "Korea, Democratic People's Republic of",
    gridIntensity: 389.59,
  },
  { alpha3: 'MKD', country: 'North Macedonia', gridIntensity: 556.19 },
  { alpha3: 'NOR', country: 'Norway', gridIntensity: 30.05 },
  { alpha3: 'OMN', country: 'Oman', gridIntensity: 564.55 },
  { alpha3: 'PAK', country: 'Pakistan', gridIntensity: 440.61 },
  { alpha3: 'PSE', country: 'Palestine, State of', gridIntensity: 516.13 },
  { alpha3: 'PAN', country: 'Panama', gridIntensity: 161.68 },
  { alpha3: 'PNG', country: 'Papua New Guinea', gridIntensity: 507.25 },
  { alpha3: 'PRY', country: 'Paraguay', gridIntensity: 24.31 },
  { alpha3: 'PER', country: 'Peru', gridIntensity: 266.48 },
  { alpha3: 'POL', country: 'Poland', gridIntensity: 661.93 },
  { alpha3: 'PRT', country: 'Portugal', gridIntensity: 165.55 },
  { alpha3: 'PRI', country: 'Puerto Rico', gridIntensity: 677.96 },
  { alpha3: 'QAT', country: 'Qatar', gridIntensity: 602.5 },
  { alpha3: 'REU', country: 'Réunion', gridIntensity: 572.82 },
  { alpha3: 'ROU', country: 'Romania', gridIntensity: 240.58 },
  { alpha3: 'RUS', country: 'Russian Federation', gridIntensity: 441.04 },
  { alpha3: 'RWA', country: 'Rwanda', gridIntensity: 316.33 },
  { alpha3: 'KNA', country: 'Saint Kitts and Nevis', gridIntensity: 636.36 },
  { alpha3: 'LCA', country: 'Saint Lucia', gridIntensity: 666.67 },
  { alpha3: 'SPM', country: 'Saint Pierre and Miquelon', gridIntensity: 600 },
  {
    alpha3: 'VCT',
    country: 'Saint Vincent and the Grenadines',
    gridIntensity: 529.41,
  },
  { alpha3: 'WSM', country: 'Samoa', gridIntensity: 473.68 },
  { alpha3: 'STP', country: 'Sao Tome and Principe', gridIntensity: 642.86 },
  { alpha3: 'SAU', country: 'Saudi Arabia', gridIntensity: 706.79 },
  { alpha3: 'SEN', country: 'Senegal', gridIntensity: 511.6 },
  { alpha3: 'SRB', country: 'Serbia', gridIntensity: 647.52 },
  { alpha3: 'SYC', country: 'Seychelles', gridIntensity: 564.52 },
  { alpha3: 'SLE', country: 'Sierra Leone', gridIntensity: 50 },
  { alpha3: 'SGP', country: 'Singapore', gridIntensity: 470.78 },
  { alpha3: 'SVK', country: 'Slovakia', gridIntensity: 116.77 },
  { alpha3: 'SVN', country: 'Slovenia', gridIntensity: 231.28 },
  { alpha3: 'SLB', country: 'Solomon Islands', gridIntensity: 700 },
  { alpha3: 'SOM', country: 'Somalia', gridIntensity: 578.95 },
  { alpha3: 'ZAF', country: 'South Africa', gridIntensity: 707.69 },
  { alpha3: 'KOR', country: 'Korea, Republic of', gridIntensity: 430.57 },
  { alpha3: 'SSD', country: 'South Sudan', gridIntensity: 629.03 },
  { alpha3: 'ESP', country: 'Spain', gridIntensity: 174.05 },
  { alpha3: 'LKA', country: 'Sri Lanka', gridIntensity: 509.78 },
  { alpha3: 'SDN', country: 'Sudan', gridIntensity: 263.16 },
  { alpha3: 'SUR', country: 'Suriname', gridIntensity: 349.28 },
  { alpha3: 'SWE', country: 'Sweden', gridIntensity: 40.7 },
  { alpha3: 'CHE', country: 'Switzerland', gridIntensity: 34.68 },
  { alpha3: 'SYR', country: 'Syrian Arab Republic', gridIntensity: 701.66 },
  {
    alpha3: 'TWN',
    country: 'Taiwan, Province of China',
    gridIntensity: 650.73,
  },
  { alpha3: 'TJK', country: 'Tajikistan', gridIntensity: 116.86 },
  {
    alpha3: 'TZA',
    country: 'Tanzania, United Republic of',
    gridIntensity: 339.25,
  },
  { alpha3: 'THA', country: 'Thailand', gridIntensity: 549.61 },
  { alpha3: 'PHL', country: 'Philippines', gridIntensity: 610.74 },
  { alpha3: 'TGO', country: 'Togo', gridIntensity: 443.18 },
  { alpha3: 'TON', country: 'Tonga', gridIntensity: 625 },
  { alpha3: 'TTO', country: 'Trinidad and Tobago', gridIntensity: 681.53 },
  { alpha3: 'TUN', country: 'Tunisia', gridIntensity: 563.96 },
  { alpha3: 'TUR', country: 'Türkiye', gridIntensity: 464.59 },
  { alpha3: 'TKM', country: 'Turkmenistan', gridIntensity: 1306.03 },
  { alpha3: 'TCA', country: 'Turks and Caicos Islands', gridIntensity: 653.85 },
  { alpha3: 'UGA', country: 'Uganda', gridIntensity: 44.53 },
  { alpha3: 'UKR', country: 'Ukraine', gridIntensity: 259.69 },
  { alpha3: 'ARE', country: 'United Arab Emirates', gridIntensity: 561.14 },
  {
    alpha3: 'GBR',
    country: 'United Kingdom of Great Britain and Northern Ireland',
    gridIntensity: 237.59,
  },
  { alpha3: 'USA', country: 'United States of America', gridIntensity: 369.47 },
  { alpha3: 'URY', country: 'Uruguay', gridIntensity: 128.79 },
  { alpha3: 'UZB', country: 'Uzbekistan', gridIntensity: 1167.6 },
  { alpha3: 'VUT', country: 'Vanuatu', gridIntensity: 571.43 },
  {
    alpha3: 'VEN',
    country: 'Venezuela, Bolivarian Republic of',
    gridIntensity: 185.8,
  },
  { alpha3: 'VNM', country: 'Viet Nam', gridIntensity: 475.45 },
  { alpha3: 'VGB', country: 'Virgin Islands (British)', gridIntensity: 647.06 },
  { alpha3: 'VIR', country: 'Virgin Islands (U.S.)', gridIntensity: 632.35 },
  { alpha3: 'YEM', country: 'Yemen', gridIntensity: 566.1 },
  { alpha3: 'ZMB', country: 'Zambia', gridIntensity: 111.97 },
  { alpha3: 'ZWE', country: 'Zimbabwe', gridIntensity: 297.87 },
];
