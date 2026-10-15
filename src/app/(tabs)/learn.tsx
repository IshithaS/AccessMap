import { Ionicons } from '@expo/vector-icons';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DAILY_ARTICLES = [
  {
    title: 'We Are Not a Burden: Why Accessibility Is a Human Right',
    author: 'Alice Wong (The New York Times)',
    summary:
      'Disability rights activist Alice Wong argues that accessible spaces and public accommodations should never be treated as optional charity, but as foundational civil rights.',
    link: 'https://www.nytimes.com/2020/07/26/opinion/disability-americans-with-disabilities-act.html',
  },
  {
    title: 'The Inaccessible City: How Modern Urban Design Excludes Us',
    author: 'Penny Pepper (The Guardian)',
    summary:
      'A deep dive into how poorly planned transit, broken curb cuts, and missing elevators quietly lock millions of disabled citizens out of public and economic life.',
    link: 'https://www.theguardian.com/commentisfree/2018/feb/14/accessible-cities-disabled-people-transport-planning',
  },
  {
    title: 'What Doctors Don’t Understand About Living With a Disability',
    author: 'Rebecca Cokley (Washington Post)',
    summary:
      'Disability justice activist Rebecca Cokley explores the social model of disability, highlighting why dismantling environmental barriers matters just as much as medical care.',
    link: 'https://www.washingtonpost.com/outlook/2019/07/11/what-doctors-dont-understand-about-disability/',
  },
  {
    title: 'Accessible Tech Isn’t Just for Disabled People—It Helps Everyone',
    author: 'Sara Hendren (Wired)',
    summary:
      'How designing tools and interfaces with extreme accessibility constraints in mind consistently yields better innovations for all users.',
    link: 'https://www.wired.com/story/design-for-disability-helps-everyone/',
  },
  {
    title: 'The Real Problem Isn’t My Wheelchair. It’s Your Stairs.',
    author: 'Stella Young (ABC News / TED)',
    summary:
      'A candid commentary rejecting "inspiration porn" and detailing how true inclusion requires fixing physical environments and attitudes rather than offering pity.',
    link: 'https://www.ted.com/talks/stella_young_i_m_not_your_inspiration_thank_you_very_much',
  },
];

export default function LearnScreen() {
  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Accessibility Voices</Text>
      <Text style={styles.subHeader}>
        Curated essays, op-eds, and talks on disability justice and inclusive design.
      </Text>

      {DAILY_ARTICLES.map((article, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.author}>{article.author}</Text>
          <Text style={styles.summary}>{article.summary}</Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleOpenLink(article.link)}
          >
            <Text style={styles.linkText}>Read Article</Text>
            <Ionicons name="open-outline" size={16} color="#4338ca" />
          </TouchableOpacity>
        </View>
      ))}
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
    marginBottom: 20,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  author: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 10,
  },
  summary: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 14,
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
});