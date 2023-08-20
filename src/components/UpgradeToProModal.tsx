'use client';

import { useUpgradeToProModal } from "@/hooks/useUpgradeToProModal";
import ClientWrapper from "./ClientWrapper"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";


type Props = {}

const UpgradeToProModal = (props: Props) => {

    const proModal = useUpgradeToProModal();

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

                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </ClientWrapper>
    )
}

export default UpgradeToProModal;