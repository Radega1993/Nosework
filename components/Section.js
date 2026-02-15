/**
 * Section wrapper para secciones de página (spec UI redesign).
 * background: "light" (#F4F6F8) | "white"
 * padding: "sm" | "md" | "lg"
 * centered: boolean (contenido con container-redesign y mx-auto)
 */
export default function Section({
    children,
    background = "white",
    padding = "md",
    centered = true,
    className = "",
    as: Component = "section",
}) {
    const bgClass = background === "light" ? "bg-[#F4F6F8]" : "bg-white";
    const paddingClasses = {
        sm: "py-8",
        md: "py-12",
        lg: "py-16",
    };
    const paddingClass = paddingClasses[padding] || paddingClasses.md;

    return (
        <Component className={`${bgClass} ${paddingClass} ${className}`}>
            {centered ? (
                <div className="container-redesign mx-auto">{children}</div>
            ) : (
                children
            )}
        </Component>
    );
}
