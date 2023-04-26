import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {fromS} from 'hh-mm-ss';

export default function App() {
  const [numero, setNumero] = useState(0);
  const [init, setInit] = useState(false);
  const [ultimo, setUltimo] = useState(null);
  const timer = useRef(null)

  useEffect(() => {
    if(init){
      timer.current = setInterval(() => setNumero(numero + 1), 1)
    }
    return () => clearInterval(timer.current);
  }, [numero, init]);

  comecar = () => {
    if(!init){
      setInit(true)
    }else{
      setInit(false)
    }
    setUltimo(null)
  }
  
  limpar = () => {
    setUltimo(numero)
    setNumero(0)
    setInit(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cronômetro</Text>

      <Image source={require("./src/img/crono.png")} />

      <Text style={styles.timer}>{fromS(numero, 'hh:mm:ss')}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress ={comecar}>
          <Text style={styles.btnTexto}>{init ? "Parar" : "Começar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress ={limpar}> 
          <Text style={styles.btnTexto}>Limpar</Text> 
        </TouchableOpacity>
      </View>
      <View style={styles.areaUltima}>
        <Text style={styles.textoCorrida}>
          {ultimo !== null ? `Ultimo tempo : ${fromS(ultimo, 'hh:mm:ss')}` : ""}
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

