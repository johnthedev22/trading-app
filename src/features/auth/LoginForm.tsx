import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme.ts'
import { useAuth } from '../../hooks/useAuth.ts'
import { useDevice } from '../../hooks/useDevice.ts'
import LoginPageUI from "../../components/auth/LoginPageUI.tsx"
import LoginPageMobile from "../../components/auth/LoginPageMobile.tsx"
import { timeOfDayMessage } from '../../helpers/time.ts'
import type { LoginFormElement } from './auth.types'

const LoginPage = () => {
    const navigate = useNavigate()
    const { state } = useTheme()
    const { dispatch } = useAuth()
    const { isMobile } = useDevice()

    const fieldStyles = state.theme.length > 0 ? "border-orange-500 text-white" : ""
    const message = timeOfDayMessage()
    
    const handleSubmit = (e: React.FormEvent<LoginFormElement>) => {
        e.preventDefault()

        const username = e.currentTarget.elements.username.value
        const password = e.currentTarget.elements.password.value
        const envUsername = import.meta.env.VITE_TRADE_UNAME
        const envPassword = import.meta.env.VITE_TRADE_PWORD
        
        if(username === envUsername && password === envPassword) {
            dispatch({type: "LOGIN"})
            navigate("/")
        }
    }
    return (
        <>
        {
            isMobile 
            ? <LoginPageMobile message={message} fieldStyles={fieldStyles} handleSubmitUI={handleSubmit} />
            : <LoginPageUI message={message} theme={state.theme} fieldStyles={fieldStyles} handleSubmitUI={handleSubmit}/>
        }
        </>
        
    )
}

export default LoginPage