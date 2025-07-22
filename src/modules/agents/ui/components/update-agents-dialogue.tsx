import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentFrom } from "./agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentsDialogueProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne
}

export const UpdateAgentsDialogue = ({ open, onOpenChange, initialValues }: UpdateAgentsDialogueProps) => {
    return (
        <div>
            <ResponsiveDialog open={open} onOpenChange={onOpenChange} title="Edit Agent" description="Edit the agent details">
                <AgentFrom onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} initialValues={initialValues} />
            </ResponsiveDialog>
        </div>
    );
};

