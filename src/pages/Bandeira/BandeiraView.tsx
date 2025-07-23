import { StandardTable } from "@/components/table/StandardTable";
import { SectionCard } from "@/components/ui/SectionCard";
import {
  StandardDescriptionsForm,
} from "@/components/ui/StandardDescriptions";
import { IBandeira } from "@/types/Bandeira";

interface CadastroBandeiraModeloDetalheProp {
  values: IBandeira | null;
}
const BandeiraView: React.FC<CadastroBandeiraModeloDetalheProp> = ({ values }) => {
  return (
 
      <SectionCard
        title="Informações de Bandeira ">
        <StandardDescriptionsForm
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
        />
        {/* <StandardTable
          columns={[
            {
              title: "ID Rede",
              dataIndex: "idRede",
              key: "idRede",
            },
            {
              title: "Descrição rede",
              dataIndex: "descricao",
              key: "descricao",
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
            //       // render: (_, record) =><PageActions onEdit={() => handleEditar(record.idBandeira, record.descricao)}/> ,
            //       render: (_, record) => (
            //         <TableActions
            //           onDelete={() => {}}
            //           onEdit={() =>{""}}
            //         />
            //       ),
            //     },
          ]}
          dataSource={values?.listRede}
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

export default BandeiraView;
