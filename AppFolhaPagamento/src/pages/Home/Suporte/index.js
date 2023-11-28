import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Support({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Menu', 
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>Entre em contato conosco:</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>Telefone: 3556 4892</Text>
          <Text style={styles.contactText}>WhatsApp: (62) 99552-2665</Text>
          <Text style={styles.contactText}>Email: suportepaysolutions@gmail.com</Text>
        </View>
      </View>
      <View style={styles.socialMediaContainer}>
        <Text style={styles.socialMediaTitle}>Redes Sociais:</Text>
        <View style={styles.socialMediaIcons}>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome5 name="instagram" size={30} color="#405DE6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome5 name="twitter" size={30} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome5 name="linkedin" size={30} color="#0A66C2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome5 name="facebook" size={30} color="#1877F2" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <FontAwesome5 name="certificate" size={24} color="#000" />
        <Text style={styles.footerText}>Paysolutions - Todos os direitos reservados</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  contactContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center'
  },
  contactTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactInfo: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  contactText: {
    fontSize: 18,
    marginBottom: 5,
  },
  socialMediaContainer: {
    marginBottom: 20,
  },
  socialMediaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 100,
  },
  socialMediaIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    marginLeft: 5,
    fontSize: 12,
  },
});
