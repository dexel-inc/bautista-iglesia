import Carrousel from '../molecules/Carrousel.tsx';
import AnimateOnScroll from '../molecules/AnimateOnScroll.tsx';

type Testimony = {
  name: string;
  text: string;
  avatar: string;
};

const testimonies: Testimony[] = [
  {
    name: "John Doe",
    text: `Lorem ipsum dolor sit amet consectetur. Tortor massa nisl quam sit. Vitae congue ultrices neque penatibus mi in quisque. Leo in cursus enim magnis ante. Leo in cursus enim magnis ante. Leo in cursuso.`,
    avatar: "/avatars/john-doe.jpg",
  },
  {
    name: "John Doe",
    text: `Lorem ipsum dolor sit amet consectetur. Tortor massa nisl quam sit. Vitae congue ultrices neque penatibus mi in quisque. Leo in cursus enim magnis ante. Leo in cursus enim magnis ante. Leo in cursuso.`,
    avatar: "/avatars/john-doe.jpg",
  },
  {
    name: "John Doe",
    text: `Lorem ipsum dolor sit amet consectetur. Tortor massa nisl quam sit. Vitae congue ultrices neque penatibus mi in quisque. Leo in cursus enim magnis ante. Leo in cursus enim magnis ante. Leo in cursuso.`,
    avatar: "/avatars/john-doe.jpg",
  },
  {
    name: "John Doe",
    text: `Lorem ipsum dolor sit amet consectetur. Tortor massa nisl quam sit. Vitae congue ultrices neque penatibus mi in quisque. Leo in cursus enim magnis ante. Leo in cursus enim magnis ante. Leo in cursuso.`,
    avatar: "/avatars/john-doe.jpg",
  },
];

export default function Testimonies() {
  return (
    <section className="py-12 px-4 md:px-16 bg-[#f7f8fa]">
      <AnimateOnScroll animation="animate-fade-right animate-fill-both animate-duration-[2000ms] animate-ease-out">
        <h2 className="title title-color text-4xl font-bold text-center mb-2">
          Testimonios
        </h2>
        <div className="text-center text-gray-600 text-lg mb-8">
          “Bienaventurados los que guardan sus testimonios, Y con todo el corazón le buscan”<br />
          <span className="block mt-1 mb-2 text-gray-500 text-base">Salmos 119:2</span>
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
              snap-center shrink-0 px-5
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