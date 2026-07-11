import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertCircle } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

type AlertType = "success" | "error" | "info";

interface AlertOptions {
  title: string;
  message: string;
  type?: AlertType;
  buttonText?: string;
  onConfirm?: () => void;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [activeAlert, setActiveAlert] = useState<AlertOptions | null>(null);

  const showAlert = useCallback((options: AlertOptions) => {
    setActiveAlert(options);
  }, []);

  const hideAlert = useCallback(() => {
    if (activeAlert?.onConfirm) {
      activeAlert.onConfirm();
    }
    setActiveAlert(null);
  }, [activeAlert]);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <AnimatePresence>
        {activeAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-ink/40 backdrop-blur-[4px]"
              onClick={hideAlert}
            />

            {/* Popup Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
              className="relative w-full max-w-md overflow-hidden border border-hairline bg-bone p-8 md:p-10 shadow-2xl rounded-2xl text-center"
            >
              {/* Close Icon Button */}
              <button
                onClick={hideAlert}
                className="absolute right-4 top-4 text-muted-foreground/60 hover:text-ink transition-colors p-1 rounded-full hover:bg-muted/50"
                aria-label="Close alert"
              >
                <X size={18} />
              </button>

              {/* Status Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full border ${
                    activeAlert.type === "success"
                      ? "bg-blush/10 border-blush/20 text-primary"
                      : activeAlert.type === "error"
                        ? "bg-destructive/10 border-destructive/20 text-destructive"
                        : "bg-ink/5 border-ink/10 text-ink"
                  }`}
                >
                  {activeAlert.type === "success" && <Check className="h-7 w-7" />}
                  {activeAlert.type === "error" && <X className="h-7 w-7" />}
                  {activeAlert.type === "info" && <AlertCircle className="h-7 w-7" />}
                </div>
              </div>

              {/* Text Information */}
              <h2 className="font-display serif-italic text-3xl text-ink leading-tight">
                {activeAlert.title}
              </h2>
              <p className="mt-4 font-sans text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                {activeAlert.message}
              </p>

              {/* Action Button */}
              <div className="mt-8 flex justify-center">
                <MagneticButton
                  variant={activeAlert.type === "success" ? "blush" : "ink"}
                  onClick={hideAlert}
                >
                  {activeAlert.buttonText || "Continue"}
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  );
}
