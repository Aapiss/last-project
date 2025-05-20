import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircle,
  Mail,
  Phone,
  ArrowLeft,
  KeyRound,
  Pencil,
  Upload,
} from "lucide-react";
import { supabase } from "../utils/SupaClient";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("User not authenticated");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, full_name, telephone, email, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
        setFormData(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("id", profile.id);

    if (error) {
      Swal.fire("Gagal", "Gagal memperbarui profil", "error");
      console.error("Error updating profile:", error);
    } else {
      setProfile(formData);
      setShowModal(false);
      Swal.fire("Berhasil", "Profil berhasil diperbarui", "success");
    }
  };

  const handleChangePassword = async () => {
    const { newPassword, confirmNewPassword } = passwordData;

    if (!newPassword || !confirmNewPassword) {
      Swal.fire("Oops", "Semua field harus diisi", "warning");
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire("Oops", "Password minimal 6 karakter", "warning");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Swal.fire("Oops", "Konfirmasi password tidak cocok", "error");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      Swal.fire("Gagal", "Gagal mengubah password", "error");
    } else {
      setPasswordData({ newPassword: "", confirmNewPassword: "" });
      setShowPasswordModal(false);
      Swal.fire("Berhasil", "Password berhasil diubah", "success");
    }
  };

  const handleUploadAvatar = async () => {
    if (!selectedFile) return;

    const fileExt = selectedFile.name.split(".").pop();
    const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
    const filePath = `avatar_url/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, selectedFile);

    if (uploadError) {
      Swal.fire("Gagal", "Gagal mengunggah gambar", "error");
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: data.publicUrl })
      .eq("id", profile.id);

    if (updateError) {
      Swal.fire("Gagal", "Gagal menyimpan URL gambar", "error");
      return;
    }

    setProfile({ ...profile, avatar_url: data.publicUrl });
    setSelectedFile(null);
    setPreviewUrl(null);
    Swal.fire("Berhasil", "Foto berhasil diunggah", "success");
  };

  return (
    <>
      <Helmet>
        <title>Profile | NextEdu</title>
        <meta
          name="description"
          content={`Profil pengguna di NextEdu. Update informasi pribadi, avatar, dan preferensi belajar.`}
        />
        <meta property="og:title" content={`Profile | NextEdu`} />
        <meta
          property="og:description"
          content={`Profil pengguna di NextEdu. Update informasi pribadi, avatar, dan preferensi belajar.`}
        />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://nextedu.example.com/profile" />
        <meta property="og:site_name" content="NextEdu" />
      </Helmet>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-lg shadow transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 max-w-3xl w-full transition-all duration-300">
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src={
                previewUrl ||
                profile?.avatar_url ||
                "https://i.pravatar.cc/150?img=32"
              }
              alt="Avatar"
              className="w-32 h-32 rounded-full shadow-md mb-4 object-cover border-4 border-purple-300"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={(e) => {
                const file = e.target.files[0];
                setSelectedFile(file);
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setPreviewUrl(reader.result);
                  reader.readAsDataURL(file);
                } else {
                  setPreviewUrl(null);
                }
              }}
            />
            <button
              onClick={handleUploadAvatar}
              className="mt-3 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
            >
              <Upload size={18} /> Upload Foto
            </button>
          </div>

          <div className="space-y-4">
            <InfoCard
              icon={<UserCircle />}
              label="Username"
              value={profile?.username}
            />
            <InfoCard icon={<Mail />} label="Email" value={profile?.email} />
            <InfoCard
              icon={<Phone />}
              label="No Telepon"
              value={profile?.telephone}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition w-full flex items-center justify-center gap-2"
            >
              <Pencil className="w-5 h-5" />
              Edit Profile
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition w-full flex items-center justify-center gap-2"
            >
              <KeyRound className="w-5 h-5" />
              Ubah Password
            </button>
          </div>
        </div>

        {showModal && (
          <Modal onClose={() => setShowModal(false)} title="Edit Profile">
            <div className="space-y-4">
              <InputField
                placeholder="Full Name"
                value={formData.full_name}
                onChange={(val) => setFormData({ ...formData, full_name: val })}
              />
              <InputField
                placeholder="Username"
                value={formData.username}
                onChange={(val) => setFormData({ ...formData, username: val })}
              />
              <InputField
                placeholder="Email"
                value={formData.email}
                onChange={(val) => setFormData({ ...formData, email: val })}
                type="email"
              />
              <InputField
                placeholder="No Telepon"
                value={formData.telephone}
                onChange={(val) => setFormData({ ...formData, telephone: val })}
              />
            </div>
            <div className="flex justify-between mt-6">
              <ModalButton label="Batal" onClick={() => setShowModal(false)} />
              <ModalButton label="Simpan" primary onClick={handleUpdate} />
            </div>
          </Modal>
        )}

        {showPasswordModal && (
          <Modal
            onClose={() => setShowPasswordModal(false)}
            title="Ubah Password"
          >
            <div className="space-y-4">
              <InputField
                type="password"
                placeholder="Password Baru"
                value={passwordData.newPassword}
                onChange={(val) =>
                  setPasswordData({ ...passwordData, newPassword: val })
                }
              />
              <InputField
                type="password"
                placeholder="Konfirmasi Password Baru"
                value={passwordData.confirmNewPassword}
                onChange={(val) =>
                  setPasswordData({ ...passwordData, confirmNewPassword: val })
                }
              />
            </div>
            <div className="flex justify-between mt-6">
              <ModalButton
                label="Batal"
                onClick={() => setShowPasswordModal(false)}
              />
              <ModalButton
                label="Simpan"
                primary
                onClick={handleChangePassword}
              />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow">
    <div className="text-purple-600">{icon}</div>
    <div>
      <label className="text-sm text-gray-500 dark:text-gray-300">
        {label}
      </label>
      <p className="text-lg font-medium text-gray-800 dark:text-white">
        {value}
      </p>
    </div>
  </div>
);

const Modal = ({ children, onClose, title }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md">
      <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
        {title}
      </h3>
      {children}
    </div>
  </div>
);

const InputField = ({ placeholder, value, onChange, type = "text" }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
  />
);

const ModalButton = ({ label, onClick, primary = false }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition ${
      primary
        ? "bg-purple-600 text-white hover:bg-purple-700"
        : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
    }`}
  >
    {label}
  </button>
);

export default ProfilePage;
