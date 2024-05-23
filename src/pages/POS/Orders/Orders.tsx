import { PageContainer } from "@/components/containers";
import { Table } from "@/components/ui/Layout";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TableColumn } from "react-data-table-component";
import AcceptOrder from "./AcceptOrder";
import { DeleteModal } from "@/components/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AcceptOrderTable from "./AcceptOrderTable";
import NotAcceptedTable from "./NotAcceptedTable";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import Map from "../Maps";

const Orders = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["get-Buy"],
    queryFn: async () => {
      const { data } = await axios.get(`/getBuy`);
      return data.data;
    },
  });
  const navigate = useNavigate()
  const cols: TableColumn<any>[] = [
    {
      id: "name",
      name: " العنوان ",
      cell: (row) => <div className="text-sm">{row.title}</div>,
    },
    {
      id: "name",
      name: "الوصف",
      cell: (row) => <div className="text-sm">{row.description}</div>,
    },
    {
      id: "name",
      name: "السعر الاجمالي",
      cell: (row) => <div className="text-sm">{row.total_price}</div>,
    },
    {
      id: "name",
      name: "الكلفة الاجمالية",
      cell: (row) => <div className="text-sm ">{row.total_cost}</div>,
    },
    {
      id: "name",
      name: "الحسم",
      cell: (row) => <div className="text-sm ">{row.discount}</div>,
    },
    {
      id: "name",
      name: "المورد",
      cell: (row) => <div className="text-sm ">{row.supplier.user.name}</div>,
    },
    {
      id: "name",
      name: "الحالة",
      cell: (row) => (
        <span
          className={`text-sm rounded-xl p-2 max-md:text-xs    text-white ${
            row.is_approved === 1 ? "bg-[#00B69B]/60 ]" : "bg-[#EF3826]/60 "
          }`}
        >
          {row.is_approved === 1 ? "مقبول" : "مرفوض"}
        </span>
      ),
    },
    {
      id: "name",
      name: "التحكم",
      cell: (row) => (
        <div className=" cursor-pointer  gap-2 flex items-center ">
          {/* <FiEdit onClick={()=>navigate(`/pos/${row.id}`)} className=" text-gray-600 text-xl" /> */}
          <AcceptOrder id={row.id} />
          <DeleteModal
            MassegeSuccess="تم الحذف بنجاح"
            apiPath={`/deleteOrder/${row.id}`}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
  return (
    <PageContainer
      breadcrumb={[{ title: "الطلبيات حسب المورد" }]}
      className="overflow-x-hidden"
    >
      <Tabs defaultValue="All" dir="rtl">
        <TabsList className="flex justify-start mb-8">
          <TabsTrigger value="All">الكل</TabsTrigger>
          <TabsTrigger value="accept">المقبول</TabsTrigger>
          <TabsTrigger value="notAcc">المرفوض</TabsTrigger>
        </TabsList>
        <TabsContent value="All">
          <Table
            table={{
              columns: cols,
              data: data?.data ?? [],
              loading: isFetching,
            }}
          />
        </TabsContent>
        <TabsContent value="accept">
          <AcceptOrderTable />
        </TabsContent>
        <TabsContent value="notAcc">
          <NotAcceptedTable />
        </TabsContent>
      </Tabs>
      {/* <Map/> */}
    </PageContainer>
  );
};

export default Orders;
