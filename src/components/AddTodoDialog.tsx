'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import TodoForm from './TodoForm'
import { createTodo } from '@/app/actions/todo-actions'

export default function AddTodoDialog() {
    const [open, setOpen] = useState(false)

    const onSubmit = async (values: { title: string; description?: string }) => {
        const formData = new FormData()
        formData.append('title', values.title)
        if (values.description) formData.append('description', values.description)
        await createTodo(formData)
        setOpen(false)
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
                <TodoForm onSubmit={onSubmit} submitLabel="Create" />
            </DialogContent>
        </Dialog>
    )
}