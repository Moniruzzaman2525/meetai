import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { meetingsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MeetingGetOne } from "@/modules/meetings/types";
import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { NewAgentsDialogue } from "@/modules/agents/ui/components/new-agents-dialogue";


interface MeetingFromProps {
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
    initialValues?: MeetingGetOne
}

export const MeetingFrom = ({ onSuccess, onCancel, initialValues }: MeetingFromProps) => {
    const trpc = useTRPC()
    const [agentSearch, setAgentSearch] = useState("")
    const [openNewAgentDialogue, setOpenNewAgentDialogue] = useState(false)
    const queryClient = useQueryClient()
    const agents = useQuery(trpc.agents.getMany.queryOptions({
        pageSize: 100,
        search: agentSearch
    }))

    const createMeeting = useMutation(
        trpc.meeting.create.mutationOptions({
            onSuccess: (data) => {
                queryClient.invalidateQueries(
                    trpc.meeting.getMany.queryOptions({}),
                )

                onSuccess?.(data.id)
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    )
    const updateMeeting = useMutation(
        trpc.meeting.update.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(
                    trpc.meeting.getMany.queryOptions({}),
                )
                if (initialValues?.id) {
                    queryClient.invalidateQueries(
                        trpc.meeting.getOne.queryOptions({ id: initialValues.id }),
                    )
                }
                onSuccess?.()
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    )

    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            agentId: initialValues?.agentId ?? "",
        }
    })

    const isEdit = !!initialValues?.id;
    const isPending = createMeeting.isPending || updateMeeting.isPending

    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({ ...values, id: initialValues?.id })
        } else {
            createMeeting.mutate(values)
        }
    }

    return (
        <>
            <NewAgentsDialogue open={openNewAgentDialogue} onOpenChange={setOpenNewAgentDialogue} />
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField name="name" control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g Math Consultation" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField name="agentId" control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent</FormLabel>
                                <FormControl>
                                    <CommandSelect options={(agents.data?.items ?? []).map((agent) => ({
                                        id: agent.id,
                                        value: agent.id,
                                        children: (
                                            <div className="flex items-center gap-x-2">
                                                <GeneratedAvatar seed={agent.name} variant="botttsNeutral" className="size-6 border" />
                                                <span>{agent.name}</span>
                                            </div>
                                        )
                                    }))}
                                        onSelect={field.onChange}
                                        onSearch={setAgentSearch}
                                        value={field.value}
                                        placeholder="Select an agent"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Not found what you&apos;re looking for?{" "}
                                    <button className="text-primary hover:underline" type="button" onClick={() => setOpenNewAgentDialogue(true)}>
                                        Create new agent
                                    </button>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between gap-x-2">
                        {
                            onCancel && (
                                <Button type="button" variant="ghost" onClick={onCancel} disabled={isPending}>Cancel</Button>
                            )
                        }
                        <Button type="submit" disabled={isPending}>{isEdit ? "Update" : "Create"}</Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

