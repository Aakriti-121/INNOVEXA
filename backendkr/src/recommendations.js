function buildPlan(subjects, availableHours) {
  const hours = Number(availableHours);
  if (!Number.isFinite(hours) || hours <= 0 || hours > 168) throw new Error("availableHours must be between 0 and 168");
  const ranked = subjects.map((subject) => {
    const gap = Math.max(0, subject.target_score - subject.average_score);
    const confidence = subject.assessment_count ? subject.average_score : 0;
    const priority = Math.max(1, gap + (100 - confidence) * 0.25);
    return { ...subject, gap: Math.round(gap * 10) / 10, priority };
  });
  const total = ranked.reduce((sum, subject) => sum + subject.priority, 0) || 1;
  return ranked
    .sort((a, b) => b.priority - a.priority)
    .map((subject) => ({
      subject_id: subject.subject_id,
      subject: subject.subject,
      hours: Math.max(0.5, Math.round((hours * subject.priority / total) * 2) / 2),
      average_score: subject.average_score,
      target_score: subject.target_score,
      reason: subject.assessment_count === 0
        ? "No assessment data yet: start with a diagnostic quiz."
        : `Your current average is ${subject.average_score}%, ${subject.gap}% below target.`,
      activities: ["Review weak concepts", "Practice timed questions", "Take a short self-test"],
    }));
}

module.exports = { buildPlan };
