import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormGroup,
  NavLink,
  Alert,
} from "reactstrap";
import { clearErrors } from "../../store/actions/errorActions";
import { login } from "../../store/actions/authActions";

class LoginPage extends Component {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      if (error.id === "LOGIN_FAIL") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
    // If auth, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };
    //Attempt to login
    this.props.login(user);
  };
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          <Button color="link text-muted">Iniciar Sesión</Button>
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Sign in</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                {this.state.msg ? (
                  <Alert color="danger">{this.state.msg}</Alert>
                ) : null}
                <Button color="dark" block style={{ marginTop: "2rem" }}>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
export default connect(mapStateToProps, { login, clearErrors })(LoginPage);
