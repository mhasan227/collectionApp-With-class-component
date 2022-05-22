import * as React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../config/colors';

export default () => {
  return (
    <View style={styles.contactUsSection}>
      <Text style={styles.contactUsSectionTitle}>Contact Us</Text>
      <View style={styles.contactUsItemWrapper}>
        <TouchableOpacity style={styles.contactUsItem}>
          <Image
            style={styles.contactUsItemImage}
            source={require('../../assets/headphones.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactUsItem}>
          <Image
            style={styles.contactUsItemImage}
            source={require('../../assets/headphones.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactUsItem}>
          <Image
            style={styles.contactUsItemImage}
            source={require('../../assets/headphones.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactUsSection: {
    marginTop: 100,
  },
  contactUsItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactUsSectionTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  contactUsItem: {
    marginLeft: 8,
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactUsItemImage: {
    width: 18,
    height: 18,
  },
});
