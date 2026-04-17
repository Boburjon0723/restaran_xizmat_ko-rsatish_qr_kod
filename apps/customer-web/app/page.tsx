import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col items-center w-full">
      {/* Hero Section / Splash Content */}
      <main className="relative w-full max-w-md min-h-screen flex flex-col overflow-hidden">
        {/* Top Visual Anchor: Immersive Image */}
        <div className="relative h-[574px] w-full">
          <img
            alt="High-end modern restaurant interior"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDue2gv02vivb6IPBjzk3My4kd_XOf2I-h1dXgnwo3X9qKI3HvZDBlBYxtHtm4GL5ZLvvpyM-Rm9h_RWbhqrLN28Ow0gvDNngLj0d9mlqFdTNBk0-4bKTTQ0j9CVFvd7suXBJJoU5d4SVGiwAPgwUYzVKRM-ljDRfnsUBpd72b9dWvqIhYeyDTfDLbVbqc9YMUHVO-nDC2oyPSUC_a494K3q8HNVDr710l0hUOTuJy-nF-ViYJp4Aba13bathnDX0XtsBCD1f7Brk"
          />
          {/* Tonal Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
          {/* Branding Overlay */}
          <div className="absolute top-12 left-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span
                className="material-symbols-outlined text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                restaurant
              </span>
            </div>
            <span className="font-headline font-extrabold text-white text-xl tracking-tight drop-shadow-md">
              Culinary Architect
            </span>
          </div>
        </div>

        {/* Content Canvas */}
        <section className="flex-grow px-8 pt-4 pb-12 bg-background relative -mt-20 rounded-t-[2.5rem] flex flex-col">
          {/* Animated Visual Cue */}
          <div className="w-12 h-1 bg-surface-container-high rounded-full mx-auto mb-8"></div>
          {/* Welcome Message */}
          <div className="space-y-2 mb-10">
            <p className="font-label text-primary font-semibold tracking-widest text-[10px] uppercase">
              Experience Excellence
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-on-surface">
              Welcome to <span className="text-primary">Culinary</span> Architect
            </h1>
            <p className="text-on-surface-variant leading-relaxed opacity-80">
              A fusion of architectural precision and sensory warmth. Your table
              is ready for an unforgettable journey.
            </p>
          </div>

          {/* Table Identification: Bento-style detail */}
          <div className="flex items-center gap-4 mb-auto">
            <div className="bg-surface-container-low rounded-2xl p-4 flex-1 flex flex-col gap-1 border border-outline-variant/10">
              <span className="font-label text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-tighter">
                Current Location
              </span>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-headline font-black text-on-surface">
                  Table #12
                </span>
                <div className="w-2 h-2 rounded-full bg-tertiary mb-2 animate-pulse"></div>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-2xl p-4 flex items-center justify-center border border-outline-variant/10">
              <span className="material-symbols-outlined text-on-surface-variant scale-125">
                qr_code_scanner
              </span>
            </div>
          </div>

          {/* Primary Action: The Start Button */}
          <div className="mt-8 space-y-4">
            <Link
              href="/menu"
              className="w-full py-5 bg-gradient-to-b from-primary to-primary-container text-white font-headline font-bold text-lg rounded-full shadow-[0_8px_30px_rgba(158,61,0,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              Start Ordering
              <span className="material-symbols-outlined text-sm">
                arrow_forward_ios
              </span>
            </Link>
            <Link
              href="/menu"
              className="w-full py-4 text-center text-secondary font-body font-semibold text-sm rounded-full bg-transparent hover:bg-surface-container-low transition-colors block"
            >
              View Digital Menu First
            </Link>
          </div>

          {/* Footer Compliance/Trust */}
          <div className="mt-8 flex justify-center gap-6 opacity-40">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                verified_user
              </span>
              <span className="text-[10px] font-label font-medium">
                SECURE PAY
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                contactless
              </span>
              <span className="text-[10px] font-label font-medium">
                CONTACTLESS
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Visual Polish: Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[30%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[5%] left-[-10%] w-[40%] h-[20%] bg-tertiary/5 blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
}

