import { cn } from "@/lib/utils";
import { useItemsStore, type Item, type UnitType } from "@/store/useItemsStore";
import { useState } from "react";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@radix-ui/react-select";
import { UNIT_OPTIONS } from "@/schemas/formSchemas";
import { SelectItem } from "./ui/select";
import { Button } from "./ui/button";
import { Check, Pencil, X } from "lucide-react";

import { PREDEFINED_ITEMS } from "@/components/AddItemForm";
import { CreatableCombobox } from "./CreatableCombox";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";

export const ItemRow = ({ item }: { item: Item }) => {
    const { removeItem, updateItem } = useItemsStore();
    const [isEditing, setIsEditing] = useState(false);

    const [tempData, setTempData] = useState({
        name: item.name,
        unit: item.unit,
        rate: item.rate.toString(),
    });

    const handleSave = () => {
        const rateNumber = parseFloat(tempData.rate);
        if (!rateNumber || isNaN(rateNumber) || rateNumber < 0) return;

        updateItem(item.id, {
            name: tempData.name,
            unit: tempData.unit,
            rate: rateNumber,
        });
        setIsEditing(false);
    };

    const handleDelete = () => {
        removeItem(item.id);
    };

    const enableEditMode = () => {
        if (!isEditing) {
            setIsEditing(true);

            setTempData({
                name: item.name,
                unit: item.unit,
                rate: item.rate.toString(),
            });
        }
    };

    return (
        <div
            onDoubleClick={enableEditMode}
            className={cn(
                "grid grid-cols-1 gap-3 p-4 bg-white mb-3 md:grid-cols-12 md:gap-4 md:p-4 md:shadow-none md:mb-0 md:bg-transparent md:items-center",
                isEditing
                    ? "bg-white shadow-sm z-10 relative"
                    : "hover:bg-blue-100/50 cursor-pointer",
            )}
        >
            <div className="md:col-span-6 w-full">
                <span className="md:hidden text-xs font-bold text-gray-500 tracking-wider mb-1 block">
                    Item Name
                </span>
                {isEditing ? (
                    <CreatableCombobox
                        value={tempData.name}
                        onChange={(val) => {
                            setTempData({ ...tempData, name: val });
                        }}
                        options={PREDEFINED_ITEMS}
                    />
                ) : (
                    <span className="font-medium text-gray-800 md:px-3 md:py-2">
                        {item.name}
                    </span>
                )}
            </div>

            <div className="md:col-span-2">
                <span className="md:hidden text-xs font-bold text-gray-500 tracking-wider mb-1 block">
                    Unit
                </span>
                {isEditing ? (
                    <Select
                        value={tempData.unit}
                        onValueChange={(val) =>
                            setTempData({ ...tempData, unit: val as UnitType })
                        }
                    >
                        <SelectTrigger className="h-9 w-full bg-white shadow-sm flex items-center">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 rounded-b-sm z-10 border-gray-200">
                            {UNIT_OPTIONS.map((unit) => (
                                <SelectItem
                                    key={unit}
                                    value={unit}
                                    className="hover:cursor-pointer hover:bg-grey-100"
                                >
                                    {unit}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <span className="text-gray-600 md:px-3 md:py-2 flex items-center">
                        <span className="md:hidden bg-gray-100 text-xs px-2 py-1 rounded mr-2">
                            Type:
                        </span>
                        {item.unit}
                    </span>
                )}
            </div>

            <div className="md:col-span-2">
                <span className="md:hidden text-xs font-bold text-gray-500 tracking-wider mb-1 block">
                    Labor Unit Rate
                </span>
                {isEditing ? (
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                            $
                        </span>
                        <Input
                            type="number"
                            value={tempData.rate}
                            onChange={(e) =>
                                setTempData({
                                    ...tempData,
                                    rate: e.target.value,
                                })
                            }
                            className="h-9 pl-5 no-spinner"
                        />
                    </div>
                ) : (
                    <span className="font-bold text-gray-800 md:font-normal md:text-gray-600 md:px-3 md:py-2">
                        $ {Number(item.rate).toFixed(2)}
                    </span>
                )}
            </div>

            {isEditing ? (
                <div className="md:col-span-2 flex items-center justify-end md:justify-start gap-1 h-9">
                    <Button
                        onClick={handleSave}
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100"
                        title="Save changes"
                    >
                        <Check className="w-4 h-4" />
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                <X className="w-4 h-4" />{" "}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be canceled. This will
                                    permanently delete
                                    <span className="font-bold text-foreground">
                                        {" "}
                                        "{item.name}"{" "}
                                    </span>
                                    from your list.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            ) : (
                <>
                    <Button
                        onClick={enableEditMode}
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 text-blue-500 hover:text-blue-700 hover:bg-blue-50 md:hidden"
                        title="Edit Item"
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>
                </>
            )}
        </div>
    );
};
