import { useItemsStore } from "@/store/useItemsStore";
import { Card, CardContent } from "./ui/card";
import { ItemRow } from "./ItemRow";

export const ItemsList = () => {
    const items = useItemsStore((state) => state.items);

    if (items.length === 0) return null;

    return (
        <Card className="w-full">
            <CardContent className="p-0">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 mt-4 mx-4 text-sm font-medium text-gray-500 rounded-t-xl bg-gray-100">
                    <div className="col-span-6">Item</div>
                    <div className="col-span-2">Unit</div>
                    <div className="col-span-2">Labor Unit Rate</div>
                    <div className="col-span-2"></div>
                </div>

                <div className="flex flex-col mx-4 border-2 rounded-b-xl border-gray-100">
                    {items.map((item) => (
                        <div key={item.id} className="group">
                            <ItemRow item={item} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
