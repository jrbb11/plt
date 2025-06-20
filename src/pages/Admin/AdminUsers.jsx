import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("id, first_name, last_name, email, role, created_at")
      .order("created_at", { ascending: false });

    if (!error) setUsers(data);
  };

  const handleRoleChange = async (id, newRole) => {
    await supabase.from("users").update({ role: newRole }).eq("id", id);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  const handleDelete = async (id) => {
    await supabase.from("users").delete().eq("id", id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const filtered = users.filter(
    (u) =>
      u.first_name.toLowerCase().includes(search.toLowerCase()) ||
      u.last_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-[#17C0EB]">Users Management</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email"
        className="mb-4 px-4 py-2 border rounded w-full max-w-md"
      />

      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-[#17C0EB] text-white">
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Email</th>
            <th className="text-left px-4 py-2">Role</th>
            <th className="text-left px-4 py-2">Joined</th>
            <th className="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.first_name} {user.last_name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
