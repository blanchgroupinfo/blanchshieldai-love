import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Sun, Moon, Star, Book, Clock, ChevronLeft, ChevronRight, Sparkles, Sunrise, AlertCircle, Printer, MapPin, Plus, Bell, Search, Navigation, X, Sunset, Edit, Trash2, Download } from "lucide-react";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { calendarMonths, hebrewDayNames, feasts, calendarScriptures, getFeastsForDay, getGregorianDate, formatGregorianDate, getHebrewDayName, isSabbath, getYearStartDate, getSabbathDays, getCreatorDateForGregorian, type Feast } from "@/data/creatorsCalendar";
import { useSunTimes } from "@/hooks/useSunTimes";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { useToast } from "@/hooks/use-toast";
const CreatorsCalendar = () => {
  // Initialize to today's date in the creator calendar
  const today = new Date();
  const todayInCreator = getCreatorDateForGregorian(today);
  const initialMonth = todayInCreator ? (todayInCreator.month - 1) : 0;
  const initialYear = todayInCreator ? todayInCreator.creatorYear : 2026;

  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [selectedHolyDay, setSelectedHolyDay] = useState<Feast | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    event_type: 'personal'
  });
  const [locationSearch, setLocationSearch] = useState('');
  const [locationResults, setLocationResults] = useState<Array<{
    latitude: number;
    longitude: number;
    locationName?: string;
  }>>([]);
  const [coordInput, setCoordInput] = useState({
    lat: '',
    lon: ''
  });
  const printRef = useRef<HTMLDivElement>(null);
  const {
    toast
  } = useToast();
  const {
    location,
    sunTimes,
    loading: sunLoading,
    currentTime,
    getGeolocation,
    searchLocation,
    setCoordinates
  } = useSunTimes();
  const {
    user,
    events,
    reminders,
    createEvent,
    deleteEvent,
    setReminder,
    getEventsForDay,
    getReminderForHolyDay
  } = useCalendarEvents(currentYear);
  const monthData = calendarMonths[currentMonth];

  // Helper constants
  const gregorianMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper function to convert month number to ordinal
  const getOrdinal = (num: number): string => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return num + 'st';
    if (j === 2 && k !== 12) return num + 'nd';
    if (j === 3 && k !== 13) return num + 'rd';
    return num + 'th';
  };

  // Calculate today's creator date
  const todayCreatorDate = useMemo(() => {
    const today = new Date();
    return getCreatorDateForGregorian(today);
  }, []);

  // Generate weeks for the current month with proper day-of-week alignment
  const weeks = useMemo(() => {
    const result: number[][] = [];
    let week: number[] = [];
    
    // Find what day-of-week the 1st of this month falls on
    const firstDayAbsolute = (() => {
      let total = 0;
      for (let m = 1; m < monthData.monthNumber; m++) {
        total += calendarMonths[m - 1].days;
      }
      return total + 1;
    })();
    const startDayOfWeek = (firstDayAbsolute - 1) % 7; // 0-6
    
    // Pad the beginning
    for (let p = 0; p < startDayOfWeek; p++) {
      week.push(0);
    }
    
    for (let day = 1; day <= monthData.days; day++) {
      week.push(day);
      if (week.length === 7) {
        result.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(0);
      result.push(week);
    }
    return result;
  }, [monthData]);

  // Get feasts for current month
  const monthFeasts = useMemo(() => {
    return feasts.filter(f => f.month === monthData.monthNumber);
  }, [monthData]);

  // Get scriptures by category
  const scriptureCategories = useMemo(() => {
    return {
      calendar: calendarScriptures.filter(s => s.category === 'calendar'),
      light: calendarScriptures.filter(s => s.category === 'light'),
      commandments: calendarScriptures.filter(s => s.category === 'commandments'),
      truth: calendarScriptures.filter(s => s.category === 'truth'),
      sabbath: calendarScriptures.filter(s => s.category === 'sabbath')
    };
  }, []);
  const getFeastBadgeColor = (type: Feast['type']) => {
    switch (type) {
      case 'holy-day':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'feast':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'fast':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'new-month':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'sabbath':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Export to PDF
  const handleExportPDF = () => {
    window.print();
  };

  // ICS Calendar Export
  const handleExportICS = () => {
    let ics = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Creator Calendar//EN\r\nCALSCALE:GREGORIAN\r\nX-WR-CALNAME:Creator Calendar ' + currentYear + '\r\n';
    
    const formatICSDate = (d: Date) => {
      return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
    };
    
    // Add holy days and feasts
    feasts.filter(f => f.type !== 'new-month').forEach(feast => {
      const startDate = getGregorianDate(currentYear, feast.month, feast.day);
      const endDate = getGregorianDate(currentYear, feast.month, feast.endDay);
      endDate.setDate(endDate.getDate() + 1);
      const desc = feast.description.replace(/,/g, '\\,').replace(/\n/g, '\\n');
      ics += `BEGIN:VEVENT\r\nDTSTART;VALUE=DATE:${formatICSDate(startDate)}\r\nDTEND;VALUE=DATE:${formatICSDate(endDate)}\r\nSUMMARY:${feast.name}\r\nDESCRIPTION:${desc} - Month ${feast.month}\\, Day ${feast.day}${feast.endDay !== feast.day ? '-' + feast.endDay : ''}\r\nEND:VEVENT\r\n`;
    });
    
    // Add sabbaths
    calendarMonths.forEach(month => {
      getSabbathDays(month.monthNumber).forEach(day => {
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
    
    toast({
      title: "Calendar Exported",
      description: `Creator Calendar ${currentYear} downloaded as ICS file. Import into any calendar app.`
    });
  };

  // Handle location search
  const handleLocationSearch = async () => {
    if (locationSearch.trim()) {
      const results = await searchLocation(locationSearch);
      setLocationResults(results);
    }
  };

  // Handle coordinate input
  const handleCoordinateSubmit = () => {
    const lat = parseFloat(coordInput.lat);
    const lon = parseFloat(coordInput.lon);
    if (!isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
      setCoordinates(lat, lon);
      setCoordInput({
        lat: '',
        lon: ''
      });
      toast({
        title: "Location Set",
        description: `Coordinates: ${lat.toFixed(4)}, ${lon.toFixed(4)}`
      });
    } else {
      toast({
        title: "Invalid Coordinates",
        description: "Please enter valid latitude (-90 to 90) and longitude (-180 to 180)",
        variant: "destructive"
      });
    }
  };

  // Handle event creation
  const handleCreateEvent = async () => {
    if (selectedDay && newEvent.title.trim()) {
      await createEvent({
        title: newEvent.title,
        description: newEvent.description,
        calendar_month: monthData.monthNumber,
        calendar_day: selectedDay,
        calendar_year: currentYear,
        event_type: newEvent.event_type
      });
      setNewEvent({
        title: '',
        description: '',
        event_type: 'personal'
      });
      setShowEventDialog(false);
    }
  };

  // Handle reminder setting
  const handleSetReminder = async (daysBefore: number) => {
    if (selectedHolyDay) {
      await setReminder(selectedHolyDay.name, daysBefore, true);
      setShowReminderDialog(false);
    }
  };

  // Year start info
  const yearStartInfo = getYearStartDate(currentYear);
  return <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      
      {/* Print styles */}
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
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center max-w-4xl mx-auto">
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
              The sacred calendar established by the Most High, marking His holy days, 
              sabbaths, feasts, and appointed times for His people.
            </p>

            {/* Dawn Notice & Current Time */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <Sunrise className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-orange-300">A Day Begins at Dawn (Sunrise)</span>
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-mono">
                  {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Creator Date Today */}
            {todayCreatorDate && (
              <div className="max-w-3xl mx-auto mb-4">
                <h3 className="text-center text-sm font-bold text-green-400 mb-2">Creator Restoration Restoration Restoration Restoration Date Today</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                    <p classNamCreators Restoration e="text-[10pCreators Restoration x] text-greeCreators Restoration n-300 mb-1">Year & Day</p>
                    <p className="font-bold text-sm">Year {todayCreatorDate.creatorYearNum}, Day {todayCreatorDate.absoluteDay}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
 Creators Restoration                    <p className="Creators Restoration text-[10px] text-green-300 mb-1">Month & Day</p>
                    <p className="font-bold text-sm">{getOrdinal(todayCreatorDate.month)} Month, Day {todayCreatorDate.day}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
             Creators Restoration        <p className="text-[10px] text-green-300 mb-1">Weekday</p>
                    <p className="font-bold text-xs">Day {getHebrewDayName(todayCreatorDate.month, todayCreatorDate.day).day} - {getHebrewDayName(todayCreatorDate.month, todayCreatorDate.day).hebrew}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                    <p className="text-[10px] text-green-300 mb-1">Gregorian Date</p>
                    <p className="font-bold text-sm">{formatGregorianDate(new Date())}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Sun Times Display */}
            {sunTimes && <motion.div initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4 max-w-3xl mx-auto">
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-1 justify-center mb-1">
                    <Sunrise className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-orange-300">Dawn</span>
                  </div>
                  <span className="font-mono text-sm">{sunTimes.dawn}</span>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <div className="flex items-center gap-1 justify-center mb-1">
                    <Sun className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-yellow-300">Sunrise</span>
                  </div>
                  <span className="font-mono text-sm">{sunTimes.sunrise}</span>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-1 justify-center mb-1">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-amber-300">Solar Noon</span>
                  </div>
                  <span className="font-mono text-sm">{sunTimes.solarNoon}</span>
                </div>
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-1 justify-center mb-1">
                    <Sunset className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-orange-300">Sunset</span>
                  </div>
                  <span className="font-mono text-sm">{sunTimes.sunset}</span>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-1 justify-center mb-1">
                    <Moon className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-purple-300">Dusk</span>
                  </div>
                  <span className="font-mono text-sm">{sunTimes.dusk}</span>
                </div>
              </motion.div>}

            {/* Location Display */}
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
            {/* Get Location Button */}
            <Button variant="outline" size="sm" onClick={getGeolocation} disabled={sunLoading}>
              <Navigation className="w-4 h-4 mr-2" />
              {sunLoading ? 'Getting Location...' : 'Use My Location'}
            </Button>

            {/* Location Search */}
            <div className="flex items-center gap-2">
              <Input placeholder="Search location..." value={locationSearch} onChange={e => setLocationSearch(e.target.value)} className="w-40 md:w-48 h-9" onKeyDown={e => e.key === 'Enter' && handleLocationSearch()} />
              <Button variant="outline" size="sm" onClick={handleLocationSearch}>
                <Search className="w-4 h-4" />
              </Button>
            </div>

            {/* Coordinate Input */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Enter Coordinates
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter Coordinates</DialogTitle>
                  <DialogDescription>
                    Enter latitude and longitude to calculate sun times
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div>
                    <Label>Latitude (-90 to 90)</Label>
                    <Input type="number" placeholder="e.g., 40.7128" value={coordInput.lat} onChange={e => setCoordInput(prev => ({
                    ...prev,
                    lat: e.target.value
                  }))} />
                  </div>
                  <div>
                    <Label>Longitude (-180 to 180)</Label>
                    <Input type="number" placeholder="e.g., -74.0060" value={coordInput.lon} onChange={e => setCoordInput(prev => ({
                    ...prev,
                    lon: e.target.value
                  }))} />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCoordinateSubmit}>Calculate Sun Times</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Export Calendar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Calendar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem onClick={handleExportPDF}>
                  Export to PDF
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleExportICS}>
                  Add to Google Calendar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportICS}>
                  Add to Microsoft Outlook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportICS}>
                  Add to Apple Calendar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportICS}>
                  Add to Linux Calendar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleExportICS}>
                  Download ICS File
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Print Button */}
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print Calendar
            </Button>
          </div>

          {/* Location Search Results */}
          {locationResults.length > 0 && <div className="mt-4 max-w-xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Search Results</span>
                  <Button variant="ghost" size="sm" onClick={() => setLocationResults([])}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {locationResults.map((result, i) => <button key={i} className="w-full text-left p-2 rounded hover:bg-muted/50 text-sm" onClick={() => {
              setCoordinates(result.latitude, result.longitude, result.locationName);
              setLocationResults([]);
              setLocationSearch('');
            }}>
                    <MapPin className="w-3 h-3 inline mr-2 text-muted-foreground" />
                    {result.locationName}
                  </button>)}
              </div>
            </div>}
        </div>
      </section>

      {/* Calendar Software */}
      <section className="py-8 bg-card/30" ref={printRef}>
        <div className="container mx-auto px-4">
          <Tabs defaultValue="monthly" className="max-w-7xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8 no-print">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
              <TabsTrigger value="feasts">Holy Days</TabsTrigger>
              <TabsTrigger value="sabbath">Sabbath</TabsTrigger>
              <TabsTrigger value="scriptures">Scriptures</TabsTrigger>
              <TabsTrigger value="reminders">Reminders</TabsTrigger>
            </TabsList>

            {/* Monthly Calendar Tab */}
            <TabsContent value="monthly">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  {/* Year Start Info */}
                  <div className="text-center mb-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-amber-400">Creator Year {currentYear - 2012}</strong> begins on{' '}
                      <strong>{gregorianMonthNames[yearStartInfo.month - 1]} {yearStartInfo.day}, {yearStartInfo.gregorianYear}</strong> (Gregorian) at Dawn
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Anchor: March 17, 2013 = Day 1, Month 1 • 364-Day Year Cycle • After the Equilux
                    </p>
                  </div>

                  {/* Year & Month Navigation */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setCurrentYear(prev => prev - 1)}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="min-w-[80px] text-center font-bold text-xl">{currentYear}</span>
                      <Button variant="outline" size="sm" onClick={() => setCurrentYear(prev => prev + 1)}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <CardTitle className="flex items-center gap-3 text-center">
                      <Calendar className="w-6 h-6 text-amber-400" />
                      <span className="text-amber-400 text-2xl">Month {monthData.monthNumber}</span>
                      <span className="text-muted-foreground text-sm">({monthData.gregorianMonths})</span>
                    </CardTitle>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setCurrentMonth(prev => prev > 0 ? prev - 1 : 11)}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="min-w-[60px] text-center font-medium">Month {monthData.monthNumber}</span>
                      <Button variant="outline" size="sm" onClick={() => setCurrentMonth(prev => prev < 11 ? prev + 1 : 0)}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardDescription className="text-center mt-2">
                    House of Prayer for All People • 1 Corinthians 16:1-2 • Acts 20:6-7 • 364 Days Year
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {/* Monthly Calendar Table */}
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
                          if (day === 0) {
                            return <TableCell key={dayIndex} className="border border-border/30" />;
                          }
                          const dayFeasts = getFeastsForDay(monthData.monthNumber, day);
                          const gregorianDate = getGregorianDate(currentYear, monthData.monthNumber, day);
                          const dayIsSabbath = isSabbath(monthData.monthNumber, day);
                          const isSelected = selectedDay === day;
                          const dayEvents = getEventsForDay(monthData.monthNumber, day);
                          const isToday = todayCreatorDate && todayCreatorDate.creatorYear === currentYear && todayCreatorDate.month === monthData.monthNumber && todayCreatorDate.day === day;
                          return <TableCell key={dayIndex} className={`border border-border/30 p-1.5 align-top cursor-pointer transition-colors min-h-[90px]
                                    ${dayIsSabbath ? 'bg-amber-500/10' : 'hover:bg-card/80'}
                                    ${isSelected ? 'ring-2 ring-primary' : ''}
                                    ${dayFeasts.length > 0 ? 'bg-primary/5' : ''}
                                    ${isToday ? 'ring-2 ring-green-500 bg-green-500/10' : ''}
                                  `} onClick={() => setSelectedDay(day)}>
                                  <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center justify-between">
                                      <span className={`font-bold text-base ${dayIsSabbath ? 'text-amber-400' : ''} ${isToday ? 'text-green-400' : ''}`}>
                                        {day}
                                      </span>
                                      {isToday && <Badge variant="outline" className="text-[8px] px-1 py-0 bg-green-500/20 text-green-300 border-green-500/30">
                                          Today
                                        </Badge>}
                                      {day === 1 && !isToday && <Badge variant="outline" className="text-[8px] px-1 py-0 bg-blue-500/20 text-blue-300 border-blue-500/30">
                                          New
                                        </Badge>}
                                    </div>
                                    
                                    <span className="text-[10px] text-muted-foreground">
                                      {formatGregorianDate(gregorianDate)}
                                    </span>
                                    
                                    {dayFeasts.map((feast, i) => <Badge key={i} variant="outline" className={`text-[8px] px-1 py-0 ${getFeastBadgeColor(feast.type)}`}>
                                        {feast.name.length > 15 ? feast.name.slice(0, 15) + '...' : feast.name}
                                      </Badge>)}
                                    
                                    {dayEvents.map((event, i) => <Badge key={i} variant="outline" className="text-[8px] px-1 py-0 bg-primary/20 text-primary border-primary/30">
                                        {event.title.length > 12 ? event.title.slice(0, 12) + '...' : event.title}
                                      </Badge>)}
                                    
                                    {dayIsSabbath && <span className="text-[9px] text-amber-400 font-medium">SHABBAT</span>}
                                  </div>
                                </TableCell>;
                        })}
                          </TableRow>)}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Legend */}
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs no-print">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-green-500/30 ring-2 ring-green-500" />
                      <span>Today</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-amber-500/30" />
                      <span>Sabbath</span>
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor('holy-day')}`}>Holy Day</Badge>
                    <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor('feast')}`}>Feast</Badge>
                    <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor('fast')}`}>Fast</Badge>
                    <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor('new-month')}`}>New Month</Badge>
                    <Badge variant="outline" className="text-[10px] bg-primary/20 text-primary border-primary/30">Your Event</Badge>
                  </div>

                  {/* Selected Day Info */}
                  {selectedDay && <motion.div initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} className="mt-4 p-4 rounded-lg bg-card/80 border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg">
                          Day {selectedDay} - Month {monthData.monthNumber}
                        </h4>
                        <div className="flex gap-2 no-print">
                          {user && <Button size="sm" onClick={() => setShowEventDialog(true)} className="gap-1">
                              <Plus className="w-4 h-4" />
                              Add Event
                            </Button>}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Gregorian:</strong> {formatGregorianDate(getGregorianDate(currentYear, monthData.monthNumber, selectedDay))}, {currentYear}
                        <span className="mx-2">•</span>
                        <strong>Hebrew Day:</strong> {getHebrewDayName(monthData.monthNumber, selectedDay).hebrew} ({getHebrewDayName(monthData.monthNumber, selectedDay).meaning})
                        {isSabbath(monthData.monthNumber, selectedDay) && <Badge className="ml-2 bg-amber-500/20 text-amber-300">SHABBAT</Badge>}
                      </p>

                      {/* Holy Days on this date */}
                      {getFeastsForDay(monthData.monthNumber, selectedDay).map((feast, i) => <div key={i} className="mt-2 p-3 rounded bg-primary/5 border border-primary/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-amber-400" />
                              <span className="font-medium">{feast.name}</span>
                              <span className="text-sm text-muted-foreground">({feast.hebrewName})</span>
                            </div>
                            <Button variant="ghost" size="sm" className="no-print" onClick={() => {
                        setSelectedHolyDay(feast);
                        setShowReminderDialog(true);
                      }}>
                              <Bell className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{feast.description}</p>
                          {feast.scriptures && feast.scriptures.length > 0 && <p className="text-xs text-amber-400 mt-1">
                              {feast.scriptures.join(' • ')}
                            </p>}
                          {feast.noWork && <Badge variant="outline" className="mt-2 bg-red-500/10 text-red-300 border-red-500/20">
                              No Work
                            </Badge>}
                        </div>)}

                      {/* User Events */}
                      {getEventsForDay(monthData.monthNumber, selectedDay).map(event => <div key={event.id} className="mt-2 p-3 rounded bg-primary/5 border border-primary/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Edit className="w-4 h-4 text-primary" />
                              <span className="font-medium">{event.title}</span>
                              <Badge variant="outline" className="text-xs">{event.event_type}</Badge>
                            </div>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive no-print" onClick={() => deleteEvent(event.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          {event.description && <p className="text-sm text-muted-foreground mt-1">{event.description}</p>}
                        </div>)}

                      {!user && <p className="text-sm text-muted-foreground mt-3 no-print">
                          <a href="/auth" className="text-primary hover:underline">Sign in</a> to create personal events
                        </p>}
                    </motion.div>}

                  {/* Month Notes */}
                  <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/30">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Book className="w-4 h-4 text-amber-400" />
                      NOTES - Month {monthData.monthNumber}:
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Numbers 10:10, Exodus 40 - New Month (Hadash), Beginning Month (Rash Hadash)</li>
                      {monthFeasts.filter(f => f.type !== 'new-month').map((feast, i) => <li key={i}>• {feast.name} ({feast.hebrewName}) - Day {feast.day}{feast.endDay !== feast.day ? `-${feast.endDay}` : ''}</li>)}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Year Overview Tab - Full Grid */}
            <TabsContent value="yearly">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-amber-400" />
                      Creator Year {currentYear - 2012} - Complete Overview
                    </CardTitle>
                    <div className="flex items-center gap-2 no-print">
                      <Button variant="outline" size="sm" onClick={() => setCurrentYear(prev => prev - 1)}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="min-w-[80px] text-center font-bold text-xl">{currentYear}</span>
                      <Button variant="outline" size="sm" onClick={() => setCurrentYear(prev => prev + 1)}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    All Holy Days and Weekly Sabbaths • Year begins {gregorianMonthNames[yearStartInfo.month - 1]} {yearStartInfo.day}, {yearStartInfo.gregorianYear} • 364 Days
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Four Seasons Grid */}
                  <div>
                    <h3 className="text-lg font-bold text-amber-400 mb-6">All 12 Months - Four Seasons</h3>
                    
                    {/* Season data */}
                    {[
                      { name: 'FIRST SEASON (SPRING)', color: 'blue', monthRange: [0, 1, 2], days: 91 },
                      { name: 'SECOND SEASON (SUMMER)', color: 'yellow', monthRange: [3, 4, 5], days: 91 },
                      { name: 'THIRD SEASON (FALL)', color: 'orange', monthRange: [6, 7, 8], days: 91 },
                      { name: 'FOURTH SEASON (WINTER)', color: 'cyan', monthRange: [9, 10, 11], days: 91 }
                    ].map((season, seasonIndex) => (
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
                              const absDay = (() => {
                                let total = 0;
                                for (let m = 1; m < month.monthNumber; m++) {
                                  total += calendarMonths[m - 1].days;
                                }
                                return total + d;
                              })();
                              const dayOfWeek = ((absDay - 1) % 7);
                              if (d === 1 && dayOfWeek > 0) {
                                for (let p = 0; p < dayOfWeek; p++) {
                                  miniWeek.push(0);
                                }
                              }
                              miniWeek.push(d);
                              if (miniWeek.length === 7) {
                                miniWeeks.push(miniWeek);
                                miniWeek = [];
                              }
                            }
                            if (miniWeek.length > 0) {
                              while (miniWeek.length < 7) miniWeek.push(0);
                              miniWeeks.push(miniWeek);
                            }
                            
                            return <motion.div key={month.monthNumber} initial={{
                              opacity: 0,
                              scale: 0.9
                            }} animate={{
                              opacity: 1,
                              scale: 1
                            }} transition={{
                              delay: monthIndex * 0.05
                            }} className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.02]
                                  ${currentMonth === monthIndex ? 'bg-primary/10 border-primary/50' : 'bg-card/50 border-border/30 hover:border-primary/30'}`} onClick={() => {
                              setCurrentMonth(monthIndex);
                              const tabList = document.querySelector('[role="tablist"]');
                              const monthlyTab = tabList?.querySelector('[value="monthly"]');
                              if (monthlyTab) (monthlyTab as HTMLElement).click();
                            }}>
                              <div className="text-center mb-2">
                                <h4 className="font-bold text-amber-400">Month {month.monthNumber}</h4>
                                <p className="text-[10px] text-muted-foreground">{month.days} days • {month.gregorianMonths}</p>
                              </div>

                              <table className="w-full text-[9px]">
                                <thead>
                                  <tr>
                                    {['1', '2', '3', '4', '5', '6', 'S'].map((d, i) => <th key={i} className={`text-center py-0.5 ${i === 6 ? 'text-amber-400' : 'text-muted-foreground'}`}>
                                      {d}
                                    </th>)}
                                  </tr>
                                </thead>
                                <tbody>
                                  {miniWeeks.map((week, wi) => <tr key={wi}>
                                    {week.map((day, di) => {
                                      if (day === 0) return <td key={di} />;
                                      const hasFeast = monthHolyDays.some(f => day >= f.day && day <= f.endDay && f.type !== 'new-month');
                                      const daySabbath = isSabbath(month.monthNumber, day);
                                      const isTodayMini = todayCreatorDate && todayCreatorDate.creatorYear === currentYear && todayCreatorDate.month === month.monthNumber && todayCreatorDate.day === day;
                                      return <td key={di} className={`text-center py-0.5 rounded-sm
                                        ${daySabbath ? 'bg-amber-500/20 text-amber-400 font-bold' : ''}
                                        ${hasFeast ? 'bg-primary/20 text-primary font-bold' : ''}
                                        ${isTodayMini ? 'ring-1 ring-green-500 bg-green-500/20 text-green-400 font-bold' : ''}
                                      `}>
                                        {day}
                                      </td>;
                                    })}
                                  </tr>)}
                                </tbody>
                              </table>

                              <div className="mt-2 space-y-0.5">
                                {monthHolyDays.filter(f => f.type !== 'new-month').slice(0, 3).map((feast, i) => <Badge key={i} variant="outline" className={`text-[8px] block truncate ${getFeastBadgeColor(feast.type)}`}>
                                  Day {feast.day}: {feast.name}
                                </Badge>)}
                                {monthHolyDays.filter(f => f.type !== 'new-month').length > 3 && <span className="text-[8px] text-muted-foreground">
                                  +{monthHolyDays.filter(f => f.type !== 'new-month').length - 3} more
                                </span>}
                              </div>
                            </motion.div>;
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Annual Holy Days List */}
                  <div>
                    <h3 className="text-lg font-bold text-amber-400 mb-4">Annual Holy Days</h3>
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
                          <h4 className="font-medium text-amber-400 mb-2">
                            {month.monthNumber}{month.monthNumber === 1 ? 'st' : month.monthNumber === 2 ? 'nd' : month.monthNumber === 3 ? 'rd' : 'th'} Month
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {sabbaths.map(d => <Badge key={d} variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">
                              Day {d}
                            </Badge>)}
                          </div>
                        </div>;
                      })}
                    </div>
                  </div>

                  {/* Summary Stats */}
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
                    <CardTitle className="flex items-center gap-3 text-green-400">
                      <Sparkles className="w-6 h-6" />
                      Spring Feasts (Months 1-3)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {feasts.filter(f => f.month <= 3 && f.type !== 'new-month').map((feast, index) => <motion.div key={feast.id} initial={{
                    opacity: 0,
                    x: -20
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} transition={{
                    delay: index * 0.1
                  }} className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-green-300">{feast.name}</h4>
                          <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor(feast.type)}`}>
                            {feast.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{feast.hebrewName}</p>
                        <p className="text-xs text-muted-foreground">
                          Month {feast.month}, Day {feast.day}{feast.endDay !== feast.day ? `-${feast.endDay}` : ''}
                        </p>
                        <p className="text-sm mt-1">{feast.description}</p>
                        {feast.noWork && <Badge variant="outline" className="mt-2 bg-red-500/10 text-red-300 text-[10px]">No Work</Badge>}
                      </motion.div>)}
                  </CardContent>
                </Card>

                {/* Fall Feasts */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-amber-400">
                      <Star className="w-6 h-6" />
                      Fall Feasts (Month 7)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {feasts.filter(f => f.month === 7 && f.type !== 'new-month').map((feast, index) => <motion.div key={feast.id} initial={{
                    opacity: 0,
                    x: 20
                  }} animate={{
                    opacity: 1,
                    x: 0
                  }} transition={{
                    delay: index * 0.1
                  }} className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-amber-300">{feast.name}</h4>
                          <Badge variant="outline" className={`text-[10px] ${getFeastBadgeColor(feast.type)}`}>
                            {feast.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{feast.hebrewName}</p>
                        <p className="text-xs text-muted-foreground">
                          Month {feast.month}, Day {feast.day}{feast.endDay !== feast.day ? `-${feast.endDay}` : ''}
                        </p>
                        <p className="text-sm mt-1">{feast.description}</p>
                        {feast.noWork && <Badge variant="outline" className="mt-2 bg-red-500/10 text-red-300 text-[10px]">No Work</Badge>}
                      </motion.div>)}
                  </CardContent>
                </Card>

                {/* Fast Days */}
                <Card className="bg-card/50 border-border/50 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-red-400">
                      <AlertCircle className="w-6 h-6" />
                      Fast Days
                    </CardTitle>
                    <CardDescription>Days of fasting - from evening to evening</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-3">
                      {feasts.filter(f => f.type === 'fast').map((feast, index) => <motion.div key={feast.id} initial={{
                      opacity: 0,
                      y: 20
                    }} animate={{
                      opacity: 1,
                      y: 0
                    }} transition={{
                      delay: index * 0.1
                    }} className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                          <h4 className="font-medium text-red-300">{feast.name}</h4>
                          <p className="text-xs text-muted-foreground">Month {feast.month}, Day {feast.day}</p>
                          <p className="text-xs text-muted-foreground">{feast.scriptures?.[0]}</p>
                        </motion.div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Sabbath Tab */}
            <TabsContent value="sabbath">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Moon className="w-6 h-6 text-amber-400" />
                    The Seventh Day Sabbath (SHABBAT)
                  </CardTitle>
                  <CardDescription>
                    A day begins at Dawn (Sunrise) - Preparation Day Shabbat starts at Dawn on the Seventh Day
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Dawn Scripture Evidence */}
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
                          <p className="text-sm text-muted-foreground mt-1">
                            <strong>G2020 - ἐπιφώσκω (epiphōskō)</strong>: "to begin to grow light: begin to dawn, draw on"
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            <strong>G4404 - πρωΐ́ (prōi)</strong>: "at dawn; by implication the day break watch: early in the morning"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <div className="flex items-start gap-4">
                      <Book className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="italic text-foreground mb-2">
                          "Remember the sabbath day, to keep it holy. Six days shalt thou labour, and do all thy work: 
                          But the seventh day is the sabbath of AHAYAH thy God: in it thou shalt not do any work..."
                        </p>
                        <p className="text-sm text-amber-400">Exodus 20:8-10</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Sunrise className="w-5 h-5 text-orange-400" />
                        <h4 className="font-medium">Sabbath Begins</h4>
                      </div>
                      <p className="text-muted-foreground">Day 7 at Dawn (Sunrise)</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        "The sun ariseth, they gather themselves together..." (Psalms 104:22)
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Sun className="w-5 h-5 text-amber-400" />
                        <h4 className="font-medium">Sabbath Ends</h4>
                      </div>
                      <p className="text-muted-foreground">Day 1 at Dawn (Sunrise)</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        "Man goeth forth unto his work and to his labour until the evening." (Psalms 104:23)
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <h4 className="font-medium">Twelve Hours in the Day</h4>
                    </div>
                    <p className="italic text-sm">
                      "Yashaya answered, Are there not twelve hours in the day? If any man walk in the day, 
                      he stumbleth not, because he seeth the light of this world."
                    </p>
                    <p className="text-xs text-amber-400 mt-1">John 11:9</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Scriptures Tab */}
            <TabsContent value="scriptures">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-yellow-400">
                      <Sun className="w-6 h-6" />
                      Light & Children of Light
                    </CardTitle>
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
                    <CardTitle className="flex items-center gap-3 text-blue-400">
                      <Book className="w-6 h-6" />
                      Commandments & Love
                    </CardTitle>
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
                    <CardTitle className="flex items-center gap-3 text-purple-400">
                      <Star className="w-6 h-6" />
                      Truth & Scripture Study
                    </CardTitle>
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
              </div>
            </TabsContent>

            {/* Reminders Tab */}
            <TabsContent value="reminders">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Bell className="w-6 h-6 text-primary" />
                    Holy Day Reminders
                  </CardTitle>
                  <CardDescription>
                    {user ? 'Set reminders for upcoming holy days' : 'Sign in to set holy day reminders'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!user ? <div className="text-center py-8">
                      <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Sign in to manage your holy day reminders</p>
                      <Button asChild>
                        <a href="/auth">Sign In</a>
                      </Button>
                    </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {feasts.filter(f => f.type !== 'new-month').map(feast => {
                    const reminder = getReminderForHolyDay(feast.name);
                    return <div key={feast.id} className={`p-4 rounded-lg border transition-all ${reminder?.reminder_enabled ? 'bg-primary/10 border-primary/30' : 'bg-card/50 border-border/30'}`}>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-sm">{feast.name}</h4>
                              <Badge variant="outline" className={`text-[9px] ${getFeastBadgeColor(feast.type)}`}>
                                {feast.type}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">
                              Month {feast.month}, Day {feast.day}
                            </p>
                            <div className="flex items-center justify-between">
                              <Select value={reminder?.remind_days_before?.toString() || '1'} onValueChange={value => setReminder(feast.name, parseInt(value), true)}>
                                <SelectTrigger className="w-24 h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 day</SelectItem>
                                  <SelectItem value="3">3 days</SelectItem>
                                  <SelectItem value="7">7 days</SelectItem>
                                  <SelectItem value="14">14 days</SelectItem>
                                </SelectContent>
                              </Select>
                              <Switch checked={reminder?.reminder_enabled || false} onCheckedChange={checked => setReminder(feast.name, reminder?.remind_days_before || 1, checked)} />
                            </div>
                          </div>;
                  })}
                    </div>}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Event Creation Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
            <DialogDescription>
              Add an event for Day {selectedDay}, Month {monthData.monthNumber}, Year {currentYear}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Event Title</Label>
              <Input placeholder="Event title..." value={newEvent.title} onChange={e => setNewEvent(prev => ({
              ...prev,
              title: e.target.value
            }))} />
            </div>
            <div>
              <Label>Description (optional)</Label>
              <Textarea placeholder="Event description..." value={newEvent.description} onChange={e => setNewEvent(prev => ({
              ...prev,
              description: e.target.value
            }))} />
            </div>
            <div>
              <Label>Event Type</Label>
              <Select value={newEvent.event_type} onValueChange={value => setNewEvent(prev => ({
              ...prev,
              event_type: value
            }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
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
            <DialogDescription>
              Set a reminder for {selectedHolyDay?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              How many days before would you like to be reminded?
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[1, 3, 7, 14].map(days => <Button key={days} variant="outline" onClick={() => handleSetReminder(days)}>
                  {days} day{days > 1 ? 's' : ''}
                </Button>)}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>;
};
export default CreatorsCalendar;
