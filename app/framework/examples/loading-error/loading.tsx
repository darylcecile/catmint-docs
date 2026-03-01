export default function LoadingErrorLoading() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-blue-600 font-medium text-lg">
          Loading example page...
        </span>
      </div>
      <p className="text-sm text-gray-400 mt-2">
        This is the route-level loading.tsx fallback.
      </p>
    </div>
  );
}
