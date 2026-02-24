export type Todo = {
    id: number
    user_id: string
    title: string
    description: string | null
    is_complete: boolean
    created_at: string
}