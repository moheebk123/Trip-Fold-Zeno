import { useSelector, useDispatch } from "react-redux";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { alertActions, type RootState } from "@/store";
import { useEffect } from "react";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

export default function AlertBox() {
  const { show, variant, message } = useSelector((store: RootState) => store.alert);

  const dispatch = useDispatch();

  // Auto-hide after 5 seconds
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => dispatch(alertActions.hideAlert()), 5000);
      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  if (!show) return null;

  const icons = {
    success: <CheckCircle className="w-4 h-4" style={{ color: "#5eab62" }} />,
    error: <AlertCircle className="w-4 h-4" style={{ color: "#e57373" }} />,
    warning: <Info className="w-4 h-4" style={{ color: "#e89924" }} />,
  };

  return (
    <Alert
      variant={variant}
      className="flex items-center justify-start gap-2 px-4 py-3 rounded-lg shadow-md"
    >
      {icons[variant]}
      <AlertTitle className="text-sm font-medium">{message}</AlertTitle>
    </Alert>
  );
}
