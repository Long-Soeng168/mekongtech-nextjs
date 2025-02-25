"use client";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { BASE_BACKEND_API_URL } from "@/config/env";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { clearCache } from "@/lib/clear-cache";

const StatusButton = ({ id, status }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateStatus = async (status) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${BASE_BACKEND_API_URL}categories/${id}/update_status?status=${status}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update status category"
        );
      }

      toast({
        title: "Update status successfully.",
        variant: "success",
      });
      clearCache("/dashboard/products/categories");
    } catch (err) {
      toast({
        title: `${err instanceof Error ? err.message : "Something went wrong"}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsOpen(false); // Close the dialog after submission
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger className="cursor-pointer" asChild>
              <Button
                variant="outline"
                className={status == 1 ? "text-green-600" : "text-red-400"}
                size="sm"
              >
                {status == 1 ? <p>Public</p> : <p>Not-Public</p>}
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Update Status</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure? Update ID : {id}</AlertDialogTitle>
          <AlertDialogDescription>
            This action will update your record status.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:space-y-0 space-y-2">
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleUpdateStatus(0)}
            disabled={isSubmitting}
            className="bg-destructive focus:ring-2 ring-offset-2 text-destructive-foreground"
          >
            {isSubmitting ? "Updating..." : "Not-Public"}
          </AlertDialogAction>
          <AlertDialogAction
            onClick={() => handleUpdateStatus(1)}
            disabled={isSubmitting}
            autoFocus
            className="bg-green-600 focus:ring-2 ring-offset-2 text-white"
          >
            {isSubmitting ? "Updating..." : "Public"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StatusButton;
