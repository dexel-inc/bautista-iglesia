import Logo from './Logo.tsx';
import churchImage from "@/assets/church-image.png";

function Footer() {
  return (
    <footer className="bg-white text-gray-400">
        <section
          className="max-w-6xl mx-auto px-6 py-10 rounded-3xl mb-10"
          style={{
            backgroundImage: `url(${churchImage.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="bg-black bg-opacity-40 p-10 rounded-3xl text-center text-white">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Suscríbete para recibir noticias<br />sobre nuestros próximos eventos
            </h2>
            <form className="max-w-xl mx-auto flex flex-col md:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="Ingresa tu correo"
                className="w-full md:flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo className="w-12 h-12"></Logo>
              <h3 className="font-semibold text-gray-800">Iglesia Bautista fundamental</h3>
            </div>
            <p className="text-sm mb-2">
              Somos una iglesia fundamental dedicada a la familia. Nuestro propósito es ser una iglesia Bíblica,
              Cristo-céntrica, y misionera que sirve a la población Hispana.{' '}
              <a href="#" className="text-blue-600 underline hover:text-blue-800">Leer más</a>
            </p>
            <div className="mt-4">
              <h4 className="font-semibold text-sm uppercase text-gray-800">Horarios</h4>
              <p className="text-sm">Jueves — 7:00pm</p>
              <p className="text-sm">Domingos — 11:00am</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase text-gray-800 mb-3">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-800">Inicio</a></li>
              <li><a href="#" className="hover:text-gray-800">Radio</a></li>
              <li><a href="#" className="hover:text-gray-800">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-gray-800">Donaciones</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase mb-3 text-gray-800">Síguenos</h4>
            <a
              href="#"
              aria-label="Canal de YouTube"
              className="inline-flex items-center justify-center w-10 h-10 border border-gray-400 rounded-full hover:bg-gray-200"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M19.6 3.2H4.4C3.1 3.2 2 4.3 2 5.6v12.8c0 1.3 1.1 2.4 2.4 2.4h15.2c1.3 0 2.4-1.1 2.4-2.4V5.6c0-1.3-1.1-2.4-2.4-2.4zM10 16V8l6 4-6 4z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 py-6 text-center text-sm">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2025. All Right Reserved. Dexel inc</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-800">Términos y condiciones</a>
              <a href="#" className="hover:text-gray-800">Política de privacidad</a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer