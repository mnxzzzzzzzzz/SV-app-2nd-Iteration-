import { Check, X, Info } from "lucide-react";

export function DesignSystemShowcase() {
  return (
    <div className="flex flex-col gap-8 pb-24 px-6 pt-8 bg-sv-navy">
      <h1 className="text-2xl font-semibold text-sv-text-main">StudentVerse Design System</h1>

      {/* Colors */}
      <section>
        <h2 className="text-xl font-semibold text-sv-text-main mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="bg-sv-navy h-20 rounded-xl border border-sv-glass-border flex items-center justify-center">
              <span className="text-sv-text-main text-sm">#0A0F1E</span>
            </div>
            <p className="text-sv-text-muted text-sm">Navy (Background)</p>
          </div>

          <div className="space-y-2">
            <div className="bg-sv-azure h-20 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm">#2962FF</span>
            </div>
            <p className="text-sv-text-muted text-sm">Azure (Primary)</p>
          </div>

          <div className="space-y-2">
            <div className="bg-sv-cyan h-20 rounded-xl flex items-center justify-center">
              <span className="text-sv-navy text-sm">#00F0FF</span>
            </div>
            <p className="text-sv-text-muted text-sm">Cyan (Accent)</p>
          </div>

          <div className="space-y-2">
            <div className="bg-sv-gold h-20 rounded-xl flex items-center justify-center">
              <span className="text-sv-navy text-sm">#FFD700</span>
            </div>
            <p className="text-sv-text-muted text-sm">Gold (Warning)</p>
          </div>

          <div className="space-y-2">
            <div className="bg-sv-violet h-20 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm">#7B2CBF</span>
            </div>
            <p className="text-sv-text-muted text-sm">Violet (Accent)</p>
          </div>

          <div className="space-y-2">
            <div className="bg-success h-20 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm">#10B981</span>
            </div>
            <p className="text-sv-text-muted text-sm">Success</p>
          </div>
        </div>
      </section>

      {/* Glassmorphism */}
      <section>
        <h2 className="text-xl font-semibold text-sv-text-main mb-4">Glassmorphism</h2>
        <div className="space-y-4">
          <div className="bg-sv-glass-bg border border-sv-glass-border backdrop-blur-md rounded-xl p-5">
            <p className="text-sv-text-main">Glass Surface</p>
            <p className="text-sv-text-muted text-sm">rgba(255,255,255,0.03) + backdrop-blur</p>
          </div>
          <div className="bg-sv-glass-highlight border border-sv-glass-border backdrop-blur-md rounded-xl p-5">
            <p className="text-sv-text-main">Glass Highlight</p>
            <p className="text-sv-text-muted text-sm">rgba(255,255,255,0.06) for hover states</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-xl font-semibold text-sv-text-main mb-4">Typography</h2>
        <div className="space-y-4 bg-sv-glass-bg rounded-xl p-5 border border-sv-glass-border">
          <div>
            <h1 className="text-sv-text-main mb-1">Heading 1 - 2xl</h1>
            <p className="text-sv-text-muted text-sm">font-medium, line-height 1.5</p>
          </div>
          <div>
            <h2 className="text-sv-text-main mb-1">Heading 2 - xl</h2>
            <p className="text-sv-text-muted text-sm">font-medium, line-height 1.5</p>
          </div>
          <div>
            <h3 className="text-sv-text-main mb-1">Heading 3 - lg</h3>
            <p className="text-sv-text-muted text-sm">font-medium, line-height 1.5</p>
          </div>
          <div>
            <p className="text-sv-text-main mb-1">Body Text - base</p>
            <p className="text-sv-text-muted text-sm">font-normal, line-height 1.5</p>
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section>
        <h2 className="text-xl font-semibold text-sv-text-main mb-4">Border Radius</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="bg-sv-azure h-16 flex items-center justify-center text-white rounded-full">
              Button Radius - Full (9999px)
            </div>
          </div>
          <div className="space-y-2">
            <div className="bg-sv-azure h-16 flex items-center justify-center text-white rounded-xl">
              Card Radius - XL (20px)
            </div>
          </div>
          <div className="space-y-2">
            <div className="bg-success w-24 h-24 flex items-center justify-center text-white text-center text-sm mx-auto rounded-full">
              Circle<br/>Radius<br/>Full
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-xl font-semibold text-sv-text-main mb-4">Buttons</h2>
        <div className="space-y-3">
          <button className="w-full bg-sv-azure text-white py-4 font-medium rounded-full hover:opacity-90 transition-opacity">
            Primary Button (Azure)
          </button>
          <button className="w-full bg-sv-cyan text-sv-navy py-4 font-medium rounded-full hover:opacity-90 transition-opacity">
            Accent Button (Cyan)
          </button>
          <button className="w-full bg-success text-white py-4 font-medium rounded-full hover:opacity-90 transition-opacity">
            Success Button
          </button>
          <button className="w-full bg-destructive text-white py-4 font-medium rounded-full hover:opacity-90 transition-opacity">
            Error Button
          </button>
          <button className="w-full bg-sv-glass-bg text-sv-text-main py-4 font-medium border border-sv-glass-border rounded-full hover:bg-sv-glass-highlight transition-colors">
            Secondary Button (Glass)
          </button>
        </div>
      </section>

      {/* Status Indicators */}
      <section>
        <h2 className="text-xl font-semibold text-sv-text-main mb-4">Status Indicators</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-success/10 border border-success/30 rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sv-text-main font-medium">Success State</p>
              <p className="text-sv-text-muted text-sm">Operation completed successfully</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center">
              <X className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sv-text-main font-medium">Error State</p>
              <p className="text-sv-text-muted text-sm">Something went wrong</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-sv-azure/10 border border-sv-azure/30 rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-sv-azure flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sv-text-main font-medium">Info State</p>
              <p className="text-sv-text-muted text-sm">Information message</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-sv-gold/10 border border-sv-gold/30 rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-sv-gold flex items-center justify-center">
              <Info className="w-5 h-5 text-sv-navy" />
            </div>
            <div>
              <p className="text-sv-text-main font-medium">Warning State</p>
              <p className="text-sv-text-muted text-sm">Attention needed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
