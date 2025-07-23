import { TableActions } from "@/components/layout/TableActions";
import { StandardTable } from "@/components/table/StandardTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { StandardDescriptionsForm } from "@/components/ui/StandardDescriptions";
import { movimentoStore } from "@/store/useStore";

import { dados, IRegistro } from "@/types/Movimento";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

interface DetalheProp {
  data_movimento: string | null;
}
const columnsB: ColumnsType<IRegistro> = [
    {
    title: "Registro",
    dataIndex: "id_registro",
    key: "id_registro",
    align: "center",
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Loja",
    dataIndex: "id_loja",
    key: "id_loja",
    width: 180,
    align: "center",
    sorter: (a, b) => a.id_loja.localeCompare(b.id_loja),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Data de Movimento",
    dataIndex: "data_movimentacao",
    key: "data_movimentacao",
    align: "center",
    width: 180,
    sortDirections: ["ascend", "descend"],
  }
];
const MovimentoView: React.FC<DetalheProp> = ({ data_movimento }) => {
  const { resumo, registro, fetchData, fetchLoja, fetchResumo } =
    movimentoStore();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState<number>(8);

  //  registro?.filter((e) => data_movimento === e.data_movimento)

  return (
    <>
   
      {/* <StandardDescriptionsForm
          data={[
            { label: "Codigo de Bandeira", children: <>{`${values?.idBandeira}`}</> },
            {
              label: "Descrição de Bandeira",
              children: <>{`${values?.descricao}`}</>,
            },
          ]}
          column={2}
        />
        <StandardDescriptionsForm
          data={[
            { label: "Data criação", children: <>{`${values?.date_create}`}</> },
            {
              label: "Data atualização",
              children: <>{`${values?.date_update}`}</>,
            },
            { label: "User ID", children: <>{`${values?.user}`}</> },
            { label: "User name", children: <>Alex Lima</> },
            { label: "Status", children: <>{`${values?.status}`}</> },
          ]}
          column={0}
        /> */}
      <StandardTable
        bordered
        style={{ paddingTop: 4, paddingBottom: 4 }}
        columns={columnsB}
        dataSource={[
          { data_movimentacao:"07/07/2025", id_loja: "1200", id_registro: "00072", status_registro: "2" },
          { data_movimentacao:"07/07/2025", id_loja: "1200", id_registro: "00073", status_registro: "1" },
          {data_movimentacao:"07/07/2025", id_loja: "1200", id_registro: "00074", status_registro: "1" },
          { id_loja: "1200", id_registro: "00075", status_registro: "3" },
        ]}
        loading={loading}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total) => `Total de registros: ${total}`,
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
      />
      </>
  

  );
};

export default MovimentoView;
