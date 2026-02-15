import Link from "next/link";

const transitionClass = "transition-all duration-200";

export default function Button({
    children,
    onClick,
    href,
    variant = "primary",
    size = "medium",
    className = "",
    disabled = false,
    type = "button",
    ...props
}) {
    const baseClasses = `font-semibold rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${transitionClass}`;

    const variants = {
        primary:
            "bg-gold hover:bg-gold-hover active:bg-gold-500 text-navy shadow-md hover:shadow-lg focus-visible:ring-gold",
        secondary:
            "border-2 border-white text-white hover:bg-white hover:text-navy active:bg-white/90 shadow-none focus-visible:ring-white",
        dark: "bg-navy hover:bg-navy-700 active:bg-navy-dark text-white shadow-md hover:shadow-lg focus-visible:ring-navy",
        ghost:
            "text-navy hover:bg-neutral-border/50 active:bg-neutral-border shadow-none focus-visible:ring-neutral-border text-neutral-text-dark",
        outline:
            "border-2 border-navy text-navy hover:bg-navy hover:text-white active:bg-navy-700 shadow-none focus-visible:ring-navy",
        accent:
            "bg-gold hover:bg-gold-hover active:bg-gold-500 text-navy shadow-md hover:shadow-lg focus-visible:ring-gold",
    };

    const sizes = {
        small: "py-2 px-4 text-sm",
        medium: "py-3 px-6",
        large: "py-4 px-8 text-lg",
    };

    const classes = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`;

    if (href && !disabled) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
}
