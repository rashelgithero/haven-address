export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-4 py-16">
      {/* DaisyUI Spinner with Custom Accent Color */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-12 h-12 rounded-full border-4 border-[#F9A51A]/20"></div>
        <span className="loading loading-spinner loading-lg text-[#F9A51A]"></span>
      </div>
      <p className="text-slate-400 text-sm font-medium tracking-wide animate-pulse">
        Loading <span className="text-[#F9A51A]">haven</span> properties...
      </p>
    </div>
  );
}