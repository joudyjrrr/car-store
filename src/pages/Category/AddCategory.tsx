import RHFInputFile from "@/components/hook-form/RHFInputFile";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

const AddCategory: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const form = useForm();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form className="flex flex-col">
            <RHFTextField
              control={form.control}
              name=""
              label="اسم الصنف"
              placeholder="اسم الصنف"
            />
            <RHFInputFile
              setValue={form.setValue}
              control={form.control}
              name=""
              label="اضافة صورة للصنف"
              watch={form.watch}
            />
            <Button>حفظ</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
