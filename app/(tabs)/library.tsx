import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { Heart, Download, Clock, Play, TrendingUp, BookOpen } from 'lucide-react-native';

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

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState('favorites');

  const renderContent = () => {
    switch (activeTab) {
      case 'favorites':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Your Favorite Podcasts</Text>
            {favoritePodcasts.map((podcast) => (
              <TouchableOpacity key={podcast.id} style={styles.podcastCard}>
                <Image source={{ uri: podcast.image }} style={styles.podcastImage} />
                <View style={styles.podcastInfo}>
                  <Text style={styles.podcastTitle}>{podcast.title}</Text>
                  <Text style={styles.podcastHost}>by {podcast.host}</Text>
                  <View style={styles.podcastStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.category}>{podcast.category}</Text>
                      <Text style={styles.episodes}>{podcast.episodes} episodes</Text>
                    </View>
                    <Text style={styles.lastEpisode}>{podcast.lastEpisode}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.playButton}>
                  <Play size={20} color="#6366F1" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'downloads':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Downloaded Episodes</Text>
            <View style={styles.downloadStats}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Episodes</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>78.1 MB</Text>
                <Text style={styles.statLabel}>Storage Used</Text>
              </View>
            </View>
            {downloadedEpisodes.map((episode) => (
              <TouchableOpacity key={episode.id} style={styles.episodeCard}>
                <Image source={{ uri: episode.image }} style={styles.episodeImage} />
                <View style={styles.episodeInfo}>
                  <Text style={styles.episodeTitle}>{episode.title}</Text>
                  <Text style={styles.episodePodcast}>{episode.podcast}</Text>
                  <View style={styles.episodeStats}>
                    <Text style={styles.duration}>{episode.duration}</Text>
                    <Text style={styles.fileSize}>{episode.size}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.playButton}>
                  <Play size={20} color="#6366F1" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'history':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Listening History</Text>
            {listeningHistory.map((episode) => (
              <TouchableOpacity key={episode.id} style={styles.episodeCard}>
                <Image source={{ uri: episode.image }} style={styles.episodeImage} />
                <View style={styles.episodeInfo}>
                  <Text style={styles.episodeTitle}>{episode.title}</Text>
                  <Text style={styles.episodePodcast}>{episode.podcast}</Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progress, { width: `${episode.progress * 100}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{Math.round(episode.progress * 100)}%</Text>
                  </View>
                  <Text style={styles.listenedAt}>{episode.listenedAt}</Text>
                </View>
                <TouchableOpacity style={styles.playButton}>
                  <Play size={20} color="#6366F1" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'subscriptions':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Your Subscriptions</Text>
            <View style={styles.subscriptionStats}>
              <View style={styles.statCard}>
                <TrendingUp size={24} color="#6366F1" />
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Active Subscriptions</Text>
              </View>
            </View>
            {favoritePodcasts.map((podcast) => (
              <TouchableOpacity key={podcast.id} style={styles.subscriptionCard}>
                <Image source={{ uri: podcast.image }} style={styles.subscriptionImage} />
                <View style={styles.subscriptionInfo}>
                  <Text style={styles.subscriptionTitle}>{podcast.title}</Text>
                  <Text style={styles.subscriptionHost}>by {podcast.host}</Text>
                  <Text style={styles.subscriptionCategory}>{podcast.category}</Text>
                </View>
                <View style={styles.subscriptionBadge}>
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
        <Text style={styles.title}>Your Library</Text>
      </View>

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} color={activeTab === tab.id ? '#6366F1' : '#9CA3AF'} />
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
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
    backgroundColor: '#111827',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#FFFFFF',
  },
  tabContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#1F2937',
  },
  activeTab: {
    backgroundColor: '#1E1B4B',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#6366F1',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  podcastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
    color: '#9CA3AF',
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
    color: '#6366F1',
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  episodes: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  lastEpisode: {
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
  downloadStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
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
    color: '#9CA3AF',
  },
  episodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
    color: '#9CA3AF',
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
    color: '#9CA3AF',
  },
  fileSize: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    marginRight: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6366F1',
    width: 35,
  },
  listenedAt: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  subscriptionStats: {
    marginBottom: 24,
  },
  subscriptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
    color: '#9CA3AF',
    marginBottom: 4,
  },
  subscriptionCategory: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6366F1',
  },
  subscriptionBadge: {
    backgroundColor: '#10B981',
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