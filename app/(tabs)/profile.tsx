import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, CreditCard as Edit3, Mic, Headphones, Calendar, Award, Share2, Bell, TrendingUp, Users } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const userStats = [
  { label: 'Episodes Listened', value: '247', icon: Headphones, color: Colors.primary[500] },
  { label: 'Hours Listened', value: '156', icon: Calendar, color: Colors.accent.emerald },
  { label: 'Podcasts Created', value: '12', icon: Mic, color: Colors.accent.orange },
  { label: 'Achievements', value: '8', icon: Award, color: Colors.accent.amber },
];

const achievements = [
  {
    id: 1,
    title: 'First Episode',
    description: 'Created your first podcast episode',
    icon: '🎙️',
    unlocked: true,
  },
  {
    id: 2,
    title: 'Rising Star',
    description: 'Reached 1,000 episode listens',
    icon: '⭐',
    unlocked: true,
  },
  {
    id: 3,
    title: 'Content Creator',
    description: 'Published 10 episodes',
    icon: '🎬',
    unlocked: true,
  },
  {
    id: 4,
    title: 'Podcast Master',
    description: 'Reached 50 episodes published',
    icon: '👑',
    unlocked: false,
  },
];

const menuItems = [
  { title: 'Create New Episode', icon: Mic, color: Colors.primary[500] },
  { title: 'Analytics Dashboard', icon: TrendingUp, color: Colors.accent.emerald },
  { title: 'Notifications', icon: Bell, color: Colors.accent.amber },
  { title: 'Settings', icon: Settings, color: Colors.neutral[500] },
];

export default function ProfileScreen() {
  const handleEditProfile = () => {
    console.log('Edit profile pressed');
    // Navigate to edit profile
  };

  const handleShareProfile = () => {
    console.log('Share profile pressed');
    // Handle share functionality
  };

  const handleMenuItemPress = (item: any) => {
    console.log('Menu item pressed:', item.title);
    // Navigate to respective screen
  };

  const handleAchievementPress = (achievement: any) => {
    console.log('Achievement pressed:', achievement.title);
    // Show achievement details
  };

  const triggerHapticFeedback = () => {
    if (Platform.OS === 'web') {
      console.log('Button pressed');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={Colors.gradients.dark}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200&h=200' }}
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
          </View>
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={[styles.userHandle, { color: Colors.primary[400] }]}>@alexjohnson</Text>
          <Text style={styles.userBio}>
            Passionate podcaster sharing insights on entrepreneurship, technology, and personal growth. 
            Host of "Rise & Speak Weekly" 🎙️
          </Text>
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
                <Text style={styles.activityTitle}>Published new episode</Text>
                <Text style={styles.activityDescription}>
                  "Building Your Personal Brand in 2024" - Episode 47
                </Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.activityItem, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}
              onPress={() => {
                console.log('Activity item pressed');
                triggerHapticFeedback();
              }}
            >
              <View style={[styles.activityIcon, { backgroundColor: Colors.accent.emerald + '20' }]}>
                <Award size={20} color={Colors.accent.emerald} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Achievement unlocked</Text>
                <Text style={styles.activityDescription}>
                  Content Creator - Published 10 episodes
                </Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.activityItem, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}
              onPress={() => {
                console.log('Activity item pressed');
                triggerHapticFeedback();
              }}
            >
              <View style={[styles.activityIcon, { backgroundColor: Colors.accent.amber + '20' }]}>
                <Headphones size={20} color={Colors.accent.amber} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Listened to episode</Text>
                <Text style={styles.activityDescription}>
                  "The Power of Vulnerability in Leadership"
                </Text>
                <Text style={styles.activityTime}>2 days ago</Text>
              </View>
            </TouchableOpacity>
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
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
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
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userHandle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 12,
  },
  userBio: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[300],
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
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