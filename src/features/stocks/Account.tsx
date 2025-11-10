/* Smart component for the user "Bank" Account*/

import { formatCurrency } from "../../helpers/formatCurrency";
import { useAccount } from "../../hooks/useAccount";
import AccountUI from "../../components/stocks/AccountUI";
import Modal from "../../components/modal/Modal";
import ManageFunds from "../../components/stocks/ManageFunds";
import useModal from "../../hooks/useModal";

const Account = () => {
    //Modal popup
    const { isOpen, setIsOpen } = useModal(false)

    //global states
    const { state, dispatch } = useAccount()

    //format the currency
    const accountValue = formatCurrency({amount:state.accountValue})
    const cash = formatCurrency({amount:state.cash})
    const investments = formatCurrency({amount: state.investments})

    //Updates the global state
    const handleFundAction = (buy:boolean, amount: number) => {
        switch(buy) {
            case true: dispatch({type:"DEPOSIT", amount: amount})
                break;
            case false: dispatch({type:"WITHDRAW", amount: amount})
                if(state.userAlert) {
                    alert(state.userAlert)
                    dispatch({type:"RESETALERT"})
                }
                break;
        }
        
    }

    return (<>
        <AccountUI manageFunds={()=>setIsOpen(true)} cash={cash} accountValue={accountValue} investments={investments}/>
        <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)} title="GBP - British pound">
            <ManageFunds fundAction={handleFundAction} cash={cash}/>
        </Modal>
    </>)
}

export default Account