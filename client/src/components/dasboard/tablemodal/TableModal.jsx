import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Table,
} from "reactstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const TableModal = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="">
              <h3 className="mb-3">Tabla</h3>
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
          <Table className="no-wrap v-middle" responsive id="emp">
            <thead>
              <tr className="border-0">
                <th className="border-0">Mes</th>
                {props.fechas.map((item) => {
                  return <th className="border-0">{item}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Acumuladas (abiertas)</td>
                {props.fechas.map((item, index) => {
                  return <td>{props.tarjetasFiltro1[index]}</td>;
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Acumuladas (cerradas)</td>
                {props.fechas.map((item, index) => {
                  return <td>{props.tarjetasFiltro2[index]}</td>;
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Porcentaje (cerradas)</td>
                {props.fechas.map((item, index) => {
                  const porcentaje =
                    (props.tarjetasFiltro3[index] /
                      props.tarjetasFiltro1[index]) *
                    100;
                  return <td>{porcentaje.toString().slice(0, 4)}%</td>;
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Por mes abiertas</td>
                {props.fechas.map((item, index) => {
                  return <td>{props.tarjetasmesabiertas[index]}</td>;
                })}
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Por mes cerradas</td>
                {props.fechas.map((item, index) => {
                  return <td>{props.tarjetasmescerradas[index]}</td>;
                })}
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default TableModal;
