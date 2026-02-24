import { createClient } from '@/lib/supabase/server'
import TodoList from '@/components/TodoList'
import AddTodoDialog from '@/components/AddTodoDialog'

export default async function Home() {
  const supabase = await createClient()
  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching todos:', error)
    return <div>Failed to load todos</div>
  }

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>
      <div className="mb-4">
        <AddTodoDialog />
      </div>
      <TodoList todos={todos} />
    </main>
  )
}