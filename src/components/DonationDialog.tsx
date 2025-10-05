import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";

interface DonationDialogProps {
  open: boolean;
  onClose: () => void;
  projectTitle: string;
  onDonate: (amount: number, message: string) => void;
}

const DonationDialog = ({ open, onClose, projectTitle, onDonate }: DonationDialogProps) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDonate = () => {
    const donationAmount = parseFloat(amount);
    if (donationAmount > 0) {
      onDonate(donationAmount, message);
      setAmount("");
      setMessage("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Support {projectTitle}
          </DialogTitle>
          <DialogDescription>
            Your donation will directly support this student's educational journey. All transactions are transparent on the blockchain.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Donation Amount (AE)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Write a message of encouragement..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Your donation:</span>
              <span className="font-medium">{amount || "0.00"} AE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Platform fee (2%):</span>
              <span className="font-medium">{((parseFloat(amount) || 0) * 0.02).toFixed(2)} AE</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Student receives:</span>
              <span className="text-secondary">{((parseFloat(amount) || 0) * 0.98).toFixed(2)} AE</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleDonate} disabled={!amount || parseFloat(amount) <= 0}>
            Confirm Donation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;
