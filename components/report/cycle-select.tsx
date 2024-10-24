"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CiclosResponse {
  ciclos: string[];
}

const CycleSelect: React.FC<{ onSelect: (ciclo: string) => void }> = ({
  onSelect,
}) => {
  const [ciclos, setCiclos] = useState<string[]>([]);

  useEffect(() => {
    const fetchCiclos = async () => {
      try {
        const response = await fetch(
          "https://backend-datos.onrender.com/ciclos/"
        );
        const data: CiclosResponse = await response.json();
        setCiclos(data?.ciclos || []);
      } catch (error) {
        console.error("Error fetching ciclos:", error);
        setCiclos([]);
      }
    };

    fetchCiclos();
  }, []);

  const handleSelect = (ciclo: string) => {
    onSelect(ciclo);
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Seleccione un ciclo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ciclos</SelectLabel>
          {ciclos.length > 0 ? (
            ciclos.map((ciclo) => (
              <SelectItem key={ciclo} value={ciclo}>
                {ciclo}
              </SelectItem>
            ))
          ) : (
            <SelectItem
              disabled
              value={"No hay ciclos disponibles"}
            ></SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CycleSelect;
