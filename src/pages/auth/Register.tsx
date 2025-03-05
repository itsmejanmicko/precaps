import { useRegister } from "@/hooks/useRegister";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { School } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { PasswordInput } from "@/helper/helpercomp/PasswordInput";
import { SelectCourse } from "@/helper/helpercomp/SelectCourse";

export default function Register() {
  const { formData, loading, error, handleChange, handleSubmit } = useRegister();

  return (
    <AuthLayout>
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
          <School className="h-6 w-6 text-[#800000]" />
          <span className="text-xl font-bold text-[#800000]">PUP Portal</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
        <p className="mt-2 text-sm text-[#800000]/80">Fill in your details to register for university courses</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="Juan Dela Cruz" required value={formData.fullName} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input id="studentId" placeholder="2023-00000-LQ-0" required value={formData.studentId} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="juan.delacruz@pup.edu.ph" required value={formData.email} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput id="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <PasswordInput id="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="course">Course Section</Label>
            <SelectCourse value={formData.course} onChange={(value: string) => handleChange({ target: { id: "course", value } } as React.ChangeEvent<HTMLInputElement>)} />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full bg-[#800000] hover:bg-[#600000] text-white" disabled={loading}>
          {loading ? "Registering..." : "Register Now"}
        </Button>

        <p className="text-center text-sm text-[#800000]/80">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-[#800000] hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
