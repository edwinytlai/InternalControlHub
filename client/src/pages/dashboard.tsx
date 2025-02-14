import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { type FeatureFlag, type Configuration } from "@shared/schema";
import { CircleDot, Settings } from "lucide-react";

export default function Dashboard() {
  const { data: features } = useQuery<FeatureFlag[]>({
    queryKey: ["/api/features"],
  });

  const { data: configs } = useQuery<Configuration[]>({
    queryKey: ["/api/configurations"],
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircleDot className="h-5 w-5" />
              Feature Flags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {features?.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center justify-between"
                >
                  <span>{feature.name}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      feature.enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {feature.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {configs?.map((config) => (
                <div
                  key={config.id}
                  className="flex items-center justify-between"
                >
                  <span>{config.key}</span>
                  <span className="text-sm text-muted-foreground">
                    {config.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
