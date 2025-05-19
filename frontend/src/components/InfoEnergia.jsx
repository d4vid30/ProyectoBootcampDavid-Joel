import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../estilos/InfoEnergia.css";

const energias = [
  {
    titulo: "Energía Solar",
    imagen: "energia-solar.webp",
    descripcion: "Aprovecha la radiación solar para generar electricidad o calor.",
    detalles: "Esta tecnología es sostenible y permite integrar sistemas de energía en hogares e industrias."
  },
  {
    titulo: "Energía Eólica",
    imagen: "eolica.webp",
    descripcion: "Utiliza la fuerza del viento para producir energía limpia.",
    detalles: "Ideal en zonas con buen flujo de viento, ofreciendo una opción renovable y eficiente."
  },
  {
    titulo: "Energía Hidráulica",
    imagen: "Hidraulica.webp",
    descripcion: "Genera electricidad aprovechando el movimiento del agua.",
    detalles: "Funciona tanto en ríos como en presas, dando una fuente constante y robusta de energía."
  },
  {
    titulo: "Energía Geotérmica",
    imagen: "geotermica.jpg",
    descripcion: "Extrae el calor del interior de la Tierra.",
    detalles: "Muy eficiente en zonas volcánicas o geotermales, ayudando a reducir emisiones."
  },
  {
    titulo: "Energía de Biomasa",
    imagen: "biomasa.jpeg",
    descripcion: "Se produce a partir de materia orgánica renovable.",
    detalles: "Aprovecha residuos agrícolas y forestales, fomentando la gestión sostenible de desechos."
  },
  {
    titulo: "Energía Mareomotriz y Undimotriz",
    imagen: "mareomotriz.jpg",
    descripcion: "Aprovecha el movimiento de las mareas y olas del mar.",
    detalles: "Aunque aún en desarrollo, presenta gran potencial para la generación de energía limpia."
  }
];

const InfoEnergia = () => {
  return (
    <Container fluid className="my-5 info-container">
      <h1 className="text-center info-title">Tipos de Energía Renovable</h1>
      <p className="text-center lead mb-4">
        Las energías renovables son fuentes naturales e inagotables para generar electricidad limpia y sostenible.
      </p>
      <Row className="g-4">
        {energias.map((energia, index) => (
          <Col md={6} lg={4} key={index}>
            <Card className="mb-4 shadow custom-card h-100">
              <Card.Img variant="top" src={energia.imagen} alt={energia.titulo} />
              <Card.Body>
                <Card.Title className="card-title">{energia.titulo}</Card.Title>
                <Card.Text>{energia.descripcion}</Card.Text>
                {energia.detalles && (
                  <Card.Text className="card-details">{energia.detalles}</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex flex-column align-items-center mt-4">
        <div className="button-description">
          <p>
            <strong>Ir al estimador:</strong> Realiza un análisis personalizado para calcular el ahorro económico y la reducción de emisiones que obtendrías al implementar energías renovables en tu hogar o negocio.
          </p>
        </div>
        <Link to="/estimador" className="btn custom-button">Ir al estimador</Link>

        <div className="button-description mt-3">
          <p>
            <strong>Ver estadísticas:</strong> Accede a gráficos interactivos y datos actualizados que muestran las tendencias y el crecimiento global del uso de energías renovables.
          </p>
        </div>
        <Link to="/graficos" className="btn custom-button">Ver estadísticas</Link>
      </div>
    </Container>
  );
};

export default InfoEnergia;
