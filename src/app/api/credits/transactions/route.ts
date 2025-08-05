import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    // Get user's credit transactions
    const { data: transactions, error } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching transactions:', error);
      return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }

    // Format transactions for display
    const formattedTransactions = transactions.map(transaction => ({
      ...transaction,
      amount_display: transaction.amount > 0 
        ? `+${transaction.amount}` 
        : transaction.amount.toString(),
      type_display: {
        purchase: 'Köp',
        usage: 'Användning',
        refund: 'Återbetalning',
        bonus: 'Bonus'
      }[transaction.type] || transaction.type,
      created_at_display: new Date(transaction.created_at).toLocaleString('sv-SE')
    }));

    return NextResponse.json({ 
      transactions: formattedTransactions,
      total: transactions.length,
      limit,
      offset
    });

  } catch (error) {
    console.error('Error in credits/transactions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}