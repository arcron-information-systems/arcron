const OutlineText = ({
  text,
  size = "lg",
  mb = true,
  as: Tag = "h2",
}: {
  text: string;
  size?: "sm" | "md" | "lg" | string;
  mb?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  const sizeClass =
    size === "sm"
      ? "text-2xl"
      : size === "md"
        ? "text-4xl"
        : size === "lg"
          ? "text-6xl"
          : size;
  const mbClass = mb ? "mb-8 " : "";
  return (
    <Tag
      style={{
        WebkitTextStroke: "1px var(--primarylight)",
      }}
      className={`${mbClass}${sizeClass} outline-text tracking-wider text-uppercase font-['MixCase'] text-transparent`}
    >
      {"//"}
      {text}
    </Tag>
  );
};

export default OutlineText;
