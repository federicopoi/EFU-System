import React, { Component } from "react";
import { connect } from "react-redux";
import { getTarjetas } from "../../store/actions/tarjetaActions";
import { Redirect } from "react-router-dom";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import GraficoAmarillas from "./tarjetasamarillas/GraficoAmarillas";
import GraficoRojas from "./tarjetasrojas/GraficoRojas";
import GraficoAzules from "./tarjetasazules/GraficoAzules";
import GraficoVerdes from "./tarjetasverdes/GraficoVerdes";
import GraficoAutonomia from "./indiceautonomia/GraficoAutonomia";
import GraficoRiesgo from "./mapasderiesgo/GraficoRiesgo";
import GraficoFiltro from "./tarjetasfiltro/GraficoFiltro";

class DashBoard extends Component {
  state = {
    activeTab: "1",
  };
  componentDidMount() {
    this.props.getTarjetas();
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }
  render() {
    const { tarjetas } = this.props.tarjetas;
    const { isAuthenticated, isLoading } = this.props;
    if (isAuthenticated === false && isLoading === false)
      return <Redirect to="/login" />;
    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1",
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    Tarjetas Amarillas
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2",
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    Tarjetas Rojas
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3",
                    })}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    Tarjetas Verdes
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "4",
                    })}
                    onClick={() => {
                      this.toggle("4");
                    }}
                  >
                    Tarjetas Azules
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "5",
                    })}
                    onClick={() => {
                      this.toggle("5");
                    }}
                  >
                    Indice de autonomia
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "6",
                    })}
                    onClick={() => {
                      this.toggle("6");
                    }}
                  >
                    Mapas de riesgo
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "7",
                    })}
                    onClick={() => {
                      this.toggle("7");
                    }}
                  >
                    Grafico personalizado
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row className="mt-3">
                    <Col sm="12">
                      <GraficoAmarillas tarjetas={tarjetas}></GraficoAmarillas>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row className="mt-3">
                    <Col sm="12">
                      <GraficoRojas tarjetas={tarjetas}></GraficoRojas>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row className="mt-3">
                    <Col sm="12">
                      <GraficoVerdes tarjetas={tarjetas}></GraficoVerdes>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <Row className="mt-3">
                    <Col sm="12">
                      <GraficoAzules tarjetas={tarjetas}></GraficoAzules>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="5">
                  <Row className="mt-3">
                    <Col sm="12">
                      <GraficoAutonomia tarjetas={tarjetas}></GraficoAutonomia>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="6">
                  <Row className="mt-3">
                    <Col sm="12">
                      <GraficoRiesgo tarjetas={tarjetas}></GraficoRiesgo>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="7">
                  <Row className="mt-3">
                    <Col sm="12">
                      <GraficoFiltro tarjetas={tarjetas}></GraficoFiltro>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tarjetas: state.tarjetas,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, { getTarjetas })(DashBoard);
