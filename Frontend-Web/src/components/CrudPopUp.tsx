import React, { useRef, useEffect, useState } from 'react';
import checkmark from '../assets/images/Check.webm';

interface CrudUsuarioPopProps {
  userData: { nome: string; email: string; cargo: string };
  onClose: () => void;
  onCloseParent: () => void; // New prop to close the parent modal
}

const CrudUsuarioPop: React.FC<CrudUsuarioPopProps> = ({ userData, onClose, onCloseParent }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleTimeUpdate = () => {
        const duration = video.duration;
        const targetTime = duration * 0.6;
        if (video.currentTime >= targetTime) {
          video.pause();
        }
      };
      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose(); // Close the popup
      onCloseParent(); // Close the parent modal
    }, 300); // Match animation duration
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-gray-500/80 flex items-center justify-center z-50">
          <style>
            {`
              @keyframes scaleIn {
                from {
                  transform: scale(0.7);
                  opacity: 0;
                }
                to {
                  transform: scale(1);
                  opacity: 1;
                }
              }
              @keyframes scaleOut {
                from {
                  transform: scale(1);
                  opacity: 1;
                }
                to {
                  transform: scale(0.7);
                  opacity: 0;
                }
              }
            `}
          </style>
          <div
            ref={popupRef}
            className={`w-120 h-140 bg-white shadow-lg rounded-xl flex flex-col items-center relative ${
              isOpen ? 'animate-[scaleIn_300ms_ease-out]' : 'animate-[scaleOut_300ms_ease-in]'
            }`}
          >
            <div className="relative overflow-hidden w-100 h-100 mb-2">
              <video
                ref={videoRef}
                src={checkmark}
                className="object-contain absolute -top-4 left-0 rounded-full"
                autoPlay
                muted
              />
            </div>
            <p className="text-base font-semibold text-gray-800 tracking-wide uppercase text-xl mt-[-20px]">
              Novo usuário criado com êxito!
            </p>
            <div className="mt-4 text-center">
              <p><strong>Nome:</strong> {userData.nome}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Cargo:</strong> {userData.cargo === 'desenvolvedor' ? 'Administrador' : 'Viewer'}</p>
            </div>
            <div className="w-full pt-15 pl-15 pr-10 flex justify-end absolute bottom-4">
              <button
                onClick={handleClose}
                type="button"
                className="w-25 h-11.5 gap-2 text-xl font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center cursor-pointer justify-center"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CrudUsuarioPop;