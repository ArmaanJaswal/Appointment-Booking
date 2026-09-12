import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const formatTime = (time) => {
  if (!time) return "";
  const [h, m] = time.split(":");
  if (!h) return time;
  let hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour.toString().padStart(2, "0")}:${m || "00"} ${ampm}`;
};

const AppointmentDisplay = ({ data, onUpdate }) => {

  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleStatusChange = async (status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/appointments/${data._id}/status`,
        { status }
      );
      setShowCancelModal(false);
      if (onUpdate) {
        onUpdate();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-200 p-5 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-gray-900 truncate">
                {data.title}
              </h2>

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {data.description}
              </p>
            </div>

            {/* Edit */}
            {data.status !== "cancelled" && data.status !== "completed" && (
              <button
                onClick={() => navigate(`/edit/${data._id}`)}
                className="shrink-0 text-sm font-medium text-blue-600
                           hover:text-blue-800 transition cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>

          {/* Status */}
          <div className="mt-4">
            <span
              className={`inline-flex text-xs font-medium px-3 py-1 rounded-full capitalize
                ${
                  data.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : data.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
            >
              {data.status || "scheduled"}
            </span>
          </div>

          {/* Appointment Details */}
          <div className="mt-5 space-y-3">
            {/* Date */}
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-400 font-medium">DATE</p>

              <p className="text-sm font-semibold text-gray-800 mt-1">
                {data.date}
              </p>
            </div>

            {/* Time */}
            <div className="flex gap-3">
              <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-400 font-medium">START</p>

                <p className="text-sm font-semibold text-gray-800 mt-1">
                  {formatTime(data.startTime)}
                </p>
              </div>

              <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-400 font-medium">END</p>

                <p className="text-sm font-semibold text-gray-800 mt-1">
                  {formatTime(data.endTime)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
          <button
            onClick={() => handleStatusChange("completed")}
            disabled={data.status === "completed" || data.status === "cancelled"}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
              data.status === "completed" || data.status === "cancelled"
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "text-white bg-green-600 hover:bg-green-700 cursor-pointer"
            }`}
          >
            Complete
          </button>

          <button
            onClick={() => setShowCancelModal(true)}
            disabled={data.status === "cancelled" || data.status === "completed"}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
              data.status === "cancelled" || data.status === "completed"
                ? "border border-gray-200 text-gray-400 cursor-not-allowed"
                : "text-red-600 border border-red-200 hover:bg-red-50 cursor-pointer"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Cancel Appointment
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to cancel this appointment?
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition cursor-pointer"
              >
                No
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange("cancelled")}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition cursor-pointer"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentDisplay;