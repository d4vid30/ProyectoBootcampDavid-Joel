import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../Graficos.css"; // Asegúrate de tener el CSS abajo en tu proyecto

const Graficos = () => {
  const graficos = [
    {
      nombre: 'Producción de Energía Renovable por Fuente',
      archivo: '/gifs/top10_renovables_2022.gif',
    },
    {
      nombre: 'Participación de Energías Renovables',
      archivo: '/gifs/grafico_torta_renovables.gif',
    },
    {
      nombre: 'Tendencia en la Capacidad Instalada',
      archivo: '/gifs/grafico_lineas_capacidad_instalada.gif',
    },
    {
      nombre: 'Consumo Energía Renovable vs Convencional',
      archivo: '/gifs/grafico_area_consumo_energia.gif',
    },
  ];

  return (
    <Container className="my-5 graficos-container">
      <h1 className="text-center graficos-title mb-4">Visualización de Energías Renovables</h1>

      <Row className="mb-4">
        {graficos.map((grafico, index) => (
          <Col md={6} className="mb-4" key={index}>
            <Card className="shadow grafico-card">
              <Card.Body>
                <Card.Title className="grafico-card-title">{grafico.nombre}</Card.Title>
                <img
                  src={grafico.archivo}
                  alt={grafico.nombre}
                  className="img-fluid rounded border"
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-4">
        <Link to="/" className="btn custom-button">
          Volver a Inicio
        </Link>
      </div>
    </Container>
  );
};

export default Graficos;
