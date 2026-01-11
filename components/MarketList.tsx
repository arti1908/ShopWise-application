import Link from "next/link";

interface Market {
    name: string;
    link: string;
    desc?: string;
}

interface MarketListProps {
    markets: Market[];
}

export function MarketList({ markets }: MarketListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {markets.map((market) => (
                <Link
                    key={market.name}
                    href={market.link}
                    className="border rounded-xl p-4 hover:shadow-lg transition"
                >
                    <h3 className="font-bold text-lg">{market.name}</h3>
                    {market.desc && <p className="text-sm text-muted-foreground">{market.desc}</p>}
                </Link>
            ))}
        </div>
    );
}
