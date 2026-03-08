import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { User, Mail, Edit, Shield, Star, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ShieldAIProfile = () => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">USER PROFILE</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              S.H.I.E.L.D. AI <span className="text-primary">Profile</span>
            </h1>
          </motion.div>

          <Card className="bg-card/50 border-border/50 mb-6">
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary mx-auto flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-primary" />
              </div>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="Enter your full name" disabled={!editing} />
              </div>
              <div>
                <Label>Email</Label>
                <Input placeholder="Enter your email" disabled={!editing} />
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea placeholder="Tell us about yourself" disabled={!editing} />
              </div>
              <Button onClick={() => setEditing(!editing)} variant={editing ? "default" : "outline"} className="w-full">
                <Edit className="w-4 h-4 mr-2" />
                {editing ? "Save Profile" : "Edit Profile"}
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-card/50 border-border/50 text-center p-4">
              <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Verified</p>
            </Card>
            <Card className="bg-card/50 border-border/50 text-center p-4">
              <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-sm font-medium">Member</p>
            </Card>
            <Card className="bg-card/50 border-border/50 text-center p-4">
              <Activity className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm font-medium">Active</p>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShieldAIProfile;
