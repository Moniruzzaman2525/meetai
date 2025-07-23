import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingFrom } from "./meeting-form";
import { useRouter } from "next/navigation";
interface NewMeetingsDialogueProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NewMeetingsDialogue = ({ open, onOpenChange }: NewMeetingsDialogueProps) => {
    const router = useRouter()
    return (
        <div>
            <ResponsiveDialog open={open} onOpenChange={onOpenChange} title="New Meeting" description="Create a new meeting">
                {/* <AgentFrom onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} /> */}
                <MeetingFrom onSuccess={(id) => {
                    onOpenChange(false)
                    router.push(`/meetings/${id}`)
                }}
                    onCancel={() => onOpenChange(false)}
                />
            </ResponsiveDialog>
        </div>
    );
};

