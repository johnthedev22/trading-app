/* Smart component for the user "Bank" Account*/

import { formatCurrency } from "../../helpers/formatCurrency";
import { useAccount } from "../../hooks/useAccount";
import AccountUI from "../../components/stocks/AccountUI";
import Modal from "../../components/modal/Modal";
import ManageFunds from "../../components/stocks/ManageFunds";
import useModal from "../../hooks/useModal";
import { useState } from "react";
import PortfolioUI from "../../components/stocks/PortfolioUI";

const Account = () => {
    //Modal popup
    const { isOpen, setIsOpen } = useModal(false)

    //global states
    const { state, dispatch } = useAccount()

    //chosen report
    const [report, setReport] = useState<string>("funds")

    //format the currency
    const accountValue = formatCurrency({amount:state.accountValue})
    const cash = formatCurrency({amount:state.cash})
    const investments = formatCurrency({amount: state.investments})

    return (<>
        <AccountUI
            handleOnClick={(report)=>{setIsOpen(true); setReport(report)}} 
            cash={cash} 
            accountValue={accountValue} 
            investments={investments} />
        <Modal isOpen={isOpen} onClose={()=>{setIsOpen(false)}} title="GBP - British pound">
            {report === 'funds' 
            ? <ManageFunds closeOnAction={()=>{setIsOpen(false)}} dispatch={dispatch} cash={state.cash}/>
            : <PortfolioUI/>
            }
        </Modal>
    </>)
}

export default Account