
import { PageContainer } from "@/components/containers";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FaStar } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
const ShowProduct = () => {
  return (
    <PageContainer breadcrumb={[{ title: "تفاصيل المنتج" }]}>
      <div className="flex gap-8 items-start ">
        <div className="flex flex-col gap-4 w-full ">
          <img src="/src/assets/image/View.png" />
          <div className="flex gap-6">
            <img src="/src/assets/image/View 1.png" />
            <img src="/src/assets/image/View 2.png" />
            <img src="/src/assets/image/View 3.png" />
          </div>
          <div className="bg-white p-4 rounded-lg flex justify-between shadow items-center">
            <p>Status</p>
            <Switch dir="ltr" checked />
          </div>
        </div>
        <div className="flex flex-col w-full h-full gap-4">
          <div className="bg-white rounded shadow p-4 flex flex-col gap-2 ">
            <h1 className="text-2xl font-semibold">Nissan GT - R</h1>
            <div className="flex gap-1">
              <div className="flex items-center">
                <FaStar className="text-[#FBAD39]" />
                <FaStar className="text-[#FBAD39]" />
                <FaStar className="text-[#FBAD39]" />
                <FaStar className="text-[#FBAD39]" />
                <FaStar className="text-[#FBAD39]" />
              </div>
              <p className="text-sm text-gray-500">440+ Reviewer</p>
            </div>
            <p className="text-gray-600 text-lg mt-4">
              A Henley shirt is a collarless pullover shirt, by a round neckline
              and a placket about 3 to 5 inches (8 to 13 cm) long and usually
              having 2–5 buttons, In Stock Winter Women's Outdoor Jacket{" "}
            </p>
            <div className="flex flex-col ">
              <p>The remaining quantity: 16</p>
              <p>Minimum quantity limit for alert: 12</p>
              <p>Store status: Appears in store</p>
              <p>Brands: KIA</p>
              <p>Source: external</p>
            </div>
            <div>
              <p>
                <span className="font-bold text-xl">$80.00/</span>{" "}
                <span className="text-gray-500">days</span>
              </p>
              <p className="font-bold text-gray-500">$100.00</p>
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <Button className="w-full">Edit</Button>
            <Button className="w-full" variant={"cancel"}>
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 my-12 flex justify-between w-full gap-2 ">
        <div className="flex flex-col items-center  justify-center gap-2 flex-grow">
          <div className="flex items-center gap-2 w-full">
            <ProgressBar
              completed={75}
              className="w-1/2"
              bgColor="#141718"
              baseBgColor="#EAECF0"
            />
            <p className="text-gray-500">Excellent</p>
          </div>
          <div className="flex items-center gap-2 w-full">
            <ProgressBar
              completed={60}
              className="w-1/2"
              bgColor="#141718"
              baseBgColor="#EAECF0"
            />
            <p className="text-gray-500">Good</p>
          </div>
          <div className="flex items-center gap-2 w-full">
            <ProgressBar
              completed={50}
              className="w-1/2"
              bgColor="#141718"
              baseBgColor="#EAECF0"
            />
            <p className="text-gray-500">Medium</p>
          </div>
          <div className="flex items-center gap-2 w-full">
            <ProgressBar
              completed={40}
              className="w-1/2"
              bgColor="#141718"
              baseBgColor="#EAECF0"
            />
            <p className="text-gray-500">Below average</p>
          </div>
          <div className="flex items-center gap-2 w-full">
            <ProgressBar
              completed={25}
              className="w-1/2"
              bgColor="#141718"
              baseBgColor="#EAECF0"
            />
            <p className="text-gray-500">weak</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center  justify-center text-center ">
          <h1 className="text-3xl">
            4.5/<span className="text-sm">5</span>
          </h1>
          <div className="flex items-center justify-center">
            <FaStar className="text-[#141718]" />
            <FaStar className="text-[#141718]" />
            <FaStar className="text-[#141718]" />
            <FaStar className="text-[#141718]" />
            <FaStar className="text-[#141718]" />
          </div>
          <p className="">Rating Number: 16</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default ShowProduct;
