import { supabaseBrowser } from "@/lib/supabase-browser";
import { v4 as uuidv4 } from "uuid";

export async function uploadImage(file, bucket) {
  if (!file || !file.name) return null;

  const fileName = file.name.split(".").pop();
  const uniqueFileName = `${uuidv4()}.${fileName}`;

  const { data, error } = await supabaseBrowser.storage
    .from(bucket)
    .upload(uniqueFileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data: publicUrl } = supabaseBrowser.storage
    .from(bucket)
    .getPublicUrl(uniqueFileName);

  return {
    url: publicUrl.publicUrl,
    path: uniqueFileName,
  };
}
