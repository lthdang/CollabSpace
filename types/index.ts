// Type exports from Prisma
export type {
    User,
    Organization,
    Meeting,
    Participant,
    Account,
    Session,
    OrgRole,
    ParticipantRole,
} from '@prisma/client';

// Custom types
export interface MeetingWithDetails {
    id: string;
    title: string;
    roomName: string;
    startTime: Date | null;
    endTime: Date | null;
    createdAt: Date;
    createdBy: {
        id: string;
        name: string | null;
        email: string;
        image: string | null;
    };
    organization: {
        id: string;
        name: string;
        slug: string;
    } | null;
    _count: {
        participants: number;
    };
}

export interface UserProfile {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    createdAt: Date;
}

export interface OrganizationWithMembers {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    _count: {
        members: number;
        meetings: number;
    };
}
