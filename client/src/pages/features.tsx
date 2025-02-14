import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type FeatureFlag } from "@shared/schema";

export default function Features() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: features, isLoading } = useQuery<FeatureFlag[]>({
    queryKey: ["/api/features"],
  });

  const toggleFeature = useMutation({
    mutationFn: async ({ id, enabled }: { id: number; enabled: boolean }) => {
      await apiRequest("PATCH", `/api/features/${id}`, { enabled });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/features"] });
      toast({
        title: "Feature updated",
        description: "The feature flag has been updated successfully.",
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Feature Flags</h1>
        <Button>Add Feature</Button>
      </div>

      <div className="grid gap-4">
        {features?.map((feature) => (
          <Card key={feature.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {feature.name}
                <Switch
                  checked={feature.enabled}
                  onCheckedChange={(enabled) =>
                    toggleFeature.mutate({ id: feature.id, enabled })
                  }
                />
              </CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg">
                {JSON.stringify(feature.conditions, null, 2)}
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
