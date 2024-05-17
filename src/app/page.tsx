import DataLoader from "@/components/load/data-loader";

export default async function Home() {

  return (<main className="flex flex-col gap-8 h-full">
    <h1 className="text-5xl pl-10 pt-6">
      Sistema de Carga de datos
    </h1>
    <div className="flex-grow m-14 rounded-2xl border-2 border-black">
      <DataLoader/>
    </div>
  </main>);
}
