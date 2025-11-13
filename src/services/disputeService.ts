import { supabase } from '../lib/supabase';

export interface DisputeStrike {
  id: string;
  user_id: string;
  stripe_connection_id: string;
  stripe_dispute_id: string;
  charge_id: string;
  amount: number;
  currency: string;
  reason: string;
  status: 'warning_under_review' | 'warning_closed' | 'under_review' | 'charge_refunded' | 'won' | 'lost' | 'warning_needs_response';
  evidence_due_at: string | null;
  evidence_submitted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Evidence {
  id: string;
  dispute_id: string;
  user_id: string;
  evidence_type: 'generated' | 'uploaded';
  content: string | null;
  storage_path: string | null;
  file_name: string | null;
  file_size: number | null;
  mime_type: string | null;
  created_at: string;
}

export async function getDisputes(stripeConnectionId?: string) {
  let query = supabase
    .from('disputes_stripe')
    .select('*')
    .order('created_at', { ascending: false });

  if (stripeConnectionId) {
    query = query.eq('stripe_connection_id', stripeConnectionId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as DisputeStrike[];
}

export async function getDisputeById(id: string) {
  const { data, error } = await supabase
    .from('disputes_stripe')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data as DisputeStrike | null;
}

export async function getDisputeStats() {
  const { data, error } = await supabase
    .from('disputes_stripe')
    .select('status, amount');

  if (error) throw error;

  const disputes = data || [];
  const total = disputes.length;
  const won = disputes.filter((d: any) => d.status === 'won').length;
  const lost = disputes.filter((d: any) => d.status === 'lost').length;
  const pending = disputes.filter((d: any) => d.status === 'under_review').length;
  const totalAmount = disputes.reduce((sum: number, d: any) => sum + (d.amount || 0), 0);
  const recoveredAmount = disputes
    .filter((d: any) => d.status === 'won')
    .reduce((sum: number, d: any) => sum + (d.amount || 0), 0);

  return {
    total,
    won,
    lost,
    pending,
    totalAmount,
    recoveredAmount,
    winRate: total > 0 ? Math.round((won / total) * 100) : 0,
  };
}

export async function updateDisputeStatus(
  disputeId: string,
  status: DisputeStrike['status']
) {
  const { error } = await supabase
    .from('disputes_stripe')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', disputeId);

  if (error) throw error;
}

export async function submitDispute(disputeId: string) {
  const { error } = await supabase
    .from('disputes_stripe')
    .update({
      evidence_submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', disputeId);

  if (error) throw error;
}

export async function getDisputeEvidence(disputeId: string) {
  const { data, error } = await supabase
    .from('evidence')
    .select('*')
    .eq('dispute_id', disputeId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Evidence[];
}

export async function createEvidence(
  disputeId: string,
  evidenceType: 'generated' | 'uploaded',
  content?: string,
  storagePath?: string,
  fileName?: string,
  fileSize?: number,
  mimeType?: string
) {
  const { data, error } = await supabase
    .from('evidence')
    .insert({
      dispute_id: disputeId,
      evidence_type: evidenceType,
      content,
      storage_path: storagePath,
      file_name: fileName,
      file_size: fileSize,
      mime_type: mimeType,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Evidence;
}

export async function deleteEvidence(evidenceId: string) {
  const { error } = await supabase
    .from('evidence')
    .delete()
    .eq('id', evidenceId);

  if (error) throw error;
}
