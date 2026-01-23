import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
export default function Popup({
  title,
  children,
  open,
  onOpenChange,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[70%]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
