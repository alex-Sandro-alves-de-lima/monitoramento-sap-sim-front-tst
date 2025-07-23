import { Form, Button, Row, Col, Space, Select, Divider } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  BarcodeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { StandardTable } from "@/components/table/StandardTable";
import { ColumnsType } from "antd/es/table";
import { dados, IRede } from "@/types/Rede";
import { TableActions } from "@/components/layout/TableActions";
import ModalBase from "@/components/ui/ModalBase";
import { RedeForm } from "@/components/form/RedeForm";
import { redeStore } from "@/store/useStore";
import FiltroFormBase from "@/components/form/FiltroFormBase";
import RedeView from "./RedeView";
import { CollapseSection } from "@/components/ui/CollapseSection";
import { PageActions } from "@/components/layout/PageActions";

const RedeList = () => {
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(8);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState<any>({});
  const [openNewEdit, setOpenNewEdit] = useState(false);
  const [setopenView, setOpenView] = useState(false);
  const [redeSelecionada, setRedeSelecionada] = useState<IRede | null>(null);

  //  const idRedeSelecionada = Form.useWatch("idRede", form); // Observa
  const {
    fetchRede,
    redes,
    addRedes,
    deleteRede,
    editeRede,
    filterRede,
    statusRede,
  } = redeStore();
  const HandleEdit = (values: IRede) => {
    setRedeSelecionada(values);
    setOpenNewEdit(false);
    editeRede(values);
  };
  useEffect(() => {
    handleSearch();
    fetchRede();
  }, [filtros]);
  const handleSearch = () => {
    filterRede(filtros);
  };
  const columns: ColumnsType<IRede> = [
    {
      title: "Código de rede",
      dataIndex: "idRede",
      key: "idRede",
      align: "center",
      width: 180,
      sorter: (a, b) => a.idRede.localeCompare(b.idRede),
      sortDirections: ["ascend", "descend"],
      // filters: dados
      //   ?.map((e) => ({ text: e.idRede, value: e.idRede }))
      //   .filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i), // remover duplicata
      // onFilter: (value, record) => record.idRede === value,
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
            statusRede(
              record.idRede,
              record.status === undefined ? true : record.status
            )
          }
          onDelete={() => deleteRede(record.idRede)}
          onEdit={() => (setOpenNewEdit(true), setRedeSelecionada(record))}
          onDetail={() => (setOpenView(true), setRedeSelecionada(record))}
          onJoinStatus={false}
        />
      ),
    },
  ];
  const campos = [
    {
      key: "idRede",
      label: "Código da Rede",
      component: (
        <Select
          prefix={<BarcodeOutlined style={{ marginRight: 8 }} />}
          placeholder="Selecione"
          showSearch
          optionFilterProp="label"
          style={{ width: 180 }}
          allowClear
          onChange={(value) => {
            setFiltros((prev: any) => ({ ...prev, idRede: value }));
          }}
          options={dados.map((e) => ({
            value: e.idRede,
            label: e.idRede,
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
                onValue={(changed, all) => (filterRede(all), setFiltros(all))}
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
                dataSource={redes}
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

      <ModalBase
        onCancel={() => setOpenNewEdit(false)}
        open={openNewEdit}
        children={
          <RedeForm
            title=""
            initialValues={redeSelecionada}
            onSubmit={(e) => HandleEdit(e)}
          />
        }
      />
      <ModalBase
        onCancel={() => setOpenView(false)}
        open={setopenView}
        children={<RedeView values={redeSelecionada} />}
      />
    </div>
  );
};

export default RedeList;
