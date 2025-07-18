import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Play, Clock, Heart, Share2 } from 'lucide-react-native';
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

const popularSearches = [
  'Business Growth',
  'Personal Development',
  'Technology Trends',
  'Health & Wellness',
  'Leadership',
  'Entrepreneurship',
];

const searchResults = [
  {
    id: 1,
    type: 'podcast',
    title: 'The Rise Morning Show',
    host: 'Sarah Johnson',
    image: 'https://images.pexels.com/photos/7191991/pexels-photo-7191991.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    category: 'Business',
    followers: '125K',
    rating: 4.8,
  },
  {
    id: 2,
    type: 'episode',
    title: 'Building Your Personal Brand in 2024',
    podcast: 'The Rise Morning Show',
    duration: '45 min',
    image: 'https://images.pexels.com/photos/7191991/pexels-photo-7191991.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    publishedAt: '2 hours ago',
  },
  {
    id: 3,
    type: 'podcast',
    title: 'Innovation Leaders',
    host: 'Dr. Emily Chen',
    image: 'https://images.pexels.com/photos/7191992/pexels-photo-7191992.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    category: 'Technology',
    followers: '156K',
    rating: 4.7,
  },
  {
    id: 4,
    type: 'episode',
    title: 'The Power of Vulnerability in Leadership',
    podcast: 'Speak Your Truth',
    duration: '38 min',
    image: 'https://images.pexels.com/photos/7191319/pexels-photo-7191319.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    publishedAt: '1 day ago',
  },
];

// Animated Brand Component for Search
function AnimatedSearchTitle() {
  const riseScale = useSharedValue(1);
  const speakScale = useSharedValue(1);
  const ampersandRotation = useSharedValue(0);
  const shimmerPosition = useSharedValue(-1);
  const brandGlow = useSharedValue(0.4);

  useEffect(() => {
    // Continuous subtle animations
    riseScale.value = withRepeat(
      withSequence(
        withTiming(1.015, { duration: 3000 }),
        withTiming(1, { duration: 3000 })
      ),
      -1,
      true
    );

    speakScale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000 }),
        withTiming(1.015, { duration: 3000 })
      ),
      -1,
      true
    );

    ampersandRotation.value = withRepeat(
      withTiming(360, { duration: 12000 }),
      -1,
      false
    );

    shimmerPosition.value = withRepeat(
      withTiming(1, { duration: 6000 }),
      -1,
      false
    );

    brandGlow.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 4000 }),
        withTiming(0.2, { duration: 4000 })
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
      [-140, 140]
    );
    return {
      transform: [{ translateX }],
      opacity: interpolate(
        shimmerPosition.value,
        [-1, -0.5, 0, 0.5, 1],
        [0, 0.15, 0.5, 0.15, 0]
      )
    };
  });

  const brandGlowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: brandGlow.value * 0.4,
  }));

  return (
    <View style={styles.animatedSearchBrand}>
      {/* Glow Background */}
      <Animated.View style={[styles.searchBrandGlow, brandGlowAnimatedStyle]} />
      
      {/* Shimmer Effect */}
      <Animated.View style={[styles.searchShimmer, shimmerAnimatedStyle]} />
      
      <View style={styles.searchBrandRow}>
        {/* RISE */}
        <Animated.View style={[styles.searchWordContainer, riseAnimatedStyle]}>
          <LinearGradient
            colors={[Colors.primary[400], Colors.secondary[400]]}
            style={styles.searchWordGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.searchWordText, styles.searchRiseText]}>RISE</Text>
          </LinearGradient>
        </Animated.View>
        
        {/* Ampersand */}
        <Animated.View style={[styles.searchAmpersand, ampersandAnimatedStyle]}>
          <LinearGradient
            colors={Colors.gradients.accent}
            style={styles.searchAmpersandGradient}
          >
            <Text style={styles.searchAmpersandText}>&</Text>
          </LinearGradient>
        </Animated.View>
        
        {/* SPEAK */}
        <Animated.View style={[styles.searchWordContainer, speakAnimatedStyle]}>
          <LinearGradient
            colors={[Colors.accent.orange, Colors.secondary[500]]}
            style={styles.searchWordGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.searchWordText, styles.searchSpeakText]}>SPEAK</Text>
          </LinearGradient>
        </Animated.View>
      </View>
      
      <Text style={styles.searchSubtitle}>Search</Text>
    </View>
  );
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(query.length > 0);
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
    // Handle filter functionality
  };

  const handleResultPress = (result: any) => {
    console.log('Selected result:', result.title);
    // Navigate to result
  };

  const handleLikePress = (result: any) => {
    console.log('Liked:', result.title);
    // Handle like functionality
  };

  const handleSharePress = (result: any) => {
    console.log('Shared:', result.title);
    // Handle share functionality
  };

  const triggerHapticFeedback = () => {
    if (Platform.OS === 'web') {
      console.log('Button pressed');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AnimatedSearchTitle />
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={Colors.neutral[500]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search podcasts, episodes, or topics..."
              placeholderTextColor={Colors.neutral[500]}
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity 
            style={[styles.filterButton, { borderColor: Colors.primary[500] }]}
            onPress={() => {
              handleFilterPress();
              triggerHapticFeedback();
            }}
          >
            <Filter size={20} color={Colors.primary[500]} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!showResults ? (
          <View>
            <View style={styles.section}>
              <LinearGradient
                colors={Colors.gradients.secondary}
                style={styles.sectionTitleGradient}
              >
                <Text style={styles.sectionTitle}>Popular Searches</Text>
              </LinearGradient>
              <View style={styles.tagsContainer}>
                {popularSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.tag, { backgroundColor: Colors.dark.card, borderColor: Colors.primary[600] }]}
                    onPress={() => {
                      handleSearch(search);
                      triggerHapticFeedback();
                    }}
                  >
                    <TrendingUp size={16} color={Colors.primary[400]} />
                    <Text style={styles.tagText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <LinearGradient
                colors={Colors.gradients.accent}
                style={styles.sectionTitleGradient}
              >
                <Text style={styles.sectionTitle}>Trending Now</Text>
              </LinearGradient>
              <View style={styles.trendingGrid}>
                <TouchableOpacity 
                  style={styles.trendingCard}
                  onPress={() => {
                    handleSearch('Business Growth');
                    triggerHapticFeedback();
                  }}
                >
                  <Image
                    source={{ uri: 'https://images.pexels.com/photos/7191991/pexels-photo-7191991.jpeg?auto=compress&cs=tinysrgb&w=200&h=200' }}
                    style={styles.trendingImage}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                    style={styles.trendingOverlay}
                  >
                    <Text style={styles.trendingTitle}>Business Growth</Text>
                    <Text style={styles.trendingSubtitle}>125 podcasts</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.trendingCard}
                  onPress={() => {
                    handleSearch('Personal Growth');
                    triggerHapticFeedback();
                  }}
                >
                  <Image
                    source={{ uri: 'https://images.pexels.com/photos/7191319/pexels-photo-7191319.jpeg?auto=compress&cs=tinysrgb&w=200&h=200' }}
                    style={styles.trendingImage}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                    style={styles.trendingOverlay}
                  >
                    <Text style={styles.trendingTitle}>Personal Growth</Text>
                    <Text style={styles.trendingSubtitle}>89 podcasts</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.sectionTitleGradient}
            >
              <Text style={styles.sectionTitle}>Search Results</Text>
            </LinearGradient>
            <Text style={styles.resultsCount}>
              {searchResults.length} results for "{searchQuery}"
            </Text>
            {searchResults.map((result) => (
              <TouchableOpacity 
                key={result.id} 
                style={styles.resultCard}
                onPress={() => {
                  handleResultPress(result);
                  triggerHapticFeedback();
                }}
              >
                <Image source={{ uri: result.image }} style={styles.resultImage} />
                <View style={styles.resultInfo}>
                  {result.type === 'podcast' ? (
                    <>
                      <Text style={styles.resultTitle}>{result.title}</Text>
                      <Text style={styles.resultHost}>by {result.host}</Text>
                      <View style={styles.resultStats}>
                        <Text style={[styles.category, { backgroundColor: Colors.primary[900], color: Colors.primary[300] }]}>
                          {result.category}
                        </Text>
                        <Text style={styles.followers}>{result.followers} followers</Text>
                      </View>
                    </>
                  ) : (
                    <>
                      <Text style={styles.resultTitle}>{result.title}</Text>
                      <Text style={styles.resultPodcast}>{result.podcast}</Text>
                      <View style={styles.resultStats}>
                        <View style={styles.statItem}>
                          <Clock size={12} color={Colors.neutral[500]} />
                          <Text style={styles.duration}>{result.duration}</Text>
                        </View>
                        <Text style={styles.publishedAt}>{result.publishedAt}</Text>
                      </View>
                    </>
                  )}
                </View>
                <View style={styles.resultActions}>
                  <TouchableOpacity 
                    style={[styles.playButton, { borderColor: Colors.primary[500] }]}
                    onPress={() => {
                      handleResultPress(result);
                      triggerHapticFeedback();
                    }}
                  >
                    <Play size={20} color={Colors.primary[500]} />
                  </TouchableOpacity>
                  <View style={styles.secondaryActions}>
                    <TouchableOpacity 
                      style={styles.secondaryButton}
                      onPress={() => {
                        handleLikePress(result);
                        triggerHapticFeedback();
                      }}
                    >
                      <Heart size={16} color={Colors.neutral[400]} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.secondaryButton}
                      onPress={() => {
                        handleSharePress(result);
                        triggerHapticFeedback();
                      }}
                    >
                      <Share2 size={16} color={Colors.neutral[400]} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
  // Animated Search Brand Styles
  animatedSearchBrand: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBrandGlow: {
    position: 'absolute',
    width: 200,
    height: 45,
    borderRadius: 22,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    top: -3,
    zIndex: -1,
  },
  searchShimmer: {
    position: 'absolute',
    width: 70,
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    top: 0,
    zIndex: 1,
    borderRadius: 18,
  },
  searchBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  searchWordContainer: {
    marginHorizontal: 1,
  },
  searchWordGradient: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  searchWordText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  searchRiseText: {
    transform: [{ skewX: '-1.5deg' }],
  },
  searchSpeakText: {
    transform: [{ skewX: '1.5deg' }],
  },
  searchAmpersand: {
    marginHorizontal: 3,
    marginTop: -1,
  },
  searchAmpersandGradient: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent.orange,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  searchAmpersandText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  searchSubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.neutral[400],
    marginTop: 2,
    letterSpacing: 0.3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  trendingGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  trendingCard: {
    flex: 1,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  trendingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  trendingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  trendingSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[300],
  },
  resultsCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
    marginBottom: 16,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  resultHost: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
    marginBottom: 8,
  },
  resultPodcast: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
    marginBottom: 8,
  },
  resultStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  followers: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[400],
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  duration: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[400],
  },
  publishedAt: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
  resultActions: {
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
  secondaryActions: {
    flexDirection: 'row',
    gap: 8,
  },
  secondaryButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});