"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewMeetingsDialogue } from "./new-meetings-dialogue";
import { useState } from "react";

export const MeetingsListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <NewMeetingsDialogue open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <div className="py-4 px-4 md:px-12 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Meetings</h5>
                    <Button onClick={() => setIsDialogOpen(true)}><PlusIcon /> New Meeting</Button>
                </div>
                <div className="flex items-center gap-x-2 p-1">
                    TODO Filters;
                </div>
            </div>
        </>
    );
};

