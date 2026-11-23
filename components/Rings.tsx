export default function Rings({ className = "" }: { className?: string }) {
  return (
    <span className={`rings ${className}`.trim()} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
