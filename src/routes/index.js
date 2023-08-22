import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Header from "../components/header";
import Footer from "../components/Footer";
import PaginaNuevoVideo from "../pages/NuevoVideo";
import { useEffect, useState } from "react";
import swal from "sweetalert";

import data from "../datos/datos_iniciales.json";

const MyWeb = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    setVideos(data.videos);
  }, []);
  const [categorias, setCategorias] = useState([
    {
      id: 1,
      categoria: "Python",
      descripcion:
        "Lenguaje Script de sintaxis sencilla y de curva de aprendizaje rapida. Posee numerosas librerias y cada vez se hace más poderoso.",
      color: "#6BD1FF",
    },
    {
      id: 2,
      categoria: "JavaScript",
      descripcion:
        "Lenguaje Script de la web el cual se hace más poderoso con el tiempo gracias a innumerables librerias y el paradigma JavaScript Everywhere",
      color: "#9CD33B",
    },
    {
      id: 3,
      categoria: "HTML",
      descripcion: "Lenguaje de marcado para estructurar sitios web.",
      color: "#00C86F",
    },
    {
      id: 4,
      categoria: "CSS",
      descripcion: "Lenguaje de estilización de etiquetas HTML.",
      color: "#6B5BE2",
    },
  ]);

  const handleDataFormAddVideo = (dataVideo) => {
    console.log(dataVideo);
  };

  const handleDataFormAddCategoría = (dataCategoria) => {
    const {
      id,
      nombreCategoria: categoria,
      descripcionCategoria: descripcion,
      colorCategoria: color,
    } = dataCategoria;

    if (
      categorias
        .map((objeto) => objeto.categoria.toLowerCase())
        .includes(categoria.toLowerCase())
    ) {
      swal("¡ Advertencia !", "Nombre de Categoria ya existe", "warning");
    } else if (
      categorias
        .map((objeto) => objeto.descripcion.toLowerCase())
        .includes(descripcion.toLowerCase())
    ) {
      swal("¡ Advertencia !", "Descripción de Categoría ya existe", "warning");
    } else if (
      categorias
        .map((objeto) => objeto.color.toLowerCase())
        .includes(color.toLowerCase())
    ) {
      swal("¡ Advertencia !", "Color de Categoría ya existe", "warning");
    } else {
      const nuevasCategorias = [
        ...categorias,
        { id, categoria, descripcion, color },
      ];

      setCategorias(nuevasCategorias);
      swal(
        "¡ Éxito !",
        "Has creado de manera exitosa una nueva categoría 😀. Ahora crea nuevos videos para esa categoría",
        "success"
      );
    }
  };

  const handleDeleteCategory = (id) => {
    const nuevasCategorias = categorias.filter((objetoCategoria) => {
      return objetoCategoria.id !== id;
    });
    setCategorias(nuevasCategorias);
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home categoriasArray={categorias} data={videos} />}
          />
          <Route
            path="/addvideo"
            element={
              <PaginaNuevoVideo
                categoriasArray={categorias}
                setCategoriasArray={setCategorias}
                handleDataFormAddVideo={handleDataFormAddVideo}
                handleDataFormAddCategoría={handleDataFormAddCategoría}
                handleDeleteCategory={handleDeleteCategory}
              />
            }
          />
          <Route path="/*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default MyWeb;
