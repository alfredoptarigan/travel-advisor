export default function DashboardHome() {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
        <span className="text-muted-foreground">Total Users</span>
      </div>
      <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
        <span className="text-muted-foreground">Total Places</span>
      </div>
      <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
        <span className="text-muted-foreground">Total Reviews</span>
      </div>
      <div className="col-span-3 h-[500px] rounded-xl bg-muted/50 flex items-center justify-center">
        <span className="text-muted-foreground">Analytics Chart Placeholder</span>
      </div>
    </div>
  );
}
