'use client';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

export function ClipboardButton({}) {
  return (
    <Button
      variant='outline'
      size='default'
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
      }}
      className='gap-2'
    >
      <Copy size={16} />
      <span className='hidden sm:inline-block'>Copier le lien</span>
    </Button>
  );
}
