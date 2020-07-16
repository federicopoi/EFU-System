import React, { Component } from "react";
import { connect } from "react-redux";
import { getTarjetas } from "../../store/actions/tarjetaActions";
import { agregarFilter, getFilters } from "../../store/actions/filterActions";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import QRCode from "qrcode.react";
import moment from "moment";
import {
  Card,
  CardBody,
  Row,
  Col,
  Table,
  Container,
  Input,
  Label,
  Button,
  Form,
} from "reactstrap";
import Select from "react-select";
import PresetModal from "./PresetModal";

const options = [
  { value: "numero", label: "N°" },
  { value: "color", label: "Color" },
  { value: "prioridad", label: "Prioridad" },
  { value: "equipo", label: "Equipo Autonomo" },
  { value: "fecha", label: "Fecha apertura" },
  { value: "descripcion", label: "Descripcion anomalia" },
  { value: "estado", label: "Estado acutal" },
  { value: "maquina", label: "Maquina / Instalacion" },
  { value: "detecto", label: "Detecto" },
  { value: "familia", label: "Familia de anomalia" },
];
class MisTarjetasFiltro extends Component {
  componentDidMount() {
    this.props.getTarjetas();
    this.props.getFilters();
  }
  state = {
    selectedOption: null,
    numero: "",
    color: "",
    equipo: "",
    prioridad: "",
    fecha: "",
    descripcion: "",
    estado: "",
    maquina: "",
    detecto: "",
    familia: "",
    qrcode: false,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { tarjetas } = this.props.tarjetas;
    const { filters } = this.props.filters;
    const { selectedOption } = this.state;
    var filter = {
      numero: this.state.numero && this.state.numero,
      color: this.state.color && this.state.color,
      equipo: this.state.equipo && this.state.equipo,
      prioridad: this.state.prioridad && this.state.prioridad,
      fecha: this.state.fecha && this.state.fecha,
      descripcion: this.state.descripcion && this.state.descripcion,
      estado: this.state.estado && this.state.estado,
      maquina: this.state.maquina && this.state.maquina,
      detecto: this.state.detecto && this.state.detecto,
      familia: this.state.familia && this.state.familia,
    };

    const multiFilter = (arr, filters) => {
      const filterKeys = Object.keys(filters);
      return arr.filter((eachObj) => {
        return filterKeys.every((eachKey) => {
          if (!filters[eachKey].length) {
            return true; // passing an empty filter means that filter is ignored.
          }
          return filters[eachKey].includes(eachObj[eachKey]);
        });
      });
    };
    const newFilter = multiFilter(tarjetas, filter);

    const arrNumero = tarjetas.map(({ numero }) => numero);
    const unicosNumero = Array.from(new Set(arrNumero));

    const arrColores = tarjetas.map(({ color }) => color);
    const unicosColores = Array.from(new Set(arrColores));

    const arrEquipos = tarjetas.map(({ equipo }) => equipo);
    const unicosEquipos = Array.from(new Set(arrEquipos));

    const arrPrioridad = tarjetas.map(({ prioridad }) => prioridad);
    const unicosPrioridad = Array.from(new Set(arrPrioridad));

    const arrFecha = tarjetas.map(({ fecha }) => fecha);
    const unicosFecha = Array.from(new Set(arrFecha));

    const arrDescripcion = tarjetas.map(({ descripcion }) => descripcion);
    const unicosDescripcion = Array.from(new Set(arrDescripcion));

    const arrEstado = tarjetas.map(({ estado }) => estado);
    const unicosEstado = Array.from(new Set(arrEstado));

    const arrMaquina = tarjetas.map(({ maquina }) => maquina);
    const unicosMaquina = Array.from(new Set(arrMaquina));

    const arrDetecto = tarjetas.map(({ detecto }) => detecto);
    const unicosDetecto = Array.from(new Set(arrDetecto));

    const arrFamilia = tarjetas.map(({ familia }) => familia);
    const unicosFamilia = Array.from(new Set(arrFamilia));

    const globalArray = {
      numero: unicosNumero,
      color: unicosColores,
      prioridad: unicosPrioridad,
      equipo: unicosEquipos,
      fecha: unicosFecha,
      estado: unicosEstado,
      descripcion: unicosDescripcion,
      maquina: unicosMaquina,
      detecto: unicosDetecto,
      familia: unicosFamilia,
    };

    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Container>
              <Row>
                <Col>
                  <div className="d-flex align-items-center">
                    <div className="">
                      <h2 className="mb-3">Tabla dinamica de tarjetas</h2>
                    </div>
                    <div className="ml-auto d-flex no-block align-items-center">
                      <div className="dl">
                        <ReactHTMLTableToExcel
                          className="btn btn-info"
                          table="emp"
                          filename="ReporteTarjetas"
                          sheet="Tarjetas"
                          buttonText="Exportar excel"
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="mb-3">
                <h5>Seleccionar elementos para la tabla</h5>
                <Select
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={options}
                  isMulti
                  placeholder="Seleccionar"
                />
              </div>

              <Row>
                <Col>
                  {" "}
                  {filters &&
                    filters.map(
                      ({
                        nombre,
                        selectedOption,
                        numero,
                        color,
                        equipo,
                        prioridad,
                        fecha,
                        descripcion,
                        estado,
                        maquina,
                        detecto,
                        familia,
                        qrcode,
                      }) => {
                        return (
                          <Button
                            className="my-2 mx-2"
                            onClick={() => {
                              this.setState({
                                selectedOption,
                                numero,
                                color,
                                equipo,
                                prioridad,
                                fecha,
                                descripcion,
                                estado,
                                maquina,
                                detecto,
                                familia,
                                qrcode,
                              });
                            }}
                          >
                            {nombre}
                          </Button>
                        );
                      }
                    )}
                </Col>
              </Row>

              <div className="d-flex align-items-center">
                <div className="">
                  <div>
                    <h5>Filtrar elementos</h5>
                  </div>
                </div>
                <div className="ml-auto d-flex no-block align-items-center">
                  <Label check>
                    <Input
                      type="checkbox"
                      id="qrcode"
                      name="qrcode"
                      onChange={(e) => {
                        this.onChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked,
                          },
                        });
                      }}
                    />
                    Qr Code
                  </Label>
                  <Button
                    className="ml-3"
                    onClick={() => {
                      this.setState({
                        numero: "",
                        color: "",
                        prioridad: "",
                        equipo: "",
                        fecha: "",
                        estado: "",
                        descripcion: "",
                        maquina: "",
                        detecto: "",
                        familia: "",
                        selectedOption: null,
                      });
                    }}
                  >
                    Reset
                  </Button>
                  <Form onSubmit={this.onSubmit}>
                    <PresetModal state={this.state}></PresetModal>
                  </Form>
                </div>
              </div>
              <Row className="mb-3">
                {selectedOption &&
                  selectedOption.map(({ label, value }) => {
                    return (
                      <div>
                        <Col>
                          <div>
                            <Label for="color">{label}</Label>
                            <Input
                              type="select"
                              name={value}
                              id={value}
                              onChange={this.onChange}
                            >
                              <option></option>
                              {globalArray[value].map((item) => (
                                <option>{item}</option>
                              ))}
                            </Input>
                          </div>
                        </Col>
                      </div>
                    );
                  })}
              </Row>

              <Card>
                <CardBody>
                  <Table className="no-wrap v-middle" responsive id="emp">
                    <thead>
                      <tr className="border-0">
                        {selectedOption &&
                          selectedOption.map(({ value, label }) => {
                            return <th className="border-0">{label}</th>;
                          })}
                        {this.state.qrcode && (
                          <th className="border-0">QR Code</th>
                        )}
                      </tr>
                    </thead>

                    {newFilter &&
                      newFilter.map((item, index) => {
                        const link = window.location.href.replace(
                          "/tarjetasfiltro",
                          "/tarjeta/"
                        );

                        return (
                          <tbody key={index}>
                            <tr>
                              {selectedOption &&
                                selectedOption.map(
                                  ({ value, label }, index) => {
                                    return item[label] === "fecha" ? (
                                      <td key={index}>
                                        {moment(item[value]).fromNow()}
                                      </td>
                                    ) : (
                                      <td key={index}>{item[value]}</td>
                                    );
                                  }
                                )}
                              {this.state.qrcode && (
                                <td>
                                  <QRCode value={link + item._id} />
                                  <h4 className="mt-3">
                                    Tarjeta {item.color} N°{item.numero}
                                  </h4>
                                </td>
                              )}
                            </tr>
                          </tbody>
                        );
                      })}
                  </Table>
                </CardBody>
              </Card>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tarjetas: state.tarjetas,
    filters: state.filters,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  getTarjetas,
  agregarFilter,
  getFilters,
})(MisTarjetasFiltro);
