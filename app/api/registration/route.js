// app/api/registration/route.js
import { getPool } from "../../../lib/db";

// Handler function for different HTTP methods
export async function POST(req) {
  const pool = await getPool();
  const {
    branch,
    department,
    email,
    event,
    firstname,
    gender,
    lastname,
    phone,
    rollno,
    semester,
    transaction_id,
    transition_amount,
    year,
  } = await req.json();


  try {
    const result = await pool.query(
      `INSERT INTO RegistrationForm 
    ( 
      UniversityRollNo,
      EmailAddress,
      FirstName,
      LastName,
      Branch,
      Department,
      Year,
      PhoneNumber,
      SelectedEvents,
      Payment_Verified,
      Transaction_ID,
      Transaction_Amount,
      Gender,
      Semester
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [
        rollno,
        email,
        firstname,
        lastname,
        branch,
        department,
        year,
        phone,
        event,
        (department == "UIT" ? true : false),
        transaction_id,
        transition_amount,
        gender, 
        semester
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
      { status: 204  }
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
