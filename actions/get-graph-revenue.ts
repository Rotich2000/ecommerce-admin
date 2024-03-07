import prismadb from "@/lib/prismadb"

interface GraphData {
    name: string;
    total: number;
}

export const getGraphRevenue = async(storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    const monthlyRevenue: {[key: number]: number} = {}

    for(const order of paidOrders){
        const month = order.createdAt.getMonth();
        let revenueForOrder = 0

        for (const item of order.orderItems){
            revenueForOrder += item.product.price;
        }

        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    const graphdata: GraphData[] = [
        {name: "Jan", total: 500},
        {name: "Feb", total: 589},
        {name: "Mar", total: 1020},
        {name: "Apr", total: 478},
        {name: "May", total: 672},
        {name: "Jun", total: 1050},
        {name: "Jul", total: 872},
        {name: "Aug", total: 530},
        {name: "Sep", total: 200},
        {name: "Oct", total: 760},
        {name: "Nov", total: 435},
        {name: "Dec", total: 0},
    ]

    for (const month in monthlyRevenue){
        graphdata[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }

    return graphdata;
}