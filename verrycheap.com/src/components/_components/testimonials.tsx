import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
interface TestimonialCardProps {
  name: string;
  date: string;
  rating: number; // 1-5
  headline: string;
  review: string;
  avatarColor?: string;
  avatarImage?: string; // URL de la imagen del avatar (opcional)
  link?: string; // Enlace único opcional para cada card
}

function TestimonialCard({
  name,
  date,
  rating,
  headline,
  review,
  avatarColor = "#F5E0D0",
  avatarImage,
  link,
}: TestimonialCardProps) {
  // Obtener las iniciales del nombre
  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Renderizar las estrellas de Trustpilot según el rating
  const renderStars = (rating: number) => {
    // Path de la estrella normalizada (coordenadas de 0-40)
    const starPath =
      "M20 27.3522L26.0833 25.7233L28.625 34L20 27.3522ZM34 16.6541H23.2917L20 6L16.7083 16.6541H6L14.6667 23.2579L11.375 33.9119L20.0417 27.3082L25.375 23.2579L34 16.6541Z";

    return (
      <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <svg
            key={i}
            width="20"
            height="20"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <rect width="40" height="40" fill="#219653" />
            <path d={starPath} fill="white" />
          </svg>
        ))}
      </div>
    );
  };

  const cardContent = (
    <div className="bg-white rounded-lg border border-2 border-gray-100 p-6   cursor-pointer flex flex-col">
      {/* Header con avatar y nombre */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-black flex-shrink-0 overflow-hidden"
          style={{ backgroundColor: avatarImage ? "transparent" : avatarColor }}
        >
          {avatarImage ? (
            <Image
              src={avatarImage}
              alt={name}
              width={48}
              height={48}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            getInitials(name)
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-black font-semibold text-base">{name}</h3>
          <p className="text-gray-600 text-sm">{date}</p>
        </div>
      </div>

      {/* Rating con estrellas de Trustpilot */}
      <div className="inline-flex items-center mb-4 w-fit">
        {renderStars(rating)}
      </div>

      {/* Review body */}
      <div className="flex flex-col gap-2">
        <h4 className="text-black font-semibold text-base">{headline}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{review}</p>
      </div>
    </div>
  );

  // Si hay un enlace, envolver en Link o <a> dependiendo si es externo
  if (link) {
    const isExternal =
      link.startsWith("http://") || link.startsWith("https://");

    if (isExternal) {
      return (
        <a
          href={link}
          className="block"
          target="_blank"
          rel="noopener noreferrer"
        >
          {cardContent}
        </a>
      );
    }

    return (
      <Link href={link} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export default function Testimonials() {
  // Datos de ejemplo - puedes reemplazarlos con datos reales
  // Para usar una imagen como avatar, agrega la prop 'avatarImage' con la URL de la imagen
  // Ejemplo: avatarImage: "https://example.com/avatar.jpg" o avatarImage: "/images/avatar.png"
  const testimonials: TestimonialCardProps[] = [
    {
      name: "Brandon Rowe",
      date: "Oct 31, 2025",
      rating: 5,
      headline: "AMAZING SERVICE",
      review:
        "Service has been amazing and communication is prompt and I've had no issues since using services. Strongly recommend",
      avatarColor: "#ffe0bb",
      // avatarImage: "https://example.com/avatar.jpg", // Descomenta y agrega URL para usar imagen
      link: "https://www.trustpilot.com/reviews/6904c66dc621c9666c2b5025", // Enlace único
    },
    {
      name: "Shubham Yadav",
      date: "Oct 31, 2025",
      rating: 5,
      headline: "Fast deals",
      review: "Fast deals, got 10 premium accounts fast",
      avatarColor: "#daffe1",
      link: "https://www.trustpilot.com/reviews/690494a831b4a1e32e2b0a38",
    },
    {
      name: "Hamid Abouali",
      date: "Oct 31, 2025",
      rating: 5,
      headline: "everything works",
      review: "transparent, everything works, great service",
      avatarColor: "#D0E0F5",
      avatarImage:
        "https://user-images.trustpilot.com/69048f7e51678e285e7e7d7d/73x73.png",
      link: "https://www.trustpilot.com/reviews/69049076ff5666762ab7d524",
    },
    {
      name: "Luffy",
      date: "Oct 30, 2025",
      rating: 5,
      headline: "Everything is smooth",
      review: "Everything is smooth. really liked their transparency.",
      avatarColor: "#F5D0E0",
      avatarImage:
        "https://user-images.trustpilot.com/690338ead1bf91d9ef959b94/73x73.png",

      link: "https://www.trustpilot.com/reviews/6903390676b5a0fc7b225a7f",
    },

    {
      name: "Brody Kyle",
      date: "Oct 29, 2025",
      rating: 5,
      headline: "Great Service",
      review: "Great Service, fast response and reasonable prices",
      avatarColor: "#F5E0D0",
      avatarImage:
        "https://user-images.trustpilot.com/69027a1aec11dbd64d1206c9/73x73.png",

      link: "https://www.trustpilot.com/reviews/69027a1e423423646f60b6fd",
    },
    {
      name: "Bossadi Zenith",
      date: "Oct 29, 2025",
      rating: 5,
      headline: "It's been an amazing experience using verycheap",
      review:
        "It's been an amazing experience using verycheap. it saved me a lot of cash",
      avatarColor: "#F5E0D0",
      avatarImage:
        "https://user-images.trustpilot.com/69050d2fd1bf9176f397ff3b/73x73.png",

      link: "https://www.trustpilot.com/reviews/69050d4eaacd7dd59ff9275d",
    },
    {
      name: "Bossadi Zenith",
      date: "Oct 29, 2025",
      rating: 5,
      headline: "Trato rapido,",
      review: "Trato rapido, agradable y eficaz! Un 10 en todo! Recomendado",
      avatarColor: "#F5E0D0",
      avatarImage:
        "https://user-images.trustpilot.com/690277c3ec11db57a71203a6/73x73.png",

      link: "https://www.trustpilot.com/reviews/69050d4eaacd7dd59ff9275d",
    },
  ];

  return (
    <>
      <div className="pb-10 h-auto  relative">
        <div className="w-full mt-10 pt-10 flex flex-col items-center justify-center relative z-20">
          <div className="flex items-center flex-col   space-y-3 mb-8">
            <Image
              src="/trustpilot-logo.png"
              width={150}
              height={150}
              alt="trustpilot logo"
              className="sm:w-30 w-30"
            ></Image>
            <h2 className="text-black text-2xl font-bold">
              They&apos;ve already tried it, and here&apos;s what they think
            </h2>
          </div>

          {/* Grid de testimonios tipo masonry */}
          <div className="w-full max-w-7xl  px-4 sm:px-6 lg:px-8 py-12">
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-2 gap-6 space-y-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="break-inside-avoid   rounded-xl ">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-20">
            <Button
              variant={"outline"}
              className="cursor-pointer border-2 py-5 px-5"
            >
              Check in Trustpilot
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
