/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CycleSelect from "./cycle-select";
import React, { useState, useEffect } from "react";
import SubjectSelect from "./subject-select";
import StudentLossChart from "./student-lost-bar-chart";
import Loading from "./loading";
import Image from "next/image";

const MainReport = () => {
  const [selectedCycle, setSelectedCycle] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [subjectData, setSubjectData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCycle || !selectedSubject) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://backend-datos.onrender.com/ciclos/tasa-mortandad/${selectedCycle}`
        );
        const data = await response.json();

        // Filtrar los datos de la asignatura seleccionada
        const filteredData = data.data.find(
          (item: any) => item.Asignatura === selectedSubject
        );

        if (filteredData) {
          setSubjectData(filteredData);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedCycle, selectedSubject]);

  return (
    <div className="bg-white p-4 border rounded-md shadow-sm">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col items-center">
            <Image
              src="/images/logo.png"
              alt="Cargando..."
              width={128}
              height={128}
            />
            <p className="mt-1 text-center">
              Consultar reporte de tasa de mortalidad académica:
            </p>
          </div>
          <div className="mt-2 flex space-x-2">
            <CycleSelect onSelect={setSelectedCycle} />
            <SubjectSelect
              ciclo={selectedCycle}
              onSelect={setSelectedSubject}
            />
          </div>

          {subjectData && (
            <div className="p-2 mt-2">
              <p className="font-semibold text-green-700 text-center">
                Reporte de {selectedSubject}
              </p>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <StudentLossChart subjectData={subjectData} />
                </div>
              </div>
            </div>
          )}
          <div className="mt-2 text-center text-zinc-400">
            Ingeniería de Sistemas
          </div>
        </>
      )}
    </div>
  );
};

export default MainReport;
