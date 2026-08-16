export async function GET() {
  return Response.json({
    muscles: {
      chest: 0.82,
      back: 0.64,
      quads: 0.91,
      hamstrings: 0.55,
      shoulders: 0.73,
      biceps: 0.48,
      triceps: 0.62,
    },
  });
}
