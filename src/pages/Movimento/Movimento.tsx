import { BaseLayout } from "@/components/layout/BaseLayout";
import { PageActions } from "@/components/layout/PageActions";
import { SectionCard } from "@/components/ui/SectionCard";
import { Form,  message,} from "antd";
import { useState } from "react";

import ModalBase from "@/components/ui/ModalBase";
import MovimentoList from "./MovimentoList";

const Movimento = () => {
  const [form] = Form.useForm();
  const [openNew, setOpenNew] = useState(false);

  const handleSave = () => {
    setOpenNew(false);
    // addBandeiras(values);
    form.resetFields();
  };

  return (
    <>
      <BaseLayout
        // versao="V 1.6.0" 
        title="Análise de registros"
        subTitle="Esta tela permite consultar e acompanhar as movimentações operacionais das lojas que foram processadas ou estão pendentes de integração com o SAP."
        breadcrumb={["Análise", "Registros."]}
        actions={
          <PageActions
            onExcel={() => alert("Baixar Excel...")}
          />
        }
      >
      <MovimentoList/>
      </BaseLayout>
      {/*Modal base da tela */}
      <ModalBase
        onCancel={() => setOpenNew(false)}
        open={openNew}
        children={""}
      />
    </>
  );
};

export default Movimento;
