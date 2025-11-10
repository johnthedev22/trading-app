// DeviceContext.tsx
import React, { createContext, useState, useEffect, type ReactNode } from 'react'

// Define the shape of the context value
export interface DeviceContextType {
  isMobile: boolean
  isDesktop: boolean
  browserType: string
}

// Create the context with a default undefined value incase it isnt a desktop or mobile
export const DeviceContext = createContext<DeviceContextType | undefined>(undefined)

// Props for the DeviceProvider component
interface DeviceProviderProps {
  children: ReactNode
}

// DeviceProvider component
export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [browserType, setBrowserType] = useState("")

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent || navigator || (window as any).opera
      const mobileRegex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|rim)|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
      const tabletRegex = /android|ipad|playbook|silk/i

      const isMobileDevice = mobileRegex.test(userAgent) || tabletRegex.test(userAgent)
      setIsMobile(isMobileDevice)
      setIsDesktop(!isMobileDevice)
      setBrowserType(navigator.userAgent)
    }

    // Initial check
    checkDevice()

    // Add event listener for window resize to re-check device type (e.g., responsive changes)
    window.addEventListener('resize', checkDevice)

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, []) // Empty dependency array ensures this runs only once on mount

  const contextValue: DeviceContextType = { isMobile, isDesktop, browserType }

  return (
    <DeviceContext.Provider value={contextValue}>
      {children}
    </DeviceContext.Provider>
  )
}