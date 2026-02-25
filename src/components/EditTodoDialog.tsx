'use client'

import { useState, useTransition } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import TodoForm from './TodoForm'
import { updateTodo } from '@/app/actions/todo-actions'
import { Todo } from '@/types/todo'
import { toast } from 'sonner'

export default function EditTodoDialog({ todo }: { todo: Todo }) {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const onSubmit = async (values: { title: string; description?: string }) => {
        const formData = new FormData()
        formData.append('id', todo.id.toString())
        formData.append('title', values.title)
        if (values.description) formData.append('description', values.description)
        formData.append('is_complete', todo.is_complete ? 'on' : 'off')

        await new Promise<void>((resolve) => {
            startTransition(async () => {
                const result = await updateTodo(formData)
                if (result.success) {
                    toast.success(result.message)
                    setOpen(false)
                } else {
                    toast.error(result.message)
                }
                resolve()
            })
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={(props) => (
                    <Button variant="ghost" size="icon" {...props}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
            />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit todo</DialogTitle>
                </DialogHeader>
                <TodoForm
                    defaultValues={{ title: todo.title, description: todo.description || '' }}
                    onSubmit={onSubmit}
                    submitLabel="Update"
                    isPending={isPending}
                    pendingLabel="Updating…"
                />
            </DialogContent>
        </Dialog>
    )
}