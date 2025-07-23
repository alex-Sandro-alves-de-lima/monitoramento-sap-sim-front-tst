import { useEffect, useState } from "react";
import { Form, Select, Divider } from "antd";
import { StandardTable } from "../../components/table/StandardTable";
import { TableActions } from "../../components/layout/TableActions";
import { ColumnsType } from "antd/es/table";
import { IFinalizadora } from "@/types/IFinalizadora";
import { finalizadoraStore, redeStore, BandeiraStore } from "@/store/useStore";
import { BarcodeOutlined } from "@ant-design/icons";
import FiltroFormBase from "@/components/form/FiltroFormBase";
import ModalBase from "@/components/ui/ModalBase";
import FinalizadoraView, { FinalizadoraData } from "./PaymentView";
import { CollapseSection } from "@/components/ui/CollapseSection";
import PaymentListView from "./PaymentView";
import { PageActions } from "@/components/layout/PageActions";

const PaymentList = () => {
  const [form] = Form.useForm();
  const { fetch, status, filter, deleteF, edite, finalizadora, dadosMock } =
    finalizadoraStore();
  const { redes, fetchRede } = redeStore();
  const { Bandeiras, fetchBandeira } = BandeiraStore();
  const [pageSize, setPageSize] = useState<number>(10);
  const [filtros, setFiltros] = useState<any>(null);
  const [setopenView, setOpenView] = useState(false);
  const [Selecionada, setSelecionada] = useState<FinalizadoraData | null>(null);

  useEffect(() => {
    handleSearch();
    fetch();
    fetchRede();
    fetchBandeira();
  }, [filtros]);

  const handleSearch = () => {
    filter(filtros);
  };
  const columns: ColumnsType<IFinalizadora> = [
    {
      title: "ID SAP",
      dataIndex: "cod_int_sap_sim",
      key: "cod_int_sap_sim",
      align: "center",
      width: 180,
      sorter: (a, b) => a.id.localeCompare(b.id),
      sortDirections: ["ascend", "descend"],
    },
     {
      title: " Meio de pagamento",
      dataIndex: "desc_finalizadora",
      key: "desc_finalizadora",
      align: "center",
      width: 180,
    },
    // {
    //   title: "Operação",
    //   dataIndex: "descCod",
    //   key: "descCod",
    //   align: "center",
    //   width: 180,
    // },
    {
      title: "Bandeira",
      dataIndex: "cod_bandeira",
      key: "cod_bandeira",
      align: "center",
      width: 180,
    },
    {
      title: "Rede",
      dataIndex: "cod_rede",
      key: "cod_rede",
      align: "center",
      width: 180,
    },
    // {
    //   title: "Tipo Finalizadora",
    //   dataIndex: "tipoFinalizadora",
    //   key: "tipoFinalizadora",
    //   align: "center",
    //   width: 100,
    // },
   
    {
      title: "Finalizadora SIAC",
      dataIndex: "cod_finalizadora",
      key: "cod_finalizadora",
      align: "center",
      width: 180,
    },

    {
      title: "Data cadastro",
      dataIndex: "data_cadastro",
      key: "data_cadastro",
      align: "center",
      width: 180,
    },
    {
      title: "Data ultima modificação",
      dataIndex: "data_ultima_modificacao",
      key: "data_ultima_modificacao",
      align: "center",
      width: 180,
    },
    {
      title: "Usuário",
      dataIndex: "user_id_mod",
      key: "user_id_mod",
      align: "center",
      width: 180,
    },
    {
      title: "Ações",
      key: "acoes",
      width: 100,
      render: (_, record) => (
        <TableActions
          //@ts-ignore
          onDetail={() => (setOpenView(true), setSelecionada(record))}
          onDelete={() => deleteF(record.id)}
          // onEdit={() => edite(record)}
          // onSwitch={() =>
          //   status(
          //     record.id,
          //     record.ind_status === undefined ? true : record.ind_status
          //   )
          // }
          onJoinStatus={record.ind_status}
          // onSwitchDisbled={record.ind_status}
        />
      ),
    },
  ];
  const campos = [
    {
      key: "cod_int_sap_sim",
      label: "Código SAP",
      component: (
        <Select
          prefix={<BarcodeOutlined style={{ marginRight: 8 }} />}
          placeholder="Selecione"
          showSearch
          optionFilterProp="label"
          style={{ width: 180 }}
          allowClear
          //   onChange={(value) => {
          //     setFiltros((prev: any) => ({ ...prev, value }));
          //   }}
          options={dadosMock
            .filter((e) => e.cod_int_sap_sim !== undefined)
            .map((e) => ({
              value: e.cod_int_sap_sim,
              label: e.cod_int_sap_sim,
            }))}
        />
      ),
    },
    {
      key: "cod_finalizadora",
      label: "Código de finalizadora SIAC",
      component: (
        <Select
          prefix={<BarcodeOutlined style={{ marginRight: 8 }} />}
          placeholder="Selecione"
          showSearch
          optionFilterProp="label"
          style={{ width: 180 }}
          allowClear
          options={dadosMock
            .filter((e) => e.cod_finalizadora !== undefined)
            .map((e) => ({
              /// deixar assim por conta do mock
              value: e.cod_finalizadora,
              label: e.cod_finalizadora,
            }))}
        />
      ),
    },
    {
      key: "cod_bandeira",
      label: "Código Bandeira",
      component: (
        <Select
          prefix={<BarcodeOutlined style={{ marginRight: 8 }} />}
          placeholder="Selecione"
          showSearch
          optionFilterProp="label"
          style={{ width: 180 }}
          allowClear
          options={Bandeiras.map((e) => ({
            /// deixar assim por conta do mock
            value: e.idBandeira,
            label: e.idBandeira,
          }))}
        />
      ),
    },
    {
      key: "cod_rede",
      label: "Código Rede",
      component: (
        <Select
          prefix={<BarcodeOutlined style={{ marginRight: 8 }} />}
          placeholder="Selecione"
          showSearch
          optionFilterProp="label"
          style={{ width: 180 }}
          allowClear
          options={redes.map((e) => ({
            /// deixar assim por conta do mock
            value: e.idRede,
            label: e.idRede,
          }))}
        />
      ),
    },
  ];

  return (
    <div>
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
                onValue={(changed, all) => (filter(all), setFiltros(all))}
                onLimpar={() => {
                  form.resetFields();
                  setFiltros(null);
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
                dataSource={finalizadora}
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


      <ModalBase
        onCancel={() => setOpenView(false)}
        open={setopenView}
        children={<PaymentListView values={Selecionada} />}
      />
    </div>
  );
};

export default PaymentList;
