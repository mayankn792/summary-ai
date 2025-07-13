"use client";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { deleteSummaryAction } from "@/actions/summary-action";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

interface DeleteButtonProps {
  summaryId: string;
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    const result = await deleteSummaryAction({ summaryId });
    console.log(result);
    if (!result.success) {
      toast.error("Failed to delete summary.");
    }
    toast.success("Summary deleted successfully.");
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="border rounded text-gray-500 border-gray-200 bg-gray-200 hover:text-red-600 hover:bg-rose-100"
        >
          <Trash2 className="w-4 h-4"></Trash2>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"ghost"}
            className="border rounded text-gray-500 border-gray-200 bg-gray-200 hover:text-gray-600 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            className="border rounded  border-gray-200 bg-gray-200 text-red-600 hover:text-white hover:bg-rose-600"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
      <Toaster></Toaster>
    </Dialog>
  );
}
