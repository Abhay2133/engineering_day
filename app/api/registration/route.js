// app/api/registration/route.js
import { NextResponse } from "next/server";
import {
  addEvent,
  addTransaction,
  countEvents,
  ErrorResponse,
  getEvents,
  getPool,
  hasRecord,
} from "../../../lib/db";

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
    // Check if the user already has a record in the database
    const recordExists = await hasRecord(pool, rollno);
    if (recordExists) {
      // couting number of events registered in
      let [ge_error, events] = await getEvents(pool, rollno);
      if (ge_error)
        return NextResponse.json({ type: "error", message: ge_error.message });

      const eventCount = events.length;
      if (eventCount >= 2) {
        return NextResponse.json({
          type: "error",
          message: "Already in two events",
        });
      }

      console.log({events})
      if (Array.isArray(events) && events.includes(event))
        return Response.json({
          type: "error",
          message: `Already Registered in '${event}'`,
        });
      
      // adding transition id with error checking
      let t_error = await addTransaction(pool, {
        transaction_id,
        rollno,
        event,
        amount: transition_amount,
        verified: department === "UIT",
      });
      if(t_error) return ErrorResponse(t_error);
      
      // adding event to list
      let e_error = await addEvent(pool, rollno, event);
      if(e_error) return ErrorResponse(e_error);
      return Response.json({ type: "success", message: "New Event Added" });
    }

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
      Gender, 
      Semester

    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        rollno,
        email,

        firstname,
        lastname,
        branch,

        department,
        year,
        phone,

        [event],
        gender,
        semester,
      ]
    );
    await addTransaction(pool, {
      transaction_id,
      rollno,
      event,
      amount: transition_amount,
      verified: department === "UIT",
    });

    return NextResponse.json({ type: "success" });
  } catch (error) {
    console.error("Error creating record:", error);
    return NextResponse.json({ type: "error", message: error.message });
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
