import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingFrom } from "./meeting-form";
import { MeetingGetOne } from "../../types";
interface UpdateMeetingsDialogueProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: MeetingGetOne
}

export const UpdateMeetingsDialogue = ({ open, onOpenChange, initialValues }: UpdateMeetingsDialogueProps) => {
    return (
        <div>
            <ResponsiveDialog open={open} onOpenChange={onOpenChange} title="Edit Meeting" description="Edit the meeting">
                <MeetingFrom onSuccess={() => onOpenChange(false)}
                    onCancel={() => onOpenChange(false)}
                    initialValues={initialValues}
                />
            </ResponsiveDialog>
        </div>
    );
};

