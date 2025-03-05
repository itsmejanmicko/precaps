import UserRouter from "./router/UserRouter"

export default function App() {
  const userRoutes = UserRouter();
  return (
      <main>
            {userRoutes}
      </main>
  )
}
