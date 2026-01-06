import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Check, Loader2 } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

interface NewsletterSubscriptionProps {
  variant?: "default" | "inline" | "footer";
}

const NewsletterSubscription = ({ variant = "default" }: NewsletterSubscriptionProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast({
        title: "Invalid email",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .insert({ email });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        setEmail("");
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to the H.I.I. AI newsletter.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`flex items-center gap-2 ${variant === "footer" ? "text-sm" : ""}`}>
        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check className="w-4 h-4 text-green-500" />
        </div>
        <span className="text-muted-foreground">Thanks for subscribing!</span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubscribe} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" variant="shield" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
    );
  }

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubscribe} className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-background/50"
            disabled={isLoading}
          />
          <Button type="submit" variant="shield" size="sm" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Mail className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground">Subscribe to H.I.I. AI</h3>
          <p className="text-sm text-muted-foreground">Get updates on AI agents & technology</p>
        </div>
      </div>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" variant="shield" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSubscription;
