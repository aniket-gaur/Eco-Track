"use client";

export default function EcoTrackTable({ data }) {
  return (
    <div className="overflow-x-auto border rounded-xl bg-white shadow">
      <table className="min-w-full text-sm text-gray-800">
        <thead className="bg-gray-100 text-left font-semibold">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Bin ID</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Waste Level (%)</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Latitude</th>
            <th className="px-4 py-2">Longitude</th>
            <th className="px-4 py-2">Battery (%)</th>
            <th className="px-4 py-2">Temperature (°C)</th>
            <th className="px-4 py-2">Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={`border-t hover:bg-gray-50 ${
                row.Status === "Collected" ? "bg-green-50" : ""
              }`}
            >
              <td className="px-4 py-2">{row.Date}</td>
              <td className="px-4 py-2">{row["Bin ID"]}</td>
              <td className="px-4 py-2">{row.Location}</td>
              <td className="px-4 py-2">{row["Waste Level (%)"]}</td>
              <td
                className={`px-4 py-2 font-semibold ${
                  row.Status === "Collected"
                    ? "text-green-600"
                    : "text-gray-800"
                }`}
              >
                {row.Status}
              </td>
              <td className="px-4 py-2">{row.Latitude}</td>
              <td className="px-4 py-2">{row.Longitude}</td>
              <td className="px-4 py-2">{row["Battery (%)"]}</td>
              <td className="px-4 py-2">{row["Temperature (°C)"]}</td>
              <td className="px-4 py-2">{row["Distance from Origin (km)"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
