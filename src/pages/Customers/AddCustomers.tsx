import RHFInputFile from "@/components/hook-form/RHFInputFile";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

const AddCustomers: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const form = useForm();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[50rem]">
        <Form {...form}>
          <form>
            <h1 className="text-center text-xl">اضافة زبون جديد</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <RHFTextField
                  control={form.control}
                  name=""
                  label="رقم التليفون"
                  placeholder="رقم التليفون"
                />
                <RHFTextField
                  control={form.control}
                  name=""
                  label="الايميل"
                  placeholder="الايميل"
                />
              </div>
              <div className="flex flex-col">
                <RHFTextField
                  control={form.control}
                  name=""
                  label="الاسم"
                  placeholder="الاسم"
                />
                <RHFTextField
                  control={form.control}
                  name=""
                  label="كلمة السر"
                  placeholder="كلمة السر"
                  type="password"
                />
              </div>
              <RHFInputFile
                control={form.control}
                watch={form.watch}
                setValue={form.setValue}
                label="اضافة صورة للزبون"
                name=""
              />
            </div>

            <div className="flex gap-4 my-4 w-full">
              <Button className="w-full">حفظ</Button>
              <Button className="w-full" variant={"cancel"}>
                إلغاء
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomers;
