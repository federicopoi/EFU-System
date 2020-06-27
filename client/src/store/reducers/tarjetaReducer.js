import {
  GET_TARJETAS,
  CARGANDO_TARJETAS,
  AGREGAR_TARJETA,
  CERRAR_TARJETA,
  BORRAR_TARJETA,
  AGREGAR_TARJETA_AMARILLA,
  CERRAR_TARJETA_AMARILLA,
} from "../actions/types";
const initState = {
  tarjetas: [],
  cargando: false,
  agregarsuccess: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_TARJETAS:
      return {
        ...state,
        tarjetas: action.payload,
        cargando: false,
        agregarsuccess: false,
      };
    case AGREGAR_TARJETA:
    case AGREGAR_TARJETA_AMARILLA:
      return {
        ...state,
        tarjetas: [action.payload, ...state.tarjetas],
        agregarsuccess: true,
      };
    case CERRAR_TARJETA:
    case CERRAR_TARJETA_AMARILLA:
      return Object.assign({}, state, {
        tarjetas: state.tarjetas.map((tarjeta) => {
          return tarjeta._id === action.payload._id ? action.payload : tarjeta;
        }), // replace matched item and returns the array
        agregarsuccess: true,
      });
    case BORRAR_TARJETA:
      return {
        ...state,
        tarjetas: state.tarjetas.filter(
          (tarjeta) => tarjeta._id !== action.payload
        ),
      };
    case CARGANDO_TARJETAS:
      return {
        ...state,
        cargando: true,
      };
    default:
      return state;
  }
}
