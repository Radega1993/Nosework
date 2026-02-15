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
          {/* Quiénes somos */}
          <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 max-w-4xl mx-auto">
            <h2 className="text-h2-redesign font-bold text-neutral-text-dark text-center mb-6">Quiénes somos</h2>
            <p className="text-body-redesign-lg text-neutral-text-medium text-center mb-4">
              Nosework Trial lo impulsa un equipo promotor de entrenadores, guías y amantes del trabajo de olfato canino que,
              desde distintos clubs y experiencias, se unieron para dar forma a una modalidad propia: inclusiva, centrada en el
              bienestar del perro y con un reglamento claro y accesible.
            </p>
            <p className="text-body-redesign text-neutral-text-medium text-center">
              Somos una comunidad fundadora independiente. No dependemos de ninguna federación ni entidad externa; nuestro
              objetivo es crecer desde la base, con transparencia y con las personas y los perros en el centro.
            </p>
          </section>

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
            <div className="space-y-4 text-neutral-text-medium">
              <p className="text-body-redesign-lg">
                Nosework Trial nace de la voluntad de ofrecer una modalidad deportiva de olfato canino con identidad propia en España:
                un reglamento claro, niveles Base y Avanzado, y una filosofía centrada en el bienestar del perro y en la inclusión.
              </p>
              <p className="text-body-redesign-lg">
                En el panorama actual coexisten la detección deportiva vinculada a la federación (FEPDE) y el nosework en sus distintas
                formas. Nosework Trial es una iniciativa <strong>independiente</strong>: no somos FEPDE ni estamos vinculados a FEPDE.
                Somos una comunidad y una modalidad propia que crece desde la base, con clubs y guías que comparten esta visión.
              </p>
              <p className="text-body-redesign-lg">
                Nos inspiramos en buenas prácticas de organizaciones internacionales (como NACSW o SDDA) y en la realidad de los clubs
                españoles, adaptando conceptos a un reglamento propio y accesible. Desde el principio hemos priorizado el aprendizaje,
                el respeto y el disfrute como pilares de la comunidad.
              </p>
            </div>
          </section>

          {/* Documentos legales */}
          <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 max-w-4xl mx-auto text-center">
            <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-4">Documentos legales</h2>
            <p className="text-body-redesign text-neutral-text-medium">
              Estatutos y documentos legales de la asociación estarán disponibles próximamente en esta sección.
            </p>
          </section>

          {/* Lista de Clubes */}
          <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
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
                  className="text-center p-4 rounded-lg border border-neutral-border bg-[#F4F6F8]"
                >
                  <h3 className="text-h3-redesign font-bold text-navy">{club}</h3>
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
