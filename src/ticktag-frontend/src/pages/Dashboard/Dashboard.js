import React, { useEffect, useState } from "react";
import {
  getEventAgeClassificationBreakdown,
  getAverageEventCapacity,
  getEventDistributionByDate,
  getTopEventsByCapacity,
  getEventCapacityUtilization,
} from "../../services/apiService";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [ageClassification, setAgeClassification] = useState(null);
  const [averageCapacity, setAverageCapacity] = useState(null);
  const [eventDistribution, setEventDistribution] = useState(null);
  const [topEvents, setTopEvents] = useState([]);
  const [eventCapacityUtilization, setEventCapacityUtilization] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ageResponse = await getEventAgeClassificationBreakdown();
        setAgeClassification(ageResponse);

        const capacityResponse = await getAverageEventCapacity();
        setAverageCapacity(capacityResponse.capacidadeMedia);

        const distributionResponse = await getEventDistributionByDate();
        setEventDistribution(distributionResponse);

        const topEventsResponse = await getTopEventsByCapacity(5);
        setTopEvents(topEventsResponse);

        const utilizationResponse = await getEventCapacityUtilization();
        setEventCapacityUtilization(utilizationResponse);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao buscar dados da API");
      }
    };

    fetchData();
  }, []);

  // Dados para o gráfico de classificação etária
  const ageChartData = {
    labels: ageClassification ? Object.keys(ageClassification) : [],
    datasets: [
      {
        label: "Classificação Etária",
        data: ageClassification ? Object.values(ageClassification) : [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // Dados para o gráfico de distribuição de eventos por data
  const distributionChartData = {
    labels: eventDistribution ? Object.keys(eventDistribution) : [],
    datasets: [
      {
        label: "Distribuição de Eventos",
        data: eventDistribution ? Object.values(eventDistribution) : [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Dados para o gráfico de utilização de capacidade
  const capacityUtilizationChartData = {
    labels: eventCapacityUtilization.map((event) => event.nomeEvento),
    datasets: [
      {
        label: "Utilização (%)",
        data: eventCapacityUtilization.map((event) => event.percentUtilizacao),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Dashboard</h1>
      {error && <p className="alert alert-danger">{error}</p>}

      <div className="row">
        {/* Capacidade Média */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Capacidade Média dos Eventos</h5>
              <p className="card-text display-4">
                {averageCapacity !== null
                  ? averageCapacity.toFixed(1)
                  : "Carregando..."}
              </p>
            </div>
          </div>
        </div>

        {/* Classificação Etária */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Classificação Etária dos Eventos</h5>
              <Pie data={ageChartData} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Distribuição de Eventos por Data */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Distribuição de Eventos por Data</h5>
              <Bar
                data={distributionChartData}
                options={{ responsive: true }}
              />
            </div>
          </div>
        </div>

        {/* Utilização de Capacidade */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Utilização de Capacidade dos Eventos
              </h5>
              <Bar
                data={capacityUtilizationChartData}
                options={{ responsive: true }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Top Eventos por Capacidade */}
        <div className="col-md-12 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Top Eventos por Capacidade</h5>
              <ul className="list-group">
                {topEvents.length > 0 ? (
                  topEvents.map((event, index) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={index}
                    >
                      {event.nomeEvento}
                      <span>Capacidade: {event.lotacaoMaxima}</span>
                      <span>Utilização: {event.percentUtilizacao}%</span>
                    </li>
                  ))
                ) : (
                  <p>Carregando...</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
