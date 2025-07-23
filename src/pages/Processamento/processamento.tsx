import React from 'react'
import ProcessamentoList from './processamentoList'
import { BaseLayout } from '@/components/layout/BaseLayout'

const Processamento = () => {
  return (
     <div>
      <BaseLayout
        
        title="Análise de Processamentos"
        subTitle="Esta tela permite consultar e acompanhar as movimentações operacionais de processamentos ou pendencias de integração com o SAP."
        breadcrumb={["Análise", "Processamentos"]}
        // actions={<PageActions onExcel={() => alert("Baixar Excel...")} />}
        children={
            <ProcessamentoList/>
        }
      />
    </div>
  )
}

export default Processamento
