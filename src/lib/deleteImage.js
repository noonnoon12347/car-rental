import { supabaseBrowser } from "./supabase-browser";

export async function deleteImage(path, bucket) {
  if (!path) return;

  const { error } = await supabaseBrowser.storage.from(bucket).remove([path]);

  if (error) throw new Error(error.message);
}
