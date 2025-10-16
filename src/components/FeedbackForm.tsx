import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Add your Zapier webhook URL here
const ZAPIER_WEBHOOK_URL = "YOUR_ZAPIER_WEBHOOK_URL_HERE";

export const FeedbackForm = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter your feedback message.",
        variant: "destructive",
      });
      return;
    }

    if (!ZAPIER_WEBHOOK_URL || ZAPIER_WEBHOOK_URL === "YOUR_ZAPIER_WEBHOOK_URL_HERE") {
      toast({
        title: "Setup Required",
        description: "Please configure your Zapier webhook URL in the FeedbackForm component.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const feedbackData = {
        page: location.pathname,
        message: message.trim(),
        email: email.trim() || null,
        timestamp: new Date().toISOString(),
        source: "Trini Tax Buddy"
      };

      await fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(feedbackData),
      });

      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully and will be added to GitHub.",
      });

      setMessage("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="message">Your Feedback *</Label>
        <Textarea
          id="message"
          placeholder="Tell us what you think..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="resize-none"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email (optional)</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
        <p className="text-xs text-muted-foreground">
          Provide your email if you'd like us to follow up with you.
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Feedback
        </Button>
      </div>
    </form>
  );
};
