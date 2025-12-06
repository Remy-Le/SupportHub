async function handler({ userId }) {
  if (!userId) {
    return { error: "User ID is required" };
  }

  try {
    const groups = await sql`
      SELECT 
        sg.*,
        COUNT(gm.id) as member_count
      FROM support_groups sg
      LEFT JOIN group_members gm ON sg.id = gm.group_id
      WHERE sg.user_id = ${userId}
        AND sg.is_active = true
      GROUP BY sg.id
      ORDER BY sg.created_at DESC
    `;

    return { groups };
  } catch (error) {
    return { error: "Failed to fetch groups" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}