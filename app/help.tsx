import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, Linking } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronRight,
  Book,
  Video,
  Users,
  Bug,
  Star
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface SupportOption {
  title: string;
  description: string;
  icon: any;
  action: () => void;
  color: string;
}

export default function HelpScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: 'How do I create my first podcast?',
      answer: 'To create your first podcast, go to your profile and tap "Create New Episode". You\'ll need a Premium or Creator Pro subscription to publish podcasts.',
      category: 'Getting Started',
    },
    {
      question: 'Can I download episodes for offline listening?',
      answer: 'Yes! Premium subscribers can download unlimited episodes for offline listening. Free users get 5 downloads per month.',
      category: 'Features',
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription anytime in Settings > Subscription. Your premium features will remain active until the end of your billing period.',
      category: 'Billing',
    },
    {
      question: 'Why can\'t I see video content?',
      answer: 'Make sure you have a stable internet connection and the latest app version. Video quality depends on your subscription tier.',
      category: 'Technical',
    },
    {
      question: 'How do I report inappropriate content?',
      answer: 'Tap the three dots menu on any episode and select "Report". Our moderation team will review the content within 24 hours.',
      category: 'Safety',
    },
    {
      question: 'Can I share my podcasts on other platforms?',
      answer: 'Creator Pro subscribers can export their podcasts to other platforms. Basic creators can share links to their RISE & SPEAK episodes.',
      category: 'Features',
    },
  ];

  const supportOptions: SupportOption[] = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: MessageCircle,
      color: Colors.primary[500],
      action: () => console.log('Open live chat'),
    },
    {
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      icon: Mail,
      color: Colors.accent.emerald,
      action: () => {
        if (Platform.OS === 'web') {
          window.open('mailto:support@riseandspeak.com');
        } else {
          Linking.openURL('mailto:support@riseandspeak.com');
        }
      },
    },
    {
      title: 'Phone Support',
      description: 'Call us during business hours (9 AM - 6 PM PST)',
      icon: Phone,
      color: Colors.accent.orange,
      action: () => {
        if (Platform.OS === 'web') {
          window.open('tel:+1-555-RISE-SPEAK');
        } else {
          Linking.openURL('tel:+1-555-RISE-SPEAK');
        }
      },
    },
    {
      title: 'Community Forum',
      description: 'Connect with other creators and get community support',
      icon: Users,
      color: Colors.accent.pink,
      action: () => console.log('Open community forum'),
    },
  ];

  const quickLinks = [
    {
      title: 'User Guide',
      description: 'Complete guide to using RISE & SPEAK',
      icon: Book,
      color: Colors.secondary[500],
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video tutorials',
      icon: Video,
      color: Colors.accent.amber,
    },
    {
      title: 'Report a Bug',
      description: 'Found an issue? Let us know',
      icon: Bug,
      color: Colors.accent.red,
    },
    {
      title: 'Feature Request',
      description: 'Suggest new features for the app',
      icon: Star,
      color: Colors.accent.emerald,
    },
  ];

  const filteredFAQs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const triggerHapticFeedback = () => {
    if (Platform.OS === 'web') {
      console.log('Button pressed');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.dark}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => {
              router.back();
              triggerHapticFeedback();
            }}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <LinearGradient
            colors={Colors.gradients.primary}
            style={styles.titleGradient}
          >
            <HelpCircle size={20} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Help & Support</Text>
          </LinearGradient>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
            <Search size={20} color={Colors.neutral[400]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for help..."
              placeholderTextColor={Colors.neutral[500]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Support Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Support</Text>
          <View style={styles.supportGrid}>
            {supportOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.supportCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}
                onPress={() => {
                  option.action();
                  triggerHapticFeedback();
                }}
              >
                <View style={[styles.supportIcon, { backgroundColor: option.color + '20' }]}>
                  <option.icon size={24} color={option.color} />
                </View>
                <Text style={styles.supportTitle}>{option.title}</Text>
                <Text style={styles.supportDescription}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={[styles.quickLinksCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
            {quickLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quickLinkItem,
                  index < quickLinks.length - 1 && styles.quickLinkBorder
                ]}
                onPress={() => {
                  console.log('Quick link pressed:', link.title);
                  triggerHapticFeedback();
                }}
              >
                <View style={styles.quickLinkLeft}>
                  <View style={[styles.quickLinkIcon, { backgroundColor: link.color + '20' }]}>
                    <link.icon size={20} color={link.color} />
                  </View>
                  <View>
                    <Text style={styles.quickLinkTitle}>{link.title}</Text>
                    <Text style={styles.quickLinkDescription}>{link.description}</Text>
                  </View>
                </View>
                <ChevronRight size={20} color={Colors.neutral[400]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {filteredFAQs.map((faq, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.faqCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}
              onPress={() => {
                setExpandedFAQ(expandedFAQ === index ? null : index);
                triggerHapticFeedback();
              }}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqCategory}>{faq.category}</Text>
                <ChevronRight 
                  size={20} 
                  color={Colors.neutral[400]}
                  style={[
                    styles.faqChevron,
                    expandedFAQ === index && styles.faqChevronExpanded
                  ]}
                />
              </View>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              {expandedFAQ === index && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={[styles.contactCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
            <Text style={styles.contactTitle}>RISE & SPEAK Support</Text>
            <View style={styles.contactItem}>
              <Mail size={16} color={Colors.neutral[400]} />
              <Text style={styles.contactText}>support@riseandspeak.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Phone size={16} color={Colors.neutral[400]} />
              <Text style={styles.contactText}>+1 (555) RISE-SPEAK</Text>
            </View>
            <View style={styles.contactItem}>
              <ExternalLink size={16} color={Colors.neutral[400]} />
              <Text style={styles.contactText}>www.riseandspeak.com/support</Text>
            </View>
            <Text style={styles.contactHours}>
              Support Hours: Monday - Friday, 9 AM - 6 PM PST
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchSection: {
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  supportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  supportCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  supportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  supportTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  supportDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[400],
    textAlign: 'center',
    lineHeight: 16,
  },
  quickLinksCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  quickLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  quickLinkBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  quickLinkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quickLinkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickLinkTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  quickLinkDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
  },
  faqCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  faqCategory: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary[400],
    backgroundColor: Colors.primary[900],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  faqChevron: {
    transform: [{ rotate: '0deg' }],
  },
  faqChevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  faqQuestion: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  faqAnswer: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
    lineHeight: 20,
    marginTop: 8,
  },
  contactCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  contactTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  contactText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[300],
  },
  contactHours: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
});