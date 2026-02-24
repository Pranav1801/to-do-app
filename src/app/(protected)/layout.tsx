import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/actions/auth-actions'
import { Button } from '@/components/ui/button'

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b bg-background">
                <div className="container mx-auto flex items-center justify-between px-4 py-3 max-w-2xl">
                    <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {user.email}
                    </span>
                    <form action={signOut}>
                        <Button variant="outline" size="sm" type="submit">
                            Sign out
                        </Button>
                    </form>
                </div>
            </header>
            {children}
        </div>
    )
}
