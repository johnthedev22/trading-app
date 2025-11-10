import { DeviceContext, type DeviceContextType } from "../context/DeviceContext"
import { useContext } from "react"

// Custom hook to consume the device context
export const useDevice = (): DeviceContextType => {
  const context = useContext(DeviceContext)
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider')
  }
  return context
}