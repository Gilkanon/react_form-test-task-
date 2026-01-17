import { AddItemForm } from "./components/AddItemForm";
import { ItemsList } from "./components/ItemsList";

export function App() {
    return (
        <div className="min-h-screen bg-white text-white p-2 md:p-10 flex justify-center">
            <div className="w-full max-w-4xl space-y-6">
                <AddItemForm />
                <ItemsList />
            </div>
        </div>
    );
}

export default App;
