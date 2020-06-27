import {
  GET_TARJETAS,
  CARGANDO_TARJETAS,
  AGREGAR_TARJETA,
  CERRAR_TARJETA,
  BORRAR_TARJETA,
  AGREGAR_TARJETA_AMARILLA,
  CERRAR_TARJETA_AMARILLA,
} from "./types";

import { returnErrors } from "./errorActions";
import axios from "axios";

export const getTarjetas = () => (dispatch) => {
  dispatch(cargandoTarjetas());
  axios
    .get("/api/tarjetas")
    .then((res) =>
      dispatch({
        type: GET_TARJETAS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const agregarTarjeta = (tarjeta) => (dispatch, getState) => {
  axios
    .post("/api/tarjetas", tarjeta)
    .then((res) =>
      dispatch({
        type: AGREGAR_TARJETA,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "AGREGAR_TARJETA_ERROR"
        )
      )
    );
};

export const agregarTarjetaAmarilla = (tarjeta) => (dispatch) => {
  axios
    .post("/api/tarjetas/amarilla", tarjeta)
    .then((res) =>
      dispatch({
        type: AGREGAR_TARJETA_AMARILLA,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "AGREGAR_TARJETA_AMARILLA_ERROR"
        )
      )
    );
};

export const cerrarTarjeta = (tarjeta) => (dispatch, getState) => {
  axios
    .post("/api/tarjetas/cerrar", tarjeta)
    .then((res) =>
      dispatch({
        type: CERRAR_TARJETA,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "CERRAR_TARJETA_ERROR"
        )
      )
    );
};

export const cerrarTarjetaAmarilla = (tarjeta) => (dispatch, getState) => {
  axios
    .post("/api/tarjetas/cerrar/amarilla", tarjeta)
    .then((res) =>
      dispatch({
        type: CERRAR_TARJETA_AMARILLA,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "CERRAR_TARJETA_AMARILLA_ERROR"
        )
      )
    );
};

export const cargandoTarjetas = () => {
  return {
    type: CARGANDO_TARJETAS,
  };
};

export const borrarTarjeta = (id) => (dispatch) => {
  axios
    .delete(`/api/tarjetas/${id}`)
    .then((res) =>
      dispatch({
        type: BORRAR_TARJETA,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
