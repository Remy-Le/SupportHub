async function handler({ groupId, name, email }) {
  if (!groupId || !name || !email) {
    return { error: "Group ID, name and email are required" };
  }

  try {
    const [existingMember] = await sql`
      SELECT id FROM group_members 
      WHERE group_id = ${groupId} 
      AND email = ${email}
      AND status = 'active'
    `;

    if (existingMember) {
      return { error: "Member already exists in this group" };
    }

    const [group] = await sql`
      SELECT id FROM support_groups 
      WHERE id = ${groupId} 
      AND is_active = true
    `;

    if (!group) {
      return { error: "Group not found or inactive" };
    }

    const [newMember] = await sql`
      INSERT INTO group_members 
        (group_id, name, email)
      VALUES 
        (${groupId}, ${name}, ${email})
      RETURNING *
    `;

    return { member: newMember };
  } catch (error) {
    return { error: "Failed to add member to group" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}