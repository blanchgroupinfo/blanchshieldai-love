import { useState } from "react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  Clock, Globe, Loader2 
} from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@blanchshield.ai",
      href: "mailto:contact@blanchshield.ai",
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.blanchshield.ai",
      href: "https://www.blanchshield.ai",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    try {
      contactSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 divine-radial opacity-30" />
        <div className="container mx-auto text-center relative z-10">
          <ScrollAnimationWrapper>
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <MessageSquare className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              Have questions about S.H.I.E.L.D. AI? We're here to help. 
              Reach out and let's discuss how we can serve your needs.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <ScrollAnimationWrapper>
              <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="bg-background/50"
                        required
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="bg-background/50"
                        required
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      className="bg-background/50"
                      required
                    />
                    {errors.subject && (
                      <p className="text-xs text-destructive">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more..."
                      className="bg-background/50 min-h-[150px]"
                      required
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="shield"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </ScrollAnimationWrapper>

            {/* Contact Info */}
            <ScrollAnimationWrapper delay={0.1}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground font-body mb-8">
                    Whether you're interested in our AI solutions, partnerships, 
                    or have questions about S.H.I.E.L.D. AI's mission, we'd love to hear from you.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div
                      key={info.label}
                      className="flex items-center gap-4 p-4 bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-body">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-foreground font-medium hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-6">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    Partnership Inquiries
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">
                    For partnership and enterprise inquiries, please include your organization 
                    details and proposed collaboration scope in your message.
                  </p>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
