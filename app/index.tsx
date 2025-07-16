import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence,
  withDelay,
  withTiming,
  withRepeat,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { Mic, Play, Volume2, Radio, Waves, Sparkles, Zap } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const [showContent, setShowContent] = useState(false);
  const { user, isLoading, isAuthenticated } = useAuth();
  
  // Enhanced Animation values
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const logoRotation = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  const micBounce = useSharedValue(0);
  const playIconRotation = useSharedValue(0);
  const waveAnimation = useSharedValue(0);
  const particleAnimation = useSharedValue(0);
  const borderAnimation = useSharedValue(0);
  
  // Enhanced Brand name animations
  const riseScale = useSharedValue(0);
  const speakScale = useSharedValue(0);
  const riseOpacity = useSharedValue(0);
  const speakOpacity = useSharedValue(0);
  const riseRotation = useSharedValue(-180);
  const speakRotation = useSharedValue(180);
  const ampersandScale = useSharedValue(0);
  const ampersandRotation = useSharedValue(0);
  const brandGlow = useSharedValue(0);
  const brandPulse = useSharedValue(1);
  const shimmerPosition = useSharedValue(-1);
  const letterSpacing = useSharedValue(0);
  const brandElevation = useSharedValue(0);

  const triggerHapticFeedback = () => {
    if (Platform.OS === 'web') {
      console.log('Logo pressed');
    }
  };

  useEffect(() => {
    // Check authentication and redirect accordingly
    if (!isLoading) {
      if (isAuthenticated && user) {
        // User is signed in, redirect to main app after animation
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 3000);
        return;
      }
    }

    // Enhanced logo entrance with dramatic effect
    logoScale.value = withDelay(200, withSpring(1, { 
      damping: 6, 
      stiffness: 80,
      mass: 1.5 
    }));
    
    logoOpacity.value = withDelay(200, withTiming(1, { 
      duration: 1500,
      easing: Easing.out(Easing.cubic)
    }));

    // Dramatic rotation entrance
    logoRotation.value = withDelay(200, withSequence(
      withTiming(-10, { duration: 800, easing: Easing.out(Easing.back(1.5)) }),
      withTiming(0, { duration: 600, easing: Easing.inOut(Easing.quad) })
    ));
    
    // Enhanced brand name entrance sequence with stagger
    riseOpacity.value = withDelay(800, withTiming(1, { duration: 1000, easing: Easing.out(Easing.cubic) }));
    riseScale.value = withDelay(800, withSpring(1, { damping: 8, stiffness: 120 }));
    riseRotation.value = withDelay(800, withSpring(0, { damping: 12, stiffness: 100 }));
    
    // Ampersand with special dramatic effect
    ampersandScale.value = withDelay(1200, withSequence(
      withSpring(1.5, { damping: 6, stiffness: 200 }),
      withSpring(1, { damping: 8, stiffness: 150 })
    ));
    ampersandRotation.value = withDelay(1200, withSequence(
      withTiming(720, { duration: 1200, easing: Easing.out(Easing.back(1.2)) }),
      withSpring(0, { damping: 10 })
    ));
    
    // SPEAK entrance with delay
    speakOpacity.value = withDelay(1400, withTiming(1, { duration: 1000, easing: Easing.out(Easing.cubic) }));
    speakScale.value = withDelay(1400, withSpring(1, { damping: 8, stiffness: 120 }));
    speakRotation.value = withDelay(1400, withSpring(0, { damping: 12, stiffness: 100 }));
    
    // Enhanced brand effects
    brandGlow.value = withDelay(1600, withRepeat(
      withSequence(
        withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.sine) }),
        withTiming(0.2, { duration: 2500, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      true
    ));
    
    // Letter spacing animation
    letterSpacing.value = withDelay(1800, withSequence(
      withTiming(8, { duration: 1000, easing: Easing.out(Easing.cubic) }),
      withTiming(3, { duration: 800, easing: Easing.inOut(Easing.quad) })
    ));
    
    // Brand elevation effect
    brandElevation.value = withDelay(2000, withRepeat(
      withSequence(
        withTiming(5, { duration: 3000, easing: Easing.inOut(Easing.sine) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      true
    ));
    
    // Enhanced shimmer effect
    shimmerPosition.value = withDelay(2200, withRepeat(
      withTiming(1, { duration: 3500, easing: Easing.inOut(Easing.quad) }),
      -1,
      false
    ));
    
    // Text and button animations
    textOpacity.value = withDelay(2000, withTiming(1, { 
      duration: 1000,
      easing: Easing.out(Easing.cubic)
    }));
    
    buttonOpacity.value = withDelay(2600, withTiming(1, { 
      duration: 800,
      easing: Easing.out(Easing.cubic)
    }));
    
    // Enhanced glow effect
    glowOpacity.value = withDelay(800, withRepeat(
      withSequence(
        withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.sine) }),
        withTiming(0.3, { duration: 2500, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      true
    ));

    // Enhanced mic bounce animation
    micBounce.value = withDelay(1200, withRepeat(
      withSequence(
        withTiming(-12, { duration: 1800, easing: Easing.inOut(Easing.sine) }),
        withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      true
    ));

    // Enhanced play icon rotation
    playIconRotation.value = withDelay(1400, withRepeat(
      withTiming(360, { duration: 10000, easing: Easing.linear }),
      -1,
      false
    ));

    // Enhanced wave animation
    waveAnimation.value = withRepeat(
      withTiming(1, { duration: 3500, easing: Easing.inOut(Easing.sine) }),
      -1,
      true
    );

    // Enhanced particle animation
    particleAnimation.value = withRepeat(
      withTiming(1, { duration: 5000, easing: Easing.inOut(Easing.quad) }),
      -1,
      false
    );

    // Enhanced border animation
    borderAnimation.value = withDelay(600, withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sine) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.sine) })
      ),
      -1,
      true
    ));
    
    // Enhanced pulse animation
    const startPulse = () => {
      pulseScale.value = withSequence(
        withSpring(1.08, { duration: 1500, damping: 8 }),
        withSpring(1, { duration: 1500, damping: 8 })
      );
      brandPulse.value = withSequence(
        withSpring(1.03, { duration: 1500, damping: 10 }),
        withSpring(1, { duration: 1500, damping: 10 })
      );
    };
    
    setTimeout(startPulse, 3500);
    const pulseInterval = setInterval(startPulse, 6000);
    
    setTimeout(() => setShowContent(true), 2800);
    
    return () => clearInterval(pulseInterval);
  }, [user, isLoading, isAuthenticated]);

  // Enhanced animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value * pulseScale.value },
      { rotate: `${logoRotation.value}deg` }
    ],
    opacity: logoOpacity.value,
  }));

  const riseAnimatedStyle = useAnimatedStyle(() => ({
    opacity: riseOpacity.value,
    transform: [
      { scale: riseScale.value * brandPulse.value },
      { rotate: `${riseRotation.value}deg` },
      { translateY: brandElevation.value }
    ]
  }));

  const speakAnimatedStyle = useAnimatedStyle(() => ({
    opacity: speakOpacity.value,
    transform: [
      { scale: speakScale.value * brandPulse.value },
      { rotate: `${speakRotation.value}deg` },
      { translateY: brandElevation.value }
    ]
  }));

  const ampersandAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: ampersandScale.value },
      { rotate: `${ampersandRotation.value}deg` },
      { translateY: brandElevation.value * 0.5 }
    ]
  }));

  const brandContainerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: brandPulse.value }]
  }));

  const shimmerAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmerPosition.value,
      [-1, 1],
      [-width * 0.8, width * 0.8]
    );
    return {
      transform: [{ translateX }],
      opacity: interpolate(
        shimmerPosition.value,
        [-1, -0.5, 0, 0.5, 1],
        [0, 0.3, 0.8, 0.3, 0]
      )
    };
  });

  const brandGlowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: brandGlow.value * 0.6,
    transform: [
      { 
        scale: interpolate(
          brandGlow.value,
          [0.2, 1],
          [1, 1.15]
        )
      }
    ]
  }));

  const letterSpacingAnimatedStyle = useAnimatedStyle(() => ({
    letterSpacing: letterSpacing.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [
      { 
        translateY: interpolate(
          textOpacity.value,
          [0, 1],
          [40, 0]
        )
      }
    ]
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [
      { 
        translateY: interpolate(
          buttonOpacity.value,
          [0, 1],
          [30, 0]
        )
      }
    ]
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [
      { 
        scale: interpolate(
          glowOpacity.value,
          [0.3, 1],
          [1, 1.3]
        )
      }
    ]
  }));

  const micAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: micBounce.value }
    ]
  }));

  const playIconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${playIconRotation.value}deg` }
    ]
  }));

  const waveAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      waveAnimation.value,
      [0, 1],
      [0.7, 1.3]
    );
    const opacity = interpolate(
      waveAnimation.value,
      [0, 0.5, 1],
      [0.2, 1, 0.2]
    );
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const particleAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      particleAnimation.value,
      [0, 1],
      [0, -height * 0.9]
    );
    const opacity = interpolate(
      particleAnimation.value,
      [0, 0.2, 0.8, 1],
      [0, 1, 1, 0]
    );
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const borderAnimatedStyle = useAnimatedStyle(() => {
    const borderOpacity = interpolate(
      borderAnimation.value,
      [0, 1],
      [0.3, 1]
    );
    return {
      opacity: borderOpacity,
    };
  });

  const handleLogoPress = () => {
    // Enhanced press animation
    logoScale.value = withSequence(
      withTiming(0.92, { duration: 150 }),
      withSpring(1, { duration: 400 })
    );
    
    // Brand name press effect
    riseScale.value = withSequence(
      withTiming(0.96, { duration: 150 }),
      withSpring(1, { duration: 400 })
    );
    speakScale.value = withSequence(
      withTiming(0.96, { duration: 150 }),
      withSpring(1, { duration: 400 })
    );
    
    triggerHapticFeedback();
    
    setTimeout(() => {
      router.push('/auth');
    }, 300);
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={Colors.gradients.dark}
          style={styles.gradient}
        >
          <View style={styles.loadingContainer}>
            <View style={styles.loadingSpinner}>
              <Animated.View style={[styles.spinnerRing, waveAnimatedStyle]} />
            </View>
            <Text style={styles.loadingText}>Initializing RISE & SPEAK...</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.dark}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Enhanced Animated Background Particles */}
        <View style={styles.particleContainer}>
          {[...Array(20)].map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.particle,
                particleAnimatedStyle,
                {
                  left: Math.random() * width,
                  backgroundColor: i % 2 === 0 ? Colors.primary[500] + '40' : Colors.accent.pink + '30',
                }
              ]}
            />
          ))}
        </View>

        {/* Enhanced Floating Wave Elements */}
        <Animated.View style={[styles.waveElement, styles.wave1, waveAnimatedStyle]} />
        <Animated.View style={[styles.waveElement, styles.wave2, waveAnimatedStyle]} />
        <Animated.View style={[styles.waveElement, styles.wave3, waveAnimatedStyle]} />

        <View style={styles.content}>
          {/* Enhanced Logo Section */}
          <TouchableOpacity 
            style={styles.logoContainer}
            onPress={handleLogoPress}
            activeOpacity={0.8}
          >
            <Animated.View style={[styles.logoWrapper, logoAnimatedStyle]}>
              {/* Enhanced Animated Border Ring */}
              <Animated.View style={[styles.borderRing, borderAnimatedStyle, { borderColor: Colors.secondary[400] }]} />
              
              {/* Enhanced Glow Effect */}
              <Animated.View style={[styles.glowEffect, glowAnimatedStyle, { backgroundColor: Colors.primary[500] + '20' }]} />
              
              {/* Main Logo Background */}
              <LinearGradient
                colors={Colors.gradients.brand}
                style={styles.logoBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.logoContent}>
                  {/* Enhanced Animated Microphone */}
                  <Animated.View style={micAnimatedStyle}>
                    <Mic size={45} color="#FFFFFF" strokeWidth={2.5} />
                  </Animated.View>
                  
                  {/* Enhanced Rotating Play Icon */}
                  <Animated.View style={[styles.playIcon, playIconAnimatedStyle]}>
                    <LinearGradient
                      colors={Colors.gradients.accent}
                      style={styles.playIconBackground}
                    >
                      <Play size={18} color="#FFFFFF" fill="#FFFFFF" />
                    </LinearGradient>
                  </Animated.View>

                  {/* Enhanced Sound Waves */}
                  <View style={styles.soundWaves}>
                    <Animated.View style={[styles.soundWave, styles.soundWave1, waveAnimatedStyle]}>
                      <Waves size={14} color="rgba(255,255,255,0.7)" />
                    </Animated.View>
                    <Animated.View style={[styles.soundWave, styles.soundWave2, waveAnimatedStyle]}>
                      <Radio size={12} color="rgba(255,255,255,0.5)" />
                    </Animated.View>
                    <Animated.View style={[styles.soundWave, styles.soundWave3, waveAnimatedStyle]}>
                      <Sparkles size={10} color="rgba(255,255,255,0.6)" />
                    </Animated.View>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>

          {/* Enhanced Brand Text with Creative Animations */}
          <Animated.View style={[styles.brandContainer, brandContainerAnimatedStyle]}>
            {/* Enhanced Brand Glow Background */}
            <Animated.View style={[styles.brandGlowBackground, brandGlowAnimatedStyle]} />
            
            {/* Enhanced Shimmer Effect */}
            <Animated.View style={[styles.shimmerOverlay, shimmerAnimatedStyle]} />
            
            <View style={styles.brandTextContainer}>
              {/* RISE with enhanced entrance */}
              <Animated.View style={[styles.wordContainer, riseAnimatedStyle]}>
                <LinearGradient
                  colors={[Colors.primary[400], Colors.secondary[400], Colors.accent.pink]}
                  style={styles.wordGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Animated.Text style={[styles.brandWord, styles.riseText, letterSpacingAnimatedStyle]}>RISE</Animated.Text>
                </LinearGradient>
              </Animated.View>
              
              {/* Enhanced Animated Ampersand */}
              <Animated.View style={[styles.ampersandContainer, ampersandAnimatedStyle]}>
                <LinearGradient
                  colors={Colors.gradients.accent}
                  style={styles.ampersandGradient}
                >
                  <Text style={styles.ampersandText}>&</Text>
                  <Animated.View style={[styles.ampersandSpark, waveAnimatedStyle]}>
                    <Zap size={8} color="#FFFFFF" />
                  </Animated.View>
                </LinearGradient>
              </Animated.View>
              
              {/* SPEAK with enhanced entrance */}
              <Animated.View style={[styles.wordContainer, speakAnimatedStyle]}>
                <LinearGradient
                  colors={[Colors.accent.orange, Colors.accent.pink, Colors.secondary[500]]}
                  style={styles.wordGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Animated.Text style={[styles.brandWord, styles.speakText, letterSpacingAnimatedStyle]}>SPEAK</Animated.Text>
                </LinearGradient>
              </Animated.View>
            </View>
            
            <Text style={[styles.brandSubtitle, { color: Colors.secondary[400] }]}>Video Podcast Platform</Text>
            <View style={[styles.taglineContainer, { backgroundColor: Colors.dark.card, borderColor: Colors.secondary[600] }]}>
              <Volume2 size={16} color={Colors.secondary[400]} />
              <Text style={styles.tagline}>Where Stories Come to Life</Text>
            </View>
          </Animated.View>

          {/* Enhanced Call to Action */}
          {showContent && !isAuthenticated && (
            <Animated.View style={[styles.ctaContainer, buttonAnimatedStyle]}>
              <Text style={styles.ctaText}>
                {isLoading ? 'Checking authentication...' : 'Tap the logo to begin your journey'}
              </Text>
              <View style={styles.tapIndicator}>
                <Animated.View style={[styles.tapRipple, waveAnimatedStyle]} />
                <Animated.View style={[styles.tapRipple2, waveAnimatedStyle]} />
              </View>
            </Animated.View>
          )}

          {/* User Welcome Message */}
          {showContent && isAuthenticated && user && (
            <Animated.View style={[styles.welcomeContainer, buttonAnimatedStyle]}>
              <Text style={styles.welcomeText}>Welcome back, {user.name}!</Text>
              <Text style={styles.welcomeSubtext}>Redirecting to your dashboard...</Text>
            </Animated.View>
          )}
        </View>

        {/* Enhanced Footer */}
        <Animated.View style={[styles.footer, textAnimatedStyle]}>
          <Text style={styles.footerText}>Powered by Innovation • Dark Mode</Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  gradient: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingSpinner: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  spinnerRing: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.primary[500],
    borderTopColor: 'transparent',
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[300],
  },
  particleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  waveElement: {
    position: 'absolute',
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    borderRadius: 50,
  },
  wave1: {
    width: 120,
    height: 120,
    top: '15%',
    left: '8%',
  },
  wave2: {
    width: 100,
    height: 100,
    top: '65%',
    right: '12%',
  },
  wave3: {
    width: 80,
    height: 80,
    top: '85%',
    left: '15%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 70,
  },
  logoWrapper: {
    position: 'relative',
  },
  borderRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    top: -15,
    left: -15,
  },
  logoBackground: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[500],
    shadowOffset: {
      width: 0,
      height: 25,
    },
    shadowOpacity: 0.5,
    shadowRadius: 35,
    elevation: 25,
  },
  logoContent: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playIcon: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  playIconBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  soundWaves: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  soundWave: {
    position: 'absolute',
  },
  soundWave1: {
    top: 8,
    left: -25,
  },
  soundWave2: {
    bottom: 8,
    right: -25,
  },
  soundWave3: {
    top: 25,
    right: -30,
  },
  glowEffect: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    top: -25,
    left: -25,
    zIndex: -1,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 90,
    position: 'relative',
  },
  brandGlowBackground: {
    position: 'absolute',
    width: 450,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    top: -25,
    zIndex: -1,
  },
  shimmerOverlay: {
    position: 'absolute',
    width: 250,
    height: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: 0,
    zIndex: 1,
    borderRadius: 45,
  },
  brandTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
    zIndex: 2,
  },
  wordContainer: {
    marginHorizontal: 6,
  },
  wordGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  brandWord: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  riseText: {
    transform: [{ skewX: '-6deg' }],
  },
  speakText: {
    transform: [{ skewX: '6deg' }],
  },
  ampersandContainer: {
    marginHorizontal: 12,
    marginTop: -6,
    position: 'relative',
  },
  ampersandGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent.orange,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 12,
  },
  ampersandText: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  ampersandSpark: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  brandSubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 18,
    letterSpacing: 1.2,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[200],
  },
  ctaContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  ctaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: Colors.neutral[300],
    textAlign: 'center',
    marginBottom: 25,
  },
  welcomeContainer: {
    alignItems: 'center',
    backgroundColor: Colors.dark.cardElevated,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  welcomeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
  },
  tapIndicator: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tapRipple: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tapRipple2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
  },
});