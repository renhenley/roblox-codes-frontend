"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [games, setGames] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getGames() {
      const res = await fetch("https://roblox-codes-backend-production.up.railway.app/api/games?populate=*&pagination[pageSize]=500");
      const data = await res.json();

      setGames(data.data || []);
    }

    getGames();
  }, []);

  const featuredGames = games.filter(
    (game: any) => game.featured === true
  );

  const filteredGames = games.filter((game: any) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold">Roblox Codes</h1>

          <p className="mt-4 text-lg">
            Find working Roblox game codes updated daily.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <input
          type="text"
          placeholder="Search Roblox games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-10 p-4 rounded-xl border text-black text-lg"
        />

        {featuredGames.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-black">
              Featured Games
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {featuredGames.map((game: any) => (
                <Link
                  href={`/game/${game.slug}`}
                  key={game.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden block hover:shadow-lg transition"
                >
                  {game.thumbnail?.url ? (
  <img
    src={`https://roblox-codes-backend-production.up.railway.app${game.thumbnail.url}`}
    alt={game.name}
    className="w-full h-48 object-cover bg-gray-200"
  />
) : (
  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
    Featured Image
  </div>
)}

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-black">
                      {game.name}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      {game.codes?.filter(
                        (code: any) =>
                          code.verificationStatus === "working"
                      ).length || 0}{" "}
                      active codes
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        <h2 className="text-3xl font-bold mb-6 text-black">
          All Games
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game: any) => (
            <Link
              href={`/game/${game.slug}`}
              key={game.id}
              className="bg-white rounded-xl shadow-md overflow-hidden block hover:shadow-lg transition"
            >
              {game.thumbnail?.url ? (
  <img
    src={`https://roblox-codes-backend-production.up.railway.app${game.thumbnail.url}`}
    alt={game.name}
    className="w-full h-44 object-cover bg-gray-200"
  />
) : (
  <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-gray-500">
    Game Image
  </div>
)}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-black">
                  {game.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {game.codes?.filter(
                    (code: any) =>
                      code.verificationStatus === "working"
                  ).length || 0}{" "}
                  active codes
                </p>

                <p className="text-blue-600 font-semibold mt-4">
                  View Codes →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}