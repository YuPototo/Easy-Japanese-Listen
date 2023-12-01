import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/**
 * Why use `bntColor` instead of `color`?
 *   - becuase there would be type confict with html button type
 */

const buttonVariants = cva(
    `border inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50`,
    {
        variants: {
            btnColor: {
                orange: 'border-orange-600 hover:bg-orange-600/90',
                red: 'border-red-500 hover:bg-red-600/90',
                gray: 'border-gray-500 hover:bg-gray-600/90',
            },
            fill: {
                fill: '',
                outline: 'bg-transparent hover:text-foreground',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            btnColor: 'orange',
            fill: 'fill',
            size: 'default',
        },
        compoundVariants: [
            {
                fill: 'fill',
                btnColor: 'orange',
                className: 'bg-orange-600 ',
            },
            {
                fill: 'outline',
                btnColor: 'orange',
                className: 'text-orange-600',
            },
            {
                fill: 'fill',
                btnColor: 'red',
                className: 'bg-red-600',
            },
            {
                fill: 'outline',
                btnColor: 'red',
                className: 'text-red-600',
            },
            {
                fill: 'fill',
                btnColor: 'gray',
                className: 'bg-gray-600 ',
            },
            {
                fill: 'outline',
                btnColor: 'gray',
                className: 'text-gray-600 ',
            },
        ],
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, btnColor, fill, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(
                    buttonVariants({ btnColor, fill, size, className }),
                )}
                ref={ref}
                {...props}
            />
        )
    },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
