import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface OpEdArticle {
  title: string;
  author: string;
  summary: string;
  link: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Seeded articles for October (mapped by day of month 1–31)
const OCTOBER_ARTICLES: Record<number, OpEdArticle> = {
  1: {
    title: 'We Are Not a Burden: Why Accessibility Is a Human Right',
    author: 'Alice Wong (The New York Times)',
    summary: 'Accessible spaces and public accommodations should never be treated as optional charity, but as foundational civil rights.',
    link: 'https://www.nytimes.com/2020/07/26/opinion/disability-americans-with-disabilities-act.html',
  },
  2: {
    title: 'The Inaccessible City: How Modern Urban Design Excludes Us',
    author: 'Penny Pepper (The Guardian)',
    summary: 'A deep dive into how poorly planned transit, broken curb cuts, and missing elevators quietly lock millions of disabled citizens out of public life.',
    link: 'https://www.theguardian.com/commentisfree/2018/feb/14/accessible-cities-disabled-people-transport-planning',
  },
  3: {
    title: 'What Doctors Don’t Understand About Living With a Disability',
    author: 'Rebecca Cokley (Washington Post)',
    summary: 'Explores the social model of disability, highlighting why dismantling environmental barriers matters just as much as medical care.',
    link: 'https://www.washingtonpost.com/outlook/2019/07/11/what-doctors-dont-understand-about-disability/',
  },
  4: {
    title: 'Accessible Tech Isn’t Just for Disabled People—It Helps Everyone',
    author: 'Sara Hendren (Wired)',
    summary: 'How designing tools with extreme accessibility constraints consistently yields better innovations for all users.',
    link: 'https://www.wired.com/story/design-for-disability-helps-everyone/',
  },
  5: {
    title: 'The Real Problem Isn’t My Wheelchair. It’s Your Stairs.',
    author: 'Stella Young (ABC News / TED)',
    summary: 'A candid rejection of inspiration tropes, illustrating how genuine equity requires redesigning physical environments.',
    link: 'https://www.ted.com/talks/stella_young_i_m_not_your_inspiration_thank_you_very_much',
  },
  6: {
    title: 'Designing for Neurodiversity in Public Architecture',
    author: 'Magda Mostafa (Architectural Review)',
    summary: 'Why sensory-friendly acoustic damping and predictable physical pathways are essential to building cities for all minds.',
    link: 'https://www.architectural-review.com/',
  },
  7: {
    title: 'The Future of Inclusive Transit and Mobility',
    author: 'Haben Girma (Time)',
    summary: 'How autonomous vehicles and assistive infrastructure can transform independent transit for blind and Deafblind travelers.',
    link: 'https://time.com/',
  },
  8: {
    title: 'Rethinking the Curb Cut Effect in Modern Software',
    author: 'Angela Glover Blackwell (Stanford Social Innovation Review)',
    summary: 'Laws designed to aid people with disabilities routinely produce universal benefits for broader society.',
    link: 'https://ssir.org/articles/entry/the_curb_cut_effect',
  },
  9: {
    title: 'When Navigating Public Transit Is an Obstacle Course',
    author: 'Gretchen Rachel Hammond (Chicago Tribune)',
    summary: 'Elevator outages across metropolitan rail systems turn daily commutes into stranded nightmares.',
    link: 'https://www.chicagotribune.com/',
  },
  10: {
    title: 'The Hidden Toll of Inaccessible Websites',
    author: 'Sheri Byrne-Haber (Medium)',
    summary: 'How missing alt-text and bad keyboard navigation prevent people with disabilities from accessing essential civic services.',
    link: 'https://medium.com/',
  },
  11: {
    title: 'Disability and the Right to the City',
    author: 'Rob Imrie (Urban Studies)',
    summary: 'An academic examination of structural architectural bias in post-war urban renewal projects.',
    link: 'https://journals.sagepub.com/home/usj',
  },
  12: {
    title: 'Why Every City Needs a Universal Design Mandate',
    author: 'Edward Steinfeld (Architect Magazine)',
    summary: 'Going beyond baseline ADA compliance to build truly welcoming, barrier-free municipal infrastructure.',
    link: 'https://www.architectmagazine.com/',
  },
  13: {
    title: 'The Deaf Community and the Architecture of Space',
    author: 'Hansel Bauman (DeafSpace Project)',
    summary: 'How lighting, sightlines, and wide hallways create naturally communicative architectural environments.',
    link: 'https://www.gallaudet.edu/campus-design-and-planning/deafspace/',
  },
  14: {
    title: 'Emergency Evacuation Plans Still Forget Wheelchair Users',
    author: 'Vilissa Thompson (HuffPost)',
    summary: 'High-rise fire drills and natural disaster protocols routinely treat disabled occupants as an afterthought.',
    link: 'https://www.huffpost.com/',
  },
  15: {
    title: 'The Loneliness of the Broken Ramp',
    author: 'Keah Brown (Essence)',
    summary: 'Personal reflections on how exclusionary physical barriers damage emotional well-being and social connection.',
    link: 'https://www.essence.com/',
  },
  16: {
    title: 'Tactile Paving: The Silent Navigation Network',
    author: 'Seiichi Miyake Memorial Feature (Japan Times)',
    summary: 'The history and global impact of yellow blister paving bricks designed for visually impaired pedestrians.',
    link: 'https://www.japantimes.co.jp/',
  },
  17: {
    title: 'Inclusive Playgrounds: Why Swing Sets Are Not Enough',
    author: 'Mara Kaplan (Parks & Rec Business)',
    summary: 'Creating play areas where children of all physical and sensory abilities can play side-by-side.',
    link: 'https://www.parksandrecbusiness.com/',
  },
  18: {
    title: 'The High Cost of Medical Equipment Inaccessibility',
    author: 'Lisa I. Iezzoni (Health Affairs)',
    summary: 'Why inaccessible examination tables and mammography machines contribute to severe health disparities.',
    link: 'https://www.healthaffairs.org/',
  },
  19: {
    title: 'Audio Descriptions Are the New Frontier of Visual Art',
    author: 'Georgina Kleege (Art in America)',
    summary: 'How museum audio tours crafted for blind patrons enrich the aesthetic experience for everyone.',
    link: 'https://www.artnews.com/c/art-in-america/',
  },
  20: {
    title: 'Sidewalk Maintenance Is a Public Health Issue',
    author: 'Jay Pitter (The Globe and Mail)',
    summary: 'Uneven concrete and tree-root damage cause preventable injuries and limit mobility for seniors and wheelchair users.',
    link: 'https://www.theglobeandmail.com/',
  },
  21: {
    title: 'The Fight for Accessible Voting Booths',
    author: 'Mia Ives-Rublee (Center for American Progress)',
    summary: 'How polling site physical barriers and inaccessible paper ballots disenfranchise disabled voters.',
    link: 'https://www.americanprogress.org/',
  },
  22: {
    title: 'Wayfinding Apps and Cognitive Accessibility',
    author: 'Clayton Lewis (Communications of the ACM)',
    summary: 'Designing mapping interfaces with clear visual hierarchies to assist users with cognitive disabilities.',
    link: 'https://cacm.acm.org/',
  },
  23: {
    title: 'Why Historic Preservation Must Not Block Ramps',
    author: 'David G. Woodcock (Preservation Forum)',
    summary: 'Debunking the myth that adding wheelchair ramps and automated doors ruins historic architecture.',
    link: 'https://forum.savingplaces.org/',
  },
  24: {
    title: 'Acoustics in Classrooms: Hearing Every Student',
    author: 'Peggy B. Nelson (Acoustical Society of America)',
    summary: 'How reverberation reduction and sound field systems support students with hearing loss and attention differences.',
    link: 'https://acoustics.org/',
  },
  25: {
    title: 'Airport Travel While Disabled: A Trial of Patience',
    author: 'John Morris (Wheelchair Travel)',
    summary: 'Examining airline wheelchair damage rates and the push for passengers to fly in their own mobility devices.',
    link: 'https://wheelchairtravel.org/',
  },
  26: {
    title: 'Color Contrast and Low Vision in Digital Maps',
    author: 'Geri Coady (A List Apart)',
    summary: 'Guidance on palette selection and contrast ratios for digital mapping applications.',
    link: 'https://alistapart.com/',
  },
  27: {
    title: 'Accessible Restrooms: Beyond Just the Grab Bar',
    author: 'Corinne Gray (Uncomfortable Revolution)',
    summary: 'Why adult changing tables and powered door openers are needed in major transit hubs.',
    link: 'https://urevolution.com/',
  },
  28: {
    title: 'Chronic Illness and the Built Environment',
    author: 'Porochista Khakpour (The New Yorker)',
    summary: 'Reflections on how air filtration, seating availability, and walking distances impact invisible disabilities.',
    link: 'https://www.newyorker.com/',
  },
  29: {
    title: 'Shared Streets and the Hazard for Guide Dogs',
    author: 'Guide Dogs for the Blind Policy Brief',
    summary: 'How curb-less shared street zones create confusion and safety risks for pedestrians who rely on tactile edges.',
    link: 'https://www.guidedogs.org.uk/',
  },
  30: {
    title: 'The Power of Community-Sourced Accessibility Audits',
    author: 'Jason DaSilva (AXS Map)',
    summary: 'How crowd-sourced mapping platforms empower communities to catalog real-world accessibility barriers.',
    link: 'https://www.axsmap.com/',
  },
  31: {
    title: 'Accessibility Is Resilience: Preparing Cities for the Future',
    author: 'Victor Pineda (World Economic Forum)',
    summary: 'Cities designed with universal accessibility principles are more resilient to climate events and aging populations.',
    link: 'https://www.weforum.org/',
  },
};

export default function LearnScreen() {
  const currentDate = new Date();
  const currentMonthName = MONTHS[currentDate.getMonth()];
  const currentDay = currentDate.getDate();

  const [selectedMonth, setSelectedMonth] = useState<string>('October');
  const [selectedDay, setSelectedDay] = useState<number>(currentDay);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Retrieve article if in October, otherwise undefined for placeholder
  const activeArticle: OpEdArticle | undefined =
    selectedMonth === 'October' ? OCTOBER_ARTICLES[selectedDay] : undefined;

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Daily Op-Ed</Text>
      <Text style={styles.subHeader}>
        One curated reading every day on disability justice and inclusive design.
      </Text>

      {/* Month Dropdown Button */}
      <View style={styles.monthSelectorRow}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(true)}
        >
          <Text style={styles.dropdownButtonText}>{selectedMonth}</Text>
          <Ionicons name="chevron-down" size={18} color="#4338ca" />
        </TouchableOpacity>
        <Text style={styles.dateIndicator}>Day {selectedDay}</Text>
      </View>

      {/* Month Picker Modal */}
      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Month</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {MONTHS.map((month) => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.modalItem,
                    selectedMonth === month && styles.modalItemSelected,
                  ]}
                  onPress={() => {
                    setSelectedMonth(month);
                    setDropdownVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalItemText,
                      selectedMonth === month && styles.modalItemTextSelected,
                    ]}
                  >
                    {month}
                  </Text>
                  {selectedMonth === month && (
                    <Ionicons name="checkmark" size={18} color="#4338ca" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Horizontal Date Number Strip (1–31) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysScroll}
      >
        {daysInMonth.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <TouchableOpacity
              key={day}
              style={[styles.dayButton, isSelected && styles.dayButtonSelected]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[styles.dayNumber, isSelected && styles.dayTextSelected]}>
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Date Header Badge */}
      <View style={styles.badgeRow}>
        <Text style={styles.dayBadge}>
          {selectedMonth} {selectedDay} Feature
        </Text>
      </View>

      {/* Article Content or Placeholder */}
      {activeArticle ? (
        <View style={styles.card}>
          <Text style={styles.title}>{activeArticle.title}</Text>
          <Text style={styles.author}>{activeArticle.author}</Text>
          <Text style={styles.summary}>{activeArticle.summary}</Text>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleOpenLink(activeArticle.link)}
          >
            <Text style={styles.linkText}>Read Full Article</Text>
            <Ionicons name="open-outline" size={16} color="#4338ca" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Ionicons name="calendar-outline" size={40} color="#9ca3af" />
          <Text style={styles.emptyTitle}>No Article Available</Text>
          <Text style={styles.emptySubtitle}>
            Op-eds for {selectedMonth} {selectedDay} have not been scheduled yet. Check back soon or switch back to October!
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  subHeader: {
    fontSize: 15,
    color: '#4b5563',
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 22,
  },
  monthSelectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dropdownButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4338ca',
  },
  dateIndicator: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  modalItemSelected: {
    backgroundColor: '#eef2ff',
    borderRadius: 8,
  },
  modalItemText: {
    fontSize: 15,
    color: '#374151',
  },
  modalItemTextSelected: {
    color: '#4338ca',
    fontWeight: '700',
  },
  daysScroll: {
    gap: 8,
    paddingVertical: 4,
    marginBottom: 18,
  },
  dayButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayButtonSelected: {
    backgroundColor: '#4338ca',
    borderColor: '#4338ca',
  },
  dayNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4b5563',
  },
  dayTextSelected: {
    color: '#ffffff',
  },
  badgeRow: {
    marginBottom: 10,
  },
  dayBadge: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#4338ca',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 6,
  },
  author: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 12,
  },
  summary: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 16,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4338ca',
  },
  emptyCard: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginTop: 12,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});