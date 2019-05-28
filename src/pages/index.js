import 'bootstrap/dist/css/bootstrap.min.css';
import getSymbolFromCurrency from 'currency-symbol-map';
import React from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Layout from "../components/layout";
import SEO from "../components/seo";
import { connect } from "react-redux";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSwapClick = this.handleSwapClick.bind(this);
    this.handleConvertClick = this.handleConvertClick.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value.toUpperCase();
    const name = target.name;
    this.setState({
      [name]: value
    });
    let nameValidate = [name] + "Validate";
    if (getSymbolFromCurrency(value) && this.state.symbols.indexOf(value) > -1) {
      this.setState({ [nameValidate]: true });
    } else {
      this.setState({ [nameValidate]: false });
    }
    console.log(this.state);
  }

  handleSwapClick(e) {
    e.preventDefault();
    let convertFrom = this.state.convertFrom;
    let convertTo = this.state.convertTo;
    this.setState({
      convertFrom: [convertTo],
      convertTo: [convertFrom]
    });
  }

  handleConvertClick(e) {
    e.preventDefault();
    if (this.state.convertFromValidate && this.state.convertToValidate) {
      console.log(this.state);
      let convertFrom = this.state.convertFrom;
      let convertTo = this.state.convertTo;
      let url = "https://api.exchangeratesapi.io/latest?base=" + convertFrom + "&symbols=" + convertTo;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          let value = data.rates[convertTo];
          this.setState({ rate: [value] });
        });
    } else {
      alert("Currrency is not valid to convert. Please choose correct!");
    }
  }

  componentDidMount() {
      //this.pros.xinchao();
  }

  render() {
    return (

      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Form>
          <Container>
            < Row>
              <Col>
                <FormGroup>
                  { <p>We just support currency: {/*this.props.symbols.toString()*/}</p> }
                </FormGroup>
              </Col>

            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="convertFrom">Convert From</Label>
                  {
                    this.props.convertFromValidate ? (
                      <Input type="text" name="convertFrom" id="convertFrom" placeholder="" maxLength="3"
                        value={this.props.convertFrom}
                        style={{ textTransform: 'uppercase' }} onChange={this.handleInputChange} valid />
                    ) : (
                        <Input type="text" name="convertFrom" id="convertFrom" placeholder="" maxLength="3"
                          value={this.props.convertFrom}
                          style={{ textTransform: 'uppercase' }} onChange={this.handleInputChange} />
                      )
                  }

                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="convertTo">Convert To</Label>

                  {
                    this.props.convertToValidate ? (
                      <Input type="text" name="convertTo" id="convertTo" placeholder="" maxLength="3"
                        value={this.props.convertTo}
                        style={{ textTransform: 'uppercase' }} onChange={this.handleInputChange} valid />
                    ) : (
                        <Input type="text" name="convertTo" id="convertTo" placeholder="" maxLength="3"
                          value={this.props.convertTo}
                          style={{ textTransform: 'uppercase' }} onChange={this.handleInputChange} />
                      )
                  }
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Button color="primary" onClick={this.handleSwapClick}>Swap</Button>{' '}
                  <Button color="success" onClick={this.handleConvertClick}>Convert</Button>
                </FormGroup>
              </Col>

            </Row>
            <Row>
              <Col>
                <FormGroup>
                  {this.props.rate ? (<h1>1 {this.props.convertFrom} = {this.props.rate} {this.props.convertTo}</h1>) : (<h1></h1>)}
                </FormGroup>
              </Col>

            </Row>
          </Container>

        </Form>

      </Layout>
    );
  }
}

const mapState = state => ({
    convertFrom: state.convertFrom,
    convertTo: state.convertTo,
    rate:state.rate,
    symbols:state.symbols
});


const mapDispatch = dispatch => {
  console.log(dispatch.convertcurrency);
  //xinchao: dispatch.convertcurrency.hello;
};

//export default connect(mapState, mapDispatch)(IndexPage);
export default IndexPage;
