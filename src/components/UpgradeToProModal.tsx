'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUpgradeToProModal } from "@/hooks/useUpgradeToProModal";
import { tools } from "@/lib/constants";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Check, Zap } from "lucide-react";
import ClientWrapper from "./ClientWrapper";
import { Card } from "./ui/card";


type Props = {}

const UpgradeToProModal = (props: Props) => {

    const proModal = useUpgradeToProModal();

    const handleSubscriptions = async () => {

        try {

            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch (error) {

            console.log(error, "STRIPE ERROR");
        }
    }

    return (

        <ClientWrapper>
            <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex flex-col items-center justify-center gap-y-4 pb-2" >
                            <div className="flex items-center gap-x-2 font-bold py-1" >
                                Upgrade Uaiser to
                                <Badge variant={"premium"} className="uppercase text-sm py-1">
                                    pro
                                </Badge>
                            </div>
                        </DialogTitle>
                        <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium ">
                            {
                                tools.map(tool => (
                                    <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between " >
                                        <article className="flex items-center gap-x-4" >
                                            <div className={cn("p-2 rounded-md ", tool.bgColor)}>
                                                <tool.icon className={cn("w-6 h-6", tool.color)} />
                                            </div>
                                            <p className="font-semibold text-sm" >{tool.label}</p>
                                        </article>
                                        <Check className="text-primary w-5 h-5" />
                                    </Card>
                                ))
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            size="lg"
                            variant="premium"
                            className="w-full focus:outline-0 focus:border-0"
                        >
                            Upgrade
                            <Zap className="w-4 h-4 ml-2 fill-white" />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ClientWrapper>
    )
}

export default UpgradeToProModal;