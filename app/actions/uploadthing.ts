// app/actions/uploadthing.ts
"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteUTFile(fileKey: string) {
  try {
    await utapi.deleteFiles(fileKey);
    return { success: true };
  } catch (error) {
    console.error("UTAPI: Error deleting file", error);
    return { success: false };
  }
}

export async function deleteUTFiles(fileKeys: string[]) {
  try {
    await utapi.deleteFiles(fileKeys);
    return { success: true };
  } catch (error) {
    console.error("UTAPI: Error deleting files", error);
    return { success: false };
  }
}