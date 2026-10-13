import { copy } from "./copy";
export const site = {
  name: "Guillermo Rodríguez",
  role: "Video Editor / Motion Designer",
  email: "rodrguillermo112@gmail.com",
  instagram: {
    handle: "@guill77rmo",
    url: "https://www.instagram.com/guill77rmo/",
  },
  title: copy.es.meta.title,
  description: copy.es.meta.description,
  year: "2026",
  // Add an absolute URL or /images/og.webp when the final image is supplied.
  ogImage: "",
  specialties: ["Motion Graphics", "YouTube", "Reels", "Social Media"],
  services: [
    { title: "Make it move.", detail: "MOTION GRAPHICS" },
    { title: "Keep them watching.", detail: "SHORT & LONG FORM EDITING" },
    { title: "Give it a rhythm.", detail: "STORY & PACING" },
  ],
};
