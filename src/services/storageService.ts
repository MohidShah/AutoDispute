import { supabase } from '../lib/supabase';

const BUCKET_NAME = 'dispute-evidence';

export async function uploadEvidenceFile(
  file: File,
  disputeId: string
): Promise<{ path: string; filename: string }> {
  const fileName = `${disputeId}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  return {
    path: fileName,
    filename: file.name,
  };
}

export async function deleteEvidenceFile(filePath: string): Promise<void> {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) throw error;
}

export function getEvidenceFileUrl(filePath: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function downloadEvidenceFile(filePath: string): Promise<Blob> {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .download(filePath);

  if (error) throw error;
  return data;
}

export async function initializeStorageBucket(): Promise<void> {
  const { data: buckets } = await supabase.storage.listBuckets();

  const bucketExists = buckets?.some((b) => b.name === BUCKET_NAME);

  if (!bucketExists) {
    await supabase.storage.createBucket(BUCKET_NAME, {
      public: false,
    });
  }
}
