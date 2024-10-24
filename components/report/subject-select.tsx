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

// La respuesta ahora contiene "asignaturas" en vez de "subjects"
interface AsignaturasResponse {
  ciclo: string;
  asignaturas: string[];
}

const SubjectSelect: React.FC<{
  ciclo: string;
  onSelect: (asignatura: string) => void;
}> = ({ ciclo, onSelect }) => {
  const [asignaturas, setAsignaturas] = useState<string[]>([]); // Inicializamos como un array vacío

  useEffect(() => {
    const fetchAsignaturas = async () => {
      if (!ciclo) return; // No hacer la solicitud si no hay ciclo seleccionado

      try {
        const response = await fetch(
          `https://backend-datos.onrender.com/ciclos/${ciclo}`
        );
        const data: AsignaturasResponse = await response.json();
        setAsignaturas(data?.asignaturas || []); // Verificamos que 'asignaturas' exista
      } catch (error) {
        console.error("Error fetching asignaturas:", error);
        setAsignaturas([]); // En caso de error, establecemos un array vacío
      }
    };

    fetchAsignaturas();
  }, [ciclo]); // Ejecuta la solicitud cuando el ciclo cambia

  const handleSelect = (asignatura: string) => {
    onSelect(asignatura); // Notificamos al componente padre la asignatura seleccionada
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue
          placeholder={
            ciclo ? "Seleccione una asignatura" : "Seleccione un ciclo primero"
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Asignaturas</SelectLabel>
          {asignaturas.length > 0 ? (
            asignaturas.map((asignatura) => (
              <SelectItem key={asignatura} value={asignatura}>
                {asignatura}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled value={"No hay asignaturas disponibles"} />
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SubjectSelect;
