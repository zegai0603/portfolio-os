# To the Moon (2) - Equities

Polyharvester ended with no edge, but I still wanted to know whether a retail trader can beat just holding SPY. So I moved to US stocks, where the data is free and public.

Contextual reads SEC data and daily prices for about 1,400 US companies, then tests strategies on Alpaca's paper accounts. No real money was involved, and none of this is investment advice.

## What I built & Why

Retail traders can never beat collective intelligence in the form of SPY. 

So I built Contextual to challenge that :P Without an information or technological edge, can I still earn more than SPY? In theory, I just have to beat the retail traders who trade slower than me, or predict price moves before big institutions come in and ride the wave. Contextual is still unfinished, so this is where it stands today.

The idea is simple: Read company filings and try to predict their price movements in the next 5 years. This is done as an attempt to replace my existing discretionary trading strategy (vibes-based). In my previous attempt in polymarket, I went too soon into infra before evaluating the edge. This time round, I decided to conduct extensive backtesting before proceeding to forward testing. There are a few rules set in place.

The rule I cared about most was only using what was known at the time. Every fact carries its filing date, so a 2021 test can't see a number filed in 2022. The leak check found 0 leaks.

The other rule was to skip a company when an input is missing. A wrong valuation is worse than none and so I spent much of October fixing what real filings broke.

## Strategy 1: reverse DCF

A normal valuation guesses future growth and works out a price. A reverse DCF starts from today's price and asks what growth the market must be assuming. I used a fixed 10% discount rate and solved for five years of cash flow growth.

Take UPBD on 24 October. At $17.08, with about $229M of yearly owner cash flow, the price implied cash flow shrinking 3.2% a year. My base case was 2% growth, so on paper it looked cheap.

![A number line with 3.2% yearly shrinkage priced in and a 2% growth base case.](/images/contextual/implied-growth.svg)

The bigger the gap, the higher the score. I tested it on 93 month-ends from 2019 to 2026 across 1,404 companies:

![Backtest bars: 269 trades from 2019 averaged +12.5% over benchmark with a 56.9% worst drop, while 82 trades from 2024 averaged -0.8%.](/images/contextual/reverse-dcf-backtest.svg)

+12.5% looks great until you read the rest. The worst drop was 56.9% against my 25% limit, and the edge disappears from 2024 onward. The company list is also today's survivors, so the old years are flattered. It failed its gate.

The live screen was just as humbling. On 24 October, 1,409 companies were eligible and only 2 scored 60 or more:

![A funnel from 1,409 eligible companies to 521 valued, 8 scoring 50 or more and 2 scoring 60 or more.](/images/contextual/screen-funnel.svg)

The paper account made 7 trades on this path, with one still open. They averaged -2.1%, or -1.8% against SPY, with a median of -8.2% against SPY. The total was -$52 on small positions. Both clear winners came from August approvals that today's stricter checks would refuse, and so did most of the losers.

The scariest number was CRI. Its base value was $100.18 in August and $42.50 by late October. If the valuation can halve in two months, the "cheap" label needs more suspicion than I gave it.

## Strategy 2: company events

This one read filings for news like raised guidance, restructuring, buybacks, refinancing and deals. A separate scan looked for possible payouts that aren't on the balance sheet.

It made 1 trade in the whole run: YELP, up 3.9% when marked on 26 October. The payout scan had no automatic route to a trade, yet revisited about 4,000 companies each round. One trade says nothing either way, and I removed both paths by 27 October.

## Strategy 3: post-earnings drift

Stocks that jump on good earnings tend to keep drifting up for a while, because the market takes time to adjust. It's one of the oldest effects in finance.

My rules were to buy the next open after a top 30% earnings reaction with unusually high volume, hold for 40 sessions, use a volatility stop, and sell before the next report. I tried 81 settings on 2018 to 2024 data, froze the best, and tested it once on the last two years.

![Line chart of the test: profit reached +32% and +20% over sector ETFs, with the kill rule tripping on 13 March 2025.](/images/contextual/drift-test.svg)

Across 151 trades it beat its sector ETF by 2.21% on average, with a lower bound of +0.33%. Buying every positive reaction gave -0.36%, so the filter did add something.

But the median trade was about flat and only 50.3% won, so a few big winners did the work. The drawdown hit 24% of invested capital, my limit was 10%, and the kill rule tripped on 13 March 2025. The study's decision was stop.

Then I overruled it. I raised the drawdown limits to 25% and 30% and put it on paper anyway. That's moving the goalposts, so the backtest no longer counts as evidence. Those two years are spent too, and only forward paper results count now.

The paper version buys plainly while SPY is above its 200-day average, and pairs each buy with a sector ETF short below it. It started on 21 October. By 30 October the account was up 5.7% while SPY fell 1.7%, with 10 open positions and 0 closed trades.

That's eight sessions, so it's not a result. It needs 40 closed trades before the gate even looks at it.

## What I'd keep

- **Freezing rules before the test.** The frozen result stays on record, which is why my override is so easy to see.
- **Skipping over guessing.** Most of the funnel above is the system saying "I don't know".
- **Letting paper decide.** A backtest can't tell you what fills, data gaps and your own bugs will do.

## What I'd change

- **Fix survivorship first.** Every backtest here uses today's companies, so none of them is clean.
- **Test the checks too.** My text search for claims flagged money owed to a company as money it owed. A strict gate can be strict for the wrong reasons.
- **Write down why you break a rule.** Overruling the stop may be fine, but the override is the part to distrust.

So right now the drift account is beating SPY on paper but no trades are closed yet. In the next 40 closed trades we shall see if I could reach the moon.
