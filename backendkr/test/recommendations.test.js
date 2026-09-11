const test = require("node:test");
const assert = require("node:assert/strict");
const { buildPlan } = require("../src/recommendations");

test("allocates more time to subjects with larger score gaps", () => {
  const plan = buildPlan([
    { subject_id: "a", subject: "Math", target_score: 90, average_score: 50, assessment_count: 2 },
    { subject_id: "b", subject: "Art", target_score: 80, average_score: 75, assessment_count: 2 },
  ], 10);
  assert.equal(plan.length, 2);
  assert.ok(plan[0].hours > plan[1].hours);
  assert.equal(plan[0].reason, "Your current average is 50%, 40% below target.");
});
