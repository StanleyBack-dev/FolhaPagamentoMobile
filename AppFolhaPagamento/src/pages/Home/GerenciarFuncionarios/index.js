import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const FuncionariosView = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Menu', 
    });
  }, [navigation]);

  const [funcionarios, setFuncionarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("adicionar");
  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    sexo: "",
    data_nascimento: "",
    salario: "",
  });

  const getFuncionarios = async () => {
    try {
      const response = await fetch("http://10.0.0.2:3000/funcionarios");
      const data = await response.json();
      setFuncionarios(data);
    } catch (error) {
      console.error("Erro ao buscar os funcionários:", error);
    }
  };
  const adicionarFuncionario = async () => {
    try {
      const response = await fetch(
        "http://10.0.0.2:3000/adicionarFuncionario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novoFuncionario),
        }
      );
      const data = await response.json();
      console.log("Novo funcionário adicionado:", data);
      setModalVisible(false);
      getFuncionarios();
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
    }
  };

  const deletarFuncionario = async (cpf) => {
    try {
      const response = await fetch(`http://10.0.0.2:3000/funcionarios/${cpf}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Funcionário deletado com sucesso");
        getFuncionarios();
      } else {
        console.error("Erro ao deletar funcionário");
      }
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
    }
  };

  const editarFuncionario = async (cpf, novosDados) => {
    try {
      const response = await fetch(`http://10.0.0.2:3000/funcionarios/${cpf}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novosDados), // Enviar os novos dados para atualização
      });
      if (response.ok) {
        console.log("Funcionário atualizado com sucesso");
        setModalVisible(false);
        getFuncionarios();
      } else {
        console.error("Erro ao editar funcionário");
      }
    } catch (error) {
      console.error("Erro ao editar funcionário:", error);
    }
  };

  useEffect(() => {
    getFuncionarios();
  }, []);

  const filteredFuncionarios = Array.isArray(funcionarios)
    ? funcionarios.filter((funcionario) =>
        funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const openEditarModal = (funcionario) => {
    setNovoFuncionario(funcionario);
    setModalVisible(true);
    setModoFormulario("editar");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por nome"
        onChangeText={(text) => setSearchTerm(text)}
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Lista de Funcionários:</Text>
        {filteredFuncionarios.length > 0 ? (
          filteredFuncionarios.map((funcionario, index) => (
            <View key={index} style={styles.funcionarioContainer}>
              <Text style={styles.text}>Nome: {funcionario.nome}</Text>
              <Text style={styles.text}>CPF: {funcionario.cpf}</Text>
              <Text style={styles.text}>Telefone: {funcionario.telefone}</Text>
              <Text style={styles.text}>Email: {funcionario.email}</Text>
              <Text style={styles.text}>Sexo: {funcionario.sexo}</Text>
              <Text style={styles.text}>
                Data Nascimento:{" "}
                {new Date(funcionario.data_nascimento).toLocaleDateString(
                  "pt-BR"
                )}
              </Text>
              <Text style={styles.text}>Salário: R${funcionario.salario}</Text>
              <TouchableOpacity onPress={() => openEditarModal(funcionario)}>
                <FontAwesome5 name="edit" size={20} color="#4287f5" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deletarFuncionario(funcionario.cpf)}
              >
                <FontAwesome5 name="trash-alt" size={20} color="#f54242" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>Nenhum funcionário encontrado</Text>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true);
          setModoFormulario("adicionar");
        }}
      >
        <Text style={styles.addButtonText}>Adicionar Novo Funcionário</Text>
      </TouchableOpacity>

      {/* Modal para adicionar/editar funcionário */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.title}>
              {modoFormulario === "adicionar"
                ? "Adicionar Novo Funcionário:"
                : "Editar Funcionário:"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              onChangeText={(text) =>
                setNovoFuncionario({ ...novoFuncionario, nome: text })
              }
            />
            {modoFormulario === "adicionar" && (
              <TextInput
                style={styles.input}
                placeholder="CPF"
                onChangeText={(text) =>
                  setNovoFuncionario({ ...novoFuncionario, cpf: text })
                }
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              onChangeText={(text) =>
                setNovoFuncionario({ ...novoFuncionario, telefone: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              onChangeText={(text) =>
                setNovoFuncionario({ ...novoFuncionario, email: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Sexo: (M) ou (F)"
              onChangeText={(text) =>
                setNovoFuncionario({ ...novoFuncionario, sexo: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Data Nascimento"
              onChangeText={(text) =>
                setNovoFuncionario({
                  ...novoFuncionario,
                  data_nascimento: text,
                })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Salário"
              onChangeText={(text) =>
                setNovoFuncionario({ ...novoFuncionario, salario: text })
              }
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                modoFormulario === "adicionar"
                  ? adicionarFuncionario()
                  : editarFuncionario(novoFuncionario.cpf, novoFuncionario)
              }
            >
              <Text style={styles.buttonText}>
                {modoFormulario === "adicionar"
                  ? "Adicionar Funcionário"
                  : "Editar Funcionário"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  funcionarioContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  addButton: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#4287f5",
    borderRadius: 5,
    margin: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#4287f5",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default FuncionariosView;
