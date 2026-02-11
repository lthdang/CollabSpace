import * as React from "react";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AccessToken } from "livekit-server-sdk";
import MeetingRoom from "@/components/meeting/MeetingRoom";

/**
 * Meeting room page - Server component that validates access and generates token
 */
export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params as required in Next.js 15
  const { id } = await params;

  // 1. Get current authenticated user
  const session = await auth();

  if (!session || !session.user) {
    redirect("/signin?callbackUrl=/meeting/" + id);
  }

  const user = session.user;

  // 2. Fetch meeting from database
  const meeting = await prisma.meeting.findUnique({
    where: { id },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      participants: {
        select: {
          userId: true,
          role: true,
        },
      },
    },
  });

  if (!meeting) {
    notFound();
  }

  // 3. Check authorization (host or participant)
  const isHost = meeting.createdById === user.id;
  const isParticipant = meeting.participants.some((p) => p.userId === user.id);

  // For now, allow anyone authenticated to join
  // In production, you might want stricter checks
  // if (!isHost && !isParticipant) {
  //   return <UnauthorizedAccess />;
  // }

  // 4. Generate LiveKit token
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const livekitUrl = process.env.LIVEKIT_URL;

  if (!apiKey || !apiSecret || !livekitUrl) {
    throw new Error("LiveKit credentials are not configured");
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: user.id,
    name: user.name || user.email || "User",
    ttl: "2h",
  });

  at.addGrant({
    roomJoin: true,
    room: meeting.roomName,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  });

  const token = await at.toJwt();

  // 5. Pass data to client component
  return (
    <MeetingRoom
      token={token}
      serverUrl={livekitUrl}
      roomName={meeting.roomName}
      meetingTitle={meeting.title}
      meetingId={meeting.id}
      userName={user.name || user.email || "User"}
      isHost={isHost}
    />
  );
}
