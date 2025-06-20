import AnimateOnScroll from '@/components/molecules/AnimateOnScroll.tsx';
import M1 from "../../../assets/misionaries/IMG-20250610-WA0031.jpg";
import M2 from "../../../assets/misionaries/IMG-20250530-WA0056.jpg";
import M3 from "../../../assets/misionaries/IMG-20250610-WA0026.jpg";
import M4 from "../../../assets/misionaries/IMG-20250610-WA0032.jpg";
import {useState} from 'react';
import {Missionary} from "@/types/Missionary.ts";

const missionaries = [
    {
        name: 'Goins Family',
        image: M2,
        description:
            'Missionaries to the Hispanic people of Arizona. Please pray for the Goins family as they continue serving faithfully.',
    },
    {
        name: 'MLAI',
        image: M1,
        description:
            'Missions In Action International. Supporting church planting and training nationals around the world.',
    },
    {
        name: 'Stoltzfus Family',
        image: M3,
        description:
            'Serving through Prayer Baptist Missions International. Ministry of HELPS.',
    },
    {
        name: 'Kings to Mexico',
        image: M4,
        description:
            'Reaching the heart of Mexico. Pray for the King family as they minister in Guanajuato.',
    },
];

type MissionaryCardProps = {
    missionary: Missionary | null;
    onClick: (m: Missionary | null) => void;
};


const MissionaryCard = ({ missionary, onClick }: MissionaryCardProps) => {
    if (!missionary) return null;

    return <div
        className="card bg-base-100 shadow-xl cursor-pointer rounded-lg hover:scale-105 transition-transform h-50"
        onClick={() => onClick(missionary)}
    >
        <img src={missionary.image} alt={missionary.name} className="rounded-lg w-full h-full object-contain"/>
    </div>
}

const MissionaryModal = ({ missionary, onClick }: MissionaryCardProps) => {
    if (!missionary) return null;

   return <dialog id="modal-missionary" className="modal">
        <div className="modal-box">
            <img src={missionary.image} alt={missionary.name}
                 className="w-full max-h-80 object-contain rounded"/>
            <h3 className="text-xl font-bold mt-4">{missionary.name}</h3>
            <p className="py-2 text-sm text-gray-600 leading-relaxed">{missionary.description}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button onClick={() => onClick(null)}>close</button>
        </form>
    </dialog>
}

const MissionariesSection = () => {
    const [selectedMissionary, setSelectedMissionary] = useState<Missionary | null>(null);

    const selecta = (missionary: Missionary | null) => {
        setSelectedMissionary(missionary);

        if (missionary) {
            const modal = document.getElementById('modal-missionary') as HTMLDialogElement | null;
            modal?.showModal();
        }
    };

    return (
        <section className="bg-gray-50 py-16 px-4 text-center">
            <AnimateOnScroll
                animation="animate-fade-right animate-fill-both animate-duration-[2000ms] animate-ease-out">
                <h2 className="title title-color text-4xl md:text-6xl font-bold mb-4">
                    Misioneros
                </h2>
            </AnimateOnScroll>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                Conozca a las familias misioneras que están llevando el Evangelio a diferentes regiones del mundo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {missionaries.map((m) => (
                    <MissionaryCard key={m.name} missionary={m} onClick={selecta}/>
                ))}
            </div>

            <MissionaryModal missionary={selectedMissionary} onClick={() => selecta}/>
        </section>
    );
};

export default MissionariesSection;