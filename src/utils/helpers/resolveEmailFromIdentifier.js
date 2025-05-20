import { supabase } from "../SupaClient"; // Sesuaikan path dengan proyekmu

export const resolveEmailFromIdentifier = async (identifier) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("email")
    .or(
      `email.eq.${identifier},username.eq.${identifier},telephone.eq.${identifier}`
    )
    .single();

  if (error || !data) {
    throw new Error("User not found with provided identifier");
  }

  return data.email;
};
