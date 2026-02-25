'use client'

import { useState, useTransition } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import TodoForm from './TodoForm'
import { createTodo } from '@/app/actions/todo-actions'
import { toast } from 'sonner'

export default function AddTodoDialog() {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const onSubmit = async (values: { title: string; description?: string }) => {
        const formData = new FormData()
        formData.append('title', values.title)
        if (values.description) formData.append('description', values.description)

        await new Promise<void>((resolve) => {
            startTransition(async () => {
                const result = await createTodo(formData)
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
                    <Button {...props}>
                        <Plus className="mr-2 h-4 w-4" /> Add Todo
                    </Button>
                )}
            />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new todo</DialogTitle>
                </DialogHeader>
                <TodoForm onSubmit={onSubmit} submitLabel="Create" isPending={isPending} />
            </DialogContent>
        </Dialog>
    )
}