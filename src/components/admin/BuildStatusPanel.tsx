import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, XCircle, RefreshCw, Wrench } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type BuildStatusRow = Database["public"]["Tables"]["build_status"]["Row"];

const statusVariant = (status: string) => {
  if (status === "success") return { Icon: CheckCircle2, cls: "text-green-500", badge: "default" as const };
  if (status === "warning") return { Icon: AlertTriangle, cls: "text-yellow-500", badge: "secondary" as const };
  return { Icon: XCircle, cls: "text-destructive", badge: "destructive" as const };
};

export const BuildStatusPanel = () => {
  const [rows, setRows] = useState<BuildStatusRow[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("build_status")
      .select("*")
      .order("run_at", { ascending: false })
      .limit(50);
    if (!error && data) setRows(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const failures = rows.filter((r) => r.status === "error");
  const warnings = rows.filter((r) => r.status === "warning");
  const firstActionable = failures[0] ?? warnings[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Build & Typecheck Status</h3>
          <p className="text-sm text-muted-foreground">
            Latest 50 hook/page/component runs
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="border-green-500/30">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Successful</div>
            <div className="text-2xl font-bold text-green-500">
              {rows.filter((r) => r.status === "success").length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/30">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Warnings</div>
            <div className="text-2xl font-bold text-yellow-500">{warnings.length}</div>
          </CardContent>
        </Card>
        <Card className="border-destructive/30">
          <CardContent className="p-4">
            <div className="text-xs text-muted-foreground">Failures</div>
            <div className="text-2xl font-bold text-destructive">{failures.length}</div>
          </CardContent>
        </Card>
      </div>

      {firstActionable && (
        <Card className="border-primary/40 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Wrench className="w-4 h-4 text-primary" /> First Actionable Fix
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">{firstActionable.component_name}</span>{" "}
              <Badge variant="outline" className="ml-2 text-xs">
                {firstActionable.category}
              </Badge>
            </div>
            {firstActionable.file_path && (
              <code className="text-xs block bg-muted p-2 rounded">
                {firstActionable.file_path}
              </code>
            )}
            {firstActionable.error_message && (
              <p className="text-destructive text-xs">{firstActionable.error_message}</p>
            )}
            {firstActionable.suggested_fix && (
              <div className="border-l-2 border-primary pl-3 text-sm">
                <strong>Fix: </strong>{firstActionable.suggested_fix}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Runs</CardTitle>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No build status entries yet. CI or scripts can insert rows into the `build_status` table.
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {rows.map((r) => {
                const v = statusVariant(r.status);
                return (
                  <div key={r.id} className="flex items-start gap-3 border border-border/40 rounded p-2.5">
                    <v.Icon className={`w-4 h-4 mt-0.5 ${v.cls}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{r.component_name}</span>
                        <Badge variant={v.badge} className="text-[10px]">{r.category}</Badge>
                      </div>
                      {r.file_path && (
                        <code className="text-[11px] text-muted-foreground block truncate">{r.file_path}</code>
                      )}
                      {r.error_message && (
                        <p className="text-xs text-destructive mt-1 line-clamp-2">{r.error_message}</p>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {new Date(r.run_at).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
