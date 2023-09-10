'use client';

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscriptionManagerButtonProps {
    isProMember: boolean;
}

const SubscriptionManagerButton: React.FC<SubscriptionManagerButtonProps> = ({ isProMember = false }) => {

    const [isLoading, setLoading] = useState<boolean>(false);
    const handleManageSubscriptions = async () => {

        try {

            setLoading(true);

            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;

        } catch (error: any) {

            console.log("BILLING ERROR", error);
            toast.error("Something went wrong!");
        } finally {

            setLoading(false);
        }

    }

    return (

        <Button onClick={handleManageSubscriptions} disabled={isLoading} variant={isProMember ? "default" : "premium"}>
            {isProMember ? "Manage Subscriptions" : "Upgrade to Premium"}
            {!isProMember && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}

export default SubscriptionManagerButton;