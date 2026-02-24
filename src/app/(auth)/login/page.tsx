'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import Link from 'next/link'
import { signIn } from '@/app/actions/auth-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
    const [serverError, setServerError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginForm) => {
        setLoading(true)
        setServerError(null)

        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)

        const result = await signIn(formData)
        if (result?.error) {
            setServerError(result.error)
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="w-full max-w-sm space-y-6 rounded-lg border p-8 shadow-sm">
                <div className="space-y-1 text-center">
                    <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email and password to access your todos
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password')}
                        />
                        {errors.password && (
                            <p className="text-sm text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    {serverError && (
                        <p className="text-sm text-destructive">{serverError}</p>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Signing in…' : 'Sign in'}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="font-medium underline underline-offset-4">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}
