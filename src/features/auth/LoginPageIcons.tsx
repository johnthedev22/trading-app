import { ComputerDesktopIcon, CurrencyPoundIcon, CurrencyDollarIcon, CurrencyEuroIcon, NewspaperIcon, GlobeAmericasIcon } from "@heroicons/react/24/outline"
import { useTheme } from "../../hooks/useTheme"
import { useState, useEffect, useRef } from "react"

export default function LoginPageIcons() {
    const { state } = useTheme()
    const elementRef = useRef<SVGSVGElement>(null)
    const [repeatAnimation, setRepeatAnimation] = useState<boolean>(false)
    const classNames: string = "w-25 top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2"

    type ActionClassType = {
        [key:string]: string 
    }

    type ComponentItem = {
        name: string 
        iconStyles: string
        applyRef?: boolean
        animationEnd?: () => void
    }

    //allow any string to access the react element type
    type IconElements = {
        [key: string]: React.ElementType
    }

    const [actionClass, setActionClass] = useState<ActionClassType>({
        gbp: "element-initial",
        usd: "element-initial",
        eur: "element-initial",
        news: "element-initial",
        globe: "element-initial"
    })

    const [actionShake, setActionShake] = useState<ActionClassType>({
        main: "shake-element",
        news: "shake-element"
    })

    useEffect(()=>{
        setActionClass({
            gbp: "element-initial",
            usd: "element-initial",
            eur: "element-initial",
            news: "element-initial",
            globe: "element-initial"
        })

        setActionShake({
            main: "shake-element",
            news: "shake-element"
        })

        setRepeatAnimation(false)
    },[state.theme])

    useEffect(() => {
        const element = elementRef.current
        

        if(!element || !repeatAnimation) return  

        setActionShake({
            main: "shake-element",
            news: "shake-element"
        })
        
        const handleAnimationStart = () => {
            setActionClass(prev => ({
            ...prev,
            news: "element-initial element-final-news",
            globe: "element-initial element-final-globe",
            }))
        }

        element.addEventListener("animationstart", handleAnimationStart)

        //cleanup of the animation
        return () => element.removeEventListener("animationstart", handleAnimationStart)
        
    },[repeatAnimation])

    const components:IconElements = {
        ComputerDesktopIcon,
        CurrencyPoundIcon,
        CurrencyDollarIcon,
        CurrencyEuroIcon,
        NewspaperIcon,
        GlobeAmericasIcon
        
    }

    const handleAnimationEnd = () => {
        setActionClass(prev => ({
            ...prev,
            gbp: "element-initial element-final-red",
            usd: "element-initial element-final-green",
            eur: "element-initial element-final-blue"
        }))

        setActionShake({
            main: "",
            news: ""
        })

        setRepeatAnimation(true)
    };
    
    const iconData:ComponentItem[] = [
        {
            name: "ComputerDesktopIcon",
            iconStyles: state.theme.length > 0 ? `${actionShake.main} z-10 text-purple-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[330px]` : `${actionShake.main} z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[330px]`,
            applyRef: true,
            animationEnd: handleAnimationEnd
        },
        {
            name: "CurrencyPoundIcon",
            iconStyles: state.theme.length > 0 ? `${actionClass.gbp} shake-element text-red-500 ${classNames}` : `${actionClass.gbp} shake-element ${classNames}`
        },
        {
            name: "CurrencyDollarIcon",
            iconStyles: state.theme.length > 0 ? `${actionClass.usd} shake-element text-green-500 ${classNames}` : `${actionClass.usd} shake-element ${classNames}`
        },
        {
            name: "CurrencyEuroIcon",
            iconStyles: state.theme.length > 0 ? `${actionClass.eur} shake-element text-blue-500 ${classNames}` : `${actionClass.eur} shake-element ${classNames}`
        },
        {
            name: "NewspaperIcon",
            iconStyles: state.theme.length > 0 ? `${actionClass.news} ${actionShake.news} text-orange-500 ${classNames}` : `${actionClass.news} shake-element ${classNames}`
        },
        {
            name: "GlobeAmericasIcon",
            iconStyles: state.theme.length > 0 ? `${actionClass.globe} ${actionShake.news} text-yellow-500 ${classNames}` : `${actionClass.globe} shake-element ${classNames}`
        }
    ]

    
    return(
    <>
        {iconData.map((item) => {
            const Component = components[item.name]

            if(!Component) return null

            const props = {
                className: item.iconStyles,
                onAnimationEnd: typeof item.animationEnd === "function" ? item.animationEnd : undefined,
                ref: item.applyRef ? (elementRef as React.Ref<SVGSVGElement>) : undefined
            }

            return <Component key={item.name} {...props} />
        })}
        
    </>
    )
}