"use client";
import { useState, useEffect } from "react";

export default function AddressUpdater() {
  const [address, setAddress] = useState({
    country: "",
    city: "",
    pincode: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(address);
  const [loading, setLoading] = useState(false);

  // Fetch address from Clerk metadata
  useEffect(() => {
    const fetchUserMetadata = async () => {
      try {
        const res = await fetch("/api/get-user-metadata");
        if (!res.ok) throw new Error("Failed to fetch address");

        const data = await res.json();
        setAddress(data?.address || { country: "", city: "", pincode: "" });
        setFormData(data?.address || { country: "", city: "", pincode: "" });
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    };
    fetchUserMetadata();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/update-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");

      alert(data.message);
      setAddress(formData);
      setIsEditing(false);
    } catch (error) {
      alert(error.message);
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-green-100 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Address</h2>
      {isEditing ? (
        <div>
          <label className="block">Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
          <label className="block mt-2">City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
          <label className="block mt-2">Postal Code:</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
          <button
            onClick={handleUpdate}
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Country:</strong> {address.country || "N/A"}
          </p>
          <p>
            <strong>City:</strong> {address.city || "N/A"}
          </p>
          <p>
            <strong>Postal Code:</strong> {address.pincode || "N/A"}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 bg-black text-white p-2 rounded"
          >
            ✏️ Edit
          </button>
        </div>
      )}
    </div>
  );
}
