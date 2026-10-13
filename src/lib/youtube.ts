export function youtubeEmbedUrl(id: string, locale: string) {
  if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return null;
  const parameters = new URLSearchParams({
    autoplay: "1",
    playsinline: "1",
    rel: "0",
    hl: locale === "en" ? "en" : "es",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${parameters}`;
}
