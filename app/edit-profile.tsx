import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Camera, Save, User, Mail, Phone, MapPin, Calendar, Globe } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';

export default function EditProfileScreen() {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate podcaster sharing insights on entrepreneurship, technology, and personal growth. Host of "Rise & Speak Weekly" 🎙️',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://riseandspeak.com',
    birthDate: '1990-01-01',
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.back();
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeAvatar = () => {
    console.log('Change avatar pressed');
    // Handle avatar change
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
            <Text style={styles.headerTitle}>Edit Profile</Text>
          </LinearGradient>

          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: Colors.primary[500] }]}
            onPress={() => {
              handleSave();
              triggerHapticFeedback();
            }}
            disabled={isLoading}
          >
            <Save size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user?.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200&h=200' }}
              style={styles.avatar}
            />
            <TouchableOpacity 
              style={[styles.cameraButton, { backgroundColor: Colors.primary[500] }]}
              onPress={() => {
                handleChangeAvatar();
                triggerHapticFeedback();
              }}
            >
              <Camera size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.avatarHint}>Tap to change your profile photo</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={[styles.inputContainer, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
              <User size={20} color={Colors.neutral[400]} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your full name"
                placeholderTextColor={Colors.neutral[500]}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={[styles.inputContainer, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
              <Mail size={20} color={Colors.neutral[400]} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                placeholderTextColor={Colors.neutral[500]}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Bio</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Tell us about yourself..."
                placeholderTextColor={Colors.neutral[500]}
                value={formData.bio}
                onChangeText={(text) => setFormData({ ...formData, bio: text })}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={[styles.inputContainer, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
              <Phone size={20} color={Colors.neutral[400]} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your phone number"
                placeholderTextColor={Colors.neutral[500]}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Location</Text>
            <View style={[styles.inputContainer, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
              <MapPin size={20} color={Colors.neutral[400]} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your location"
                placeholderTextColor={Colors.neutral[500]}
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Website</Text>
            <View style={[styles.inputContainer, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
              <Globe size={20} color={Colors.neutral[400]} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your website URL"
                placeholderTextColor={Colors.neutral[500]}
                value={formData.website}
                onChangeText={(text) => setFormData({ ...formData, website: text })}
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Birth Date</Text>
            <View style={[styles.inputContainer, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
              <Calendar size={20} color={Colors.neutral[400]} />
              <TextInput
                style={styles.textInput}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={Colors.neutral[500]}
                value={formData.birthDate}
                onChangeText={(text) => setFormData({ ...formData, birthDate: text })}
              />
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity 
            style={styles.saveButtonLarge}
            onPress={() => {
              handleSave();
              triggerHapticFeedback();
            }}
            disabled={isLoading}
          >
            <LinearGradient
              colors={Colors.gradients.primary}
              style={styles.saveButtonGradient}
            >
              <Save size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <View style={styles.accountSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={[styles.accountCard, { backgroundColor: Colors.dark.card, borderColor: Colors.dark.border }]}>
            <Text style={styles.accountInfo}>
              Account created: {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
            </Text>
            <Text style={styles.accountInfo}>
              Subscription: {user?.subscription || 'Free'}
            </Text>
            <Text style={styles.accountInfo}>
              Verification status: {user?.isVerified ? 'Verified' : 'Pending'}
            </Text>
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
    justifyContent: 'space-between',
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
    flex: 1,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  saveButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.primary[500],
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.dark.background,
  },
  avatarHint: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
  },
  formSection: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    gap: 12,
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonSection: {
    marginBottom: 30,
  },
  saveButtonLarge: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  accountSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  accountCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  accountInfo: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.neutral[400],
    marginBottom: 8,
  },
});