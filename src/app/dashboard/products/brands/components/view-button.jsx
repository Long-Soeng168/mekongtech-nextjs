'use client'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button'
import { ScanEyeIcon } from 'lucide-react'

const ViewButton = () => {
    return (
        <TooltipProvider delayDuration={300}>
        <Tooltip >
          <TooltipTrigger asChild>
            <Button variant='ghost' className='text-gray-500' size='icon' onClick={() => console.log('clicked')}>
              <ScanEyeIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>
            <p>View</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
}

export default ViewButton
