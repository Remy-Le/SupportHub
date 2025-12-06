async function handler({ name, description, userId }) {
  if (!name || !userId) {
    return { error: "Name and userId are required" };
  }

  try {
    const [group] = await sql`
      INSERT INTO support_groups 
        (name, description, user_id)
      VALUES
        (${name}, ${description}, ${userId})
      RETURNING *
    `;

    return { group };
  } catch (error) {
    return { error: "Failed to create group" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}