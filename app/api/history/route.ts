export async function GET() {
  return Response.json({
    sessions: [
      { date: "2026-08-12", muscleGroup: "Chest", volume: 5400 },
      { date: "2026-08-13", muscleGroup: "Back", volume: 6200 },
      { date: "2026-08-14", muscleGroup: "Legs", volume: 8800 },
    ],
  });
}
