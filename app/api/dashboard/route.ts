export async function GET() {
  return Response.json({
    muscleActivation: "Your weekly heatmap is ready.",
    workoutHistory: "You completed 4 sessions this week.",
    aiRecommendations: "Increase posterior chain volume by 12%.",
  });
}
