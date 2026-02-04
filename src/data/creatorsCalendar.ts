// Creator's Calendar Data - Based on 2013 Template
// A day begins at Dawn/Sunrise

export interface CalendarMonth {
  monthNumber: number;
  hebrewName: string;
  gregorianMonths: string;
  startDate: { month: number; day: number };
  days: number;
}

export interface Feast {
  name: string;
  hebrewName: string;
  month: number;
  day: number | string;
  description: string;
  type: 'holy-day' | 'fast' | 'feast' | 'sabbath' | 'new-month';
  noWork?: boolean;
}

export interface Scripture {
  verse: string;
  reference: string;
  category: 'light' | 'commandments' | 'truth' | 'sabbath' | 'calendar';
}

// Hebrew Day Names
export const hebrewDayNames = [
  { day: 1, hebrew: "YAWAM ACHAD", meaning: "First Day" },
  { day: 2, hebrew: "YAWAM SHANAY", meaning: "Second Day" },
  { day: 3, hebrew: "YAWAM SHALAYASHAYA", meaning: "Third Day" },
  { day: 4, hebrew: "YAWAM RABAYAIY", meaning: "Fourth Day" },
  { day: 5, hebrew: "YAWAM HAMAYASHAYA", meaning: "Fifth Day" },
  { day: 6, hebrew: "YAWAM SHASHAY", meaning: "Sixth Day" },
  { day: 7, hebrew: "SHABBAT", meaning: "Sabbath Day" },
];

// 12 Months of the Creator's Calendar (based on 2013 template)
export const calendarMonths: CalendarMonth[] = [
  { monthNumber: 1, hebrewName: "Abib/Nisan", gregorianMonths: "March/April", startDate: { month: 3, day: 16 }, days: 30 },
  { monthNumber: 2, hebrewName: "Zif/Iyyar", gregorianMonths: "April/May", startDate: { month: 4, day: 15 }, days: 30 },
  { monthNumber: 3, hebrewName: "Sivan", gregorianMonths: "May/June", startDate: { month: 5, day: 15 }, days: 30 },
  { monthNumber: 4, hebrewName: "Tammuz", gregorianMonths: "June/July", startDate: { month: 6, day: 15 }, days: 30 },
  { monthNumber: 5, hebrewName: "Ab", gregorianMonths: "July/August", startDate: { month: 7, day: 15 }, days: 30 },
  { monthNumber: 6, hebrewName: "Elul", gregorianMonths: "August/September", startDate: { month: 8, day: 14 }, days: 30 },
  { monthNumber: 7, hebrewName: "Ethanim/Tishri", gregorianMonths: "September/October", startDate: { month: 9, day: 13 }, days: 30 },
  { monthNumber: 8, hebrewName: "Bul/Cheshvan", gregorianMonths: "October/November", startDate: { month: 10, day: 13 }, days: 30 },
  { monthNumber: 9, hebrewName: "Kislev", gregorianMonths: "November/December", startDate: { month: 11, day: 12 }, days: 30 },
  { monthNumber: 10, hebrewName: "Tebeth", gregorianMonths: "December/January", startDate: { month: 12, day: 12 }, days: 30 },
  { monthNumber: 11, hebrewName: "Shebat", gregorianMonths: "January/February", startDate: { month: 1, day: 11 }, days: 30 },
  { monthNumber: 12, hebrewName: "Adar", gregorianMonths: "February/March", startDate: { month: 2, day: 10 }, days: 30 },
];

// Holy Days, Feasts, and Fasts
export const feasts: Feast[] = [
  // 1st Month - Abib
  { name: "New Year / New Month", hebrewName: "Rosh Hashanah / Hadash", month: 1, day: 1, description: "Beginning of months, beginning of the year", type: "new-month" },
  { name: "Passover", hebrewName: "Hag Pesach", month: 1, day: 14, description: "Memorial of deliverance from Egypt", type: "holy-day", noWork: true },
  { name: "Feast of Unleavened Bread", hebrewName: "Hag Matzah", month: 1, day: "15-21", description: "Seven days of unleavened bread - No leaven in homes", type: "feast", noWork: true },
  { name: "Wave Sheaf / First Fruits", hebrewName: "Nawap Amar / Bakawar", month: 1, day: 16, description: "Wave offering of first fruits", type: "holy-day" },
  
  // 2nd Month - Zif
  { name: "New Month", hebrewName: "Hadash", month: 2, day: 1, description: "Second month begins", type: "new-month" },
  { name: "Second Passover", hebrewName: "Pesach Sheni", month: 2, day: 14, description: "For those who could not keep first Passover", type: "holy-day" },
  
  // 3rd Month - Sivan
  { name: "New Month", hebrewName: "Hadash", month: 3, day: 1, description: "Third month begins", type: "new-month" },
  { name: "Feast of Pentecost / Weeks", hebrewName: "Hag Shavuot", month: 3, day: 6, description: "Feast of First Fruits, Feast of Harvest - 50 days after Wave Sheaf", type: "feast", noWork: true },
  
  // 4th Month - Tammuz
  { name: "New Month", hebrewName: "Hadash", month: 4, day: 1, description: "Fourth month begins", type: "new-month" },
  { name: "Fourth Month Fast", hebrewName: "Tzom Tammuz", month: 4, day: 10, description: "Fast day - at even to even, no work", type: "fast", noWork: true },
  
  // 5th Month - Ab
  { name: "New Month", hebrewName: "Hadash", month: 5, day: 1, description: "Fifth month begins", type: "new-month" },
  { name: "Fifth Month Fast", hebrewName: "Tzom Ab", month: 5, day: 10, description: "Fast day - at even to even, no work", type: "fast", noWork: true },
  
  // 6th Month - Elul
  { name: "New Month", hebrewName: "Hadash", month: 6, day: 1, description: "Sixth month begins", type: "new-month" },
  
  // 7th Month - Ethanim/Tishri
  { name: "Feast of Trumpets", hebrewName: "Yom Teruah", month: 7, day: 1, description: "Day of blowing trumpets - Holy convocation", type: "holy-day", noWork: true },
  { name: "Day of Atonement", hebrewName: "Yom Kippur", month: 7, day: 10, description: "Most holy day of fasting and repentance - afflict your souls", type: "holy-day", noWork: true },
  { name: "Feast of Tabernacles", hebrewName: "Hag Sukkot", month: 7, day: "15-21", description: "Seven days dwelling in booths - rejoicing before AHAYAH", type: "feast", noWork: true },
  { name: "Last Great Day", hebrewName: "Shemini Atzeret", month: 7, day: 22, description: "Eighth day holy assembly", type: "holy-day", noWork: true },
  
  // 8th Month - Bul
  { name: "New Month", hebrewName: "Hadash", month: 8, day: 1, description: "Eighth month begins", type: "new-month" },
  
  // 9th Month - Kislev
  { name: "New Month", hebrewName: "Hadash", month: 9, day: 1, description: "Ninth month begins", type: "new-month" },
  { name: "Feast of Dedication", hebrewName: "Hanukkah", month: 9, day: 25, description: "Dedication of the Temple", type: "feast" },
  
  // 10th Month - Tebeth
  { name: "New Month", hebrewName: "Hadash", month: 10, day: 1, description: "Tenth month begins", type: "new-month" },
  { name: "Tenth Month Fast", hebrewName: "Tzom Tebeth", month: 10, day: 10, description: "Fast day", type: "fast", noWork: true },
  
  // 11th Month - Shebat
  { name: "New Month", hebrewName: "Hadash", month: 11, day: 1, description: "Eleventh month begins", type: "new-month" },
  
  // 12th Month - Adar
  { name: "New Month", hebrewName: "Hadash", month: 12, day: 1, description: "Twelfth month begins", type: "new-month" },
  { name: "Feast of Purim", hebrewName: "Purim", month: 12, day: "14-15", description: "Remembrance of deliverance in Persia", type: "feast" },
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

// Helper function to get feasts for a specific month and day
export const getFeastsForDay = (month: number, day: number): Feast[] => {
  return feasts.filter(feast => {
    if (feast.month !== month) return false;
    if (typeof feast.day === 'number') {
      return feast.day === day;
    }
    // Handle day ranges like "15-21"
    const [start, end] = feast.day.split('-').map(Number);
    return day >= start && day <= end;
  });
};

// Helper function to get the Gregorian date for a Creator's Calendar date
export const getGregorianDate = (year: number, month: number, day: number): Date => {
  const monthData = calendarMonths.find(m => m.monthNumber === month);
  if (!monthData) return new Date();
  
  // Calculate based on the 2013 anchor year and cycle
  const yearOffset = year - 2013;
  const baseDate = new Date(2013, monthData.startDate.month - 1, monthData.startDate.day);
  baseDate.setFullYear(baseDate.getFullYear() + yearOffset);
  baseDate.setDate(baseDate.getDate() + day - 1);
  
  return baseDate;
};

// Helper to format Gregorian date
export const formatGregorianDate = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()}-${months[date.getMonth()]}`;
};
