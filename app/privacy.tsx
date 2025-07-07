import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Shield, Eye, Lock, Database, Share2, Bell } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

export default function PrivacyScreen() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: `We collect information you provide directly to us, such as when you create an account, subscribe to our service, or contact us for support. This includes:

• Account information (name, email, password)
• Profile information (bio, avatar, preferences)
• Content you create (podcasts, comments, reviews)
• Payment information (processed securely by our payment partners)
• Communication data when you contact support`,
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information
• Send you technical notices and support messages
• Communicate with you about products, services, and events
• Monitor and analyze trends and usage
• Detect, investigate, and prevent fraudulent transactions
• Personalize your experience and content recommendations`,
    },
    {
      title: 'Information Sharing',
      icon: Share2,
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:

• With your explicit consent
• To comply with legal obligations
• To protect our rights and safety
• With service providers who assist in our operations
• In connection with a merger, acquisition, or sale of assets

All third-party service providers are bound by confidentiality agreements.`,
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: `We implement appropriate security measures to protect your personal information:

• Encryption of data in transit and at rest
• Regular security audits and assessments
• Access controls and authentication systems
• Secure data centers with physical security measures
• Employee training on data protection practices

However, no method of transmission over the internet is 100% secure.`,
    },
    {
      title: 'Your Privacy Rights',
      icon: Shield,
      content: `You have the right to:

• Access your personal information
• Correct inaccurate or incomplete data
• Delete your account and associated data
• Export your data in a portable format
• Opt-out of marketing communications
• Restrict processing of your information
• Object to automated decision-making

Contact us to exercise these rights.`,
    },
    {
      title: 'Cookies and Tracking',
      icon: Bell,
      content: `We use cookies and similar technologies to:

• Remember your preferences and settings
• Analyze how you use our service
• Provide personalized content and advertisements
• Improve our service performance

You can control cookie settings through your browser, but some features may not work properly if cookies are disabled.`,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.dark}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <LinearGradient
            colors={Colors.gradients.primary}
            style={styles.titleGradient}
          >
            <Shield size={20} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Privacy Policy</Text>
          </LinearGradient>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Your Privacy Matters</Text>
          <Text style={styles.introText}>
            At RISE & SPEAK, we are committed to protecting your privacy and ensuring transparency about how we collect, use, and protect your personal information. This privacy policy explains our practices and your rights regarding your data.
          </Text>
          <Text style={styles.lastUpdated}>Last updated: January 1, 2024</Text>
        </View>

        {/* Privacy Sections */}
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIcon, { backgroundColor: Colors.primary[500] + '20' }]}>
                <section.icon size={24} color={Colors.primary[500]} />
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={[styles.sectionCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          </View>
        ))}

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={[styles.contactCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
            <Text style={styles.contactText}>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactItem}>Email: privacy@riseandspeak.com</Text>
              <Text style={styles.contactItem}>Phone: +1 (555) RISE-SPEAK</Text>
              <Text style={styles.contactItem}>Address: 123 Podcast Lane, San Francisco, CA 94105</Text>
            </View>
          </View>
        </View>

        {/* Changes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Changes to This Policy</Text>
          <View style={[styles.changesCard, { backgroundColor: Colors.accent.amber + '10', borderColor: Colors.accent.amber }]}>
            <Text style={styles.changesText}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
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
  introSection: {
    marginBottom: 32,
  },
  introTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  introText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[300],
    lineHeight: 24,
    marginBottom: 16,
  },
  lastUpdated: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[400],
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  sectionCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  sectionContent: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[300],
    lineHeight: 22,
  },
  contactCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  contactText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[300],
    lineHeight: 20,
    marginBottom: 16,
  },
  contactDetails: {
    gap: 8,
  },
  contactItem: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[400],
  },
  changesCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  changesText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[300],
    lineHeight: 20,
  },
});