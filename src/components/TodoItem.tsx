'use client'

import { useTransition } from 'react'
import { Todo } from '@/types/todo'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { toggleTodo, deleteTodo } from '@/app/actions/todo-actions'
import EditTodoDialog from './EditTodoDialog'

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isTogglePending, startToggleTransition] = useTransition()
  const [isDeletePending, startDeleteTransition] = useTransition()

  const toggleAction = () => {
    const formData = new FormData()
    formData.append('id', todo.id.toString())
    formData.append('is_complete', todo.is_complete.toString())
    startToggleTransition(() => toggleTodo(formData))
  }

  const deleteAction = () => {
    const formData = new FormData()
    formData.append('id', todo.id.toString())
    startDeleteTransition(() => deleteTodo(formData))
  }

  return (
    <li className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.is_complete}
          onCheckedChange={toggleAction}
          disabled={isTogglePending}
        />
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
        <Button variant="ghost" size="icon" onClick={deleteAction} disabled={isDeletePending}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </li>
  )
}