export async function GET() {
  return Response.json({
    recommendations: [
      "Posterior chain volume is low → Add Romanian deadlifts.",
      "Push volume is high → Switch to pull day.",
      "Hamstring recovery at 62% → Avoid heavy loading.",
      "Shoulder stability needs work → Add face pulls.",
    ],
  });
}
