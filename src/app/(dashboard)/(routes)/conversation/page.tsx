import Heading from "@/components/Heading"
import { MessageSquare } from "lucide-react"

const ConversationToolPage = () => {

    return (

        <section>
            <Heading
                title='Chat with Uaiser AI'
                description="The most advanced Chat AI available"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
        </section>
    )
}

export default ConversationToolPage