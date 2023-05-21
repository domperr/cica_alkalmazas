import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, Image, TouchableOpacity, TextInput } from 'react-native-web';
import SendMessagePage from './SendMessagePage';

const IP = require('./Ipcim');

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      szo: "",
      dataSource: [],
      catCount: 0,
      showMessagePage: false
    };
  }

  szavazat = (szam) => {
    var bemenet = {
      bevitel1: szam
    };

    fetch(IP.ipcim + "erdekel", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(x => x.text())
      .then(y => alert(y));
  };

  componentDidMount() {
    return fetch(IP.ipcim + 'cica')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          catCount: responseJson.length
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  keres = () => {
    const { szo, dataSource } = this.state;
    const filteredData = dataSource.filter(item => item.cica_nev.toLowerCase().includes(szo.toLowerCase()));
    this.setState({ dataSource: filteredData });
  };

  goBack = () => {
    this.setState({ dataSource: [] }, () => {
      this.componentDidMount();
    });
  };

  openSendMessagePage = () => {
    this.setState({ showMessagePage: true });
  };

  closeSendMessagePage = () => {
    this.setState({ showMessagePage: false });
  };

  render() {
    const { isLoading, szo, dataSource, catCount, showMessagePage } = this.state;

    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    if (showMessagePage) {
      return <SendMessagePage onClose={this.closeSendMessagePage} />;
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        {/* Keresés */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Macska keresése"
            onChangeText={(text) => this.setState({ szo: text })}
            value={szo}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={this.keres}
          >
            <Text style={styles.searchButtonText}>Keresés</Text>
          </TouchableOpacity>
        </View>

        {/* Találatok */}
        <Text style={styles.catCount}>{catCount} macska regisztrálva</Text>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.cicaNev}>{item.cica_nev}</Text>
              <Text style={{ color: "green", fontSize: 15, textAlign: "center", marginTop: 15, marginBottom: 5 }}>
                {new Date(item.cica_datum).toLocaleDateString("hu", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </Text>
              <Image source={{ uri: IP.ipcim + item.cica_kep }} style={{ width: 300, height: 300, marginLeft: "auto", marginRight: "auto" }} />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.kekgomb}
                  onPress={async () => this.szavazat(item.cica_id)}
                >
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>Érdekel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.sendMessageButton}
                  onPress={this.openSendMessagePage}
                >
                  <Text style={styles.sendMessageButtonText}>Üzenet küldése</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.sarga}></View>
            </View>
          )}
          keyExtractor={({ cica_id }) => cica_id}
        />

        {/* Back button */}
        <TouchableOpacity style={styles.backButton} onPress={this.goBack}>
          <Text style={styles.backButtonText}>Vissza</Text>
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
    width: 150,
    borderRadius: 20,
    marginLeft: 400
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
    textShadowRadius: 3
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10
  },
  searchButton: {
    backgroundColor: '#00BFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: -100,
    backgroundColor: '#CCCCCC',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  backButtonText: {
    color: 'black',
    fontWeight: 'bold'
  },
  catCount: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  sendMessageButton: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    width: 150,
    borderRadius: 20,
    marginRight: 400
  },
  sendMessageButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
