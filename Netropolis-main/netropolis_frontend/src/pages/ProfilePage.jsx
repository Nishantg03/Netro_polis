import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../features/slices/authSlice";
import { fetchUserProfile } from "../features/userFunctions";
import AppLoader from "../utils/AppLoader";
import Header from "../components/globals/Header";
import Footer from "../components/globals/Footer";
import navigations from "../data/navigations.json";
import mesh from "../assets/images/mesh.png";
import {
  UserCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";

const baseUrl = import.meta.env.VITE_BASE_BACKEND_URL;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const tokens = useSelector((state) => state.auth.tokens);

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    if (!userInfo) {
      toast.error("Please login to continue.");
      navigate("/");
      return;
    }
    setFormData({
      first_name: userInfo.user_profile?.first_name || "",
      last_name: userInfo.user_profile?.last_name || "",
      email: userInfo.user_profile?.email || "",
      username: userInfo.user_profile?.username || "",
    });
  }, [userInfo, navigate]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/fetch_user/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        const errorMsg =
          data.message ||
          Object.values(data).flat().join(", ") ||
          "Failed to update profile";
        throw new Error(errorMsg);
      }

      // Re-fetch updated profile and update Redux
      const updated = await fetchUserProfile(tokens);
      if (!updated.error) {
        dispatch(setCredentials({ ...updated, role: userInfo.role }));
      }

      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      first_name: userInfo.user_profile?.first_name || "",
      last_name: userInfo.user_profile?.last_name || "",
      email: userInfo.user_profile?.email || "",
      username: userInfo.user_profile?.username || "",
    });
    setEditing(false);
  };

  if (!userInfo) return null;

  return (
    <>
      <Header navigations={navigations} />
      <div
        className="flex bg-transparent min-h-screen w-full"
        style={{ backgroundImage: `url(${mesh})` }}
      >
        <div className="flex flex-col w-full items-center mt-32 mb-10 px-4">
          {/* Page Title */}
          <div className="text-center mb-10">
            <p className="font-fira text-medium text-4xl text-indigo-400">
              My Profile
            </p>
            <p className="mb-2 text-neutral-500">
              View and manage your account details
            </p>
          </div>

          {loading && (
            <AppLoader
              customClass="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
            />
          )}

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8">
            {/* Avatar & Name */}
            <div className="flex flex-col items-center mb-8">
              <UserCircleIcon className="h-24 w-24 text-indigo-400 mb-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                {userInfo.user_profile?.first_name}{" "}
                {userInfo.user_profile?.last_name}
              </h2>
              <span className="text-sm text-indigo-400 bg-indigo-50 px-3 py-1 rounded-full mt-2 capitalize">
                {userInfo.role === "cm" ? "Community Manager" : "User"}
              </span>
              {userInfo.role === "cm" && userInfo.region && (
                <span className="text-sm text-neutral-500 mt-1">
                  Region: {userInfo.region}
                </span>
              )}
            </div>

            {/* Divider */}
            <hr className="border-gray-200 mb-6" />

            {/* Profile Fields */}
            <div className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className={`w-full px-4 py-2.5 rounded-lg border text-gray-800 ${
                    editing
                      ? "border-indigo-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      : "border-gray-200 bg-gray-50 cursor-default"
                  }`}
                />
              </div>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`w-full px-4 py-2.5 rounded-lg border text-gray-800 ${
                      editing
                        ? "border-indigo-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        : "border-gray-200 bg-gray-50 cursor-default"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`w-full px-4 py-2.5 rounded-lg border text-gray-800 ${
                      editing
                        ? "border-indigo-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        : "border-gray-200 bg-gray-50 cursor-default"
                    }`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!editing}
                  className={`w-full px-4 py-2.5 rounded-lg border text-gray-800 ${
                    editing
                      ? "border-indigo-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      : "border-gray-200 bg-gray-50 cursor-default"
                  }`}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-8">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-indigo-400 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full transition-colors"
                >
                  <PencilSquareIcon className="h-4 w-4" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-indigo-400 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer navigations={navigations} />
    </>
  );
};

export default ProfilePage;
