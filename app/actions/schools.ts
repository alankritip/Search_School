"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { pool, ensureSchema } from "@/lib/db";
import {
  allowedImageTypes,
  MAX_IMAGE_BYTES,
  isValidContact,
  isValidEmail
} from "@/lib/validation";
import { sanitizeFilename, withUniqueSuffix } from "@/lib/utils";

type CreateSchoolResult = { ok: true; id: number } | { ok: false; error: string };

export async function createSchool(formData: FormData): Promise<CreateSchoolResult> {
  try {
    const name = String(formData.get("name") || "").trim();
    const address = String(formData.get("address") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const state = String(formData.get("state") || "").trim();
    const contact = String(formData.get("contact") || "").trim();
    const email_id = String(formData.get("email_id") || "").trim();
    const file = formData.get("image") as File | null;

    if (!name || !address || !city || !state || !contact || !email_id) {
      return { ok: false, error: "All fields are required." };
    }
    if (!isValidEmail(email_id)) return { ok: false, error: "Invalid email format." };
    if (!isValidContact(contact)) return { ok: false, error: "Invalid contact format." };
    if (!file) return { ok: false, error: "Image is required." };
    if (!allowedImageTypes.has(file.type)) return { ok: false, error: "Only JPEG/PNG/WEBP images allowed." };
    if (file.size > MAX_IMAGE_BYTES) return { ok: false, error: "Image exceeds 5MB limit." };

    const imagesDir = path.join(process.cwd(), "public", "schoolImages");
    await fs.mkdir(imagesDir, { recursive: true });

    const safeBase = sanitizeFilename(file.name || "school-image");
    const finalName = withUniqueSuffix(safeBase);
    const dest = path.join(imagesDir, finalName);

    const ab = await file.arrayBuffer();
    const buf = Buffer.from(ab);
    await fs.writeFile(dest, buf);

    const [result] = await pool.execute(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, finalName, email_id]
    );

    const insertId = (result as any).insertId ?? 0;
    revalidatePath("/showSchools");
    redirect("/showSchools");

    return { ok: true, id: insertId };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "Unexpected error." };
  }
}

export type SchoolCardRow = {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string;
};

export async function listSchools(limit = 48, offset = 0): Promise<SchoolCardRow[]> {
  const [rows] = await pool.query(
    `SELECT id, name, address, city, image
     FROM schools
     ORDER BY id DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  );
  return rows as SchoolCardRow[];
}
