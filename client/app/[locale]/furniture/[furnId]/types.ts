export interface Fabric {
  _id: string;
  name: string;
  furnId: string;
  description: string;
}

export interface FabricColor {
  _id: string;
  name: string;
  thumbnail: string;
  fabricId: string;
  images: string[];
}

export interface ImageSlide {
  image?: string;
  thumbnail?: string;
}
