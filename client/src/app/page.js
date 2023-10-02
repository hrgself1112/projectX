'use client'
import Embed from "@/components/embed";
import { Form } from "./form/page";
import { useEffect , useState } from "react";
import Navbar from "@/components/navbar/navbar";
import Rightbar from "@/components/rightbar/rightbar";
import CkEditorProjectX  from '@/components/ckEditor/ckEditorProjectX';
export default function Home() {
  const [editorData, setEditorData] = useState('');

  const handleEditorChange = (newData) => {
    setEditorData(newData);
  };


  useEffect(() => {
    import('preline')
  },
 [])
  return (
    <>

    <Navbar />

      <Form />

      <Rightbar />
    </>

  );

}
