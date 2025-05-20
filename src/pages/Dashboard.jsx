import { useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import LoadingScreen from "../components/LoadingScreen";
import { Helmet } from "react-helmet-async";
import Input from "../components/ui/Input";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    courses_name: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*");
      if (!error) setCourses(data);
    };
    fetchCourses();
    setLoading(false);
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.courses_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async () => {
    if (!formData.courses_name || !formData.description || !formData.category) {
      return Swal.fire("All fields are required", "", "warning");
    }

    if (editCourse) {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to save the changes?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, save it!",
        cancelButtonText: "Cancel",
      });

      if (!confirm.isConfirmed) return;

      const { error } = await supabase
        .from("courses")
        .update(formData)
        .eq("id", editCourse.id);

      if (error) return Swal.fire("Error updating course", "", "error");
      Swal.fire("Course updated", "", "success");
    } else {
      const { error } = await supabase.from("courses").insert([formData]);
      if (error) return Swal.fire("Error adding course", "", "error");
      Swal.fire("Course added", "", "success");
    }

    setShowModal(false);
    setEditCourse(null);
    setFormData({ courses_name: "", description: "", category: "" });

    // refresh data
    const { data, error } = await supabase.from("courses").select("*");
    if (!error) setCourses(data);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This course will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626", // red
      cancelButtonColor: "#6b7280", // gray
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const { error } = await supabase.from("courses").delete().eq("id", id);
      if (!error) {
        setCourses((prev) => prev.filter((c) => c.id !== id));
        Swal.fire("Deleted!", "The course has been deleted.", "success");
      } else {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Helmet>
        <title>Dashboard | NextEdu</title>
        <meta
          name="description"
          content={`Dashboard pribadi di NextEdu. Akses kursus, progress belajar, dan update terbaru.`}
        />
        <meta property="og:title" content={`Dashboard | NextEdu`} />
        <meta
          property="og:description"
          content={`Dashboard pribadi di NextEdu. Akses kursus, progress belajar, dan update terbaru.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://nextedu.example.com/dashboard"
        />
        <meta property="og:site_name" content="NextEdu" />
      </Helmet>
      <div className="p-6 md:p-10 min-h-screen bg-white dark:bg-zinc-900">
        {/* Tombol Back dan DarkMode */}
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Site
          </Button>
          <div className="ml-auto">
            <DarkModeToggle />
          </div>
        </div>

        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
            Course Management
          </h1>
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-zinc-800 text-black dark:text-white rounded-md px-2"
            />
            <Button
              onClick={() => {
                setShowModal(true);
                setFormData({
                  courses_name: "",
                  description: "",
                  category: "",
                });
                setEditCourse(null);
              }}
            >
              Add Course
            </Button>
          </div>
        </div>

        {/* Tabel Data */}
        <div className="overflow-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
          <table className="w-full text-left">
            <thead className="bg-zinc-100 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-2 text-zinc-700 dark:text-white">
                  Title
                </th>
                <th className="px-4 py-2 text-zinc-700 dark:text-white">
                  Description
                </th>
                <th className="px-4 py-2 text-zinc-700 dark:text-white">
                  Category
                </th>
                <th className="px-4 py-2 text-zinc-700 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr
                  key={course.id}
                  className="border-t border-zinc-200 dark:border-zinc-700"
                >
                  <td className="px-4 py-2 text-zinc-800 dark:text-white">
                    {course.courses_name}
                  </td>
                  <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                    {course.description}
                  </td>
                  <td className="px-4 py-2 text-zinc-700 dark:text-zinc-300">
                    {course.category}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditCourse(course);
                        setFormData({
                          courses_name: course.courses_name,
                          description: course.description,
                          category: course.category,
                        });
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </Button>

                    <button
                      onClick={() => handleDelete(course.id)}
                      className="px-3 py-1 rounded text-sm font-medium bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center">
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-t-2xl w-full max-w-3xl h-[80vh] overflow-auto shadow-2xl animate-slideUp">
              <h2 className="text-xl font-semibold mb-4 dark:text-white text-black">
                {editCourse ? "Edit Course" : "Add New Course"}
              </h2>
              <div className="w-full max-w-4xl mx-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Course Title
                  </label>
                  <Input
                    placeholder="Course Title"
                    value={formData.courses_name}
                    onChange={(e) =>
                      setFormData({ ...formData, courses_name: e.target.value })
                    }
                    className="w-full bg-white dark:bg-zinc-700 dark:text-white rounded-md p-3 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Description
                  </label>
                  <Input
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-white dark:bg-zinc-700 dark:text-white rounded-md p-3 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Category
                  </label>
                  <Input
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-white dark:bg-zinc-700 dark:text-white rounded-md p-3 text-black"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowModal(false);
                    setEditCourse(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  {editCourse ? "Update" : "Add"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
