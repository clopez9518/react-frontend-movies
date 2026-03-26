import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"

export const StreamingApp = () => {
  return (
    <div>

        <RouterProvider router={appRouter} />
    </div>
  )
}
