import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';

const GerarContrato = () => {
  const navigation = useNavigation();
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Menu', 
    });
  }, [navigation]);
  
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [contractText, setContractText] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showTermsSuccess, setShowTermsSuccess] = useState(false); // Adicionado estado para mostrar sucesso dos termos

  useEffect(() => {
    fetch('http://10.0.2.2:3000/funcionarios')
      .then(response => response.json())
      .then(data => setFuncionarios(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const generateContract = () => {
    if (!selectedFuncionario) {
      return;
    }

    const currentDate = new Date().toLocaleDateString('pt-BR'); // Formato de data brasileiro

    const contract = `Termo de Consentimento para Uso de Dados - PaySolutions

    Ao utilizar os serviços da PaySolutions, o usuário concorda com a coleta, armazenamento e uso dos seus dados pessoais de acordo com os termos descritos a seguir.
    
    1. Coleta de Dados
    A PaySolutions pode coletar informações pessoais identificáveis, incluindo, mas não se limitando a: nome, endereço, e-mail, número de telefone e informações de pagamento. Esses dados são coletados para fornecer e melhorar nossos serviços, personalizar sua experiência e cumprir com obrigações legais.
    
    2. Uso dos Dados
    Os dados coletados podem ser utilizados para os seguintes propósitos:
       - Personalização de serviços oferecidos pela PaySolutions.
       - Processamento de transações e fornecimento de suporte ao cliente.
       - Comunicação de informações importantes sobre sua conta e atualizações de serviços.
       - Envio de comunicações de marketing, caso tenha sido expressamente autorizado pelo usuário.
    
    3. Compartilhamento de Dados
    A PaySolutions pode compartilhar informações pessoais com terceiros apenas quando necessário para prestação de serviços ou cumprimento de obrigações legais.
    
    4. Proteção de Dados
    Adotamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição não autorizada.
    
    5. Consentimento
    Ao utilizar nossos serviços, o usuário concorda com a coleta e uso de informações pessoais conforme descrito neste Termo de Consentimento.
    
    6. Direitos do Usuário
    O usuário tem o direito de acessar, corrigir ou apagar suas informações pessoais. Também pode revogar o consentimento para o uso dos dados a qualquer momento.
    
    Ao utilizar nossos serviços, o usuário confirma que leu e compreendeu este Termo de Consentimento para Uso de Dados e concorda com seus termos.
    
    Para mais informações sobre como tratamos os dados pessoais, entre em contato conosco através dos canais disponibilizados em nossa plataforma.
    
    Nome do Funcionário:   ${selectedFuncionario?.nome}
    CPF do Funcionário:      ${selectedFuncionario?.cpf}

    Data de vigência deste termo: ${currentDate}
    
    Atenciosamente,
    Equipe PaySolutions

   `;

   setContractText(contract);
};

const handleConfirmAcceptance = () => {
  setShowTermsSuccess(true); 
  generateContract(); 
};
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de Funcionários:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedFuncionario}
        onValueChange={(itemValue) => setSelectedFuncionario(itemValue)}
      >
        <Picker.Item label="Selecione um funcionário" value={null} />
        {funcionarios.map((funcionario) => (
          <Picker.Item
            key={funcionario.id}
            label={`Nome/CPF: ${funcionario.nome} - ${funcionario.cpf}`}
            value={funcionario}
          />
        ))}
      </Picker>

      <Button title="Gerar Contrato" onPress={generateContract} />

      <View style={styles.contractContainer}>
        {contractText && <Text style={styles.contractText}>{contractText}</Text>}
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmAcceptance}
      >
        <Text style={styles.confirmButtonText}>
          Confirmar Aceite dos Termos
        </Text>
      </TouchableOpacity>

      {/* Mensagem de Confirmação de Sucesso dos Termos */}
      {showTermsSuccess && (
        <View style={styles.popup}>
          <Text style={styles.popupText}>
            Termos aceitos com sucesso!
          </Text>
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
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 50,
  },
  picker: {
    height: 50,
    width: 100,
  },
  contractContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  contractText: {
    fontSize: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 4,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 4,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  popup: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  popupText: {
    fontSize: 18,
    marginBottom: 15,
  },
  popupButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  popupButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  popupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GerarContrato;
