import { useState } from "react";
import { BookOpen, Search, ChevronRight, Sparkles, Book, Globe, Cpu, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { knowledgeBase, scriptures, KnowledgeItem } from "@/data/knowledgeBase";

const categoryIcons: Record<string, any> = {
  Organization: Building2,
  Programs: Sparkles,
  Foundation: Book,
  Technology: Cpu,
  Vision: Globe,
  Business: Building2,
  Spiritual: BookOpen,
};

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(knowledgeBase.map((item) => item.category)));

  const filteredItems = knowledgeBase.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="knowledge" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-divine-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">Knowledge</span> Base
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Scriptural wisdom, historical context, and truth engines integrated with modern AI
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search knowledge base..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge
              variant={!selectedCategory ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              All Topics
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Knowledge Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => {
                  const Icon = categoryIcons[item.category] || BookOpen;
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`glass-card rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                        selectedItem?.id === item.id
                          ? "border-primary ring-2 ring-primary/20"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <h3 className="font-display font-semibold text-foreground">
                              {item.title}
                            </h3>
                            <ChevronRight
                              className={`w-5 h-5 text-muted-foreground transition-transform ${
                                selectedItem?.id === item.id ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                          <Badge variant="secondary" className="text-xs mb-3">
                            {item.category}
                          </Badge>
                          
                          <AnimatePresence>
                            {selectedItem?.id === item.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <p className="text-sm text-muted-foreground font-body leading-relaxed mt-3 pt-3 border-t border-border/50">
                                  {item.content}
                                </p>
                                {item.scriptures && item.scriptures.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    {item.scriptures.map((ref) => (
                                      <span
                                        key={ref}
                                        className="text-xs text-shield-accent italic"
                                      >
                                        📖 {ref}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Scripture Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Book className="w-5 h-5 text-divine-gold" />
                  <h3 className="font-display font-semibold text-foreground">
                    Foundational Scriptures
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {scriptures.slice(0, 5).map((scripture) => (
                    <blockquote
                      key={scripture.reference}
                      className="p-3 rounded-lg bg-divine-gold/5 border-l-2 border-divine-gold/30"
                    >
                      <p className="text-sm text-muted-foreground font-body italic mb-2">
                        "{scripture.text}"
                      </p>
                      <cite className="text-xs text-divine-gold not-italic font-display">
                        — {scripture.reference}
                      </cite>
                    </blockquote>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBase;
