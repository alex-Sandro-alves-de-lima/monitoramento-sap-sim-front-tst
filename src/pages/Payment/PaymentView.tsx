import { StandardTable } from "@/components/table/StandardTable";
import { SectionCard } from "@/components/ui/SectionCard";
import { StandardDescriptionsForm } from "@/components/ui/StandardDescriptions";

import { json } from "stream/consumers";

interface Combinacao {
  cod_rede: string;
  cod_bandeira: string;
}

interface Finalizadora {
  descricao: string;
  id: string;
  idTipo: string;
  status: boolean;
  descCod: string;
}

export interface FinalizadoraData {
  cod_int_sap_sim: string;
  cod_finalizadora?: string;
  tipoFinalizadora: string;
  combinacoes: Combinacao[];
  finalizadora: Finalizadora;
  id: string;
  cod_bandeira: string;
  cod_rede: string;
  data_ultima_modificacao: string; // Pode ser Date se fizer parse
  data_cadastro: string; // Pode ser Date também
  user_id_mod: string;
  desc_finalizadora: string;
  tipo_crtl: string;
  ind_status: boolean;
  descCod: string;
}

interface FinalizadoraViewProp {
  values: FinalizadoraData | null;
}
const PaymentListView: React.FC<FinalizadoraViewProp> = ({ values }) => {

  return (
    <SectionCard title="Informações">
      <StandardDescriptionsForm
        data={[
          {
            label: "Código SAP",
            children: <>{`${values?.cod_int_sap_sim}`}</>,
          },
          {
            label: "Tipo",
            children: <>{`${values?.finalizadora.descCod}`}</>,
          },
          {
            label: "Descrição",
            children: <>{`${values?.finalizadora.descricao}`}</>,
          },
        ]}
        column={2}
      />

{values?.cod_finalizadora && <StandardDescriptionsForm
        data={[{
            label: "Código Finalizadora SIAC",
            children: <>{`${values?.cod_finalizadora}`}</>,
            },]}
        column={2}
      />
}
      <StandardDescriptionsForm
        data={[
          {
            label: "Data criação",
            children: <>{`${values?.data_cadastro}`}</>,
          },
          {
            label: "Data atualização",
            children: <>{`${values?.data_ultima_modificacao}`}</>,
          },
          { label: "User ID", children: <>{`${values?.user_id_mod}`}</> },
          { label: "User name", children: <>Alex Lima</> },
          { label: "Status", children: <>{`${values?.ind_status}`}</> },
        ]}
        column={0}
      />

      {values?.combinacoes && (
        <StandardTable
          columns={[
            {
              title: "ID Rede",
              dataIndex: "cod_rede",
              key: "cod_rede",
            },
            {
              title: "ID bandeira",
              dataIndex: "cod_bandeira",
              key: "cod_bandeira",
            },
          ]}
          dataSource={values?.combinacoes}
          pagination={{
            pageSize: 5,
            // showSizeChanger: true,
            // pageSizeOptions: ["5", "10", "20", "50"],
            showTotal: (total) => `Total de registros: ${total}`,
            // onShowSizeChange: (_, size) => setPageSize(size),
          }}
          rowKey="cod_rede"
          size="small"
        />
      )}
    </SectionCard>
  );
};

export default PaymentListView;
