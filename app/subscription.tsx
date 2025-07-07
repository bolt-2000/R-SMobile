import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  Crown, 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Download, 
  Mic, 
  Video, 
  Users,
  TrendingUp,
  Award
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  current?: boolean;
  color: string;
  icon: any;
}

export default function SubscriptionScreen() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      color: Colors.neutral[500],
      icon: Star,
      current: user?.subscription === 'free',
      features: [
        { text: 'Listen to all podcasts', included: true },
        { text: 'Basic video quality', included: true },
        { text: 'Limited downloads (5/month)', included: true },
        { text: 'Ads between episodes', included: false },
        { text: 'Create podcasts', included: false },
        { text: 'Analytics dashboard', included: false },
        { text: 'Priority support', included: false },
        { text: 'Exclusive content', included: false },
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      description: 'Best for podcast enthusiasts',
      color: Colors.primary[500],
      icon: Crown,
      popular: true,
      current: user?.subscription === 'premium',
      features: [
        { text: 'Everything in Free', included: true },
        { text: 'HD video quality', included: true },
        { text: 'Unlimited downloads', included: true },
        { text: 'Ad-free experience', included: true },
        { text: 'Offline listening', included: true },
        { text: 'Early access to episodes', included: true },
        { text: 'Create up to 5 podcasts', included: true },
        { text: 'Basic analytics', included: true },
      ],
    },
    {
      id: 'creator',
      name: 'Creator Pro',
      price: '$29.99',
      period: 'month',
      description: 'For serious content creators',
      color: Colors.accent.amber,
      icon: Zap,
      current: user?.subscription === 'creator',
      features: [
        { text: 'Everything in Premium', included: true },
        { text: '4K video quality', included: true },
        { text: 'Unlimited podcast creation', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Live streaming', included: true },
        { text: 'Custom branding', included: true },
        { text: 'Priority support', included: true },
        { text: 'Revenue sharing', included: true },
      ],
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Ad-Free Experience',
      description: 'Enjoy uninterrupted listening without any advertisements',
      color: Colors.accent.emerald,
    },
    {
      icon: Download,
      title: 'Unlimited Downloads',
      description: 'Download episodes for offline listening anytime, anywhere',
      color: Colors.primary[500],
    },
    {
      icon: Video,
      title: 'HD Video Quality',
      description: 'Watch video podcasts in crystal clear high definition',
      color: Colors.accent.pink,
    },
    {
      icon: Mic,
      title: 'Create Content',
      description: 'Start your own podcast and share your voice with the world',
      color: Colors.accent.orange,
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Track your podcast performance with detailed insights',
      color: Colors.accent.amber,
    },
    {
      icon: Award,
      title: 'Exclusive Content',
      description: 'Access premium episodes and creator-only content',
      color: Colors.secondary[500],
    },
  ];

  const handleSubscribe = (planId: string) => {
    console.log('Subscribe to plan:', planId);
    // Handle subscription logic
    // In a real app, integrate with RevenueCat or similar service
  };

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
            <Crown size={20} color="#FFFFFF" />
            <Text style={styles.headerTitle}>Subscription</Text>
          </LinearGradient>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={Colors.gradients.primary}
            style={styles.heroGradient}
          >
            <Crown size={40} color="#FFFFFF" />
            <Text style={styles.heroTitle}>Unlock Premium Features</Text>
            <Text style={styles.heroSubtitle}>
              Get the most out of RISE & SPEAK with unlimited access to all features
            </Text>
          </LinearGradient>
        </View>

        {/* Benefits Grid */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Why Go Premium?</Text>
          <View style={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <View key={index} style={[styles.benefitCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
                <View style={[styles.benefitIcon, { backgroundColor: benefit.color + '20' }]}>
                  <benefit.icon size={24} color={benefit.color} />
                </View>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Subscription Plans */}
        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border },
                plan.popular && styles.popularPlan,
                plan.current && styles.currentPlan,
                selectedPlan === plan.id && styles.selectedPlan,
              ]}
              onPress={() => {
                setSelectedPlan(plan.id);
                triggerHapticFeedback();
              }}
            >
              {plan.popular && (
                <View style={[styles.popularBadge, { backgroundColor: Colors.accent.amber }]}>
                  <Star size={12} color="#FFFFFF" />
                  <Text style={styles.popularText}>Most Popular</Text>
                </View>
              )}
              
              {plan.current && (
                <View style={[styles.currentBadge, { backgroundColor: Colors.accent.emerald }]}>
                  <Check size={12} color="#FFFFFF" />
                  <Text style={styles.currentText}>Current Plan</Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <View style={styles.planTitleSection}>
                  <View style={[styles.planIcon, { backgroundColor: plan.color + '20' }]}>
                    <plan.icon size={24} color={plan.color} />
                  </View>
                  <View>
                    <Text style={styles.planName}>{plan.name}</Text>
                    <Text style={styles.planDescription}>{plan.description}</Text>
                  </View>
                </View>
                <View style={styles.planPricing}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>/{plan.period}</Text>
                </View>
              </View>

              <View style={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <View style={[
                      styles.featureIcon,
                      { backgroundColor: feature.included ? Colors.accent.emerald + '20' : Colors.neutral[700] }
                    ]}>
                      <Check 
                        size={12} 
                        color={feature.included ? Colors.accent.emerald : Colors.neutral[500]} 
                      />
                    </View>
                    <Text style={[
                      styles.featureText,
                      !feature.included && styles.featureTextDisabled
                    ]}>
                      {feature.text}
                    </Text>
                  </View>
                ))}
              </View>

              {!plan.current && (
                <TouchableOpacity
                  style={styles.subscribeButton}
                  onPress={() => {
                    handleSubscribe(plan.id);
                    triggerHapticFeedback();
                  }}
                >
                  <LinearGradient
                    colors={plan.id === 'free' ? [Colors.neutral[600], Colors.neutral[700]] : [plan.color, plan.color + 'CC']}
                    style={styles.subscribeButtonGradient}
                  >
                    <Text style={styles.subscribeButtonText}>
                      {plan.id === 'free' ? 'Current Plan' : 'Subscribe Now'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={[styles.faqCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
            <Text style={styles.faqQuestion}>Can I cancel anytime?</Text>
            <Text style={styles.faqAnswer}>
              Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.
            </Text>
          </View>
          <View style={[styles.faqCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
            <Text style={styles.faqQuestion}>What payment methods do you accept?</Text>
            <Text style={styles.faqAnswer}>
              We accept all major credit cards, PayPal, and mobile payments through your device's app store.
            </Text>
          </View>
          <View style={[styles.faqCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
            <Text style={styles.faqQuestion}>Is there a free trial?</Text>
            <Text style={styles.faqAnswer}>
              Yes! New users get a 7-day free trial of Premium features. No credit card required to start.
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
  heroSection: {
    marginBottom: 32,
  },
  heroGradient: {
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  benefitsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  benefitCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  benefitDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[400],
    lineHeight: 16,
  },
  plansSection: {
    marginBottom: 32,
  },
  planCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    position: 'relative',
  },
  popularPlan: {
    borderColor: Colors.accent.amber,
    borderWidth: 2,
  },
  currentPlan: {
    borderColor: Colors.accent.emerald,
    borderWidth: 2,
  },
  selectedPlan: {
    borderColor: Colors.primary[500],
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  popularText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  currentBadge: {
    position: 'absolute',
    top: -8,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  currentText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  planTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  planName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  planDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
  },
  planPricing: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  planPeriod: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
  },
  planFeatures: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  featureTextDisabled: {
    color: Colors.neutral[500],
    textDecorationLine: 'line-through',
  },
  subscribeButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  subscribeButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  faqSection: {
    marginBottom: 32,
  },
  faqCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
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
  },
});