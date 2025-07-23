import React, { useState } from "react";
import { DatePicker, Button } from "antd";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

export default function RangePickerExample() {
  // Estado para guardar o intervalo selecionado
  const [range, setRange] = useState<[Dayjs, Dayjs] | null>(null);

  // Ao mudar o intervalo
  const onChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    if (dates && dates[0] && dates[1]) {
      setRange([dates[0], dates[1]]);
    } else {
      setRange(null);
    }
  };

  // Função para mostrar o intervalo formatado
  const mostrarIntervalo = () => {
    if (!range) {
      alert("Nenhum intervalo selecionado");
      return;
    }

    // Converte Dayjs para string no formato DD/MM/YYYY
    const dataInicio = range[0].format("DD/MM/YYYY");
    const dataFim = range[1].format("DD/MM/YYYY");

    alert(`Intervalo selecionado: ${dataInicio} até ${dataFim}`);
  };

  return (
    <div>
      <DatePicker.RangePicker onChange={onChange} />
      <Button onClick={mostrarIntervalo} style={{ marginLeft: 8 }}>
        Mostrar intervalo
      </Button>
      <div style={{ marginTop: 16 }}>
        {/* Mostrar no JSX o intervalo selecionado */}
        {range
          ? `Selecionado: ${range[0].format("DD/MM/YYYY")} - ${range[1].format("DD/MM/YYYY")}`
          : "Nenhum intervalo selecionado"}
      </div>
    </div>
  );
}
