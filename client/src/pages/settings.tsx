import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Configuration } from "@shared/schema";

export default function Settings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: configs, isLoading } = useQuery<Configuration[]>({
    queryKey: ["/api/configurations"],
  });

  const updateConfig = useMutation({
    mutationFn: async ({ id, value }: { id: number; value: string }) => {
      await apiRequest("PATCH", `/api/configurations/${id}`, { value });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/configurations"] });
      toast({
        title: "Configuration updated",
        description: "The configuration has been updated successfully.",
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button>Add Configuration</Button>
      </div>

      <div className="grid gap-4">
        {configs?.map((config) => (
          <Card key={config.id}>
            <CardHeader>
              <CardTitle>{config.key}</CardTitle>
              <CardDescription>{config.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Input
                value={config.value}
                onChange={(e) =>
                  updateConfig.mutate({ id: config.id, value: e.target.value })
                }
              />
              <Button variant="outline">Save</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
