import { ComputerDesktopIcon, CurrencyPoundIcon, CurrencyDollarIcon, CurrencyEuroIcon } from "@heroicons/react/24/outline"
import { useTheme } from "../../hooks/useTheme"
import { useState, useEffect } from 'react'

export default function LoginPageIcons() {
    const { state } = useTheme()
    const [actionClassRed, setActionClassRed] = useState("element-initial")
    const [actionClassGreen, setActionClassGreen] = useState("element-initial")
    const [actionClassBlue, setActionClassBlue] = useState("element-initial")

    useEffect(()=>{
        setActionClassRed("element-initial")
        setActionClassGreen("element-initial")
        setActionClassBlue("element-initial")
    },[state.theme])

    type ComponentItem = {
        name: string 
        iconStyles: string
        animationEnd?: () => void
    }
    //allow any string to access the react element type
    type IconElements = {
        [key: string]: React.ElementType
    }

    const components:IconElements = {
        ComputerDesktopIcon,
        CurrencyPoundIcon,
        CurrencyDollarIcon,
        CurrencyEuroIcon,
    }

    const handleAnimationEnd = () => {
        setActionClassRed(prevValue => prevValue + " element-final-red")
        setActionClassGreen(prevValue => prevValue + " element-final-green")
        setActionClassBlue(prevValue => prevValue + " element-final-blue")
    }
    
    const iconData:ComponentItem[] = [
        {
            name: 'ComputerDesktopIcon',
            iconStyles: state.theme.length > 0 ? "z-10 shake-element text-purple-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" : "",
            animationEnd: handleAnimationEnd
        },
        {
            name: 'CurrencyPoundIcon',
            iconStyles: state.theme.length > 0 ? `${actionClassRed} shake-element text-orange-500 w-25 top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2` : "w-25"
        },
        {
            name: 'CurrencyDollarIcon',
            iconStyles: state.theme.length > 0 ? `${actionClassGreen} shake-element text-green-500 w-25 top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2` : "w-25"
        },
        {
            name: 'CurrencyEuroIcon',
            iconStyles: state.theme.length > 0 ? `${actionClassBlue} shake-element text-blue-500 w-25 top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2` : "w-25"
        }
    ]
    return(
    <>
        {iconData.map((item) => {
            const Component = components[item.name]

            if(!Component) return null

            {/* spread operator applies the key: value as a prop to the component */}
            return <Component key={item.name} className={`${item.iconStyles}`} 
                        {...(item.animationEnd && { onAnimationEnd: item.animationEnd })}
                    />
        })}
        
    </>
    )
}