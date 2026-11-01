import Button from "../ui/Button"; // tomar Button er actual path dao
import HeroOrbitVisual from "../ui/HeroOrbitVisual";
import HeroBackground from "../ui/HeroBackground";
import HeroPerson from "../ui/HeroPerson";
import HeroStats from "../ui/StatItem";

export default function Hero() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white text-[#18181B] pt-16 pb-20 sm:pt-20 sm:pb-28 border-b border-[#F1F1F1]">
      <HeroBackground />
      <HeroPerson/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-mono font-semibold tracking-widest text-orange-600 uppercase">
                CREATIVE • TECHNOLOGY • MARKETING
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#18181B] leading-[1.1]">
              Build Your Business. <br />
              We’ll Help You <br className="hidden sm:inline" />
              Move Forward.
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
              Creative, technology and marketing support for growing businesses. From your first idea to your next stage, we help make the work clearer and more connected.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button to="/services" variant="primary" size="lg">
                <span>Explore Our Services</span>
              </Button>
              <Button to="/portfolio" className="!bg-transparent !text-orange-600 !border-orange-600 hover:!bg-orange-600 hover:!text-white" variant="secondary" size="lg">
                <span>View Our Work</span>
              </Button>
            </div>
            <HeroStats/>
          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-5">
            <HeroOrbitVisual className="!bg-transparent h-[420px] sm:h-[480px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[40%]" />
          </div>

        </div>
      </div>
    </section>
    
    </>
  );
}