import React from 'react';
import { View, Button, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Home({ navigation, route }) {
  const username = route.params.username;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Sair', 
    });
  }, [navigation]);
  
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Animatable.Image
        source={require('../../../assets/Logo.png')}
        style={styles.logo}
        resizeMode='contain'
        animation='bounceIn'
        duration={1000}
      />
      <Animatable.Text animation="bounceIn" style={styles.welcomeText}>Bem Vindo(a) {username}</Animatable.Text>
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FuncionariosView')}>
          <Text style={styles.buttonText}>Gerenciar Funcionários</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GerarHolerite')}>
          <Text style={styles.buttonText}>Gerar Holerite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GerarContrato')}>
          <Text style={styles.buttonText}>Gerar Contrato</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GerarRelatorio')}>
          <Text style={styles.buttonText}>Gerar Relatório</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Suporte')}>
          <Text style={styles.buttonText}>Suporte</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    marginTop: 15,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  buttonContainer: {
    justifyContent: 'center',
    marginTop: 70,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius:14,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});