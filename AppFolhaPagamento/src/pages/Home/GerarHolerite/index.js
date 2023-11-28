import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal as RNModal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const GerarHolerite = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Menu",
    });
  }, [navigation]);

  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [horasExtras, setHorasExtras] = useState(0);
  const [resultadoHolerite, setResultadoHolerite] = useState(null);
  const [valorHora, setValorHora] = useState("");
  const [mesesTrabalhados, setMesesTrabalhados] = useState(12);
  const [
    calcularComDecimoTerceiroEFerias,
    setCalcularComDecimoTerceiroEFerias,
  ] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMesesTrabalhadosVisible, setModalMesesTrabalhadosVisible] =
    useState(false);

  const getFuncionarios = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/funcionarios");
      const data = await response.json();
      setFuncionarios(data);
    } catch (error) {
      console.error("Erro ao buscar os funcionários:", error);
    }
  };

  useEffect(() => {
    getFuncionarios();
  }, []);

  const abrirModal = () => {
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
  };

  const abrirModalMesesTrabalhados = () => {
    if (calcularComDecimoTerceiroEFerias && selectedFuncionario) {
      setModalMesesTrabalhadosVisible(true);
    } else {
      fecharModalMesesTrabalhados();
    }
  };

  const fecharModalMesesTrabalhados = () => {
    setModalMesesTrabalhadosVisible(false);

    if (calcularComDecimoTerceiroEFerias && selectedFuncionario) {
      const { salario } = selectedFuncionario;

      let descontoINSS = 0;
      if (salario <= 1320) {
        descontoINSS = salario * 0.075;
      } else if (salario <= 2571.29) {
        descontoINSS = salario * 0.09;
      } else if (salario <= 3856.94) {
        descontoINSS = salario * 0.12;
      } else if (salario <= 7507.29) {
        descontoINSS = salario * 0.14;
      }
  
      const descontoFGTS = salario * 0.08;
      const descontoVT = salario * 0.06;
      const valorHoraExtra = parseFloat(valorHora);
      const valorHorasExtras = horasExtras * valorHoraExtra;
  
      let montanteTotal =
        salario - descontoINSS - descontoVT + valorHorasExtras - descontoFGTS;
      let descontoTotal = descontoINSS + descontoVT + descontoFGTS;
  
      let decimoTerceiro = (salario / 12) * mesesTrabalhados;
      let ferias = ((salario / 3) * mesesTrabalhados) / 12;
      setResultadoHolerite({
        nomeFuncionario: selectedFuncionario.nome,
        descontoINSS: descontoINSS,
        descontoFGTS: descontoFGTS,
        descontoVT: descontoVT,
        valorHorasExtras: valorHorasExtras,
        salario: salario,
        descontoTotal: descontoTotal,
        cpf: selectedFuncionario.cpf,
        decimoTerceiro: decimoTerceiro,
        ferias: ferias,
        montanteTotal: montanteTotal,
      });

      abrirModal();
    }
  };

  const calcularHolerite = () => {
    if (selectedFuncionario) {
      const { salario } = selectedFuncionario;
  
      let descontoINSS = 0;
      if (salario <= 1320) {
        descontoINSS = salario * 0.075;
      } else if (salario <= 2571.29) {
        descontoINSS = salario * 0.09;
      } else if (salario <= 3856.94) {
        descontoINSS = salario * 0.12;
      } else if (salario <= 7507.29) {
        descontoINSS = salario * 0.14;
      }
  
      const descontoFGTS = salario * 0.08;
      const descontoVT = salario * 0.06;
      const valorHoraExtra = parseFloat(valorHora);
      const valorHorasExtras = horasExtras * valorHoraExtra;
  
      let montanteTotal =
        salario - descontoINSS - descontoVT + valorHorasExtras - descontoFGTS;
      let descontoTotal = descontoINSS + descontoVT + descontoFGTS;
  
      let decimoTerceiro = (salario / 12) * mesesTrabalhados;
      let ferias = ((salario / 3) * mesesTrabalhados) / 12;
  
      if (calcularComDecimoTerceiroEFerias) {
        montanteTotal += decimoTerceiro + ferias;
        descontoTotal += decimoTerceiro + ferias;
        abrirModalMesesTrabalhados();
      } else {
        setResultadoHolerite({
          nomeFuncionario: selectedFuncionario.nome,
          valorHorasExtras: valorHorasExtras,
          descontoINSS: descontoINSS,
          descontoFGTS: descontoFGTS,
          descontoVT: descontoVT,
          salario: salario,
          descontoTotal: descontoTotal,
          cpf: selectedFuncionario.cpf,
          decimoTerceiro: 0,
          ferias: 0,
          montanteTotal: montanteTotal,
        });
        abrirModal();
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Gerar Holerite</Text>

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

      <Text style={styles.label}>Quantidade de Horas Extras:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setHorasExtras(parseFloat(value))}
        placeholder="Horas Extras"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Valor por hora das Horas Extras:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setValorHora(value)}
        placeholder="Valor por hora"
        keyboardType="numeric"
      />

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() =>
            setCalcularComDecimoTerceiroEFerias(
              !calcularComDecimoTerceiroEFerias
            )
          }
        >
          <Text>Calcular com 13º e Férias</Text>
          {calcularComDecimoTerceiroEFerias ? (
            <Text style={styles.checked}>✔</Text>
          ) : null}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={calcularHolerite}>
        <Text style={styles.buttonText}>Calcular Holerite</Text>
      </TouchableOpacity>

      <RNModal
        visible={modalMesesTrabalhadosVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={fecharModalMesesTrabalhados}
      >
        <View style={styles.modalContainer}>
          <View style={styles.resultadosContainer}>
            <Text style={styles.resultadosTexto}>
              Quantos meses o funcionário trabalhou este ano?
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setMesesTrabalhados(parseFloat(value))}
              placeholder="Meses trabalhados"
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={fecharModalMesesTrabalhados}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RNModal>

      <RNModal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={fecharModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.resultadosContainer}>
            <Text style={styles.resultadosTexto}>Resultados do Holerite</Text>
            {resultadoHolerite && (
              <View>
                <Text>Funcionário: {resultadoHolerite.nomeFuncionario}</Text>
                <Text>CPF: {resultadoHolerite.cpf}</Text>
                {resultadoHolerite.descontoINSS !== undefined && (
                  <Text>
                    Desconto INSS: R${" "}
                    {resultadoHolerite.descontoINSS.toFixed(2)}
                  </Text>
                )}
                {resultadoHolerite.descontoFGTS !== undefined && (
                  <Text>
                    Desconto FGTS: R${" "}
                    {resultadoHolerite.descontoFGTS.toFixed(2)}
                  </Text>
                )}
                {resultadoHolerite.descontoVT !== undefined && (
                  <Text>
                    Desconto VT: R$ {resultadoHolerite.descontoVT.toFixed(2)}
                  </Text>
                )}
                {resultadoHolerite.valorHorasExtras !== undefined && (
                  <Text>
                    Valor Horas Extras: R$
                    {resultadoHolerite.valorHorasExtras.toFixed(2)}
                  </Text>
                )}
                {resultadoHolerite.decimoTerceiro !== undefined && (
                  <Text>
                    13º Salário: R${" "}
                    {resultadoHolerite.decimoTerceiro.toFixed(2)}
                  </Text>
                )}
                {resultadoHolerite.ferias !== undefined && (
                  <Text>Férias: R$ {resultadoHolerite.ferias.toFixed(2)}</Text>
                )}
                {resultadoHolerite.salario !== undefined && (
                  <Text>
                    Salário Bruto: R$ {resultadoHolerite.salario.toFixed(2)}
                  </Text>
                )}
                {resultadoHolerite.descontoTotal !== undefined && (
                  <Text>
                    Desconto Total: R$
                    {resultadoHolerite.descontoTotal.toFixed(2)}
                  </Text>
                )}
                {resultadoHolerite.montanteTotal !== undefined && (
                  <Text>
                    Salário Líquido: R$
                    {resultadoHolerite.montanteTotal.toFixed(2)}
                  </Text>
                )}
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.fecharButton} onPress={fecharModal}>
            <Text style={styles.fecharButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </RNModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  headerText: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 20,
  },
  picker: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    width: "80%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checked: {
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  resultadosContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  resultadosTexto: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fecharButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  fecharButtonText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default GerarHolerite;
