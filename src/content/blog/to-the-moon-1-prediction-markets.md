# To the Moon (1) - Prediction Markets

During my internship at PXT in 2025, a senior introduced me to Polymarket. I assume most people already know what it is but for context, each market has a YES and a NO share, and the right one pays $1. So if you could ever buy both for $0.98, that's 2 cents locked in.

The market was still young, so maybe gaps like that existed. In 2026 I went to explore it properly by building a system to study the market and paper trade it. Everything below comes from paper trading and public market data.

## What I built

If gaps existed, they'd close fast. So I used Rust, a language I didn't know well, and ran it on a small server in Ireland. A collaborator helped too, with 46 of the 294 commits. It grew to 79,147 lines across 18 crates and 20 apps, with 539 tests.

![The operator dashboard on 22 May, with 11,495 raw markets filtered to 346.](/images/polyharvester/market-filter.png)

## What I found

Paper trading showed +$106 (emphasis on PAPER). The simulator treated every saved price as something I could trade at, in full, at that exact moment. A 43% depth failure rate was sitting right next to the profit, and I should have listened to it.

On 10 June I checked the real order books. Across 348 of the 354 fee-free markets, there wasn't a single gap.

![A number line showing a full set selling for about $0.99 and buying for about $1.01, on either side of the $1.00 it pays.](/images/polyharvester/book-sums.svg)

The free money had existed, about $40M in a single year by one study, but bots had competed it away. Polymarket had also rolled out taker fees on 30 March 2026, one week after I wrote my plan around fee-free markets. My notes don't mention it until June.

So I looked at the maker side, which pays no fees and earns rewards. Replaying about 1.25 million records gave +$0.71 in rewards and -$3.55 on fills, for -$2.83 overall after rounding.

One last paper test ran from 5 to 18 August and captured 11.9 million rows with 0 integrity failures. It needed three finished batches per group, got two and one, and had 0 qualifying fills. So the honest result was "incomplete". Four strategy families went in, and none cleared its bar.

On 19 August I paused the project and deleted the server and all 55 GB of raw data.

## What I'd keep

- **Freezing tests before seeing results.** When a temporary 502 invalidated two captures, I left them invalid and started a clean test instead of patching the evidence.
- **Two logging rules.** The trading journal drops records rather than slow down, while the evidence log fails completely rather than go incomplete.
- **Stopping on a rule.** I ended the last test two weeks early, knowing it would come back incomplete.

## What I'd change

![A line chart of Rust lines growing to 61,000 by the 10 June order book check, then to about 79,000 by August.](/images/polyharvester/rust-lines.svg)

- **Check the edge first.** I had 61,000 lines of Rust before the check that killed the original idea, and that check could have been a small script. Infra before alpha was my biggest mistake.
- **Measure before you choose.** Rust and Ireland were guesses about speed. My region comparison table still says TBD, and speed doesn't matter when there's nothing to race for.
- **Distrust your own simulator.** Good news from it deserves the most suspicion.
- **Watch what AI makes easy.** AI agents helped me work in Rust, but they also made building feel cheap, and the bug behind that 502 was agent-written.
- **Set limits, not alerts.** My $1 AWS budget only sent a notification, and I paid $30.89 for July :)

Now I ask the boring question first: where does the profit come from, and who's paying it?
