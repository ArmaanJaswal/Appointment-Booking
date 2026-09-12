import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/appointments`,
        formData
      );
      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to create appointment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Create Appointment
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Schedule a new appointment
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer"
          >
            ← Back
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              onChange={handleChange}
              value={formData.title}
              name="title"
              type="text"
              placeholder="C.E.O. Talk"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              onChange={handleChange}
              value={formData.description}
              name="description"
              rows="4"
              placeholder="Briefing by Armaan Jaswal"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              onChange={handleChange}
              value={formData.date}
              name="date"
              type="date"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                onChange={handleChange}
                value={formData.startTime}
                name="startTime"
                type="time"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <input
                onChange={handleChange}
                value={formData.endTime}
                name="endTime"
                type="time"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold
                       rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Create Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;