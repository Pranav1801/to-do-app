'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import TodoForm from './TodoForm'
import { updateTodo } from '@/app/actions/todo-actions'
import { Todo } from '@/types/todo'

export default function EditTodoDialog({ todo }: { todo: Todo }) {
    const [open, setOpen] = useState(false)

    const onSubmit = async (values: { title: string; description?: string }) => {
        const formData = new FormData()
        formData.append('id', todo.id.toString())
        formData.append('title', values.title)
        if (values.description) formData.append('description', values.description)
        // keep the original completion status
        formData.append('is_complete', todo.is_complete ? 'on' : 'off')
        await updateTodo(formData)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit todo</DialogTitle>
                </DialogHeader>
                <TodoForm
                    defaultValues={{ title: todo.title, description: todo.description || '' }}
                    onSubmit={onSubmit}
                    submitLabel="Update"
                />
            </DialogContent>
        </Dialog>
    )
}