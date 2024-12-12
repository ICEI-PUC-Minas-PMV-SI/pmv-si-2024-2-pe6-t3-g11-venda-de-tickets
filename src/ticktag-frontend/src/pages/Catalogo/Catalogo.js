import React, { useEffect, useState } from "react";
import "./Catalogo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchPublicData } from "../../services/apiService";
import { Col, Container, Row } from "react-bootstrap";
import FiltroEventos from "./components/FiltroEventos";
import ListaEventos from "./components/ListaEventos";

function Catalogo() {
  const [eventos, setEventos] = useState([]);
  const [filtros, setFiltros] = useState({
    dataEvento: "",
    classificacaoIdade: "",
    lotacaoMaxima: "",
    nomeEvento: "",
    statusEvento: "",
  });

  useEffect(() => {
    carregarEventos();
  }, []);

  const aplicarFiltros = async () => {
    let filtroQuery = "";
    if (filtros.dataEvento) {
      const date = new Date(filtros.dataEvento);
      const dataFormatada = `${String(date.getDate()).padStart(
        2,
        "0"
      )}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
      filtroQuery += `dataEvento=${dataFormatada}&`;
    }

    if (filtros.classificacaoIdade)
      filtroQuery += `classificacaoIdade=${filtros.classificacaoIdade}&`;
    if (filtros.lotacaoMaxima)
      filtroQuery += `lotacaoMaxima=${filtros.lotacaoMaxima}&`;
    if (filtros.nomeEvento) filtroQuery += `nomeEvento=${filtros.nomeEvento}&`;
    if (filtros.statusEvento)
      filtroQuery += `statusEvento=${filtros.statusEvento}&`;

    try {
      const response = await fetchPublicData(
        `evento/filtro?${filtroQuery.slice(0, -1)}`
      );
      setEventos(response?.data || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const limparFiltros = () => {
    setFiltros({
      dataEvento: "",
      classificacaoIdade: "",
      lotacaoMaxima: "",
      nomeEvento: "",
      statusEvento: "",
    });
    carregarEventos();
  };

  const carregarEventos = async () => {
    try {
      const response = await fetchPublicData("evento");
      setEventos(response?.data || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  return (
    <Container fluid className="p-5">
      <Row>
        <Col md={3} lg={3}>
          <FiltroEventos
            filtros={filtros}
            onChange={setFiltros}
            onApply={aplicarFiltros}
            onClear={limparFiltros}
          />
        </Col>
        <Col md={9} lg={9}>
          {eventos.length > 0 ? (
            <Row>
              <ListaEventos eventos={eventos} />
            </Row>
          ) : (
            <Row>
              <h3 className="text-center">Nenhum evento encontrado</h3>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Catalogo;
