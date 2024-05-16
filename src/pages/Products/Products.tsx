import { Logo } from "@/assets/svgs";
import { PageContainer } from "@/components/containers";
import { Table } from "@/components/ui/Layout";
import React from "react";
import path from "../../assets/svgs/Path.svg";
import { TableColumn } from "react-data-table-component";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FaArrowRotateRight } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SelectFiled from "@/components/hook-form/RHFSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const data = [
  {
    id: "1",
    name: "fuel shell Helix ",
    category: "fual",
    price: "$690.00",
    discount: "120$",
  },
];

const Products = () => {
  const form = useForm();
  const navigate = useNavigate();
  const cols: TableColumn<any>[] = [
    {
      id: "name",
      name: "الصورة",
      cell: (row) => (
        <div className="text-sm">
          <Logo width="50" height="50" />
        </div>
      ),
    },
    {
      id: "name",
      name: "اسم المنتج ",
      cell: (row) => <div className="text-sm">{row.name}</div>,
    },
    {
      id: "name",
      name: "الصنف",
      cell: (row) => <div className="text-sm">{row.category}</div>,
    },
    {
      id: "name",
      name: "Price",
      cell: (row) => <div className="text-sm">{row.price}</div>,
    },
    {
      id: "name",
      name: "الحسم",
      cell: (row) => <div className="text-sm line-through">{row.discount}</div>,
    },
    {
      id: "name",
      name: "التحكم",
      cell: (row) => (
        <div className="bg-[#FAFBFD] border cursor-pointer  h-[30px] border-[#D5D5D5] rounded-lg flex items-center ">
          <FiEdit className=" text-gray-600 text-2xl  h-full p-1 border-e border-[#D5D5D5]" />
          <FaEye
            onClick={() => navigate(`/product/${row.id}`)}
            className=" text-gray-600 text-2xl  h-full p-1 border-e border-[#D5D5D5]"
          />
          <BiSolidTrashAlt
            className={`text-destructive text-2xl  h-full p-1`}
          />
        </div>
      ),
    },
  ];

  return (
    <PageContainer breadcrumb={[{ title: "Product Stock" }]} className="overflow-x-hidden">
      <div className="w-full flex justify-end">
        <Button onClick={() => navigate("/product/add")}>اضافة منتج</Button>
      </div>
      <Form {...form}>
      <div className="bg-white my-8  max-md:flex-col max-md:w-fit cursor-pointer text-center   border border-gray-200 rounded-3xl flex justify-center items-center">
      <img src={path} className="w-14  h-14 border-e border-gray-200 p-4 max-md:hidden" />
          <p className="border-e w-full flex justify-center border-gray-200 p-4 ">
            فلترة حسب
          </p>

          <div className="border-e w-full border-gray-200  flex justify-between  items-center">
            <SelectFiled
              Trigger={
                <p className=" flex justify-between text-black    items-center">
                  الصنف
                </p>
              }
              name="category"
              watch={form.watch}
              options={[{ id: "0", name: "t" }]}
              control={form.control}
              classNameValue="!border-none   items-center gap-4 "
            />
          </div>
          <div className="border-e w-full border-gray-200  flex justify-between  items-center">
            <SelectFiled
              Trigger={
                <p className=" flex justify-between text-black    items-center">
                  فلترة حسب الماركة
                </p>
              }
              name="category"
              watch={form.watch}
              options={[{ id: "0", name: "t" }]}
              control={form.control}
              classNameValue="!border-none   items-center gap-4 "
            />
          </div>
          <div className="border-e w-full border-gray-200  flex justify-between  items-center">
            <RHFTextField
              control={form.control}
              startAdornment={
                <IoIosSearch className="text-gray-600 text-2xl" />
              }
              name="name"
              placeholder="البحث"
              inputClassName="!border-none"
            />
          </div>
          <p className=" p-4 w-full flex gap-4  items-center text-[#EA0234]">
            <FaArrowRotateRight size={14} color="#EA0234" />
            اعادة تهيئة الفلتر
          </p>
        </div>
      </Form>
      <Table
        table={{
          columns: cols,
          data: data,
        }}
      />
    </PageContainer>
  );
};

export default Products;
