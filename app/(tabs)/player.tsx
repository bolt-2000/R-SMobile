import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Heart, 
  Share2, 
  Volume2, 
  Repeat, 
  Shuffle,
  Maximize,
  Video,
  Users,
  MessageCircle,
  Settings
} from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const currentEpisode = {
  id: 1,
  title: 'Building Your Personal Brand in 2024',
  podcast: 'The Rise Morning Show',
  host: 'Sarah Johnson',
  image: 'https://images.pexels.com/photos/7191991/pexels-photo-7191991.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
  videoUrl: 'https://images.pexels.com/photos/7191991/pexels-photo-7191991.jpeg?auto=compress&cs=tinysrgb&w=800&h=450',
  duration: '45:30',
  currentTime: '12:45',
  progress: 0.28,
  isLiked: false,
  isLive: false,
  viewers: '2.3K',
  description: 'In this episode, we explore the essential strategies for building a powerful personal brand that resonates with your audience and drives meaningful connections.',
};

export default function PlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(currentEpisode.isLiked);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    scale.value = withSpring(isPlaying ? 0.95 : 1, { duration: 200 });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    scale.value = withSpring(1.1, { duration: 200 }, () => {
      scale.value = withSpring(1, { duration: 200 });
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1F2937', '#111827', '#000000']}
        style={styles.gradient}
      >
        {/* Video Player Section */}
        <View style={[styles.videoContainer, isFullscreen && styles.fullscreenVideo]}>
          <TouchableOpacity 
            style={styles.videoPlayer}
            onPress={() => setShowControls(!showControls)}
            activeOpacity={1}
          >
            <Image 
              source={{ uri: currentEpisode.videoUrl }} 
              style={styles.videoBackground}
              resizeMode="cover"
            />
            
            {/* Video Overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              style={styles.videoOverlay}
            />

            {/* Live Indicator */}
            {currentEpisode.isLive && (
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}

            {/* Viewer Count */}
            <View style={styles.viewerCount}>
              <Users size={14} color="#FFFFFF" />
              <Text style={styles.viewerText}>{currentEpisode.viewers} watching</Text>
            </View>

            {/* Video Controls */}
            {showControls && (
              <View style={styles.videoControls}>
                <TouchableOpacity style={styles.videoControlButton}>
                  <SkipBack size={24} color="#FFFFFF" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.videoPlayButton} onPress={handlePlayPause}>
                  <LinearGradient
                    colors={['#6366F1', '#8B5CF6']}
                    style={styles.videoPlayGradient}
                  >
                    {isPlaying ? (
                      <Pause size={28} color="#FFFFFF" />
                    ) : (
                      <Play size={28} color="#FFFFFF" />
                    )}
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.videoControlButton}>
                  <SkipForward size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}

            {/* Fullscreen Toggle */}
            <TouchableOpacity style={styles.fullscreenButton} onPress={toggleFullscreen}>
              <Maximize size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${currentEpisode.progress * 100}%` }]} />
              <View style={styles.progressThumb} />
            </View>
            <View style={styles.timeLabels}>
              <Text style={styles.timeText}>{currentEpisode.currentTime}</Text>
              <Text style={styles.timeText}>{currentEpisode.duration}</Text>
            </View>
          </View>
        </View>

        {/* Content Section */}
        {!isFullscreen && (
          <View style={styles.content}>
            {/* Episode Info */}
            <View style={styles.episodeInfo}>
              <View style={styles.episodeHeader}>
                <View style={styles.episodeDetails}>
                  <Text style={styles.episodeTitle}>{currentEpisode.title}</Text>
                  <Text style={styles.podcastName}>{currentEpisode.podcast}</Text>
                  <Text style={styles.hostName}>by {currentEpisode.host}</Text>
                </View>
                <TouchableOpacity style={styles.shareButton}>
                  <Share2 size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
                  <Heart
                    size={20}
                    color={isLiked ? '#EF4444' : '#9CA3AF'}
                    fill={isLiked ? '#EF4444' : 'none'}
                  />
                  <Text style={[styles.actionText, isLiked && styles.likedText]}>
                    {isLiked ? 'Liked' : 'Like'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <MessageCircle size={20} color="#9CA3AF" />
                  <Text style={styles.actionText}>Comment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Share2 size={20} color="#9CA3AF" />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Settings size={20} color="#9CA3AF" />
                  <Text style={styles.actionText}>Quality</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Audio Controls */}
            <View style={styles.audioControls}>
              <TouchableOpacity
                style={[styles.controlButton, isShuffle && styles.activeControl]}
                onPress={() => setIsShuffle(!isShuffle)}
              >
                <Shuffle size={20} color={isShuffle ? '#6366F1' : '#9CA3AF'} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton}>
                <Volume2 size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, isRepeat && styles.activeControl]}
                onPress={() => setIsRepeat(!isRepeat)}
              >
                <Repeat size={20} color={isRepeat ? '#6366F1' : '#9CA3AF'} />
              </TouchableOpacity>
            </View>

            {/* Description */}
            <View style={styles.description}>
              <Text style={styles.descriptionTitle}>Episode Description</Text>
              <Text style={styles.descriptionText}>{currentEpisode.description}</Text>
            </View>

            {/* Comments Section */}
            <View style={styles.commentsSection}>
              <Text style={styles.commentsTitle}>Live Comments</Text>
              <View style={styles.commentsList}>
                <View style={styles.comment}>
                  <View style={styles.commentAvatar}>
                    <Text style={styles.commentAvatarText}>JD</Text>
                  </View>
                  <View style={styles.commentContent}>
                    <Text style={styles.commentAuthor}>John Doe</Text>
                    <Text style={styles.commentText}>Great insights on personal branding! 🔥</Text>
                  </View>
                </View>
                <View style={styles.comment}>
                  <View style={styles.commentAvatar}>
                    <Text style={styles.commentAvatarText}>SM</Text>
                  </View>
                  <View style={styles.commentContent}>
                    <Text style={styles.commentAuthor}>Sarah Miller</Text>
                    <Text style={styles.commentText}>This is exactly what I needed to hear today</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradient: {
    flex: 1,
  },
  videoContainer: {
    backgroundColor: '#000000',
  },
  fullscreenVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  videoPlayer: {
    width: '100%',
    height: 250,
    position: 'relative',
    backgroundColor: '#000000',
  },
  videoBackground: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  liveIndicator: {
    position: 'absolute',
    top: 16,
    left: 16,
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
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  viewerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  videoControls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  videoControlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  videoPlayGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1F2937',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    marginBottom: 8,
    position: 'relative',
  },
  progress: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    right: 0,
    top: -6,
    width: 16,
    height: 16,
    backgroundColor: '#6366F1',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  episodeInfo: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  episodeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  episodeDetails: {
    flex: 1,
  },
  episodeTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  podcastName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  hostName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#9CA3AF',
  },
  likedText: {
    color: '#EF4444',
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 32,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeControl: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  description: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  descriptionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  commentsSection: {
    paddingVertical: 20,
  },
  commentsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  commentsList: {
    gap: 12,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentAvatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  commentText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 18,
  },
});