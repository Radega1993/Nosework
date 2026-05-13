import { useCallback, useState } from "react";

export default function useMyDogs(apiCall, initialDogs = []) {
  const [dogs, setDogs] = useState(initialDogs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadDogs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiCall("/api/me/dogs");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || data.message || "No se pudieron cargar los perros");
      setDogs(data.dogs || []);
      return data.dogs || [];
    } catch (e) {
      setError(e.message || "Error al cargar perros");
      return [];
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const createDog = useCallback(
    async (payload) => {
      setLoading(true);
      setError("");
      try {
        const res = await apiCall("/api/me/dogs", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "No se pudo crear el perro");
        setDogs((prev) => [data.dog, ...prev]);
        return { ok: true, dog: data.dog };
      } catch (e) {
        setError(e.message || "Error al crear perro");
        return { ok: false };
      } finally {
        setLoading(false);
      }
    },
    [apiCall]
  );

  const updateDog = useCallback(
    async (id, payload) => {
      setLoading(true);
      setError("");
      try {
        const res = await apiCall(`/api/me/dogs/${id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "No se pudo actualizar el perro");
        setDogs((prev) => prev.map((dog) => (dog.id === id ? data.dog : dog)));
        return { ok: true, dog: data.dog };
      } catch (e) {
        setError(e.message || "Error al actualizar perro");
        return { ok: false };
      } finally {
        setLoading(false);
      }
    },
    [apiCall]
  );

  const deleteDog = useCallback(
    async (id) => {
      setLoading(true);
      setError("");
      try {
        const res = await apiCall(`/api/me/dogs/${id}`, { method: "DELETE" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "No se pudo eliminar el perro");
        setDogs((prev) => prev.filter((dog) => dog.id !== id));
        return { ok: true };
      } catch (e) {
        setError(e.message || "Error al eliminar perro");
        return { ok: false };
      } finally {
        setLoading(false);
      }
    },
    [apiCall]
  );

  return {
    dogs,
    setDogs,
    loading,
    error,
    loadDogs,
    createDog,
    updateDog,
    deleteDog,
  };
}
