import Link from "next/link";
import Image from "next/image";
import { PROPOSAL_PHOTOS } from "@/data/visualProposal";

/**
 * Contenedor login/registro: cabecera crema + formulario + foto lateral (propuesta visual).
 */
export default function AuthShell({ title, subtitle, children, footerLink, photoKey = "loginSide" }) {
  const photo = PROPOSAL_PHOTOS[photoKey] || PROPOSAL_PHOTOS.loginSide;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="border-b border-outline-variant bg-[rgba(250,249,245,0.97)] backdrop-blur py-4 px-6">
        <div className="max-w-container-max mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            <Image
              src="/logonosework/nosework-trial-community-long-black-transp.png"
              alt="Nosework Trial Community"
              width={200}
              height={44}
              className="h-8 w-auto max-w-[200px]"
              priority
            />
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-[#58735b] hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center py-10 px-6">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          <div className="bg-white border border-outline-variant rounded-[19px] shadow-[0_10px_27px_rgba(26,50,32,0.028)] p-8 md:p-10 flex flex-col justify-center">
            <h1 className="font-display text-3xl md:text-[2rem] font-medium text-primary text-center mb-2 tracking-tight">
              {title}
            </h1>
            {subtitle ? (
              <p className="text-center text-on-surface-variant text-sm mb-8">{subtitle}</p>
            ) : (
              <div className="mb-6" />
            )}
            {children}
            {footerLink ? <div className="mt-6 text-center text-sm text-on-surface-variant">{footerLink}</div> : null}
          </div>
          <div className="relative hidden md:block min-h-[460px] rounded-[18px] overflow-hidden bg-mint">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              style={{ objectPosition: photo.objectPosition }}
              sizes="(max-width: 1024px) 50vw, 480px"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
