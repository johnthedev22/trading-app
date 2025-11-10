interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

type PageProps = {
    message: string
    fieldStyles: string
    handleSubmitUI: (e: React.FormEvent<LoginFormElement>) => void
}

const LoginPageMobile = ({message, fieldStyles, handleSubmitUI}:PageProps) => {
    const btnColor = fieldStyles.length > 0 ? "bg-purple-500" : "bg-blue-500"

    return(
    <div className="flex flex-col h-full gap-4 m-5">
        <div>
            <h1 className="text-xl font-bold">{message} welcome back!</h1>
        </div>

        <form onSubmit={handleSubmitUI} className="flex flex-col gap-4">
            <div>
                <input type="text" id="username" placeholder="Enter username" className={`p-5 w-full border rounded h-12 ${fieldStyles}`}/>
            </div>
            <div>
                <input type="text" id="password" placeholder="Enter password" className={`p-5 w-full border rounded h-12 ${fieldStyles}`}/>
            </div>
            <div>
                <button type="submit" className={`${btnColor} w-full h-12 bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}>Login</button>
            </div>
        </form>        
    </div>
    )
}

export default LoginPageMobile