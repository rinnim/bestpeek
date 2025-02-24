export default function ErrorCard({ message }) {
  return (
    <div className="fixed h-96 w-96 flex items-center justify-center inset-0 m-auto z-50 p-4 rounded-md shadow-md bg-red-500 text-white border border-red-400">
      <div className="flex items-center justify-center flex-col">
        <div className="text-2xl font-semibold">Error</div>
        <p className="mt-2 text-sm">{message}</p>
      </div>
    </div>
  );
}
