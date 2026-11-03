import ProjectImage from "./ProjectImage";

export default function Laptop({
  src,
  alt,
  title,
  className = "",
}: {
  src: string;
  alt: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full ${className}`}>
      {/* Lid */}
      <div className="rounded-t-[14px] border border-[#2c3340] bg-[#10141b] px-[2.2%] pb-[2.2%] pt-[1.6%] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.85)]">
        <div className="mb-[1.2%] flex justify-center" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2a303b]" />
        </div>
        <ProjectImage src={src} alt={alt} title={title} className="aspect-[16/10] w-full rounded-[4px] bg-black" />
      </div>
      {/* Base */}
      <div
        className="relative -mx-[6%] h-[11px] rounded-b-[16px] bg-gradient-to-b from-[#b4bcc8] to-[#6b7381]"
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-0 h-[4px] w-[16%] -translate-x-1/2 rounded-b-md bg-[#4d5461]" />
      </div>
    </div>
  );
}