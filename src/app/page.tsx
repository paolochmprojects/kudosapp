import DataLoader from "@/components/load/data-loader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  if(!cookies().get('token')){
    redirect('/login')
  }

  return (<main className="flex flex-col gap-8 h-full">
    <h1 className="text-5xl pl-10 pt-6">
      Sistema de Carga de datos
    </h1>
    <div className="flex-grow mb-14 mx-14 rounded-2xl border-2 border-black">
      <DataLoader/>
    </div>
  </main>);
}
