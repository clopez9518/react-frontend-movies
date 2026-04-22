import { useChangeUserStatus } from "@/admin/hooks/useAdminUsers"
import { Button } from "@/components/ui/button"
import type { UserAdminDto } from "@/interfaces/dto/user.dto"


export const UserActionsCell = ({ user }: { user: UserAdminDto }) => {
    const mutation = useChangeUserStatus()

    return (
        <div className="flex gap-2">
            <Button
                className="cursor-pointer bg-red-500 hover:bg-red-600"
                onClick={() => mutation.mutate({ id: user.id.toString(), isActive: !user.isActive })}
                disabled={mutation.isPending}
            >
                {user.isActive
                    ? "Deactivate"
                    : "Activate"}
            </Button>
        </div>
    )
}