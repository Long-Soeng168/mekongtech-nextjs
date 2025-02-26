"use client";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Filter from "./form/filter";
import { useState } from "react";

export function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="submit" variant="outline" size="icon" className="p-5">
          <FilterIcon />
        </Button>
      </DialogTrigger>
      {isOpen && <div className="fixed inset-0 bg-black/80 z-40" />}
      {/* Custom dark background */}
      <DialogContent className="z-50">
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <Filter />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
