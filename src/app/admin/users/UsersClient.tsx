"use client";

import { useRouter } from "next/navigation";

interface User {
  id: string;
  name?: string | null;
  email: string;
  role: string;
  createdAt: Date;
}

export default function UsersClient({ users }: { users: User[] }) {
  const router = useRouter();

  const toggleRole = async (id: string, currentRole: string) => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    router.refresh();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Users</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Name</th>
              <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Email</th>
              <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Role</th>
              <th className="text-left px-6 py-3 text-xs font-semibold tracking-widest uppercase text-gray-400">Joined</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{u.name || "—"}</td>
                <td className="px-6 py-4 text-gray-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${u.role === "ADMIN" ? "bg-yellow-400 text-black" : "bg-gray-100 text-gray-500"}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => toggleRole(u.id, u.role)}
                    className="text-xs font-semibold text-gray-600 hover:text-black transition-colors"
                  >
                    {u.role === "ADMIN" ? "Revoke Admin" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p className="text-center text-gray-400 py-12">No users yet.</p>}
      </div>
    </div>
  );
}
