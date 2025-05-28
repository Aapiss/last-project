import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../utils/SupaClient";
import { ArrowLeft, TrashIcon } from "lucide-react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from "../components/Header";
import { useAuth } from "../utils/store/useAuth";
import { Helmet } from "react-helmet-async";

const getYouTubeID = (url) => {
  const regExp =
    /^.*(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
};

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState(null); // untuk modal edit
  const [currentUser, setCurrentUser] = useState(); // 🔥 ambil user & username
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const { role } = useAuth();

  // Ambil user yang sedang login
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!error) setCurrentUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetchCourseDetail();
    fetchComments();
  }, [id]);

  const fetchCourseDetail = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) setCourse(data);
    setLoading(false);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*, profiles(username, avatar_url)") // ambil avatar juga
      .eq("course_id", id)
      .order("created_at", { ascending: false });

    if (!error) setComments(data);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      Swal.fire("Oops!", "You must be logged in to comment.", "warning");
      return;
    }

    const { error } = await supabase.from("comments").insert([
      {
        course_id: id,
        user_id: currentUser.id,
        comment: newComment.trim(),
      },
    ]);

    if (!error) {
      setNewComment("");
      fetchComments();
      Swal.fire("Comment Added", "Your comment has been posted.", "success");
    } else {
      Swal.fire("Error", "Failed to add comment.", "error");
    }
  };

  const handleEditClick = (comment) => {
    setSelectedComment(comment);
    setEditComment(comment.comment);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!selectedComment || !editComment.trim()) return;

    const { error } = await supabase
      .from("comments")
      .update({ comment: editComment.trim() })
      .eq("id", selectedComment.id);

    if (!error) {
      setEditModalOpen(false);
      setSelectedComment(null);
      setEditComment("");
      fetchComments();
      Swal.fire("Success", "Comment updated!", "success");
    } else {
      Swal.fire("Error", "Failed to update comment", "error");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6", // Tailwind purple-600
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (!error) {
        fetchComments();
        Swal.fire("Deleted!", "Your comment has been deleted.", "success");
      } else {
        Swal.fire("Error", "Failed to delete comment.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-10 px-4 animate-pulse">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">Course not found.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{course?.courses_name || "Detail Course"} - NextEdu</title>
        <meta
          name="description"
          content={course?.description || "Detail lengkap kursus di NextEdu"}
        />
        <meta
          property="og:title"
          content={`${course?.title || "Detail Course"} - NextEdu`}
        />
        <meta
          property="og:description"
          content={course?.description || "Detail lengkap kursus di NextEdu"}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://nextedu.example.com/course/${course?.id}`}
        />
        <meta property="og:site_name" content="NextEdu" />
        {course?.cover_image && (
          <meta property="og:image" content={course.cover_image} />
        )}
      </Helmet>
      <Header className="sticky" />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/courses")}
              className="flex items-center text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-center text-purple-700 dark:text-purple-400 flex-1">
              {course.courses_name}
            </h1>
            <div className="w-16" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {course.description}
            </p>

            {course.duration && (
              <p className="mb-2 text-sm text-purple-600 dark:text-purple-300">
                Duration: {course.duration}
              </p>
            )}
            {course.created_at && (
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                Created on: {new Date(course.created_at).toLocaleDateString()}
              </p>
            )}

            <div className="bg-purple-100 dark:bg-purple-700/20 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-2">
                Discussion
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {course.explanation || "No discussion yet for this course."}
              </p>
            </div>

            {course.youtube && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-2">
                  Learning Video
                </h3>
                <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeID(
                      course.youtube
                    )}`}
                    title="YouTube Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}

            <div className="mt-10">
              <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-2">
                Comments
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg space-y-3">
                {comments.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">
                    No comments yet.
                  </p>
                ) : (
                  comments.map((c) => (
                    <div
                      key={c.id}
                      className="text-sm text-gray-800 dark:text-gray-200 flex items-start gap-3 border-b pb-3 relative"
                    >
                      <img
                        src={c.profiles?.avatar_url}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Created on:{" "}
                          {new Date(course.created_at).toLocaleDateString()}
                        </p>
                        <p className="font-semibold text-purple-700 dark:text-purple-300">
                          {c.profiles?.username || "Anonymous"}
                        </p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          {c.comment}
                        </p>
                      </div>

                      {/* Aksi untuk admin */}
                      {role === "admin" && (
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => handleDeleteComment(c.id)}
                            title="Delete"
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )}

                      {/* Aksi untuk user yang punya komentar */}
                      {role !== "admin" && currentUser?.id === c.user_id && (
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button
                            onClick={() => handleEditClick(c)}
                            title="Edit"
                            className="text-purple-600 hover:text-purple-800 transition"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteComment(c.id)}
                            title="Delete"
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
                <form
                  onSubmit={handleCommentSubmit}
                  className="flex gap-2 mt-4"
                >
                  <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            {/* 🔥 Modal Edit */}
            {editModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-200">
                    Edit Comment
                  </h2>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                  />
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditModalOpen(false);
                        setSelectedComment(null);
                        setEditComment("");
                      }}
                      className="px-4 py-2 text-sm bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditSubmit}
                      className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;
