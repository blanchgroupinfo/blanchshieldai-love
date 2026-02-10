// Creator's Calendar Data - Based on 2013 Excel Template
// Anchor: March 17, 2013 (Gregorian) = Day 1, Month 1
// A day begins at Dawn/Sunrise - Before the Equilux
// Following the Most High AHAYAH & YASHAYA the True Messiah

export interface CalendarMonth {
  monthNumber: number;
  hebrewName: string;
  gregorianMonths: string;
  days: number;
}

export interface Feast {
  id: string;
  name: string;
  hebrewName: string;
  month: number;
  day: number;
  endDay: number;
  description: string;
  type: 'holy-day' | 'fast' | 'feast' | 'sabbath' | 'new-month';
  noWork: boolean;
  scriptures: string[];
}

export interface Scripture {
  verse: string;
  reference: string;
  category: 'light' | 'commandments' | 'truth' | 'sabbath' | 'calendar';
}

// Year start dates based on Excel templates (Gregorian date when Creator Calendar year begins)
// The year starts when the day begins at Dawn, before the Equilux
export const YEAR_START_DATES: Record<number, { month: number; day: number }> = {
  2013: { month: 3, day: 17 },  // March 17, 2013 - ANCHOR YEAR
  2014: { month: 3, day: 5 },
  2015: { month: 3, day: 23 },
  2016: { month: 3, day: 11 },
  2017: { month: 3, day: 30 },
  2018: { month: 3, day: 18 },
  2019: { month: 3, day: 7 },
  2020: { month: 3, day: 25 },
  2021: { month: 3, day: 14 },
  2022: { month: 3, day: 3 },
  2023: { month: 3, day: 21 },
  2024: { month: 3, day: 9 },
  2025: { month: 3, day: 2 },   // From 2025 Excel template
  2026: { month: 3, day: 17 },
  2027: { month: 3, day: 6 },
  2028: { month: 3, day: 24 },
  2029: { month: 3, day: 13 },
  2030: { month: 3, day: 2 },
};

// Hebrew Day Names - as shown in Excel template
export const hebrewDayNames = [
  { day: 1, hebrew: "YAWAM ACHAD", meaning: "First Day" },
  { day: 2, hebrew: "YAWAM SHANAY", meaning: "Second Day" },
  { day: 3, hebrew: "YAWAM SHALAYASHAYA", meaning: "Third Day" },
  { day: 4, hebrew: "YAWAM RABAYAIY", meaning: "Fourth Day" },
  { day: 5, hebrew: "YAWAM HAMAYASHAYA", meaning: "Fifth Day" },
  { day: 6, hebrew: "YAWAM SHASHAY", meaning: "Sixth Day" },
  { day: 7, hebrew: "SHABBAT", meaning: "Sabbath Day" },
];

// 12 Months - Named by number as commanded by the Most High AHAYAH
// The Most High did not name months - simply Month 1 through Month 12
export const calendarMonths: CalendarMonth[] = [
  { monthNumber: 1, hebrewName: "Month 1", gregorianMonths: "March/April", days: 30 },
  { monthNumber: 2, hebrewName: "Month 2", gregorianMonths: "April/May", days: 30 },
  { monthNumber: 3, hebrewName: "Month 3", gregorianMonths: "May/June", days: 30 },
  { monthNumber: 4, hebrewName: "Month 4", gregorianMonths: "June/July", days: 30 },
  { monthNumber: 5, hebrewName: "Month 5", gregorianMonths: "July/August", days: 30 },
  { monthNumber: 6, hebrewName: "Month 6", gregorianMonths: "August/September", days: 30 },
  { monthNumber: 7, hebrewName: "Month 7", gregorianMonths: "September/October", days: 30 },
  { monthNumber: 8, hebrewName: "Month 8", gregorianMonths: "October/November", days: 30 },
  { monthNumber: 9, hebrewName: "Month 9", gregorianMonths: "November/December", days: 30 },
  { monthNumber: 10, hebrewName: "Month 10", gregorianMonths: "December/January", days: 30 },
  { monthNumber: 11, hebrewName: "Month 11", gregorianMonths: "January/February", days: 30 },
  { monthNumber: 12, hebrewName: "Month 12", gregorianMonths: "February/March", days: 30 },
];

// Holy Days, Feasts, and Fasts
export const feasts: Feast[] = [
  // 1st Month - Abib/Nisan
  { 
    id: "new-year",
    name: "New Year / New Month", 
    hebrewName: "Rosh Hashanah / Hadash", 
    month: 1, 
    day: 1, 
    endDay: 1,
    description: "Beginning of months, beginning of the year", 
    type: "new-month",
    noWork: false,
    scriptures: ["Exodus 12:2", "Numbers 10:10", "Exodus 40"]
  },
  { 
    id: "passover",
    name: "Passover", 
    hebrewName: "Hag Pesach", 
    month: 1, 
    day: 14, 
    endDay: 14,
    description: "Memorial of deliverance from Egypt - at even", 
    type: "holy-day",
    noWork: true,
    scriptures: ["Exodus 12:6", "Leviticus 23:5", "Numbers 9:2-3"]
  },
  { 
    id: "unleavened-bread",
    name: "Feast of Unleavened Bread", 
    hebrewName: "Hag Matzah", 
    month: 1, 
    day: 15, 
    endDay: 21,
    description: "Seven days of unleavened bread - No leaven in homes", 
    type: "feast",
    noWork: true,
    scriptures: ["Exodus 12:15-20", "Leviticus 23:6-8", "Numbers 28:17-25"]
  },
  { 
    id: "wave-sheaf",
    name: "Wave Sheaf / First Fruits", 
    hebrewName: "Nawap Amar / Bakawar", 
    month: 1, 
    day: 16, 
    endDay: 16,
    description: "Wave offering of first fruits", 
    type: "holy-day",
    noWork: false,
    scriptures: ["Leviticus 23:10-14"]
  },
  
  // 2nd Month - Zif/Iyyar
  { 
    id: "month-2",
    name: "New Month", 
    hebrewName: "Hadash", 
    month: 2, 
    day: 1, 
    endDay: 1,
    description: "Second month begins", 
    type: "new-month",
    noWork: false,
    scriptures: ["Numbers 10:10"]
  },
  { 
    id: "second-passover",
    name: "Second Passover", 
    hebrewName: "Pesach Sheni", 
    month: 2, 
    day: 14, 
    endDay: 14,
    description: "For those who could not keep first Passover", 
    type: "holy-day",
    noWork: false,
    scriptures: ["Numbers 9:10-11"]
  },
  
  // 3rd Month - Sivan
  { 
    id: "month-3",
    name: "New Month", 
    hebrewName: "Hadash", 
    month: 3, 
    day: 1, 
    endDay: 1,
    description: "Third month begins", 
    type: "new-month",
    noWork: false,
    scriptures: ["Numbers 10:10"]
  },
  { 
    id: "pentecost",
    name: "Feast of Pentecost / Weeks", 
    hebrewName: "Hag Shavuot", 
    month: 3, 
    day: 3, 
    endDay: 4,
    description: "Feast of First Fruits, Feast of Harvest - 50 days after Wave Sheaf", 
    type: "feast",
    noWork: true,
    scriptures: ["Leviticus 23:15-21", "Exodus 34:22", "Deuteronomy 16:10"]
  },
  
  // 4th Month - Tammuz
  { 
    id: "month-4",
    name: "New Month", 
    hebrewName: "Hadash", 
    month: 4, 
    day: 1, 
    endDay: 1,
    description: "Fourth month begins", 
    type: "new-month",
    noWork: false,
    scriptures: ["Numbers 10:10"]
  },
  { 
    id: "fast-4",
    name: "Fourth Month Fast", 
    hebrewName: "Tzom Tammuz", 
    month: 4, 
    day: 10, 
    endDay: 10,
    description: "Fast day - at even to even, no work", 
    type: "fast",
    noWork: true,
    scriptures: ["Zechariah 8:19"]
  },
  
  // 5th Month - Ab
  { 
    id: "month-5",
    name: "New Month", 
    hebrewName: "Hadash", 
    month: 5, 
    day: 1, 
    endDay: 1,
    description: "Fifth month begins", 
    type: "new-month",
    noWork: false,
    scriptures: ["Numbers 10:10"]
  },
  { 
    id: "fast-5",
    name: "Fifth Month Fast", 
    hebrewName: "Tzom Ab", 
    month: 5, 
    day: 10, 
    endDay: 10,
    description: "Fast day - at even to even, no work", 
    type: "fast",
    noWork: true,
    scriptures: ["Zechariah 8:19"]
  },
  
  // 6th Month - Elul
  { 
    id: "month-6",
    name: "New Month", 
    hebrewName: "Hadash", 
    month: 6, 
    day: 1, 
    endDay: 1,
    description: "Sixth month begins", 
    type: "new-month",
    noWork: false,
    scriptures: ["Numbers 10:10"]
  },
  
  // 7th Month - Ethanim/Tishri
  { 
    id: "trumpets",
    name: "Feast of Trumpets", 
    hebrewName: "Yom Teruah", 
    month: 7, 
    day: 1, 
    endDay: 1,
    description: "Day of blowing trumpets - Holy convocation", 
    type: "holy-day",
    noWork: true,
    scriptures: ["Leviticus 23:24-25", "Numbers 29:1"]
  },
  { 
    id: "atonement",
    name: "Day of Atonement", 
    hebrewName: "Yom Kippur", 
    month: 7, 
    day: 10, 
    endDay: 10,
    description: "Most holy day of fasting and repentance - afflict your souls", 
    type: "holy-day",
    noWork: true,
    scriptures: ["Leviticus 23:27-32", "Leviticus 16", "Numbers 29:7"]
  },
  { 
    id: "tabernacles",
    name: "Feast of Tabernacles", 
    hebrewName: "Hag Sukkot", 
    month: 7, 
    day: 15, 
    endDay: 21,
    description: "Seven days dwelling in booths - rejoicing before AHAYAH", 
    type: "feast",
    noWork: true,
    scriptures: ["Leviticus 23:34-36", "Numbers 29:12", "Deuteronomy 16:13-15"]
  },
  { 
    id: "last-great-day",
    name: "Last Great Day", 
    hebrewName: "Shemini Atzeret", 
    month: 7, 
    day: 22, 
    endDay: 22,
    description: "Eighth day holy assembly", 
    type: "holy-day",
    noWork: true,
    scriptures: ["Leviticus 23:36", "Numbers 29:35", "John 7:37"]
  },
  
  // 8th Month - Bul/Cheshvan
  { 
    id: "month-8",
    name: "New Month", 
    hebrewName: "Hadash", 
    month: 8, 
    day: 1, 
    endDay: 1,
    description: "Eighth month begins", 
    type: "new-month",
    noWork: false,
    scriptures: ["Numbers 10:10"]
  },
  
  // 9th Month - Kislev
  { 
    id: "month-9",
    name: "New Month", 
    hebrewName: "Hadash", 
    month: 9, 
    day: 1, 
    endDay: 1,
    description: "Ninth month begins", 
    type: "new-month",
    noWork: false,
    scriptures: ["Numbers 10:10"]
  },
  { 
    id: "dedication",
    name: "Feast of Dedication", 
    hebrewName: "Hanukkah", 
    month: 9, 
    day: 25, 
    endDay: 25,
    description: "Dedication of the Temple", 
    type: "feast",
    noWork: false,
    scriptures: ["John 10:22"]
  },
  
  // 10th Month - Tebeth
  { 
    id: "month-10",
    name: "New Month", 
    hebrewName: "Hadash", 
    month: 10, 
    day: 1, 
    endDay: 1,
    description: "Tenth month begins", 
    type: "new-month",
    noWork: false,
    scriptures: ["Numbers 10:10"]
  },
  { 
    id: "fast-10",
    name: "Tenth Month Fast", 
    hebrewName: "Tzom Tebeth", 
    month: 10, 
    day: 10, 
    endDay: 10,
    description: "Fast day", 
    type: "fast",
    noWork: true,
    scriptures: ["Zechariah 8:19"]
  },
  
  // 11th Month - Shebat
  { 
    id: "month-11",
    name: "New Month", 
    hebrewName: "Hadash", 
    month: 11, 
    day: 1, 
    endDay: 1,
    description: "Eleventh month begins", 
    type: "new-month",
    noWork: false,
    scriptures: ["Numbers 10:10"]
  },
  
  // 12th Month - Adar
  { 
    id: "month-12",
    name: "New Month", 
    hebrewName: "Hadash", 
    month: 12, 
    day: 1, 
    endDay: 1,
    description: "Twelfth month begins", 
    type: "new-month",
    noWork: false,
    scriptures: ["Numbers 10:10"]
  },
  { 
    id: "purim",
    name: "Feast of Purim", 
    hebrewName: "Purim", 
    month: 12, 
    day: 14, 
    endDay: 15,
    description: "Remembrance of deliverance in Persia", 
    type: "feast",
    noWork: false,
    scriptures: ["Esther 9:21-22"]
  },
];

// Scripture References for the Calendar
export const calendarScriptures: Scripture[] = [
  // Calendar Foundation
  { verse: "This month shall be unto you the beginning of months: it shall be the first month of the year to you.", reference: "Exodus 12:2", category: "calendar" },
  { verse: "In the beginning AHAYAH created the heaven and the earth.", reference: "Genesis 1:1", category: "calendar" },
  { verse: "And AHAYAH said, Let there be light: and there was light.", reference: "Genesis 1:3", category: "light" },
  { verse: "And AHAYAH called the light Day, and the darkness he called Night. And the evening and the morning were the first day.", reference: "Genesis 1:5", category: "calendar" },
  
  // Day begins at Dawn/Sunrise
  { verse: "In the end of the sabbath, as it began to dawn toward the first day of the week, came Mary Magdalene and the other Mary to see the sepulchre.", reference: "Matthew 28:1", category: "sabbath" },
  { verse: "And very early in the morning the first day of the week, they came unto the sepulchre at the rising of the sun.", reference: "Mark 16:2", category: "sabbath" },
  { verse: "And that day was the preparation, and the sabbath drew on.", reference: "Luke 23:54", category: "sabbath" },
  { verse: "The sun ariseth, they gather themselves together, and lay them down in their dens. Man goeth forth unto his work and to his labour until the evening.", reference: "Psalms 104:22-23", category: "calendar" },
  { verse: "Yashaya answered, Are there not twelve hours in the day? If any man walk in the day, he stumbleth not, because he seeth the light of this world.", reference: "John 11:9", category: "light" },
  
  // Light and Truth
  { verse: "AHAYAH is a Spirit: and they that worship him must worship him in spirit and in truth.", reference: "John 4:24", category: "truth" },
  { verse: "Yashaya saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.", reference: "John 14:6", category: "truth" },
  { verse: "For the commandment is a lamp; and the law is light; and reproofs of instruction are the way of life.", reference: "Proverbs 6:23", category: "commandments" },
  { verse: "Thy righteousness is an everlasting righteousness, and thy law is the truth.", reference: "Psalms 119:142", category: "truth" },
  { verse: "Thou art near, O AHAYAH; and all thy commandments are truth.", reference: "Psalms 119:151", category: "commandments" },
  
  // Commandments and Love
  { verse: "By this we know that we love the children of AHAYAH when we love AHAYAH, and keep his commandments.", reference: "1 John 5:2", category: "commandments" },
  { verse: "For this is the love of AHAYAH, that we keep his commandments: and his commandments are not grievous.", reference: "1 John 5:3", category: "commandments" },
  { verse: "And this is love, that we walk after his commandments. This is the commandment, That, as ye have heard from the beginning, ye should walk in it.", reference: "2 John 1:6", category: "commandments" },
  
  // Scripture Study
  { verse: "All scripture is given by inspiration of AHAYAH, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness.", reference: "2 Timothy 3:16", category: "truth" },
  { verse: "That the man of AHAYAH may be perfect, throughly furnished unto all good works.", reference: "2 Timothy 3:17", category: "truth" },
  { verse: "Study to shew thyself approved unto AHAYAH, a workman that needeth not to be ashamed, rightly dividing the word of truth.", reference: "2 Timothy 2:15", category: "truth" },
  
  // Light of the World
  { verse: "Ye are the light of the world. A city that is set on an hill cannot be hid.", reference: "Matthew 5:14", category: "light" },
  { verse: "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.", reference: "Matthew 5:16", category: "light" },
  { verse: "The light of the body is the eye: if therefore thine eye be single, thy whole body shall be full of light.", reference: "Matthew 6:22", category: "light" },
  { verse: "Then Yashaya said unto them, Yet a little while is the light with you. Walk while ye have the light, lest darkness come upon you.", reference: "John 12:35", category: "light" },
  { verse: "I am come a light into the world, that whosoever believeth on me should not abide in darkness.", reference: "John 12:46", category: "light" },
  
  // Children of Light
  { verse: "Ye are all the children of light, and the children of the day: we are not of the night, nor of darkness.", reference: "1 Thessalonians 5:5", category: "light" },
  { verse: "For ye were sometimes darkness, but now are ye light in AHAYAH: walk as children of light.", reference: "Ephesians 5:8", category: "light" },
  { verse: "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light.", reference: "1 Peter 2:9", category: "light" },
  { verse: "This then is the message which we have heard of him, and declare unto you, that AHAYAH is light, and in him is no darkness at all.", reference: "1 John 1:5", category: "light" },
  { verse: "But if we walk in the light, as he is in the light, we have fellowship one with another, and the blood of Yashaya Messiah his Son cleanseth us from all sin.", reference: "1 John 1:7", category: "light" },
  
  // Word and Beginning
  { verse: "In the beginning was the Word, and the Word was with AHAYAH, and the Word was AHAYAH.", reference: "John 1:1", category: "truth" },
  { verse: "All things were made by him; and without him was not any thing made that was made. In him was life; and the life was the light of men.", reference: "John 1:3-4", category: "light" },
  { verse: "And the light shineth in darkness; and the darkness comprehended it not.", reference: "John 1:5", category: "light" },
  
  // Prophecy
  { verse: "For the prophecy came not in old time by the will of man: but holy men of AHAYAH spake as they were moved by the Holy Ghost.", reference: "2 Peter 1:21", category: "truth" },
  { verse: "We have also a more sure word of prophecy; whereunto ye do well that ye take heed, as unto a light that shineth in a dark place, until the day dawn, and the day star arise in your hearts.", reference: "2 Peter 1:19", category: "truth" },
  
  // Truth Walk
  { verse: "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.", reference: "3 John 1:2", category: "truth" },
  { verse: "For I rejoiced greatly, when the brethren came and testified of the truth that is in thee, even as thou walkest in the truth.", reference: "3 John 1:3", category: "truth" },
  { verse: "I have no greater joy than to hear that my children walk in truth.", reference: "3 John 1:4", category: "truth" },
  
  // Messiah
  { verse: "The beginning of the gospel of Yashaya Christ, the Son of AHAYAH.", reference: "Mark 1:1", category: "truth" },
  { verse: "In the day when AHAYAH shall judge the secrets of men by YASHAYA Messiah according to my gospel.", reference: "Romans 2:16", category: "truth" },
  { verse: "Be ye followers of me, even as I also am of Messiah.", reference: "1 Corinthians 11:1", category: "truth" },
  { verse: "But is now made manifest by the appearing of our Saviour Yashaya Messiah, who hath abolished death, and hath brought life and immortality to light through the gospel.", reference: "2 Timothy 1:10", category: "light" },
];

// Get year start date for any year
export const getYearStartDate = (year: number): { month: number; day: number } => {
  if (YEAR_START_DATES[year]) {
    return YEAR_START_DATES[year];
  }
  
  // For years not explicitly defined, calculate based on 12-year cycle pattern
  const cycleLength = 12;
  const referenceYear = 2013;
  const yearDiff = year - referenceYear;
  const cyclePosition = ((yearDiff % cycleLength) + cycleLength) % cycleLength;
  
  // Known cycle positions from 2013-2024
  const cycleStarts = [17, 5, 23, 11, 30, 18, 7, 25, 14, 3, 21, 9];
  
  return { month: 3, day: cycleStarts[cyclePosition] };
};

// Helper function to get feasts for a specific month and day
export const getFeastsForDay = (month: number, day: number): Feast[] => {
  return feasts.filter(feast => {
    if (feast.month !== month) return false;
    return day >= feast.day && day <= feast.endDay;
  });
};

// Helper function to get the Gregorian date for a Creator's Calendar date
export const getGregorianDate = (year: number, month: number, day: number): Date => {
  const yearStart = getYearStartDate(year);
  const startDate = new Date(year, yearStart.month - 1, yearStart.day);
  
  // Calculate days from year start (month-1)*30 + (day-1)
  const daysFromStart = (month - 1) * 30 + (day - 1);
  startDate.setDate(startDate.getDate() + daysFromStart);
  
  return startDate;
};

// Helper to format Gregorian date
export const formatGregorianDate = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

// Get Hebrew day name for a calendar day
export const getHebrewDayName = (day: number): typeof hebrewDayNames[0] => {
  const dayOfWeek = ((day - 1) % 7);
  return hebrewDayNames[dayOfWeek];
};

// Check if a day is a Sabbath (7th day of each week)
export const isSabbath = (day: number): boolean => {
  return ((day - 1) % 7) === 6;
};

// Sun time calculation (simplified - for more accuracy use astronomy library)
export const calculateSunTimes = (date: Date, latitude: number, longitude: number) => {
  // Convert to Julian Date
  const JD = Math.floor(365.25 * (date.getFullYear() + 4716)) + 
             Math.floor(30.6001 * ((date.getMonth() + 1) + 1)) + 
             date.getDate() + 2 - 1524.5;
  
  // Julian century
  const T = (JD - 2451545) / 36525;
  
  // Sun's mean longitude
  const L0 = (280.46646 + T * (36000.76983 + 0.0003032 * T)) % 360;
  
  // Sun's mean anomaly
  const M = (357.52911 + T * (35999.05029 - 0.0001537 * T)) % 360;
  const Mrad = M * Math.PI / 180;
  
  // Equation of center
  const C = (1.914602 - T * (0.004817 + 0.000014 * T)) * Math.sin(Mrad) +
            (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) +
            0.000289 * Math.sin(3 * Mrad);
  
  // Sun's true longitude
  const sunLong = L0 + C;
  
  // Sun's apparent longitude
  const omega = 125.04 - 1934.136 * T;
  const lambda = sunLong - 0.00569 - 0.00478 * Math.sin(omega * Math.PI / 180);
  
  // Obliquity of ecliptic
  const epsilon = 23.439 - 0.00000036 * (JD - 2451545);
  const epsilonRad = epsilon * Math.PI / 180;
  
  // Sun's declination
  const decl = Math.asin(Math.sin(epsilonRad) * Math.sin(lambda * Math.PI / 180));
  
  // Hour angle
  const latRad = latitude * Math.PI / 180;
  
  // Calculate different sun positions
  const sunriseAngle = -0.833; // Standard sunrise/sunset
  const civilTwilightAngle = -6;
  const nauticalTwilightAngle = -12;
  
  const calculateHourAngle = (angle: number) => {
    const cosH = (Math.sin(angle * Math.PI / 180) - Math.sin(latRad) * Math.sin(decl)) /
                 (Math.cos(latRad) * Math.cos(decl));
    if (cosH < -1 || cosH > 1) return null;
    return Math.acos(cosH) * 180 / Math.PI;
  };
  
  const sunriseHA = calculateHourAngle(sunriseAngle);
  const dawnHA = calculateHourAngle(civilTwilightAngle);
  
  // Equation of time (minutes)
  const B = (360 / 365) * (date.getDate() - 81) * Math.PI / 180;
  const EoT = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
  
  // Solar noon
  const solarNoon = 720 - 4 * longitude - EoT;
  const timezoneOffset = -date.getTimezoneOffset();
  const solarNoonLocal = solarNoon + timezoneOffset;
  
  const formatTime = (minutes: number | null): string => {
    if (minutes === null) return '--:--';
    const hrs = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    const period = hrs >= 12 ? 'PM' : 'AM';
    const displayHrs = hrs > 12 ? hrs - 12 : (hrs === 0 ? 12 : hrs);
    return `${displayHrs}:${mins.toString().padStart(2, '0')} ${period}`;
  };
  
  return {
    dawn: formatTime(dawnHA ? solarNoonLocal - dawnHA * 4 : null),
    sunrise: formatTime(sunriseHA ? solarNoonLocal - sunriseHA * 4 : null),
    solarNoon: formatTime(solarNoonLocal),
    sunset: formatTime(sunriseHA ? solarNoonLocal + sunriseHA * 4 : null),
    dusk: formatTime(dawnHA ? solarNoonLocal + dawnHA * 4 : null),
  };
};
