import { LuLoader2 } from "react-icons/lu";
import Button from "./button";

export default function LoadingButton({ children, loading, ...props }) {
  return (
    <Button {...props} disabled={loading}>
      {loading ? <LuLoader2 className="p-0.5 animate-spin" /> : children}
    </Button>
  );
}
