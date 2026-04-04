export const CustomBadge = ({
  children,
  href,
  name,
}: {
  children?: React.ReactNode;
  href: string;
  name: string;
}) => {
  return (
    <a
      target="_blank"
      style={{ textDecoration: "none" }}
      className="inline-flex  items-center no-underline text-sm bg-muted  border border-dashed dark:border-white/30 border-black/20 py-[3px] px-[6px] rounded-[6px] skill-inner-shadow self-end text-primary overflow-hidden"
      href={href}
    >
      {children && <div className=" shrink-0">{children}</div>}
      <p className={`${children ? "ml-1" : ""} text-sm font-bold`}>{name}</p>
    </a>
  );
};
