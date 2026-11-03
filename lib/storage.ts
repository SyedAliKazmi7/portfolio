import { supabase } from "./supabase";
import { compressImage } from "./compress";

const BUCKET = "portfolio";

export async function uploadImage(file: File): Promise<string> {
  const blob = await compressImage(file);
  const path = `projects/${crypto.randomUUID()}.jpg`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, { contentType: "image/jpeg", cacheControl: "31536000" });
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

function pathFromUrl(url: string) {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const i = url.indexOf(marker);
  return i === -1 ? null : decodeURIComponent(url.slice(i + marker.length));
}

// Deletes files from storage. Local images (like /projects/x.png) are ignored.
export async function deleteImages(urls: string[]) {
  const paths = urls.map(pathFromUrl).filter((p): p is string => !!p);
  if (paths.length > 0) await supabase.storage.from(BUCKET).remove(paths);
}