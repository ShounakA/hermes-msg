
import { createClient } from "@libsql/client";
import type { Topic } from "~/models/types";
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config()

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});


export async function getTopics(): Promise<Topic[]> {
    const result = await turso.execute("SELECT * FROM topics");
    const topics: Topic[] = result.rows.map(row => ({
        id: row[0] as number,
        name: row[1] as string,
        size: row[2] as number,
        endpoint: row[3] as string,
        schema: row[4] as string,
      }));
    
    return topics;
}

export async function getTopic(id: number): Promise<Topic> {
    const result = await turso.execute({
        sql: "SELECT * FROM topics WHERE id = ?", 
        args: [id]
    })

    const topicRow = result.toJSON().rows[0];
    return {
        id: topicRow[0] as number,
        name: topicRow[1] as string,
        size: topicRow[2] as number,
        endpoint: topicRow[3] as string,
        schema: topicRow[4] as string,
    } satisfies Topic
}

export async function insertTopic(name: string, schema: string): Promise<Topic> {
    const query = `
        INSERT INTO topics (name, endpoint, schema, size) 
        VALUES (?, ?, ?, 0) RETURNING id;
    `;
    const endpoint = uuidv4()
    const result = await turso.execute({ 
        sql: query, 
        args: [name, endpoint, schema]}
    )
    const returnedRow = result.toJSON().rows[0]
    return {
        id: returnedRow[0],
        name,
        endpoint,
        schema,
        size: 0
    }
}

export async function deleteTopic(id: number) {
    const query = `
        DELETE FROM topics
        WHERE id = ?;
    `;
    await turso.execute({ 
        sql: query, 
        args: [id]}
    )
}