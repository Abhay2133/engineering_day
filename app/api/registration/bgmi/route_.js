import { getPool } from "../../../../lib/db";

// Handler function for different HTTP methods
export async function POST(req) {
  const pool = await getPool();
  const {
    branch,
    department,
    email,
    gender,
    phone,
    player2="",
    player3="",
    player4="",
    rollno,
    semester,
    team_leader,
    team_name,
    transaction_id,
    year,
  } = await req.json();


  try {
    const result = await pool.query(
      `INSERT INTO BGMI_Registrations (
        TeamName, 
        TeamLeader, 
        Player2, 
        Player3, 
        Player4, 
        Year, 
        Semester, 
        Gender, 
        Email, 
        Phone, 
        Department, 
        Payment_Verified, 
        Transaction_ID, 
        Transaction_Amount,
        UniversityRollNo
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [
        team_name,
        team_leader,
        player2,
        player3,
        player4,
        year,
        semester,
        gender,
        email,
        phone,
        department,
        (department === "UIT" ? true : false),
        transaction_id,
        200,
        rollno
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

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const searchMap = {};
  for (let [key, value] of searchParams.entries()) {
    searchMap[key] = value;
  }
  const email = searchParams.get("email"); // Optional: fetch specific user by email

  try {
    let result;
    if (email) {
      result = await pool.query(
        "SELECT * FROM RegistrationForm WHERE EmailAddress = $1",
        [email || true]
      );
    } else {
      result = await pool.query("SELECT * FROM RegistrationForm");
    }

    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching records:", error);
    return new Response(JSON.stringify({ error: "Error fetching records" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  const pool = await getPool();
  const { EmailAddress } = await req.json();

  try {
    const result = await pool.query(
      "DELETE FROM RegistrationForm WHERE EmailAddress = $1 RETURNING *",
      [EmailAddress]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: "Record not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error deleting record:", error);
    return new Response(JSON.stringify({ error: "Error deleting record" }), {
      status: 500,
    });
  }
}
