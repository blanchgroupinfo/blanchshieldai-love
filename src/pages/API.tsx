import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { 
  Code, Key, Zap, Shield, BookOpen, 
  Terminal, Copy, Check, ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const API = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const endpoints = [
    {
      method: "POST",
      path: "/v1/chat/completions",
      description: "Send messages to S.H.I.E.L.D. AI agents for intelligent responses.",
      example: `curl -X POST https://api.blanchshield.ai/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent": "spiritual-guidance",
    "messages": [{"role": "user", "content": "What does the scripture say about wisdom?"}]
  }'`,
    },
    {
      method: "GET",
      path: "/v1/agents",
      description: "Retrieve a list of all available AI agents and their capabilities.",
      example: `curl https://api.blanchshield.ai/v1/agents \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    },
    {
      method: "POST",
      path: "/v1/agents/{agent_id}/invoke",
      description: "Invoke a specific AI agent for specialized tasks.",
      example: `curl -X POST https://api.blanchshield.ai/v1/agents/AI290/invoke \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "task": "translate",
    "content": "Genesis 1:1",
    "target_language": "hebrew"
  }'`,
    },
    {
      method: "POST",
      path: "/v1/knowledge/search",
      description: "Search the S.H.I.E.L.D. knowledge base for relevant information.",
      example: `curl -X POST https://api.blanchshield.ai/v1/knowledge/search \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "economic empowerment strategies",
    "limit": 10
  }'`,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Low Latency",
      description: "Average response time under 100ms for most queries.",
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Enterprise-grade security with TLS 1.3 encryption.",
    },
    {
      icon: Code,
      title: "RESTful",
      description: "Clean, intuitive REST API design with JSON responses.",
    },
    {
      icon: BookOpen,
      title: "Well Documented",
      description: "Comprehensive documentation with examples for all endpoints.",
    },
  ];

  const sdks = [
    { name: "JavaScript/TypeScript", status: "Available" },
    { name: "Python", status: "Available" },
    { name: "Go", status: "Coming Soon" },
    { name: "Rust", status: "Coming Soon" },
    { name: "Java", status: "Coming Soon" },
    { name: "Ruby", status: "Coming Soon" },
  ];

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
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
              <Terminal className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-6">
              API Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body mb-8">
              Integrate S.H.I.E.L.D. AI's powerful capabilities into your applications 
              with our comprehensive REST API.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="shield" size="lg">
                <Key className="w-4 h-4 mr-2" />
                Get API Key
              </Button>
              <Button variant="outline" size="lg">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Full Docs
              </Button>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 border-y border-border/50 bg-card/20">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <ScrollAnimationWrapper key={feature.title} delay={index * 0.05}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground font-body">{feature.description}</p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl font-display font-bold gradient-text mb-6">
              Authentication
            </h2>
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-8">
              <p className="text-muted-foreground font-body mb-4">
                All API requests require authentication using an API key. Include your API key 
                in the Authorization header of each request:
              </p>
              <div className="bg-background/80 rounded-lg p-4 font-mono text-sm relative">
                <code className="text-primary">Authorization: Bearer YOUR_API_KEY</code>
                <button
                  onClick={() => copyCode("Authorization: Bearer YOUR_API_KEY", "auth")}
                  className="absolute right-2 top-2 p-2 hover:bg-card/50 rounded"
                >
                  {copiedCode === "auth" ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto max-w-4xl">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl font-display font-bold gradient-text mb-8">
              API Endpoints
            </h2>
          </ScrollAnimationWrapper>
          
          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <ScrollAnimationWrapper key={endpoint.path} delay={index * 0.1}>
                <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold ${
                      endpoint.method === "GET" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-foreground font-mono text-sm">{endpoint.path}</code>
                  </div>
                  <p className="text-muted-foreground font-body mb-4">{endpoint.description}</p>
                  <div className="bg-background/80 rounded-lg p-4 font-mono text-xs relative overflow-x-auto">
                    <pre className="text-muted-foreground whitespace-pre-wrap">{endpoint.example}</pre>
                    <button
                      onClick={() => copyCode(endpoint.example, endpoint.path)}
                      className="absolute right-2 top-2 p-2 hover:bg-card/50 rounded"
                    >
                      {copiedCode === endpoint.path ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl font-display font-bold gradient-text mb-8">
              Official SDKs
            </h2>
          </ScrollAnimationWrapper>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sdks.map((sdk, index) => (
              <ScrollAnimationWrapper key={sdk.name} delay={index * 0.05}>
                <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4 flex items-center justify-between">
                  <span className="font-body text-foreground">{sdk.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    sdk.status === "Available" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {sdk.status}
                  </span>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto max-w-4xl">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl font-display font-bold gradient-text mb-6">
              Rate Limits
            </h2>
            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-card/50">
                  <tr>
                    <th className="text-left p-4 font-display text-foreground">Plan</th>
                    <th className="text-left p-4 font-display text-foreground">Requests/min</th>
                    <th className="text-left p-4 font-display text-foreground">Requests/day</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr>
                    <td className="p-4 font-body text-muted-foreground">Free</td>
                    <td className="p-4 font-body text-muted-foreground">10</td>
                    <td className="p-4 font-body text-muted-foreground">1,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-body text-muted-foreground">Pro</td>
                    <td className="p-4 font-body text-muted-foreground">100</td>
                    <td className="p-4 font-body text-muted-foreground">50,000</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-body text-muted-foreground">Enterprise</td>
                    <td className="p-4 font-body text-muted-foreground">Unlimited</td>
                    <td className="p-4 font-body text-muted-foreground">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default API;
