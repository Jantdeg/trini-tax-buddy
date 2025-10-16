import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, Mail, Calendar, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Feedback {
  id: string;
  page: string;
  message: string;
  email: string | null;
  created_at: string;
}

const Admin = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      if (!isSupabaseConfigured || !supabase) {
        setFeedback([]);
        return;
      }

      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setFeedback(data || []);
    } catch (error) {
      console.error("Error loading feedback:", error);
      toast({
        title: "Error",
        description: "Failed to load feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-[var(--shadow-soft)]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">View user feedback submissions</p>
            </div>
            <a
              href="/"
              className="text-primary hover:underline text-sm"
            >
              Back to Calculator
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              All Feedback ({feedback.length})
            </h2>
          </div>

          {feedback.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No feedback submissions yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {feedback.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Feedback
                        </CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(item.created_at), "PPp")}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {item.page}
                          </span>
                        </CardDescription>
                      </div>
                      {item.email && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          Contact
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {item.message}
                      </p>
                    </div>
                    {item.email && (
                      <div className="pt-3 border-t">
                        <p className="text-xs text-muted-foreground">Contact email:</p>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {item.email}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
