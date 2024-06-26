import {
  ThemeColors,
  StyleTypes,
  TableProps,
  TestProps,
  Images,
  ModalStates,
} from "./shared";
import { CurrencyData, CurrencyFormData } from "./currency";
import { PayTypeData } from "./payType";
import { SupplierData } from "./supplier";
import { ProductCategoryData } from "./productCategory";
import { ServiceDepartmentData } from "./serviceDepartment";
import { ServiceData,ServiceForm } from "./service";
import { CustomerData,CustomerForm } from "./customer";
import { ProductData, ProductFormValues } from "./product";
import { UnitData, UnitFormValues } from "./unit";
import {CarMotorData,CarMotorForm} from './carMotor'
export type TResponse<
  DataType,
  isArray extends boolean | undefined = undefined
> = {
  IsSuccess: boolean;
  Message: string;
  data: isArray extends boolean ? DataType[] : DataType;
};
export type {
  ThemeColors,
  StyleTypes,
  TableProps,
  TestProps,
  ModalStates,
  Images,
  CurrencyData,
  PayTypeData,
  SupplierData,
  ProductCategoryData,
  CurrencyFormData,
  ServiceDepartmentData,
  ProductData,
  ProductFormValues,
  ServiceData,
  ServiceForm,
  CustomerData,
  CustomerForm,
  CarMotorForm,
  CarMotorData
};
