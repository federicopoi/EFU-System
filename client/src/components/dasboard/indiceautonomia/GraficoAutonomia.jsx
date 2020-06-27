import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Label, Input } from "reactstrap";
import TableModalAutonomia from "../tablemodalautonomia/TableModalAutonomia";
import { Row, Col, Card, CardBody } from "reactstrap";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
export class GraficoAutonomia extends Component {
  constructor() {
    super();
    this.state = {
      equipo: "",
    };
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }
  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }

    this.chart.render();
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { tarjetas } = this.props;

    var filter = {
      equipo: this.state.equipo && this.state.equipo,
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

    const arrEquipos = tarjetas.map(({ equipo }) => equipo);
    const unicosEquipos = Array.from(new Set(arrEquipos));

    // Formulas para "Indice de autonomia"

    // Filtro todos los meses en el que hay tarjetas convertidas
    const fechasTarjetasConvertidas = newFilter
      // .filter(({ estado, convertida }) => convertida === true)
      .map(({ fecha }) => fecha.substr(0, 7));

    // Borro todos los meses repetidos
    let fechasTarjetasConvertidas1 = new Set(fechasTarjetasConvertidas);
    const fechasTarjetasConvertidasUnicas = [...fechasTarjetasConvertidas1];

    // Numero total de tarjetas de cada mes (no acumulado)
    let array1 = fechasTarjetasConvertidasUnicas.sort().map((item, index) => {
      return newFilter.filter(
        ({ estado, fecha, color }) =>
          color === "Azul" &&
          estado === "Cerrada" &&
          fecha.substr(4, 4).replace("-", "").replace("-", "") ===
            item.slice(5, 7)
      ).length;
    });

    // Acumulado de tarjetas por mes
    const array1Acum = array1.map((elem, index) =>
      array1.slice(0, index + 1).reduce((a, b) => a + b)
    );

    // Numero total de tarjetas de cada mes (no acumulado)
    let array2 = fechasTarjetasConvertidasUnicas.sort().map((item, index) => {
      return newFilter.filter(
        ({ estado, fecha, convertida }) =>
          convertida === true &&
          estado === "Cerrada" &&
          fecha.substr(4, 4).replace("-", "").replace("-", "") ===
            item.slice(5, 7)
      ).length;
    });

    // Acumulado de tarjetas por mes
    const array2Acum = array2.map((elem, index) =>
      array2.slice(0, index + 1).reduce((a, b) => a + b)
    );

    // Numero total de tarjetas de cada mes (no acumulado)
    let array3 = fechasTarjetasConvertidasUnicas.sort().map((item, index) => {
      return newFilter.filter(
        ({ estado, fecha }) =>
          estado === "Cerrada" &&
          fecha.substr(4, 4).replace("-", "").replace("-", "") ===
            item.slice(5, 7)
      ).length;
    });

    // Acumulado de tarjetas por mes
    const array3Acum = array3.map((elem, index) =>
      array3.slice(0, index + 1).reduce((a, b) => a + b)
    );

    // Numero total de tarjetas de cada mes (no acumulado)
    let arrayAcumFinal = fechasTarjetasConvertidasUnicas
      .sort()
      .map((item, index) => {
        return (
          ((array1Acum[index] + array2Acum[index]) / array3Acum[index]) * 100
        );
      });

    // Datos para el grafico
    const ConvertidasData = [
      fechasTarjetasConvertidasUnicas.sort().map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y: arrayAcumFinal[index],
        };
      }),
    ];

    CanvasJS.addCultureInfo("es", {
      decimalSeparator: ",", // Observe ToolTip Number Format
      digitGroupSeparator: ".", // Observe axisY labels

      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
    });
    const options = {
      animationEnabled: true,
      culture: "es",
      axisX: {
        valueFormatString: "MMMM",

        interval: 1,
        intervalType: "month",
      },
      axisY: {
        suffix: "%",
        lineColor: "#000000",
        tickColor: "#000000",
        labelFontColor: "#000000",
      },

      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries,
        verticalAlign: "top",
      },
      data: [
        {
          color: "#1BA7F7",
          type: "column",
          name: "Indice de autonomia",
          showInLegend: true,
          xValueFormatString: "MMMM YYYY",
          dataPoints: ConvertidasData[0],
        },
      ],
    };

    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <h3 className="mb-3">Indice de autonomia</h3>
                <CanvasJSChart
                  culture="en"
                  options={options}
                  onRef={(ref) => (this.chart = ref)}
                />
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <h3>Tabla</h3>
                <TableModalAutonomia
                  tarjetasFiltro1={arrayAcumFinal}
                  fechas={fechasTarjetasConvertidasUnicas}
                ></TableModalAutonomia>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h3>Filtros</h3>
                <Label for="equipo">Equipo</Label>
                <Input
                  type="select"
                  name="equipo"
                  id="equipo"
                  onChange={this.onChange}
                >
                  <option></option>
                  {unicosEquipos.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
                </Input>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GraficoAutonomia;
