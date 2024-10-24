"use client";

import CycleSelect from "./cycle-select";
import React, { useState, useEffect } from "react";
import SubjectSelect from "./subject-select";
import StudentLossChart from "./student-lost-bar-chart";
import Loading from "./loading";

const MainReport = () => {
  const [selectedCycle, setSelectedCycle] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Iniciar carga
      // Simulación de carga de datos (puedes reemplazar esto con tu API real)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simular un retraso
      setLoading(false); // Finalizar carga
    };

    fetchData();
  }, []); // Se ejecuta una vez al montar el componente

  return (
    <div className="bg-white p-4 border rounded-md shadow-sm">
      {loading ? ( // Mostrar loading si está cargando
        <Loading />
      ) : (
        <>
          <div>
            <h1 className="font-semibold text-green-700">
              Universidad Popular del Cesar
            </h1>
            <p>Consultar reporte de tasa de mortalidad académica:</p>
          </div>
          <div className="mt-2 space-y-2">
            <CycleSelect onSelect={setSelectedCycle} />
            <SubjectSelect
              ciclo={selectedCycle}
              onSelect={setSelectedSubject}
            />
          </div>

          {selectedSubject && (
            <div className="p-2 mt-2 border rounded-md shadow-sm">
              <p className="font-semibold text-green-700 text-center">
                Reporte de {selectedSubject}
              </p>
              <StudentLossChart selectedSubject={selectedSubject} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MainReport;
