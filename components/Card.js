import Link from "next/link";
import Image from "next/image";

/**
 * Card reutilizable según spec UI redesign.
 * Props: image (src/alt o object), title, description, link (href).
 * Sombra 0 10px 30px rgba(0,0,0,0.08), hover translateY(-6px).
 */
export default function Card({ image, title, description, link, className = "" }) {
    const href = typeof link === "string" ? link : link?.href;
    const content = (
        <>
            {image && (
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-lg bg-[#F4F6F8]">
                    {typeof image === "string" ? (
                        <Image
                            src={image}
                            alt={title || "Card"}
                            fill
                            className="object-cover transition-transform duration-200 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    ) : (
                        <Image
                            src={image.src}
                            alt={image.alt ?? title ?? "Card"}
                            fill
                            className="object-cover transition-transform duration-200 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    )}
                </div>
            )}
            <div className="p-6">
                {title && <h3 className="text-xl font-semibold text-neutral-text-dark mb-2">{title}</h3>}
                {description && <p className="text-neutral-text-medium">{description}</p>}
            </div>
        </>
    );

    const cardClasses = `group block bg-white rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-xl hover:-translate-y-[6px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${className}`;

    if (href) {
        return (
            <Link href={href} className={cardClasses}>
                {content}
            </Link>
        );
    }

    return <article className={cardClasses}>{content}</article>;
}
