import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getCreatorDateForGregorian } from '@/data/creatorsCalendar';

const messages = [
  "✦ PRAISE MOST HIGH AHAYAH BA SHAM YASHAYA ✦",
  "BLANCH S.H.I.E.L.D. AI — SYSTEM ONLINE",
  "Spiritual · Healing · Initiative · Economic · Light · Development",
  "2 Timothy 3:16 All scripture is given by inspiration of Most High AHAYAH, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness:",
  "2 Timothy 3:17 That the man of Most High AHAYAH may be perfect, throughly furnished unto all good works.",
  "2 Timothy 2:15 Study to shew thyself approved unto Most High AHAYAH, a workman that needeth not to be ashamed, rightly dividing the word of truth.",
  "Psalms 119:142 Thy righteousness is an everlasting righteousness, and thy law is the truth.",
  "Psalms 119:151 Thou art near, O Most High AHAYAH; and all thy commandments are truth.",
  "Proverbs 6:23 For the commandment is a lamp; and the law is light; and reproofs of instruction are the way of life:",
  "John 14:6 Yashaya saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
  <span>John 4:24 <span className="text-red-500">Most High AHAYAH is a Spirit: and they that worship him must worship him in spirit and in truth.</span></span>,
  <span>John 10:30 <span className="text-red-500">I and my Father are one.</span></span>,
  "John 8:32 And ye shall know the truth, and the truth shall make you free",
  "Psalms 119:142 Thy righteousness is an everlasting righteousness, and thy law is the truth.",
  "John 14:6 Yashaya saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
  "1 John 5:3 For this is the love of Most High AHAYAH, that we keep his commandments: and his commandments are not grievous",
  "1 John 5:2 By this we know that we love the children of Most High AHAYAH when we love Most High AHAYAH, and keep his commandments.",
  "Hebrews 13:8 Yashaya Christ the same yesterday, and to day, and for ever.",
  "Isaiah 29:22 Therefore thus saith the Most High AHAYAH who redeemed Abraham, concerning the house of Jacob, Jacob shall not now be ashamed, neither shall his face now wax pale.",
  "Psalms 105:23 Israel also came into Egypt; and Jacob sojourned in the land of Ham.",
  "Psalms 105:23 La sainte Bible Alors YaShaRaHaLa (Israel) vint en Egypte; Jacob sejourna au pays de Cham.",
  "Job 30:30 My skin is black upon me, and my bones are burned with heat.",
  "Jeremiah 14:2 Judah mourneth, and the gates thereof languish; they are black unto the ground; and the cry of Jerusalem is gone up.",
  "Royal Priesthood · Royal House of Judah (Yadah) · Royal House of Levite (Laway)s Covenant",
  "BLANCH GROUP ECOSYSTEM — ALL SYSTEMS OPERATIONAL",
  "SOVEREIGN UNIVERSAL INTELLIGENCE & ETHICAL OPERATING SYSTEM",
  "BLANCH S.H.I.E.L.D. AI — ALL NATIONS · ALL LANGUAGES · ALL PEOPLE",
];

const SpiritualTicker = () => {
  const now = new Date();
  const hebrewYear = now.getFullYear() + 3760;
  const todayCreatorDate = getCreatorDateForGregorian(now);
  const tickerItems = [...messages, ...messages];

  return (
    <div className="fixed top-0 left-0 right-0 z-[61] bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 backdrop-blur-xl border-b border-primary/30 flex items-center">
      <div className="flex items-center gap-3 px-6">
        <Badge className="bg-yellow-500/10 border-yellow-500/20 text-yellow-300 text-[11px] font-display tracking-wider">✦ PRAISE MOST HIGH AHAYAH BA SHAM YASHAYA ✦</Badge>
        <Badge className="bg-purple-500/10 border-purple-500/20 text-purple-300 text-[11px] font-display tracking-wider">Hebrew Year: {hebrewYear}</Badge>
        <button className="text-[11px] font-display tracking-wider text-primary border border-primary/30 px-2 py-1 rounded flex items-center gap-1">
          <MessageSquare className="w-3 h-3" />
          Ask S.H.I.E.L.D. AI
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex animate-ticker">
          {tickerItems.map((msg, index) => (
            <div
              key={`${index}`}
              className="flex items-center gap-3 px-6 py-1 whitespace-nowrap"
            >
              <span className="text-[11px] font-display tracking-wider text-primary">
                {msg}
              </span>
              <span className="text-primary/40">✦</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6">
        <span className="text-[11px] font-display tracking-wider text-primary">
          Creators Restoration Date Today: {todayCreatorDate ? `Month ${todayCreatorDate.month}, Day ${todayCreatorDate.day}, and Year ${todayCreatorDate.creatorYearNum}` : 'Loading...'}
        </span>
      </div>
    </div>
  );
};

export default SpiritualTicker;
