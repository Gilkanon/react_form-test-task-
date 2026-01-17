import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface CreatableComboboxProps {
    value?: string;
    onChange: (value: string) => void;
    options: readonly string[];
    placeholder?: string;
}

export function CreatableCombobox({
    value,
    onChange,
    options,
    placeholder = "Select or type...",
}: CreatableComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between font-normal bg-white",
                        "h-9",
                        !value && "text-muted-foreground",
                    )}
                >
                    <span className="truncate">{value || placeholder}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-50 md:w-75 p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder="Search or create..."
                        onValueChange={(val) => setInputValue(val)}
                    />
                    <CommandList>
                        <CommandEmpty>
                            <div
                                className="py-2 px-4 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground flex items-center gap-2"
                                onClick={() => {
                                    if (inputValue.trim()) {
                                        onChange(inputValue);
                                        setOpen(false);
                                    }
                                }}
                            >
                                <span className="text-muted-foreground text-xs">
                                    Create:
                                </span>
                                <span className="font-bold truncate">
                                    "{inputValue}"
                                </span>
                            </div>
                        </CommandEmpty>

                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option}
                                    value={option}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {option}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
