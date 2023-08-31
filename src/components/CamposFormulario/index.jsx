import { styled } from "styled-components";
import { BsArrowDownSquare } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { validarCampoVacio } from "./validaciones";

const ContenedorCampoFormulario = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  padding-bottom: 1rem;
  margin-top: 1rem;
  .SeleccionaColorCategoría {
    width: 50%;
    height: 2rem;
  }
  .SeleccionaColorCategoría:hover {
    cursor: pointer;
  }
`;

const InputFormulario = styled.input`
  padding: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
`;

export const CampoFormulario = (props) => {
  const { type, titulo, setValue, valor } = props;
  const [valid, setValid] = useState(null);

  const handleChangeValue = (evento) => {
    setValue(evento.target.value);
    setValid(validarCampoVacio(evento.target.value));
  };

  return (
    <>
      <ContenedorCampoFormulario>
        <label
          htmlFor={titulo}
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          {titulo}
          <BsArrowDownSquare style={{ paddingLeft: "5px" }} />
        </label>
        {type === "color" ? (
          <TextField
            color="success"
            id={titulo}
            type={type}
            required={true}
            onChange={handleChangeValue}
            value={valor}
            sx={{ width: "100%" }}
          />
        ) : (
          <TextField
            color="success"
            error={valid === false}
            helperText={
              valid === false ? "Este campo no puede estar vacío" : ""
            }
            id={titulo}
            label={titulo}
            type={type}
            required={true}
            onChange={handleChangeValue}
            onBlur={(evento) => {
              setValid(validarCampoVacio(evento.target.value));
            }}
            value={valor}
            sx={{ width: "100%" }}
          />
        )}
      </ContenedorCampoFormulario>
    </>
  );
};

const ContenedorListaOpciones = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  padding-bottom: 1rem;
`;
export const ListaOpciones = (props) => {
  const { titulo, categorias, valor, setCategoria } = props;

  const handleChangeCategoria = (evento) => {
    setCategoria(evento.target.value);
  };

  return (
    <>
      <ContenedorListaOpciones>
        <label
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          Selecciona alguna {titulo}{" "}
          <BsArrowDownSquare style={{ paddingLeft: "5px" }} />
        </label>
        <select
          style={{
            width: "80%",
            padding: "5px",
            borderRadius: "5px",
            boxSizing: "border-box",
            border: "2px solid",
          }}
          value={valor}
          onChange={handleChangeCategoria}
        >
          <option disabled hidden value="Selecciona una opción">
            Selecciona una opción
          </option>
          {categorias.map((categoria, index) => {
            return <option key={index}>{categoria}</option>;
          })}
        </select>
      </ContenedorListaOpciones>
    </>
  );
};

const ContenedorDescripcionTextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
`;
export const DescripcionTextArea = (props) => {
  const { titulo, setValue, valor } = props;

  const [valid, setValid] = useState(null);
  const handleChangeValue = (e) => {
    setValue(e.target.value);
    setValid(validarCampoVacio(e.target.value));
  };
  return (
    <>
      <ContenedorDescripcionTextArea>
        <label
          htmlFor={titulo}
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          {titulo}
          <BsArrowDownSquare style={{ paddingLeft: "5px" }} />{" "}
        </label>
        <TextField
          color="success"
          error={valid === false}
          helperText={valid === false ? "Esta área no puede estar vacía" : ""}
          id={titulo}
          label={titulo}
          sx={{
            width: "100%",
            resize: "none",
            padding: "5px",
            borderRadius: "5px",
          }}
          rows={7}
          multiline
          required={true}
          onChange={handleChangeValue}
          onBlur={(e) => setValid(validarCampoVacio(e.target.value))}
          value={valor}
        ></TextField>
      </ContenedorDescripcionTextArea>
    </>
  );
};