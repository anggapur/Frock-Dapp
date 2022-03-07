import { supabase } from '../supabaseClient';

export async function handler(event, _) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const {
      detailDividendDistributions,
      sumRewardAmountTradeDividends,
      sumRewardAmountTreasuryDividends,
    } = await getRewardDistributions();
    const nodesGenerated = await getNodesGenerated();

    return {
      statusCode: 200,
      body: JSON.stringify({
        nodes_generated: nodesGenerated,
        summed_reward_amount_trade_dividends: {
          amount: sumRewardAmountTradeDividends,
          unit: 'FTM',
        },
        summed_reward_amount_treasury_dividends: {
          amount: sumRewardAmountTreasuryDividends,
          unit: 'FTM',
        },
        detailed_dividend_distributions: detailDividendDistributions,
      }),
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}

async function getNodesGenerated() {
  const { data, error } = await supabase
    .from('frock_ecosystem_data')
    .select('value')
    .eq('key', 'NODES_GENERATED');
  if (error) {
    throw new Error(error.message);
  }

  return data[0].value;
}

async function getRewardDistributions() {
  const { data, error } = await supabase
    .from('reward_distributions')
    .select('reward_amount, reward_source, issued_at, current_reward_id')
    .order('id', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }

  let sumRewardAmountTradeDividends = 0;
  let sumRewardAmountTreasuryDividends = 0;

  const detailDividendDistributions = data.map(row => {
    if (row.reward_source === 0) {
      sumRewardAmountTradeDividends += Number(row.reward_amount);
    } else {
      sumRewardAmountTreasuryDividends += Number(row.reward_amount);
    }

    return {
      reward_amount: Number(row.reward_amount),
      reward_unit: 'FTM',
      issued_at: row.issued_at,
      reward_source:
        row.reward_source === 1 ? 'treasury dividends' : 'trade dividends',
      current_reward_id: row.current_reward_id,
    };
  });

  return {
    detailDividendDistributions,
    sumRewardAmountTradeDividends,
    sumRewardAmountTreasuryDividends,
  };
}
