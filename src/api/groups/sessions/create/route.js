async function handler({
  groupId,
  title,
  scheduledFor,
  durationMinutes,
  meetingLink,
}) {
  if (!groupId || !title || !scheduledFor || !durationMinutes) {
    return {
      error: "Group ID, title, scheduled date/time and duration are required",
    };
  }

  try {
    const [group] = await sql`
      SELECT id FROM support_groups 
      WHERE id = ${groupId} 
      AND is_active = true
    `;

    if (!group) {
      return { error: "Group not found or inactive" };
    }

    const [session] = await sql`
      INSERT INTO group_sessions 
        (group_id, title, scheduled_for, duration_minutes, meeting_link)
      VALUES 
        (${groupId}, ${title}, ${scheduledFor}, ${durationMinutes}, ${meetingLink})
      RETURNING *
    `;

    return { session };
  } catch (error) {
    return { error: "Failed to create session" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}