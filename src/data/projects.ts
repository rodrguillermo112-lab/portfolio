export type Category =
  "Motion Graphics" | "YouTube" | "Reels" | "Social Media" | "Commercial";
export type Project = {
  id: string;
  title: string;
  titleEs: string;
  category: Category;
  tags: Category[];
  year: string;
  client: string;
  description: string;
  descriptionEs: string;
  video: string;
  youtubeId: string;
  preview: string;
  poster: string;
  orientation: "landscape" | "portrait" | "square";
  aspectRatio: string;
  duration: number;
  featured: boolean;
  placement: "featured" | "gallery";
  order: number;
  tone: "red" | "blue" | "silver" | "yellow";
};

// Every surface reads from here. Dates and commissioning clients await confirmation.
// Posters are actual frames. Previews are silent excerpts, never replacement edits.
// The second argument is the real YouTube ID after uploading as unlisted.
// Leave it empty until verified; the publication check rejects missing/repeated IDs.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const media = (slug: string, youtubeId: string) => ({
  video: `${basePath}/videos/projects/${slug}.mp4`,
  youtubeId,
  preview: `${basePath}/videos/previews/${slug}-preview.mp4`,
  poster: `${basePath}/images/projects/${slug}-poster.webp`,
});
export const projects: Project[] = [
  {
    id: "01",
    placement: "featured",
    title: "COCA-COLA / A STORY",
    titleEs: "COCA-COLA / UNA HISTORIA",
    descriptionEs:
      "Tipografía, recortes y una historia contada a través del movimiento.",
    category: "Motion Graphics",
    tags: ["Motion Graphics", "Reels"],
    year: "",
    client: "",
    description: "Kinetic type, cutout imagery and a story told in motion.",
    ...media("coca-cola-story", "yBT-lvkKMZ8"),
    orientation: "portrait",
    aspectRatio: "9 / 16",
    duration: 22.18,
    featured: true,
    order: 3,
    tone: "red",
  },
  {
    id: "02",
    placement: "featured",
    title: "ENIO / LONG FORM",
    titleEs: "ENIO / FORMATO LARGO",
    descriptionEs:
      "Narración a cámara, recursos visuales y motion graphics para dar ritmo a una historia larga.",
    category: "YouTube",
    tags: ["YouTube", "Motion Graphics"],
    year: "",
    client: "",
    description:
      "A long-form edit built around direct-to-camera storytelling, visual inserts and motion graphics.",
    ...media("enio-youtube", "1j-nEebIKL0"),
    orientation: "landscape",
    aspectRatio: "16 / 9",
    duration: 1166.2,
    featured: true,
    order: 1,
    tone: "blue",
  },
  {
    id: "03",
    placement: "featured",
    title: "QUOTY / PARTNERS",
    titleEs: "QUOTY / ALIANZAS",
    descriptionEs:
      "Una explicación de producto que combina presentación a cámara, gráficos y subtítulos animados.",
    category: "Social Media",
    tags: ["Social Media", "Motion Graphics", "Reels", "Commercial"],
    year: "",
    client: "",
    description:
      "A concise product explainer combining a presenter, graphic inserts and animated captions.",
    ...media("quoty-partners", "-O9qihw1XfY"),
    poster: `${basePath}/images/projects/quoty-partners-portrait.webp`,
    orientation: "portrait",
    aspectRatio: "9 / 16",
    duration: 30.37,
    featured: true,
    order: 2,
    tone: "silver",
  },
  {
    id: "04",
    placement: "gallery",
    title: "ENIO / HOBBIES",
    titleEs: "ENIO / AFICIONES",
    descriptionEs:
      "Una historia vertical con cortes ágiles, tipografía expresiva y transiciones con carácter.",
    category: "Reels",
    tags: ["Reels", "Motion Graphics", "Social Media"],
    year: "",
    client: "",
    description:
      "A vertical story driven by quick cuts, expressive typography and playful visual transitions.",
    ...media("enio-hobbies", "prNtIPJgIRs"),
    orientation: "portrait",
    aspectRatio: "9 / 16",
    duration: 67.01,
    featured: false,
    order: 4,
    tone: "yellow",
  },
  {
    id: "05",
    placement: "gallery",
    title: "QUOTY / BUSINESS",
    titleEs: "QUOTY / NEGOCIOS",
    descriptionEs:
      "Una idea de negocio explicada con diagramas animados, subtítulos y una identidad azul muy presente.",
    category: "Social Media",
    tags: ["Social Media", "Motion Graphics", "Reels", "Commercial"],
    year: "",
    client: "",
    description:
      "A business explainer with a bold blue setting, animated diagrams and rhythmic captions.",
    ...media("quoty-business", "KSraHdiT28g"),
    orientation: "portrait",
    aspectRatio: "9 / 16",
    duration: 90.14,
    featured: false,
    order: 5,
    tone: "blue",
  },
  {
    id: "06",
    placement: "gallery",
    title: "ROSELAB / UNBOXED",
    titleEs: "ROSELAB / AL DESCUBIERTO",
    descriptionEs:
      "La apertura y demostración de un producto convertidas en una historia vertical directa.",
    category: "Social Media",
    tags: ["Social Media", "Reels", "Commercial"],
    year: "",
    client: "",
    description:
      "An unboxing and product demonstration shaped into a focused vertical story.",
    ...media("roselab", "3XUc7QcPqGs"),
    orientation: "portrait",
    aspectRatio: "9 / 16",
    duration: 59.91,
    featured: false,
    order: 6,
    tone: "silver",
  },
  {
    id: "07",
    placement: "gallery",
    title: "HENN / YOUR SPACE",
    titleEs: "HENN / TU ESPACIO",
    descriptionEs:
      "Una pieza breve de producto con un inicio visual, transiciones rápidas y subtítulos claros.",
    category: "Reels",
    tags: ["Reels", "Social Media", "Commercial"],
    year: "",
    client: "",
    description:
      "A short product story with a visual hook, fast transitions and clear captions.",
    ...media("henn", "buggUk0Fzsc"),
    orientation: "portrait",
    aspectRatio: "9 / 16",
    duration: 18.74,
    featured: false,
    order: 7,
    tone: "yellow",
  },
  {
    id: "08",
    placement: "gallery",
    title: "CLOSET / IN DETAIL",
    titleEs: "CLOSET / EN DETALLE",
    descriptionEs:
      "Una presentación de producto con planos de detalle, ritmo conciso y apoyos gráficos.",
    category: "Social Media",
    tags: ["Social Media", "Reels", "Commercial"],
    year: "",
    client: "",
    description:
      "A vertical product presentation using tight pacing, detail shots and graphic callouts.",
    ...media("closet", "Rs62IecpIFg"),
    orientation: "portrait",
    aspectRatio: "9 / 16",
    duration: 16.56,
    featured: false,
    order: 8,
    tone: "red",
  },
  {
    id: "09",
    placement: "gallery",
    title: "EQUITY / IN MOTION",
    titleEs: "EQUITY / EN MOVIMIENTO",
    descriptionEs:
      "Porcentajes animados, retratos recortados y una narrativa visual compacta en formato vertical.",
    category: "Motion Graphics",
    tags: ["Motion Graphics", "Reels"],
    year: "",
    client: "",
    description:
      "Animated percentages, cutout portraits and mixed-media storytelling in a compact vertical edit.",
    ...media("equity", "43GXhitDT0A"),
    orientation: "portrait",
    aspectRatio: "9 / 16",
    duration: 23.96,
    featured: false,
    order: 9,
    tone: "silver",
  },
  {
    id: "10",
    placement: "gallery",
    title: "PERSPECTIVES",
    titleEs: "PERSPECTIVAS",
    descriptionEs:
      "Un relato largo que conecta narración a cámara, referencias cinematográficas y tipografía expresiva.",
    category: "YouTube",
    tags: ["YouTube", "Motion Graphics"],
    year: "",
    client: "",
    description:
      "A long-form narrative mixing direct-to-camera footage, cinematic references and expressive on-screen type.",
    ...media("perspectives", "0mOqKQqmnfk"),
    orientation: "landscape",
    aspectRatio: "16 / 9",
    duration: 685.18,
    featured: false,
    order: 10,
    tone: "blue",
  },
].sort((a, b) => a.order - b.order) as Project[];

// Exclusive editorial placement: each project appears visually exactly once.
export const featuredProjects = projects.filter(
  (p) => p.placement === "featured",
);
export const galleryProjects = projects.filter(
  (p) => p.placement === "gallery",
);
export const categories: Category[] = [
  "Motion Graphics",
  "YouTube",
  "Reels",
  "Social Media",
  "Commercial",
];
// Assign a real standalone reel here when available. No fabricated montage is exported.
export const showreel: Project | null = null;
export function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")}`;
}
