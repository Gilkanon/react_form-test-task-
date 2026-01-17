import {
    addItemSchema,
    UNIT_OPTIONS,
    type addItemFormValues,
} from "@/schemas/formSchemas";
import { useItemsStore } from "@/store/useItemsStore";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatableCombobox } from "./CreatableCombox";

export const PREDEFINED_ITEMS = [
    "Brick",
    "Drywall",
    "Labor",
    "Lumber",
    "Paint",
    "Plywood",
    "Roofing",
    "Steel",
    "Windows",
] as const;

export const AddItemForm = () => {
    const addItem = useItemsStore((state) => state.addItem);

    const form = useForm<addItemFormValues>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(addItemSchema) as any,
        defaultValues: {
            name: "",
            unit: UNIT_OPTIONS[0],
            rate: 0,
        },

        mode: "onChange",
    });

    const { isValid } = form.formState;

    const onSubmit = (data: addItemFormValues) => {
        addItem(data);
        form.reset({ name: "", unit: UNIT_OPTIONS[0], rate: 0 });
    };

    return (
        <Card className="w-full shadow-md border-none">
            <CardHeader>
                <CardTitle className="text-sm xl:text-lg font-bold">
                    Primary Items
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="md:col-span-6">
                                    <FormLabel>Select Item</FormLabel>
                                    <FormControl>
                                        <CreatableCombobox
                                            value={field.value}
                                            onChange={field.onChange}
                                            options={PREDEFINED_ITEMS}
                                            placeholder="Select or type..."
                                        />
                                    </FormControl>{" "}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="unit"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2 ">
                                    <FormLabel>Unit</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full bg-white border-2 rounded-md border-gray-200 shadow-sm flex items-center">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {UNIT_OPTIONS.map((unit) => (
                                                <SelectItem
                                                    key={unit}
                                                    value={unit}
                                                >
                                                    {unit}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rate"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Labor Unit Rate</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2.5 text-gray-500 text-sm font-medium">
                                                $
                                            </span>
                                            <Input
                                                type="number"
                                                className="pl-7 h-9 no-spinner"
                                                placeholder="0"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="md:col-span-2 text-white text-sm xl:text-lg">
                            <button
                                type="submit"
                                disabled={!isValid}
                                className={cn(
                                    "h-9 w-full flex items-center justify-center text-white",
                                    isValid
                                        ? "bg-green-500 hover:bg-green-600"
                                        : "bg-gray-300 cursor-not-allowed text-gray-500 hover:bg-gray-300",
                                )}
                            >
                                Add Item
                            </button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
