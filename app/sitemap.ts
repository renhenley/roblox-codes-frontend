export default async function sitemap() {
  const res = await fetch("http://localhost:1337/api/games?populate=*", {
    cache: "no-store",
  });

  const data = await res.json();

  const games = data.data || [];

  return games.map((game: any) => ({
    url: `http://localhost:3000/game/${game.slug}`,
    lastModified: new Date(),
  }));
}