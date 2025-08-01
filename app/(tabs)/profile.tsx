import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Settings, CreditCard as Edit3, Mic, Headphones, Calendar, Award, Share2, Bell, TrendingUp, Users, LogOut, Crown, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withRepeat,
  withSequence,
  withTiming,
  interpolate
} from 'react-native-reanimated';

const menuItems = [
  { title: 'Create New Episode', icon: Mic, color: Colors.primary[500], route: null },
  { title: 'Analytics Dashboard', icon: TrendingUp, color: Colors.accent.emerald, route: null },
  { title: 'Subscription', icon: Crown, color: Colors.accent.amber, route: '/subscription' },
  { title: 'Settings', icon: Settings, color: Colors.neutral[500], route: '/settings' },
  { title: 'Help & Support', icon: HelpCircle, color: Colors.accent.pink, route: '/help' },
];

// Animated Brand Component for Profile
function AnimatedProfileTitle() {
  const riseScale = useSharedValue(1);
  const speakScale = useSharedValue(1);
  const ampersandRotation = useSharedValue(0);
  const shimmerPosition = useSharedValue(-1);
  const brandGlow = useSharedValue(0.3);

  useEffect(() => {
    // Continuous subtle animations
    riseScale.value = withRepeat(
      withSequence(
        withTiming(1.008, { duration: 3500 }),
        withTiming(1, { duration: 3500 })
      ),
      -1,
      true
    );

    speakScale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3500 }),
        withTiming(1.008, { duration: 3500 })
      ),
      -1,
      true
    );

    ampersandRotation.value = withRepeat(
      withTiming(360, { duration: 15000 }),
      -1,
      false
    );

    shimmerPosition.value = withRepeat(
      withTiming(1, { duration: 7000 }),
      -1,
      false
    );

    brandGlow.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 4500 }),
        withTiming(0.1, { duration: 4500 })
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
      [-120, 120]
    );
    return {
      transform: [{ translateX }],
      opacity: interpolate(
        shimmerPosition.value,
        [-1, -0.5, 0, 0.5, 1],
        [0, 0.1, 0.4, 0.1, 0]
      )
    };
  });

  const brandGlowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: brandGlow.value * 0.3,
  }));

  return (
    <View style={styles.animatedProfileBrand}>
      {/* Glow Background */}
      <Animated.View style={[styles.profileBrandGlow, brandGlowAnimatedStyle]} />
      
      {/* Shimmer Effect */}
      <Animated.View style={[styles.profileShimmer, shimmerAnimatedStyle]} />
      
      <View style={styles.profileBrandRow}>
        {/* RISE */}
        <Animated.View style={[styles.profileWordContainer, riseAnimatedStyle]}>
          <LinearGradient
            colors={[Colors.primary[400], Colors.secondary[400]]}
            style={styles.profileWordGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.profileWordText, styles.profileRiseText]}>RISE</Text>
          </LinearGradient>
        </Animated.View>
        
        {/* Ampersand */}
        <Animated.View style={[styles.profileAmpersand, ampersandAnimatedStyle]}>
          <LinearGradient
            colors={Colors.gradients.accent}
            style={styles.profileAmpersandGradient}
          >
            <Text style={styles.profileAmpersandText}>&</Text>
          </LinearGradient>
        </Animated.View>
        
        {/* SPEAK */}
        <Animated.View style={[styles.profileWordContainer, speakAnimatedStyle]}>
          <LinearGradient
            colors={[Colors.accent.orange, Colors.secondary[500]]}
            style={styles.profileWordGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.profileWordText, styles.profileSpeakText]}>SPEAK</Text>
          </LinearGradient>
        </Animated.View>
      </View>
      
      <Text style={styles.profileSubtitle}>Profile</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const { user, signOut, isAuthenticated } = useAuth();

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  const handleShareProfile = () => {
    console.log('Share profile pressed');
    // Handle share functionality
  };

  const handleMenuItemPress = (item: any) => {
    if (item.route) {
      router.push(item.route);
    } else {
      console.log('Menu item pressed:', item.title);
    }
  };

  const handleAchievementPress = (achievement: any) => {
    console.log('Achievement pressed:', achievement.title);
    // Show achievement details
  };

  const handleSignOut = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to sign out?');
      if (confirmed) {
        signOut();
        router.replace('/');
      }
    } else {
      Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign Out', style: 'destructive', onPress: () => {
            signOut();
            router.replace('/');
          }},
        ]
      );
    }
  };

  const triggerHapticFeedback = () => {
    if (Platform.OS === 'web') {
      console.log('Button pressed');
    }
  };

  // Show sign in prompt if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={Colors.gradients.dark}
          style={styles.signInPrompt}
        >
          <AnimatedProfileTitle />
          <View style={styles.signInCard}>
            <Text style={styles.signInTitle}>Sign In Required</Text>
            <Text style={styles.signInText}>
              Please sign in to view your profile and access all features
            </Text>
            <TouchableOpacity 
              style={styles.signInButton}
              onPress={() => {
                router.push('/auth');
                triggerHapticFeedback();
              }}
            >
              <LinearGradient
                colors={Colors.gradients.primary}
                style={styles.signInButtonGradient}
              >
                <Text style={styles.signInButtonText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }

  const userStats = [
    { label: 'Episodes Listened', value: user.stats?.episodesListened?.toString() || '0', icon: Headphones, color: Colors.primary[500] },
    { label: 'Hours Listened', value: user.stats?.hoursListened?.toString() || '0', icon: Calendar, color: Colors.accent.emerald },
    { label: 'Podcasts Created', value: user.stats?.podcastsCreated?.toString() || '0', icon: Mic, color: Colors.accent.orange },
    { label: 'Followers', value: user.stats?.followers?.toString() || '0', icon: Users, color: Colors.accent.amber },
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Episode',
      description: 'Created your first podcast episode',
      icon: '🎙️',
      unlocked: (user.stats?.podcastsCreated || 0) > 0,
    },
    {
      id: 2,
      title: 'Rising Star',
      description: 'Reached 100 episode listens',
      icon: '⭐',
      unlocked: (user.stats?.episodesListened || 0) >= 100,
    },
    {
      id: 3,
      title: 'Content Creator',
      description: 'Published 10 episodes',
      icon: '🎬',
      unlocked: (user.stats?.podcastsCreated || 0) >= 10,
    },
    {
      id: 4,
      title: 'Podcast Master',
      description: 'Reached 50 episodes published',
      icon: '👑',
      unlocked: (user.stats?.podcastsCreated || 0) >= 50,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={Colors.gradients.dark}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <AnimatedProfileTitle />
          <TouchableOpacity 
            style={[styles.signOutButton, { backgroundColor: Colors.accent.red + '20', borderColor: Colors.accent.red }]}
            onPress={() => {
              handleSignOut();
              triggerHapticFeedback();
            }}
          >
            <LogOut size={20} color={Colors.accent.red} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200&h=200' }}
              style={styles.avatar}
            />
            <TouchableOpacity 
              style={[styles.editButton, { backgroundColor: Colors.primary[500] }]}
              onPress={() => {
                handleEditProfile();
                triggerHapticFeedback();
              }}
            >
              <Edit3 size={16} color="#FFFFFF" />
            </TouchableOpacity>
            {user.subscription === 'premium' && (
              <View style={[styles.premiumBadge, { backgroundColor: Colors.accent.amber }]}>
                <Crown size={12} color="#FFFFFF" />
              </View>
            )}
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={[styles.userEmail, { color: Colors.primary[400] }]}>{user.email}</Text>
          {user.isVerified && (
            <View style={[styles.verifiedBadge, { backgroundColor: Colors.accent.emerald + '20', borderColor: Colors.accent.emerald }]}>
              <Shield size={14} color={Colors.accent.emerald} />
              <Text style={[styles.verifiedText, { color: Colors.accent.emerald }]}>Verified</Text>
            </View>
          )}
          <View style={styles.profileActions}>
            <TouchableOpacity 
              style={[styles.actionButton, { borderColor: Colors.primary[500] }]}
              onPress={() => {
                handleShareProfile();
                triggerHapticFeedback();
              }}
            >
              <Share2 size={20} color={Colors.primary[500]} />
              <Text style={[styles.actionButtonText, { color: Colors.primary[500] }]}>Share Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Stats Section */}
        <View style={styles.section}>
          <LinearGradient
            colors={Colors.gradients.primary}
            style={styles.sectionTitleGradient}
          >
            <Text style={styles.sectionTitle}>Your Stats</Text>
          </LinearGradient>
          <View style={styles.statsGrid}>
            {userStats.map((stat, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.statCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}
                onPress={() => {
                  console.log('Stat pressed:', stat.label);
                  triggerHapticFeedback();
                }}
              >
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <stat.icon size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <LinearGradient
            colors={Colors.gradients.secondary}
            style={styles.sectionTitleGradient}
          >
            <Text style={styles.sectionTitle}>Achievements</Text>
          </LinearGradient>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <TouchableOpacity
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border },
                  !achievement.unlocked && styles.lockedAchievement
                ]}
                onPress={() => {
                  handleAchievementPress(achievement);
                  triggerHapticFeedback();
                }}
              >
                <View style={[styles.achievementIcon, { backgroundColor: Colors.neutral[700] }]}>
                  <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                </View>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.lockedText
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  !achievement.unlocked && styles.lockedText
                ]}>
                  {achievement.description}
                </Text>
                {achievement.unlocked && (
                  <View style={[styles.unlockedBadge, { backgroundColor: Colors.accent.emerald }]}>
                    <Text style={styles.unlockedText}>Unlocked</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <LinearGradient
            colors={Colors.gradients.accent}
            style={styles.sectionTitleGradient}
          >
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </LinearGradient>
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.menuItem, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}
                onPress={() => {
                  handleMenuItemPress(item);
                  triggerHapticFeedback();
                }}
              >
                <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                  <item.icon size={24} color={item.color} />
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <LinearGradient
            colors={[Colors.accent.emerald, Colors.primary[500]]}
            style={styles.sectionTitleGradient}
          >
            <Text style={styles.sectionTitle}>Recent Activity</Text>
          </LinearGradient>
          <View style={styles.activityList}>
            <TouchableOpacity 
              style={[styles.activityItem, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}
              onPress={() => {
                console.log('Activity item pressed');
                triggerHapticFeedback();
              }}
            >
              <View style={[styles.activityIcon, { backgroundColor: Colors.primary[900] }]}>
                <Mic size={20} color={Colors.primary[400]} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Account Created</Text>
                <Text style={styles.activityDescription}>
                  Welcome to RISE & SPEAK! Start exploring amazing podcasts.
                </Text>
                <Text style={styles.activityTime}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
            
            {user.lastLogin && (
              <TouchableOpacity 
                style={[styles.activityItem, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}
                onPress={() => {
                  console.log('Activity item pressed');
                  triggerHapticFeedback();
                }}
              >
                <View style={[styles.activityIcon, { backgroundColor: Colors.accent.emerald + '20' }]}>
                  <Users size={20} color={Colors.accent.emerald} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Last Login</Text>
                  <Text style={styles.activityDescription}>
                    You signed in to your account
                  </Text>
                  <Text style={styles.activityTime}>
                    {new Date(user.lastLogin).toLocaleString()}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  signInPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  signInCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
    marginTop: 40,
  },
  signInTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  signInText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[400],
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  signInButton: {
    borderRadius: 12,
    overflow: 'hidden',
    minWidth: 120,
  },
  signInButtonGradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signInButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  signOutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  // Animated Profile Brand Styles
  animatedProfileBrand: {
    position: 'relative',
    alignItems: 'center',
  },
  profileBrandGlow: {
    position: 'absolute',
    width: 180,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    top: -2,
    zIndex: -1,
  },
  profileShimmer: {
    position: 'absolute',
    width: 60,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    top: 0,
    zIndex: 1,
    borderRadius: 15,
  },
  profileBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  profileWordContainer: {
    marginHorizontal: 1,
  },
  profileWordGradient: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  profileWordText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  profileRiseText: {
    transform: [{ skewX: '-1deg' }],
  },
  profileSpeakText: {
    transform: [{ skewX: '1deg' }],
  },
  profileAmpersand: {
    marginHorizontal: 2,
    marginTop: -1,
  },
  profileAmpersandGradient: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent.orange,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  profileAmpersandText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  profileSubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: Colors.neutral[400],
    marginTop: 1,
    letterSpacing: 0.2,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary[500],
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.card,
  },
  premiumBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.card,
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 12,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  verifiedText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  profileActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    gap: 8,
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitleGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[400],
    textAlign: 'center',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[400],
    textAlign: 'center',
    lineHeight: 16,
  },
  lockedText: {
    color: Colors.neutral[500],
  },
  unlockedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  unlockedText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#FFFFFF',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  menuItem: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  activityDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
    marginBottom: 4,
  },
  activityTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
});