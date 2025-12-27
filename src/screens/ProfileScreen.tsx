import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import AppText from '../components/AppText';
import Footer from '../components/Footer';

type ScreenName = "login" | "signup" | "search" | "booking" | "history" | "success" | "profile";

const FOOTER_HEIGHT = Dimensions.get('window').height * 0.1;

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

interface ProfileScreenProps {
  user: { userID: string; name: string };
  onNavigate: (screen: ScreenName) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onNavigate }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailsVisible, setDetailsVisible] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://10.0.2.2:3000/profile/${user.userID}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch profile');
        }
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.userID]);

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT }}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.name}>Hi, {user.name.split(' ')[0]}</Text>
            <Text style={styles.level}>Genius Level 1</Text>
          </View>
        </View>

        <Text style={styles.manageTitle}>Manage account</Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={() => setDetailsVisible(!detailsVisible)}>
            <Text>Personal details</Text>
            <Text>{detailsVisible ? '\u25B2' : '\u25BC'}</Text>
          </TouchableOpacity>

          {detailsVisible && (
            <View style={styles.details}>
              {loading ? (
                <ActivityIndicator />
              ) : error ? (
                <Text style={{ color: 'red' }}>{error}</Text>
              ) : profile ? (
                <>
                  <Text>Name: {profile.name}</Text>
                  <Text>Email: {profile.email}</Text>
                  <Text>Phone: {profile.phone}</Text>
                </>
              ) : <Text>No details found</Text>}
            </View>
          )}

          <View style={styles.separator} />

          <TouchableOpacity style={styles.row}>
            <Text>Security settings</Text>
            <Text>\u25B6</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.row}>
            <Text>Other travelers</Text>
            <Text>\u25B6</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={() => onNavigate('login')}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Footer onNavigate={onNavigate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#003580',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0c259',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  level: {
    color: '#f0c259',
  },
  manageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  details: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  signOutButton: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  signOutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: FOOTER_HEIGHT,
  },
});

export default ProfileScreen;
