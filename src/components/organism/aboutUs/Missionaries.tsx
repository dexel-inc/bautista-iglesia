import AnimateOnScroll from '@/components/molecules/AnimateOnScroll.tsx';
import M1 from "../../../../public/assets/misionaries/IMG-20250610-WA0031.jpg";
import M2 from "../../../../public/assets/misionaries/IMG-20250530-WA0056.jpg";
import M3 from "../../../../public/assets/misionaries/IMG-20250610-WA0026.jpg";
import M4 from "../../../../public/assets/misionaries/IMG-20250610-WA0032.jpg";
import { useEffect, useState } from 'react';
import { Missionary } from "@/types/Missionary.ts";
import { useTranslation } from "react-i18next";

const missionaries = [
    { name: 'Goins Family', image: M2, description: 'Missionaries to the Hispanic people of Arizona. Please pray for the Goins family as they continue serving faithfully.' },
    { name: 'Missions In Action International', image: M1, description: 'Supporting church planting and training nationals around the world.' },
    { name: 'Stoltzfus Family', image: M4, description: 'Serving through Prayer Baptist Missions International. Ministry of HELPS.' },
    { name: 'Kings to Mexico', image: M3, description: 'Reaching the heart of Mexico. Pray for the King family as they minister in Guanajuato.' },
];

type MissionaryCardProps = {
    missionary: Missionary;
    onClick: (m: Missionary) => void;
};

const MissionaryCard = ({ missionary, onClick }: MissionaryCardProps) => (
    <div
        className="card bg-base-100 shadow-xl cursor-pointer rounded-lg hover:scale-105 transition-transform h-60 md:h-50"
        onClick={() => onClick(missionary)}
    >
        <img src={missionary.image} alt={missionary.name} className="rounded-lg w-full h-full object-contain" />
    </div>
);

type MissionaryModalProps = {
    missionary: Missionary | null;
    isModalOpen: boolean;
    onClose: () => void;
};

const MissionaryModal = ({ missionary, onClose, isModalOpen }: MissionaryModalProps) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const modal = document.getElementById('modal-missionary') as HTMLDialogElement | null;
        if (!modal) return;

        const handleClose = () => onClose();
        modal.addEventListener('close', handleClose);

        return () => modal.removeEventListener('close', handleClose);
    }, [onClose]);

    if (!missionary) return null;

    return (
        <dialog
            id="modal-missionary"
            className="modal modal-bottom md:modal-middle"
            onClose={onClose}
        >
            <div
                className={`modal-box p-0 transition-all duration-300 ease-in-out transform ${
                    isModalOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                }`}
            >
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center h-120 bg-gray-300 rounded-sm">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 20 18" aria-hidden="true">
                            <path
                                d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                    </div>
                )}

                <img
                    src={missionary.image}
                    alt={missionary.name}
                    onLoad={() => setLoaded(true)}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} max-h-120 rounded`}
                />

                <div className="p-4">
                    <h3 className="text-xl font-bold">{missionary.name}</h3>
                    <p className="py-2 text-sm text-gray-600 leading-relaxed">{missionary.description}</p>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

const MissionariesSection = () => {
    const [selectedMissionary, setSelectedMissionary] = useState<Missionary | null>(null);
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const selectMissionary = (missionary: Missionary) => {
        setSelectedMissionary(missionary); // solo setea aquí
    };

    useEffect(() => {
        const modal = document.getElementById('modal-missionary') as HTMLDialogElement | null;

        if (selectedMissionary && modal) {
            modal.showModal();
            requestAnimationFrame(() => setIsModalOpen(true));
        }
    }, [selectedMissionary]);

    const closeModal = () => {
        setIsModalOpen(false);

        setTimeout(() => {
            const modal = document.getElementById('modal-missionary') as HTMLDialogElement | null;
            modal?.close();
            setSelectedMissionary(null);
        }, 300);
    };

    return (
        <section className="bg-gray-50 py-16 px-4 text-center">
            <AnimateOnScroll animation="animate-fade-right animate-fill-both animate-duration-[2000ms] animate-ease-out">
                <h2 className="title title-color text-4xl md:text-6xl font-bold mb-4">{t('missionaries.missionaries')}</h2>
            </AnimateOnScroll>

            <p className="text-gray-600 max-w-2xl mx-auto mb-10">{t('missionaries.description')}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {missionaries.map((m) => (
                    <MissionaryCard key={m.name} missionary={m} onClick={selectMissionary} />
                ))}
            </div>

            <MissionaryModal
                missionary={selectedMissionary}
                isModalOpen={isModalOpen}
                onClose={closeModal}
            />
        </section>
    );
};

export default MissionariesSection;