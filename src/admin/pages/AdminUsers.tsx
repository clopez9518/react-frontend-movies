import { Loading, Error } from "@/streaming-app/components/shared"
import { useAdminUsers } from "../hooks/useAdminUsers"
import { DataTable } from "../components/DataTable"
import { columns } from "../components/users/UsersColumns"

export const AdminUsers = () => {

    const { users, isLoading, error } = useAdminUsers()

    if (isLoading) return <Loading />
    if (error) return <Error title={error.message} />

    const inputFilter = {
        placeholder: "Filter users by email...",
        column: "email",
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-semibold">Users</h1>
                <p className="text-gray-400 mt-1">Manage your users</p>
            </div>
            <DataTable columns={columns} data={users || []} inputFilter={inputFilter} />
        </div>
    )
}
