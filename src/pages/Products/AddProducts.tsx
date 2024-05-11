import { Logo } from "@/assets/svgs";
import { PageContainer } from "@/components/containers";
import RHFInputFile from "@/components/hook-form/RHFInputFile";
import SelectFiled from "@/components/hook-form/RHFSelect";
import RHFSwitch from "@/components/hook-form/RHFSwitch";
import RHFTextArea from "@/components/hook-form/RHFTextArea";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Table } from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React from "react";
import { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { BiSolidTrashAlt } from "react-icons/bi";
const data = [
  {
    id: "1",
    name: "fuel shell Helix ",
    company: "kia",
    model: "bb",
    year: "2008",
    size: "1300cc",
  },
];
const cols: TableColumn<any>[] = [
  {
    id: "name",
    name: "المنتج",
    cell: (row) => (
      <div className="text-sm flex gap-2 items-center">
        <Logo width="50" height="50" /> {row.name}
      </div>
    ),
  },
  {
    id: "name",
    name: "شركة السيارة ",
    cell: (row) => <div className="text-sm">{row.company}</div>,
  },
  {
    id: "name",
    name: "موديل السيارة",
    cell: (row) => <div className="text-sm">{row.model}</div>,
  },
  {
    id: "name",
    name: "سنة الصنع",
    cell: (row) => <div className="text-sm">{row.year}</div>,
  },
  {
    id: "name",
    name: "حجم المحرك",
    cell: (row) => <div className="text-sm line-through">{row.size}</div>,
  },
  {
    id: "name",
    name: "التحكم",
    cell: (row) => (
      <BiSolidTrashAlt className={`text-destructive text-2xl  h-full p-1`} />
    ),
  },
];
const AddProducts = () => {
  const form = useForm();
  return (
    <PageContainer breadcrumb={[{ title: "اضافة منتج" }]}>
      <Form {...form}>
        <form>
          <div className="flex gap-8">
            <div className="flex flex-col w-full">
              <RHFTextField
                control={form.control}
                name="name"
                placeholder="اسم المنتج"
                label="اسم المنتج"
              />
              <SelectFiled
                label="الماركة"
                placeholder="الماركة"
                name="category"
                watch={form.watch}
                options={[{ id: "0", name: "t" }]}
                control={form.control}
              />
              <SelectFiled
                label="الصنف"
                name="category"
                placeholder="الصنف"
                watch={form.watch}
                options={[{ id: "0", name: "t" }]}
                control={form.control}
              />
              <RHFTextField
                control={form.control}
                name="name"
                placeholder="الباركود"
                label="الباركود"
              />
              <div className="bg-white my-6 p-4 rounded-lg flex justify-between shadow items-center">
                <p>Status</p>
                <RHFSwitch name="" control={form.control} checked />
              </div>
            </div>
            <div className="flex  flex-col w-full">
              <RHFInputFile
                control={form.control}
                name="mainimg"
                setValue={form.setValue}
                watch={form.watch}
                label="اضافة صورة رئيسية"
              />
              <div className="flex gap-2 w-full justify-between">
                <RHFInputFile
                  labelClasName="!text-xs"
                  className="w-full"
                  control={form.control}
                  name="mainimg"
                  setValue={form.setValue}
                  watch={form.watch}
                  label="اضافة صورة فرعية"
                />
                <RHFInputFile
                  className="w-full"
                  labelClasName="!text-xs"
                  control={form.control}
                  name="mainimg"
                  setValue={form.setValue}
                  watch={form.watch}
                  label="اضافة صورة فرعية"
                />
                <RHFInputFile
                  className="w-full"
                  labelClasName="!text-xs"
                  control={form.control}
                  name="mainimg"
                  setValue={form.setValue}
                  watch={form.watch}
                  label="اضافة صورة فرعية"
                />
              </div>
            </div>
          </div>
          <RHFTextArea
            trigger={form.trigger}
            control={form.control}
            name="name"
            placeholder="وصف المنتج هنا"
            label="الوصف"
          />
          <div className="bg-white px-6 my-6 py-2 flex flex-col gap-4 shadow rounded-lg">
            <div className="flex gap-4 w-full justify-center">
              <SelectFiled
                label="سنة الصنع"
                placeholder="سنة الصنع"
                name="category"
                watch={form.watch}
                options={[{ id: "0", name: "t" }]}
                control={form.control}
              />
              <SelectFiled
                label="حجم المحرك"
                placeholder="حجم المحرك"
                name="category"
                watch={form.watch}
                options={[{ id: "0", name: "t" }]}
                control={form.control}
              />
              <SelectFiled
                label="موديل السيارة"
                placeholder="موديل السيارة"
                name="category"
                watch={form.watch}
                options={[{ id: "0", name: "t" }]}
                control={form.control}
              />
              <SelectFiled
                label="شركة السيارة"
                placeholder="شركة السيارة"
                name="category"
                watch={form.watch}
                options={[{ id: "0", name: "t" }]}
                control={form.control}
              />
            </div>
            <div className="flex gap-2 justify-center w-full">
              <Button className="w-full">اضافة</Button>
              <Button className="w-full" variant={`outline`}>
                اعادة تهيئة
              </Button>
            </div>
          </div>
          <Table
            table={{
              columns: cols,
              data: data,
              
            }}
            background="transparent"
          />
          <div className="flex gap-2 my-6 justify-center w-full">
            <Button className="w-full">اضافة</Button>
            <Button className="w-full" variant={`cancel`}>
              الغاء
            </Button>
          </div>
        </form>
      </Form>
    </PageContainer>
  );
};

export default AddProducts;
