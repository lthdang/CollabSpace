"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AccessToken } from "livekit-server-sdk";
import { randomBytes } from "crypto";

/**
 * Result type for meeting creation
 */
type CreateMeetingResult =
  | {
      success: true;
      meetingId: string;
      roomName: string;
      token: string;
      redirectUrl: string;
    }
  | {
      success: false;
      error: string;
    };

/**
 * Create a new video meeting room
 *
 * @param input - Object containing optional meeting title
 * @returns CreateMeetingResult with meeting details and LiveKit token or error
 */
export async function createMeeting(input?: {
  title?: string;
  organizationId?: string;
}): Promise<CreateMeetingResult> {
  try {
    // 1. Get current authenticated user
    const session = await auth();
    console.log("Authenticated session:", session);
    if (!session || !session.user) {
      return {
        success: false,
        error: "You must be authenticated to create a meeting",
      };
    }

    const user = session.user;

    // 2. Generate unique room name
    const randomChars = randomBytes(4).toString("hex"); // generates 8 character hex string
    const roomName = `collab-${user.id.substring(0, 8)}-${randomChars}`;

    // 3. Create meeting record in database
    const meeting = await prisma.meeting.create({
      data: {
        title: input?.title || `Meeting Room`,
        roomName,
        createdById: user.id,
        organizationId: input?.organizationId || null,
      },
    });

    // 4. Generate LiveKit participant token
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      // Clean up created meeting if token generation fails
      await prisma.meeting.delete({ where: { id: meeting.id } });

      return {
        success: false,
        error: "LiveKit credentials are not configured",
      };
    }

    const at = new AccessToken(apiKey, apiSecret, {
      identity: user.id,
      name: user.name || user.email || "User",
      ttl: "2h", // Token valid for 2 hours
    });

    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const token = await at.toJwt();

    // Return success with meeting details
    return {
      success: true,
      meetingId: meeting.id,
      roomName: meeting.roomName,
      token,
      redirectUrl: `/meeting/${meeting.id}`,
    };
  } catch (error) {
    console.error("Error creating meeting:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create meeting",
    };
  }
}

/**
 * Result type for getting meeting token
 */
type GetMeetingTokenResult =
  | {
      success: true;
      token: string;
      roomName: string;
      meetingTitle: string;
    }
  | {
      success: false;
      error: string;
    };

/**
 * Get a LiveKit token for joining an existing meeting
 *
 * @param meetingId - The ID of the meeting to join
 * @returns GetMeetingTokenResult with token or error
 */
export async function getMeetingToken(
  meetingId: string,
): Promise<GetMeetingTokenResult> {
  try {
    // 1. Get current authenticated user
    const session = await auth();

    if (!session || !session.user) {
      return {
        success: false,
        error: "You must be authenticated to join a meeting",
      };
    }

    const user = session.user;

    // 2. Get meeting from database
    const meeting = await prisma.meeting.findUnique({
      where: { id: meetingId },
      select: {
        id: true,
        title: true,
        roomName: true,
        createdById: true,
      },
    });

    if (!meeting) {
      return {
        success: false,
        error: "Meeting not found",
      };
    }

    // 3. Generate LiveKit participant token
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return {
        success: false,
        error: "LiveKit credentials are not configured",
      };
    }

    const at = new AccessToken(apiKey, apiSecret, {
      identity: user.id,
      name: user.name || user.email || "User",
      ttl: "2h", // Token valid for 2 hours
    });

    at.addGrant({
      roomJoin: true,
      room: meeting.roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const token = await at.toJwt();

    return {
      success: true,
      token,
      roomName: meeting.roomName,
      meetingTitle: meeting.title,
    };
  } catch (error) {
    console.error("Error getting meeting token:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get token",
    };
  }
}
