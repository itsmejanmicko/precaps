import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, QrCode } from "lucide-react"
import { useLogin } from "@/hooks/useLogin"
import Camera from "@/components/Camera"

export default function Login() {
  const { email, setEmail, password, setPassword, handleSubmit, handleQrScan, showQrScanner, setShowQrScanner} = useLogin()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-[#800000] ">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-[#800000] flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#800000]">Welcome Back</CardTitle>
          <CardDescription>Polytechnic University of the Philippines</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:border-[#800000] focus:ring-[#800000]"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-[#800000] hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="****************"
                className="focus:border-[#800000] focus:ring-[#800000]"
              />
            </div>
            <Button type="submit" className="w-full bg-[#800000] hover:bg-[#600000]">
              Sign In
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white"
              onClick={handleQrScan}
            >
              <QrCode className="h-4 w-4" />
              Scan QR Code
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/auth/register" className="text-[#800000] hover:underline">
              Register here
            </a>
          </p>
        </CardFooter>
      </Card>

      {/* QR Scanner Modal */}
      {showQrScanner && <Camera showQrScanner={showQrScanner} setShowQrScanner={setShowQrScanner} />}
    </div>
  )
}
