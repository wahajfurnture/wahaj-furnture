import { getTranslations } from "next-intl/server";
import { getFurnitureDetails } from "../../services/furniture-api";
import FurnitureDetails from "./FurnitureDetails";
import FurnitureImages from "./FurnitureImages";
import { ColorProvider } from "./context/ColorContext";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return {
    title:
      locale === "ar"
        ? "تفاصيل اضافيه عن هذا الموديل"
        : "more details about this model",
  };
}

type Fabric = {
  _id: string;
  name: string;
  furnId: string;
  description: string;
};

interface FurnitureData {
  _id: string;
  name: string;
  description: string;
  category: string;
  fabrics: Fabric[];
}

interface FurnType {
  furnId: string;
}

async function ShowFurniture({ furnId }: FurnType) {
  const t = await getTranslations();
  const furniture = await getFurnitureDetails(furnId);

  return (
    <ColorProvider>
      <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col justify-start top-8 h-fit">
              <FurnitureImages furnitureName={furniture.name} />
            </div>

            <div className="flex flex-col justify-start">
              <FurnitureDetails
                furnitureName={furniture.name}
                description={furniture.description}
                category={t(`model.${furniture.category}`)}
                fabrics={furniture.fabrics}
              />
            </div>
          </div>
        </div>
      </div>
    </ColorProvider>
  );
}

export default ShowFurniture;
