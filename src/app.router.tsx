import { createBrowserRouter, Navigate } from "react-router";

import {
    RootLayout,
    AuthLayout,
    BrowseLayout,
    AccountLayout,
} from "./streaming-app/layouts";

import {
    HomePage,
    BrowsePage,
    LoginPage,
    RegisterPage,
    GenrePage,
    MoviePage,
    MyListPage,
    AccountPage,
    WhosWatchingPage,
    ProfilePage
} from "./streaming-app/pages";
import { AdminDashboard, AdminMovieFormPage, AdminMovies, AdminUsers } from "./admin/pages";
import { AdminLayout } from "./admin/layouts/AdminLayout";
import { AdminRoute, ProtectedRoute, PublicRoute } from "./routes";
import { RequireProfileIfAuth } from "./routes/RequireProfileIfAuth";

export const appRouter = createBrowserRouter(
    [
        {
            path: '/',
            element: (
                <PublicRoute>
                    <RequireProfileIfAuth>
                        <RootLayout />
                    </RequireProfileIfAuth>
                </PublicRoute>
            ),
            children: [
                {
                    index: true,
                    element: <HomePage />
                },
                {
                    path: 'browse',
                    element: <BrowseLayout />,
                    children: [
                        {
                            index: true,
                            element: <BrowsePage />
                        },
                        {
                            path: ':genre',
                            element: <GenrePage />
                        }
                    ]
                },
                {
                    path: 'movie/:id',
                    element: <MoviePage />
                },
                {
                    path: 'mylist',
                    element: <MyListPage />
                }
            ]
        },
        {
            path: 'auth',
            element: <AuthLayout />,
            children: [
                {
                    path: 'login',
                    element: <LoginPage />
                },
                {
                    path: 'register',
                    element: <RegisterPage />
                }
            ]
        },
        {
            path: 'account',
            element: (
                <ProtectedRoute>
                    <AccountLayout />
                </ProtectedRoute>
            ),
            children: [
                {
                    index: true,
                    element: <AccountPage />
                },
                {
                    path: 'profile',
                    element: <ProfilePage />
                }
            ]
        },
        {
            path: 'whos-watching',
            element: (
                <ProtectedRoute>
                    <WhosWatchingPage />
                </ProtectedRoute>
            )
        },


        // Admin routes
        {
            path: 'admin',
            element: (
                <AdminRoute>
                    <AdminLayout />
                </AdminRoute>
            ),
            children: [
                {
                    index: true,
                    element: <Navigate to="dashboard" replace />
                },
                {
                    path: 'dashboard',
                    element: <AdminDashboard />
                },
                {
                    path: 'movies',
                    element: <AdminMovies />
                },
                {
                    path: 'movies/new',
                    element: <AdminMovieFormPage />
                },
                {
                    path: "movies/:id/edit",
                    element: <AdminMovieFormPage />
                },
                {
                    path: "users",
                    element: <AdminUsers />
                }
            ]
        },

        {
            path: '*',
            element: <Navigate to="/" replace />
        }
    ]
)