import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";

export default function Home() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [data_admissao, setData_admissao] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rg, setRg] = useState("");
  const [data_nascimento, setData_nascimento] = useState("");
  const [estado_civil, setEstado_civil] = useState("");
  const [PIS, setPIS] = useState("");
  const [numero_carteira_trabalho, setNumero_carteia_trabalho] = useState("");
  const [sexo, setSexo] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [bairro, setBairro] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [pais, setPais] = useState("");
  const [cidade, setCidade] = useState("");
  const [cargo, setCargo] = useState("");

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = () => {
    fetch("http://10.0.2.2:3000/funcionarios")
      .then((response) => response.json())
      .then((data) => setFuncionarios(data))
      .catch((error) => console.error(error));
  };

  const createFuncionario = () => {
    fetch("http://10.0.2.2:3000/funcionarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: nome, cargo: cargo }),
    })
      .then(() => fetchFuncionarios())
      .catch((error) => console.error(error));
  };

  const updateFuncionario = () => {
    fetch(`http://10.0.2.2:3000/funcionarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: nome, cargo: cargo }),
    })
      .then(() => fetchFuncionarios())
      .catch((error) => console.error(error));
  };

  const deleteFuncionario = (id) => {
    fetch(`http://10.0.2.2:3000/funcionarios/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchFuncionarios())
      .catch((error) => console.error(error));
  };

  return (
    <ScrollView style={styles.container}>
      <Animatable.Text animation="bounceInDown" style={styles.title}>
        Cadastre ou Atualize Funcionários
      </Animatable.Text>

      <TextInput
        placeholder="Código Funcionário"
        style={styles.input}
        value={codigo}
        onChangeText={setCodigo}
      />

      <TextInput
        placeholder="Nome Funcionário"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="CPF"
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
      />

      <TextInput
        placeholder="RG"
        style={styles.input}
        value={rg}
        onChangeText={setRg}
      />

      <TextInput
        placeholder="Telefone"
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
      />

      <TextInput
        placeholder="Data Nascimento"
        style={styles.input}
        value={data_nascimento}
        onChangeText={setData_nascimento}
      />

      <TextInput
        placeholder="Estado Civil"
        style={styles.input}
        value={estado_civil}
        onChangeText={setEstado_civil}
      />

      <TextInput
        placeholder="Data Admissão"
        style={styles.input}
        value={data_admissao}
        onChangeText={setData_admissao}
      />

      <TextInput
        placeholder="PIS"
        style={styles.input}
        value={PIS}
        onChangeText={setPIS}
      />

      <TextInput
        placeholder="Número Carteira de Trabalho"
        style={styles.input}
        value={numero_carteira_trabalho}
        onChangeText={setNumero_carteia_trabalho}
      />

      <TextInput
        placeholder="Sexo"
        style={styles.input}
        value={sexo}
        onChangeText={setSexo}
      />

      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Agência"
        style={styles.input}
        value={agencia}
        onChangeText={setAgencia}
      />

      <TextInput
        placeholder="Conta"
        style={styles.input}
        value={conta}
        onChangeText={setConta}
      />

      <TextInput
        placeholder="Bairro"
        style={styles.input}
        value={bairro}
        onChangeText={setBairro}
      />

      <TextInput
        placeholder="UF"
        style={styles.input}
        value={uf}
        onChangeText={setUf}
      />

      <TextInput
        placeholder="Pais"
        style={styles.input}
        value={pais}
        onChangeText={setPais}
      />

      <TextInput
        placeholder="Cidade"
        style={styles.input}
        value={cidade}
        onChangeText={setCidade}
      />

      <TextInput
        placeholder="CEP"
        style={styles.input}
        value={cep}
        onChangeText={setCep}
      />

      <TextInput
        placeholder="Cargo"
        style={styles.input}
        value={cargo}
        onChangeText={setCargo}
      />

      <TouchableOpacity style={styles.button} onPress={createFuncionario}>
        <Text style={styles.buttonText}>Criar Funcionário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={updateFuncionario}>
        <Text style={styles.buttonText}>Atualizar Funcionário</Text>
      </TouchableOpacity>

      <FlatList
        data={funcionarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>
              {item.nome} ({item.cargo})
            </Text>
            <TouchableOpacity onPress={() => deleteFuncionario(item.id)}>
              <Text>Deletar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    padding: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFF",
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  listItem: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
