import churchImg from "../../assets/community-meeting.jpg";

export default function WhoWeAre() {
  return (
    <div className="w-full h-[100vh] py-8 px-4 bg-white flex flex-col justify-center">
      <div className="max-w-4xl w-full rounded-xl flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-6 p-6 md:p-10">
        <div className="flex-1">
          <h2 className="title title-color text-4xl md:text-6xl font-bold mb-4">
            ¿Quienes somos?
          </h2>
          <p className="text-color text-sm md:text-lg leading-relaxed">
            Somos una iglesia fundamental dedicada a la familia. Nuestro
            propósito es ser una iglesia Bíblica, Cristo-céntrica, y misionera
            que sirve a la población Hispana. Creemos que la Palabra de Dios
            tiene las respuestas que el hombre necesita, y tratamos de
            predicar y enseñarla correctamente. Si está buscando un lugar de
            congregarse, o está interesado en conocer más de Dios,{" "}
            <span className="text font-semibold">
              ¡le extenderemos una calurosa bienvenida!
            </span>
          </p>
        </div>
      </div>
      <div className="relative w-full flex flex-col items-center mt-4">
          <div className="relative w-[75vw] h-[30vh] flex justify-center items-end z-10">
            <img
              src={churchImg}
              alt="Congregación"
              className="w-[75vw] h-[30vh] object-cover rounded-3xl shadow-lg border-4 border-white"
              style={{ zIndex: 2 }}
            />
          </div>
          <div className="-mt-20 w-[90vw] h-36 bg-orange-300 rounded-t-full mx-auto z-0"></div>
        </div>
    </div>
  );
}