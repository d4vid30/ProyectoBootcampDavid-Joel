import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../estilos/Graficos.css";

const Graficos = () => {
  const graficos = [
    {
      nombre: 'Producción de Energía Renovable por Fuente',
      archivo: '/gifs/top10_renovables_2022.gif',
      descripcion: 'Muestra la distribución de la producción de energía renovable según su fuente en 2022.'
    },
    {
      nombre: 'Participación de Energías Renovables',
      archivo: '/gifs/grafico_torta_renovables.gif',
      descripcion: 'Ilustra la participación porcentual de cada tipo de energía renovable en el total.'
    },
    {
      nombre: 'Tendencia en la Capacidad Instalada',
      archivo: '/gifs/grafico_lineas_capacidad_instalada.gif',
      descripcion: 'Destaca la evolución de la capacidad instalada de energías renovables a lo largo del tiempo.'
    },
    {
      nombre: 'Consumo Energía Renovable vs Convencional',
      archivo: '/gifs/grafico_area_consumo_energia.gif',
      descripcion: 'Compara el consumo de energías renovables con el de fuentes convencionales.'
    },
  ];

  return (
    <Container className="my-5 graficos-container">
      <h1 className="text-center graficos-title mb-4">Visualización de Energías Renovables</h1>

      <Row className="mb-4">
        {graficos.map((grafico, index) => (
          <Col md={6} className="mb-4" key={index}>
            <Card className="shadow grafico-card h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="grafico-card-title">{grafico.nombre}</Card.Title>
                <Card.Text>{grafico.descripcion}</Card.Text>
                <img
                  src={grafico.archivo}
                  alt={grafico.nombre}
                  className="img-fluid rounded border mt-auto"
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
