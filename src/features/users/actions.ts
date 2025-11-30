"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function deleteUserAccount() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        throw new Error("Unauthorized")
    }

    try {
        await prisma.user.delete({
            where: {
                id: session.user.id,
            },
        })
    } catch (error) {
        console.error("Failed to delete user:", error)
        throw new Error("Failed to delete account")
    }

    redirect("/")
}
