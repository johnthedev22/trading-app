//export modal open state
import { useState } from "react"

const useModal = (openByDefault: boolean) => {
    const [isOpen, setIsOpen] = useState(openByDefault)

    return {isOpen, setIsOpen}
}

export default useModal