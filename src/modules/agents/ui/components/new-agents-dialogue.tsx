import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentFrom } from "./agent-form";

interface NewAgentsDialogueProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NewAgentsDialogue = ({ open, onOpenChange }: NewAgentsDialogueProps) => {
    return (
        <div>
            <ResponsiveDialog open={open} onOpenChange={onOpenChange} title="New Agent" description="Create a new agent">
                <AgentFrom onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} />
            </ResponsiveDialog>
        </div>
    );
};

