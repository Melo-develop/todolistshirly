export default function EmptyState({ message = "No hay elementos para mostrar" }) {
  return (
    <div className="text-center py-8 text-gray-500">
      <p>{message}</p>
    </div>
  );
}