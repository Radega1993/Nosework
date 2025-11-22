import { useState, useEffect } from "react";
import Head from "next/head";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/Calendar.css"; // Estilo adicional para el calendario
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Events() {
    const [events, setEvents] = useState([]); // Lista de eventos desde la API
    const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada
    const [selectedEvents, setSelectedEvents] = useState([]); // Eventos para la fecha seleccionada

    // Obtener eventos desde la API al cargar la página
    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch("/api/events");
                const data = await response.json();
                setEvents(data.events || []);
            } catch (error) {
                console.error("Error al cargar eventos:", error);
            }
        }
        fetchEvents();
    }, []);

    // Manejar cambio de fecha en el calendario
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const filteredEvents = events.filter(
            (e) => new Date(e.date).toDateString() === date.toDateString()
        );
        setSelectedEvents(filteredEvents);
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-16">
            {/* SEO */}
            <Head>
                <title>Calendario Nosework Trial 2025 – Próximas Pruebas</title>
                <meta
                    name="description"
                    content="Consulta el calendario completo de pruebas y eventos de Nosework Trial. Fechas, localidades y clubs organizadores."
                />
                <meta
                    name="keywords"
                    content="calendario nosework, pruebas nosework 2025, eventos nosework, competiciones nosework España"
                />
                <meta property="og:title" content="Calendario Nosework Trial 2025 – Próximas Pruebas" />
                <meta
                    property="og:description"
                    content="Consulta el calendario completo de pruebas y eventos de Nosework Trial."
                />
                <meta property="og:image" content="/images/og-image.jpg" />
                <meta property="og:url" content="https://www.noseworktrialcommunity.com/events" />
                <meta property="og:type" content="website" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="https://www.noseworktrialcommunity.com/events" />
            </Head>

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <header className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white py-16 md:py-20 text-center">
                <div className="container-custom">
                    <h1 className="text-h1 font-bold mb-4">Eventos y Pruebas</h1>
                    <p className="text-xl md:text-2xl text-secondary-50">Explora y participa en nuestras actividades</p>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="section">
                <div className="container-custom space-y-12">
                    {/* Calendario */}
                    <section className="card">
                        <h2 className="text-h2 font-bold text-center mb-6">Calendario de Eventos</h2>
                        <div className="flex justify-center mb-6">
                            <div className="card-bordered">
                                <Calendar
                                    onChange={handleDateChange}
                                    value={selectedDate}
                                    className="rounded-lg"
                                    tileContent={({ date }) =>
                                        events.some(
                                            (e) => new Date(e.date).toDateString() === date.toDateString()
                                        ) && (
                                            <div className="mt-1 w-2 h-2 bg-primary-500 rounded-full mx-auto"></div>
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <p className="text-center text-body text-gray-600">
                            {selectedDate
                                ? `Eventos para: ${selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
                                : "Selecciona una fecha para ver los eventos disponibles."}
                        </p>
                    </section>

                    {/* Detalles de Eventos */}
                    <section>
                        {selectedEvents.length > 0 ? (
                            <div className="card">
                                <h2 className="text-h2 font-bold mb-6">Eventos Programados</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {selectedEvents.map((event, index) => (
                                        <div key={event.id} className="card-bordered">
                                            <img
                                                src={`https://source.unsplash.com/random/800x600/?dog,training&sig=${index}`}
                                                alt={`Imagen del evento ${event.title}`}
                                                className="rounded-lg mb-4 w-full h-48 object-cover"
                                            />
                                            <h3 className="text-h4 font-bold text-secondary-600 mb-2">{event.title}</h3>
                                            <p className="text-body text-gray-700">{event.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : selectedDate ? (
                            <div className="card text-center">
                                <p className="text-body-lg text-gray-600">
                                    No hay eventos programados para esta fecha.
                                </p>
                            </div>
                        ) : null}
                    </section>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
