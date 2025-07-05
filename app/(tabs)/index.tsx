import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Clock, Star, Play, Video, Users, Calendar, Heart, Share2, Bookmark } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const featuredPodcasts = [
  {
    id: 1,
    title: 'The Rise Morning Show',
    host: 'Sarah Johnson',
    image: 'https://images.pexels.com/photos/7191991/pexels-photo-7191991.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    category: 'Business',
    listeners: '125K',
    rating: 4.8,
    isLive: false,
    duration: '45 min',
    type: 'video',
  },
  {
    id: 2,
    title: 'Speak Your Truth',
    host: 'Marcus Williams',
    image: 'https://images.pexels.com/photos/7191319/pexels-photo-7191319.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    category: 'Personal Growth',
    listeners: '89K',
    rating: 4.9,
    isLive: true,
    duration: 'LIVE',
    type: 'video',
  },
  {
    id: 3,
    title: 'Innovation Leaders',
    host: 'Dr. Emily Chen',
    image: 'https://images.pexels.com/photos/7191992/pexels-photo-7191992.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
    category: 'Technology',
    listeners: '156K',
    rating: 4.7,
    isLive: false,
    duration: '52 min',
    type: 'video',
  },
];

const liveShows = [
  {
    id: 1,
    title: 'Weekly Business Roundtable',
    host: 'Sarah Johnson',
    image: 'https://images.pexels.com/photos/7191991/pexels-photo-7191991.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
    viewers: '2.3K',
    startTime: 'Now',
  },
  {
    id: 2,
    title: 'Tech Talk Tuesday',
    host: 'Dr. Emily Chen',
    image: 'https://images.pexels.com/photos/7191992/pexels-photo-7191992.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
    viewers: '1.8K',
    startTime: '15 min',
  },
];

const categories = [
  { name: 'Business', color: Colors.primary[500], icon: TrendingUp },
  { name: 'Personal Growth', color: Colors.accent.orange, icon: Star },
  { name: 'Technology', color: Colors.accent.emerald, icon: TrendingUp },
  { name: 'Health', color: Colors.accent.red, icon: Star },
];

const recentEpisodes = [
  {
    id: 1,
    title: 'Building Your Personal Brand in 2024',
    podcast: 'The Rise Morning Show',
    duration: '45 min',
    image: 'https://images.pexels.com/photos/7191991/pexels-photo-7191991.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    publishedAt: '2 hours ago',
    views: '12.5K',
    type: 'video',
  },
  {
    id: 2,
    title: 'The Power of Vulnerability in Leadership',
    podcast: 'Speak Your Truth',
    duration: '38 min',
    image: 'https://images.pexels.com/photos/7191319/pexels-photo-7191319.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    publishedAt: '1 day ago',
    views: '8.9K',
    type: 'video',
  },
  {
    id: 3,
    title: 'AI and the Future of Work',
    podcast: 'Innovation Leaders',
    duration: '52 min',
    image: 'https://images.pexels.com/photos/7191992/pexels-photo-7191992.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    publishedAt: '2 days ago',
    views: '15.2K',
    type: 'video',
  },
];

export default function HomeScreen() {
  const handlePodcastPress = (podcast: any) => {
    console.log('Playing podcast:', podcast.title);
    // Navigate to player or handle podcast selection
  };

  const handleLiveShowPress = (show: any) => {
    console.log('Joining live show:', show.title);
    // Navigate to live show
  };

  const handleCategoryPress = (category: any) => {
    console.log('Browsing category:', category.name);
    // Navigate to category view
  };

  const handleEpisodePress = (episode: any) => {
    console.log('Playing episode:', episode.title);
    // Navigate to episode player
  };

  const handleLikePress = (item: any) => {
    console.log('Liked:', item.title);
    // Handle like functionality
  };

  const handleSharePress = (item: any) => {
    console.log('Sharing:', item.title);
    // Handle share functionality
  };

  const handleBookmarkPress = (item: any) => {
    console.log('Bookmarked:', item.title);
    // Handle bookmark functionality
  };

  const triggerHapticFeedback = () => {
    if (Platform.OS === 'web') {
      // Visual feedback for web
      console.log('Button pressed');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={Colors.gradients.dark}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good Morning!</Text>
          <View style={styles.brandContainer}>
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.brandGradient}
            >
              <Text style={styles.title}>RISE & SPEAK</Text>
            </LinearGradient>
          </View>
          <Text style={styles.subtitle}>Ready to Rise & Speak?</Text>
          <View style={styles.headerStats}>
            <View style={styles.statItem}>
              <Users size={16} color={Colors.primary[400]} />
              <Text style={styles.statText}>2.5M+ Viewers</Text>
            </View>
            <View style={styles.statItem}>
              <Video size={16} color={Colors.accent.emerald} />
              <Text style={styles.statText}>Live Shows Daily</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Live Shows */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <LinearGradient
              colors={[Colors.live, Colors.accent.orange]}
              style={styles.liveTitleGradient}
            >
              <Text style={styles.sectionTitle}>🔴 Live Now</Text>
            </LinearGradient>
            <TouchableOpacity onPress={() => console.log('See all live shows')}>
              <Text style={[styles.seeAllText, { color: Colors.primary[400] }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {liveShows.map((show) => (
              <TouchableOpacity 
                key={show.id} 
                style={styles.liveCard}
                onPress={() => {
                  handleLiveShowPress(show);
                  triggerHapticFeedback();
                }}
              >
                <Image source={{ uri: show.image }} style={styles.liveImage} />
                <View style={styles.liveOverlay}>
                  <View style={[styles.liveIndicator, { backgroundColor: Colors.live }]}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                  <View style={styles.viewerCount}>
                    <Users size={12} color="#FFFFFF" />
                    <Text style={styles.viewerText}>{show.viewers}</Text>
                  </View>
                </View>
                <View style={styles.liveInfo}>
                  <Text style={styles.liveTitle}>{show.title}</Text>
                  <Text style={styles.liveHost}>by {show.host}</Text>
                  <Text style={styles.liveTime}>Started {show.startTime}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Podcasts */}
        <View style={styles.section}>
          <LinearGradient
            colors={Colors.gradients.primary}
            style={styles.sectionTitleGradient}
          >
            <Text style={styles.sectionTitle}>Featured Video Podcasts</Text>
          </LinearGradient>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredPodcasts.map((podcast) => (
              <TouchableOpacity 
                key={podcast.id} 
                style={styles.podcastCard}
                onPress={() => {
                  handlePodcastPress(podcast);
                  triggerHapticFeedback();
                }}
              >
                <View style={styles.imageContainer}>
                  <Image source={{ uri: podcast.image }} style={styles.podcastImage} />
                  <View style={styles.videoIndicator}>
                    <Video size={16} color="#FFFFFF" />
                  </View>
                  {podcast.isLive && (
                    <View style={[styles.liveIndicator, { backgroundColor: Colors.live }]}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>
                  )}
                  <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{podcast.duration}</Text>
                  </View>
                  
                  {/* Action buttons overlay */}
                  <View style={styles.actionOverlay}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => {
                        handleLikePress(podcast);
                        triggerHapticFeedback();
                      }}
                    >
                      <Heart size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => {
                        handleBookmarkPress(podcast);
                        triggerHapticFeedback();
                      }}
                    >
                      <Bookmark size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.podcastInfo}>
                  <Text style={styles.podcastTitle}>{podcast.title}</Text>
                  <Text style={styles.podcastHost}>by {podcast.host}</Text>
                  <View style={styles.podcastStats}>
                    <View style={styles.statItem}>
                      <Star size={12} color={Colors.accent.amber} />
                      <Text style={styles.statText}>{podcast.rating}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <TrendingUp size={12} color={Colors.neutral[400]} />
                      <Text style={styles.statText}>{podcast.listeners}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <LinearGradient
            colors={Colors.gradients.secondary}
            style={styles.sectionTitleGradient}
          >
            <Text style={styles.sectionTitle}>Browse Categories</Text>
          </LinearGradient>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.categoryCard}
                onPress={() => {
                  handleCategoryPress(category);
                  triggerHapticFeedback();
                }}
              >
                <LinearGradient
                  colors={[category.color, category.color + '80']}
                  style={styles.categoryGradient}
                >
                  <category.icon size={24} color="#FFFFFF" />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Episodes */}
        <View style={styles.section}>
          <LinearGradient
            colors={Colors.gradients.accent}
            style={styles.sectionTitleGradient}
          >
            <Text style={styles.sectionTitle}>Recent Video Episodes</Text>
          </LinearGradient>
          {recentEpisodes.map((episode) => (
            <TouchableOpacity 
              key={episode.id} 
              style={styles.episodeCard}
              onPress={() => {
                handleEpisodePress(episode);
                triggerHapticFeedback();
              }}
            >
              <View style={styles.episodeImageContainer}>
                <Image source={{ uri: episode.image }} style={styles.episodeImage} />
                <View style={styles.videoIndicator}>
                  <Video size={14} color="#FFFFFF" />
                </View>
              </View>
              <View style={styles.episodeInfo}>
                <Text style={styles.episodeTitle}>{episode.title}</Text>
                <Text style={styles.episodePodcast}>{episode.podcast}</Text>
                <View style={styles.episodeStats}>
                  <View style={styles.statItem}>
                    <Clock size={12} color={Colors.neutral[400]} />
                    <Text style={styles.statText}>{episode.duration}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Users size={12} color={Colors.neutral[400]} />
                    <Text style={styles.statText}>{episode.views} views</Text>
                  </View>
                  <Text style={styles.publishedAt}>{episode.publishedAt}</Text>
                </View>
              </View>
              <View style={styles.episodeActions}>
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
                    handleSharePress(episode);
                    triggerHapticFeedback();
                  }}
                >
                  <Share2 size={16} color={Colors.neutral[400]} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
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
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.neutral[400],
    marginBottom: 8,
  },
  brandContainer: {
    marginBottom: 8,
  },
  brandGradient: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.neutral[300],
    textAlign: 'center',
    marginBottom: 16,
  },
  headerStats: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.neutral[400],
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  liveTitleGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  liveCard: {
    width: 180,
    marginRight: 16,
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  liveImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  liveOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  liveText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  viewerCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  viewerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#FFFFFF',
  },
  liveInfo: {
    padding: 12,
  },
  liveTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  liveHost: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[400],
    marginBottom: 4,
  },
  liveTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: Colors.neutral[500],
  },
  podcastCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  imageContainer: {
    position: 'relative',
  },
  podcastImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  videoIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    padding: 4,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#FFFFFF',
  },
  actionOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'column',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  podcastInfo: {
    padding: 16,
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
    marginBottom: 12,
  },
  podcastStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: (width - 56) / 2,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  categoryText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 8,
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
  episodeImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  episodeImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
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
    justifyContent: 'space-between',
  },
  publishedAt: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
  },
  episodeActions: {
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
});