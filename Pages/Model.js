import * as React from 'react';
import { StyleSheet, Text, View,Button, TextInput,ImageBackground, SafeAreaView } from 'react-native';
import { useState } from 'react';
import axios from "axios";
import { useMutation } from "react-query";


export default function Model(props){
  
  const [text, setText] = useState({
    instituicao :"",
    conhecimento : "",
  });

  const Salvar = async (data) => {
    const alterar = await axios.post("http://localhost:8080/experiencia", data)
    return alterar;
  }

  const {mutate} = useMutation(Salvar,{});
  
  return(
    <SafeAreaView>
    <ImageBackground source={require('../img/fundo.jpg')} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <View>
            <Text  style={styles.title}>Adicionar nova Experiencia</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Universidade (ex: cátolica, IFPE, etc.)" 
            onChangeText={(value) => setText({...text, instituicao:value})} value={text.instituicao}
          />
          <TextInput
            style={styles.input}
            placeholder="Novo Conhecimento(ex:java, python...)" 
            onChangeText={(value) => setText({...text, conhecimento:value})} value={text.conhecimento}
          />
          <View style={styles.botao}>
            <View style={styles.botao2}>
              <Button  title='Alterar' color={'#FF6347'} onPress={()=> mutate(text)} />
            </View>
            <View style={styles.botao2}>
              <Button title='Voltar' color={'#008000'} onPress={()=>props.navigation.navigate('Curriculo')} />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>  
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E6E6FA',
      alignItems: 'center',
      justifyContent: 'center',
      opacity:0.9,
      
    },
    input: {
      width:250,
      height: 40,
      margin: 10,
      borderWidth:1,
      padding: 10,
      backgroundColor:'#FFFFE0'
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
    subcontainer:{
      alignItems: 'center',
      backgroundColor: '#4169E1',
      padding:'10%',
      opacity:0.9,
    },
    title:{
      color:'#00FFFF',
      fontSize:20
    },
    botao:{
      flexDirection:'row',
      padding:10
    },
    botao2:{
      padding:5,
    }
  });