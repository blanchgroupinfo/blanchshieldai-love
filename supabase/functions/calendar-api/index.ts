import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// 2013 is the anchor year - March 17, 2013 (Gregorian 3/17/2013) = Day 1 of Month 1
// Day starts at Dawn (Sunrise), before the Equilux
const ANCHOR_YEAR = 2013;
const ANCHOR_MONTH_START = { month: 3, day: 17 }; // March 17, 2013 Gregorian = Day 1 Month 1

// Year start dates based on Excel templates
const YEAR_START_DATES: Record<number, { month: number; day: number }> = {
  2013: { month: 3, day: 17 },  // March 17, 2013
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
  2025: { month: 3, day: 2 },   // From 2025 Excel: March 1, 2025 evening = 3/2/2025
  2026: { month: 3, day: 17 },
  2027: { month: 3, day: 6 },
  2028: { month: 3, day: 24 },
  2029: { month: 3, day: 13 },
  2030: { month: 3, day: 2 },
};

// Holy days and feasts data
const holyDays = [
  // 1st Month - Abib/Nisan
  { 
    id: "new-year",
    name: "New Year / New Month", 
    hebrewName: "Rosh Hashanah / Hadash", 
    month: 1, 
    day: 1, 
    endDay: 1,
    description: "Beginning of months, beginning of the year - Exodus 12:2, Numbers 10:10", 
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
    description: "Seven days of unleavened bread - No leaven in homes, holy convocation on first and last day", 
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
    description: "Wave offering of first fruits - morrow after the sabbath", 
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
    description: "For those who could not keep first Passover (unclean or on journey)", 
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
    description: "Day of blowing trumpets - Holy convocation, memorial of blowing of trumpets", 
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
    description: "Most holy day of fasting and repentance - afflict your souls, no work", 
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
    description: "Seven days dwelling in booths - rejoicing before AHAYAH, holy convocation first day", 
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
    description: "Eighth day holy assembly - solemn assembly", 
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
    description: "Dedication of the Temple - Feast of Lights", 
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
    description: "Fast day - at even to even", 
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
    description: "Remembrance of deliverance in Persia - days of feasting and gladness", 
    type: "feast",
    noWork: false,
    scriptures: ["Esther 9:21-22"]
  },
];

// Hebrew day names
const hebrewDayNames = [
  { day: 1, hebrew: "YAWAM ACHAD", meaning: "First Day" },
  { day: 2, hebrew: "YAWAM SHANAY", meaning: "Second Day" },
  { day: 3, hebrew: "YAWAM SHALAYASHAYA", meaning: "Third Day" },
  { day: 4, hebrew: "YAWAM RABAYAIY", meaning: "Fourth Day" },
  { day: 5, hebrew: "YAWAM HAMAYASHAYA", meaning: "Fifth Day" },
  { day: 6, hebrew: "YAWAM SHASHAY", meaning: "Sixth Day" },
  { day: 7, hebrew: "SHABBAT", meaning: "Sabbath Day" },
];

// Month data
const calendarMonths = [
  { monthNumber: 1, hebrewName: "Abib/Nisan", gregorianMonths: "March/April", days: 30 },
  { monthNumber: 2, hebrewName: "Zif/Iyyar", gregorianMonths: "April/May", days: 30 },
  { monthNumber: 3, hebrewName: "Sivan", gregorianMonths: "May/June", days: 30 },
  { monthNumber: 4, hebrewName: "Tammuz", gregorianMonths: "June/July", days: 30 },
  { monthNumber: 5, hebrewName: "Ab", gregorianMonths: "July/August", days: 30 },
  { monthNumber: 6, hebrewName: "Elul", gregorianMonths: "August/September", days: 30 },
  { monthNumber: 7, hebrewName: "Ethanim/Tishri", gregorianMonths: "September/October", days: 30 },
  { monthNumber: 8, hebrewName: "Bul/Cheshvan", gregorianMonths: "October/November", days: 30 },
  { monthNumber: 9, hebrewName: "Kislev", gregorianMonths: "November/December", days: 30 },
  { monthNumber: 10, hebrewName: "Tebeth", gregorianMonths: "December/January", days: 30 },
  { monthNumber: 11, hebrewName: "Shebat", gregorianMonths: "January/February", days: 30 },
  { monthNumber: 12, hebrewName: "Adar", gregorianMonths: "February/March", days: 30 },
];

// Calculate year start date for any year
function getYearStartDate(year: number): { month: number; day: number } {
  if (YEAR_START_DATES[year]) {
    return YEAR_START_DATES[year];
  }
  
  // For years not explicitly defined, calculate based on cycle
  // The calendar follows a recurring pattern - approximately every 12 years
  const cycleLength = 12;
  const referenceYear = 2013;
  const yearDiff = year - referenceYear;
  const cyclePosition = ((yearDiff % cycleLength) + cycleLength) % cycleLength;
  
  // Known cycle positions from 2013-2024
  const cycleStarts = [17, 5, 23, 11, 30, 18, 7, 25, 14, 3, 21, 9];
  
  return { month: 3, day: cycleStarts[cyclePosition] };
}

// Convert Creator Calendar date to Gregorian
function toGregorian(year: number, month: number, day: number): Date {
  const yearStart = getYearStartDate(year);
  const startDate = new Date(year, yearStart.month - 1, yearStart.day);
  
  // Calculate days from year start
  const daysFromStart = (month - 1) * 30 + (day - 1);
  startDate.setDate(startDate.getDate() + daysFromStart);
  
  return startDate;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname;

    // GET /calendar-api/holy-days or /api/v1/calendar/holy-days
    if ((path.includes('holy-days') || path.endsWith('/holy-days')) && req.method === 'GET') {
      const year = parseInt(url.searchParams.get('year') || new Date().getFullYear().toString());
      const month = url.searchParams.get('month') ? parseInt(url.searchParams.get('month')!) : null;
      
      let filteredHolyDays = holyDays;
      
      if (month !== null) {
        filteredHolyDays = holyDays.filter(hd => hd.month === month);
      }
      
      // Add Gregorian dates to each holy day
      const holyDaysWithDates = filteredHolyDays.map(hd => ({
        ...hd,
        gregorianStartDate: toGregorian(year, hd.month, hd.day).toISOString().split('T')[0],
        gregorianEndDate: toGregorian(year, hd.month, hd.endDay).toISOString().split('T')[0],
      }));

      return new Response(
        JSON.stringify({
          success: true,
          year,
          anchorYear: ANCHOR_YEAR,
          yearStartDate: getYearStartDate(year),
          holyDays: holyDaysWithDates,
          note: "A day begins at Dawn (Sunrise) - Before the Equilux, following AHAYAH & YASHAYA the True Messiah"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // GET /calendar-api/months or /api/v1/calendar/months
    if ((path.includes('months') || path.endsWith('/months')) && req.method === 'GET') {
      const year = parseInt(url.searchParams.get('year') || new Date().getFullYear().toString());
      
      const monthsWithDates = calendarMonths.map(m => ({
        ...m,
        gregorianStartDate: toGregorian(year, m.monthNumber, 1).toISOString().split('T')[0],
        gregorianEndDate: toGregorian(year, m.monthNumber, m.days).toISOString().split('T')[0],
        holyDays: holyDays.filter(hd => hd.month === m.monthNumber),
      }));

      return new Response(
        JSON.stringify({
          success: true,
          year,
          yearStartDate: getYearStartDate(year),
          months: monthsWithDates,
          hebrewDayNames,
          totalDays: 360, // 12 months × 30 days
          note: "Months are numbered 1-12 as commanded by the Most High AHAYAH"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // GET /calendar-api/convert or /api/v1/calendar/convert
    if ((path.includes('convert') || path.endsWith('/convert')) && req.method === 'GET') {
      const year = parseInt(url.searchParams.get('year') || '');
      const month = parseInt(url.searchParams.get('month') || '');
      const day = parseInt(url.searchParams.get('day') || '');
      
      if (!year || !month || !day) {
        return new Response(
          JSON.stringify({ success: false, error: "year, month, and day are required" }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const gregorianDate = toGregorian(year, month, day);
      const dayOfWeek = (day - 1) % 7;
      
      return new Response(
        JSON.stringify({
          success: true,
          creatorCalendar: { year, month, day },
          gregorian: gregorianDate.toISOString().split('T')[0],
          hebrewDayName: hebrewDayNames[dayOfWeek],
          isSabbath: dayOfWeek === 6,
          monthInfo: calendarMonths[month - 1],
          holyDaysOnDate: holyDays.filter(hd => 
            hd.month === month && day >= hd.day && day <= hd.endDay
          ),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // GET /calendar-api/year-info or /api/v1/calendar/year-info
    if ((path.includes('year-info') || path.endsWith('/year-info')) && req.method === 'GET') {
      const year = parseInt(url.searchParams.get('year') || new Date().getFullYear().toString());
      
      return new Response(
        JSON.stringify({
          success: true,
          year,
          yearStartDate: getYearStartDate(year),
          anchorYear: ANCHOR_YEAR,
          totalMonths: 12,
          totalDays: 360,
          monthNames: calendarMonths.map(m => ({ number: m.monthNumber, name: m.hebrewName })),
          hebrewDayNames,
          note: "Based on 2013 Creator Calendar anchor - March 17, 2013 = Day 1, Month 1"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Endpoint not found",
        availableEndpoints: [
          "/api/v1/calendar/holy-days?year=2026&month=1",
          "/api/v1/calendar/months?year=2026",
          "/api/v1/calendar/convert?year=2026&month=1&day=14",
          "/api/v1/calendar/year-info?year=2026"
        ]
      }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Calendar API Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
