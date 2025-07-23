import { StandardTable } from "@/components/table/StandardTable";
import { SectionCard } from "@/components/ui/SectionCard";
import {
  StandardDescriptionsForm,
} from "@/components/ui/StandardDescriptions";
import { IRede } from "@/types/Rede";
interface CadastroRedeModeloDetalheProp {
  values: IRede | null;
}
const RedeView: React.FC<CadastroRedeModeloDetalheProp> = ({ values }) => {
  return (
 
      <SectionCard
        title="Informações de Rede ">
        <StandardDescriptionsForm
          data={[
            { label: "Codigo de Rede", children: <>{`${values?.idRede}`}</> },
            {
              label: "Descrição de Rede",
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
            { label: "Id SAP", children: <>{`${values?.idVinculado}`}</> },
          ]}
          column={0}
        />
        {/* <StandardTable
          columns={[
            {
              title: "ID Bandeira",
              dataIndex: "idBandeira",
              key: "idBandeira",
            },
            {
              title: "Descrição bandeira",
              dataIndex: "descricaoBandeira",
              key: "descricaoBandeira",
            },
            {
              title: "Data criação",
              dataIndex: "date_create",
              key: "date_create",
            },
            {
              title: "Data atualização",
              dataIndex: "date_update",
              key: "date_update",
            },
            // {
            //       title: "Ações",
            //       key: "acoes",
            //       // render: (_, record) =><PageActions onEdit={() => handleEditar(record.idRede, record.descricao)}/> ,
            //       render: (_, record) => (
            //         <TableActions
            //           onDelete={() => {}}
            //           onEdit={() =>{""}}
            //         />
            //       ),
            //     },
          ]}
          dataSource={values?.listBandeira}
          pagination={{
            pageSize: 5,
            // showSizeChanger: true,
            // pageSizeOptions: ["5", "10", "20", "50"],
            showTotal: (total) => `Total de registros: ${total}`,
            // onShowSizeChange: (_, size) => setPageSize(size),
          }}
          rowKey="idBandeira"
          size="small"
        /> */}
      </SectionCard>

  );
};

export default RedeView;
