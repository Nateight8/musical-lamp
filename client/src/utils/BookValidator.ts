import { z } from "zod";

export const BookValidator = z.object({
  title: z.string().min(2, {
    message: "Product name is required.",
  }),
  genre: z.string().min(1, {
    message: "category is required.",
  }),
  author: z.string().min(2, { message: "required" }),
  description: z.string().min(2, {
    message: "Product description is required.",
  }),
  pdf: z.string().min(2, { message: "required" }),
  language: z.string().min(2, { message: "required" }),
  date: z.string().min(2, { message: "required" }),
  order: z.string().min(2, { message: "required" }),
  price_hard: z.string().min(2, { message: "required" }),
  sku: z.string().min(2, { message: "required" }),
  price_digital: z.string().min(2, { message: "required" }),
  stock: z.string().min(2, { message: "required" }),
  dimension: z.string().min(2, { message: "required" }),
  weight: z.string().min(2, { message: "required" }),
  shipping: z.string().min(2, { message: "required" }),
});

export type TBookValidator = z.infer<typeof BookValidator>;

export const bookDefaultValues = {
  title: "",
  genre: "",
  author: "",
  description: "",
  pdf: "",
  language: "",
  date: "",
  order: "",
  price_hard: "",
  sku: "",
  price_digital: "",
  stock: "",
  dimension: "",
  weight: "",
  shipping: "",
};
// publication date, format,

export interface FieldSchema {
  id: string;
  value: string;
}

export type useFormReturnTypes = {
  countries: string[];
  date: Date;
  dimension: { height: string; width: string; breadth: string };
  file: string;
  available?: boolean | undefined;
  stock: number;
};
