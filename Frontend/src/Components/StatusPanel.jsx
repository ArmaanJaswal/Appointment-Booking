import React from "react";

const StatusPanel = ({ appointments = [], selectedStatus = "all", onSelectStatus }) => {
  const total = appointments.length;
  const pending = appointments.filter(
    (a) => !a.status || a.status === "scheduled"
  ).length;
  const completed = appointments.filter(
    (a) => a.status === "completed"
  ).length;
  const cancelled = appointments.filter(
    (a) => a.status === "cancelled"
  ).length;

  const stats = [
    {
      id: "all",
      label: "Total Appointments",
      count: total,
      textColor: "text-gray-900",
      activeBorder: "border-blue-500",
    },
    {
      id: "scheduled",
      label: "Pending / Scheduled",
      count: pending,
      textColor: "text-green-600",
      activeBorder: "border-green-500",
    },
    {
      id: "completed",
      label: "Successful / Completed",
      count: completed,
      textColor: "text-blue-600",
      activeBorder: "border-blue-500",
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: cancelled,
      textColor: "text-red-600",
      activeBorder: "border-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          onClick={() => onSelectStatus && onSelectStatus(stat.id)}
          className={`bg-white rounded-2xl border p-4 shadow-xs transition cursor-pointer ${
            selectedStatus === stat.id
              ? `${stat.activeBorder} ring-2 ring-blue-100`
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <p className="text-xs font-medium text-gray-500">{stat.label}</p>
          <p className={`text-2xl font-bold mt-1 ${stat.textColor}`}>
            {stat.count}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatusPanel;
