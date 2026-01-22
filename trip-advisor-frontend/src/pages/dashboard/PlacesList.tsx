import { Button } from "@/components/ui/button";

export default function PlacesList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Places Management</h1>
        <Button>Add New Place</Button>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground">
            This is where you will manage travel destinations.
          </p>
          {/* Placeholder for table */}
          <div className="h-64 rounded-md border border-dashed flex items-center justify-center">
            No places added yet.
          </div>
        </div>
      </div>
    </div>
  );
}
