import prismadb from "@/lib/prismadb";

import CategoryForm from "./components/category-form";

type Props = {
    params: {categoryId: string, storeId: string}
}

const CategoryPage = async({params}: Props) => {
    const {categoryId, storeId} = params;
    const category = (categoryId === "new") ? null : await prismadb.category.findUnique({
        where: {
            id: categoryId
        }
    });

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: storeId,
        }
    });

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards}/>
    </div>
    </div>
  )
}

export default CategoryPage;