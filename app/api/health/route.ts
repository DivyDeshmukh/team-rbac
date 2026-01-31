import { asyncHandler } from "@/lib/utils/asyncHandler.utils";
import { prisma } from "../../../lib/db/client"
import { NextResponse } from "next/server";

export const GET = asyncHandler(async () => {
    console.log("Testing Database connection...");
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
        success: true,
        message: "Database connected successfully",
        result
    });
});