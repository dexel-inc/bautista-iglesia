import AnimateOnScroll from '@/components/molecules/AnimateOnScroll.tsx';
import GoinsPastor from "../../../assets/goins-pastor.png";

export default function OurPastor() {
  return (
      <section className="py-16 bg-gray-50 text-gray-800">
          <div className="mx-auto flex flex-col flex-co lg:flex-row gap-12 px-8 justify-center items-center">
              <div className="flex-1 p-2 md:p-6 flex flex-col items-center md:items-start">
                  <AnimateOnScroll
                      animation="animate-fade-right animate-fill-both animate-duration-[2000ms] animate-ease-out">
                      <h2 className="title title-color text-4xl md:text-6xl font-bold mb-4">
                          Nuestro <span className="text-orange-500 font-bold">Pastor</span>
                      </h2>
                  </AnimateOnScroll>
                  <div className="relative p-4 max-w-xl inline lg:hidden">
                      <img src={GoinsPastor} alt="Pastor Roberto Goins" className='w-90 h-98'/>
                  </div>
                  <p className="text-color pt-4 lg:pt-0 text-md md:text-lg leading-relaxed">
                      El pastor Roberto Goins y su familia han dedicado sus vidas al servicio del Señor. Iniciaron su
                      ministerio en Carolina del Sur, sirviendo por casi 12 años a la comunidad hispana. En 2005
                      entregaron sus vidas a Cristo, y su llamado se fortaleció gracias al vínculo cultural con
                      Colombia, país de origen de su esposa.
                      Hoy, guiados por Dios, trabajan en Arizona plantando una iglesia centrada en los principios
                      eternos de la Palabra. Su mayor deseo es que cada persona conozca la verdadera paz y alegría que
                      solo se hallan en una relación con Jesucristo.
                  </p>
              </div>
              <div className="relative p-4 max-w-xl hidden lg:inline">
                  <img src={GoinsPastor} alt="Pastor Roberto Goins" className='w-90 h-98'/>
              </div>
          </div>
      </section>
  );
}