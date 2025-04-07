import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';

const ProfileCard = () => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>ANNA WILSON</Text>
          <Text style={styles.role}>DEVELOPER</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detail}>📞 +123-458-784</Text>
          <Text style={styles.detail}>📧 smkys@gmail.com</Text>
          <Text style={styles.detail}>🌐 smkydevelopr.com</Text>
          <Text style={styles.detail}>📍 456 Anytown, Near Anywhere, ST 47523</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    margin: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#58b0e0',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#434955',
  },
  role: {
    fontSize: 16,
    fontWeight: '500',
    color: '#434955',
  },
  detailsContainer: {
    marginTop: 10,
    width: '100%',
  },
  detail: {
    fontSize: 14,
    color: '#434955',
    marginBottom: 5,
  },
});

export default ProfileCard;
