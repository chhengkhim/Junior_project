import { redirect } from "next/navigation";
import React from "react";
const page = () => {
  return <>{redirect("/feed")}</>;

};

export default page;
