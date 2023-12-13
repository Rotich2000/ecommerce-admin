"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";

import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

type Props = {
  data: ColorColumn[];
}

const ColorsClient = ({data}: Props) => {
    const router = useRouter();
    const params = useParams();
  return (
    <>
    <div className="flex items-center justify-between">
        <Heading
        title={`Colors (${data.length})`}
        description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
            <Plus className="w-4 h-4 mr-2"/>
            Add New
        </Button>
    </div>
    <Separator/>
    <DataTable searchKey="name" columns={columns} data={data}/>
    <Heading
    title="API"
    description="API calls for colors"
    />
    <Separator/>
    <ApiList entityName="colors" entityIdName="colorId"/>
    </>
  )
}

export default ColorsClient;