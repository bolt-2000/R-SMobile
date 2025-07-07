import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  Chrome,
  Facebook,
  Twitter,
  Apple
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

// Animated Brand Component for Auth
function AnimatedAuthTitle() {
  const riseScale = useSharedValue(1);
  const speakScale = useSharedValue(1);
  const ampersandRotation = useSharedValue(0);
  const shimmerPosition = useSharedValue(-1);
  const brandGlow = useSharedValue(0.2);

  useEffect(() => {
    // Continuous subtle animations
    riseScale.value = withRepeat(
      withSequence(
        withTiming(1.005, { duration: 4000 }),
        withTiming(1, { duration: 4000 })
      ),
      -1,
      true
    );

    speakScale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 4000 }),
        withTiming(1.005, { duration: 4000 })
      ),
      -1,
      true
    );

    ampersandRotation.value = withRepeat(
      withTiming(360, { duration: 20000 }),
      -1,
      false
    );

    shimmerPosition.value = withRepeat(
      withTiming(1, { duration: 8000 }),
      -1,
      false
    );

    brandGlow.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 5000 }),
        withTiming(0.1, { duration: 5000 })
      ),
      -1,
      true
    );
  }, []);

  const riseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: riseScale.value }]
  }));

  const speakAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: speakScale.value }]
  }));

  const ampersandAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${ampersandRotation.value}deg` }]
  }));

  const shimmerAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmerPosition.value,
      [-1, 1],
      [-100, 100]
    );
    return {
      transform: [{ translateX }],
      opacity: interpolate(
        shimmerPosition.value,
        [-1, -0.5, 0, 0.5, 1],
        [0, 0.08, 0.3, 0.08, 0]
      )
    };
  });

  const brandGlowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: brandGlow.value * 0.2,
  }));

  return (
    <View style={styles.animatedAuthBrand}>
      {/* Glow Background */}
      <Animated.View style={[styles.authBrandGlow, brandGlowAnimatedStyle]} />
      
      {/* Shimmer Effect */}
      <Animated.View style={[styles.authShimmer, shimmerAnimatedStyle]} />
      
      <View style={styles.authBrandRow}>
        {/* RISE */}
        <Animated.View style={[styles.authWordContainer, riseAnimatedStyle]}>
          <LinearGradient
            colors={[Colors.primary[400], Colors.secondary[400]]}
            style={styles.authWordGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.authWordText, styles.authRiseText]}>RISE</Text>
          </LinearGradient>
        </Animated.View>
        
        {/* Ampersand */}
        <Animated.View style={[styles.authAmpersand, ampersandAnimatedStyle]}>
          <LinearGradient
            colors={Colors.gradients.accent}
            style={styles.authAmpersandGradient}
          >
            <Text style={styles.authAmpersandText}>&</Text>
          </LinearGradient>
        </Animated.View>
        
        {/* SPEAK */}
        <Animated.View style={[styles.authWordContainer, speakAnimatedStyle]}>
          <LinearGradient
            colors={[Colors.accent.orange, Colors.secondary[500]]}
            style={styles.authWordGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.authWordText, styles.authSpeakText]}>SPEAK</Text>
          </LinearGradient>
        </Animated.View>
      </View>
    </View>
  );
}

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Animation values
  const formOpacity = useSharedValue(0);
  const socialOpacity = useSharedValue(0);

  useEffect(() => {
    formOpacity.value = withDelay(200, withSpring(1, { duration: 600 }));
    socialOpacity.value = withDelay(400, withSpring(1, { duration: 600 }));
  }, []);

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
  }));

  const socialAnimatedStyle = useAnimatedStyle(() => ({
    opacity: socialOpacity.value,
  }));

  const handleAuth = () => {
    console.log('Authentication:', isLogin ? 'Login' : 'Register');
    // Navigate to main app
    router.replace('/(tabs)');
  };

  const handleSocialAuth = (provider: string) => {
    console.log(`Authenticating with ${provider}`);
    router.replace('/(tabs)');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
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
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => {
                router.back();
                triggerHapticFeedback();
              }}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.logoSection}>
              <LinearGradient
                colors={Colors.gradients.primary}
                style={styles.miniLogo}
              >
                <Text style={styles.logoText}>R&S</Text>
              </LinearGradient>
              <AnimatedAuthTitle />
              <Text style={styles.subtitleText}>
                {isLogin 
                  ? 'Sign in to continue your podcast journey' 
                  : 'Create your account to start exploring'
                }
              </Text>
            </View>
          </View>

          {/* Auth Form */}
          <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
            <View style={[styles.formCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
              {!isLogin && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <View style={[styles.inputContainer, { backgroundColor: Colors.dark.surface, borderColor: Colors.dark.border }]}>
                    <User size={20} color={Colors.neutral[400]} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your full name"
                      placeholderTextColor={Colors.neutral[500]}
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={[styles.inputContainer, { backgroundColor: Colors.dark.surface, borderColor: Colors.dark.border }]}>
                  <Mail size={20} color={Colors.neutral[400]} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email"
                    placeholderTextColor={Colors.neutral[500]}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={[styles.inputContainer, { backgroundColor: Colors.dark.surface, borderColor: Colors.dark.border }]}>
                  <Lock size={20} color={Colors.neutral[400]} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password"
                    placeholderTextColor={Colors.neutral[500]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff size={20} color={Colors.neutral[400]} />
                    ) : (
                      <Eye size={20} color={Colors.neutral[400]} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {isLogin && (
                <TouchableOpacity 
                  style={styles.forgotPassword}
                  onPress={() => {
                    console.log('Forgot password pressed');
                    triggerHapticFeedback();
                  }}
                >
                  <Text style={[styles.forgotPasswordText, { color: Colors.secondary[400] }]}>Forgot Password?</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity 
                style={styles.authButton} 
                onPress={() => {
                  handleAuth();
                  triggerHapticFeedback();
                }}
              >
                <LinearGradient
                  colors={Colors.gradients.primary}
                  style={styles.authButtonGradient}
                >
                  <Text style={styles.authButtonText}>
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.toggleAuth} 
                onPress={() => {
                  toggleAuthMode();
                  triggerHapticFeedback();
                }}
              >
                <Text style={styles.toggleAuthText}>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <Text style={[styles.toggleAuthLink, { color: Colors.secondary[400] }]}>
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Social Authentication */}
          <Animated.View style={[styles.socialContainer, socialAnimatedStyle]}>
            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: Colors.dark.border }]} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={[styles.dividerLine, { backgroundColor: Colors.dark.border }]} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity 
                style={[styles.socialButton, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}
                onPress={() => {
                  handleSocialAuth('Google');
                  triggerHapticFeedback();
                }}
              >
                <Chrome size={24} color="#FFFFFF" />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.socialButton, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}
                onPress={() => {
                  handleSocialAuth('Facebook');
                  triggerHapticFeedback();
                }}
              >
                <Facebook size={24} color="#FFFFFF" />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.socialButton, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}
                onPress={() => {
                  handleSocialAuth('Twitter');
                  triggerHapticFeedback();
                }}
              >
                <Twitter size={24} color="#FFFFFF" />
                <Text style={styles.socialButtonText}>Twitter</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.socialButton, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}
                onPress={() => {
                  handleSocialAuth('Apple');
                  triggerHapticFeedback();
                }}
              >
                <Apple size={24} color="#FFFFFF" />
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Terms */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={[styles.termsLink, { color: Colors.secondary[400] }]}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={[styles.termsLink, { color: Colors.secondary[400] }]}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoSection: {
    alignItems: 'center',
  },
  miniLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  // Animated Auth Brand Styles
  animatedAuthBrand: {
    position: 'relative',
    alignItems: 'center',
    marginVertical: 8,
  },
  authBrandGlow: {
    position: 'absolute',
    width: 160,
    height: 35,
    borderRadius: 18,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    top: -2,
    zIndex: -1,
  },
  authShimmer: {
    position: 'absolute',
    width: 50,
    height: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    top: 0,
    zIndex: 1,
    borderRadius: 12,
  },
  authBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  authWordContainer: {
    marginHorizontal: 1,
  },
  authWordGradient: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  authWordText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 0.6,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  authRiseText: {
    transform: [{ skewX: '-0.5deg' }],
  },
  authSpeakText: {
    transform: [{ skewX: '0.5deg' }],
  },
  authAmpersand: {
    marginHorizontal: 2,
    marginTop: -1,
  },
  authAmpersandGradient: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent.orange,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    elevation: 1,
  },
  authAmpersandText: {
    fontFamily: 'Inter-Bold',
    fontSize: 8,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  subtitleText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[400],
    textAlign: 'center',
    marginTop: 8,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  formCard: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    gap: 12,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  authButton: {
    marginBottom: 20,
  },
  authButtonGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  authButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  toggleAuth: {
    alignItems: 'center',
  },
  toggleAuthText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
  },
  toggleAuthLink: {
    fontFamily: 'Inter-SemiBold',
  },
  socialContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    minWidth: (width - 56) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    gap: 8,
  },
  socialButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  termsContainer: {
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  termsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    fontFamily: 'Inter-Medium',
  },
});