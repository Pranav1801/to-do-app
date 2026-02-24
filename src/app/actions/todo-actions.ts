'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Validation schemas using Zod
const todoSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().optional().nullable(),
})

const updateTodoSchema = todoSchema.extend({
    id: z.number(),
    is_complete: z.boolean().optional(),
})

export async function createTodo(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const rawData = {
        title: formData.get('title'),
        description: formData.get('description') || null,
    }

    const validated = todoSchema.safeParse(rawData)
    if (!validated.success) {
        throw new Error('Validation failed')
    }

    const { error } = await supabase
        .from('todos')
        .insert([{ ...validated.data, user_id: user.id }])

    if (error) throw new Error(error.message)
    revalidatePath('/')
}

export async function updateTodo(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const rawData = {
        id: Number(formData.get('id')),
        title: formData.get('title'),
        description: formData.get('description') || null,
        is_complete: formData.get('is_complete') === 'on',
    }

    const validated = updateTodoSchema.safeParse(rawData)
    if (!validated.success) {
        throw new Error('Validation failed')
    }

    const { id, ...updates } = validated.data
    const { error } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) throw new Error(error.message)
    revalidatePath('/')
}

export async function deleteTodo(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    const id = Number(formData.get('id'))

    const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) throw new Error(error.message)
    revalidatePath('/')
}

export async function toggleTodo(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')
    const id = Number(formData.get('id'))
    const currentState = formData.get('is_complete') === 'true'

    const { error } = await supabase
        .from('todos')
        .update({ is_complete: !currentState })
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) throw new Error(error.message)
    revalidatePath('/')
}