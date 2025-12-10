import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request, {params}) {
    const {id} = await params;
    const promisePool = mysqlPool.promise();
    const [row,fields] = await promisePool.query(
        `SELECT * FROM attractions WHERE id = ?;`,
        [id]
    );
    if (row.length == 0) {
    return NextResponse.json(
      { message: `Attraction with id ${id} not found.`},
      { status: 404 }
    );
  }
  return NextResponse.json(row[0]);
}