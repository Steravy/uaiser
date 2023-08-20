import { FREE_LIMIT_RANGE } from "@/lib/constants";
import ClientWrapper from "./ClientWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface ApiUsageLimitCountDisplayerProps {

    userApiUsageLimitCount: number
}

const ApiUsageLimitCountDisplayer: React.FC<ApiUsageLimitCountDisplayerProps> = ({ userApiUsageLimitCount }) => {

    return (

        <ClientWrapper >
            <article className="px-3">
                <Card className="bg-white/10 border-0" >
                    <CardContent className="py-6">
                        <div className="text-center text-sm text-white mb-4 space-y-2">
                            <p>
                                {userApiUsageLimitCount} / {FREE_LIMIT_RANGE} Free Credits
                            </p>
                            <Progress
                                className="h-2"
                                value={(userApiUsageLimitCount / FREE_LIMIT_RANGE) * 100}
                            />
                        </div>
                        <Button className="w-full" >
                            Upgrade
                            <Zap className="w-4 h-4 ml-2 fill-white" />
                        </Button>
                    </CardContent>
                </Card>
            </article>
        </ClientWrapper>

    )
}

export default ApiUsageLimitCountDisplayer;