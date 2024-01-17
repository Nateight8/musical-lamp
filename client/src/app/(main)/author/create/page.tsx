"use client";
import React from "react";
import { BookForm } from "../_components/BookForm";
import UpdateForm from "../_components/UpdateForm";
import Book from "../_components/Book";
import CreateBook from "../_components/CreateBook";
import BasicInfo from "../_components/BasicInfo";
import Radio from "../_components/Radio";
import Final from "../_components/Final";
import Shipping from "../_components/Shipping";
import { useStep } from "@/lib/hooks/use-steps";

type Props = {};

function Page({}: Props) {
  const { step } = useStep();
  return (
    <>
      {/* <BasicInfo /> */}
      {/* <CreateBook /> */}
      {/* <Final /> */}
      {/* <Book /> */}
      {/* <Radio /> */}

      {step === 0 && <Radio />}
      {step === 1 && <CreateBook />}
      {step === 2 && <Shipping />}
    </>
  );
}

export default Page;
