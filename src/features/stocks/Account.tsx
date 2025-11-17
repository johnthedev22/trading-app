/* Smart component for the user "Bank" Account*/

import { formatCurrency } from "../../helpers/formatCurrency";
import { useAccount } from "../../hooks/useAccount";
import { usePortfolio } from "../../hooks/usePortfolio";
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
    const { state, dispatch: accountDispatch } = useAccount()
    const { state: portfolioData, dispatch: portfolioDispatch } = usePortfolio()

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
        <Modal isOpen={isOpen} onClose={()=>{setIsOpen(false)}} title={report === "funds" ? "GBP - British pound": "Holdings"}>
            {report === 'funds' 
            ? <ManageFunds closeOnAction={()=>{setIsOpen(false)}} dispatch={accountDispatch} cash={state.cash}/>
            : <PortfolioUI portfolioData={portfolioData} portfolioDispatch={portfolioDispatch} accountDispatch={accountDispatch}/>
            }
        </Modal>
    </>)
}

export default Account