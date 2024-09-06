import { NextResponse } from "next/server";
import { addEvent, addTransaction, ErrorResponse, getEvents, getPool, hasRecord, insertRegistration, SuccessResponse } from "../../../../lib/db";

// Handler function for different HTTP methods
export async function POST(req) {
  const pool = await getPool();
  const {
    branch,
    department,
    email,
    // events,
    firstname,
    gender,
    lastname,
    phone,
    rollno,
    semester,
    year,
  } = await req.json();


  let event = "Engineers' Got Talent"
  try {
    // Check if the user already has a record in the database
    const recordExists = await hasRecord(pool, rollno);
    if (recordExists) {
      // couting number of events registered in
      let [ge_error, events] = await getEvents(pool, rollno);
      if (ge_error)
        return ErrorResponse(ge_error);

      const eventCount = events.length;
      if (eventCount >= 2) {
        return NextResponse.json({
          type: "error",
          message: "Already in two events : " + events.join(" and "),
        });
      }

      console.log({ events });
      if (Array.isArray(events) && events.includes(event))
        return NextResponse.json({
          type: "error",
          message: `Already Registered in '${event}'`,
        });

      // adding transition id with error checking
      if (department !== "UIT") {
        let t_error = await addTransaction(pool, {
          transaction_id,
          rollno,
          event,
          amount: 200,
          verified: department === "UIT",
        });
        if (t_error) return ErrorResponse(t_error);
      }

      // adding event to selectedEvent
      let e_error = await addEvent(pool, rollno, event);
      if (e_error) return ErrorResponse(e_error);
      return SuccessResponse(event+" registration done")
    }

    // create new entry

    let r_error = await insertRegistration(pool, {
      rollno,
      email,

      firstname,//: team_leader,
      lastname,
      branch,

      department,
      year : parseInt(year),
      phone,

      event: [event],
      gender,
      semester:parseInt(semester),
    });
    if (r_error) return ErrorResponse(r_error);

    // insert new transaction;
    if (department !== "UIT") {
      let it_error = await addTransaction(pool, {
        transaction_id,
        rollno,
        event,
        amount: 200,
        verified: department === "UIT",
      });
      if (it_error) return ErrorResponse(it_error);
    }
    return SuccessResponse("Entry Added");
  } catch (e) {
    console.error("Error creating record:", e);
    return ErrorResponse(e)
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
