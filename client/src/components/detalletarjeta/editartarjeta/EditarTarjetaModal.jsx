import React, { Component } from "react";
import { connect } from "react-redux";
import { editarTarjeta } from "../../../store/actions/tarjetaActions";
import { getCampos } from "../../../store/actions/camposActions";
import { clearErrors } from "../../../store/actions/errorActions";
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
  Row,
  Col,
} from "reactstrap";

class EditarTarjetaModal extends Component {
  state = {
    modal: false,
    numero: "",
    _id: this.props.tarjeta._id,
    descripcion: this.props.tarjeta.descripcion,
    detecto: this.props.tarjeta.detecto,
    prioridad: this.props.tarjeta.prioridad,
    familia: this.props.tarjeta.familia,
    maquina: this.props.tarjeta.maquina,
    parteMaquina: this.props.tarjeta.parteMaquina,
    equipo: this.props.tarjeta.equipo,
    riesgoInicial: this.props.tarjeta.riesgoInicial,
    tipodeRiesgo: this.props.tarjeta.tipodeRiesgo,
    responsable: this.props.tarjeta.responsable,
    tiempoEmpleado: this.props.tarjeta.tiempoEmpleado,
    causa: this.props.tarjeta.causa,
    riesgoFinal: this.props.tarjeta.riesgoFinal,
    tareaRealizada: this.props.tarjeta.tareaRealizada,
    tipoAccion: this.props.tarjeta.tipoAccion,
    materialUtilizado: this.props.tarjeta.materialUtilizado,
    idMaquina: "",
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      console.log(error.msg.msg);
      if (error.id === "EDITAR_TARJETA_ERROR") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {
      _id,
      descripcion,
      detecto,
      prioridad,
      maquina,
      parteMaquina,
      familia,
      equipo,
      riesgoInicial,
      responsable,
      tiempoEmpleado,
      causa,
      riesgoFinal,
      tareaRealizada,
      materialUtilizado,
      tipodeRiesgo,
      tipoAccion,
    } = this.state;

    const tarjetaEditada = {
      _id,
      descripcion,
      detecto,
      prioridad,
      maquina,
      parteMaquina,
      familia,
      equipo,
      riesgoInicial,
      responsable,
      tiempoEmpleado,
      tipodeRiesgo,
      tipoAccion,
      causa,
      riesgoFinal,
      tareaRealizada,
      materialUtilizado,
    };
    this.props.editarTarjeta(tarjetaEditada);
    this.toggle();
  };

  componentDidMount() {
    this.props.getCampos();
  }

  render() {
    const { campos } = this.props.campos;
    return (
      <div>
        <p onClick={this.toggle} style={{ cursor: "pointer" }} className="my-3">
          Editar Tarjeta
        </p>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Editar Tarjeta</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <h4>Tarjeta Frente</h4>
            <Form className="mt-3" onSubmit={this.onSubmit} id="agregartarjeta">
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="maquina">Maquina / Instalación *</Label>
                    <Input
                      type="select"
                      name="maquina"
                      id="maquina"
                      onChange={(e) => {
                        const index = e.target.selectedIndex;
                        const el = e.target.childNodes[index];
                        const option = el.getAttribute("_id");
                        this.setState({
                          idMaquina: option,
                          maquina: e.target.value,
                        });
                      }}
                    >
                      <option>Seleccionar</option>
                      {campos &&
                        campos
                          .filter(({ name, value }) => {
                            return name === "maquina";
                          })
                          .map(({ name, value, _id }, index) => {
                            return (
                              <option key={index} _id={_id}>
                                {value}
                              </option>
                            );
                          })}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="detecto">Riesgo Inicial *</Label>
                    <Input
                      type="select"
                      defaultValue={this.state.riesgoInicial}
                      name="riesgoInicial"
                      id="riesgoInicial"
                      onChange={this.onChange}
                    >
                      <option>Seleccionar</option>
                      {campos &&
                        campos
                          .filter(({ name, value }) => {
                            return name === "riesgoInicial";
                          })
                          .map(({ name, value, _id }, index) => {
                            return (
                              <option key={index} _id={_id}>
                                {value}
                              </option>
                            );
                          })}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="detecto">Detectó *</Label>
                    <Input
                      type="text"
                      name="detecto"
                      defaultValue={this.state.detecto}
                      id="detecto"
                      onChange={this.onChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="descripcion">Descripción *</Label>
                    <Input
                      type="textarea"
                      name="descripcion"
                      defaultValue={this.state.descripcion}
                      id="descripcion"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="maquina">Parte de maquina *</Label>
                    <Input
                      type="select"
                      name="parteMaquina"
                      id="parteMaquina"
                      onChange={this.onChange}
                    >
                      <option>Seleccionar</option>
                      {campos &&
                        campos
                          .filter(({ name, value, _id }) => {
                            return _id === this.state.idMaquina;
                          })
                          .map(({ parteMaquina }) => {
                            return parteMaquina.map((item) => {
                              return <option>{item}</option>;
                            });
                          })}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="equipo">Equipo Autonomo*</Label>
                    <Input
                      type="select"
                      name="equipo"
                      defaultValue={this.state.equipo}
                      id="equipo"
                      onChange={this.onChange}
                    >
                      <option>Seleccionar</option>
                      {campos &&
                        campos
                          .filter(({ name, value }) => {
                            return name === "equipo";
                          })
                          .map(({ name, value }, index) => {
                            return <option key={index}>{value}</option>;
                          })}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="familia">Familia de anomalias *</Label>
                    <Input
                      type="select"
                      name="familia"
                      defaultValue={this.state.familia}
                      id="familia"
                      onChange={this.onChange}
                    >
                      <option>Seleccionar</option>
                      <option>1 - Pequeñas Deficiencia</option>
                      <option>2 - Condiciones basicas</option>
                      <option>3 - Puntos inaccesibles</option>
                      <option>4 - Focos de contaminacion</option>
                      <option>5 - Defecto de Calidad</option>
                      <option>6 - Elementos Innecesarios</option>
                      <option>7 - Lugares Inseguros</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="detecto">Tipo de R / FC / LDA *</Label>
                    <Input
                      type="select"
                      name="tipodeRiesgo"
                      id="tipodeRiesgo"
                      defaultValue={this.state.tipodeRiesgo}
                      onChange={this.onChange}
                    >
                      <option>Seleccionar</option>
                      {campos &&
                        campos
                          .filter(({ name, value }) => {
                            return name === "tipo";
                          })
                          .map(({ name, value }, index) => {
                            return <option key={index}>{value}</option>;
                          })}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="prioridad">Prioridad *</Label>
                    <Input
                      type="select"
                      name="prioridad"
                      defaultValue={this.state.prioridad}
                      id="prioridad"
                      onChange={this.onChange}
                    >
                      <option>Seleccionar</option>
                      <option>Alta</option>
                      <option>Media</option>
                      <option>Baja</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              {this.props.tarjeta.estado === "Cerrada" && (
                <div>
                  <h4>Tarjeta Dorso</h4>{" "}
                  <FormGroup>
                    <Label for="responsable">Responsable</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="responsable"
                      id="responsable"
                      className="mb-2"
                      defaultValue={this.state.responsable}
                    ></Input>

                    <Label for="responsable">Riesgo Final</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="riesgoFinal"
                      id="riesgoFinal"
                      className="mb-2"
                      defaultValue={this.state.riesgoFinal}
                    ></Input>

                    <Label for="updaters">Tiempo empleado en horas</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="tiempoEmpleado"
                      id="tiempoEmpleado"
                      defaultValue={this.state.tiempoEmpleado}
                      className="mb-2"
                    ></Input>

                    <Label for="updaters">Causa de la Anomalia</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="causa"
                      id="causa"
                      defaultValue={this.state.causa}
                      className="mb-2"
                    ></Input>

                    <Label for="updaters">Tarea Realizada</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      defaultValue={this.state.tareaRealizada}
                      name="tareaRealizada"
                      id="tareaRealizada"
                      className="mb-2"
                    ></Input>

                    <Label for="tipoAccion">Tipo de acción a realizar *</Label>
                    <Input
                      type="select"
                      name="tipoAccion"
                      id="tipoAccion"
                      className="mb-2"
                      defaultValue={this.state.tipoAccion}
                      onChange={this.onChange}
                    >
                      <option>Seleccionar</option>
                      <option>Eliminar</option>
                      <option>Contener</option>
                      <option>Reemplazar</option>
                      <option>Simplificar</option>
                    </Input>

                    <Label for="updaters">Material Utilizado</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="materialUtilizado"
                      defaultValue={this.state.materialUtilizado}
                      id="materialUtilizado"
                      className="mb-2"
                    ></Input>
                  </FormGroup>
                </div>
              )}

              {this.state.msg ? (
                <Alert color="danger" className="mt-3">
                  {this.state.msg}
                </Alert>
              ) : null}

              <Row className="mt-3">
                <Col>
                  <Button>Subir</Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
  campos: state.campos,
});
export default connect(mapStateToProps, {
  clearErrors,
  editarTarjeta,
  getCampos,
})(EditarTarjetaModal);
