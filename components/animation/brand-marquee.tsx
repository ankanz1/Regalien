import { business } from "@/lib/business";

export function BrandMarquee() {
  return (
    <div className="brand-marquee" role="img" aria-label={`${business.brandName} · Interior spaces · Thoughtful living`}>
      <div className="brand-marquee-track" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <span className="brand-marquee-group" key={index}>
            <span>{business.brandName}</span><i>✳</i><span>Spaces for living</span><i>✳</i><span>{business.locationLabel}</span><i>✳</i>
          </span>
        ))}
      </div>
    </div>
  );
}
