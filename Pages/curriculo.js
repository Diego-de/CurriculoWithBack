import * as React from 'react';
import { StyleSheet, Text, View,Button, Image,ImageBackground,SafeAreaView,FlatList } from 'react-native';
import {  List } from 'react-native-paper';
import { useQuery} from "react-query";
import axios from "axios";
import { useState,useEffect   } from 'react';




function Curriculo(props){

  const [apiClient, setExperiencia] = useState([]);

  const { isLoading, error, data ,isFetching} = useQuery( "datetime", () =>
  axios.get('https://springcurriculo.herokuapp.com/experiencia').then((res) =>setExperiencia(res.data)
  )  
);



let result = { 'nomes': [] }; // começa com um array vazio: [] 

for (let i = 0; i<apiClient.length; i++ ) { 
  result.nomes.push(apiClient[i]);
}



  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>An error has occurred: {error.message}</Text>;


  const DATA = [
    {
      id: '1',
      instituicao : apiClient.map((users) => users.instituicao),
      conhecimento: apiClient.map((users) => users.conhecimento)
    },
  ];


  const Item = ({ instituicao,conhecimento}) => (
    <View style={styles.container} >
      <Text>{isFetching ? "Updating..." : ""}</Text>
      <Text style={styles.cor}>{
      `instituicao:\n${instituicao}
      Conhecimentos:\n${conhecimento}`
      }</Text>
    </View>  
  );

  const renderItem = ({ item }) => (
    <Item
      instituicao={item.instituicao}
      conhecimento={item.conhecimento}
    />
  );
    return(
      
      <SafeAreaView style={styles.container1}>
        <ImageBackground source={require('../img/fundo.jpg')}  style={styles.image}>
        <View style={styles.container}>
            <View style={styles.contato}>
              <Image style={styles.img} source={require('../img/emoji.jpg')} resizeMode='stretch' ></Image>
              <Text style={styles.text}>Diego Gomes</Text> 
            <List.Section >
              <List.Subheader style={styles.dados}><Text style={styles.text}>Contato</Text></List.Subheader>
              <List.Item  title={<Text style={styles.text}>Numero:</Text>} description={<Text style={styles.cor}>"(55) 81 91234-5678"</Text>}  />
              <List.Item title={<Text style={styles.text}>Email</Text>} description={<Text style={styles.cor}>"Diegocurriculo@gmail.com"</Text>}/>
            </List.Section>
            </View>
            <View style={styles.informacoes}>
            <List.Section  >
                <View >
                <List.Item  title={<Text style={styles.text}>Perfil:</Text> } descriptionNumberOfLines={3} description={<Text style={styles.cor}>20 anos, Solteiro</Text>}/>
                </View>
                <View>
                <List.Item  title={<Text style={styles.text}>Objetivo:</Text> }StyleProp={styles.cor} descriptionNumberOfLines={4} description={<Text style={styles.cor}>Lorem ipsum</Text>} style={styles.dados}/>
                </View>
                <View>
                <List.Item  title={<Text style={styles.text}>Formação:</Text>}descriptionNumberOfLines={4} description={<Text style={styles.cor}>Ensino superio incompleto,universidade Cátolica de pernambuc</Text>} style={styles.dados}/>
                </View>
                <View>
                 <View>
                    <Text onLo style={styles.text}>Experiencias</Text>
                    <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    />  
                </View> 
                </View>
                <View>
                <List.Item title={<Text style={styles.text}>Hobbyes:</Text> }descriptionNumberOfLines={3} description={<Text style={styles.cor}>Jogar, Assitir, Estudar</Text>} style={styles.dados}/>
                </View>
              </List.Section>    
            </View> 
        </View>
        <Button title='Aperte aqui para alterar dados' onPress={()=>props.navigation.navigate('Alterar')}/>
        </ImageBackground> 
      </SafeAreaView>  
    );
}

export default Curriculo

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection:'row',  
      justifyContent: 'center',
      textAlign:'center',
      width:'100%',
      opacity:0.8,
    },
    container1: {
      flex: 1,
    },
    contato:{
      width:'40%',
      alignItems:'center',
      backgroundColor:'#483D8B',
    }  
    ,
    informacoes:{ 
      width:'60%',
      backgroundColor:'#6495ED',
      alignItems:'center',
    },
    text:{
      fontSize: 17,
      color:'#87CEEB' 
    },
    cor:{
      color:'#FFF' 
    },
    dados:{
      width:150,
      color:'#FFF'
    },
    img:{
      width:'80%',
      height:'20%',
      borderRadius:60,
      margin:20
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    }
  });