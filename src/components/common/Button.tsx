import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const button = cva(['font-semibold', 'rounded-[10px]', 'p-2'], {
  variants: {
    intent: {
      primary: ['bg-red-550', 'text-white', 'hover:bg-red-hover'],
      outlined: ['bg-white', 'border-red-550', 'border-1', 'text-red-550'],
    },
    size: { small: ['py-1', 'px-2'], medium: ['py-2', 'px-3'] },
    disabled: { false: null, true: ['opacity-50', 'cursor-not-allowed'] },
  },
  compoundVariants: [],
  defaultVariants: { intent: 'primary', size: 'small', disabled: false },
});

type ButtonProps = VariantProps<typeof button> & ComponentProps<'button'>;

const Button = ({
  intent,
  size,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(button({ intent, size, disabled }), className)}
    />
  );
};

export default Button;
