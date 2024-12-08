export function Stats() {
  return (
    <div className="border-y bg-muted/50">
      <div className=" grid grid-cols-2 gap-8 p-16 md:grid-cols-4">
        {[
          ["1M+", "Active Users"],
          ["500K+", "Challenges Solved"],
          ["100+", "Companies Hiring"],
          ["50K+", "Success Stories"],
        ].map(([value, label], index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center space-y-2"
          >
            <div className="text-3xl font-bold">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}