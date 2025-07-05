import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Clock, Star, Play, Video, Users, Calendar } from 'lucide-react-native';

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
  { name: 'Business', color: '#6366F1', icon: TrendingUp },
  { name: 'Personal Growth', color: '#F97316', icon: Star },
  { name: 'Technology', color: '#10B981', icon: TrendingUp },
  { name: 'Health', color: '#EF4444', icon: Star },
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
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1F2937', '#111827']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.title}>Ready to Rise & Speak?</Text>
          <View style={styles.headerStats}>
            <View style={styles.statItem}>
              <Users size={16} color="#6366F1" />
              <Text style={styles.statText}>2.5M+ Viewers</Text>
            </View>
            <View style={styles.statItem}>
              <Video size={16} color="#10B981" />
              <Text style={styles.statText}>Live Shows Daily</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Live Shows */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔴 Live Now</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {liveShows.map((show) => (
              <TouchableOpacity key={show.id} style={styles.liveCard}>
                <Image source={{ uri: show.image }} style={styles.liveImage} />
                <View style={styles.liveOverlay}>
                  <View style={styles.liveIndicator}>
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
          <Text style={styles.sectionTitle}>Featured Video Podcasts</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredPodcasts.map((podcast) => (
              <TouchableOpacity key={podcast.id} style={styles.podcastCard}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: podcast.image }} style={styles.podcastImage} />
                  <View style={styles.videoIndicator}>
                    <Video size={16} color="#FFFFFF" />
                  </View>
                  {podcast.isLive && (
                    <View style={styles.liveIndicator}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>
                  )}
                  <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{podcast.duration}</Text>
                  </View>
                </View>
                <View style={styles.podcastInfo}>
                  <Text style={styles.podcastTitle}>{podcast.title}</Text>
                  <Text style={styles.podcastHost}>by {podcast.host}</Text>
                  <View style={styles.podcastStats}>
                    <View style={styles.statItem}>
                      <Star size={12} color="#F59E0B" />
                      <Text style={styles.statText}>{podcast.rating}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <TrendingUp size={12} color="#6B7280" />
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
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
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
          <Text style={styles.sectionTitle}>Recent Video Episodes</Text>
          {recentEpisodes.map((episode) => (
            <TouchableOpacity key={episode.id} style={styles.episodeCard}>
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
                    <Clock size={12} color="#6B7280" />
                    <Text style={styles.statText}>{episode.duration}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Users size={12} color="#6B7280" />
                    <Text style={styles.statText}>{episode.views} views</Text>
                  </View>
                  <Text style={styles.publishedAt}>{episode.publishedAt}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.playButton}>
                <Play size={20} color="#6366F1" />
              </TouchableOpacity>
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
    backgroundColor: '#111827',
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
    color: '#9CA3AF',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#FFFFFF',
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
    color: '#9CA3AF',
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
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6366F1',
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  liveCard: {
    width: 180,
    marginRight: 16,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    overflow: 'hidden',
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
    backgroundColor: '#EF4444',
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
    color: '#9CA3AF',
    marginBottom: 4,
  },
  liveTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#6B7280',
  },
  podcastCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    overflow: 'hidden',
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
    color: '#9CA3AF',
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
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
    color: '#9CA3AF',
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
    color: '#6B7280',
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1F2937',
    borderWidth: 2,
    borderColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});