import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

export default function EventRegisterPage() {
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [dogId, setDogId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!id) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setLoading(false);
      setError("login");
      return;
    }

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const evRes = await fetch(`/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (evRes.status === 404) {
          setError("not-found");
          return;
        }
        if (!evRes.ok) throw new Error("event");
        const evData = await evRes.json();
        setEvent(evData.event);

        const dogsRes = await fetch("/api/me/dogs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (dogsRes.ok) {
          const d = await dogsRes.json();
          setDogs(d.dogs || []);
        }
      } catch {
        setError("load");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setError("login");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const body = {};
      if (dogId) body.dogId = Number(dogId);
      const res = await fetch(`/api/events/${id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 409) {
        setError(data.error || "Ya estabas inscrito");
        return;
      }
      if (!res.ok) {
        setError(data.error || "No se pudo completar la inscripción");
        return;
      }
      setDone(true);
    } catch {
      setError("No se pudo completar la inscripción");
    } finally {
      setSubmitting(false);
    }
  };

  if (!router.isReady) {
    return null;
  }

  if (error === "login") {
    return (
      <div className="bg-[#F4F6F8] min-h-screen pt-20">
        <Head>
          <title>Inscribirse - Inicia sesión</title>
        </Head>
        <Navbar />
        <main className="section">
          <div className="container-redesign max-w-lg mx-auto bg-white rounded-lg shadow p-8">
            <h1 className="text-h3 font-bold mb-4">Inicia sesión para inscribirte</h1>
            <p className="text-body text-gray-600 mb-6">
              Las inscripciones están reservadas a usuarios con cuenta.
            </p>
            <Link
              href={localizedHref("/login")}
              className="inline-block font-bold text-primary hover:underline"
            >
              Ir a iniciar sesión
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-[#F4F6F8] min-h-screen pt-20">
        <Navbar />
        <main className="section py-12 text-center text-neutral-text-medium">Cargando…</main>
        <Footer />
      </div>
    );
  }

  if (error === "not-found" || !event) {
    return (
      <div className="bg-[#F4F6F8] min-h-screen pt-20">
        <Navbar />
        <main className="section">
          <div className="container-redesign max-w-lg mx-auto text-center">
            <p className="mb-4">Evento no disponible o sin permiso para verlo.</p>
            <Link href={localizedHref("/eventos")} className="text-primary font-semibold">
              Volver al calendario
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#F4F6F8] min-h-screen pt-20">
      <SEOHead title={`Inscripción: ${event.title}`} description="Completa tu inscripción al evento." />
      <Navbar />
      <main className="section py-12">
        <div className="container-redesign max-w-lg mx-auto bg-white rounded-lg shadow p-8">
          {done ? (
            <>
              <h1 className="text-h3 font-bold mb-4">Inscripción registrada</h1>
              <p className="text-body text-gray-600 mb-6">
                Tu solicitud para <strong>{event.title}</strong> ha quedado pendiente de confirmación.
              </p>
              <Link href={localizedHref(`/eventos/${id}`)} className="text-primary font-semibold">
                Volver al evento
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-h3 font-bold mb-2">Inscribirse</h1>
              <p className="text-gray-600 mb-6">{event.title}</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {dogs.length > 0 && (
                  <div>
                    <label htmlFor="dogId" className="block text-sm font-semibold mb-1">
                      Perro (opcional)
                    </label>
                    <select
                      id="dogId"
                      value={dogId}
                      onChange={(e) => setDogId(e.target.value)}
                      className="w-full border rounded p-2"
                    >
                      <option value="">— Sin especificar —</option>
                      {dogs.map((d) => (
                        <option key={d.id} value={String(d.id)}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex gap-3 flex-wrap">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 rounded-lg bg-primary text-white font-semibold disabled:opacity-50"
                  >
                    {submitting ? "Enviando…" : "Confirmar inscripción"}
                  </button>
                  <Link
                    href={localizedHref(`/eventos/${id}`)}
                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700"
                  >
                    Cancelar
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
