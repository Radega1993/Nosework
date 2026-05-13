/**
 * Tabla responsive con scroll horizontal.
 * @param {string} title
 * @param {string[]} columns
 * @param {string[][]} rows — una fila por array de celdas (mismo orden que columns)
 */
export default function DataTableSection({ title, columns, rows, sectionClassName = "py-16 md:py-20 bg-surface" }) {
  return (
    <section className={sectionClassName}>
      <div className="max-w-container-max mx-auto px-6">
        <h2 className="font-montserrat text-headline-h2 md:text-3xl font-bold text-primary mb-8">{title}</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-surface-container">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-primary text-white uppercase text-xs tracking-wide font-bold">
                {columns.map((col) => (
                  <th key={col} className="p-4 md:p-5">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {rows.map((cells, ri) => (
                <tr
                  key={ri}
                  className={
                    ri % 2 === 1
                      ? "bg-surface-container-lowest hover:bg-surface-container-low transition-colors"
                      : "hover:bg-surface-container-low transition-colors"
                  }
                >
                  {cells.map((cell, ci) => (
                    <td key={ci} className="p-4 md:p-5 text-on-surface-variant text-sm md:text-base align-top">
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
