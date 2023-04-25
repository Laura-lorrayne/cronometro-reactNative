import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;
export default function App() {
  const [numero, setNumero] = useState(0);
  const [botao, setBotao] = useState("Começar");
  const [ultimo, setUltimo] = useState(null);

  function comecar() {
    if (timer !== null) {
      // aqui vai parar o timer
      clearInterval(timer);
      timer = null;
      setBotao("Começar");
    } else {
      // começara a girar o timer
      timer = setInterval(() => {
        ss++;

        if (ss == 60) {
          ss = 0;
          mm++;
        }

        if (mm == 60) {
          mm = 0;
          hh++;
        }

        let format =
          (hh < 10 ? "0" + hh : hh) +
          ":" +
          (mm < 10 ? "0" + mm : mm) +
          ":" +
          (ss < 10 ? "0" + ss : ss);

        setNumero(format);
      }, 1000);
      setBotao("Parar");
    }
  }
  function limpar() {
    if (timer !== null) {
      // parar time
      clearInterval(timer);
      timer = null;
    }
    setUltimo(numero);

    setNumero(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setBotao("Começar");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cronômetro</Text>

      <Image source={require("./src/img/crono.png")} />

      <Text style={styles.timer}>{numero}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={comecar}>
          <Text style={styles.btnTexto}>{botao}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto}>Limpar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.areaUltima}>
        <Text style={styles.textoCorrida}>
          {ultimo ? "Ultimo tempo : " + ultimo : ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00aeef",
  },
  text: {
    marginTop: 1,
    marginBottom: 40,
    fontSize: 45,
    fontWeight: "bold",
    color: "#fff",
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: "bold",
    color: "#fff",
  },
  btnArea: {
    flexDirection: "row",
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    margin: 17,
    borderRadius: 20,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00aeef",
  },
  areaUltima: {
    marginTop: 60,
  },
  textoCorrida: {
    fontSize: 25,
    color: "#fff",
    fontStyle: "italic",
  },
});
