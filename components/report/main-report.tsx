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
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

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

          {selectedSubject && (
            <div className="p-2 mt-2">
              <p className="font-semibold text-green-700 text-center">
                Reporte de {selectedSubject}
              </p>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <StudentLossChart selectedSubject={selectedSubject} />
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
