import Heading from '@/components/Heading';
import SubscriptionManagerButton from '@/components/SubscriptionManagerButton';
import { isUserSubscribed } from '@/providers/subscription-details';
import { Settings } from 'lucide-react';
import { FC } from 'react'

interface SettingsProps { }

const SettingsPage: FC<SettingsProps> = async (props: SettingsProps) => {

    const isProMember = await isUserSubscribed();

    return (

        <section>
            <Heading
                title="Settings"
                description='Manage and customize your account.'
                icon={Settings}
                iconColor='text-gray-700'
                bgColor='bg-gray-700/10'
            />
            <article className='px-4 lg:px-8 space-y-4'>
                <p className='text-muted-foreground text-sm' >
                    {isProMember ? 'Pro Member' : 'You currently have a free account.'}
                </p>
                <SubscriptionManagerButton isProMember={isProMember} />
            </article>
        </section>
    )
}

export default SettingsPage;