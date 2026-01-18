import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, Search, Filter, ShoppingCart, Star, Package, Truck, CreditCard, Shield, TrendingUp, Gem, Building, Cpu, Leaf, Briefcase, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
const VirtualMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [{
    icon: Gem,
    name: "Commodities",
    count: 2840
  }, {
    icon: Building,
    name: "Real Estate",
    count: 1250
  }, {
    icon: Cpu,
    name: "Technology",
    count: 3420
  }, {
    icon: Leaf,
    name: "Green Assets",
    count: 890
  }, {
    icon: Briefcase,
    name: "Services",
    count: 4560
  }, {
    icon: Package,
    name: "Equipment",
    count: 1780
  }];
  const featuredListings = [{
    id: 1,
    title: "Industrial Gold Bullion - 1kg",
    seller: "Swiss Vault Corp",
    price: "$62,450",
    rating: 4.9,
    reviews: 128,
    category: "Commodities",
    verified: true,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400"
  }, {
    id: 2,
    title: "Commercial Property - Dubai Marina",
    seller: "Emirates Holdings",
    price: "$2.4M",
    rating: 4.8,
    reviews: 45,
    category: "Real Estate",
    verified: true,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400"
  }, {
    id: 3,
    title: "Enterprise AI Server Cluster",
    seller: "TechForge Solutions",
    price: "$185,000",
    rating: 4.7,
    reviews: 89,
    category: "Technology",
    verified: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400"
  }, {
    id: 4,
    title: "Carbon Credit Bundle - 1000 tons",
    seller: "GreenFuture Initiative",
    price: "$45,000",
    rating: 4.6,
    reviews: 234,
    category: "Green Assets",
    verified: true,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400"
  }, {
    id: 5,
    title: "Mining Equipment Fleet",
    seller: "HeavyMach Industries",
    price: "$890,000",
    rating: 4.8,
    reviews: 67,
    category: "Equipment",
    verified: true,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400"
  }, {
    id: 6,
    title: "Managed Security Services",
    seller: "CyberShield Pro",
    price: "$15,000/mo",
    rating: 4.9,
    reviews: 312,
    category: "Services",
    verified: true,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400"
  }];
  const marketplaceFeatures = [{
    icon: Shield,
    title: "Escrow Protection",
    description: "All transactions secured with smart contract escrow"
  }, {
    icon: Truck,
    title: "Global Logistics",
    description: "Integrated shipping and delivery tracking"
  }, {
    icon: CreditCard,
    title: "Multi-Currency",
    description: "Pay in 50+ currencies including crypto"
  }, {
    icon: Star,
    title: "Verified Sellers",
    description: "All merchants undergo rigorous verification"
  }];
  return <div className="min-h-screen bg-background pt-8">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30">
              <Store className="w-3 h-3 mr-1" />
              B2B Marketplace
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Virtual Marketplace
            </h1>
            <p className="text-xl text-muted-foreground mb-8">The premier B2B, B2C, C2C, marketplace for enterprise assets, commodities, real estate, and professional services.</p>
            
            {/* Search Bar */}
            <div className="flex gap-2 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Search products, services, or sellers..." className="pl-10 h-12" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <Button size="lg" className="h-12 gap-2">
                <Filter className="w-4 h-4" /> Filters
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => <motion.div key={category.name} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.05
          }}>
                <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                  <CardContent className="pt-4 pb-4 text-center">
                    <category.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-muted-foreground">{category.count.toLocaleString()} listings</div>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {marketplaceFeatures.map((feature, index) => <div key={feature.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">{feature.title}</div>
                  <div className="text-xs text-muted-foreground">{feature.description}</div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="featured" className="w-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Marketplace Listings</h2>
              <TabsList>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="new">New Arrivals</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="featured">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredListings.map((listing, index) => <motion.div key={listing.id} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.1
              }}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="relative h-48 overflow-hidden">
                        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <Badge className="absolute top-3 left-3 bg-background/90">
                          {listing.category}
                        </Badge>
                        {listing.verified && <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                            <Shield className="w-3 h-3 mr-1" /> Verified
                          </Badge>}
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold mb-1 line-clamp-1">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{listing.seller}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-medium">{listing.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">({listing.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{listing.price}</span>
                          <Button size="sm" variant="outline" className="gap-1">
                            <ShoppingCart className="w-4 h-4" /> Inquire
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>)}
              </div>
            </TabsContent>
            
            <TabsContent value="new">
              <div className="text-center py-12 text-muted-foreground">
                New arrivals coming soon...
              </div>
            </TabsContent>
            
            <TabsContent value="trending">
              <div className="text-center py-12 text-muted-foreground">
                Trending listings coming soon...
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="gap-2">
              View All Listings <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Seller CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <Badge className="mb-4">For Sellers</Badge>
              <h2 className="text-3xl font-bold mb-4">Start Selling on the Marketplace</h2>
              <p className="text-muted-foreground mb-6">
                Reach thousands of verified B2B buyers worldwide. List your products, 
                services, or assets with our secure escrow system.
              </p>
              <ul className="space-y-3 mb-6">
                {["No listing fees for verified sellers", "Integrated payment processing", "Logistics and fulfillment support", "Dedicated seller dashboard"].map(item => <li key={item} className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-primary" />
                    </div>
                    {item}
                  </li>)}
              </ul>
              <Button size="lg" className="gap-2">
                Become a Seller <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
              <Card className="relative bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg">Seller Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Average Order Value</span>
                    <span className="font-bold text-primary">$48,500</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Active Buyers</span>
                    <span className="font-bold text-primary">12,400+</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Transaction Success Rate</span>
                    <span className="font-bold text-primary">99.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm">Average Response Time</span>
                    <span className="font-bold text-primary">&lt;2 hours</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default VirtualMarketplace;