import { Form, Divider, Select, Progress, Flex, Tag, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { StandardTable } from "@/components/table/StandardTable";
import { ColumnsType } from "antd/es/table";
import { IRede } from "@/types/Rede";
import { TableActions } from "@/components/layout/TableActions";
import ModalBase from "@/components/ui/ModalBase";
import { RedeForm } from "@/components/form/RedeForm";
import { mockGrupoStore, movimentoStore } from "@/store/useStore";
import { IMovimentoResumo, IRegistro } from "@/types/Movimento";
import {
  BarcodeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import FiltroFormBase from "@/components/form/FiltroFormBase";
import dayjs, { Dayjs } from "dayjs";
import { converterParaFormatoBR } from "@/utils/dataSistem";
import { CollapseSection } from "@/components/ui/CollapseSection";
import { StatusTag } from "@/components/ui/StatusTag";
import { Grupo } from "@/types/Analise";

const ProcessamentoList = () => {
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(8);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState<any>({});
  const [openNewEdit, setOpenNewEdit] = useState(false);
  const [setopenView, setOpenView] = useState(false);
  const [redeSelecionada, setRedeSelecionada] = useState<IRede | null>(null);
  const dataMovForm = Form.useWatch("dataMov", form);
  const lojaMovForm = Form.useWatch("id_loja", form);
  const { resumo, registro, fetchData, fetchLoja, fetchResumo, movimento } =
    movimentoStore();
  const [range, setRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selecionada, setSelecionada] = useState<string | null>(null);
  const [linhaSelecionada, setLinhaSelecionada] = useState<string | null>(null);
  const [filtroSelecionado, setFiltroSelecionado] = useState<string | null>(
    null
  );
  const { mockGrupo } = mockGrupoStore();
  const campos = [
    {
      key: "dataMov",
      label: "Período de Movimento",
      component: (
        <DatePicker.RangePicker
          format="DD/MM/YYYY"
          placeholder={["De", "Até"]}
          style={{ width: 300 }}
          //   onChange={onChange}
        />
      ),
    },
    {
      key: "id_loja",
      label: "Código da Loja",
      component: (
        <Select
          prefix={<BarcodeOutlined style={{ marginRight: 8 }} />}
          placeholder="Selecione"
          showSearch
          optionFilterProp="label"
          style={{ width: 180 }}
          allowClear
          disabled={!dataMovForm}
          onChange={(id_loja: any) => {
            setFiltros((prev: any) => ({ ...prev, id_loja }));
          }}
          options={["1302", "0001", "1200"].map((e) => ({
            value: e,
            label: e,
          }))}
        />
      ),
    },
  ];
  useEffect(() => {
    handleDate()
  }, [mockGrupo]);

  const handleDate = () => {
    const data = mockGrupo.filter((item) =>( item.status === "5" || item.status === "1"));
    return data
  };

  const colunas: ColumnsType<Grupo> = [
    {
      title: "Data da movimento",
      dataIndex: "data_mov",
      key: "data_mov",
      align: "center",
      width: 150,
      sorter: (a, b) => a.data_mov.localeCompare(b.data_mov),
    },
    {
      title: "Loja",
      dataIndex: "loja",
      key: "loja",
      width: 80,
      sorter: (a, b) => a.loja.localeCompare(b.loja),
    },
    { title: "Operação", dataIndex: "desc_operacao", key: "desc_operacao" },

    {
      title: "Data da Registro",
      dataIndex: "data_reg",
      key: "data_reg",
      align: "center",
    },
    {
      title: "Data de Reenvio",
      dataIndex: "data_env",
      key: "data_env",
      align: "center",
    },
    {
      title: "Data da Integração",
      dataIndex: "data_int",
      key: "data_int",
      align: "center",
    },
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
      align: "start",
    },
    {
      title: "Qtd.Registros",
      width: 80,
      align: "center",
      key: "total",
      render: (_: any, record: Grupo) => record.total,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => <StatusTag status={status} />,
    },
    // {
    //   title: "Ações",
    //   key: "acoes",
    //   render: (_: any, grupo: Grupo) => (
    //     <TableActions
    //       onJoinStatus={false}
    //       onJoin={() => ""}
    //       onDetail={() => ""}
    //     />
    //   ),
    // },
  ];

  return (
    <div>
      <a href="" style={{ color: "red" }}>
       ESTA TELA AINDA ESTA EM DEFINIÇÃO
      </a>
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
                onBuscar={(values) => console.log("")}
                onValue={(changed, all) => {
                  fetchLoja(all);
                  setFiltros(all);
                }}
                onLimpar={() => {
                  form.resetFields();
                  setRange(null);
                  setFiltros({});
                }}
              />
            ),
          },
          {
            key: "2",
            title: "Resultado",
            showArrow: false,
            content: (
              <>
                <StandardTable
                  bordered
                  style={{ paddingTop: 4, paddingBottom: 4 }}
                  columns={colunas}
                  dataSource={handleDate()}
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
            ),
          },
        ]}
      />
    </div>
  );
};

export default ProcessamentoList;
