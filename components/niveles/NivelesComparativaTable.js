/**
 * Tabla comparativa con cabecera primaria y filas cebreadas.
 */
export default function NivelesComparativaTable({ comparativa }) {
  const { columns, rows } = comparativa;

  return (
    <section className="py-12 md:py-16 max-w-container-max mx-auto px-6">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-outline-variant/60">
        <div className="bg-primary px-5 py-4 text-white">
          <h3 className="font-montserrat text-xl md:text-2xl font-semibold">Tabla comparativa de requisitos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse [&_tbody_tr:nth-child(even)]:bg-surface-container-low">
            <thead>
              <tr className="bg-surface-container-high text-xs font-bold uppercase tracking-wider text-primary border-b border-outline-variant">
                {columns.map((col) => (
                  <th key={col} scope="col" className="p-4 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm md:text-base text-on-surface-variant">
              {rows.map((row) => (
                <tr key={row.category} className="border-b border-outline-variant/40 last:border-0">
                  <th scope="row" className="p-4 font-bold text-primary text-left align-top min-w-[140px]">
                    {row.category}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td key={i} className="p-4 align-top min-w-[160px]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
