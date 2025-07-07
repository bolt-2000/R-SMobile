import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, FileText, Scale, AlertTriangle, Users, Crown, Shield } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

export default function TermsScreen() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: Scale,
      content: `By accessing and using RISE & SPEAK, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.

These Terms of Service constitute a legally binding agreement between you and RISE & SPEAK regarding your use of our platform and services.`,
    },
    {
      title: 'User Accounts',
      icon: Users,
      content: `To access certain features of our service, you must register for an account. You agree to:

• Provide accurate, current, and complete information
• Maintain the security of your password
• Accept responsibility for all activities under your account
• Notify us immediately of any unauthorized use
• Not create multiple accounts or share your account

You are responsible for all content posted and activity that occurs under your account.`,
    },
    {
      title: 'Content Guidelines',
      icon: Shield,
      content: `You may not upload, post, or transmit content that:

• Violates any laws or regulations
• Infringes on intellectual property rights
• Contains hate speech, harassment, or threats
• Includes explicit or inappropriate material
• Spreads misinformation or spam
• Violates privacy of others

We reserve the right to remove content that violates these guidelines and may suspend or terminate accounts for repeated violations.`,
    },
    {
      title: 'Subscription Terms',
      icon: Crown,
      content: `Subscription services are provided on a recurring basis. By subscribing, you agree to:

• Pay all applicable fees and taxes
• Automatic renewal unless cancelled
• No refunds for partial periods
• Price changes with 30 days notice
• Cancellation takes effect at the end of the billing period

Free trial periods may be offered at our discretion and are subject to these terms.`,
    },
    {
      title: 'Intellectual Property',
      icon: FileText,
      content: `The RISE & SPEAK platform and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

You retain ownership of content you create, but grant us a license to use, display, and distribute your content on our platform.`,
    },
    {
      title: 'Limitation of Liability',
      icon: AlertTriangle,
      content: `RISE & SPEAK shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.

Our total liability to you for all damages shall not exceed the amount you paid us in the twelve months preceding the claim.`,
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
            <FileText size={20} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Terms of Service</Text>
          </LinearGradient>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Terms of Service</Text>
          <Text style={styles.introText}>
            Welcome to RISE & SPEAK. These Terms of Service govern your use of our video podcast platform and services. Please read these terms carefully before using our platform.
          </Text>
          <Text style={styles.lastUpdated}>Last updated: January 1, 2024</Text>
        </View>

        {/* Terms Sections */}
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

        {/* Additional Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Terms</Text>
          <View style={[styles.additionalCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
            <View style={styles.additionalItem}>
              <Text style={styles.additionalTitle}>Termination</Text>
              <Text style={styles.additionalText}>
                We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </Text>
            </View>
            
            <View style={styles.additionalItem}>
              <Text style={styles.additionalTitle}>Governing Law</Text>
              <Text style={styles.additionalText}>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
              </Text>
            </View>
            
            <View style={styles.additionalItem}>
              <Text style={styles.additionalTitle}>Changes to Terms</Text>
              <Text style={styles.additionalText}>
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the platform.
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={[styles.contactCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
            <Text style={styles.contactText}>
              If you have any questions about these Terms of Service, please contact us:
            </Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactItem}>Email: legal@riseandspeak.com</Text>
              <Text style={styles.contactItem}>Phone: +1 (555) RISE-SPEAK</Text>
              <Text style={styles.contactItem}>Address: 123 Podcast Lane, San Francisco, CA 94105</Text>
            </View>
          </View>
        </View>

        {/* Acknowledgment */}
        <View style={styles.section}>
          <View style={[styles.acknowledgmentCard, { backgroundColor: Colors.primary[500] + '10', borderColor: Colors.primary[500] }]}>
            <Text style={styles.acknowledgmentText}>
              By using RISE & SPEAK, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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
  additionalCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  additionalItem: {
    marginBottom: 20,
  },
  additionalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  additionalText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[300],
    lineHeight: 20,
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
  acknowledgmentCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    marginBottom: 32,
  },
  acknowledgmentText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[300],
    lineHeight: 20,
    textAlign: 'center',
  },
});