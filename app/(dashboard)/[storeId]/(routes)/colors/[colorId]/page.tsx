import prismadb from "@/lib/prismadb";

import ColorForm from "./components/color-form";

type Props = {
    params: {colorId: string}
}

const ColorPage = async({params}: Props) => {
    const {colorId} = params;
    const color = (colorId === "new") ? null : await prismadb.color.findUnique({
        where: {
            id: colorId
        }
    });
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color}/>
    </div>
    </div>
  )
}

export default ColorPage;