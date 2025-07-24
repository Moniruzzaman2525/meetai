"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-view-id-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingsDialogue } from "../components/update-meeting-dialogue";
import { useState } from "react";

interface Props {
    meetingId: string
}

export const MeetingIdView = ({ meetingId }: Props) => {
    const router = useRouter()
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const [updateMeetingDialogueOpen, setUpdateMeetingDialogueOpen] = useState(false)
    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure?",
        `The following action will remove this meeting`
    )

    const { data } = useSuspenseQuery(
        trpc.meeting.getOne.queryOptions({ id: meetingId })
    )

    const removeMeeting = useMutation(
        trpc.meeting.remove.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meeting.getMany.queryOptions({}))
                router.push('/meetings')
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    )

    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove()
        if (!ok) return
        await removeMeeting.mutateAsync({ id: meetingId })
    }

    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingsDialogue open={updateMeetingDialogueOpen} onOpenChange={setUpdateMeetingDialogueOpen} initialValues={data} />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewHeader meetingId={meetingId} meetingName={data.name} onEdit={() => setUpdateMeetingDialogueOpen(true)} onRemove={handleRemoveMeeting} />
            </div>
        </>
    );
};


export const MeetingIdViewLoading = () => {
    return (
        <LoadingState title="Loading meeting..." description="This may take a few seconds" />
    )
}

export const MeetingIdViewError = () => {
    return (
        <ErrorState title="Error Loading Meeting" description="Something went wrong" />
    )
}
