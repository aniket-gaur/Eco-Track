"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function AddressUpdater() {
  const router = useRouter();
  const [address, setAddress] = useState({
    country: "",
    city: "",
    pincode: "",
    house: "",
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
        setAddress(
          data?.address || { house: "", country: "", city: "", pincode: "" }
        );
        setFormData(
          data?.address || { house: "", country: "", city: "", pincode: "" }
        );
      } catch (error) {
        toast.error("Error fetching metadata!");
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

      toast.success(
        "Address updated successfully! Redirecting to Dashboard 🎉"
      );
      setAddress(formData);
      setIsEditing(false);
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error(error.message || "Update failed! ❌");
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 shadow-md rounded-md border border-green-300 w-full max-w-2xl min-h-[200px]">
        {" "}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <h2 className="text-xl font-bold text-green-700 mb-4">Address Form</h2>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-green-700">
                House No:
              </label>
              <input
                type="text"
                name="house"
                value={formData.house}
                onChange={handleChange}
                className="border border-green-400 p-2 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block font-medium text-green-700">
                Country:
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border border-green-400 p-2 rounded-md w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-green-700">
                  City:
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border border-green-400 p-2 rounded-md w-full"
                />
              </div>
              <div>
                <label className="block font-medium text-green-700">
                  Pincode:
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="border border-green-400 p-2 rounded-md w-full"
                />
              </div>
            </div>
            <button
              onClick={handleUpdate}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md mt-2"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Address"}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p>
              <strong className="text-green-700">House No:</strong>{" "}
              {address.house || "N/A"}
            </p>
            <p>
              <strong className="text-green-700">Country:</strong>{" "}
              {address.country || "N/A"}
            </p>
            <p>
              <strong className="text-green-700">City:</strong>{" "}
              {address.city || "N/A"}
            </p>
            <p>
              <strong className="text-green-700">Pincode:</strong>{" "}
              {address.pincode || "N/A"}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md mt-2"
            >
              ✏️ Edit Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
