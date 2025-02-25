"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateCategoryForm from "./form/create";

const AddNewButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add New
        </Button>
      </DialogTrigger>
      {isOpen && <div className="fixed inset-0 bg-black/80 z-40" />}
      {/* Custom dark background */}
      <DialogContent className="z-50">
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <CreateCategoryForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewButton;
