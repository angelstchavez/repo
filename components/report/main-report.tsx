"use client";

import CycleSelect from "./cycle-select";
import React, { useState } from "react";
import SubjectSelect from "./subject-select";

const MainReport = () => {
  const [selectedCycle, setSelectedCycle] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  return (
    <div className="bg-white p-4 border rounded-md">
      <div>
        <h1 className="font-semibold">Universidad Popular del Cesar</h1>
        <p>Consultar reporte de tasa de mortalidad academica</p>
      </div>
      <div className="mt-2 space-y-2">
        <CycleSelect onSelect={setSelectedCycle} />
        <SubjectSelect ciclo={selectedCycle} onSelect={setSelectedSubject} />
      </div>
      <div className="mt-2 border rounded-md bg-muted">
        {selectedSubject && (
          <div className="p-2">
            <p>{selectedSubject}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainReport;
