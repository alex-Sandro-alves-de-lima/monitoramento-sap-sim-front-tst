import PaymentFormSAP, { PaymentForm} from "@/components/form/PaymentForm";
import { BaseLayout } from "@/components/layout/BaseLayout";
import ModalBase from "@/components/ui/ModalBase";
import { finalizadoraStore } from "@/store/useStore";
import { IFinalizadora } from "@/types/IFinalizadora";
import { useEffect, useState } from "react";
import { PageActions } from "@/components/layout/PageActions";
import PaymentList from "./PaymentList";

const Payment = () => {
  const [openNewEdit, setOpenNew] = useState(false);
  const [openTipo, setOpenTipo] = useState(false);
  const { add, fetch, status, finalizadora } = finalizadoraStore();

    useEffect(() => {
      fetch()
    }, [finalizadoraStore]);

  function handleSave(values:IFinalizadora) {
      add(values)
  }
  return (
    <>
      <BaseLayout
        title={"Meio de pagamento"}
        breadcrumb={["Cadastro", "Meio de pagamento"]}
        versao="V 1.6.0" 
        subTitle="Nesta tela você pode cadastrar, editar e gerenciar meios de pagamento utilizadas na integração com o SAP."
              actions={
                <PageActions
                  createText="Novo cadastro"
                  onCreate={() => setOpenNew(true)}
                  // onExcel={() => setOpenTipo(true)}
                />
              }
      >
        <PaymentList />
      </BaseLayout>

      {/*Modal base da tela */}
      <ModalBase
          onCancel={() => setOpenTipo(false)}
          open={openTipo}
          width={700}
          children={<PaymentForm/>}/>

        <ModalBase
          onCancel={() => setOpenNew(false)}
          open={openNewEdit}
          width={700}
          children={<PaymentFormSAP onSubmit={(e)=>handleSave(e)} />}/>
    </>
  );
};

export default Payment;
