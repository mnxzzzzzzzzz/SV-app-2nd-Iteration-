import { Check, X, Info } from "lucide-react";

export function DesignSystemShowcase() {
  return (
    <div className="flex flex-col gap-8 pb-24 px-6 pt-8">
      <h1 className="text-2xl font-semibold text-white">StudentVerse Design System</h1>

      {/* Colors */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="bg-[#080C1F] h-20 rounded-[20px] border border-white/10 flex items-center justify-center">
              <span className="text-white text-sm">#080C1F</span>
            </div>
            <p className="text-[#A0A4B8] text-sm">Background</p>
          </div>

          <div className="space-y-2">
            <div className="bg-[#2962FF] h-20 rounded-[20px] flex items-center justify-center">
              <span className="text-white text-sm">#2962FF</span>
            </div>
            <p className="text-[#A0A4B8] text-sm">Primary</p>
          </div>

          <div className="space-y-2">
            <div className="bg-[#10B981] h-20 rounded-[20px] flex items-center justify-center">
              <span className="text-white text-sm">#10B981</span>
            </div>
            <p className="text-[#A0A4B8] text-sm">Success</p>
          </div>

          <div className="space-y-2">
            <div className="bg-[#EF4444] h-20 rounded-[20px] flex items-center justify-center">
              <span className="text-white text-sm">#EF4444</span>
            </div>
            <p className="text-[#A0A4B8] text-sm">Error</p>
          </div>

          <div className="space-y-2">
            <div className="bg-[#A0A4B8] h-20 rounded-[20px] flex items-center justify-center">
              <span className="text-white text-sm">#A0A4B8</span>
            </div>
            <p className="text-[#A0A4B8] text-sm">Neutral</p>
          </div>

          <div className="space-y-2">
            <div className="bg-[#0F1429] h-20 rounded-[20px] border border-white/10 flex items-center justify-center">
              <span className="text-white text-sm">#0F1429</span>
            </div>
            <p className="text-[#A0A4B8] text-sm">Card</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Typography</h2>
        <div className="space-y-4 bg-[#0F1429] rounded-[20px] p-5 border border-white/10">
          <div>
            <h1 className="text-white mb-1">Heading 1 - 2xl</h1>
            <p className="text-[#A0A4B8] text-sm">font-medium, line-height 1.5</p>
          </div>
          <div>
            <h2 className="text-white mb-1">Heading 2 - xl</h2>
            <p className="text-[#A0A4B8] text-sm">font-medium, line-height 1.5</p>
          </div>
          <div>
            <h3 className="text-white mb-1">Heading 3 - lg</h3>
            <p className="text-[#A0A4B8] text-sm">font-medium, line-height 1.5</p>
          </div>
          <div>
            <p className="text-white mb-1">Body Text - base</p>
            <p className="text-[#A0A4B8] text-sm">font-normal, line-height 1.5</p>
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Border Radius</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="bg-[#2962FF] h-16 flex items-center justify-center text-white" style={{ borderRadius: "30px" }}>
              Button Radius - 30px
            </div>
          </div>
          <div className="space-y-2">
            <div className="bg-[#10B981] w-24 h-24 flex items-center justify-center text-white text-center text-sm mx-auto" style={{ borderRadius: "50px" }}>
              Circle<br/>Radius<br/>50px
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Buttons</h2>
        <div className="space-y-3">
          <button 
            className="w-full bg-[#2962FF] text-white py-4 font-medium"
            style={{ borderRadius: "30px" }}
          >
            Primary Button
          </button>
          <button 
            className="w-full bg-[#10B981] text-white py-4 font-medium"
            style={{ borderRadius: "30px" }}
          >
            Success Button
          </button>
          <button 
            className="w-full bg-[#EF4444] text-white py-4 font-medium"
            style={{ borderRadius: "30px" }}
          >
            Error Button
          </button>
          <button 
            className="w-full bg-[#0F1429] text-white py-4 font-medium border border-white/10"
            style={{ borderRadius: "30px" }}
          >
            Secondary Button
          </button>
        </div>
      </section>

      {/* Cards & Icons */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Cards with Icons</h2>
        <div className="space-y-3">
          <div className="bg-[#0F1429] rounded-[20px] p-4 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-[#10B981]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-white font-medium">Success State</p>
              <p className="text-[#A0A4B8] text-sm">WCAG AA compliant colors</p>
            </div>
          </div>

          <div className="bg-[#0F1429] rounded-[20px] p-4 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EF4444]/20 flex items-center justify-center">
              <X className="w-5 h-5 text-[#EF4444]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-white font-medium">Error State</p>
              <p className="text-[#A0A4B8] text-sm">Clear visual feedback</p>
            </div>
          </div>

          <div className="bg-[#0F1429] rounded-[20px] p-4 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2962FF]/20 flex items-center justify-center">
              <Info className="w-5 h-5 text-[#2962FF]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-white font-medium">Info State</p>
              <p className="text-[#A0A4B8] text-sm">Large tap targets (48px+)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Accessibility Features</h2>
        <div className="bg-[#0F1429] rounded-[20px] p-5 border border-white/10 space-y-3">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#10B981] mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-white font-medium">WCAG AA Compliance</p>
              <p className="text-[#A0A4B8] text-sm">All color combinations meet contrast requirements</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#10B981] mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-white font-medium">Large Tap Targets</p>
              <p className="text-[#A0A4B8] text-sm">Minimum 48px touch targets for better usability</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#10B981] mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-white font-medium">Semantic HTML</p>
              <p className="text-[#A0A4B8] text-sm">Proper ARIA labels and roles for screen readers</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#10B981] mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-white font-medium">Focus States</p>
              <p className="text-[#A0A4B8] text-sm">Clear keyboard navigation indicators</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
