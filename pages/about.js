import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function About() {
  return (
    <div className="bg-[#F4F6F8] min-h-screen pt-20">
      {/* SEO */}
      <SEOHead
        title="Sobre Nosework Trial – Asociación y Modalidad"
        description="Conoce la historia, misión y valores de Nosework Trial. El equipo promotor y la visión de la modalidad deportiva de olfato canino."
        canonical="/about"
        ogImage="/images/og-image.jpg"
        additionalMeta={{
          keywords:
            "sobre nosework trial, asociación nosework, historia nosework, misión valores nosework",
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="bg-navy text-white py-16 md:py-20 text-center">
        <div className="container-redesign">
          <h1 className="text-h1-redesign-mobile md:text-h1-redesign font-bold mb-4">Sobre Nosework Trial</h1>
          <p className="text-xl md:text-2xl text-white/90">Conoce nuestra historia, misión y valores</p>
        </div>
      </header>

      {/* Contenido Principal */}
      <main>
        <div className="container-redesign py-12 space-y-12">
          {/* Sección de Misión */}
          <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 text-center max-w-4xl mx-auto">
            <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">Nuestra Misión</h2>
            <p className="text-body-redesign-lg text-neutral-text-medium">
              Fomentar el aprendizaje y la originalidad en la detección canina, brindando un espacio inclusivo donde todos
              puedan aprender, participar y destacar. Promovemos el bienestar del perro como prioridad absoluta y
              creemos en un deporte accesible para todos.
            </p>
          </section>

          {/* Sección de Visión */}
          <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 text-center max-w-4xl mx-auto">
            <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">Nuestra Visión</h2>
            <p className="text-body-redesign-lg text-neutral-text-medium">
              Ser la referencia en España del nosework deportivo, creando una comunidad unida de guías y perros que
              disfrutan del trabajo de olfato de forma estructurada, ética y respetuosa. Aspiramos a que Nosework Trial
              sea reconocido como una modalidad deportiva que prioriza el bienestar animal y la inclusión.
            </p>
          </section>

          {/* Sección de Valores */}
          <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
            <h2 className="text-h2-redesign font-bold text-neutral-text-dark text-center mb-8">Nuestros Valores</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 border-l-4 border-gold rounded-r-lg hover:bg-[#F4F6F8] transition-colors">
                <h3 className="text-h3-redesign font-bold mb-2 text-navy">Bienestar del Perro</h3>
                <p className="text-body-redesign text-neutral-text-medium">
                  El bienestar y la felicidad del perro son nuestra máxima prioridad en todas las actividades.
                </p>
              </div>
              <div className="text-center p-6 border-l-4 border-gold rounded-r-lg hover:bg-[#F4F6F8] transition-colors">
                <h3 className="text-h3-redesign font-bold mb-2 text-navy">Inclusión</h3>
                <p className="text-body-redesign text-neutral-text-medium">
                  Todos los perros y guías son bienvenidos, sin importar raza, edad o nivel de experiencia.
                </p>
              </div>
              <div className="text-center p-6 border-l-4 border-gold rounded-r-lg hover:bg-[#F4F6F8] transition-colors">
                <h3 className="text-h3-redesign font-bold mb-2 text-navy">Aprendizaje</h3>
                <p className="text-body-redesign text-neutral-text-medium">
                  Creemos en el aprendizaje continuo y en el crecimiento tanto del perro como del guía.
                </p>
              </div>
              <div className="text-center p-6 border-l-4 border-gold rounded-r-lg hover:bg-[#F4F6F8] transition-colors">
                <h3 className="text-h3-redesign font-bold mb-2 text-navy">Respeto</h3>
                <p className="text-body-redesign text-neutral-text-medium">
                  Respeto hacia los perros, los guías, los jueces y todos los miembros de la comunidad.
                </p>
              </div>
              <div className="text-center p-6 border-l-4 border-gold rounded-r-lg hover:bg-[#F4F6F8] transition-colors">
                <h3 className="text-h3-redesign font-bold mb-2 text-navy">Originalidad</h3>
                <p className="text-body-redesign text-neutral-text-medium">
                  Fomentamos la creatividad y la originalidad en el entrenamiento y la competición.
                </p>
              </div>
              <div className="text-center p-6 border-l-4 border-gold rounded-r-lg hover:bg-[#F4F6F8] transition-colors">
                <h3 className="text-h3-redesign font-bold mb-2 text-navy">Comunidad</h3>
                <p className="text-body-redesign text-neutral-text-medium">
                  Construimos una comunidad unida que se apoya mutuamente y comparte experiencias.
                </p>
              </div>
            </div>
          </section>

          {/* Historia */}
          <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 max-w-4xl mx-auto">
            <h2 className="text-h2-redesign font-bold text-neutral-text-dark text-center mb-6">Historia</h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-body-lg">
                Nosework Trial nace de la necesidad de crear una modalidad deportiva que combine lo mejor de la
                detección deportiva española (FEPDE) y el nosework tradicional, priorizando siempre el bienestar del
                perro y la accesibilidad.
              </p>
              <p className="text-body-lg">
                A diferencia de otras modalidades que pueden ser más restrictivas o competitivas, Nosework Trial se
                diseñó pensando en que todos los perros, independientemente de su raza, edad o nivel de experiencia,
                puedan participar y disfrutar del trabajo de olfato.
              </p>
              <p className="text-body-lg">
                La modalidad se inspira en organizaciones internacionales como NACSW y SDDA, adaptando sus conceptos al
                contexto español y creando un reglamento propio que se ajusta a la realidad de los clubs y guías
                españoles.
              </p>
              <p className="text-body-lg">
                Desde nuestros inicios, hemos trabajado para crear una comunidad inclusiva donde el aprendizaje, el
                respeto y el disfrute sean los pilares fundamentales.
              </p>
            </div>
          </section>

          {/* Lista de Clubes */}
          <section>
            <h2 className="text-h2-redesign font-bold text-neutral-text-dark text-center mb-6">Nuestros Clubes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Norte Canino",
                "Tribu",
                "Trebacan",
                "David Cabrerizo DC",
                "Initium",
                "Educadog",
              ].map((club, index) => (
                <div
                  key={index}
                  className="card text-center"
                >
                  <h3 className="text-h5 font-bold">{club}</h3>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
