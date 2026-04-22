
export const Loading = () => {
    return (
        <div className="dark flex h-screen items-center justify-center scrollbar-hide">
            <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent">
                </div>
                <p className="text-lg font-medium text-white"> Espere un momento... </p>
            </div>
        </div>
    )
}
