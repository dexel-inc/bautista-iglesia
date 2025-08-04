import Carrousel from '../molecules/Carrousel.tsx';
import AnimateOnScroll from '../molecules/AnimateOnScroll.tsx';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { testimonies as testimoniesMock, type Testimony } from '@/data/testimonials.ts';
import apiService from "@/domain/services/api.service.ts";

const CHARACTER_LIMIT = 200;

type TestimonyModalProps = {
  testimony: Testimony | null;
  isModalOpen: boolean;
  onClose: () => void;
};

const TestimonyModal = ({ testimony, onClose, isModalOpen }: TestimonyModalProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    const modal = document.getElementById('modal-testimony') as HTMLDialogElement | null;
    if (!modal) return;

    const handleClose = () => onClose();
    modal.addEventListener('close', handleClose);

    return () => modal.removeEventListener('close', handleClose);
  }, [onClose]);

  if (!testimony) return null;

  return (
    <dialog
      id="modal-testimony"
      className="modal modal-bottom md:modal-middle"
      onClose={onClose}
    >
      <div
        className={`
          modal-box transition-all duration-300 ease-in-out transform relative
          ${isModalOpen
            ? 'translate-y-0 md:scale-100 opacity-100'
            : 'translate-y-full md:translate-y-4 md:scale-95 opacity-0'}
        `}
      >
        <div className="flex flex-col items-center p-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow mb-4 flex items-center justify-center bg-black">
            <img
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2"
                alt={`Foto de perfil de ${testimony.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-xl mb-4 text-center">{testimony.name}</h3>
          <div className="text-gray-600 leading-relaxed whitespace-pre-line">
            {testimony.content}
          </div>
        </div>
      </div>
      
      {/* Fixed close button that follows viewport */}
      <div className="fixed top-25 right-4 z-[9999]">
        <form method="dialog">
          <button 
            className="btn btn-link hover:bg-gray-100 radio-xl fill-gray-800 text-gray-800 w-8 h-8 bg-white shadow-lg rounded-full border border-gray-200"
            aria-label={t("accessibility.buttons.close")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" aria-hidden="true">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
          </button>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button aria-label={t("accessibility.buttons.close")}>close</button>
      </form>
    </dialog>
  );
};

export default function Testimonials() {
  const { t } = useTranslation();
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);

  const getTestimonies = async () => {
    try {
      let testimoniesFromApi = await apiService.indexTestimonies();

      if (!testimoniesFromApi || testimoniesFromApi.length === 0) {
        testimoniesFromApi = testimoniesMock;
      }

      setTestimonies(testimoniesFromApi);
    } catch (error) {
      console.warn(error);
      setTestimonies(testimoniesMock)
    }
  }

  useEffect(() => {
    getTestimonies();
  }, []);

  const selectTestimony = (testimony: Testimony) => {
    setSelectedTestimony(testimony);
  };

  useEffect(() => {
    const modal = document.getElementById('modal-testimony') as HTMLDialogElement | null;

    if (selectedTestimony && modal) {
      modal.showModal();
      requestAnimationFrame(() => setIsModalOpen(true));
    }
  }, [selectedTestimony]);

  const closeModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      const modal = document.getElementById('modal-testimony') as HTMLDialogElement | null;
      modal?.close();
      setSelectedTestimony(null);
    }, 300);
  };

  const truncateText = (text: string, limit: number) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  return (
    <section className="py-12 px-6 md:px-16 bg-[#f7f8fa]">
      <AnimateOnScroll animation="animate-fade-right animate-fill-both animate-duration-[2000ms] animate-ease-out">
        <h2 className="title title-color text-4xl font-bold text-center mb-2">
          {t('testimonials.title')}
        </h2>
        <div className="text-center text-gray-600 text-lg mb-8">
          {t('testimonials.bible_msg')}<br />
          <span className="block mt-1 mb-2 text-gray-500 text-base">
            {t('testimonials.verse')}
          </span>
        </div>
      </AnimateOnScroll>
      <Carrousel
        className="w-full"
        slides={testimonies.map((_, i) => i.toString())}
        lengthWithPageLG={3}
      >
        {testimonies.map((testimony, i) => (
          <div
            key={i}
            className="
              snap-center shrink-0 px-1 md:px-5
              flex items-center justify-center h-full
              w-full
              md:max-w-[280px] md:min-w-[300px]
              lg:max-w-[400px] lg:min-w-[450px]
            "
          >
            <div className="
              flex flex-col items-center justify-center
              bg-[#ffffff] rounded-tr-[1.5rem] rounded-bl-[1.5rem]
              rounded-tl-[5rem] rounded-br-[5rem]
              py-10 px-6 w-full shadow
              min-h-[500px] max-h-[520px] 
              lg:min-h-[320px] lg:max-h-[340px]
              h-full
            ">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow mb-4 flex items-center justify-center bg-black">
                <img
                  src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2"
                  alt="anonymous user"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-semibold text-lg mb-2 text-center">{testimony.name}</div>
              <div className="flex-1 flex flex-col items-center justify-center w-full">
                <p className="
                  text-center text-gray-600 text-sm leading-relaxed
                  overflow-hidden
                  w-full
                ">
                  {truncateText(testimony.content, CHARACTER_LIMIT)}
                </p>
                {testimony.content.length > CHARACTER_LIMIT && (
                  <button
                    onClick={() => selectTestimony(testimony)}
                    className="mt-3 text-primary-500 hover:text-primary-600 text-sm font-medium underline"
                  >
                    {t('testimonials.read_more')}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </Carrousel>

      <TestimonyModal
        testimony={selectedTestimony}
        isModalOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}