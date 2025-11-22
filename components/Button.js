import Link from "next/link";

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
    const baseClasses = "btn font-semibold transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "btn-primary bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500",
        secondary: "btn-secondary bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500",
        accent: "btn-accent bg-accent-600 hover:bg-accent-700 text-white focus:ring-accent-500",
        outline: "btn-outline border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500 shadow-none",
        ghost: "btn-ghost text-primary-600 hover:bg-primary-50 focus:ring-primary-500 shadow-none",
    };

    const sizes = {
        small: "py-2 px-4 text-sm",
        medium: "py-3 px-6",
        large: "py-4 px-8 text-lg",
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
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
