interface MapEmbedProps {
  lat: number;
  lng: number;
  height?: number;
  className?: string;
}

export default function MapEmbed({ lat, lng, height = 180, className = '' }: MapEmbedProps) {
  const delta = 0.006;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <iframe
      src={src}
      width="100%"
      height={height}
      className={`rounded-xl border-0 ${className}`}
      loading="lazy"
      title="Map"
    />
  );
}
