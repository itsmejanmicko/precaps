import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import QRCode from "qrcode";

export const useRegister = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    password: "",
    confirmPassword: "",
    course: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const generateQRCode = async (data: object) => {
    try {
      const qrData = JSON.stringify(data);
      const qrCodeURL = await QRCode.toDataURL(qrData);

      // Create an anchor tag and trigger the download
      const link = document.createElement("a");
      link.href = qrCodeURL;
      link.download = `${formData.studentId}_qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("QR Code generation failed:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        fullName: formData.fullName,
        studentId: formData.studentId,
        email: formData.email,
        password: formData.password,
        course: formData.course,
      });

      if (!result.success) {
        setError(result.message);
      } else {
        alert("Registration successful! Downloading QR code...");
        await generateQRCode({
          fullName: formData.fullName,
          studentId: formData.studentId,
          email: formData.email,
          course: formData.course,
        });
      }
    } catch (err) {
      setError("An error occurred while registering.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
