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
      <Animatable.Text animation="bounceIn" style={styles.welcomeText}>Bem Vindo(a) {username}</Animatable.Text>
      <View style={styles.container}> 
        <View style={styles.containerLogo}>
          <Animatable.Image
            animation="flipInY"
            source={require('../../../assets/Logo.png')}
            style={styles.logo}
            resizeMode='contain'
          />
        </View>
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
    backgroundColor: '#f9f9f9'
  },
  containerLogo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 210, 
    height: 210, 
    borderRadius: 25, 
    borderWidth: 2,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 4,
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