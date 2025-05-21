import { cn } from "../../lib/utils";

interface AuthHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export function AuthHeader({
  title,
  description,
  className,
}: AuthHeaderProps) {
  return (
    <div className={cn("text-center", className)}>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}