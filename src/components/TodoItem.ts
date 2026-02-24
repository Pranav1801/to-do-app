'use client'

import { Todo } from '@/types/todo'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { toggleTodo, deleteTodo } from '@/app/actions/todo-actions'
import EditTodoDialog from './EditTodoDialog'

export default function TodoItem({ todo }: { todo: Todo }) {
  const toggleAction = async () => {
    const formData = new FormData()
    formData.append('id', todo.id.toString())
    formData.append('is_complete', todo.is_complete.toString())
    await toggleTodo(formData)
  }

  const deleteAction = async () => {
    const formData = new FormData()
    formData.append('id', todo.id.toString())
    await deleteTodo(formData)
  }

  return (
    <li className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <form action={toggleAction}>
          <button type="submit" className="flex items-center">
            <Checkbox checked={todo.is_complete} />
          </button>
        </form>
        <div>
          <p className={todo.is_complete ? 'line-through text-gray-400' : ''}>
            {todo.title}
          </p>
          {todo.description && (
            <p className="text-sm text-gray-500">{todo.description}</p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <EditTodoDialog todo={todo} />
        <form action={deleteAction}>
          <Button variant="ghost" size="icon" type="submit">
            <Trash2 className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </li>
  )
}