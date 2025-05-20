import { create } from "zustand";
import { supabase } from "../SupaClient";

export const useAuth = create((set, get) => ({
  user: null,
  auth: false,
  id: "",
  full_name: "",
  username: "", // 🔥 tambahkan username
  role: "",
  email: "",
  avatar_url: "",
  loading: true,

  register: async (full_name, username, telephone, email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.log("Something Wrong" + error.message);
    } else {
      const { error: profRegis } = await supabase.from("profiles").upsert([
        {
          id: data.user.id,
          full_name,
          username,
          telephone,
          email,
          role: "user",
        },
      ]);

      if (profRegis) {
        console.log("Something Wrong when Update User");
      } else {
        set({
          user: data.user,
          auth: true,
          full_name,
          email,
          username,
          telephone,
          loading: false,
        });

        console.log("User has been added");
      }
    }
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Login Failed:", error.message);
      throw new Error(error.message); // ⬅️ INI YANG PENTING
    }

    // Jika login berhasil
    set({
      user: data.user,
      auth: true,
    });

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (profileData) {
      set({
        full_name: profileData.full_name,
        email: profileData.email,
        username: profileData.username,
        avatar_url: profileData.avatar_url,
        role: profileData.role || "",
      });
    }

    console.log("Login Success");
    console.log("User role:", profileData.role);
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error.message);
      return;
    }

    localStorage.removeItem("shownWelcome");

    set({
      user: null,
      auth: false,
      full_name: "",
      email: "",
      username: "",
      role: "",
      avatar_url: "",
    });
  },

  fetchUser: async () => {
    set({ loading: true });

    const { data } = await supabase.auth.getUser();
    const { user: currentUser } = data;

    if (currentUser) {
      set({ user: currentUser, auth: true });

      const { data: userData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (userData) {
        set({
          full_name: userData.full_name,
          username: userData.username,
          email: userData.email,
          avatar_url: userData.avatar_url,
          role: userData.role || "guest",
          loading: false,
        });
      }
    } else {
      set({ loading: false });
    }
  },

  fetchUserData: async (userId) => {
    try {
      const { data: userData } = await supabase
        .from("profiles")
        .select("full_name, email, avatar_url, role")
        .eq("id", userId)
        .single();

      if (userData) {
        set({
          id: userId,
          full_name: userData.full_name,
          email: userData.email,
          avatar_url: userData.avatar_url,
          loading: false,
        });
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
      set({ loading: false });
    }
  },
}));
