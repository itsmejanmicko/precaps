import { School } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Image Section */}
      <div className="relative hidden md:block">
        <img src="/placeholder.svg?height=1080&width=1920" alt="University campus" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#800000]/90 to-[#800000]/60 flex flex-col justify-between p-8 text-white">
          <div className="flex items-center gap-2">
            <School className="h-8 w-8" />
            <span className="text-xl font-bold">iUseLab</span>
          </div>
          <div className="max-w-md">
            <h1 className="text-3xl font-bold mb-4">Polytechnic University of the Philippines</h1>
            <p className="text-white/80">
              Register today to join the premier state university in the Philippines, known for producing highly skilled
              and competent graduates.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="mx-auto w-full max-w-md space-y-6">{children}</div>
      </div>
    </div>
  );
}
