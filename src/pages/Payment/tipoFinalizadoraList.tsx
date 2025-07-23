import React, { useEffect, useState } from "react";
import { SectionCard } from "../../components/ui/SectionCard";
import { StandardTable } from "../../components/table/StandardTable";
import { TableActions } from "../../components/layout/TableActions";
import { ColumnsType } from "antd/es/table";
import { dados, ITipoFinalizadoraFormValues } from "@/types/IFinalizadora";
import { tipofinalizadoraStore } from "@/store/useStore";
import { Divider } from "antd";

const TipoFinalizadoraList = () => {
  const { fetch, status, tipoFinalizadora, deleteTp } = tipofinalizadoraStore();
  const [pageSize, setPageSize] = useState<number>(4);
  useEffect(() => {
    fetch();
  }, []);
  const columns: ColumnsType<ITipoFinalizadoraFormValues> = [
    {
      title: "Tipo",
      dataIndex: "descCod",
      key: "descCod",
    },
    {
      title: "Código",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },

    {
      title: "Ações",
      key: "acoes",
      width: 100,

      render: (_, record) => (
        <TableActions
          onDelete={() => deleteTp(record.id)}
          onSwitchDisbled={record.status}
          onSwitch={() =>
            status(
              record.id,
              record.status === undefined ? true : record.status
            )
          }
          onJoinStatus={record.status}
        />
      ),
    },
  ];
  return (
    <div>
       <Divider orientation="left">Cadastro Tipo Finalizadora</Divider>
        <StandardTable
          bordered
          style={{ paddingTop: 4, paddingBottom: 4 }}
          columns={columns}
          dataSource={tipoFinalizadora}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            showTotal: (total) => `Total de registros: ${total}`,
            onShowSizeChange: (_, size) => setPageSize(size),
          }}
        />
      
    </div>
  );
};

export default TipoFinalizadoraList;
