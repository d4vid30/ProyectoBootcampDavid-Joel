import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../InfoEnergia.css";

const energias = [
  {
    titulo: "Energía Solar",
    imagen: "energia-solar.webp",
    descripcion: "Aprovecha la radiación solar para generar electricidad o calor. Es una de las más accesibles y populares en hogares e industrias."
  },
  {
    titulo: "Energía Eólica",
    imagen: "eolica.webp",
    descripcion: "Utiliza la fuerza del viento mediante aerogeneradores para producir energía limpia y constante, ideal en zonas con buen flujo de viento."
  },
  {
    titulo: "Energía Hidráulica",
    imagen: "Hidraulica.webp",
    descripcion: "Genera electricidad aprovechando el movimiento del agua, como ríos o presas. Es una fuente potente y constante de energía."
  },
  {
    titulo: "Energía Geotérmica",
    imagen: "geotermica.jpg",
    descripcion: "Extrae el calor del interior de la Tierra para generar electricidad o calefacción. Muy eficiente en zonas volcánicas o geotermales."
  },
  {
    titulo: "Energía de Biomasa",
    imagen: "biomasa.jpeg",
    descripcion: "Se produce a partir de materia orgánica como restos vegetales, residuos agrícolas o forestales. Es renovable y ayuda a reducir desechos."
  },
  {
    titulo: "Energía Mareomotriz y Undimotriz",
    imagen: "mareomotriz.jpg",
    descripcion: "Aprovecha el movimiento de las mareas y las olas del mar para generar electricidad. Aún en desarrollo, pero con gran potencial."
  }
];

const InfoEnergia = () => {
  return (
    <Container className="my-5 info-container">
      <h1 className="text-center info-title">Tipos de Energía Renovable</h1>
      <p className="text-center lead mb-4">
        Las energías renovables son fuentes naturales e inagotables que permiten generar electricidad de forma limpia y sostenible. Aquí te mostramos las principales.
      </p>
      <Row>
        {energias.map((energia, index) => (
          <Col md={6} lg={4} key={index}>
            <Card className="mb-4 shadow custom-card h-100">
              <Card.Img variant="top" src={energia.imagen} alt={energia.titulo} />
              <Card.Body>
                <Card.Title className="card-title">{energia.titulo}</Card.Title>
                <Card.Text>{energia.descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex flex-column align-items-center mt-4">
        <div className="button-description">
          <p>
            <strong>Ir al estimador:</strong> Calcula el posible ahorro e impacto ambiental que podrías lograr con energías renovables.
          </p>
        </div>
        <Link to="/estimador" className="btn custom-button">Ir al estimador</Link>

        <div className="button-description mt-3">
          <p>
            <strong>Ver estadísticas:</strong> Analiza el crecimiento global de las energías renovables mediante gráficos y datos actualizados.
          </p>
        </div>
        <Link to="/graficos" className="btn custom-button">Ver estadísticas</Link>
      </div>
    </Container>
  );
};

export default InfoEnergia;
