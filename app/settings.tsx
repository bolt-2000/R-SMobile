import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform, Alert } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  Bell, 
  Shield, 
  Moon, 
  Volume2, 
  Download, 
  Wifi, 
  Smartphone, 
  Globe, 
  HelpCircle, 
  FileText, 
  Lock,
  User,
  Crown,
  Trash2
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';

interface SettingItem {
  title: string;
  description?: string;
  icon: any;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  color?: string;
  route?: string;
  destructive?: boolean;
}

export default function SettingsScreen() {
  const { user, signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [highQuality, setHighQuality] = useState(false);

  const handleDeleteAccount = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      );
      if (confirmed) {
        console.log('Account deletion requested');
        // Handle account deletion
      }
    } else {
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            style: 'destructive', 
            onPress: () => {
              console.log('Account deletion requested');
              // Handle account deletion
            }
          },
        ]
      );
    }
  };

  const settingSections = [
    {
      title: 'Account',
      items: [
        {
          title: 'Edit Profile',
          description: 'Update your personal information',
          icon: User,
          type: 'navigation',
          route: '/edit-profile',
          color: Colors.primary[500],
        },
        {
          title: 'Subscription',
          description: 'Manage your premium subscription',
          icon: Crown,
          type: 'navigation',
          route: '/subscription',
          color: Colors.accent.amber,
        },
        {
          title: 'Privacy Settings',
          description: 'Control your privacy preferences',
          icon: Lock,
          type: 'navigation',
          route: '/privacy',
          color: Colors.accent.emerald,
        },
      ] as SettingItem[],
    },
    {
      title: 'Notifications',
      items: [
        {
          title: 'Push Notifications',
          description: 'Receive notifications for new episodes',
          icon: Bell,
          type: 'toggle',
          value: notifications,
          onToggle: setNotifications,
          color: Colors.accent.orange,
        },
      ] as SettingItem[],
    },
    {
      title: 'Playback',
      items: [
        {
          title: 'Auto Download',
          description: 'Automatically download new episodes',
          icon: Download,
          type: 'toggle',
          value: autoDownload,
          onToggle: setAutoDownload,
          color: Colors.accent.emerald,
        },
        {
          title: 'WiFi Only Downloads',
          description: 'Only download when connected to WiFi',
          icon: Wifi,
          type: 'toggle',
          value: wifiOnly,
          onToggle: setWifiOnly,
          color: Colors.primary[500],
        },
        {
          title: 'High Quality Audio',
          description: 'Stream and download in high quality',
          icon: Volume2,
          type: 'toggle',
          value: highQuality,
          onToggle: setHighQuality,
          color: Colors.accent.pink,
        },
      ] as SettingItem[],
    },
    {
      title: 'Appearance',
      items: [
        {
          title: 'Dark Mode',
          description: 'Use dark theme throughout the app',
          icon: Moon,
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode,
          color: Colors.neutral[500],
        },
      ] as SettingItem[],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Help & Support',
          description: 'Get help and contact support',
          icon: HelpCircle,
          type: 'navigation',
          route: '/help',
          color: Colors.accent.emerald,
        },
        {
          title: 'Terms of Service',
          description: 'Read our terms and conditions',
          icon: FileText,
          type: 'navigation',
          route: '/terms',
          color: Colors.neutral[500],
        },
        {
          title: 'Privacy Policy',
          description: 'Learn about our privacy practices',
          icon: Shield,
          type: 'navigation',
          route: '/privacy',
          color: Colors.neutral[500],
        },
      ] as SettingItem[],
    },
    {
      title: 'Danger Zone',
      items: [
        {
          title: 'Delete Account',
          description: 'Permanently delete your account and data',
          icon: Trash2,
          type: 'action',
          onPress: handleDeleteAccount,
          color: Colors.accent.red,
          destructive: true,
        },
      ] as SettingItem[],
    },
  ];

  const handleItemPress = (item: SettingItem) => {
    if (item.type === 'navigation' && item.route) {
      router.push(item.route);
    } else if (item.type === 'action' && item.onPress) {
      item.onPress();
    }
  };

  const triggerHapticFeedback = () => {
    if (Platform.OS === 'web') {
      console.log('Button pressed');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.dark}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => {
              router.back();
              triggerHapticFeedback();
            }}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <LinearGradient
            colors={Colors.gradients.primary}
            style={styles.titleGradient}
          >
            <Text style={styles.headerTitle}>Settings</Text>
          </LinearGradient>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={[styles.sectionCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex < section.items.length - 1 && styles.settingItemBorder,
                    item.destructive && styles.destructiveItem
                  ]}
                  onPress={() => {
                    handleItemPress(item);
                    triggerHapticFeedback();
                  }}
                  disabled={item.type === 'toggle'}
                >
                  <View style={styles.settingItemLeft}>
                    <View style={[styles.settingIcon, { backgroundColor: item.color + '20' }]}>
                      <item.icon size={20} color={item.color} />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={[
                        styles.settingTitle,
                        item.destructive && styles.destructiveText
                      ]}>
                        {item.title}
                      </Text>
                      {item.description && (
                        <Text style={styles.settingDescription}>{item.description}</Text>
                      )}
                    </View>
                  </View>
                  
                  {item.type === 'toggle' && (
                    <Switch
                      value={item.value}
                      onValueChange={(value) => {
                        item.onToggle?.(value);
                        triggerHapticFeedback();
                      }}
                      trackColor={{ 
                        false: Colors.neutral[700], 
                        true: item.color + '40' 
                      }}
                      thumbColor={item.value ? item.color : Colors.neutral[400]}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.section}>
          <View style={[styles.appInfo, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
            <Text style={styles.appInfoTitle}>RISE & SPEAK</Text>
            <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
            <Text style={styles.appInfoCopyright}>© 2024 RISE & SPEAK. All rights reserved.</Text>
          </View>
        </View>
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
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.neutral[300],
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  destructiveItem: {
    backgroundColor: Colors.accent.red + '05',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  destructiveText: {
    color: Colors.accent.red,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
    lineHeight: 18,
  },
  appInfo: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  appInfoTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 1,
  },
  appInfoVersion: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
    marginBottom: 8,
  },
  appInfoCopyright: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
});