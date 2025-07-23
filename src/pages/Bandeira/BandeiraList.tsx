import { Form, Button, Row, Col, Space, Select, Divider, Collapse } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  BarcodeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { StandardTable } from "@/components/table/StandardTable";
import { ColumnsType } from "antd/es/table";
import { TableActions } from "@/components/layout/TableActions";
import ModalBase from "@/components/ui/ModalBase";
import { BandeiraForm } from "@/components/form/BandeiraForm";
import { BandeiraStore } from "@/store/useStore";
import FiltroFormBase from "@/components/form/FiltroFormBase";
import BandeiraView from "./BandeiraView";
import { IBandeira, dados } from "@/types/Bandeira";
import { SectionCard } from "@/components/ui/SectionCard";
import { CollapseSection } from "@/components/ui/CollapseSection";
import { PageActions } from "@/components/layout/PageActions";

const { Panel } = Collapse;

const BandeiraList = () => {
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(8);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState<any>({});
  const [openNewEdit, setOpenNewEdit] = useState(false);
  const [setopenView, setOpenView] = useState(false);
  const [BandeiraSelecionada, setBandeiraSelecionada] =
    useState<IBandeira | null>(null);

  //  const idBandeiraSelecionada = Form.useWatch("idBandeira", form); // Observa
  const {
    fetchBandeira,
    Bandeiras,
    deleteBandeira,
    editeBandeira,
    filterBandeira,
    statusBandeira,
  } = BandeiraStore();
  const HandleEdit = (values: IBandeira) => {
    setBandeiraSelecionada(values);
    setOpenNewEdit(false);
    editeBandeira(values);
  };
  useEffect(() => {
    handleSearch();
    fetchBandeira();
  }, [filtros]);
  const handleSearch = () => {
    filterBandeira(filtros);
  };
  const columns: ColumnsType<IBandeira> = [
    {
      title: "Código de Bandeira",
      dataIndex: "idBandeira",
      key: "idBandeira",
      align: "center",
      width: 180,
      sorter: (a, b) => a.idBandeira.localeCompare(b.idBandeira),
      sortDirections: ["ascend", "descend"],
      // filters: dados
      //   ?.map((e) => ({ text: e.idBandeira, value: e.idBandeira }))
      //   .filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i), // remover duplicata
      // onFilter: (value, record) => record.idBandeira === value,
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      sorter: (a, b) => a.descricao.localeCompare(b.descricao),
      sortDirections: ["ascend", "descend"],
      width: 310,
    },
    {
      title: "Data Criação",
      dataIndex: "date_create",
      key: "date_create",
      width: 150,
    },
    {
      title: "Data Atualização",
      dataIndex: "date_update",
      key: "date_update",
      width: 150,
    },
    {
      title: "Usuário",
      dataIndex: "user",
      key: "user",
      width: 150,
    },
    {
      title: "Ações",
      key: "acoes",
      width: 100,

      render: (_, record) => (
        <TableActions
          onSwitchDisbled={record.status === undefined ? true : record.status}
          onSwitch={() =>
            statusBandeira(
              record.idBandeira,
              record.status === undefined ? true : record.status
            )
          }
          onDelete={() => deleteBandeira(record.idBandeira)}
          onEdit={() => (setOpenNewEdit(true), setBandeiraSelecionada(record))}
          onDetail={() => (setOpenView(true), setBandeiraSelecionada(record))}
          onJoinStatus={false}
        />
      ),
    },
  ];
  const campos = [
    {
      key: "idBandeira",
      label: "Código da Bandeira",
      component: (
        <Select
          prefix={<BarcodeOutlined style={{ marginRight: 8 }} />}
          placeholder="Selecione"
          showSearch
          optionFilterProp="label"
          style={{ width: 180 }}
          allowClear
          onChange={(value) => {
            setFiltros((prev: any) => ({ ...prev, idBandeira: value }));
          }}
          options={dados.map((e) => ({
            value: e.idBandeira,
            label: e.idBandeira,
          }))}
        />
      ),
    },
    {
      key: "descricao",
      label: "Descrição",
      component: (
        <Select
          prefix={<FileTextOutlined style={{ marginRight: 8 }} />}
          placeholder="Selecione"
          showSearch
          optionFilterProp="label"
          style={{ width: 180 }}
          allowClear
          options={dados.map((e) => ({
            /// deixar assim por conta do mock
            value: e.descricao,
            label: e.descricao,
          }))}
        />
      ),
    },
  ];
  return (
    <div style={{ margin: 5 }}>
      <CollapseSection
        defaultActiveKeys={["1", "2"]}
        onChange={(keys) => console.log("seções abertas:", keys)}
        sections={[
          {
            key: "1",
            title: "Filtros",
            content: (
              <FiltroFormBase
                form={form}
                campos={campos}
                onBuscar={(values) => setFiltros({ ...filtros, ...values })}
                onValue={(changed, all) => {
                  filterBandeira(all);
                  setFiltros(all);
                }}
                onLimpar={() => {
                  form.resetFields();
                  setFiltros({});
                }}
              />
            ),
          },
          {
            key: "2",
            title: "Resultado",
            showArrow: false,
            extra: <PageActions onExcel={() => alert("Baixar Excel...")} />,
            content: (
              <StandardTable
                bordered
                style={{ paddingTop: 4, paddingBottom: 4 }}
                columns={columns}
                dataSource={Bandeiras}
                loading={loading}
                pagination={{
                  pageSize: pageSize,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20", "50"],
                  showTotal: (total) => `Total de registros: ${total}`,
                  onShowSizeChange: (_, size) => setPageSize(size),
                }}
              />
            ),
          },
        ]}
      />
      <ModalBase onCancel={() => setOpenNewEdit(false)} open={openNewEdit}>
        <BandeiraForm
          title=""
          initialValues={BandeiraSelecionada}
          onSubmit={HandleEdit}
        />
      </ModalBase>

      <ModalBase onCancel={() => setOpenView(false)} open={setopenView}>
        <BandeiraView values={BandeiraSelecionada} />
      </ModalBase>
    </div>
    // <div style={{ margin: 5 }}>
    //   <Collapse
    //     defaultActiveKey={["1", "2"]}
    //     collapsible="icon"
    //     expandIconPosition="end"
    //     onChange={onChange}
    //   >
    //     <Panel showArrow={true} header="Filtros" key="1">
    //       <FiltroFormBase
    //         form={form}
    //         campos={campos}
    //         onBuscar={(values) => setFiltros({ ...filtros, ...values })}
    //         onValue={(changed, all) => (filterBandeira(all), setFiltros(all))}
    //         onLimpar={() => {
    //           form.resetFields();
    //           setFiltros({});
    //         }}
    //       />
    //     </Panel>
    //     <Panel showArrow={false} header="Resultado" key="2">
    //       {/* <SectionCard
    //         children={ */}
    //           <StandardTable
    //             bordered
    //             style={{ paddingTop: 4, paddingBottom: 4 }}
    //             columns={columns}
    //             dataSource={Bandeiras}
    //             loading={loading}
    //             pagination={{
    //               pageSize: pageSize,
    //               showSizeChanger: true,
    //               pageSizeOptions: ["5", "10", "20", "50"],
    //               showTotal: (total) => `Total de registros: ${total}`,
    //               onShowSizeChange: (_, size) => setPageSize(size),
    //             }}
    //           />
    //         {/* }
    //       /> */}
    //     </Panel>
    //   </Collapse>

    //   {/* <Divider orientation="left" /> */}
    //   {/* <SectionCard
    //     title="Resultado"
    //     children={

    //     }
    //   /> */}

    //   {/*Modal base da tela */}
    //   <ModalBase
    //     onCancel={() => setOpenNewEdit(false)}
    //     open={openNewEdit}
    //     children={
    //       <BandeiraForm
    //         title=""
    //         initialValues={BandeiraSelecionada}
    //         onSubmit={(e) => HandleEdit(e)}
    //       />
    //     }
    //   />
    //   <ModalBase
    //     onCancel={() => setOpenView(false)}
    //     open={setopenView}
    //     children={<BandeiraView values={BandeiraSelecionada} />}
    //   />
    // </div>
  );
};

export default BandeiraList;
