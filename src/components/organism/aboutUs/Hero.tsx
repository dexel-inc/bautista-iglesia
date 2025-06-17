import churchImage from "../../../assets/church-image.png";
import goinsFamily from "../../../assets/goins-family.png";
import { useTranslation } from 'react-i18next';
import AnimateOnScroll from '@/components/molecules/AnimateOnScroll.tsx';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div
        id="home"
        className="w-full h-[100vh]  bg-cover bg-center bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${churchImage})`, alignSelf: 'stretch'}}
    >
      <div className="w-full h-full bg-black/30 flex items-center content-center justify-center px-30 flex flex-col lg:flex-row">
        <div className="text-left text-white h-full flex flex-col content-center justify-center space-y-4 w-full">
          <AnimateOnScroll animation="animate-fade-down animate-duration-[4000ms] animate-ease-out">
            <h1 className="title text-4xl md:text-6xl font-bold">
              {t('menu.aboutUs')}
            </h1>
          </AnimateOnScroll>
          <h2 className="text-md">
            Somos una iglesia fundamental dedicada a la familia. Nuestro
            propósito es ser una iglesia Bíblica, Cristo-céntrica, y misionera
            que sirve a la población Hispana. Creemos que la Palabra de Dios
            tiene las respuestas que el hombre necesita, y tratamos de predicar
            y enseñarla correctamente.
          </h2>
        </div>
        <div className="w-full h-full content-end">
          <img
              src={goinsFamily}
              alt="Family"
              className="w-full h-[50vh]"
          />
        </div>
      </div>
    </div>
  );
}