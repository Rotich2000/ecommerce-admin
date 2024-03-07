import prismadb from "@/lib/prismadb";

import SizeForm from "./components/size-form";

type Props = {
    params: {sizeId: string}
}

const SizePage = async({params}: Props) => {
    const {sizeId} = params;
    const size = (sizeId === "new") ? null : await prismadb.size.findUnique({
        where: {
            id: sizeId
        }
    });
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size}/>
    </div>
    </div>
  )
}

export default SizePage;