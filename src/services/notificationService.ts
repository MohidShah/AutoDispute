import { supabase } from '../lib/supabase';

export interface Notification {
  id: string;
  user_id: string;
  type: 'dispute_created' | 'dispute_updated' | 'evidence_generated' | 'submission_required';
  title: string;
  message: string;
  dispute_id: string | null;
  is_read: boolean;
  sent_at: string;
  created_at: string;
}

export async function getNotifications(limit = 50) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Notification[];
}

export async function getUnreadNotificationCount() {
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false);

  if (error) throw error;
  return count || 0;
}

export async function createNotification(
  type: Notification['type'],
  title: string,
  message: string,
  disputeId?: string
) {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      type,
      title,
      message,
      dispute_id: disputeId || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Notification;
}

export async function markNotificationAsRead(notificationId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) throw error;
}

export async function markAllNotificationsAsRead() {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('is_read', false);

  if (error) throw error;
}

export async function deleteNotification(notificationId: string) {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId);

  if (error) throw error;
}
