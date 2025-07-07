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
  runOnJS
} from 'react-native-reanimated';
import { Mic, Play, Volume2, Radio, Waves } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const [showContent, setShowContent] = useState(false);
  
  // Animation values
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
  
  // Brand name animations
  const riseScale = useSharedValue(0);
  const speakScale = useSharedValue(0);
  const riseOpacity = useSharedValue(0);
  const speakOpacity = useSharedValue(0);
  const riseRotation = useSharedValue(-180);
  const speakRotation = useSharedValue(180);
  const ampersandScale = useSharedValue(0);
  const ampersandRotation = useSharedValue(0);
  const letterSpacing = useSharedValue(20);
  const brandGlow = useSharedValue(0);
  const brandPulse = useSharedValue(1);
  const shimmerPosition = useSharedValue(-1);

  const triggerHapticFeedback = () => {
    if (Platform.OS === 'web') {
      console.log('Logo pressed');
    }
  };

  useEffect(() => {
    // Initial logo entrance with spring physics
    logoScale.value = withSpring(1, { 
      damping: 8, 
      stiffness: 100,
      mass: 1.2 
    });
    
    logoOpacity.value = withTiming(1, { 
      duration: 1200
    });

    // Subtle rotation on entrance
    logoRotation.value = withSequence(
      withTiming(-5, { duration: 600 }),
      withTiming(0, { duration: 400 })
    );
    
    // Elegant brand name entrance sequence
    riseOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
    riseScale.value = withDelay(600, withSpring(1, { damping: 12, stiffness: 150 }));
    riseRotation.value = withDelay(600, withSpring(0, { damping: 15, stiffness: 100 }));
    
    // Ampersand with special effect
    ampersandScale.value = withDelay(1000, withSpring(1.2, { damping: 8, stiffness: 200 }));
    ampersandRotation.value = withDelay(1000, withSequence(
      withTiming(360, { duration: 800 }),
      withSpring(0, { damping: 10 })
    ));
    
    // SPEAK entrance
    speakOpacity.value = withDelay(1200, withTiming(1, { duration: 800 }));
    speakScale.value = withDelay(1200, withSpring(1, { damping: 12, stiffness: 150 }));
    speakRotation.value = withDelay(1200, withSpring(0, { damping: 15, stiffness: 100 }));
    
    // Letter spacing animation
    letterSpacing.value = withDelay(800, withSpring(4, { damping: 15, stiffness: 100 }));
    
    // Brand glow effect
    brandGlow.value = withDelay(1400, withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0.3, { duration: 2000 })
      ),
      -1,
      true
    ));
    
    // Shimmer effect
    shimmerPosition.value = withDelay(2000, withRepeat(
      withTiming(1, { duration: 3000 }),
      -1,
      false
    ));
    
    // Text fade in with stagger
    textOpacity.value = withDelay(1600, withTiming(1, { 
      duration: 800
    }));
    
    // Button fade in
    buttonOpacity.value = withDelay(2200, withTiming(1, { 
      duration: 600 
    }));
    
    // Glow effect
    glowOpacity.value = withDelay(600, withRepeat(
      withSequence(
        withTiming(0.8, { duration: 2000 }),
        withTiming(0.3, { duration: 2000 })
      ),
      -1,
      true
    ));

    // Mic bounce animation
    micBounce.value = withDelay(1000, withRepeat(
      withSequence(
        withTiming(-8, { duration: 1500 }),
        withTiming(0, { duration: 1500 })
      ),
      -1,
      true
    ));

    // Play icon rotation
    playIconRotation.value = withDelay(1200, withRepeat(
      withTiming(360, { duration: 8000 }),
      -1,
      false
    ));

    // Wave animation
    waveAnimation.value = withRepeat(
      withTiming(1, { duration: 3000 }),
      -1,
      true
    );

    // Particle animation
    particleAnimation.value = withRepeat(
      withTiming(1, { duration: 4000 }),
      -1,
      false
    );

    // Border animation
    borderAnimation.value = withDelay(500, withRepeat(
      withSequence(
        withTiming(1, { duration: 2500 }),
        withTiming(0, { duration: 2500 })
      ),
      -1,
      true
    ));
    
    // Pulse animation for logo
    const startPulse = () => {
      pulseScale.value = withSequence(
        withSpring(1.05, { duration: 1200 }),
        withSpring(1, { duration: 1200 })
      );
      brandPulse.value = withSequence(
        withSpring(1.02, { duration: 1200 }),
        withSpring(1, { duration: 1200 })
      );
    };
    
    setTimeout(startPulse, 3000);
    const pulseInterval = setInterval(startPulse, 5000);
    
    setTimeout(() => setShowContent(true), 2400);
    
    return () => clearInterval(pulseInterval);
  }, []);

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
      { rotate: `${riseRotation.value}deg` }
    ]
  }));

  const speakAnimatedStyle = useAnimatedStyle(() => ({
    opacity: speakOpacity.value,
    transform: [
      { scale: speakScale.value * brandPulse.value },
      { rotate: `${speakRotation.value}deg` }
    ]
  }));

  const ampersandAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: ampersandScale.value },
      { rotate: `${ampersandRotation.value}deg` }
    ]
  }));

  const brandContainerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: brandPulse.value }]
  }));

  const shimmerAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmerPosition.value,
      [-1, 1],
      [-width, width]
    );
    return {
      transform: [{ translateX }],
      opacity: interpolate(
        shimmerPosition.value,
        [-1, -0.5, 0, 0.5, 1],
        [0, 0.5, 1, 0.5, 0]
      )
    };
  });

  const brandGlowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: brandGlow.value * 0.8,
    transform: [
      { 
        scale: interpolate(
          brandGlow.value,
          [0.3, 1],
          [1, 1.1]
        )
      }
    ]
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [
      { 
        translateY: interpolate(
          textOpacity.value,
          [0, 1],
          [30, 0]
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
          [20, 0]
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
          [0.3, 0.8],
          [1, 1.2]
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
      [0.8, 1.2]
    );
    const opacity = interpolate(
      waveAnimation.value,
      [0, 0.5, 1],
      [0.3, 0.8, 0.3]
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
      [0, -height * 0.8]
    );
    const opacity = interpolate(
      particleAnimation.value,
      [0, 0.3, 0.7, 1],
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
      [0.2, 1]
    );
    return {
      opacity: borderOpacity,
    };
  });

  const handleLogoPress = () => {
    // Add press animation
    logoScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { duration: 300 })
    );
    
    // Brand name press effect
    riseScale.value = withSequence(
      withTiming(0.98, { duration: 100 }),
      withSpring(1, { duration: 300 })
    );
    speakScale.value = withSequence(
      withTiming(0.98, { duration: 100 }),
      withSpring(1, { duration: 300 })
    );
    
    triggerHapticFeedback();
    
    setTimeout(() => {
      router.push('/auth');
    }, 200);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.dark}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Animated Background Particles */}
        <View style={styles.particleContainer}>
          {[...Array(12)].map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.particle,
                particleAnimatedStyle,
                {
                  left: Math.random() * width,
                }
              ]}
            />
          ))}
        </View>

        {/* Floating Wave Elements */}
        <Animated.View style={[styles.waveElement, styles.wave1, waveAnimatedStyle]} />
        <Animated.View style={[styles.waveElement, styles.wave2, waveAnimatedStyle]} />
        <Animated.View style={[styles.waveElement, styles.wave3, waveAnimatedStyle]} />

        <View style={styles.content}>
          {/* Logo Section */}
          <TouchableOpacity 
            style={styles.logoContainer}
            onPress={handleLogoPress}
            activeOpacity={0.9}
          >
            <Animated.View style={[styles.logoWrapper, logoAnimatedStyle]}>
              {/* Animated Border Ring */}
              <Animated.View style={[styles.borderRing, borderAnimatedStyle, { borderColor: Colors.secondary[400] }]} />
              
              {/* Glow Effect */}
              <Animated.View style={[styles.glowEffect, glowAnimatedStyle, { backgroundColor: Colors.primary[500] + '30' }]} />
              
              {/* Main Logo Background */}
              <LinearGradient
                colors={Colors.gradients.primary}
                style={styles.logoBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.logoContent}>
                  {/* Animated Microphone */}
                  <Animated.View style={micAnimatedStyle}>
                    <Mic size={40} color="#FFFFFF" strokeWidth={2.5} />
                  </Animated.View>
                  
                  {/* Rotating Play Icon */}
                  <Animated.View style={[styles.playIcon, playIconAnimatedStyle]}>
                    <LinearGradient
                      colors={Colors.gradients.accent}
                      style={styles.playIconBackground}
                    >
                      <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
                    </LinearGradient>
                  </Animated.View>

                  {/* Sound Waves */}
                  <View style={styles.soundWaves}>
                    <Animated.View style={[styles.soundWave, styles.soundWave1, waveAnimatedStyle]}>
                      <Waves size={12} color="rgba(255,255,255,0.6)" />
                    </Animated.View>
                    <Animated.View style={[styles.soundWave, styles.soundWave2, waveAnimatedStyle]}>
                      <Radio size={10} color="rgba(255,255,255,0.4)" />
                    </Animated.View>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>

          {/* Enhanced Brand Text with Creative Animations */}
          <Animated.View style={[styles.brandContainer, brandContainerAnimatedStyle]}>
            {/* Brand Glow Background */}
            <Animated.View style={[styles.brandGlowBackground, brandGlowAnimatedStyle]} />
            
            {/* Shimmer Effect */}
            <Animated.View style={[styles.shimmerOverlay, shimmerAnimatedStyle]} />
            
            <View style={styles.brandTextContainer}>
              {/* RISE with elegant entrance */}
              <Animated.View style={[styles.wordContainer, riseAnimatedStyle]}>
                <LinearGradient
                  colors={[Colors.primary[400], Colors.secondary[400], Colors.accent.pink]}
                  style={styles.wordGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={[styles.brandWord, styles.riseText]}>RISE</Text>
                </LinearGradient>
              </Animated.View>
              
              {/* Animated Ampersand */}
              <Animated.View style={[styles.ampersandContainer, ampersandAnimatedStyle]}>
                <LinearGradient
                  colors={Colors.gradients.accent}
                  style={styles.ampersandGradient}
                >
                  <Text style={styles.ampersandText}>&</Text>
                </LinearGradient>
              </Animated.View>
              
              {/* SPEAK with elegant entrance */}
              <Animated.View style={[styles.wordContainer, speakAnimatedStyle]}>
                <LinearGradient
                  colors={[Colors.accent.orange, Colors.accent.pink, Colors.secondary[500]]}
                  style={styles.wordGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={[styles.brandWord, styles.speakText]}>SPEAK</Text>
                </LinearGradient>
              </Animated.View>
            </View>
            
            <Text style={[styles.brandSubtitle, { color: Colors.secondary[400] }]}>Video Podcast Platform</Text>
            <View style={[styles.taglineContainer, { backgroundColor: Colors.dark.card, borderColor: Colors.secondary[600] }]}>
              <Volume2 size={16} color={Colors.secondary[400]} />
              <Text style={styles.tagline}>Where Stories Come to Life</Text>
            </View>
          </Animated.View>

          {/* Call to Action */}
          {showContent && (
            <Animated.View style={[styles.ctaContainer, buttonAnimatedStyle]}>
              <Text style={styles.ctaText}>Tap the logo to begin your journey</Text>
              <View style={styles.tapIndicator}>
                <Animated.View style={[styles.tapRipple, waveAnimatedStyle]} />
                <Animated.View style={[styles.tapRipple2, waveAnimatedStyle]} />
              </View>
            </Animated.View>
          )}
        </View>

        {/* Footer */}
        <Animated.View style={[styles.footer, textAnimatedStyle]}>
          <Text style={styles.footerText}>Powered by Innovation</Text>
        </Animated.View>
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
    position: 'relative',
  },
  particleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 1.5,
  },
  waveElement: {
    position: 'absolute',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 50,
  },
  wave1: {
    width: 100,
    height: 100,
    top: '20%',
    left: '10%',
  },
  wave2: {
    width: 80,
    height: 80,
    top: '60%',
    right: '15%',
  },
  wave3: {
    width: 60,
    height: 60,
    top: '80%',
    left: '20%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 60,
  },
  logoWrapper: {
    position: 'relative',
  },
  borderRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    top: -10,
    left: -10,
  },
  logoBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[500],
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
  },
  logoContent: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playIcon: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  playIconBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
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
    top: 10,
    left: -20,
  },
  soundWave2: {
    bottom: 10,
    right: -20,
  },
  glowEffect: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    top: -20,
    left: -20,
    zIndex: -1,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 80,
    position: 'relative',
  },
  brandGlowBackground: {
    position: 'absolute',
    width: 400,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    top: -20,
    zIndex: -1,
  },
  shimmerOverlay: {
    position: 'absolute',
    width: 200,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: 0,
    zIndex: 1,
    borderRadius: 40,
  },
  brandTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
    zIndex: 2,
  },
  wordContainer: {
    marginHorizontal: 4,
  },
  wordGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  brandWord: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  riseText: {
    transform: [{ skewX: '-5deg' }],
  },
  speakText: {
    transform: [{ skewX: '5deg' }],
  },
  ampersandContainer: {
    marginHorizontal: 8,
    marginTop: -4,
  },
  ampersandGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent.orange,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  ampersandText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  brandSubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 1,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[200],
  },
  ctaContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  ctaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[300],
    textAlign: 'center',
    marginBottom: 20,
  },
  tapIndicator: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tapRipple: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  tapRipple2: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});