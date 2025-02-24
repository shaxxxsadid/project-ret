



export async function GET() {
  const response = await fetch('https://picsum.photos/v2/list?page=2&limit=5', {
    cache: 'no-cache',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return Response.json(response);
}