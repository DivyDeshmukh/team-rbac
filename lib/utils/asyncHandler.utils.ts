import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type AsyncHandlerFunction = (
    req: NextRequest,
    context?: any
) => Promise<NextResponse>

export function asyncHandler(fn: AsyncHandlerFunction) {
    return async (req: NextRequest, context?: any) => {
        try {
            return await fn(req, context);
        } catch (error) {
            console.error("API Error:", error);

            // Handle custom API errors
            if (error instanceof ApiError) {
                return NextResponse.json(
                    {
                        success: false,
                        error: error.message,
                        code: error.statusCode
                    },
                    { status: error.statusCode }
                )
            }

            // Handle Zod Validation Errors
            if (error instanceof z.ZodError) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Validation failed",
                        details: error.issues.map((err) => ({
                            path: err.path.join("."),
                            message: err.message
                        }))
                    },
                    { status: 400 }
                )
            }

            // Handle Prisma Errors
            if (
                typeof error === "object" &&
                error !== null &&
                "code" in error
            ) {
                const code = (error as any).code;

                if (code === "P2002") {
                    return NextResponse.json(
                        {
                            success: false,
                            error: "A resource with this data already exists",
                            code: "DUPLICATE_ENTRY",
                        },
                        { status: 409 }
                    );
                }

                if (code === "P2025") {
                    return NextResponse.json(
                        {
                            success: false,
                            error: "Resource not found",
                            code: "NOT_FOUND",
                        },
                        { status: 404 }
                    );
                }
            }

            // Generic Error Fallback
            return NextResponse.json(
                {
                    success: false,
                    error: 
                        error instanceof Error
                            ? error.message
                            : "An unexpected error occurred"
                },
                { status: 500 }
            );
        }
    }
}
