import { CallingState, StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { CallLobby } from "./call-loby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface Props {
    meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
    const call = useCall()
    const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby")
    const handleJoin = async () => {
        if (!call) return

        await call.join()
        setShow("call")
    }

    const handleLeave = async () => {
        if (!call) return;

        const state = call.state.callingState;
        if (state === CallingState.LEFT || state === CallingState.IDLE) {
            setShow("ended");
            return;
        }

        try {
            await call.leave();
        } catch (e) {
            console.debug(e);
        } finally {
            setShow("ended");
        }
    };
    return (
        <StreamTheme className="h-full">
            {show === "lobby" && <CallLobby onJoin={handleJoin} />}
            {show === "call" && <CallActive onLeave={handleLeave} meetingName={meetingName} />}
            {show === "ended" && <CallEnded />}
        </StreamTheme>
    );
};

