import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Login from "@/pages/auth/Login";
import { Input } from "./ui/input";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Camera({
  showQrScanner,
  setShowQrScanner,
}: {
  showQrScanner: boolean;
  setShowQrScanner: (value: boolean) => void;
}) {
  const {login} = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<object | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [scanning, setScanning] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");


  useEffect(() => {
    if (!showQrScanner) return;
    setScanning(true);
    const timeout = setTimeout(() => {
      if (!videoRef.current) {
        console.log("Video element not found, retrying...");
        return;
      }
      console.log("Initializing camera with video element:", videoRef.current);
      const codeReader = new BrowserMultiFormatReader();
      codeReader
        .decodeFromVideoDevice(undefined, videoRef.current, (result, err, controls) => {
          if (err) return;
          if (controls) controlsRef.current = controls;

          if (result) {
            const scannedText = result.getText().trim();
            const studentIdMatch: RegExpMatchArray | null = scannedText.match(/"studentId"\s*:\s*"([^"]+)",\s*"email"\s*:\s*"([^"]+)"/);

            if(!studentIdMatch) return;

            setEmail(studentIdMatch[2])


            setResult({ data: result.getText() });
            setScanning(false);
          }
        })
        .catch((err) => {
          console.error("QR Scanner Error:", err);
          setScanning(false);
        });
    }, 500);

    return () => {
      clearTimeout(timeout);
      controlsRef.current?.stop();
      setScanning(false);
    };
  }, [showQrScanner]);

  async function handleSubmit(){
         try {
            await login(email, password)
           navigate('/admin/panel')
         } catch (error) {
          console.log(error);
         }
  }
  return (
    <Dialog open={showQrScanner} onOpenChange={setShowQrScanner}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#800000]">Scan QR Code</DialogTitle>
          <DialogDescription>
            Position the QR code within the camera frame to login
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <Card className="w-full max-w-lg shadow-lg rounded-xl bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-center text-lg font-semibold text-gray-900 dark:text-white">
                QR Code Scanner
              </CardTitle>
              <p className="text-center text-gray-500 text-sm">
                Scan a QR code to check user information
              </p>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative flex justify-center items-center border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-full">
                <video
                  ref={videoRef}
                  className="w-full max-h-56 rounded-lg"
                  autoPlay
                  playsInline
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
              </div>

              {scanning && (
                <div className="flex items-center gap-2 mt-3 text-gray-600 dark:text-gray-300">
                  <Loader2 className="animate-spin h-5 w-5" />
                  Scanning...
                </div>
              )}

              {result && (
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mt-4 w-full">
                  <h3 className="font-semibold text-gray-700 dark:text-white">Enter your password</h3>
                  <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
                    <Input
                     onChange={(e) => setPassword(e.target.value)}
                     value={password}
                     type="password" placeholder="Enter your password" />
                  </pre>
                  <Button
                   onClick={handleSubmit}
                   className="mt-2">Submit</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border-[#800000] hover:bg-[#800000] hover:text-white text-[#800000]"
            >
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
