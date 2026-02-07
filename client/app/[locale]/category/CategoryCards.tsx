import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface CategoryTypes {
  href: string;
  src: string;
  heading: string;
  text: string;
  actionText: string;
}

function CategoryCards({
  href,
  src,
  heading,
  text,
  actionText,
}: CategoryTypes) {
  return (
    <Link href={href} prefetch>
      <div className="group relative h-96 md:h-full md:min-h-125 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
        <Image
          src={src}
          alt="Curtains Collection"
          fill
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center drop-shadow-lg">
            {heading}
          </h2>
          <p className="text-white text-lg font-semibold drop-shadow-lg mb-6 text-center px-4">
            {text}
          </p>
          <div className="px-8 py-3 bg-white text-gray-900 font-bold rounded-lg shadow-lg group-hover:bg-gray-100 transition-colors">
            {actionText}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCards;
