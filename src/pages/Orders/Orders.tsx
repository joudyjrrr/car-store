import Status from "@/components/component/Status";
import { PageContainer } from "@/components/containers";
import { Table } from "@/components/ui/Layout";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import path from "../../assets/svgs/Path.svg";
import { SlArrowDown } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import { FaArrowRotateRight } from "react-icons/fa6";
import DatePickerDemo from "@/components/hook-form/RHFDatePicker";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table as TTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const data = [
  {
    id: "00001",
    name: "Jakob Saris",
    location: "Baghdad, Al-Amin Street",
    date: "04 Sep 2019",
    type: "Electric",
    status: "Completed",
    price: "$999.29",
    qty: "x1",
    disc: "5%",
  },
  {
    id: "00001",
    name: "Jakob Saris",
    location: "Baghdad, Al-Amin Street",
    date: "04 Sep 2019",
    type: "Electric",
    status: "Processing",
  },
  {
    id: "00001",
    name: "Jakob Saris",
    location: "Baghdad, Al-Amin Street",
    date: "04 Sep 2019",
    type: "Electric",
    status: "Rejected",
  },
  {
    id: "00001",
    name: "Jakob Saris",
    location: "Baghdad, Al-Amin Street",
    date: "04 Sep 2019",
    type: "Electric",
    status: "On Hold",
  },
  {
    id: "00001",
    name: "Jakob Saris",
    location: "Baghdad, Al-Amin Street",
    date: "04 Sep 2019",
    type: "Electric",
    status: "In Transit",
  },
];
const cols: TableColumn<any>[] = [
  {
    id: "name",
    name: "المعرف",
    cell: (row) => <div className="text-sm">{row.id}</div>,
  },
  {
    id: "name",
    name: "الاسم",
    cell: (row) => <div className="text-sm">{row.name}</div>,
  },
  {
    id: "name",
    name: "العنوان",
    cell: (row) => <div className="text-sm">{row.location}</div>,
  },
  {
    id: "name",
    name: "التاريخ",
    cell: (row) => <div className="text-sm">{row.date}</div>,
  },
  {
    id: "name",
    name: "السعر",
    cell: (row) => <div className="text-sm">{row.type}</div>,
  },
  {
    id: "name",
    name: "الحالة",
    cell: (row) => (
      <div>
        <Status variant={row.status} />
      </div>
    ),
  },
];
const Orders = () => {
  const [date, setDate] = React.useState<any>(new Date());
  const [selectedFilters, setSelectedFilters] = React.useState<any>([]);

  const handleFilterSelection = (filter: any) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(
        selectedFilters.filter((item: any) => item !== filter)
      );
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  const filterButtons = [
    { label: "Completed", value: "Completed" },
    { label: "Processing", value: "Processing" },
    { label: "Rejected", value: "Rejected" },
    { label: "On Hold", value: "On Hold" },
    { label: "In Transit", value: "In Transit" },
  ];
  const [expandedRows, setExpandedRows] = useState<any>();
  const handleRowExpand = (row: any) => {
    const isRowExpanded = expandedRows.includes(row.id);
    const newExpandedRows = isRowExpanded
      ? expandedRows.filter((id: any) => id !== row.id)
      : [...expandedRows, row.id];
    setExpandedRows(newExpandedRows);
  };
  const filteredData =
    selectedFilters.length > 0
      ? data.filter((item) => selectedFilters.includes(item.status))
      : data;

  const expandableRowsComponent = ({ data }: { data: any }) => (
    <>
      <TTable>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>السعر</TableHead>
            <TableHead>الكمية</TableHead>
            <TableHead>الوصف</TableHead>
            <TableHead>المجموع</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item?.price}</TableCell>
              <TableCell>{item.qty}</TableCell>
              <TableCell>{item.disc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TTable>
    </>
  );
  return (
    <PageContainer breadcrumb={[{ title: "الطلبيات" }]} className="overflow-x-hidden">
      <div className="bg-white my-8  max-md:flex-col max-md:w-fit cursor-pointer text-center   border border-gray-200 rounded-3xl flex justify-center items-center">
        <img src={path} className="w-14  h-14 border-e border-gray-200 p-4 max-md:hidden" />
        <p className="border-e w-full flex justify-center border-gray-200 p-4 max-md:justify-start">
          فتلرة حسب
        </p>
        <p className="border-e  border-gray-200 p-4 flex justify-between items-center">
          <DatePickerDemo
            date={date}
            setDate={setDate}
            className="border-none hover:bg-transparent w-fit"
          />
          {/* 14 Feb 2019
          <SlArrowDown size={14} /> */}
        </p>
        <p className="border-e w-full border-gray-200 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p className=" flex justify-between  items-center">
              حالة الطلبية
                <SlArrowDown size={14} />
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-70 p-4 rounded-xl">
              <h1>اختر حالة الطلبية</h1>
              <div className="grid grid-cols-3 my-6 gap-2 text-sm">
                {filterButtons.map((button: any) => (
                  <Button
                    key={button.value}
                    className={`text-xs rounded-xl px-6 py-4 bg-transparent hover:bg-secondary text-primary border border-gray-500 ${
                      selectedFilters.includes(button.value) &&
                      "bg-secondary border-secondary"
                    }`}
                    onClick={() => handleFilterSelection(button.value)}
                  >
                    {button.label}
                  </Button>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </p>
        <p className="border-e w-full border-gray-200 p-4 flex justify-between  items-center">
          حالة الطلبية
          <SlArrowDown size={14} />
        </p>
        <p className=" p-4 w-full flex gap-4  items-center text-[#EA0234]">
          <FaArrowRotateRight size={14} color="#EA0234" />
          اعادة تهيئة الفلتر
        </p>
      </div>
      <div className="w-full rounded-lg bg-white shadow">
        <DataTable
          columns={cols}
          data={data}
          responsive
          customStyles={{
            table: {
              style: {
                width:"100%",
                background: "#fff",
                overflowY:"hidden"
              },
            },
            headCells: {
              style: {
                color: "#969AA0",
                fontWeight: "400",
                fontSize: "12px",
                display: "flex",
                justifyContent: "center",
              },
            },
            cells: {
              style: {
                color: "#1D1F1F",
                fontWeight: "400",
                fontSize: "16px",
                display: "flex",
                justifyContent: "center",
              },
            },
          }}
          expandableRows
          expandableRowsComponent={expandableRowsComponent}
          onRowExpandToggled={handleRowExpand}
          selectableRowsHighlight
        />
      </div>
    </PageContainer>
  );
};

export default Orders;
