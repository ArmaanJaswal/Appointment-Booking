import React, { useState, useEffect } from "react";
import AppointmentDisplay from "../src/Components/AppointmentDisplay";
import StatusPanel from "../src/Components/StatusPanel";
import axios from "axios";
import { useNavigate } from "react-router";

const MainPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/appointments`
      );
      setAppointments(response.data.appointments || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredAppointments = appointments.filter((item) => {
    const matchesName =
      searchTerm.trim() === "" ||
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !searchDate || item.date === searchDate;

    const matchesStatus =
      statusFilter === "all" ||
      (item.status || "scheduled") === statusFilter;

    return matchesName && matchesDate && matchesStatus;
  });


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Appointments
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage your upcoming appointments
            </p>
          </div>

          <button
            onClick={() => navigate("/fillDetails")}
            className="px-5 py-2.5 bg-blue-600 text-white
                       font-medium rounded-lg
                       hover:bg-blue-700 transition cursor-pointer"
          >
            + New Appointment
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Overview Panel */}
        <StatusPanel
          appointments={appointments}
          selectedStatus={statusFilter}
          onSelectStatus={setStatusFilter}
        />

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="sm:w-56 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {(searchTerm || searchDate || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSearchDate("");
                setStatusFilter("all");
              }}
              className="px-4 py-2.5 text-sm text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Upcoming Appointments
          </h2>

          <span className="text-sm text-gray-500">
            {filteredAppointments.length}{" "}
            {filteredAppointments.length === 1 ? "appointment" : "appointments"}
          </span>
        </div>

        {/* Appointment Grid */}
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-base">No appointments found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAppointments.map((data) => {
              return (
                <AppointmentDisplay
                  key={data._id}
                  data={data}
                  onUpdate={fetchData}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;