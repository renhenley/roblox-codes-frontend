export default async function sitemap() {
  const res = await fetch("https://roblox-codes-backend-production.up.railway.app/api/games?populate=*&pagination[pageSize]=500", {
    cache: "no-store",
  });

  const data = await res.json();

  const games = data.data || [];

  return games.map((game: any) => ({
    url: `http://localhost:3000/game/${game.slug}`,
    lastModified: new Date(),
  }));
}