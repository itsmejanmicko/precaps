
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showQrScanner, setShowQrScanner] = useState(false)
  const [scanning, setScanning] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
     try {
        await login(email, password)
       setInterval(() => {
          navigate("/admin/panel")
       }, 2000);
     } catch (error) {
        console.log(error)
     }

  }

  const handleQrScan = () => {
    setShowQrScanner(true)
  }

  const startScanning = () => {
    setScanning(true)
    console.log("QR scanning started")
  }

  const handleQrDetected = (qrData: string) => {
    console.log("QR code detected:", qrData)
    setShowQrScanner(false)
    // Process the QR code data for authentication
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    showQrScanner,
    setShowQrScanner,
    scanning,
    setScanning,
    handleSubmit,
    handleQrScan,
    startScanning,
    handleQrDetected,
  }
}
