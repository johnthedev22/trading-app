import LoginPageIcons from "../../features/auth/LoginPageIcons"

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

type PageProps = {
    message: string
    theme: string //better to pass global state as a prop for dumb components
    fieldStyles: string
    handleSubmitUI: (e: React.FormEvent<LoginFormElement>) => void
}

const LoginPageUI = ({message, theme, fieldStyles, handleSubmitUI}:PageProps) => {
    return (
    <div className="grid grid-cols-2">
        <div>
            <div className={`relative w-full h-screen bg-gray-200 ${theme}`}>
                <LoginPageIcons />
            </div>            
        </div>
        <div className={`w-full max-w-xl `}>
            <h1 className="text-3xl font-bold">{message} welcome back!</h1>
            <form onSubmit={handleSubmitUI} className={`bg-white px-8 pt-6 pb-8 mb-4 ${theme}`}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">
                    Username
                    </label>
                    <input className={`${fieldStyles} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline sm:w-full`} id="username" type="text" placeholder="Username" />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">
                    Password
                    </label>
                    <input className={`${fieldStyles} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="password" type="password" placeholder="******************" />
                    <p className="text-xs italic">Please enter a password.</p>
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="hover:cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                    </a>
                </div>
            </form>
        </div>
    </div>  
    )
}
export default LoginPageUI