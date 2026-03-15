export async function GET() {
  const res = await fetch("https://newsdata.io/api/1/latest?apikey=pub_c3ad0282a48b43d79ffb6940c7d4aa3f", {
    cache: "no-store",
  });

  if (!res.ok) {
    return Response.json({ status: "error" }, { status: 500 });
  }

  const data = await res.json();
  return Response.json(data);
}
