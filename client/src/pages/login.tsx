import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { handleLogin } from "@/lib/msal";
import { BsMicrosoft } from "react-icons/bs";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            LLM Service Portal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            size="lg"
            onClick={handleLogin}
          >
            <BsMicrosoft className="mr-2 h-5 w-5" />
            Sign in with Microsoft
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}