'use client'
import Embed from "@/components/embed";
import { Form } from "./form/page";
import { useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import Rightbar from "@/components/rightbar/rightbar";
// import Hritik from "./hritik/page";

export default function Home() {
  useEffect(() => {
    import('preline')
  }, [])
  return (
    <>
    
    <Navbar />

      <Form />
      <Embed />

      <Rightbar />
    </>

  );

}
