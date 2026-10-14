import { doc, increment, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { auth, db } from '../../config/firebase';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const DAILY_ARTICLES = [
  {
    title: 'Designing for Inclusion: Why Universal Design Matters',
    author: 'Habib Center for Accessible Design',
    summary: 'Universal design doesn’t just help wheelchair users—curb cuts, automatic doors, and ramps improve mobility for parents with strollers, delivery workers, and the elderly alike.',
    link: 'https://en.wikipedia.org/wiki/Universal_design',
  },
  {
    title: 'The Social Model of Disability Explained',
    author: 'Inclusion Network',
    summary: 'The social model says people are disabled by barriers in society (like stairs without ramps), not by their personal medical impairment. Fixing the environment fixes the barrier.',
    link: 'https://en.wikipedia.org/wiki/Social_model_of_disability',
  },
  {
    title: 'Invisible Disabilities in Everyday Life',
    author: 'Access Advocacy Project',
    summary: 'Over 70% of disabilities are invisible, including chronic pain, neurological conditions, and fatigue disorders. Accessible seating is just as vital for them.',
    link: 'https://en.wikipedia.org/wiki/Invisible_disability',
  },
];

const QUIZ_QUESTIONS: Question[] = [
  {
    question: 'What is the "curb cut effect"?',
    options: [
      'A ramp cutting costs in construction',
      'Accessibility features built for disabled people that end up benefiting everyone',
      'A city fine for blocking wheelchair paths',
      'The slope angle required by the ADA',
    ],
    correctIndex: 1,
    explanation: 'Sidewalk ramps originally created for wheelchair users ended up helping parents with strollers, bikers, and travelers with luggage.',
  },
  {
    question: 'According to the ADA, what is the maximum standard slope for a wheelchair ramp?',
    options: ['1:12 (1 inch rise per 12 inches length)', '1:5', '1:20', '1:2'],
    correctIndex: 0,
    explanation: 'The standard ADA ramp slope is 1:12 so manual wheelchair users can climb without tipping backward.',
  },
  {
    question: 'What percentage of disabilities are estimated to be non-apparent (invisible)?',
    options: ['Less than 10%', 'Around 25%', 'Around 50%', 'Over 70%'],
    correctIndex: 3,
    explanation: 'Most people living with disabilities have conditions that are not immediately visible from the outside.',
  },
  {
    question: 'What should you do before helping someone who uses a wheelchair or mobility aid?',
    options: [
      'Immediately grab their handles and push',
      'Always ask first and wait for their permission',
      'Move objects out of their way without speaking',
      'Assume they always need assistance',
    ],
    correctIndex: 1,
    explanation: 'A wheelchair is an extension of personal space. Always ask if assistance is needed first and respect their answer.',
  },
  {
    question: 'Which of the following is considered an architectural barrier?',
    options: [
      'Braille signage next to an elevator',
      'Audible crosswalk signals',
      'A single step at a restaurant entrance without an alternative ramp',
      'Automatic sliding doors',
    ],
    correctIndex: 2,
    explanation: 'Even a single 2-inch step can completely prevent access for power wheelchairs and manual users.',
  },
];

export default function LearnScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answered, setAnswered] = useState(false);

  // Pick an article based on the current day of the year
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  const todaysArticle = DAILY_ARTICLES[dayOfYear % DAILY_ARTICLES.length];

  const handleSelectOption = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);

    if (index === QUIZ_QUESTIONS[currentQuestionIndex].correctIndex) {
      setScore((prev) => prev + 10);
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setQuizCompleted(true);
      // Save points to user profile in Firestore
      if (auth.currentUser) {
        try {
          const userRef = doc(db, 'users', auth.currentUser.uid);
          await updateDoc(userRef, {
            quizScore: increment(score + (selectedOption === QUIZ_QUESTIONS[currentQuestionIndex].correctIndex ? 10 : 0)),
          });
        } catch (e) {
          console.log('Error updating score:', e);
        }
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnswered(false);
    setQuizCompleted(false);
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Article of the Day Section */}
      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>ARTICLE OF THE DAY</Text>
        </View>
        <Text style={styles.articleTitle}>{todaysArticle.title}</Text>
        <Text style={styles.articleAuthor}>By {todaysArticle.author}</Text>
        <Text style={styles.articleSummary}>{todaysArticle.summary}</Text>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => Linking.openURL(todaysArticle.link)}
        >
          <Text style={styles.linkButtonText}>Read More →</Text>
        </TouchableOpacity>
      </View>

      {/* Accessibility Quiz Section */}
      <View style={[styles.card, styles.quizCard]}>
        <View style={[styles.badge, styles.quizBadge]}>
          <Text style={styles.badgeText}>ACCESSIBILITY QUIZ</Text>
        </View>

        {!quizCompleted ? (
          <>
            <View style={styles.quizHeader}>
              <Text style={styles.questionTracker}>
                Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
              </Text>
              <Text style={styles.scoreText}>Points: {score}</Text>
            </View>

            <Text style={styles.questionText}>{currentQ.question}</Text>

            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;
              let optionStyle = styles.optionButton;
              let textStyle = styles.optionText;

              if (answered) {
                if (isCorrect) {
                  optionStyle = [styles.optionButton, styles.optionCorrect];
                  textStyle = [styles.optionText, styles.optionTextHighlight];
                } else if (isSelected && !isCorrect) {
                  optionStyle = [styles.optionButton, styles.optionWrong];
                  textStyle = [styles.optionText, styles.optionTextHighlight];
                }
              }

              return (
                <TouchableOpacity
                  key={idx}
                  style={optionStyle}
                  onPress={() => handleSelectOption(idx)}
                  disabled={answered}
                >
                  <Text style={textStyle}>{option}</Text>
                </TouchableOpacity>
              );
            })}

            {answered && (
              <View style={styles.explanationBox}>
                <Text style={styles.explanationText}>{currentQ.explanation}</Text>
                <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                  <Text style={styles.nextButtonText}>
                    {currentQuestionIndex + 1 === QUIZ_QUESTIONS.length ? 'Finish Quiz' : 'Next Question →'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <View style={styles.completionBox}>
            <Text style={styles.completionTitle}>Quiz Completed!</Text>
            <Text style={styles.completionScore}>Total Points Earned: {score}</Text>
            <Text style={styles.completionNote}>
              Your score has been updated to your profile for the community leaderboard.
            </Text>
            <TouchableOpacity style={styles.restartButton} onPress={handleRestartQuiz}>
              <Text style={styles.restartButtonText}>Take Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 16, paddingTop: 50, paddingBottom: 40 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  quizCard: { backgroundColor: '#fff' },
  badge: {
    backgroundColor: '#e0e7ff',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },
  quizBadge: { backgroundColor: '#fef3c7' },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#3730a3', letterSpacing: 0.5 },
  articleTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 4 },
  articleAuthor: { fontSize: 13, color: '#6b7280', marginBottom: 10, fontStyle: 'italic' },
  articleSummary: { fontSize: 14, color: '#374151', lineHeight: 20, marginBottom: 14 },
  linkButton: { alignSelf: 'flex-start' },
  linkButtonText: { color: '#4338ca', fontWeight: '600', fontSize: 14 },
  quizHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  questionTracker: { fontSize: 13, color: '#6b7280', fontWeight: '600' },
  scoreText: { fontSize: 13, color: '#059669', fontWeight: '700' },
  questionText: { fontSize: 17, fontWeight: '600', color: '#111827', marginBottom: 16, lineHeight: 24 },
  optionButton: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  optionCorrect: { backgroundColor: '#10b981', borderColor: '#059669' },
  optionWrong: { backgroundColor: '#ef4444', borderColor: '#dc2626' },
  optionText: { fontSize: 14, color: '#1f2937', fontWeight: '500' },
  optionTextHighlight: { color: '#fff', fontWeight: '700' },
  explanationBox: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4338ca',
  },
  explanationText: { fontSize: 13, color: '#4b5563', lineHeight: 18, marginBottom: 12 },
  nextButton: {
    backgroundColor: '#4338ca',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  completionBox: { alignItems: 'center', paddingVertical: 20 },
  completionTitle: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 8 },
  completionScore: { fontSize: 18, fontWeight: '600', color: '#059669', marginBottom: 10 },
  completionNote: { fontSize: 13, color: '#6b7280', textAlign: 'center', marginBottom: 20, paddingHorizontal: 10 },
  restartButton: {
    backgroundColor: '#4338ca',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  restartButtonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});