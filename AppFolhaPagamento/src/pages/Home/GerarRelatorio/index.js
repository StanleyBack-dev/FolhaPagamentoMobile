import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";

const GerarRelatorio = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [relatorio, setRelatorio] = useState('');

  const getFuncionarios = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/funcionarios');
      const data = await response.json();
      setFuncionarios(data);
    } catch (error) {
      console.error('Erro ao buscar os funcionários:', error);
    }
  };

  const gerarRelatorio = async () => {
    if (!selectedFuncionario) {
      return;
    }

    try {
      const response = await fetch(`http://10.0.2.2:3000/funcionarios/`);

      const dataNascimento = new Date(selectedFuncionario.data_nascimento).toLocaleDateString('pt-BR');

      const relatorioFormatado = `
        Nome: ${selectedFuncionario.nome}
        CPF: ${selectedFuncionario.cpf}
        Telefone: ${selectedFuncionario.telefone}
        Email: ${selectedFuncionario.email}
        Sexo: ${selectedFuncionario.sexo}
        Data Nascimento: ${dataNascimento}
        Salário: R$${selectedFuncionario.salario}
      `;
      setRelatorio(relatorioFormatado);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getFuncionarios();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gerar Relatório</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedFuncionario}
          onValueChange={(itemValue) => setSelectedFuncionario(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um funcionário" value={null} />
          {funcionarios.map((funcionario) => (
            <Picker.Item
              key={funcionario.id}
              label={`${funcionario.nome} - ${funcionario.cpf}`}
              value={funcionario}
            />
          ))}
        </Picker>
      </View>

      <Button title="Gerar Relatório" onPress={gerarRelatorio} />

      {relatorio !== '' && (
        <View style={styles.relatorioContainer}>
          <Text style={styles.relatorioText}>{relatorio}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  relatorioContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  relatorioText: {
    fontSize: 16,
  },
});

export default GerarRelatorio;