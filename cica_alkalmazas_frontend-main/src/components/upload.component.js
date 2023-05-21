import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      catName: "",
      picture: null,
      selectedDate: ""
    };
  }

  handleInputChange = (event) => {
    if (event.target.name === "picture") {
      this.setState({ picture: event.target.files[0] });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };

  handleUpload = (event) => {
    event.preventDefault();

    const { catName, picture, selectedDate } = this.state;

    const formData = new FormData();
    formData.append("catName", catName);
    formData.append("picture", picture);
    formData.append("selectedDate", selectedDate);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.props.history.push("/fetch-example");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { catName, selectedDate } = this.state;

    return (
      <Container className="mt-5">
        <h1 className="mb-4 text-center">Talált macska adatainak megadása</h1>

        <Form className="w-50 mx-auto">
          <Form.Group controlId="catName">
            <Form.Label>Macska neve:</Form.Label>
            <Form.Control
              type="text"
              name="catName"
              value={catName}
              onChange={this.handleInputChange}
              placeholder="Macska neve"
            />
          </Form.Group>

          <Form.Group controlId="picture">
            <Form.Label>Kép feltöltése:</Form.Label>
            <Form.Control
              type="file"
              name="picture"
              accept="image/*"
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="selectedDate">
            <Form.Label>Dátum:</Form.Label>
            <Form.Control
              type="date"
              name="selectedDate"
              value={selectedDate}
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" onClick={this.handleUpload} className="w-100">
            Feltöltés
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Upload;
