import { Form, Divider, Select, Progress, Flex, Tag, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { StandardTable } from "@/components/table/StandardTable";
import { ColumnsType } from "antd/es/table";
import { IRede } from "@/types/Rede";
import { TableActions } from "@/components/layout/TableActions";
import ModalBase from "@/components/ui/ModalBase";
import { RedeForm } from "@/components/form/RedeForm";
import { movimentoStore } from "@/store/useStore";
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
import MovimentoView from "./MovimentoView";

const renderStatusTag = (status_registro: string) => {
  switch (status_registro) {
    case "1":
      return (
        <Tag icon={<CheckCircleOutlined />} bordered={false} color="blue">
          Sucesso
        </Tag>
      );
    case "2":
      return (
        <Tag icon={<ClockCircleOutlined />} bordered={false} color="processing">
          Pendente
        </Tag>
      );
    case "3":
      return (
        <Tag icon={<CloseCircleOutlined />} bordered={false} color="red">
          Falha
        </Tag>
      );
    default:
      return <Tag color="default">Desconhecido</Tag>;
  }
};

const MovimentoList = () => {
  const [form] = Form.useForm();
  const [pageSize, setPageSize] = useState<number>(8);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState<any>({});
  const [openNewEdit, setOpenNewEdit] = useState(false);
  const [setopenView, setOpenView] = useState(false);
  const [redeSelecionada, setRedeSelecionada] = useState<IRede | null>(null);
  const dataMovForm = Form.useWatch("dataMov", form);
  const lojaMovForm = Form.useWatch("id_loja", form);
  const { resumo, registro, fetchData, fetchLoja, fetchResumo, movimento } = movimentoStore();
  const [range, setRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selecionada, setSelecionada] =    useState<string | null>(null);
  const [linhaSelecionada, setLinhaSelecionada] = useState<string | null>(null);
  const [filtroSelecionado, setFiltroSelecionado] = useState<string | null>(null);

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

  useEffect(() => {
    handleSearch();
    fetchResumo();

  }, [filtros, dataMovForm]);

  const handleSearch = () => {
    
    if (!range) {
      setFiltros(null);
      setRange(null);
      form.resetFields();
      fetchData();
      return;
    }
    fetchLoja(filtros);
    const dataInicio = range[0];
    const dataFim = range[1];
    fetchData({ dataInicio: dataInicio, dataFim: dataFim });
   

    //    if (resumoFiltrado.length < 0) {
    //   message.info("Sem registros de dados")
    // }
  };

  const columnsA: ColumnsType<IMovimentoResumo> = [
    {
      title: "Data de Movimento",
      dataIndex: "data_movimento",
      key: "data_movimento",
      align: "center",
      width: 180,
      sorter: (a, b) => a.data_movimento.localeCompare(b.data_movimento),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Número de Lojas",
      dataIndex: "qtd_loja",
      key: "qtd_loja",
      align: "center",
      sortDirections: ["ascend", "descend"],
      width: 100,
    },
    {
      title: "Quantidade de Registros",
      dataIndex: "qtd_registro",
      align: "center",
      key: "qtd_registro",
      width: 150,
    },
    {
      title: "Sucesso",
      key: "qtd_sucesso",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Flex justify="space-between" align="center">
          <Progress
            percent={Number(
              ((record.qtd_sucesso / record.qtd_registro) * 100).toFixed(1)
            )}
            strokeColor="#005bac"
            size={[80, 15]}
            strokeLinecap="butt"
            percentPosition={{ align: "start", type: "inner" }}
            format={() => `${record.qtd_sucesso}`}
            status="active"
          />
        </Flex>
      ),
    },
    {
      title: "Pendente",
      key: "qtd_pendente",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Flex justify="space-between" align="center">
          <Progress
            percent={Number(
              ((record.qtd_pendente / record.qtd_registro) * 100).toFixed(1)
            )}
            strokeColor="#001529"
            size={[80, 15]}
            strokeLinecap="butt"
            percentPosition={{ align: "start", type: "inner" }}
            format={() => `${record.qtd_pendente}`}
            status="active"
          />
        </Flex>
      ),
    },
    {
      title: "Ações",
      key: "acoes",
      width: 100,
      render: (_, record) => (
        <TableActions
          onRefresh={() => console.log(record)}
           onDetail={() => (setOpenView(true), setSelecionada(record.data_movimento))}
          onJoinStatus={false}
        />
      ),
    },
  ];

  const columnsB: ColumnsType<IRegistro> = [
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
    },
    {
      title: "Número de registro",
      dataIndex: "id_registro",
      key: "id_registro",
      align: "center",
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Status de Registro",
      key: "status_registro",
      render: (_, record) => renderStatusTag(record.status_registro),
    },
    {
      title: "Ações",
      key: "acoes",
      width: 180,
      render: (_, record) => (
        <TableActions
          onRefresh={() => console.log(record)}
          onJoinStatus={false}
        />
      ),
    },
  ];

  const campos = [
    {
      key: "dataMov",
      label: "Período de Movimento",
      component: (
        <DatePicker.RangePicker
          format="DD/MM/YYYY"
          placeholder={["De", "Até"]}
          style={{ width: 300 }}
          onChange={onChange}
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
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("Valor selecionado", newSelectedRowKeys);
    console.log("Valor armazenado", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <a href="" style={{color: "red"}}>ESTA TELA AINDA ESTA EM DESENHO</a>
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
                onBuscar={(values) => handleSearch()}
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
                {lojaMovForm ? (
                  <StandardTable
                    bordered
                    style={{ paddingTop: 4, paddingBottom: 4 }}
                    columns={columnsB}
                    dataSource={registro}
                    loading={loading}
                    rowSelection={rowSelection}
                    pagination={{
                      pageSize: pageSize,
                      showSizeChanger: true,
                      pageSizeOptions: ["5", "10", "20", "50"],
                      showTotal: (total) => `Total de registros: ${total}`,
                      onShowSizeChange: (_, size) => setPageSize(size),
                    }}
                  />
                ) : (
                  <StandardTable
                    bordered
                    style={{ paddingTop: 4, paddingBottom: 4 }}
                    columns={columnsA}
                    dataSource={resumo}
                    loading={loading}
                    pagination={{
                      pageSize: pageSize,
                      showSizeChanger: true,
                      pageSizeOptions: ["5", "10", "20", "50"],
                      showTotal: (total) => `Total de registros: ${total}`,
                      onShowSizeChange: (_, size) => setPageSize(size),
                    }}
                    rowClassName={(record) =>
                      record.data_movimento === linhaSelecionada
                        ? "linha-selecionada"
                        : ""
                    }
                    onRow={(record) => ({
                      onClick: () => {
                        console.log("Linha clicada:", record);
                        setFiltros(record.data_movimento);
                      },
                    })}
                  />
                )}
              </>
            ),
          },
        ]}
      />

      {/* Modais */}
      <ModalBase
        onCancel={() => setOpenNewEdit(false)}
        open={openNewEdit}
        children={
          <RedeForm
            title=""
            initialValues={redeSelecionada}
            onSubmit={(e) => console.log(e)}
          />
        }
      />
      <ModalBase
        onCancel={() => setOpenView(false)}
        open={setopenView}
        width={800}
        children={<MovimentoView data_movimento={selecionada} />}
      />
    </div>
  );
};

export default MovimentoList;
