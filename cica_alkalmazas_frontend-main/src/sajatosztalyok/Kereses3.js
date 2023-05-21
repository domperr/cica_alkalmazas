import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, TextInput } from 'react-native-web';

const IP=require('./Ipcim')

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      szo:"",
      dataSource:[]

    }
  }

  szavazat=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch(IP.ipcim + "erdekel", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  }


  componentDidMount(){
    return fetch(IP.ipcim +  'cica3')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  keres=()=>{
    //alert("hello")
    var bemenet={
      bevitel1:this.state.szo
    }

  fetch(IP.ipcim + "keres3", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.json())
  .then(y => {
    //alert(JSON.stringify(y))
    this.setState({ dataSource   :  y   })
  }
  );
  }


  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
{/*-----------------------------------------------------------Keresés  */}
<View style={styles.searchContainer}>
  <TextInput
    style={styles.searchInput}
    placeholder="Macska keresése"
    onChangeText={(text) => this.setState({szo: text})}
    value={this.state.szo}
  />
  <TouchableOpacity
    style={styles.searchButton}
    onPress={() => this.keres()}
  >
    <Text style={styles.searchButtonText}>Keresés</Text>
  </TouchableOpacity>
</View>
{/*--------------------------------------------------------- Találatok */}       
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
          <Text style={styles.cicaNev}>{item.cica_nev}</Text>
          <Text style={{color:"green",fontSize:15,textAlign:"center",marginTop:15,marginBottom:5}}>{new Date(item.cica_datum).toLocaleDateString("hu", {weekday: "long", year: "numeric", month: "long", day: "numeric"})}</Text>
          <Image  source={{uri: IP.ipcim + item.cica_kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />  

          <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.szavazat(item.cica_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Érdekel</Text>
      </TouchableOpacity>

      <View style={styles.sarga}>
        
        </View>

          </View>
        
        }

        
        keyExtractor={({ cica_id }) => cica_id}
        />

        {/* Go Back Button */}
        <TouchableOpacity style={styles.goBackButton} onPress={this.goBack}>
          <Text style={styles.goBackButtonText}>Vissza</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  kekgomb: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto"
  },
  feketegomb: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    width: 150,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20
  },
  cicaNev: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#704214',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#00BFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  goBackButton: {
    position: 'absolute',
    top: 30,
    left: -100,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  goBackButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
