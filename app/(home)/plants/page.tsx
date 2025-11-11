import { PlantDataTable } from "@/components/Plants/plant-datatable";


export default function PlantsPage() {
    return <div>
        <div className="w-full max-w-full py-4">
            <PlantDataTable data={[]} />
        </div>
    </div>
}