"use client";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditCategoryForm from "./form/edit";

const EditButton = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="text-primary"
                size="icon"
                onClick={() => console.log("clicked")}
              >
                <EditIcon />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {isOpen && <div className="fixed inset-0 bg-black/80 z-40" />}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <EditCategoryForm id={id} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
