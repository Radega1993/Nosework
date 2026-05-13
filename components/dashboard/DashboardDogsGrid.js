import Image from "next/image";
import { useEffect, useState } from "react";

const currentYear = new Date().getFullYear();

function DogCard({ dog, onEdit, onDelete }) {
  return (
    <article className="bg-white rounded-xl shadow-soft border border-surface-container-highest overflow-hidden hover:shadow-hover transition-shadow">
      <div className="h-44 bg-surface-container-low relative">
        {dog.photo_url && String(dog.photo_url).startsWith("/") ? (
          <Image src={dog.photo_url} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
        ) : dog.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dog.photo_url} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl" aria-hidden>
              pets
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <div>
            <h4 className="font-montserrat text-lg font-semibold text-primary">{dog.name}</h4>
            <p className="text-on-surface-variant text-sm">
              {dog.breed || "Raza no indicada"}
              {dog.birth_year ? ` · ${new Date().getFullYear() - dog.birth_year} años` : ""}
            </p>
          </div>
          {dog.grade_label ? (
            <span className="bg-secondary text-on-secondary px-2 py-0.5 rounded-full text-xs font-semibold shrink-0">
              {dog.grade_label}
            </span>
          ) : null}
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(dog)}
            className="flex-1 py-2 border border-primary text-primary rounded-lg text-xs font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => onDelete(dog.id)}
            className="flex-1 py-2 border border-red-500 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

function DogFormModal({ open, initialData, onClose, onSubmit, loading }) {
  const [form, setForm] = useState(initialData);
  const [error, setError] = useState("");

  const isEdit = Boolean(initialData?.id);

  useEffect(() => {
    setForm(initialData);
    setError("");
  }, [initialData]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const year = form.birth_year ? Number(form.birth_year) : null;
    if (!form.name || !String(form.name).trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    if (year && (!Number.isInteger(year) || year < 1990 || year > currentYear)) {
      setError("El año de nacimiento no es válido");
      return;
    }
    setError("");
    await onSubmit({
      ...form,
      name: String(form.name).trim(),
      birth_year: form.birth_year ? Number(form.birth_year) : null,
    });
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-xl bg-white border border-outline-variant shadow-xl p-6">
        <h4 className="font-montserrat text-xl font-semibold text-primary mb-4">
          {isEdit ? "Editar perro" : "Registrar perro"}
        </h4>
        {error ? <p className="text-sm text-red-600 mb-3">{error}</p> : null}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            placeholder="Nombre *"
            className="w-full rounded-lg border border-outline-variant px-3 py-2"
            required
          />
          <input
            name="breed"
            value={form.breed || ""}
            onChange={handleChange}
            placeholder="Raza"
            className="w-full rounded-lg border border-outline-variant px-3 py-2"
          />
          <input
            name="birth_year"
            value={form.birth_year || ""}
            onChange={handleChange}
            placeholder="Año nacimiento"
            type="number"
            min="1990"
            max={currentYear}
            className="w-full rounded-lg border border-outline-variant px-3 py-2"
          />
          <input
            name="grade_label"
            value={form.grade_label || ""}
            onChange={handleChange}
            placeholder="Grado (ej. L1, L2, Grado III)"
            className="w-full rounded-lg border border-outline-variant px-3 py-2"
          />
          <input
            name="photo_url"
            value={form.photo_url || ""}
            onChange={handleChange}
            placeholder="Foto URL (ruta /public/...)"
            className="w-full rounded-lg border border-outline-variant px-3 py-2"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-outline-variant">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-primary text-white font-semibold disabled:opacity-50"
            >
              {isEdit ? "Guardar cambios" : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DashboardDogsGrid({ dogs, onCreateDog, onUpdateDog, onDeleteDog, loading, error }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDog, setEditingDog] = useState(null);

  const openCreate = () => {
    setEditingDog({ name: "", breed: "", birth_year: "", grade_label: "", photo_url: "" });
    setModalOpen(true);
  };

  const openEdit = (dog) => {
    setEditingDog({
      id: dog.id,
      name: dog.name || "",
      breed: dog.breed || "",
      birth_year: dog.birth_year || "",
      grade_label: dog.grade_label || "",
      photo_url: dog.photo_url || "",
    });
    setModalOpen(true);
  };

  const handleSubmitDog = async (payload) => {
    const ok = payload.id ? await onUpdateDog(payload.id, payload) : await onCreateDog(payload);
    if (ok?.ok) setModalOpen(false);
  };

  return (
    <section id="mis-perros" className="lg:col-span-8 scroll-mt-24">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-montserrat text-xl font-semibold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined" aria-hidden>
            pets
          </span>
          Mis perros
        </h3>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-1 text-primary font-bold text-sm hover:underline"
        >
          <span className="material-symbols-outlined text-base" aria-hidden>
            add_circle
          </span>
          Registrar perro
        </button>
      </div>
      {error ? <p className="text-sm text-red-600 mb-3">{error}</p> : null}
      {dogs?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {dogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} onEdit={openEdit} onDelete={onDeleteDog} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-low p-8 text-center text-on-surface-variant text-sm">
          Aún no hay perros registrados en tu cuenta.
        </div>
      )}
      <DogFormModal
        open={modalOpen}
        initialData={editingDog || { name: "", breed: "", birth_year: "", grade_label: "", photo_url: "" }}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitDog}
        loading={loading}
      />
    </section>
  );
}
