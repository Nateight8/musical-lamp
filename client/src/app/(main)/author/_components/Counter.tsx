import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

interface CounterProps {
  className?: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function Counter({ className, count, setCount }: CounterProps) {
  function onClick(adjustment: number) {
    setCount(count + adjustment);
  }
  return (
    <div className={cn("grid items-start gap-4 w-full", className)}>
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={() => onClick(-10)}
          disabled={count <= 0}
        >
          <MinusIcon className="h-4 w-4" />
          <span className="sr-only">Decrease</span>
        </Button>
        <div className="flex-1 text-center">
          <div className="text-7xl font-bold tracking-tighter">{count}</div>
          <div className="text-[0.70rem] uppercase text-muted-foreground">
            in stock
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={() => onClick(10)}
          disabled={count >= 400}
        >
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
    </div>
  );
}
