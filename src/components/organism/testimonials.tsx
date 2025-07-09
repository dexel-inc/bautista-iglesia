import Carrousel from '../molecules/Carrousel.tsx';
import AnimateOnScroll from '../molecules/AnimateOnScroll.tsx';
import { useTranslation } from 'react-i18next';

type Testimony = {
  name: string;
  text: string;
  avatar: string;
};

const testimonies: Testimony[] = [
  {
    name: "Lucía Fernández",
    text: `La iglesia ha sido un refugio para mi familia. Aquí aprendimos a confiar en el Señor y a apoyarnos mutuamente. Los estudios bíblicos y la comunión nos han acercado más a Dios y entre nosotros.`,
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=256&h=256&facepad=2",
  },
  {
    name: "Javier Morales",
    text: `Agradezco a Dios por cada predicación y por los hermanos que me animan. He visto cómo Dios transforma vidas y restaura corazones. La iglesia es mi segunda casa y un lugar donde siempre encuentro paz.`,
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&w=256&h=256&facepad=2",
  },
  {
    name: "María González",
    text: `Doy gracias a Dios por la iglesia, donde encontré una familia espiritual. Cada mensaje fortalece mi fe y me anima a seguir adelante. He visto respuestas a mis oraciones y he crecido mucho en mi relación con Cristo.`,
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2",
  },
  {
    name: "Carlos Ramírez",
    text: `Desde que llegué a la iglesia, mi vida cambió. El amor y la enseñanza bíblica me han ayudado a superar momentos difíciles. Ahora sirvo con alegría y he encontrado propósito en servir a Dios y a los demás.`,
    avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2",
  },
];

export default function Testimonials() {
  const { t } = useTranslation();

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
                  src={testimony.avatar}
                  alt={testimony.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-semibold text-lg mb-2 text-center">{testimony.name}</div>
              <p className="
                text-center text-gray-600 text-sm leading-relaxed
                flex-1 flex items-center justify-center
                overflow-hidden
                line-clamp-5
                w-full
              ">
                {testimony.text}
              </p>
            </div>
          </div>
        ))}
      </Carrousel>
    </section>
  );
}