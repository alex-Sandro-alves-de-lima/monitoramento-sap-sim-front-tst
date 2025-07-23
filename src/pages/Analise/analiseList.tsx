import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  message,
  Select,
  Spin,
  Table,
  TableProps,
} from "antd";
import { BarcodeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { CollapseSection } from "@/components/ui/CollapseSection";
import { StandardTable } from "@/components/table/StandardTable";
import { Grupo, gruposMocks, gruposMock } from "@/types/Analise";
import FiltroFormBase from "@/components/form/FiltroFormBase";
import { StatusTag } from "@/components/ui/StatusTag";
import { TableActions } from "@/components/layout/TableActions";
import { PageActions } from "@/components/layout/PageActions";
import { ColumnsType } from "antd/es/table";
import { dataHoraAtualFormato } from "@/utils/dataSistem";
import { FloatingSpin } from "@/components/ui/FloatingSpin";
import { mockGrupoStore } from "@/store/useStore";

const AnaliseList = () => {
  const {addMockGrupo,mockGrupo, fetchMockGrupo} = mockGrupoStore();
  const [loadingGrupo, setLoadingGrupo] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [form] = Form.useForm();
  const [dadosMovimentados, setDadosMovimentados] = useState<Grupo[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const dataMovForm = Form.useWatch("dataMov", form);
  const lojaMovForm = Form.useWatch("id_loja", form);
  const [toogle, setToogle] = useState(false);
  const [rowSelectionKey, setRowSelectionKey] = useState(Date.now());
  const [spinStatus, setSpinStatus] = useState<"none" | "loading" | "success">("none");
    // useEffect(()=>{
    //   fetchMockGrupo()
    // },[])
    const [dadosOriginais, setDadosOriginais] = useState<Grupo[]>([...gruposMocks]);
     const [dadosFiltrados, setDadosFiltrados] = useState<Grupo[]>([...gruposMocks]);

  const isDisabled = (record: Grupo): boolean => record.status === "1";
  const filtrarDados = (valores: any) => {
    const { id_loja, status, tipo, dataMov, cod_operacao } = valores;
    ///Filtro do caraca
    const filtrados = dadosOriginais.filter((item) => {
      const lojaOk = id_loja ? item.loja === id_loja : true;
      const statusOk = status ? item.status === status : true;
      const tipoOk = tipo ? item.tipo === tipo : true;
      const cod_operacaoOk = cod_operacao
        ? item.cod_operacao === cod_operacao
        : true;
      const dataOk =
        dataMov && dataMov.length === 2
          ? (() => {
              const [inicio, fim] = dataMov;
              const dataMovimento = dayjs(item.data_mov, "DD/MM/YYYY");
              return dataMovimento.isBetween(
                dayjs(inicio),
                dayjs(fim),
                "day",
                "[]"
              );
            })()
          : true;

      return lojaOk && statusOk && tipoOk && dataOk && cod_operacaoOk;
    });
    setDadosFiltrados(filtrados);
  };

  const rowSelection: TableProps<Grupo>["rowSelection"] = {
    selectedRowKeys,
    columnTitle: <span style={{ visibility: "hidden" }}>—</span>, /// nao mostra o all
    getCheckboxProps: (record: Grupo) => ({
      disabled: isDisabled(record),
    }),
    // onSelectAll: (selected, selectedRows, changeRows) => {
    //   console.log("Selecionar tudo:", selected);
    //   console.log("Linhas selecionadas:", selectedRows);
    //   console.log("Linhas alteradas:", changeRows);
    // },
    onSelectAll: (selected, selectedRows, changeRows) => {
      //  console.log("Linhas alteradas:", changeRows);
      if (selected) {
        const todosIds = dadosFiltrados
          .filter((item) => item.status !== "1")
          .map((item) => item.idMensagem);
        setSelectedRowKeys(todosIds);
      } else {
        setSelectedRowKeys([]);
      }
    },
    onChange: (selectedRowKeys: React.Key[], selectedRows: Grupo[]) => {
      // console.log("Selecionados:", selectedRowKeys, selectedRows);
      // console.log("Todos" + selectedRowKeys)
      setSelectedRowKeys(selectedRowKeys);
      //    if (selectedRowKeys.length > 10) {
      //   message.warning("Você pode selecionar até 10 itens");
      //   return;
      // }
      // setSelectedRowKeys(selectedRowKeys);
    },
  };

  const toggleSelecionarTodos = () => {
    const chavesSelecionaveis = dadosFiltrados.filter((item) => item.status !== "1").map((item) => item.idMensagem);
    const todosSelecionados = chavesSelecionaveis.every((id) =>selectedRowKeys.includes(id));

    if (todosSelecionados) {
      setSelectedRowKeys([]);
      setToogle(false)
    } else {
      setSelectedRowKeys(chavesSelecionaveis);
      setToogle(true)
    }
  };
  const chavesSelecionaveis = dadosFiltrados.filter((item) => item.status !== "1").map((item) => item.idMensagem);
  const todosSelecionados = chavesSelecionaveis.every((id) =>selectedRowKeys.includes(id));

  const colunas: ColumnsType<Grupo> = [
    {
      title: "Data do movimento",
      dataIndex: "data_mov",
      key: "data_mov",
      align: "center",
      width: 150,
      // sorter: (a, b) => a.data_mov.localeCompare(b.data_mov),
    },
    {
      title: "Loja",
      dataIndex: "loja",
      key: "loja",
      width: 80,
      sorter: (a, b) => a.loja.localeCompare(b.loja),
    },
    Table.EXPAND_COLUMN,
    { title: "Operação", dataIndex: "desc_operacao", key: "desc_operacao" },

    // {
    //   title: "Data da Registro",
    //   dataIndex: "data_reg",
    //   key: "data_reg",
    //   align: "center",
    // },
    // {
    //   title: "Data de Reenvio",
    //   dataIndex: "data_env",
    //   key: "data_env",
    //   align: "center",
    // },
    // {
    //   title: "Data da Integração",
    //   dataIndex: "data_int",
    //   key: "data_int",
    //   align: "center",
    // },
    // {
    //   title: "Usuario",
    //   dataIndex: "usuario",
    //   key: "usuario",
    //   align: "start",
    // },
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

  const campos = [
    {
      key: "dataMov",
      label: "Período de Movimento",
      component: (
        <DatePicker.RangePicker
          format="DD/MM/YYYY"
          placeholder={["De", "Até"]}
          style={{ width: 300 }}
        />
      ),
    },
    {
      key: "id_loja",
      label: "Código da Loja",
      component: (
        <Select
          prefix={<BarcodeOutlined />}
          // disabled={!dataMovForm}
          placeholder="Selecione"
          showSearch
          optionFilterProp="label"
          style={{ width: 180 }}
          allowClear
          options={["1302", "0001", "1200"].map((e) => ({
            value: e,
            label: e,
          }))}
        />
      ),
    },
    {
      key: "status",
      label: "Status",
      component: (
        <Select
          placeholder="Selecione"
          // disabled={!dataMovForm}
          showSearch
          optionFilterProp="label"
          style={{ width: 180 }}
          allowClear
          options={[
            { id: "1", desc: "Sucesso" },
            // { id: "2", desc: "Pendente" },
            { id: "3", desc: "Falha Intregração" },
            { id: "4", desc: "Falha SAP" },
          ].map((e) => ({
            value: e.id,
            label: e.desc,
          }))}
        />
      ),
    },
    {
      key: "cod_operacao",
      label: "Operação",
      component: (
        <Select
          placeholder="Selecione"
          // disabled={!dataMovForm}
          showSearch
          optionFilterProp="label"
          style={{ width: 300 }}
          allowClear
          options={[
            { id: "1001", descricao: "NFCe Venda" },
            { id: "1002", descricao: "Devolução da Venda (Anulado)" },
            { id: "0101", descricao: "Sangria Venda" },
            { id: "0104", descricao: "Sangria Agrupamento" },
            {
              id: "0105",
              descricao: "Sangria Venda (Valores menores agrupados)",
            },
            { id: "1006", descricao: "Recarga de Celular - Venda" },
            { id: "1007", descricao: "Recarga de Celular - Cancelamento" },
            { id: "1008", descricao: "Doação de Troco - Venda" },
            { id: "1009", descricao: "Doação de Troco - Cancelamento" },
            { id: "1010", descricao: "Gift Card - Venda" },
            { id: "1011", descricao: "Gift Card - Cancelamento" },
            { id: "1012", descricao: "Pagamento de Fatura FIC - Venda" },
            { id: "1013", descricao: "Pagamento de Fatura FIC - Cancelamento" },
            { id: "1014", descricao: "Controle de Suprimento de Troco" },
            { id: "1015", descricao: "Pedido antecipação" },
            { id: "1016", descricao: "Cancelamento pedido antecipação" },
            {
              id: "1017",
              descricao: "Movimento Financeiro Dinheiro achado loja",
            },
            { id: "1018", descricao: "NFe" },
            { id: "1019", descricao: "MF-e/SAT" },
          ].map((e) => ({
            value: e.id,
            label: e.descricao,
          }))}
        />
      ),
    },
  ];

  const renderDetalhesFalha = (grupo: Grupo) => (
    <Table
      columns={[
        {
          title: "Cód Falha",
          width: 10,
          dataIndex: "idFalha",
          align: "center",
          key: "idFalha",
        },
        {
          title: "Descrição",
          width: 100,
          dataIndex: "descricao",
          key: "descricao",
        },
        {
          title: "Qtd.Total",
          width: 10,
          dataIndex: "totalErros",
          align: "center",
          key: "totalErros",
        },
      ]}
      dataSource={grupo.falhas}
      scroll={{ x: 200 }}
      pagination={false}
      rowKey="idFalha"
      size="small"
    />
  );

  const reprocessarGrupo = (grupoId: string) => {
    setLoadingGrupo(grupoId);
    setTimeout(() => {
      setLoadingGrupo(null);
      message.success(`Grupo ${grupoId} reprocessado com sucesso`);
    }, 1200);
  };

  const repassarDados = (novosOriginais: Grupo[]) => {
    const novosFiltrados = novosOriginais.filter((item) => {
      const lojaOk = lojaMovForm ? item.loja === lojaMovForm : true;
      const St =  item.status !== "5" ? true : false;
      const dataOk = dataMovForm && dataMovForm.length === 2 ? (() => {
              const [inicio, fim] = dataMovForm;
              const dataMovimento = dayjs(item.data_mov, "DD/MM/YYYY");
              return dataMovimento.isBetween(dayjs(inicio), dayjs(fim),"day","[]");})(): true;
      return lojaOk && dataOk && St;
    });
    addMockGrupo(novosOriginais)
    setDadosFiltrados(novosFiltrados);
    setDadosOriginais(novosFiltrados);
    setDadosMovimentados(novosFiltrados);
    setSelectedRowKeys([]);
  };

  const limparSelecionados = () => {
    setSelectedRowKeys([]);
    setToogle(false)
    setRowSelectionKey(Date.now()); 
    };

  const enviarSelecionadosSAP = () => {
    const selecionados = [...selectedRowKeys];
    if (selecionados.length === 0) return;

    setSpinStatus("loading");
    const agora = dataHoraAtualFormato();

    // message.loading({
    //   content: "Enviando para o SAP...",
    //   key: "sap",
    //   duration: 0,
    // });

    ///// Enviando
    setTimeout(() => {
      const novosOriginais = dadosOriginais.map((item) => {
        if (selecionados.includes(item.idMensagem)) {
          return {
            ...item,
            data_reg: agora,
            data_env: agora,
            status: "2",
          };
        }
        return item;
      });
      repassarDados(novosOriginais);
      /// Processando reprocessamento
      setTimeout(() => {
        const atualizados = novosOriginais.map((item) => {
          if (selecionados.includes(item.idMensagem)) {
            return {
              ...item,
              usuario: "TC021864",
              // data_int: agora,
              status: "5",
            };
          }
          return item;
        });

        repassarDados(atualizados);
        setSpinStatus("success");
        limparSelecionados();
        // message.success({
        //   content: `(${selecionados.length}) Reprocessados com sucesso...`,
        //   key: "sap",
        //   duration: 2,
        // });
        setTimeout(() => {
          setSpinStatus("none");
          limparSelecionados();
        }, 2500);
      }, 5000);
    }, 2000);
  };

  return (
    <div>
      <FloatingSpin
        status={spinStatus}
        message={
          spinStatus === "loading"
            ? "Enviado registro para processamento......"
            : "Enviado com sucesso!"
        }
      />

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
                onLimpar={() => {
                  form.resetFields();
                  setDadosFiltrados(dadosOriginais);
                  limparSelecionados();
                }}
                onBuscar={filtrarDados}
              />
            ),
          },
          {
            key: "2",
            title: "Resultado",
            extra: (
              <PageActions
                customButtons={
                  <>
                    {selectedRowKeys.length > 0 && (
                      <>
                        <Button type="primary" onClick={enviarSelecionadosSAP}>
                          Enviar Selecionados SAP ({selectedRowKeys.length})
                        </Button>
                      </>
                    )}
                  </>
                }
              />
            ),
            content: (
              <StandardTable
                title={() => (
                  <>
                    <Button onClick={toggleSelecionarTodos}>
                      {toogle ? "Remover Seleção" : "Selecionar Todos"}
                    </Button>
                  </>
                )}
                dataSource={dadosFiltrados}
                columns={colunas}
                expandable={{
                  expandedRowRender: renderDetalhesFalha,
                  rowExpandable: (record) => record.status !== "1" && record.falhas?.length > 0
                }}
                rowKey="idMensagem"
                pagination={{
                  pageSize,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20", "50"],
                  showTotal: (total) => `Total de registros: ${total}`,
                  onShowSizeChange: (_, size) => setPageSize(size),
                }}
                key={rowSelectionKey}
                rowSelection={{ ...rowSelection }}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default AnaliseList;
