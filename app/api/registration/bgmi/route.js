// app/api/registration/route.js
import { getPool } from "../../../../lib/db";

// Handler function for different HTTP methods
export async function POST(req) {
  const pool = await getPool();
  const {
    email,
    department,
    gender,
    phone,
    branch,
    player2,
    player3,
    semester,
    team_leader,
    team_name,
    transaction_id,
    year,
  }   = await req.json();

  try {
    const result = await pool.query(
      "INSERT INTO RegistrationForm (EmailAddress, UniversityRollNo, FirstName, LastName, Branch, Department, Year, PhoneNumber, SelectedEvents) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        email,
        UniversityRollNo,
        FirstName,
        LastName,
        Branch,
        Department,
        Year,
        PhoneNumber,
        SelectedEvents,
      ]
    );
    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error("Error creating record:", error);
    return new Response(
      JSON.stringify({
        code: error.code,
        details: error.details,
        message: error.message,
      }),
      { status: 409 }
    );
  }
}