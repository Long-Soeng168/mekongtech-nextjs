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

const DeleteButton = ({ id }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE_BACKEND_API_URL}categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete category");
      }

      toast({
        title: "Deleted successfully.",
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
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="text-destructive" size="icon">
                <Trash2Icon />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure? Delete ID : {id}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            category and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isSubmitting}
            autoFocus
            className="bg-destructive focus:ring-2 ring-offset-2 text-destructive-foreground"
          >
            {isSubmitting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
