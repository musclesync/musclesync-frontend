export async function GET() {
  return Response.json({
    muscleActivation: "Chest, Shoulders, Triceps",
    workoutHistory: "You completed 5 workouts this week.",
    aiRecommendations: "Increase your protein intake and add 2 cardio sessions.",
  });
}
