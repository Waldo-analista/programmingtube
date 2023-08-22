import { styled } from "styled-components";
import {
  CampoFormulario,
  ListaOpciones,
  DescripcionTextArea,
} from "../CamposFormulario";

import Boton from "../Boton";
import { useState } from "react";
import swal from "sweetalert";
import TablaDescripcionCategorias from "./DetalleCategoria";

const SectionAddVideo = styled.section`
  background-color: #8bb7f0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormularioAddVideo = styled.form`
  background-color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 80%;
  border-radius: 15px;
  box-shadow: 7px 8px 5px -1px rgba(0, 0, 0, 0.62);
  padding-left: 5%;
  padding-right: 5%;
  box-sizing: border-box;

  @media (min-width: 550px) {
    width: 80%;
  }

  @media (min-width: 768px) {
    width: 60%;
  }
`;

const TituloFormularioVideo = styled.h1`
  text-align: center;
  font-weight: 800;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 18px;
  padding-bottom: 1rem;
`;

const ContenedorBotonesSaveClean = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;

  @media (min-width: 550px) {
    flex-direction: row;
    column-gap: 1rem;
  }
`;

const ContenedorBotones = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;

  @media (min-width: 768px) and (max-width: 995px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 996px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ContenedorAddImage = styled.div`
  display: flex;
  flex-direction: column;
  outline: 2px solid black;
  background-color: red;
  color: white;
  border-radius: 10px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  padding-left: 3px;
  padding-right: 3px;

  &:hover {
    cursor: pointer;
    background-color: #2a7ae4;
  }

  @media (min-width: 550px) {
    flex-direction: row;
    align-items: center;
  }
`;

const FormularioAddCategoria = styled.form`
  background-color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 80%;
  border-radius: 15px;
  box-shadow: 7px 8px 5px -1px rgba(0, 0, 0, 0.62);
  padding-left: 5%;
  padding-right: 5%;
  box-sizing: border-box;
  margin-top: 2rem;

  @media (min-width: 550px) {
    width: 80%;
  }

  @media (min-width: 768px) {
    width: 60%;
  }
`;

const ContenedorBotonesCategoria = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;

  @media (min-width: 550px) {
    flex-direction: row;
    column-gap: 1rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
`;
export const FormularioVideoCategoria = ({
  categoriasArray,
  setCategoriasArray,
  handleDataFormAddVideo,
  handleDataFormAddCategoría,
  handleDeleteCategory,
}) => {
  const [nombreVideo, setNombreVideo] = useState("");
  const [url, setURL] = useState("");
  const [categoria, setCategoria] = useState("Selecciona una opción");
  const [descripcionVideo, setDescripcionVideo] = useState("");

  const [idCategoria, setIdCategoria] = useState(0);
  const [nombreCategoria, setNombreCategoría] = useState("");
  const [descripcionCategoria, setDescripcionCategoría] = useState("");
  const [colorCategoria, setcolorCategoria] = useState("#31ea1a");

  const [mostrarFormularioCategoria, setmostrarFormularioCategoria] =
    useState(true);

  const handleSubmitFormularioVideo = (evento) => {
    evento.preventDefault();

    if (categoria === "Selecciona una opción") {
      swal("¡ Advertencia !", "Debes seleccionar alguna categoría", "warning");
    } else {
      handleDataFormAddVideo({ nombreVideo, url, categoria, descripcionVideo });
    }
  };

  const handleSubmitFormularioCategoria = (evento) => {
    evento.preventDefault();
    handleDataFormAddCategoría({
      id: categoriasArray.length + 1,
      nombreCategoria,
      descripcionCategoria,
      colorCategoria,
    });
  };

  const handleClickShowFormCategoria = () => {
    setmostrarFormularioCategoria(!mostrarFormularioCategoria);
  };

  const handleCleanFormularioVideo = () => {
    setNombreVideo("");
    setURL("");
    setCategoria("Selecciona una opción");
    setDescripcionVideo("");
  };

  const handleCleanFormularioCategoria = () => {
    setNombreCategoría("");
    setDescripcionCategoría("");
    setcolorCategoria("#31ea1a");
    setIdCategoria(0);
  };

  const handleEditCategoryForm = (id) => {
    if (nombreCategoria === "" && descripcionCategoria === "") {
      swal(
        "¡ Advertencia !",
        "No puedes crear categorías sin nombre ni descripción",
        "warning"
      );
      return;
    }
    if (
      !categoriasArray.map((objetoCategoria) => objetoCategoria.id).includes(id)
    ) {
      swal(
        "¡ Advertencia !",
        "La Categoría a editar no existe. Para editar categorias, selecciona alguna categoría de la tabla haciendo click en editar y a continuación editar los campos mostrados en el formulario. Finalizar haciendo click en el botón Editar Categoría.",
        "warning"
      );
    } else {
      const nuevoArrayCategorias = categoriasArray.map((objetoCategoria) => {
        if (objetoCategoria.id === id) {
          return {
            id,
            categoria: nombreCategoria,
            descripcion: descripcionCategoria,
            color: colorCategoria,
          };
        } else {
          return objetoCategoria;
        }
      });
      setCategoriasArray(nuevoArrayCategorias);
      swal(
        "¡ Éxito !",
        `Felicidades has editado la categoría ${
          nuevoArrayCategorias.filter(
            (objetoCategoria) => objetoCategoria.id === id
          )[0].categoria
        }`,
        "success"
      );
      setIdCategoria(0);
      handleCleanFormularioCategoria();
    }
  };

  const showDataCategory = (objetoCategoria) => {
    setNombreCategoría(objetoCategoria.categoria);
    setDescripcionCategoría(objetoCategoria.descripcion);
    setcolorCategoria(objetoCategoria.color);
  };

  return (
    <>
      <SectionAddVideo>
        <FormularioAddVideo onSubmit={handleSubmitFormularioVideo}>
          <TituloFormularioVideo>Agregar Nuevo Video ✨</TituloFormularioVideo>
          <CampoFormulario
            type="text"
            titulo="Nombre del Video"
            valor={nombreVideo}
            setValue={setNombreVideo}
          />
          <CampoFormulario
            type="text"
            titulo="URL del Video de Youtube"
            valor={url}
            setValue={setURL}
          />
          <ListaOpciones
            titulo={"Categoría"}
            categorias={categoriasArray.map(
              (categoriasObjeto) => categoriasObjeto.categoria
            )}
            valor={categoria}
            setCategoria={setCategoria}
          />
          <DescripcionTextArea
            titulo="Descripción del Video"
            setValue={setDescripcionVideo}
            valor={descripcionVideo}
          />
          <ContenedorBotones>
            <ContenedorBotonesSaveClean>
              <Boton
                className="botonSaveAddVideo"
                title="Guardar Video"
                icono="iconoSave"
              />
              <Boton
                className="botonLimpiarAddVideo"
                title="Limpiar Formulario Video"
                icono="iconoClean"
                onClick={handleCleanFormularioVideo}
              />
            </ContenedorBotonesSaveClean>
            <ContenedorAddImage
              title="Mostrar Formulario de Agregar Categoría"
              onClick={handleClickShowFormCategoria}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "2px",
                }}
              >
                Nueva Categoria
                <img
                  style={{
                    width: "30px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                  }}
                  src="/img/add.png"
                  alt="Agregar Nueva Categoría"
                />
              </span>
            </ContenedorAddImage>
          </ContenedorBotones>
        </FormularioAddVideo>
        {mostrarFormularioCategoria ? (
          <FormularioAddCategoria onSubmit={handleSubmitFormularioCategoria}>
            <TituloFormularioVideo>
              Agregar Nueva Categoría ✨/ Editar Categoría Existente ✏️
            </TituloFormularioVideo>
            <CampoFormulario
              type="text"
              titulo="Nombre de la Categoría"
              valor={nombreCategoria}
              setValue={setNombreCategoría}
            />
            <DescripcionTextArea
              titulo="Descripción de la Categoría"
              setValue={setDescripcionCategoría}
              valor={descripcionCategoria}
            />
            <CampoFormulario
              type="color"
              titulo="Selecciona Color Categoría"
              valor={colorCategoria}
              setValue={setcolorCategoria}
            />
            <ContenedorBotonesCategoria>
              <Boton
                className="botonSaveCategory"
                title="Guardar Categoría"
                icono="iconoSave"
              />
              <Boton
                className="botonLimpiarCategoria"
                title="Limpiar Categoría"
                icono="iconoClean"
                onClick={handleCleanFormularioCategoria}
              />
              <Boton
                className="botonEditarCategoria"
                title="Editar Categoría"
                icono="iconoEdit"
                onClick={() => handleEditCategoryForm(idCategoria)}
              />
            </ContenedorBotonesCategoria>
            <TablaDescripcionCategorias
              categoriasArray={categoriasArray}
              handleDeleteCategory={handleDeleteCategory}
              showDataCategory={showDataCategory}
              setIdCategoria={setIdCategoria}
            />
          </FormularioAddCategoria>
        ) : (
          false
        )}
      </SectionAddVideo>
    </>
  );
};
