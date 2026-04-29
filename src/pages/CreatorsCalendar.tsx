import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Sun, Moon, Star, Book, Clock, ChevronLeft, ChevronRight, ChevronDown, Sparkles, Sunrise, AlertCircle, Printer, MapPin, Plus, Bell, Search, Navigation, X, Sunset, Edit, Trash2, Download, Megaphone, Volume2, Smartphone, Mail as MailIcon, MessageCircle, Send as SendIcon, Share2, Droplets, Layers, ClipboardCheck, Globe, Zap } from "lucide-react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { calendarMonths, hebrewDayNames, feasts, calendarScriptures, getFeastsForDay, getGregorianDate, formatGregorianDate, getHebrewDayName, isSabbath, getYearStartDate, getSabbathDays, getCreatorDateForGregorian, type Feast } from "@/data/creatorsCalendar";
const scripturesByMonth: { month: string; scriptures: string[] }[] = calendarMonths.map((m, idx) => {
  const start = idx * Math.ceil(calendarScriptures.length / 12);
  const slice = calendarScriptures.slice(start, start + Math.ceil(calendarScriptures.length / 12));
  return { month: m.hebrewName, scriptures: slice.map(s => `${s.verse} (${s.reference})`) };
});
import { useSunTimes } from "@/hooks/useSunTimes";
import { HolyDayReminder, useCalendarEvents } from "@/hooks/useCalendarEvents";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CalendarInsightsWidget } from "@/components/calendar/CalendarInsightsWidget";
import { prayerRequestSchema } from "@/schemas/calendarSchemas";

const offeringsData = [
  {
    title: 'Daily Morning Burnt Offerings',
    description: 'Sunrise - Beginning of the Day',
    icon: '🌅',
    color: 'orange',
    scriptures: ['Numbers 28:3-4 - "Two lambs of the first year without spot day by day, for a continual burnt offering."', 'Numbers 28:5 - "And a tenth part of an ephah of flour for a meat offering, mingled with the fourth part of an hin of beaten oil."', 'Exodus 29:38-42 - The daily morning sacrifice commanded at the door of the tabernacle.', 'Psalm 5:3 - "My voice shalt thou hear in the morning, O LORD; in the morning will I direct my prayer unto thee, and will look up."'],
    studyGuide: 'The morning burnt offering represents the dedication of the day to Most High AHAYAH. It was offered at sunrise, signifying that each new day begins with worship. Study Numbers 28:1-8 for the complete ordinance.'
  },
  {
    title: 'Evening Burnt Offerings',
    description: 'Sunset - End of the Day',
    icon: '🌇',
    color: 'purple',
    scriptures: ['Numbers 28:4 - "The other lamb shalt thou offer at even."', 'Numbers 28:8 - "As the meat offering of the morning, and as the drink offering thereof, thou shalt offer it, a sacrifice made by fire."', '1 Kings 18:36 - "And it came to pass at the time of the offering of the evening sacrifice, that Elijah the prophet came near."', 'Daniel 9:21 - "The man Gabriel... touched me about the time of the evening oblation."'],
    studyGuide: 'The evening sacrifice closes the day in worship. Elijah called upon Most HIgh AHAYAH at the evening sacrifice on Mount Carmel. Study 1 Kings 18:30-39 for the account.'
  },
  {
    title: 'Feast Offerings',
    description: 'Offerings during appointed feasts and holy days',
    icon: '🕊️',
    color: 'green',
    scriptures: ['Numbers 28:11-29:40 - Complete feast offerings for each appointed time.', 'Deuteronomy 16:16-17 - "Three times in a year shall all thy males appear before AHAYAH... they shall not appear before AHAYAH empty."', 'Leviticus 23:37-38 - "These are the feasts of AHAYAH... beside the sabbaths of AHAYAH, and beside your gifts."'],
    studyGuide: 'Each feast has specific offerings. Passover requires a lamb without blemish (Exodus 12). Pentecost includes two wave loaves (Leviticus 23:17). Tabernacles has the most elaborate offerings (Numbers 29:12-38).'
  },
  {
    title: 'Shabbat Offerings',
    description: 'Special offerings on the Seventh Day Sabbath',
    icon: '✡️',
    color: 'amber',
    scriptures: ['Numbers 28:9-10 - "And on the sabbath day two lambs of the first year without spot, and two tenth deals of flour for a meat offering, mingled with oil, and the drink offering thereof."', 'Ezekiel 46:4-5 - "The burnt offering that the prince shall offer unto AHAYAH in the sabbath day shall be six lambs without blemish, and a ram without blemish."', 'Isaiah 58:13-14 - "If thou turn away thy foot from the sabbath, from doing thy pleasure on my holy day..."'],
    studyGuide: 'The Sabbath offering was double the daily offering — two lambs instead of one. This teaches us that the Sabbath is doubly consecrated. Study Numbers 28:9-10 and compare with the daily offering in 28:3-8.'
  },
  {
    title: 'New Month Offerings',
    description: 'Offerings at the beginning of each new month',
    icon: '🌙',
    color: 'blue',
    scriptures: ['Numbers 28:11-15 - "And in the beginnings of your months ye shall offer a burnt offering unto AHAYAH; two young bullocks, and one ram, seven lambs of the first year without spot."', 'Numbers 10:10 - "Also in the day of your gladness, and in your solemn days, and in the beginnings of your months, ye shall blow with the trumpets."', 'Ezekiel 46:6-7 - New month offerings of the prince.'],
    studyGuide: 'New month offerings mark the beginning of each month. The trumpets were blown and special sacrifices offered. Study Numbers 28:11-15 for the complete new month offering ordinance.'
  },
  {
    title: 'Free Will & Peace Offerings',
    description: 'Voluntary offerings of thanksgiving and peace',
    icon: '🙏',
    color: 'green',
    scriptures: ['Leviticus 7:11-18 - "And this is the law of the sacrifice of peace offerings."', 'Leviticus 22:29 - "When ye will offer a sacrifice of thanksgiving unto AHAYAH, offer it at your own will."', 'Deuteronomy 12:6 - "And thither ye shall bring your burnt offerings, and your sacrifices... and your freewill offerings."', 'Psalm 54:6 - "I will freely sacrifice unto thee: I will praise thy name, O Most High AHAYAH; for it is good."'],
    studyGuide: 'Peace offerings were voluntary expressions of gratitude. The offerer ate portions of the sacrifice in a communal meal. Study Leviticus 3 and 7:11-36 for the complete peace offering law.'
  },
  {
    title: 'Sin Offerings',
    description: 'Offerings for atonement of known sins',
    icon: '🔥',
    color: 'red',
    scriptures: ['Leviticus 4:1-35 - The law of the sin offering for priests, congregation, rulers, and common people.', 'Leviticus 6:24-30 - "This is the law of the sin offering: In the place where the burnt offering is killed shall the sin offering be killed before Most High AHAYAH: it is most holy."', 'Hebrews 9:22 - "And almost all things are by the law purged with blood; and without shedding of blood is no remission."'],
    studyGuide: 'The sin offering varied by the status of the offender — a bullock for the priest or congregation, a male goat for a ruler, a female goat or lamb for common people. Study Leviticus 4 in full.'
  },
  {
    title: 'Unintentional Sin Offerings',
    description: 'Offerings for sins committed unknowingly',
    icon: '⚖️',
    color: 'yellow',
    scriptures: ['Numbers 15:27-29 - "And if any soul sin through ignorance, then he shall bring a she goat of the first year for a sin offering."', 'Leviticus 4:2 - "If a soul shall sin through ignorance against any of the commandments of AHAYAH..."', 'Leviticus 5:17-19 - "And if a soul sin, and commit any of these things which are forbidden to be done by the commandments of AHAYAH; though he wist it not, yet is he guilty."'],
    studyGuide: 'Even unintentional sins required atonement. This teaches us the seriousness of sin in Most High AHAYAH\'s eyes. Study Numbers 15:22-29 and Leviticus 5:14-19.'
  },
  {
    title: 'High Priest Offerings',
    description: 'Special offerings made by the High Priest',
    icon: '👑',
    color: 'amber',
    scriptures: ['Leviticus 16:3-6 - "Thus shall Aaron come into the holy place: with a young bullock for a sin offering, and a ram for a burnt offering."', 'Leviticus 16:11-14 - The High Priest\'s sin offering on the Day of Atonement.', 'Hebrews 5:1-3 - "For every high priest taken from among men is ordained for men in things pertaining to God, that he may offer both gifts and sacrifices for sins."'],
    studyGuide: 'The High Priest had unique duties, especially on the Day of Atonement (Yom Kippur). He alone entered the Most Holy Place. Study Leviticus 16 for the complete Atonement ritual.'
  },
  {
    title: 'Tabernacle Offerings',
    description: 'Offerings associated with the Tabernacle service',
    icon: '⛺',
    color: 'blue',
    scriptures: ['Exodus 40:29 - "He put the altar of burnt offering by the door of the tabernacle of the tent of the congregation, and offered upon it the burnt offering and the meat offering."', 'Numbers 7:10-88 - The dedication offerings of the twelve tribal leaders for the tabernacle.', 'Exodus 30:7-8 - "Aaron shall burn thereon sweet incense every morning... and at even."'],
    studyGuide: 'The Tabernacle was the portable dwelling of AHAYAH among His people. Every offering pointed to YASHAYA HA\'MASHIACH. Study Exodus 25-30 for tabernacle construction and service.'
  },
  {
    title: 'Temple Offerings',
    description: 'Offerings associated with the Temple service',
    icon: '🏛️',
    color: 'cyan',
    scriptures: ['1 Kings 8:62-64 - Solomon\'s dedication offerings for the Temple.', '2 Chronicles 7:1-5 - "The fire came down from heaven, and consumed the burnt offering and the sacrifices."', 'Ezekiel 43:18-27 - Future temple altar consecration and offerings.', 'Malachi 3:3-4 - "Then shall the offering of Judah and Jerusalem be pleasant unto Most High AHAYAH."'],
    studyGuide: 'Solomon\'s Temple expanded the Tabernacle\'s service. The Temple offerings will be restored. Study Ezekiel 40-48 for the future Temple and its offerings.'
  }
];

const holyDayRemindersList = [
  { name: 'Holy Days', type: 'holy-day' },
  { name: 'Holy Feasts', type: 'feast' },
  { name: 'Holy Sabbaths', type: 'sabbath' },
  { name: 'New Year', type: 'holy-day' },
  { name: 'New Month', type: 'new-month' },
  { name: 'Morning Prayer at Sunrise', type: 'prayer' },
  { name: 'Noon Prayer at 12:00pm', type: 'prayer' },
  { name: 'Ninth Hour Prayer at 3:00 PM', type: 'prayer' },
  { name: 'Evening Prayer at Sunset', type: 'prayer' },
  { name: 'Passover', type: 'holy-day', details: 'Month 1, Day 14' },
  { name: 'Feast of Unleavened Bread', type: 'holy-day', details: 'Month 1, Day 15' },
  { name: 'Second Passover', type: 'holy-day', details: 'Month 2, Day 14 (3 days)' },
  { name: 'Feast of Pentecost', type: 'holy-day', details: 'Month 3, Day 3' },
  { name: 'Feast of Trumpets', type: 'holy-day', details: 'Month 7, Day 1 (7 days)' },
  { name: 'Day of Atonement - Fast', type: 'holy-day', details: 'Month 7, Day 9 (3 days)' },
  { name: 'Day of Atonement', type: 'holy-day', details: 'Month 7, Day 10' },
  { name: 'Feast of Tabernacles', type: 'holy-day', details: 'Month 7, Day 15 (3 days)' },
  { name: 'Feast of Dedication', type: 'holy-day', details: 'Month 9, Day 25' },
  { name: 'Feast of Dedication (Day 8)', type: 'holy-day', details: 'Month 10, Day 1' },
  { name: 'Day of Nicanor', type: 'holy-day', details: 'Month 12, Day 13' },
  { name: 'Feast of Purim', type: 'holy-day', details: 'Month 12, Day 14' },
];

const trumpetsRemindersList = [
  { name: 'Morning Prayer at Sunrise', type: 'trumpet' },
  { name: 'Noon Prayer at 12:00pm', type: 'trumpet' },
  { name: 'Ninth Hour Prayer at 3:00pm', type: 'trumpet' },
  { name: 'Evening Prayer at Sunset', type: 'trumpet' },
  { name: 'Daily Burnt Offerings at Sunrise and Sunset', type: 'trumpet' },
  { name: 'Peace Offerings at Sunrise', type: 'trumpet' },
  { name: 'New Months at Sunrise', type: 'trumpet' },
  { name: 'Holy Days at Sunrise', type: 'trumpet' },
  { name: 'Holy Feasts at Sunrise', type: 'trumpet' },
  { name: 'Holy Sabbath at Sunrise', type: 'trumpet' },
];



const fastingRemindersList = [
  { name: 'Fourth Month Fast', type: 'fast', description: 'Month 4, Day 9' },
  { name: 'Fourth Month Fast', type: 'fast', description: 'Month 4, Day 10' },
  { name: 'Fourth Month Fast', type: 'fast', description: 'Month 4, Day 11' },
  { name: 'Fifth Month Fast', type: 'fast', description: 'Month 5, Day 9' },
  { name: 'Fifth Month Fast', type: 'fast', description: 'Month 5, Day 10' },
  { name: 'Fifth Month Fast', type: 'fast', description: 'Month 5, Day 11' },
  { name: 'Ninth Month Fast', type: 'fast', description: 'Month 9, Day 20' },
  { name: 'Ninth Month Fast', type: 'fast', description: 'Month 9, Day 21' },
  { name: 'Ninth Month Fast', type: 'fast', description: 'Month 9, Day 22' },
  { name: 'Tenth Month Fast', type: 'fast', description: 'Month 10, Day 9' },
  { name: 'Tenth Month Fast', type: 'fast', description: 'Month 10, Day 10' },
  { name: 'Tenth Month Fast', type: 'fast', description: 'Month 10, Day 11' },
  { name: 'Day of Atonement', type: 'fast', description: 'Month 7, Day 9' },
  { name: 'Day of Atonement', type: 'fast', description: 'Month 7, Day 10' },
  { name: 'Day of Atonement', type: 'fast', description: 'Month 7, Day 11' },
];

// Reminder checkbox dropdown options
const reminderOptions = [
  { value: -999, label: 'All' },
  { value: 0, label: 'Morning Prayer Sunrise Everyday' },
  { value: -1, label: '1 Hour before Sunrise Prayer Everyday' },
  { value: -2, label: '2 Hours before Sunrise Prayer Everyday' },
  { value: -3, label: '3 Hours before Sunrise Prayer Everyday' },
  { value: 100, label: 'Noon Prayer at 12:00pm' },
  { value: 101, label: '1 Hour before Noon Prayer Everyday' },
  { value: 102, label: '2 Hours before Noon Prayer Everyday' },
  { value: 103, label: '3 Hours before Noon Prayer Everyday' },
  { value: 300, label: 'Ninth Hour Prayer at 3:00pm' },
  { value: 301, label: '1 Hour before Ninth Hour Prayer Everyday' },
  { value: 302, label: '2 Hours before Ninth Hour Prayer Everyday' },
  { value: 303, label: '3 Hours before Ninth Hour Prayer Everyday' },
  { value: 200, label: 'Sunset Prayer Everyday' },
  { value: 201, label: '1 Hour before Sunset Prayer Everyday' },
  { value: 202, label: '2 Hours before Sunset Prayer Everyday' },
  { value: 203, label: '3 Hours before Sunset Prayer Everyday' },
  { value: 1, label: '1 Day' },
  { value: 2, label: '2 Days' },
  { value: 3, label: '3 Days' },
  { value: 5, label: '5 Days' },
  { value: 7, label: '7 Days' },
  { value: 10, label: '10 Days' },
];

// Reminder Checkbox Dropdown Component
const ReminderCheckboxDropdown = ({ itemName, currentDaysBefore, currentRemindTimes, reminderEnabled, onChange }: {
  itemName: string;
  currentDaysBefore?: number;
  currentRemindTimes?: number[];
  reminderEnabled: boolean;
  onChange: (daysBefore: number, enabled: boolean, remindTimes: number[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  // Initialize selected options based on currentDaysBefore or currentRemindTimes
  useEffect(() => {
    if (currentRemindTimes && currentRemindTimes.length > 0) {
      setSelectedOptions(currentRemindTimes);
    } else if (currentDaysBefore === -999 || currentDaysBefore === undefined) {
      setSelectedOptions(reminderOptions.map(o => o.value));
    } else if (currentDaysBefore < 0) {
      setSelectedOptions([currentDaysBefore]);
    } else {
      setSelectedOptions([currentDaysBefore]);
    }
  }, [currentDaysBefore, currentRemindTimes]);

  const handleOptionToggle = (value: number, checked: boolean) => {
    let newSelected: number[];
    if (value === -999) {
      // "All" selected - select all options
      newSelected = checked ? reminderOptions.map(o => o.value) : [];
    } else {
      if (checked) {
        newSelected = [...selectedOptions, value];
      } else {
        newSelected = selectedOptions.filter(v => v !== value);
      }
    }
    setSelectedOptions(newSelected);

    // Trigger onChange with the full array of selected options
    if (newSelected.length === reminderOptions.length) {
      onChange(-999, true, reminderOptions.map(o => o.value)); // All selected
    } else if (newSelected.length === 0) {
      onChange(1, false, []); // None selected
    } else {
      onChange(newSelected[0] || 1, reminderEnabled, newSelected);
    }
  };

  const isAllSelected = selectedOptions.length === reminderOptions.length;
  const displayText = isAllSelected ? 'All' : selectedOptions.length > 0
    ? selectedOptions.map(v => {
      const opt = reminderOptions.find(o => o.value === v);
      return opt ? opt.label.split(' ')[0] : v;
    }).join(', ')
    : 'Select';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="w-48 h-8 text-xs justify-between">
          <span className="truncate">{displayText}</span>
          <ChevronDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <div className="p-2 border-b">
          <div className="flex items-center gap-2">
            <Checkbox
              id={`${itemName}-all`}
              checked={isAllSelected}
              onCheckedChange={(checked) => handleOptionToggle(-999, checked as boolean)}
            />
            <Label htmlFor={`${itemName}-all`} className="text-sm font-medium cursor-pointer">All</Label>
          </div>
        </div>
        <ScrollArea className="h-64">
          <div className="p-2 space-y-1">
            {reminderOptions.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <Checkbox
                  id={`${itemName}-${option.value}`}
                  checked={selectedOptions.includes(option.value)}
                  onCheckedChange={(checked) => handleOptionToggle(option.value, checked as boolean)}
                />
                <Label htmlFor={`${itemName}-${option.value}`} className="text-xs cursor-pointer">{option.label}</Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

const CreatorsCalendar = () => {
  const today = new Date();
  const todayInCreator = getCreatorDateForGregorian(today);
  const initialMonth = todayInCreator ? todayInCreator.month - 1 : 0;
  const initialYear = todayInCreator ? todayInCreator.creatorYear : 2026;

  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [selectedHolyDay, setSelectedHolyDay] = useState<Feast | null>(null);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', event_type: 'personal' });
  const [locationSearch, setLocationSearch] = useState('');
  const [locationResults, setLocationResults] = useState<Array<{ latitude: number; longitude: number; locationName?: string; }>>([]);
  const [coordInput, setCoordInput] = useState({ lat: '', lon: '' });
  const [northernHemisphere, setNorthernHemisphere] = useState(true);
  const [easternHemisphere, setEasternHemisphere] = useState(true);

  // Prayer form state
  const [prayerForm, setPrayerForm] = useState({ fullName: '', hebrewName: '', message: '', requestType: 'healing', communityNation: 'hebrew-israelites' });
  const [prayerSubmitting, setPrayerSubmitting] = useState(false);

  // Baptism form state
  const [baptismForm, setBaptismForm] = useState({ fullName: '', hebrewName: '', dateOfBaptism: '', location: '', officiant: '' });
  const [baptismSubmitting, setBaptismSubmitting] = useState(false);
  const [wantBaptismForm, setWantBaptismForm] = useState({ fullName: '', hebrewName: '', desiredDate: '', location: '' });
  const [wantBaptismSubmitting, setWantBaptismSubmitting] = useState(false);

  // Expanded offering
  const [expandedOffering, setExpandedOffering] = useState<number | null>(null);

  const printRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { location, sunTimes, loading: sunLoading, currentTime, getGeolocation, searchLocation, setCoordinates } = useSunTimes();
  const { user, events, reminders, createEvent, deleteEvent, setReminder, getEventsForDay, getReminderForHolyDay } = useCalendarEvents(currentYear);
  const [optimisticReminders, setOptimisticReminders] = useState<any[]>([]);






  useEffect(() => {
    if (reminders) {
      setOptimisticReminders(reminders);
    }
  }, [reminders]);

  const getOptimisticReminder = (name: string) => {
    return optimisticReminders.find(r => r.holy_day_name === name) || reminders.find(r => r.holy_day_name === name);
  };

  const monthData = calendarMonths[currentMonth];

  const gregorianMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getOrdinal = (num: number): string => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return num + 'st';
    if (j === 2 && k !== 12) return num + 'nd';
    if (j === 3 && k !== 13) return num + 'rd';
    return num + 'th';
  };

  const todayCreatorDate = useMemo(() => {
    const today = new Date();
    return getCreatorDateForGregorian(today);
  }, []);

  const weeks = useMemo(() => {
    const result: number[][] = [];
    let week: number[] = [];
    const firstDayAbsolute = (() => {
      let total = 0;
      for (let m = 1; m < monthData.monthNumber; m++) {
        total += calendarMonths[m - 1].days;
      }
      return total + 1;
    })();
    const startDayOfWeek = (firstDayAbsolute - 1) % 7;
    for (let p = 0; p < startDayOfWeek; p++) week.push(0);
    for (let day = 1; day <= monthData.days; day++) {
      week.push(day);
      if (week.length === 7) { result.push(week); week = []; }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(0);
      result.push(week);
    }
    return result;
  }, [monthData]);

  const monthFeasts = useMemo(() => feasts.filter((f) => f.month === monthData.monthNumber), [monthData]);

  const scriptureCategories = useMemo(() => ({
    calendar: calendarScriptures.filter((s) => s.category === 'calendar'),
    light: calendarScriptures.filter((s) => s.category === 'light'),
    commandments: calendarScriptures.filter((s) => s.category === 'commandments'),
    truth: calendarScriptures.filter((s) => s.category === 'truth'),
    sabbath: calendarScriptures.filter((s) => s.category === 'sabbath')
  }), []);

  const getFeastBadgeColor = (type: Feast['type']) => {
    switch (type) {
      case 'holy-day': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'feast': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'fast': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'new-month': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'sabbath': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handlePrint = () => window.print();
  const handleExportPDF = () => window.print();

  const handleExportICS = () => {
    let ics = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Creator Calendar//EN\r\nCALSCALE:GREGORIAN\r\nX-WR-CALNAME:Creator Calendar ' + currentYear + '\r\n';
    const formatICSDate = (d: Date) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    feasts.filter((f) => f.type !== 'new-month').forEach((feast) => {
      const startDate = getGregorianDate(currentYear, feast.month, feast.day);
      const endDate = getGregorianDate(currentYear, feast.month, feast.endDay);
      endDate.setDate(endDate.getDate() + 1);
      const desc = feast.description.replace(/,/g, '\\,').replace(/\n/g, '\\n');
      ics += `BEGIN:VEVENT\r\nDTSTART;VALUE=DATE:${formatICSDate(startDate)}\r\nDTEND;VALUE=DATE:${formatICSDate(endDate)}\r\nSUMMARY:${feast.name}\r\nDESCRIPTION:${desc} - Month ${feast.month}\\, Day ${feast.day}${feast.endDay !== feast.day ? '-' + feast.endDay : ''}\r\nEND:VEVENT\r\n`;
    });
    calendarMonths.forEach((month) => {
      getSabbathDays(month.monthNumber).forEach((day) => {
        const sabbathDate = getGregorianDate(currentYear, month.monthNumber, day);
        const endDate = new Date(sabbathDate);
        endDate.setDate(endDate.getDate() + 1);
        ics += `BEGIN:VEVENT\r\nDTSTART;VALUE=DATE:${formatICSDate(sabbathDate)}\r\nDTEND;VALUE=DATE:${formatICSDate(endDate)}\r\nSUMMARY:SHABBAT - Month ${month.monthNumber}\\, Day ${day}\r\nDESCRIPTION:Weekly Sabbath\r\nEND:VEVENT\r\n`;
      });
    });
    ics += 'END:VCALENDAR';
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `creator-calendar-${currentYear}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Calendar Exported", description: `Creator Calendar ${currentYear} downloaded as ICS file.` });
  };

  const handleLocationSearch = async () => {
    if (locationSearch.trim()) {
      const results = await searchLocation(locationSearch);
      setLocationResults(results);
    }
  };

  const handleCoordinateSubmit = () => {
    const lat = parseFloat(coordInput.lat);
    const lon = parseFloat(coordInput.lon);
    if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
      setCoordinates(lat, lon);
      setCoordInput({ lat: '', lon: '' });
      toast({ title: "Location Set", description: `Coordinates: ${lat.toFixed(4)}, ${lon.toFixed(4)}` });
    } else {
      toast({ title: "Invalid Coordinates", description: "Please enter valid latitude (-90 to 90) and longitude (-180 to 180)", variant: "destructive" });
    }
  };

  const handleCreateEvent = async () => {
    if (selectedDay && newEvent.title.trim()) {
      await createEvent({ title: newEvent.title, description: newEvent.description, calendar_month: monthData.monthNumber, calendar_day: selectedDay, calendar_year: currentYear, event_type: newEvent.event_type });
      setNewEvent({ title: '', description: '', event_type: 'personal' });
      setShowEventDialog(false);
    }
  };

  const handleSetReminder = async (daysBefore: number) => {
    if (selectedHolyDay) {
      await setReminder(selectedHolyDay.name, daysBefore, true);
      setShowReminderDialog(false);
    }
  };

  const handleSelectAll = async (type: 'holy-day' | 'trumpet' | 'fast', enabled: boolean) => {
    if (!user) return;

    let list: any[] = [];
    let prefix = '';

    if (type === 'holy-day') {
      list = holyDayRemindersList;
    } else if (type === 'trumpet') {
      list = trumpetsRemindersList;
      prefix = 'Trumpet: ';
    } else if (type === 'fast') {
      list = fastingRemindersList;
    }

    toast({
      title: enabled ? "Enabling All Reminders" : "Disabling All Reminders",
      description: `Updating ${list.length} reminders. Please wait...`,
    });

    const channels = {
      email_enabled: enabled,
      sms_enabled: enabled,
      whatsapp_enabled: enabled,
      telegram_enabled: enabled,
      botim_enabled: enabled,
      fax_enabled: enabled,
      hologram_enabled: enabled,
    };

    // Use Promise.all to update all reminders in the list
    try {
      await Promise.all(list.map(item => {
        const name = prefix + item.name;
        const reminder = getReminderForHolyDay(name);
        return setReminder(
          name,
          reminder?.remind_days_before || (enabled ? 1 : 0),
          enabled,
          { ...channels, reminder_type: type === 'trumpet' ? 'trumpet' : 'holy_day' }
        );
      }));

      toast({
        title: "Update Complete",
        description: `All ${type.replace('-', ' ')} reminders have been ${enabled ? 'enabled' : 'disabled'}.`,
      });
    } catch (error) {
      console.error("Error updating reminders:", error);
      toast({
        title: "Update Failed",
        description: "Some reminders could not be updated.",
        variant: "destructive",
      });
    }
  };

  const handleIndividualSwitch = async (name: string, daysBefore: number, enabled: boolean, options: any) => {
    if (!user) {
      toast({ title: "Sign In Required", description: "Please sign in to manage reminders", variant: "destructive" });
      return;
    }

    console.log('handleIndividualSwitch called:', { name, daysBefore, enabled, options });

    // Update optimistic state immediately for instant feedback
    setOptimisticReminders(prev => {
      const existing = prev.find(r => r.holy_day_name === name);
      if (existing) {
        return prev.map(r => r.id === existing.id ? { ...r, ...options, reminder_enabled: enabled, remind_days_before: daysBefore } : r);
      }
      return [...prev, { holy_day_name: name, remind_days_before: daysBefore, reminder_enabled: enabled, ...options }];
    });

    // Then update in database
    try {
      const result = await setReminder(name, daysBefore, enabled, options);
      if (result) {
        console.log('Reminder updated successfully:', result);
      } else {
        console.error('Reminder update returned null');
        toast({ title: "Error", description: "Failed to save reminder. Please try again.", variant: "destructive" });
      }
    } catch (error) {
      console.error('Error updating reminder:', error);
      toast({ title: "Error", description: "Failed to save reminder", variant: "destructive" });
    }
  };

  // Prayer request submission
  const handlePrayerSubmit = async () => {
    if (!user) return;
    const parsed = prayerRequestSchema.safeParse({
      full_name: prayerForm.fullName,
      hebrew_name: prayerForm.hebrewName,
      prayer_message: prayerForm.message,
      request_type: prayerForm.requestType,
    });
    if (!parsed.success) {
      toast({
        title: "Validation Error",
        description: parsed.error.errors[0]?.message ?? "Please review the form",
        variant: "destructive",
      });
      return;
    }
    setPrayerSubmitting(true);

    const { error } = await supabase.from('prayer_requests').insert({
      user_id: user.id,
      full_name: parsed.data.full_name,
      hebrew_name: parsed.data.hebrew_name || null,
      prayer_message: parsed.data.prayer_message,
      request_type: parsed.data.request_type,
    });

    setPrayerSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Failed to submit prayer request.", variant: "destructive" });
    } else {
      toast({ title: "Prayer Request Submitted", description: "Your prayer request has been received. This is a House of Prayer for ALL People. May Most High AHAYAH hear your cry." });
      setPrayerForm({ fullName: '', hebrewName: '', message: '', requestType: 'healing', communityNation: 'hebrew-israelites' });
    }
  };

  // Baptism registration submissions
  const handleWantBaptism = async () => {
    if (!user) return;
    if (!wantBaptismForm.fullName.trim()) {
      toast({ title: "Missing Fields", description: "Please enter your name.", variant: "destructive" });
      return;
    }
    setWantBaptismSubmitting(true);
    // Store source page in localStorage since database column doesn't exist yet
    localStorage.setItem('last_baptism_source', 'Creators Calendar');
    const { error } = await supabase.from('baptism_registrations').insert({
      user_id: user.id,
      full_name: wantBaptismForm.fullName,
      hebrew_name: wantBaptismForm.hebrewName || null,
      date_of_baptism: wantBaptismForm.desiredDate || null,
      location_of_baptism: wantBaptismForm.location || null,
      registration_type: 'want_baptism'
    });
    setWantBaptismSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Failed to submit.", variant: "destructive" });
    } else {
      toast({ title: "Request Submitted", description: "Your baptism interest has been registered. We will reach out to you." });
      setWantBaptismForm({ fullName: '', hebrewName: '', desiredDate: '', location: '' });
    }
  };

  const handleBaptismRegister = async () => {
    if (!user) return;
    if (!baptismForm.fullName.trim()) {
      toast({ title: "Missing Fields", description: "Please enter your name.", variant: "destructive" });
      return;
    }
    setBaptismSubmitting(true);
    const { error } = await supabase.from('baptism_registrations').insert({
      user_id: user.id,
      full_name: baptismForm.fullName,
      hebrew_name: baptismForm.hebrewName || null,
      registration_type: 'completed',
      date_of_baptism: baptismForm.dateOfBaptism || null,
      location_of_baptism: baptismForm.location || null,
      officiant: baptismForm.officiant || null
    });
    setBaptismSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Failed to register baptism.", variant: "destructive" });
    } else {
      toast({ title: "Baptism Registered", description: "Your baptism has been recorded in the registry. HalleluYAH!" });
      setBaptismForm({ fullName: '', hebrewName: '', dateOfBaptism: '', location: '', officiant: '' });
    }
  };

  const yearStartInfo = getYearStartDate(currentYear);

  return <div className="min-h-screen bg-background">
    <NavigationHeader />

    <style>{`
      @media print {
        .no-print { display: none !important; }
        .print-only { display: block !important; }
        body { background: white !important; }
        * { color: black !important; background: white !important; }
      }
    `}</style>

    {/* Hero Section */}
    <section className="relative pt-32 pb-8 overflow-hidden no-print">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-background to-blue-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.1),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300">Sacred Times & Seasons</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
            <span className="text-foreground">Most High AHAYAH</span>
            <br />
            <span className="gradient-text">& YASHAYA</span>
            <br />
            <span className="text-foreground">Creators Calendar</span>
          </h1>

          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            The sacred calendar established by the Most High AHAYAH, marking His Holy Days, Sabbaths, Feasts, and appointed times for His people.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <Sunrise className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-orange-300">A Day Begins at Dawn (Sunrise)</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-mono">{currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}</span>
            </div>
          </div>

          {todayCreatorDate && <div className="max-w-3xl mx-auto mb-4">
            <h3 className="text-center text-sm font-bold text-green-400 mb-2">Creator Restoration Date Today</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-[10px] text-green-300 mb-1">Creators Restoration Month & Day</p>
                <p className="font-bold text-sm">Month {todayCreatorDate.month}, Day {todayCreatorDate.day}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-[10px] text-green-300 mb-1">Creators Restoration Year & Day</p>
                <p className="font-bold text-sm">Year {todayCreatorDate.creatorYearNum}, Day {todayCreatorDate.absoluteDay}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-[10px] text-green-300 mb-1">Creators Restoration Weekday</p>
                <p className="font-bold text-xs">Day {getHebrewDayName(todayCreatorDate.month, todayCreatorDate.day).day} - {getHebrewDayName(todayCreatorDate.month, todayCreatorDate.day).hebrew}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-[10px] text-green-300 mb-1">Lashawan Qadash Hebrew Year</p>
                <p className="font-bold text-sm">{new Date().getFullYear() + 3760}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-[10px] text-green-300 mb-1">Gregorian Date</p>
                <p className="font-bold text-sm">{formatGregorianDate(new Date())}</p>
              </div>
            </div>
          </div>}

          {sunTimes && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-7 gap-2 mt-4 max-w-3xl mx-auto">
            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-1 justify-center mb-1"><Sunrise className="w-4 h-4 text-orange-400" /><span className="text-xs text-orange-300">Dawn</span></div>
              <span className="font-mono text-sm">{sunTimes.dawn}</span>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="flex items-center gap-1 justify-center mb-1"><Sun className="w-4 h-4 text-yellow-400" /><span className="text-xs text-yellow-300">Sunrise</span></div>
              <span className="font-mono text-sm">{sunTimes.sunrise}</span>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-1 justify-center mb-1"><Clock className="w-4 h-4 text-amber-400" /><span className="text-xs text-amber-300">Noon</span></div>
              <span className="font-mono text-sm">12:00 PM</span>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-1 justify-center mb-1"><Sun className="w-4 h-4 text-amber-400" /><span className="text-xs text-amber-300">Solar Noon</span></div>
              <span className="font-mono text-sm">{sunTimes.solarNoon}</span>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-1 justify-center mb-1"><Clock className="w-4 h-4 text-blue-400" /><span className="text-xs text-blue-300">Ninth Hour</span></div>
              <span className="font-mono text-sm">3:00 PM</span>
            </div>
            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-1 justify-center mb-1"><Sunset className="w-4 h-4 text-orange-400" /><span className="text-xs text-orange-300">Sunset</span></div>
              <span className="font-mono text-sm">{sunTimes.sunset}</span>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-1 justify-center mb-1"><Moon className="w-4 h-4 text-purple-400" /><span className="text-xs text-purple-300">Dusk</span></div>
              <span className="font-mono text-sm">{sunTimes.dusk}</span>
            </div>
          </motion.div>}

          {location && <p className="text-xs text-muted-foreground mt-2">
            <MapPin className="w-3 h-3 inline mr-1" />
            {location.locationName} ({location.latitude.toFixed(4)}, {location.longitude.toFixed(4)})
          </p>}
        </motion.div>
      </div>
    </section>

    {/* Location & Tools Bar */}
    <section className="py-4 border-y border-border/30 bg-card/30 no-print">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="outline" size="sm" onClick={getGeolocation} disabled={sunLoading}>
            <Navigation className="w-4 h-4 mr-2" />
            {sunLoading ? 'Getting Location...' : 'Use My Location'}
          </Button>
          <div className="flex items-center gap-2">
            <Input placeholder="Search location..." value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} className="w-40 md:w-48 h-9" onKeyDown={(e) => e.key === 'Enter' && handleLocationSearch()} />
            <Button variant="outline" size="sm" onClick={handleLocationSearch}><Search className="w-4 h-4" /></Button>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm"><MapPin className="w-4 h-4 mr-2" />Enter Coordinates</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Enter Coordinates</DialogTitle><DialogDescription>Enter latitude and longitude to calculate sun times</DialogDescription></DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5 border border-primary/10">
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <Navigation className="w-4 h-4 text-primary" /> Northern Hemisphere
                  </Label>
                  <Switch checked={northernHemisphere} onCheckedChange={setNorthernHemisphere} />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5 border border-primary/10">
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <Globe className="w-4 h-4 text-primary" /> Eastern Hemisphere
                  </Label>
                  <Switch checked={easternHemisphere} onCheckedChange={setEasternHemisphere} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Latitude (-90 to 90)</Label><Input type="number" placeholder="e.g., 40.7128" value={coordInput.lat} onChange={(e) => setCoordInput(prev => ({ ...prev, lat: e.target.value }))} /></div>
                  <div><Label>Longitude (-180 to 180)</Label><Input type="number" placeholder="e.g., -74.0060" value={coordInput.lon} onChange={(e) => setCoordInput(prev => ({ ...prev, lon: e.target.value }))} /></div>
                </div>
              </div>
              <DialogFooter><Button onClick={handleCoordinateSubmit}>Calculate Sun Times</Button></DialogFooter>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Export Calendar</Button></DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem onClick={handleExportPDF}>Export to PDF</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleExportICS}>Add to Google Calendar</DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportICS}>Add to Microsoft Outlook</DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportICS}>Add to Apple Calendar</DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportICS}>Add to Linux Calendar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleExportICS}>Download ICS File</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={handlePrint}><Printer className="w-4 h-4 mr-2" />Print Calendar</Button>
        </div>
        {locationResults.length > 0 && <div className="mt-4 max-w-xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Search Results</span>
              <Button variant="ghost" size="sm" onClick={() => setLocationResults([])}><X className="w-4 h-4" /></Button>
            </div>
            {locationResults.map((result, i) => <button key={i} className="w-full text-left p-2 rounded hover:bg-muted/50 text-sm" onClick={() => { setCoordinates(result.latitude, result.longitude, result.locationName); setLocationResults([]); setLocationSearch(''); }}>
              <MapPin className="w-3 h-3 inline mr-2 text-muted-foreground" />{result.locationName}
            </button>)}
          </div>
        </div>}
      </div>
    </section>

    {/* Calendar Software */}
    <section className="py-8 bg-card/30" ref={printRef}>
      <div className="container mx-auto px-4">
        <Tabs defaultValue="monthly" className="max-w-7xl mx-auto">
          <TabsList className="flex flex-wrap gap-1 h-auto mb-8 no-print">
            <TabsTrigger value="monthly" className="gap-2"><Calendar className="w-4 h-4" />Monthly</TabsTrigger>
            <TabsTrigger value="yearly" className="gap-2"><Layers className="w-4 h-4" />Yearly</TabsTrigger>
            <TabsTrigger value="feasts" className="gap-2"><Star className="w-4 h-4" />Holy Days & Feasts</TabsTrigger>
            <TabsTrigger value="sacrifices" className="gap-2"><Sunrise className="w-4 h-4" />Daily Sacrifices</TabsTrigger>
            <TabsTrigger value="sabbath" className="gap-2"><Moon className="w-4 h-4" />Sabbath</TabsTrigger>
            <TabsTrigger value="prayer" className="gap-2"><Sparkles className="w-4 h-4" />Prayer Request</TabsTrigger>
            <TabsTrigger value="baptism" className="gap-2"><Droplets className="w-4 h-4" />Baptism</TabsTrigger>
            <TabsTrigger value="scriptures" className="gap-2"><Book className="w-4 h-4" />Scriptures</TabsTrigger>
            <TabsTrigger value="reminders" className="gap-2"><Bell className="w-4 h-4" />Reminders</TabsTrigger>
          </TabsList>

          {/* Monthly Calendar Tab */}
          <TabsContent value="monthly">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-display font-bold text-amber-400 mb-2 uppercase tracking-widest">Creator Restoration Year {currentYear - 2012}</h2>
                  <div className="p-3 rounded-lg bg-amber-500/5 border border-primary/20 max-w-2xl mx-auto">
                    <p className="text-sm text-muted-foreground">
                      Begins on <strong>{gregorianMonthNames[yearStartInfo.month - 1]} {yearStartInfo.day}, {yearStartInfo.gregorianYear}</strong> (Gregorian) at Dawn
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter italic">"FIXED TO READ IN TRUTH: SACRED CYCLE ANCHORED BY Most High AHAYAH"</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentYear(prev => prev - 1)}><ChevronLeft className="w-4 h-4" /></Button>
                    <span className="min-w-[80px] text-center font-bold text-xl">{currentYear}</span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentYear(prev => prev + 1)}><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                  <CardTitle className="flex flex-col items-center gap-1 text-center">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-amber-400" />
                      <span className="text-amber-400 text-3xl font-display uppercase">Month {monthData.monthNumber}</span>
                    </div>
                    <span className="text-muted-foreground text-xs font-mono uppercase tracking-[0.2em]">Sacred Month Division</span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentMonth(prev => prev > 0 ? prev - 1 : 11)}><ChevronLeft className="w-4 h-4" /></Button>
                    <span className="min-w-[60px] text-center font-medium">Month {monthData.monthNumber}</span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentMonth(prev => prev < 11 ? prev + 1 : 0)}><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                </div>
                <CardDescription className="text-center mt-2">House of Prayer for All People • 1 Corinthians 16:1-2 • Acts 20:6-7 • 364 Days Year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-card/80">
                        {hebrewDayNames.map((dayInfo, index) => <TableHead key={dayInfo.day} className={`text-center min-w-[110px] ${index === 6 ? 'bg-amber-500/10 text-amber-400' : ''}`}>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold">DAY {dayInfo.day}</span>
                            <span className="text-[10px]">{dayInfo.hebrew}</span>
                          </div>
                        </TableHead>)}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {weeks.map((week, weekIndex) => <TableRow key={weekIndex}>
                        {week.map((day, dayIndex) => {
                          if (day === 0) return <TableCell key={dayIndex} className="border border-border/30" />;
                          const dayFeasts = getFeastsForDay(monthData.monthNumber, day);
                          const gregorianDate = getGregorianDate(currentYear, monthData.monthNumber, day);
                          const dayIsSabbath = isSabbath(monthData.monthNumber, day);
                          const isSelected = selectedDay === day;
                          const dayEvents = getEventsForDay(monthData.monthNumber, day);
                          const isToday = todayCreatorDate && todayCreatorDate.creatorYear === currentYear && todayCreatorDate.month === monthData.monthNumber && todayCreatorDate.day === day;
                          return <TableCell key={dayIndex} className={`border border-border/30 p-1.5 align-top cursor-pointer transition-colors min-h-[90px] bg-card
                            ${dayIsSabbath ? 'bg-amber-500/10' : 'hover:bg-card/80'}
                            ${isSelected ? 'ring-2 ring-primary' : ''}
                            ${dayFeasts.length > 0 ? 'bg-primary/5' : ''}
                            ${isToday ? 'ring-2 ring-green-500 bg-green-500/10' : ''}
                          `} onClick={() => setSelectedDay(day)}>
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center justify-between">
                                <span className={`font-bold text-base ${dayIsSabbath ? 'text-amber-400' : ''} ${isToday ? 'text-green-400' : ''}`}>{day}</span>
                                {isToday && <Badge variant="outline" className="text-[8px] px-1 py-0 bg-green-500/20 text-green-300 border-green-500/30">Today</Badge>}
                                {day === 1 && !isToday && <Badge variant="outline" className="text-[8px] px-1 py-0 bg-blue-500/20 text-blue-300 border-blue-500/30">New</Badge>}
                              </div>
                              <span className="text-[10px] text-muted-foreground">{formatGregorianDate(gregorianDate)}</span>
                              {dayFeasts.map((feast, i) => <Badge key={i} variant="outline" className={`text-[8px] px-1 py-0 ${getFeastBadgeColor(feast.type)}`}>{feast.name.length > 15 ? feast.name.slice(0, 15) + '...' : feast.name}</Badge>)}
                              {dayEvents.map((event, i) => <Badge key={i} variant="outline" className="text-[8px] px-1 py-0 bg-primary/20 text-primary border-primary/30">{event.title.length > 12 ? event.title.slice(0, 12) + '...' : event.title}</Badge>)}
                              {dayIsSabbath && <span className="text-[9px] text-amber-400 font-medium">SHABBAT</span>}
                            </div>
                          </TableCell>;
                        })}
                      </TableRow>)}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs no-print">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500/30 ring-2 ring-green-500" /><span>Today</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500/30" /><span>Sabbath</span></div>
                  <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor('holy-day')}`}>Holy Day</Badge>
                  <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor('feast')}`}>Feast</Badge>
                  <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor('fast')}`}>Fast</Badge>
                  <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor('new-month')}`}>New Month</Badge>
                  <Badge variant="outline" className="text-[10px] bg-primary/20 text-primary border-primary/30">Your Event</Badge>
                </div>

                {selectedDay && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-lg bg-card/80 border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-lg">Day {selectedDay} - Month {monthData.monthNumber}</h4>
                    <div className="flex gap-2 no-print">
                      {user && (
                        <>
                          <Button size="sm" onClick={() => setShowEventDialog(true)} className="gap-1"><Plus className="w-4 h-4" />Add Event</Button>
                          <Button size="sm" variant="outline" className="gap-1" onClick={() => navigate("/dashboard")}><ClipboardCheck className="w-4 h-4" />Task</Button>
                          <Button size="sm" variant="outline" className="gap-1" onClick={() => navigate("/platform-features")}><Zap className="w-4 h-4" />Capability</Button>
                          <Button size="sm" variant="outline" className="gap-1"><Clock className="w-4 h-4" />Appointment Schedule</Button>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Gregorian:</strong> {formatGregorianDate(getGregorianDate(currentYear, monthData.monthNumber, selectedDay))}, {currentYear}
                    <span className="mx-2">•</span>
                    <strong>Hebrew Day:</strong> {getHebrewDayName(monthData.monthNumber, selectedDay).hebrew} ({getHebrewDayName(monthData.monthNumber, selectedDay).meaning})
                    {isSabbath(monthData.monthNumber, selectedDay) && <Badge className="ml-2 bg-amber-500/20 text-amber-300">SHABBAT</Badge>}
                  </p>
                  {getFeastsForDay(monthData.monthNumber, selectedDay).map((feast, i) => <div key={i} className="mt-2 p-3 rounded bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-400" />
                        <span className="font-medium">{feast.name}</span>
                        <span className="text-sm text-muted-foreground">({feast.hebrewName})</span>
                      </div>
                      <Button variant="ghost" size="sm" className="no-print" onClick={() => { setSelectedHolyDay(feast); setShowReminderDialog(true); }}><Bell className="w-4 h-4" /></Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{feast.description}</p>
                    {feast.scriptures && feast.scriptures.length > 0 && <p className="text-xs text-amber-400 mt-1">{feast.scriptures.join(' • ')}</p>}
                    {feast.noWork && <Badge variant="outline" className="mt-2 bg-red-500/10 text-red-300 border-red-500/20">No Work</Badge>}
                  </div>)}
                  {getEventsForDay(monthData.monthNumber, selectedDay).map((event) => <div key={event.id} className="mt-2 p-3 rounded bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Edit className="w-4 h-4 text-primary" />
                        <span className="font-medium">{event.title}</span>
                        <Badge variant="outline" className="text-xs">{event.event_type}</Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive no-print" onClick={() => deleteEvent(event.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                    {event.description && <p className="text-sm text-muted-foreground mt-1">{event.description}</p>}
                  </div>)}
                  {!user && <p className="text-sm text-muted-foreground mt-3 no-print"><a href="/auth" className="text-primary hover:underline">Sign in</a> to create personal events</p>}
                </motion.div>}

                <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/30">
                  <h4 className="font-medium mb-2 flex items-center gap-2"><Book className="w-4 h-4 text-amber-400" />NOTES - Month {monthData.monthNumber}:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Numbers 10:10, Exodus 40 - New Month (Hadash), Beginning Month (Rash Hadash)</li>
                    {monthFeasts.filter(f => f.type !== 'new-month').map((feast, i) => <li key={i}>• {feast.name} ({feast.hebrewName}) - Day {feast.day}{feast.endDay !== feast.day ? `-${feast.endDay}` : ''}</li>)}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Year Overview Tab */}
          <TabsContent value="yearly">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-amber-400" />
                    Creators Restoration Year {currentYear - 2012} - Complete Overview
                  </CardTitle>
                  <div className="flex items-center gap-2 no-print">
                    <Button variant="outline" size="sm" onClick={() => setCurrentYear(prev => prev - 1)}><ChevronLeft className="w-4 h-4" /></Button>
                    <span className="min-w-[80px] text-center font-bold text-xl">{currentYear}</span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentYear(prev => prev + 1)}><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                </div>
                <CardDescription>All Holy Days and Weekly Sabbaths • Year begins {gregorianMonthNames[yearStartInfo.month - 1]} {yearStartInfo.day}, {yearStartInfo.gregorianYear} • 364 Days</CardDescription>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs no-print mb-6">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500/30 ring-2 ring-green-500" /><span>Today</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500/30" /><span>Sabbath</span></div>
                  <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor('holy-day')}`}>Holy Day</Badge>
                  <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor('feast')}`}>Feast</Badge>
                  <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor('fast')}`}>Fast</Badge>
                  <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor('new-month')}`}>New Month</Badge>
                  <Badge variant="outline" className="text-[10px] bg-primary/20 text-primary border-primary/30">Your Event</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Four Seasons Grid */}
                <div>
                  <h3 className="text-lg font-bold text-amber-400 mb-6">All 12 Months - Four Seasons</h3>
                  {[
                    { name: 'FIRST SEASON (SPRING)', color: 'blue', monthRange: [0, 1, 2], days: 91 },
                    { name: 'SECOND SEASON (SUMMER)', color: 'yellow', monthRange: [3, 4, 5], days: 91 },
                    { name: 'THIRD SEASON (FALL)', color: 'orange', monthRange: [6, 7, 8], days: 91 },
                    { name: 'FOURTH SEASON (WINTER)', color: 'cyan', monthRange: [9, 10, 11], days: 91 }
                  ].map((season, seasonIndex) =>
                    <div key={seasonIndex} className="mb-8">
                      <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-card/50 border border-border/30">
                        <div className={`w-4 h-4 rounded-full bg-${season.color}-500/30`} />
                        <h4 className={`font-bold text-lg text-${season.color}-400`}>{season.name} ({season.days} Days)</h4>
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                        {season.monthRange.map((monthIndex) => {
                          const month = calendarMonths[monthIndex];
                          const monthHolyDays = feasts.filter(f => f.month === month.monthNumber);
                          const miniWeeks: number[][] = [];
                          let miniWeek: number[] = [];
                          for (let d = 1; d <= month.days; d++) {
                            const absDay = (() => { let total = 0; for (let m = 1; m < month.monthNumber; m++) { total += calendarMonths[m - 1].days; } return total + d; })();
                            const dayOfWeek = (absDay - 1) % 7;
                            if (d === 1 && dayOfWeek > 0) { for (let p = 0; p < dayOfWeek; p++) miniWeek.push(0); }
                            miniWeek.push(d);
                            if (miniWeek.length === 7) { miniWeeks.push(miniWeek); miniWeek = []; }
                          }
                          if (miniWeek.length > 0) { while (miniWeek.length < 7) miniWeek.push(0); miniWeeks.push(miniWeek); }
                          return <motion.div key={month.monthNumber} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: monthIndex * 0.05 }}
                            className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.02]
                              ${currentMonth === monthIndex ? 'bg-primary/10 border-primary/50' : 'bg-card/50 border-border/30 hover:border-primary/30'}`}
                            onClick={() => { setCurrentMonth(monthIndex); const tabList = document.querySelector('[role="tablist"]'); const monthlyTab = tabList?.querySelector('[value="monthly"]'); if (monthlyTab) (monthlyTab as HTMLElement).click(); }}>
                            <div className="text-center mb-2">
                              <h4 className="font-bold text-amber-400">Month {month.monthNumber}</h4>
                              <p className="text-[10px] text-muted-foreground">{month.days} days • {month.gregorianMonths}</p>
                            </div>
                            <table className="w-full text-[9px]">
                              <thead><tr>{['1', '2', '3', '4', '5', '6', 'S'].map((d, i) => <th key={i} className={`text-center py-0.5 ${i === 6 ? 'text-amber-400' : 'text-muted-foreground'}`}>{d}</th>)}</tr></thead>
                              <tbody>
                                {miniWeeks.map((week, wi) => <tr key={wi}>
                                  {week.map((day, di) => {
                                    if (day === 0) return <td key={di} />;
                                    const hasFeast = monthHolyDays.some(f => day >= f.day && day <= f.endDay && f.type !== 'new-month');
                                    const daySabbath = isSabbath(month.monthNumber, day);
                                    const isTodayMini = todayCreatorDate && todayCreatorDate.creatorYear === currentYear && todayCreatorDate.month === month.monthNumber && todayCreatorDate.day === day;
                                    const isDayOne = day === 1;
                                    return <td key={di} className={`text-center py-0.5 rounded-sm
                                      ${daySabbath ? 'bg-amber-500/20 text-amber-400 font-bold' : ''}
                                      ${hasFeast ? 'bg-primary/20 text-primary font-bold' : ''}
                                      ${isTodayMini ? 'ring-1 ring-green-500 bg-green-500/20 text-green-400 font-bold' : ''}
                                      ${isDayOne ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30' : ''}
                                    `}>{day}</td>;
                                  })}
                                </tr>)}
                              </tbody>
                            </table>
                            <div className="mt-2 space-y-0.5">
                              {/* Always show New Month on Day 1 */}
                              <Badge variant="outline" className={`text-[8px] block truncate ${getFeastBadgeColor('new-month')}`}>
                                Day 1: {month.monthNumber === 1 ? 'New Year' : 'New Month'}
                              </Badge>
                              {monthHolyDays.filter(f => f.type !== 'new-month').slice(0, 3).map((feast, i) => <Badge key={i} variant="outline" className={`text-[8px] block truncate ${getFeastBadgeColor(feast.type)}`}>Day {feast.day}: {feast.name}</Badge>)}
                              {monthHolyDays.filter(f => f.type !== 'new-month').length > 3 && <span className="text-[8px] text-muted-foreground">+{monthHolyDays.filter(f => f.type !== 'new-month').length - 3} more</span>}
                            </div>
                          </motion.div>;
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Annual Holy Days List */}
                <div>
                  <h3 className="text-lg font-bold text-amber-400 mb-4">Annual Holy Days</h3>

                  {/* New Month entries for all 12 months */}
                  <div className="mb-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <h4 className="font-medium text-blue-400 mb-3 flex items-center gap-2">
                      <Moon className="w-4 h-4" /> New Month Days (1st of Every Month)
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">Numbers 10:10 • Numbers 28:11-15 • Ezekiel 46:1,6</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                      {calendarMonths.map((month) => {
                        const gregDate = getGregorianDate(currentYear, month.monthNumber, 1);
                        return <div key={month.monthNumber} className="p-2 rounded bg-blue-500/10 border border-blue-500/20 text-center">
                          <Badge variant="outline" className={`text-[9px] mb-1 ${month.monthNumber === 1 ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30'}`}>
                            {month.monthNumber === 1 ? 'New Year' : 'New Month'}
                          </Badge>
                          <p className="text-xs font-medium">{getOrdinal(month.monthNumber)} Month, Day 1</p>
                          <p className="text-[10px] text-muted-foreground">{formatGregorianDate(gregDate)}</p>
                        </div>;
                      })}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    {feasts.filter(f => f.type !== 'new-month' || f.id === 'new-year').map((feast) => {
                      const gregDate = getGregorianDate(currentYear, feast.month, feast.day);
                      return <div key={feast.id} className="p-3 rounded-lg bg-card/50 border border-border/30">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor(feast.type)}`}>
                            {feast.month}{feast.month === 1 ? 'st' : feast.month === 2 ? 'nd' : feast.month === 3 ? 'rd' : 'th'} Month, Day {feast.day}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">{formatGregorianDate(gregDate)}</span>
                        </div>
                        <h4 className="font-medium">{feast.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{feast.description}</p>
                        {feast.scriptures && feast.scriptures.length > 0 && <p className="text-xs text-amber-400 mt-1">{feast.scriptures.join(' • ')}</p>}
                      </div>;
                    })}
                  </div>
                </div>

                {/* Weekly Sabbaths by Month */}
                <div>
                  <h3 className="text-lg font-bold text-amber-400 mb-4">Weekly Sabbaths by Month</h3>
                  <p className="text-sm text-muted-foreground mb-4">52 Sabbaths Total</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {calendarMonths.map((month) => {
                      const sabbaths = getSabbathDays(month.monthNumber);
                      return <div key={month.monthNumber} className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                        <h4 className="font-medium text-amber-400 mb-2">{getOrdinal(month.monthNumber)} Month</h4>
                        <div className="flex flex-wrap gap-1">
                          {sabbaths.map(d => <Badge key={d} variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">Day {d}</Badge>)}
                        </div>
                      </div>;
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <span className="text-2xl font-bold text-primary">{feasts.filter(f => f.type !== 'new-month').length}</span>
                    <p className="text-xs text-muted-foreground mt-1">Annual Holy Days</p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                    <span className="text-2xl font-bold text-amber-400">52</span>
                    <p className="text-xs text-muted-foreground mt-1">Weekly Sabbaths</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                    <span className="text-2xl font-bold">364</span>
                    <p className="text-xs text-muted-foreground mt-1">Days in Year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Holy Days & Feasts Tab */}
          <TabsContent value="feasts">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Spring Feasts */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-green-400"><Sparkles className="w-6 h-6" />Spring Feasts (Months 1-3)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {feasts.filter(f => f.month <= 3 && f.type !== 'new-month').map((feast, index) => <motion.div key={feast.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-green-300">{feast.name}</h4>
                      <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor(feast.type)}`}>{feast.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{feast.hebrewName}</p>
                    <p className="text-xs text-muted-foreground">Month {feast.month}, Day {feast.day}{feast.endDay !== feast.day ? `-${feast.endDay}` : ''}</p>
                    <p className="text-sm mt-1">{feast.description}</p>
                    {feast.noWork && <Badge variant="outline" className="mt-2 bg-red-500/10 text-red-300 text-[10px]">No Work</Badge>}
                  </motion.div>)}
                </CardContent>
              </Card>

              {/* Fall Feasts */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-amber-400"><Star className="w-6 h-6" />Fall Feasts (Month 7)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {feasts.filter(f => f.month === 7 && f.type !== 'new-month').map((feast, index) => <motion.div key={feast.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-amber-300">{feast.name}</h4>
                      <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor(feast.type)}`}>{feast.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{feast.hebrewName}</p>
                    <p className="text-xs text-muted-foreground">Month {feast.month}, Day {feast.day}{feast.endDay !== feast.day ? `-${feast.endDay}` : ''}</p>
                    <p className="text-sm mt-1">{feast.description}</p>
                    {feast.noWork && <Badge variant="outline" className="mt-2 bg-red-500/10 text-red-300 text-[10px]">No Work</Badge>}
                  </motion.div>)}
                </CardContent>
              </Card>

              {/* Winter Feasts - full width */}
              <Card className="bg-card/50 border-border/50 md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-blue-400"><Sparkles className="w-6 h-6" />Winter Feasts (Months 9-12)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {feasts.filter(f => ['dedication', 'nicanor', 'purim'].includes(f.id)).map((feast, index) => (
                      <motion.div
                        key={feast.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-blue-300">{feast.name}</h4>
                          <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor(feast.type)}`}>{feast.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{feast.hebrewName}</p>
                        <p className="text-xs text-muted-foreground">Month {feast.month}, Day {feast.day}{feast.endDay !== feast.day ? `-${feast.endDay}` : ''}</p>
                        <p className="text-sm mt-1">{feast.description}</p>
                        {feast.noWork && <Badge variant="outline" className="mt-2 bg-red-500/10 text-red-300 text-[10px]">No Work</Badge>}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Fast Days - full width */}
              <Card className="bg-card/50 border-border/50 md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-red-400"><AlertCircle className="w-6 h-6" />Fast Days</CardTitle>
                  <CardDescription>Days of fasting - from evening to evening</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-3">
                    {feasts.filter(f => f.type === 'fast').map((feast, index) => <motion.div key={feast.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                      <h4 className="font-medium text-red-300">{feast.name}</h4>
                      <p className="text-xs text-muted-foreground">Month {feast.month}, Day {feast.day}</p>
                      <p className="text-xs text-muted-foreground">{feast.scriptures?.[0]}</p>
                    </motion.div>)}
                  </div>
                </CardContent>
              </Card>

              {/* Scriptures by Month - full width to match Fast Days */}
              <Card className="bg-card/50 border-border/50 md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-amber-400"><Book className="w-6 h-6" />Scriptures by Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {scripturesByMonth.map((item, index) =>
                      <div key={index} className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                        <h4 className="font-bold text-amber-400 mb-2">{item.month}</h4>
                        <ul className="space-y-1">
                          {item.scriptures.map((s, i) => <li key={i} className="text-sm text-muted-foreground">• {s}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Daily Sacrifices & Burnt Offerings Tab */}
          <TabsContent value="sacrifices">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-orange-400"><Sunrise className="w-6 h-6" />Daily Sacrifices & Burnt Offerings</CardTitle>
                <CardDescription>The appointed offerings and sacrifices as commanded by the Most High — click any offering for detailed scriptures and study guide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {offeringsData.map((offering, index) =>
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${expandedOffering === index ? `md:col-span-2 lg:col-span-3 bg-${offering.color}-500/10 border-${offering.color}-500/20` : `bg-${offering.color}-500/5 border-${offering.color}-500/20`}`}
                      onClick={() => setExpandedOffering(expandedOffering === index ? null : index)}>
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{offering.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">{offering.title}</h4>
                          <p className="text-sm text-muted-foreground">{offering.description}</p>
                        </div>
                      </div>
                      {expandedOffering === index && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 space-y-4">
                        <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                          <h5 className="font-bold text-amber-400 mb-3 flex items-center gap-2"><Book className="w-4 h-4" />Scriptures</h5>
                          <div className="space-y-2">
                            {offering.scriptures.map((s, i) => <p key={i} className="text-sm text-muted-foreground italic">• {s}</p>)}
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                          <h5 className="font-bold text-primary mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4" />Study Guide</h5>
                          <p className="text-sm text-muted-foreground">{offering.studyGuide}</p>
                        </div>
                      </motion.div>}
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prayer Request Tab */}
          <TabsContent value="prayer">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary"><Star className="w-6 h-6" />Prayer Request</CardTitle>
                <CardDescription>Submit your prayer requests to be lifted up before the Most High</CardDescription>
              </CardHeader>
              <CardContent>
                {!user ? <div className="text-center py-8">
                  <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Sign in to submit prayer requests</p>
                  <Button asChild><a href="/auth">Sign In</a></Button>
                </div> :
                  <div className="max-w-2xl mx-auto space-y-4">
                    <div>
                      <Label>Your Name</Label>
                      <Input placeholder="Enter your name..." className="mt-1" value={prayerForm.fullName} onChange={e => setPrayerForm(p => ({ ...p, fullName: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Lashawan Qadash Hebrew Name</Label>
                      <Input placeholder="Enter your Hebrew name (optional)..." className="mt-1" value={prayerForm.hebrewName} onChange={e => setPrayerForm(p => ({ ...p, hebrewName: e.target.value }))} />
                    </div>
                    
                    <div>
                      <Label>Your Community / Nation</Label>
                      <Select value={prayerForm.communityNation} onValueChange={v => setPrayerForm(p => ({ ...p, communityNation: v }))}>
                        <SelectTrigger className="mt-1"><SelectValue placeholder="Select your community..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hebrew-israelites">Hebrew Israelites</SelectItem>
                          <SelectItem value="indigenous">First Nations / Indigenous</SelectItem>
                          <SelectItem value="african">African Diaspora</SelectItem>
                          <SelectItem value="sovereign">Sovereign Nations</SelectItem>
                          <SelectItem value="global">Global Believers</SelectItem>
                          <SelectItem value="other">Other / All Peoples</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Prayer Request</Label>
                      <Textarea placeholder="Share your heart's cry, your needs, your thanksgivings..." className="mt-1 min-h-[150px]" value={prayerForm.message} onChange={e => setPrayerForm(p => ({ ...p, message: e.target.value }))} rows={6} />
                    </div>
                    <div>
                      <Label>Request Type</Label>
                      <Select value={prayerForm.requestType} onValueChange={v => setPrayerForm(p => ({ ...p, requestType: v }))}>
                        <SelectTrigger className="mt-1"><SelectValue placeholder="Select request type..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="healing">Healing & Health</SelectItem>
                          <SelectItem value="protection">Protection & Safety</SelectItem>
                          <SelectItem value="provision">Provision & Sustenance</SelectItem>
                          <SelectItem value="guidance">Guidance & Wisdom</SelectItem>
                          <SelectItem value="deliverance">Deliverance & Freedom</SelectItem>
                          <SelectItem value="thanksgiving">Thanksgiving & Praise</SelectItem>
                          <SelectItem value="nation">For Your Nation / People</SelectItem>
                          <SelectItem value="global">Global Prayer</SelectItem>
                          <SelectItem value="general">General Prayer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" onClick={handlePrayerSubmit} disabled={prayerSubmitting}>
                      {prayerSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">"The effectual fervent prayer of a righteous man availeth much." — James 5:16</p>
                  </div>}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Baptism Tab */}
          <TabsContent value="baptism">
            <div className="space-y-6">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-blue-400"><Sparkles className="w-6 h-6" />Baptism</CardTitle>
                  <CardDescription>Understanding baptism, registering, and completing your baptism journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* What is Baptism */}
                  <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    <h3 className="text-lg font-bold text-blue-400 mb-4">What is Baptism?</h3>
                    <div className="space-y-3">
                      {[
                        { text: '"Then Peter said unto them, Repent, and be baptized every one of you in the name of YASHAYA HA\'MASHIACH for the remission of sins, and ye shall receive the gift of the Holy Ghost."', ref: 'Acts 2:38' },
                        { text: '"Therefore we are buried with him by baptism into death: that like as Christ was raised up from the dead by the glory of the Father, even so we also should walk in newness of life."', ref: 'Romans 6:4' },
                        { text: '"He that believeth and is baptized shall be saved; but he that believeth not shall be damned."', ref: 'Mark 16:16' },
                        { text: '"Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost."', ref: 'Matthew 28:19' },
                        { text: '"Know ye not, that so many of us as were baptized into YASHAYA HA\'MASHIACH were baptized into his death?"', ref: 'Romans 6:3' },
                        { text: '"The like figure whereunto even baptism doth also now save us (not the putting away of the filth of the flesh, but the answer of a good conscience toward God,) by the resurrection of YASHAYA HA\'MASHIACH."', ref: '1 Peter 3:21' }
                      ].map((s, i) => <div key={i} className="p-3 rounded bg-background/50">
                        <p className="italic text-sm">{s.text}</p>
                        <p className="text-xs text-blue-400 mt-1">{s.ref}</p>
                      </div>)}
                    </div>
                  </div>

                  {/* Baptism Actions */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                      <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" />
                      <h4 className="font-bold text-lg mb-2 text-center">I Want to Get Baptized</h4>
                      <p className="text-sm text-muted-foreground mb-4 text-center">Begin your journey of faith through baptism in the name of YASHAYA HA'MASHIACH</p>
                      {!user ? <Button className="w-full" size="lg" asChild><a href="/auth">Sign In to Register</a></Button> :
                        <div className="space-y-3">
                          <div><Label>Full Name</Label><Input placeholder="Enter your name..." className="mt-1" value={wantBaptismForm.fullName} onChange={e => setWantBaptismForm(p => ({ ...p, fullName: e.target.value }))} /></div>
                          <div><Label>Lashawan Qadash Hebrew Name</Label><Input placeholder="Hebrew name (optional)..." className="mt-1" value={wantBaptismForm.hebrewName} onChange={e => setWantBaptismForm(p => ({ ...p, hebrewName: e.target.value }))} /></div>
                          <div><Label>Date of Baptism</Label><Input type="date" placeholder="mm/dd/yyyy" className="mt-1" value={wantBaptismForm.desiredDate} onChange={e => setWantBaptismForm(p => ({ ...p, desiredDate: e.target.value }))} /></div>
                          <div><Label>Location of Baptism</Label><Input placeholder="Where do you want to get Baptize? Do you want to come to Jordan" className="mt-1" value={wantBaptismForm.location} onChange={e => setWantBaptismForm(p => ({ ...p, location: e.target.value }))} /></div>
                          <Button className="w-full" size="lg" onClick={handleWantBaptism} disabled={wantBaptismSubmitting}>{wantBaptismSubmitting ? 'Submitting...' : 'I Want to Get Baptized'}</Button>
                        </div>}
                    </div>
                    <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
                      <Book className="w-10 h-10 text-green-400 mx-auto mb-3" />
                      <h4 className="font-bold text-lg mb-2 text-center">Register a Completed Baptism</h4>
                      <p className="text-sm text-muted-foreground mb-4 text-center">Record your completed baptism in the registry for the congregation</p>
                      {!user ? <Button variant="outline" className="w-full" size="lg" asChild><a href="/auth">Sign In to Register</a></Button> :
                        <div className="space-y-3">
                          <div><Label>Full Name</Label><Input placeholder="Enter full name..." className="mt-1" value={baptismForm.fullName} onChange={e => setBaptismForm(p => ({ ...p, fullName: e.target.value }))} /></div>
                          <div><Label>Lashawan Qadash Hebrew Name</Label><Input placeholder="Hebrew name (optional)..." className="mt-1" value={baptismForm.hebrewName} onChange={e => setBaptismForm(p => ({ ...p, hebrewName: e.target.value }))} /></div>
                          <div><Label>Date of Baptism</Label><Input type="date" className="mt-1" value={baptismForm.dateOfBaptism} onChange={e => setBaptismForm(p => ({ ...p, dateOfBaptism: e.target.value }))} /></div>
                          <div><Label>Location of Baptism</Label><Input placeholder="Where were you baptized?" className="mt-1" value={baptismForm.location} onChange={e => setBaptismForm(p => ({ ...p, location: e.target.value }))} /></div>
                          <div><Label>Officiant</Label><Input placeholder="Who performed the baptism?" className="mt-1" value={baptismForm.officiant} onChange={e => setBaptismForm(p => ({ ...p, officiant: e.target.value }))} /></div>
                          <Button className="w-full" onClick={handleBaptismRegister} disabled={baptismSubmitting}>
                            {baptismSubmitting ? 'Registering...' : 'Register Baptism'}
                          </Button>
                        </div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sabbath Tab */}
          <TabsContent value="sabbath">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3"><Moon className="w-6 h-6 text-amber-400" />The Seventh Day Sabbath (SHABBAT)</CardTitle>
                <CardDescription>A day begins at Dawn (Sunrise) - Preparation Day Shabbat starts at Dawn on the Seventh Day</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-xl bg-orange-500/5 border border-orange-500/20">
                  <div className="flex items-start gap-4">
                    <Sunrise className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-orange-300 mb-3">A Day Begins at Dawn (Sunrise)</h4>
                      <div className="space-y-3">
                        {scriptureCategories.sabbath.map((scripture, i) => <div key={i} className="p-3 rounded bg-background/50">
                          <p className="italic text-sm">"{scripture.verse}"</p>
                          <p className="text-xs text-amber-400 mt-1">{scripture.reference}</p>
                        </div>)}
                      </div>
                      <div className="mt-4 p-3 rounded bg-amber-500/10 border border-amber-500/20">
                        <p className="text-sm font-medium text-amber-300">Greek Reference:</p>
                        <p className="text-sm text-muted-foreground mt-1"><strong>G2020 - ἐπιφώσκω (epiphōskō)</strong>: "to begin to grow light: begin to dawn, draw on"</p>
                        <p className="text-sm text-muted-foreground mt-1"><strong>G4404 - πρωΐ́ (prōi)</strong>: "at dawn; by implication the day break watch: early in the morning"</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <div className="flex items-start gap-4">
                    <Book className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="italic text-foreground mb-2">"Remember the sabbath day, to keep it holy. Six days shalt thou labour, and do all thy work: But the seventh day is the sabbath of Most High AHAYAH thy Power: in it thou shalt not do any work..."</p>
                      <p className="text-sm text-amber-400">Exodus 20:8-10</p>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                    <div className="flex items-center gap-3 mb-2"><Sunrise className="w-5 h-5 text-orange-400" /><h4 className="font-medium">Sabbath Begins</h4></div>
                    <p className="text-muted-foreground">Day 7 at Dawn (Sunrise)</p>
                    <p className="text-sm text-muted-foreground mt-1">"The sun ariseth, they gather themselves together..." (Psalms 104:22)</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                    <div className="flex items-center gap-3 mb-2"><Sun className="w-5 h-5 text-amber-400" /><h4 className="font-medium">Sabbath Ends</h4></div>
                    <p className="text-muted-foreground">Day 1 at Dawn (Sunrise)</p>
                    <p className="text-sm text-muted-foreground mt-1">"Man goeth forth unto his work and to his labour until the evening." (Psalms 104:23)</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-3 mb-2"><Clock className="w-5 h-5 text-primary" /><h4 className="font-medium">Twelve Hours in the Day</h4></div>
                  <p className="italic text-sm">"Yashaya answered, Are there not twelve hours in the day? If any man walk in the day, he stumbleth not, because he seeth the light of this world."</p>
                  <p className="text-xs text-amber-400 mt-1">John 11:9</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Creators Calendar Scriptures Tab */}
          <TabsContent value="scriptures">
            <h2 className="text-2xl font-bold text-amber-400 mb-6 text-center">Creators Calendar Scriptures</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-yellow-400"><Sun className="w-6 h-6" />Light & Children of Light</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-3">
                      {scriptureCategories.light.map((scripture, i) => <div key={i} className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                        <p className="italic text-sm">"{scripture.verse}"</p>
                        <p className="text-xs text-yellow-400 mt-2">{scripture.reference}</p>
                      </div>)}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-blue-400"><Book className="w-6 h-6" />Commandments & Love</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-3">
                      {scriptureCategories.commandments.map((scripture, i) => <div key={i} className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                        <p className="italic text-sm">"{scripture.verse}"</p>
                        <p className="text-xs text-blue-400 mt-2">{scripture.reference}</p>
                      </div>)}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50 md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-purple-400"><Star className="w-6 h-6" />Truth & Scripture Study</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[250px] pr-4">
                    <div className="grid md:grid-cols-2 gap-3">
                      {scriptureCategories.truth.map((scripture, i) => <div key={i} className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                        <p className="italic text-sm">"{scripture.verse}"</p>
                        <p className="text-xs text-purple-400 mt-2">{scripture.reference}</p>
                      </div>)}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50 md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-green-400"><Calendar className="w-6 h-6" />Scriptures by Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-6">
                      {scripturesByMonth.map((monthData, i) => (
                        <div key={i} className="border border-green-500/20 rounded-lg p-4 bg-green-500/5">
                          <h4 className="font-bold text-green-400 mb-3">{monthData.month}</h4>
                          <ul className="space-y-1">
                            {monthData.scriptures.map((scripture, j) => (
                              <li key={j} className="text-sm text-muted-foreground">
                                • {scripture}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reminders Tab */}
          <TabsContent value="reminders">
            <div className="space-y-8">
              {/* Holy Days, Holy Feasts & Holy Sabbaths Reminders */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <Bell className="w-6 h-6 text-primary" />
                        <Star className="w-6 h-6 text-amber-400" />
                      </div>
                      Holy Days, Holy Feasts, Holy Sabbaths, & Holy Fast Reminders
                    </CardTitle>
                    <div className="flex gap-2">
                      <Select defaultValue="shofar1">
                        <SelectTrigger className="w-[150px] h-8 text-xs">
                          <Volume2 className="w-3 h-3 mr-2" />
                          <SelectValue placeholder="Choose Sound" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shofar1">Shofar Call 1</SelectItem>
                          <SelectItem value="shofar2">Shofar Call 2</SelectItem>
                          <SelectItem value="trumpet1">Trumpet Blast 1</SelectItem>
                          <SelectItem value="trumpet2">Trumpet Blast 2</SelectItem>
                          <SelectItem value="bell1">Temple Bell</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                        <Volume2 className="w-3 h-3" /> Test
                      </Button>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-primary/5 border border-primary/10">
                        <span className="text-[10px] text-muted-foreground">Select All</span>
                        <Switch
                          className="scale-75"
                          checked={user && holyDayRemindersList.every(item => {
                            const r = getOptimisticReminder(item.name);
                            return r?.reminder_enabled === true;
                          })}
                          onCheckedChange={(checked) => handleSelectAll('holy-day', checked)}
                        />
                      </div>
                    </div>
                  </div>
                  <CardDescription>{user ? 'Set reminders and notification channels' : 'Sign in to set reminders'}</CardDescription>
                </CardHeader>
                <CardContent>
                  {!user ? (
                    <div className="text-center py-8">
                      <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Sign in to manage your reminders</p>
                      <Button asChild><a href="/auth">Sign In</a></Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {holyDayRemindersList.map((item, idx) => {
                        const reminder = getOptimisticReminder(item.name);
                        return (
                          <div key={idx} className={`p-4 rounded-xl border transition-all ${reminder?.reminder_enabled ? 'bg-primary/5 border-primary/20' : 'bg-card/50 border-border/30'}`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-background/50 border border-border/30">
                                  {item.type === 'prayer' ? <Sunrise className="w-5 h-5 text-orange-400" /> : <Star className="w-5 h-5 text-amber-400" />}
                                </div>
                                <div>
                                  <h4 className="font-bold text-sm">{item.name}</h4>
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.type}</p>
                                  {item.details && <p className="text-[9px] text-muted-foreground">{item.details}</p>}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Remind:</span>
                                  <ReminderCheckboxDropdown
                                    itemName={item.name}
                                    currentDaysBefore={reminder?.remind_days_before}
                                    currentRemindTimes={(reminder as any)?.remind_times}
                                    reminderEnabled={reminder?.reminder_enabled || false}
                                    onChange={(daysBefore, enabled, remindTimes) => handleIndividualSwitch(item.name, daysBefore, enabled, { remind_times: remindTimes })}
                                  />
                                </div>
                                <Switch
                                  checked={reminder?.reminder_enabled || false}
                                  onCheckedChange={(checked) => handleIndividualSwitch(item.name, reminder?.remind_days_before || 1, checked, {})}
                                />
                              </div>
                            </div>

                            {/* Notification Channels */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 pt-4 border-t border-border/10">
                              {[
                                { icon: MailIcon, label: 'Email', key: 'email_enabled' },
                                { icon: Smartphone, label: 'SMS', key: 'sms_enabled' },
                                { icon: MessageCircle, label: 'WhatsApp', key: 'whatsapp_enabled' },
                                { icon: SendIcon, label: 'Telegram', key: 'telegram_enabled' },
                                { icon: Share2, label: 'Botim', key: 'botim_enabled' },
                                { icon: Printer, label: 'Fax', key: 'fax_enabled' },
                                { icon: Sparkles, label: 'Hologram', key: 'hologram_enabled' },
                              ].map((channel) => (
                                <div key={channel.label} className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-background/40 border border-border/5 hover:bg-background/60 transition-colors">
                                  <channel.icon className="w-3.5 h-3.5 text-muted-foreground" />
                                  <span className="text-[10px] text-muted-foreground font-medium">{channel.label}</span>
                                  <Switch
                                    className="scale-75"
                                    checked={reminder ? Boolean((reminder as any)[channel.key]) : false}
                                    onCheckedChange={(checked) => handleIndividualSwitch(
                                      item.name,
                                      reminder?.remind_days_before || 1,
                                      reminder?.reminder_enabled !== false,
                                      { [channel.key]: checked }
                                    )}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>


              {/* Daily Blowing of Trumpets Section */}
              <Card className="bg-card/50 border-border/50 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Megaphone className="w-32 h-32 text-amber-500 rotate-12" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Megaphone className="w-6 h-6 text-amber-500" />
                      Daily Blowing of Trumpets Everyday is Holy
                    </CardTitle>
                    <div className="flex gap-2">
                      <Select defaultValue="both">
                        <SelectTrigger className="w-[180px] h-8 text-xs">
                          <Volume2 className="w-3 h-3 mr-2" />
                          <SelectValue placeholder="Sound Profile" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trumpet">Trumpet Blast</SelectItem>
                          <SelectItem value="shofar">Shofar / Shawapa</SelectItem>
                          <SelectItem value="both">Both Instruments</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                        <Volume2 className="w-3 h-3" /> Test Sound
                      </Button>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-amber-500/5 border border-amber-500/10">
                        <span className="text-[10px] text-muted-foreground">Select All</span>
                        <Switch
                          className="scale-75"
                          checked={user && trumpetsRemindersList.every(item => {
                            const r = getOptimisticReminder(`Trumpet: ${item.name}`);
                            return r?.reminder_enabled === true;
                          })}
                          onCheckedChange={(checked) => handleSelectAll('trumpet', checked)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 italic text-sm text-muted-foreground leading-relaxed">
                    <p>
                      <strong>Numbers 10:10</strong> &nbsp; Also in the day of your gladness, and in your solemn days, and in the beginnings of your months, ye shall blow with the trumpets over your burnt offerings, and over the sacrifices of your peace offerings; that they may be to you for a memorial before your Most High AHAYAH: I am the Most High AHAYAH your Power.
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  {!user ? (
                    <div className="text-center py-8">
                      <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Sign in to manage your reminders</p>
                      <Button asChild><a href="/auth">Sign In</a></Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {trumpetsRemindersList.map((item, idx) => {
                        const reminderName = `Trumpet: ${item.name}`;
                        const reminder = getOptimisticReminder(reminderName);
                        return (
                          <div key={idx} className={`p-4 rounded-xl border transition-all ${reminder?.reminder_enabled ? 'bg-amber-500/5 border-amber-500/20' : 'bg-card/50 border-border/30'}`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-background/50 border border-border/30">
                                  <Megaphone className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-sm">{item.name}</h4>
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Blowing the Trumpets Reminder</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Remind:</span>
                                  <ReminderCheckboxDropdown
                                    itemName={reminderName}
                                    currentDaysBefore={reminder?.remind_days_before}
                                    currentRemindTimes={(reminder as any)?.remind_times}
                                    reminderEnabled={reminder?.reminder_enabled || false}
                                    onChange={(daysBefore, enabled, remindTimes) => handleIndividualSwitch(reminderName, daysBefore, enabled, { reminder_type: 'trumpet', remind_times: remindTimes })}
                                  />
                                </div>
                                <Switch
                                  checked={reminder?.reminder_enabled || false}
                                  onCheckedChange={(checked) => handleIndividualSwitch(reminderName, 0, checked, { reminder_type: 'trumpet' })}
                                />
                              </div>
                            </div>

                            {/* Notification Channels */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 pt-4 border-t border-border/10">
                              {[
                                { icon: MailIcon, label: 'Email', key: 'email_enabled' },
                                { icon: Smartphone, label: 'SMS', key: 'sms_enabled' },
                                { icon: MessageCircle, label: 'WhatsApp', key: 'whatsapp_enabled' },
                                { icon: SendIcon, label: 'Telegram', key: 'telegram_enabled' },
                                { icon: Share2, label: 'Botim', key: 'botim_enabled' },
                                { icon: Printer, label: 'Fax', key: 'fax_enabled' },
                                { icon: Sparkles, label: 'Hologram', key: 'hologram_enabled' },
                              ].map((channel) => (
                                <div key={channel.label} className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-background/40 border border-border/5 hover:bg-background/60 transition-colors">
                                  <channel.icon className="w-3.5 h-3.5 text-muted-foreground" />
                                  <span className="text-[10px] text-muted-foreground font-medium">{channel.label}</span>
                                  <Switch
                                    className="scale-75"
                                    checked={reminder ? Boolean((reminder as any)[channel.key]) : false}
                                    onCheckedChange={(checked) => handleIndividualSwitch(reminderName, 0, reminder?.reminder_enabled || false, { [channel.key]: checked, reminder_type: 'trumpet' })}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Fasting Reminders Section */}
              <Card className="bg-card/50 border-border/50 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Star className="w-32 h-32 text-red-500 rotate-12" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Star className="w-6 h-6 text-red-500" />
                      Holy Fasts Reminders
                    </CardTitle>
                    <div className="flex gap-2">
                      <Select defaultValue="shofar1">
                        <SelectTrigger className="w-[150px] h-8 text-xs">
                          <Volume2 className="w-3 h-3 mr-2" />
                          <SelectValue placeholder="Choose Sound" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shofar1">Shofar Call 1</SelectItem>
                          <SelectItem value="shofar2">Shofar Call 2</SelectItem>
                          <SelectItem value="trumpet1">Trumpet Blast 1</SelectItem>
                          <SelectItem value="trumpet2">Trumpet Blast 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                        <Volume2 className="w-3 h-3" /> Test
                      </Button>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-red-500/5 border border-red-500/10">
                        <span className="text-[10px] text-muted-foreground">Select All</span>
                        <Switch
                          className="scale-75"
                          checked={user && fastingRemindersList.every(item => {
                            const r = getOptimisticReminder(item.name);
                            return r?.reminder_enabled === true;
                          })}
                          onCheckedChange={(checked) => handleSelectAll('fast', checked)}
                        />
                      </div>
                    </div>
                  </div>
                  <CardDescription>{user ? 'Set reminders for Holy Fast days' : 'Sign in to set reminders'}</CardDescription>
                </CardHeader>
                <CardContent>
                  {!user ? (
                    <div className="text-center py-8">
                      <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Sign in to manage your reminders</p>
                      <Button asChild><a href="/auth">Sign In</a></Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {fastingRemindersList.map((item, idx) => {
                        const reminder = getOptimisticReminder(item.name);
                        return (
                          <div key={idx} className={`p-4 rounded-xl border transition-all ${reminder?.reminder_enabled ? 'bg-red-500/5 border-red-500/20' : 'bg-card/50 border-border/30'}`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-background/50 border border-border/30">
                                  <Star className="w-5 h-5 text-red-500" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-sm">{item.name}</h4>
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Remind:</span>
                                  <ReminderCheckboxDropdown
                                    itemName={item.name}
                                    currentDaysBefore={reminder?.remind_days_before}
                                    currentRemindTimes={(reminder as any)?.remind_times}
                                    reminderEnabled={reminder?.reminder_enabled || false}
                                    onChange={(daysBefore, enabled, remindTimes) => handleIndividualSwitch(item.name, daysBefore, enabled, { remind_times: remindTimes })}
                                  />
                                </div>
                                <Switch
                                  checked={reminder?.reminder_enabled || false}
                                  onCheckedChange={(checked) => handleIndividualSwitch(item.name, reminder?.remind_days_before || 1, checked, {})}
                                />
                              </div>
                            </div>

                            {/* Notification Channels */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 pt-4 border-t border-border/10">
                              {[
                                { icon: MailIcon, label: 'Email', key: 'email_enabled' },
                                { icon: Smartphone, label: 'SMS', key: 'sms_enabled' },
                                { icon: MessageCircle, label: 'WhatsApp', key: 'whatsapp_enabled' },
                                { icon: SendIcon, label: 'Telegram', key: 'telegram_enabled' },
                                { icon: Share2, label: 'Botim', key: 'botim_enabled' },
                                { icon: Printer, label: 'Fax', key: 'fax_enabled' },
                                { icon: Sparkles, label: 'Hologram', key: 'hologram_enabled' },
                              ].map((channel) => (
                                <div key={channel.label} className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-background/40 border border-border/5 hover:bg-background/60 transition-colors">
                                  <channel.icon className="w-3.5 h-3.5 text-muted-foreground" />
                                  <span className="text-[10px] text-muted-foreground font-medium">{channel.label}</span>
                                  <Switch
                                    className="scale-75"
                                    checked={reminder ? Boolean((reminder as any)[channel.key]) : false}
                                    onCheckedChange={(checked) => handleIndividualSwitch(
                                      item.name,
                                      reminder?.remind_days_before || 1,
                                      reminder?.reminder_enabled !== false,
                                      { [channel.key]: checked }
                                    )}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>

    {/* Event Creation Dialog */}
    <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>Add an event for Day {selectedDay}, Month {monthData.monthNumber}, Year {currentYear}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div><Label>Event Title</Label><Input placeholder="Event title..." value={newEvent.title} onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))} /></div>
          <div><Label>Description (optional)</Label><Textarea placeholder="Event description..." value={newEvent.description} onChange={e => setNewEvent(prev => ({ ...prev, description: e.target.value }))} /></div>
          <div>
            <Label>Event Type</Label>
            <Select value={newEvent.event_type} onValueChange={value => setNewEvent(prev => ({ ...prev, event_type: value }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="assembly">Assembly</SelectItem>
                <SelectItem value="study">Study</SelectItem>
                <SelectItem value="prayer">Prayer</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowEventDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateEvent}>Create Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Reminder Dialog */}
    <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Reminder</DialogTitle>
          <DialogDescription>Set a reminder for {selectedHolyDay?.name}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">How many days before would you like to be reminded?</p>
          <div className="grid grid-cols-4 gap-2">
            {[1, 3, 7, 14].map(days => <Button key={days} variant="outline" onClick={() => handleSetReminder(days)}>{days} day{days > 1 ? 's' : ''}</Button>)}
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <Footer />
  </div>;
};
export default CreatorsCalendar;
