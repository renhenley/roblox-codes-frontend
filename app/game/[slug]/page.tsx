import CopyButton from "../../components/CopyButton";

async function getGame(slug: string) {
  const res = await fetch(
    `http://localhost:1337/api/games?filters[slug][$eq]=${slug}&populate=*`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.data[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await getGame(slug);

  return {
    title: game ? `${game.name} Codes (June 2026)` : "Game Not Found",
    description: game
      ? `Get the latest ${game.name} codes, rewards, and redemption instructions.`
      : "Game not found.",
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const game = await getGame(slug);

  if (!game) {
    return <div>Game not found</div>;
  }

  const activeCodes =
    game.codes?.filter(
      (code: any) => code.verificationStatus === "working"
    ) || [];

  const expiredCodes =
    game.codes?.filter(
      (code: any) => code.verificationStatus === "expired"
    ) || [];

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl font-bold">{game.name} Codes</h1>
          <p className="mt-4 text-lg">Working Roblox codes for {game.name}.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Active Codes</h2>

          <div className="space-y-3">
            {activeCodes.length > 0 ? (
              activeCodes.map((code: any) => (
                <div key={code.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-mono text-xl font-bold text-black">
                      {code.code}
                    </div>

                    <CopyButton code={code.code} />
                  </div>

                  <div className="text-gray-600 mt-2">{code.reward}</div>
                  <div className="text-green-600 text-sm">Active</div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No active codes available right now.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Expired Codes</h2>

          <div className="space-y-3">
            {expiredCodes.length > 0 ? (
              expiredCodes.map((code: any) => (
                <div key={code.id} className="border rounded-lg p-4 opacity-60">
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-mono text-xl font-bold text-black">
                      {code.code}
                    </div>

                    <CopyButton code={code.code} />
                  </div>

                  <div className="text-gray-600 mt-2">{code.reward}</div>
                  <div className="text-red-600 text-sm">Expired</div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No expired codes listed yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">
            About {game.name}
          </h2>

          <p className="text-gray-700 whitespace-pre-line">
            {game.gameDescription || "No description available."}
          </p>

          <div className="mt-4">
            <strong className="text-black">Developer:</strong>{" "}
            <span className="text-gray-700">
              {game.developer || "Unknown"}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">
            How to Redeem Codes
          </h2>

          <p className="text-gray-700 whitespace-pre-line">
            {game.howToRedeem || "Instructions not available."}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-black mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5">
            {game.faq1Question && game.faq1Answer && (
              <div>
                <h3 className="font-bold text-black">{game.faq1Question}</h3>
                <p className="text-gray-700 mt-1">{game.faq1Answer}</p>
              </div>
            )}

            {game.faq2Question && game.faq2Answer && (
              <div>
                <h3 className="font-bold text-black">{game.faq2Question}</h3>
                <p className="text-gray-700 mt-1">{game.faq2Answer}</p>
              </div>
            )}

            {game.faq3Question && game.faq3Answer && (
              <div>
                <h3 className="font-bold text-black">{game.faq3Question}</h3>
                <p className="text-gray-700 mt-1">{game.faq3Answer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}