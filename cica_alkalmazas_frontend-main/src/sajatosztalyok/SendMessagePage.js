import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const IP = require('./Ipcim');

export default class SendMessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
    };
  }

  sendMessage = () => {
    const { name, email, message } = this.state;

    // Create a data object with the input values
    const data = {
      name: name,
      email: email,
      message: message
    };

    // Send a POST request to your API endpoint
    fetch(IP.ipcim + "uzenetek", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        // Handle the response from the API
        console.log('Message sent:', result);
        // Reset the form if needed
        this.setState({
          name: '',
          email: '',
          message: ''
        });
      })
      .catch(error => {
        // Handle any errors
        console.error('Error sending message:', error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Személyes adatok megadása:</Text>
        <TextInput
          style={styles.input}
          placeholder="Teljes név"
          onChangeText={(text) => this.setState({ name: text })}
          value={this.state.name}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.messageInput}
          placeholder="Üzenet tartalma"
          onChangeText={(text) => this.setState({ message: text })}
          value={this.state.message}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={this.sendMessage}>
          <Text style={styles.buttonText}>Üzenet küldése</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '50%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 15
  },
  messageInput: {
    width: '50%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
    borderRadius: 15
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '15%',
    alignItems: 'center',
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
