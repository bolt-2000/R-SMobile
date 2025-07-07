import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { Heart, Download, Clock, Play, TrendingUp, BookOpen, Share2, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withRepeat,
  withSequence,
  withTiming,
  interpolate
} from 'react-native-reanimated';

const tabs = [
  { id: 'favorites', title: 'Favorites', icon: Heart },
  { id: 'downloads', title: 'Downloads', icon: Download },
  { id: 'history', title: 'History', icon: Clock },
  { id: 'subscriptions', title: 'Subscriptions', icon: BookOpen },
];

const favoritePodcasts = [
  {
    id: 1,
    title: 'The Rise Morning Show',
    host: 'Sarah Johnson',
    image: 'https://images.pexels.com/photos/7191991/pexels-photo-7191991.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    category: 'Business',
    episodes: 145,
    lastEpisode: '2 hours ago',
  },
  {
    id: 2,
    title: 'Speak Your Truth',
    host: 'Marcus Williams',
    image: 'https://images.pexels.com/photos/7191319/pexels-photo-7191319.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    category: 'Personal Growth',
    episodes: 98,
    lastEpisode: '1 day ago',
  },
  {
    id: 3,
    title: 'Innovation Leaders',
    host: 'Dr. Emily Chen',
    image: 'https://images.pexels.com/photos/7191992/pexels-photo-7191992.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    category: 'Technology',
    episodes: 76,
    lastEpisode: '3 days ago',
  },
];

const downloadedEpisodes = [
  {
    id: 1,
    title: 'Building Your Personal Brand in 2024',
    podcast: 'The Rise Morning Show',
    duration: '45 min',
    size: '42.3 MB',
    image: 'https://images.pexels.com/photos/7191991/pexels-photo-7191991.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    downloadedAt: '2 hours ago',
  },
  {
    id: 2,
    title: 'The Power of Vulnerability in Leadership',
    podcast: 'Speak Your Truth',
    duration: '38 min',
    size: '35.8 MB',
    image: 'https://images.pexels.com/photos/7191319/pexels-photo-7191319.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    downloadedAt: '1 day ago',
  },
];

const listeningHistory = [
  {
    id: 1,
    title: 'AI and the Future of Work',
    podcast: 'Innovation Leaders',
    duration: '52 min',
    progress: 0.75,
    image: 'https://images.pexels.com/photos/7191992/pexels-photo-7191992.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    listenedAt: '3 hours ago',
  },
  {
    id: 2,
    title: 'Building Your Personal Brand in 2024',
    podcast: 'The Rise Morning Show',
    duration: '45 min',
    progress: 0.28,
    image: 'https://images.pexels.com/photos/7191991/pexels-photo-7191991.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    listenedAt: '1 day ago',
  },
];

// Animated Brand Component for Library
function AnimatedLibraryTitle() {
  const riseScale = useSharedValue(1);
  const speakScale = useSharedValue(1);
  const ampersandRotation = useSharedValue(0);
  const shimmerPosition = useSharedValue(-1);
  const brandGlow = useSharedValue(0.5);

  useEffect(() => {
    // Continuous subtle animations
    riseScale.value = withRepeat(
      withSequence(
        withTiming(1.01, { duration: 2500 }),
        withTiming(1, { duration: 2500 })
      ),
      -1,
      true
    );

    speakScale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500 }),
        withTiming(1.01, { duration: 2500 })
      ),
      -1,
      true
    );

    ampersandRotation.value = withRepeat(
      withTiming(360, { duration: 10000 }),
      -1,
      false
    );

    shimmerPosition.value = withRepeat(
      withTiming(1, { duration: 5000 }),
      -1,
      false
    );

    brandGlow.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 3500 }),
        withTiming(0.3, { duration: 3500 })
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
      [-150, 150]
    );
    return {
      transform: [{ translateX }],
      opacity: interpolate(
        shimmerPosition.value,
        [-1, -0.5, 0, 0.5, 1],
        [0, 0.2, 0.6, 0.2, 0]
      )
    };
  });

  const brandGlowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: brandGlow.value * 0.5,
  }));

  return (
    <View style={styles.animatedLibraryBrand}>
      {/* Glow Background */}
      <Animated.View style={[styles.libraryBrandGlow, brandGlowAnimatedStyle]} />
      
      {/* Shimmer Effect */}
      <Animated.View style={[styles.libraryShimmer, shimmerAnimatedStyle]} />
      
      <View style={styles.libraryBrandRow}>
        {/* RISE */}
        <Animated.View style={[styles.libraryWordContainer, riseAnimatedStyle]}>
          <LinearGradient
            colors={[Colors.primary[400], Colors.secondary[400]]}
            style={styles.libraryWordGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.libraryWordText, styles.libraryRiseText]}>RISE</Text>
          </LinearGradient>
        </Animated.View>
        
        {/* Ampersand */}
        <Animated.View style={[styles.libraryAmpersand, ampersandAnimatedStyle]}>
          <LinearGradient
            colors={Colors.gradients.accent}
            style={styles.libraryAmpersandGradient}
          >
            <Text style={styles.libraryAmpersandText}>&</Text>
          </LinearGradient>
        </Animated.View>
        
        {/* SPEAK */}
        <Animated.View style={[styles.libraryWordContainer, speakAnimatedStyle]}>
          <LinearGradient
            colors={[Colors.accent.orange, Colors.secondary[500]]}
            style={styles.libraryWordGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.libraryWordText, styles.librarySpeakText]}>SPEAK</Text>
          </LinearGradient>
        </Animated.View>
      </View>
      
      <Text style={styles.librarySubtitle}>Library</Text>
    </View>
  );
}

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState('favorites');

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    console.log('Switched to tab:', tabId);
  };

  const handlePodcastPress = (podcast: any) => {
    console.log('Playing podcast:', podcast.title);
    // Navigate to podcast
  };

  const handleEpisodePress = (episode: any) => {
    console.log('Playing episode:', episode.title);
    // Navigate to episode player
  };

  const handleSharePress = (item: any) => {
    console.log('Sharing:', item.title);
    // Handle share functionality
  };

  const handleMorePress = (item: any) => {
    console.log('More options for:', item.title);
    // Show more options
  };

  const triggerHapticFeedback = () => {
    if (Platform.OS === 'web') {
      console.log('Button pressed');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'favorites':
        return (
          <View style={styles.contentContainer}>
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.sectionTitleGradient}
            >
              <Text style={styles.sectionTitle}>Your Favorite Podcasts</Text>
            </LinearGradient>
            {favoritePodcasts.map((podcast) => (
              <TouchableOpacity 
                key={podcast.id} 
                style={styles.podcastCard}
                onPress={() => {
                  handlePodcastPress(podcast);
                  triggerHapticFeedback();
                }}
              >
                <Image source={{ uri: podcast.image }} style={styles.podcastImage} />
                <View style={styles.podcastInfo}>
                  <Text style={styles.podcastTitle}>{podcast.title}</Text>
                  <Text style={styles.podcastHost}>by {podcast.host}</Text>
                  <View style={styles.podcastStats}>
                    <View style={styles.statItem}>
                      <Text style={[styles.category, { backgroundColor: Colors.primary[900], color: Colors.primary[300] }]}>
                        {podcast.category}
                      </Text>
                      <Text style={styles.episodes}>{podcast.episodes} episodes</Text>
                    </View>
                    <Text style={styles.lastEpisode}>{podcast.lastEpisode}</Text>
                  </View>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity 
                    style={[styles.playButton, { borderColor: Colors.primary[500] }]}
                    onPress={() => {
                      handlePodcastPress(podcast);
                      triggerHapticFeedback();
                    }}
                  >
                    <Play size={20} color={Colors.primary[500]} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.secondaryButton}
                    onPress={() => {
                      handleSharePress(podcast);
                      triggerHapticFeedback();
                    }}
                  >
                    <Share2 size={16} color={Colors.neutral[400]} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'downloads':
        return (
          <View style={styles.contentContainer}>
            <LinearGradient
              colors={Colors.gradients.secondary}
              style={styles.sectionTitleGradient}
            >
              <Text style={styles.sectionTitle}>Downloaded Episodes</Text>
            </LinearGradient>
            <View style={styles.downloadStats}>
              <View style={[styles.statCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Episodes</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
                <Text style={styles.statValue}>78.1 MB</Text>
                <Text style={styles.statLabel}>Storage Used</Text>
              </View>
            </View>
            {downloadedEpisodes.map((episode) => (
              <TouchableOpacity 
                key={episode.id} 
                style={styles.episodeCard}
                onPress={() => {
                  handleEpisodePress(episode);
                  triggerHapticFeedback();
                }}
              >
                <Image source={{ uri: episode.image }} style={styles.episodeImage} />
                <View style={styles.episodeInfo}>
                  <Text style={styles.episodeTitle}>{episode.title}</Text>
                  <Text style={styles.episodePodcast}>{episode.podcast}</Text>
                  <View style={styles.episodeStats}>
                    <Text style={styles.duration}>{episode.duration}</Text>
                    <Text style={styles.fileSize}>{episode.size}</Text>
                  </View>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity 
                    style={[styles.playButton, { borderColor: Colors.primary[500] }]}
                    onPress={() => {
                      handleEpisodePress(episode);
                      triggerHapticFeedback();
                    }}
                  >
                    <Play size={20} color={Colors.primary[500]} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.secondaryButton}
                    onPress={() => {
                      handleMorePress(episode);
                      triggerHapticFeedback();
                    }}
                  >
                    <MoreHorizontal size={16} color={Colors.neutral[400]} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'history':
        return (
          <View style={styles.contentContainer}>
            <LinearGradient
              colors={Colors.gradients.accent}
              style={styles.sectionTitleGradient}
            >
              <Text style={styles.sectionTitle}>Listening History</Text>
            </LinearGradient>
            {listeningHistory.map((episode) => (
              <TouchableOpacity 
                key={episode.id} 
                style={styles.episodeCard}
                onPress={() => {
                  handleEpisodePress(episode);
                  triggerHapticFeedback();
                }}
              >
                <Image source={{ uri: episode.image }} style={styles.episodeImage} />
                <View style={styles.episodeInfo}>
                  <Text style={styles.episodeTitle}>{episode.title}</Text>
                  <Text style={styles.episodePodcast}>{episode.podcast}</Text>
                  <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { backgroundColor: Colors.neutral[700] }]}>
                      <View style={[styles.progress, { width: `${episode.progress * 100}%`, backgroundColor: Colors.primary[500] }]} />
                    </View>
                    <Text style={[styles.progressText, { color: Colors.primary[400] }]}>{Math.round(episode.progress * 100)}%</Text>
                  </View>
                  <Text style={styles.listenedAt}>{episode.listenedAt}</Text>
                </View>
                <TouchableOpacity 
                  style={[styles.playButton, { borderColor: Colors.primary[500] }]}
                  onPress={() => {
                    handleEpisodePress(episode);
                    triggerHapticFeedback();
                  }}
                >
                  <Play size={20} color={Colors.primary[500]} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'subscriptions':
        return (
          <View style={styles.contentContainer}>
            <LinearGradient
              colors={[Colors.accent.emerald, Colors.primary[500]]}
              style={styles.sectionTitleGradient}
            >
              <Text style={styles.sectionTitle}>Your Subscriptions</Text>
            </LinearGradient>
            <View style={styles.subscriptionStats}>
              <View style={[styles.statCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
                <TrendingUp size={24} color={Colors.primary[400]} />
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Active Subscriptions</Text>
              </View>
            </View>
            {favoritePodcasts.map((podcast) => (
              <TouchableOpacity 
                key={podcast.id} 
                style={styles.subscriptionCard}
                onPress={() => {
                  handlePodcastPress(podcast);
                  triggerHapticFeedback();
                }}
              >
                <Image source={{ uri: podcast.image }} style={styles.subscriptionImage} />
                <View style={styles.subscriptionInfo}>
                  <Text style={styles.subscriptionTitle}>{podcast.title}</Text>
                  <Text style={styles.subscriptionHost}>by {podcast.host}</Text>
                  <Text style={[styles.subscriptionCategory, { color: Colors.primary[400] }]}>{podcast.category}</Text>
                </View>
                <View style={[styles.subscriptionBadge, { backgroundColor: Colors.accent.emerald }]}>
                  <Text style={styles.subscriptionBadgeText}>Subscribed</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AnimatedLibraryTitle />
      </View>

      <View style={[styles.tabContainer, { borderBottomColor: Colors.dark.border }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab, 
                { backgroundColor: Colors.dark.card },
                activeTab === tab.id && { backgroundColor: Colors.primary[900] }
              ]}
              onPress={() => {
                handleTabPress(tab.id);
                triggerHapticFeedback();
              }}
            >
              <tab.icon size={20} color={activeTab === tab.id ? Colors.primary[300] : Colors.neutral[400]} />
              <Text style={[
                styles.tabText, 
                { color: activeTab === tab.id ? Colors.primary[300] : Colors.neutral[400] }
              ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderContent()}
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  // Animated Library Brand Styles
  animatedLibraryBrand: {
    position: 'relative',
    alignItems: 'center',
  },
  libraryBrandGlow: {
    position: 'absolute',
    width: 220,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    top: -5,
    zIndex: -1,
  },
  libraryShimmer: {
    position: 'absolute',
    width: 80,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: 0,
    zIndex: 1,
    borderRadius: 20,
  },
  libraryBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  libraryWordContainer: {
    marginHorizontal: 1,
  },
  libraryWordGradient: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  libraryWordText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  libraryRiseText: {
    transform: [{ skewX: '-2deg' }],
  },
  librarySpeakText: {
    transform: [{ skewX: '2deg' }],
  },
  libraryAmpersand: {
    marginHorizontal: 4,
    marginTop: -1,
  },
  libraryAmpersandGradient: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent.orange,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  libraryAmpersandText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  librarySubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.neutral[400],
    marginTop: 4,
    letterSpacing: 0.5,
  },
  tabContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitleGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  podcastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  podcastImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  podcastInfo: {
    flex: 1,
  },
  podcastTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  podcastHost: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
    marginBottom: 8,
  },
  podcastStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  category: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  episodes: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[400],
  },
  lastEpisode: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
  cardActions: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dark.card,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
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
  },
  episodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  episodeImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  episodeInfo: {
    flex: 1,
  },
  episodeTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  episodePodcast: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
    marginBottom: 8,
  },
  episodeStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  duration: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[400],
  },
  fileSize: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  progress: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    width: 35,
  },
  listenedAt: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
  subscriptionStats: {
    marginBottom: 24,
  },
  subscriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  subscriptionImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subscriptionHost: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
    marginBottom: 4,
  },
  subscriptionCategory: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  subscriptionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  subscriptionBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
});