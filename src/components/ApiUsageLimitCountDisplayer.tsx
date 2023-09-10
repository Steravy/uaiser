'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUpgradeToProModal } from "@/hooks/useUpgradeToProModal";
import { FREE_LIMIT_RANGE } from "@/lib/constants";
import { Zap } from "lucide-react";
import ClientWrapper from "./ClientWrapper";

interface ApiUsageLimitCountDisplayerProps {

    userApiUsageLimitCount: number;
    isProMember: boolean;
}

const ApiUsageLimitCountDisplayer: React.FC<ApiUsageLimitCountDisplayerProps> = ({ userApiUsageLimitCount = 0, isProMember = false }) => {

    const proModal = useUpgradeToProModal();

    if (isProMember) return null;

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
                        <Button
                            variant="premium"
                            className="w-full"
                            onClick={proModal.onOpen}
                        >
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