// ─────────────────────────────────────────────
//  Reusable Avatar / Profile Component
//  Usage:
//    import Avatar from "./Avatar";
//    <Avatar name="Alice Thompson" size="md" status="online" />
//    <Avatar src="/photo.jpg" name="John" size="lg" />
// ─────────────────────────────────────────────

export default function Avatar({ src, name, size = "md", status }) {
  const sizes = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-14 h-14 text-lg",
  };

  const initials = name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Generate a consistent bg color from name
  const colors = [
    "bg-emerald-100 text-emerald-700",
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-orange-100 text-orange-700",
    "bg-pink-100 text-pink-700",
    "bg-teal-100 text-teal-700",
    "bg-indigo-100 text-indigo-700",
    "bg-rose-100 text-rose-700",
  ];
  const colorIndex =
    name
      ? name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length
      : 0;
  const colorClass = colors[colorIndex];

  const statusColors = {
    online: "bg-emerald-500",
    busy: "bg-yellow-400",
    offline: "bg-gray-300",
  };

  return (
    <div className="relative inline-flex shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizes[size]} rounded-full object-cover ring-2 ring-white`}
        />
      ) : (
        <div
          className={`${sizes[size]} ${colorClass} rounded-full font-bold flex items-center justify-center ring-2 ring-white`}
        >
          {initials}
        </div>
      )}
      {status && statusColors[status] && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${statusColors[status]}`}
        />
      )}
    </div>
  );
}