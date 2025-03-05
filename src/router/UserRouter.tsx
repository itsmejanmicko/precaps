
import ProtectedRoute from "@/context/ProtectedRoute";
import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

const Login = lazy(()=>import('@/pages/auth/Login'));
const Register = lazy(()=>import('@/pages/auth/Register'));
const Panel = lazy(()=>import('@/pages/admin/Panel'));

export default function UserRouter() {
    const userRoutes = useRoutes([
      {
        path:'/',
        element:(
           <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
        )
      },{
        path:'/auth/register',
        element:(
           <Suspense fallback={<div>Loading...</div>}>
              <Register />
            </Suspense>
        )
      },{
        path:'/admin/panel',
        element:(
           <Suspense fallback={<div>Loading...</div>}>
               <ProtectedRoute>
                  <Panel />
               </ProtectedRoute>
            </Suspense>
        )
      }
    ])
    return userRoutes;
}
