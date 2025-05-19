import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../estilos/EstimadoRenovable.css";

const EstimadorRenovable = () => {
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState("");
  const [anio, setAnio] = useState("2021");
  const [consumo, setConsumo] = useState("");
  const [resultado, setResultado] = useState(null);
  const [resultado1, setResultado1] = useState(null);
  const [resultado2, setResultado2] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/paises")
      .then(res => {
        setPaises(res.data);
      })
      .catch(() => setError("Error cargando países"));
  }, []);

  const calcular = async () => {
    try {
      const res = await axios.post("http://localhost:8000/calcular-renovable", {
        pais: pais,
        anio: parseInt(anio),
        consumo_kwh: parseFloat(consumo)
      });
      setResultado(res.data.proporcion_renovable.toFixed(2));
      setResultado1(res.data.consumo_renovable_estimado.toFixed(2));
      setResultado2(res.data.porcentaje_estimado.toFixed(2));
      setError("");
    } catch (err) {
      setResultado(null);
      setError("Error al calcular. Verifica los datos.");
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center info-estimador-container">
      <div className="card shadow-lg p-5 card-estimador">
        <h2 className="text-center text-white mb-4">💡 Estimador de Energía Renovable</h2>

        <div className="mb-3">
          <label className="form-label fw-bold text-white">🌍 País</label>
          <select className="form-select" value={pais} onChange={e => setPais(e.target.value)}>
            <option value="">-- Selecciona un país --</option>
            {paises.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold text-white">📅 Año</label>
          <input
            type="number"
            className="form-control"
            value={anio}
            max="2021"
            onChange={e => setAnio(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold text-white">⚡ Consumo eléctrico total (kWh)</label>
          <input
            type="number"
            className="form-control"
            value={consumo}
            onChange={e => setConsumo(e.target.value)}
            placeholder="Ej: 1200"
          />
        </div>

        <div className="d-grid mt-3">
          <button className="btn btn-gradient fw-bold" onClick={calcular}>
            Calcular Proporción
          </button>
        </div>

        {resultado && (
          <div className="mt-4">
            <div className="alert alert-success text-center rounded-4">
              <p className="mb-1"><strong>{resultado}%</strong> de tu consumo podría cubrirse con energías renovables</p>
              <p className="mb-1">🔋 Estimado: <strong>{resultado1} kWh</strong></p>
              <p className="mb-0">📈 Porcentaje estimado futuro: <strong>{resultado2}%</strong></p>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-4 text-center rounded-4">{error}</div>
        )}

        <div className="d-grid mt-3">
          <Link to="/" className="btn btn-outline-light">
            ⬅ Regresar al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EstimadorRenovable;
