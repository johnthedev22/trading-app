//reuseable modal for improved consistency
import { createPortal } from 'react-dom';
import { type ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

interface ModalProps {
  title: string
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({title, isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  const { state } = useTheme()
  const classStyles = state.theme.length > 0 ? "bg-black text-white" : "bg-white text-black"

  return createPortal(
    <div className="absolute flex items-center justify-center min-h-screen">     
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-100/50"></div>
       
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className={`w-full h-full md:w-96 md:h-auto md:rounded-2xl md:shadow-lg ${classStyles}`}>
            <div className="relative left-0 top-0 dark:text-white grid grid-cols-[33%_66%]">
              <div><XMarkIcon className=" hover:cursor-pointer h-6 w-6 m-3" onClick={onClose} /></div>
              <div className="pt-3 text-left">{title}</div>              
            </div>
            
            <div className="pt-0 p-6">
              {children}
            </div>
          </div>
        </div>
    </div>,
    document.body // Render the modal outside of the main app root for better z-indexing and accessibility
  );
};

export default Modal;