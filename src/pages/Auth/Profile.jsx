import React, { useState, useEffect } from "react";
// go up two levels:
import { supabase } from "../../supabaseClient";
import logo         from "../../assets/logo.png";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser } from '../../services/userService';

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user.id;

      const { data, error } = await getUserById(userId);

      if (!error) {
        setFirstName(data.first_name);
        setLastName(data.last_name);
      } else {
        console.error("Load profile error:", error);
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr) {
      console.error("Fetch user error:", authErr);
      setSaving(false);
      return alert(authErr.message);
    }
    const userId = user.id;

    // update profile table
    const { error: updErr } = await updateUser(userId, { first_name: firstName, last_name: lastName });
    if (updErr) {
      console.error("Profile update error:", updErr);
      setSaving(false);
      return alert(updErr.message);
    }

    // update auth metadata
    const { error: metaErr } = await supabase.auth.updateUser({
      data: { first_name: firstName, last_name: lastName }
    });
    setSaving(false);

    if (metaErr) {
      console.error("Auth metadata update error:", metaErr);
      return alert(metaErr.message);
    }

    alert("Profile updated!");
    navigate("/");
  };

  if (loading) return null;
  return (
    <div className="fixed inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/animals-bg.png')" }}
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-xl p-8 w-full max-w-md space-y-6">
          <img src={logo} alt="Logo" className="h-32 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-center text-[#17C0EB]">
            Edit Profile
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:bg-white focus:outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full btn-brand py-3 rounded-lg text-lg"
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
