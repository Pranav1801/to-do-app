import { Todo } from '@/types/todo'
import TodoItem from './TodoItem'

export default function TodoList({ todos }: { todos: Todo[] }) {
    if (todos.length === 0) {
        return <p className="text-gray-500" > No todos yet.Add one above! </p>
    }

    return (
        <ul className= "space-y-2" >
        {
            todos.map((todo) => (
                <TodoItem key= { todo.id } todo = { todo } />
      ))
        }
        </ul>
  )
}