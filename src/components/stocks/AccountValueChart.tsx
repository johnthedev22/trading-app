// Calculate the Account value using the "part over the whole" principal
// ie  = the part over the whole. 
import { useAccount } from "../../hooks/useAccount"

const AccountValueChart = () => {
    const { state } = useAccount()
    const backgroundStyle: React.CSSProperties = state.investments === 0 
    ?   {  background: `conic-gradient( green 0% ${state.cash / state.accountValue * 100}%  )` }
    :   state.investments === state.accountValue 
    ?   {  background: `conic-gradient( lightgray 0% ${state.cash / state.accountValue * 100}%  )` }
    : { background: `conic-gradient( 
            green 0% ${state.cash / state.accountValue * 100}%, 
            lightgray ${state.cash / state.accountValue * 100}% ${state.investments / state.accountValue * 100}% 
        )` }

    return(
        <>
        <div 
                style={{
                    width: "47px",
                    height: "47px",
                    borderRadius: "50%",
                    ...backgroundStyle,
                }}
            > </div>
        </>
    )
}

export default AccountValueChart