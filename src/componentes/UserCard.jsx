export default function UserCard({ user, isCurrentUser = false }) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow border-l-4 ${
      isCurrentUser ? 'border-blue-500' : 'border-gray-300'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{user.username}</h3>
          <p className="text-gray-600 text-sm">ID: {user.id}</p>
        </div>
        {isCurrentUser && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            Tú
          </span>
        )}
      </div>
    </div>
  );
}