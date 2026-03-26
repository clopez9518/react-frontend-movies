import { createBrowserRouter } from "react-router";
import { RootLayout } from "./streaming-app/layouts/RootLayout";
import { HomePage } from "./streaming-app/pages";

export const appRouter = createBrowserRouter(
    [
        {
            path: '/home',
            element: <RootLayout />,
            children: [
                {
                    index:true,
                    element: <HomePage />
                }
            ]
        }
    ]
)