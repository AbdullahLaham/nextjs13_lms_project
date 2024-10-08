"use client"

import {Card, CardTitle, CardHeader, CardContent} from '@/components/ui/card'
// import { formatPrice } from '@/lib/format';

interface DataCardProps {
    value: number | undefined;
    label: string;
    shouldFormat?: boolean;
}

export const DataCard = ({value, label, shouldFormat}: DataCardProps) => {
 return (
    <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
            {label}
            </CardTitle>
            <CardContent className='text-2xl font-bold'>
                {shouldFormat ? `$${value}` : value}
            </CardContent>

        </CardHeader>
    </Card>
 )
}