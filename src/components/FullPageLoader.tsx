export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500" />
    </div>
  );
}
