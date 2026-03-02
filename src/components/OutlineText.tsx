const OutlineText = ({
  text,
  size = "lg",
  mb = true,
}: {
  text: string;
  size?: "sm" | "md" | "lg" | string;
  mb?: boolean;
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
    <h2
      style={{
        WebkitTextStroke: "1px var(--primarylight)",
      }}
      className={`${mbClass}${sizeClass} outline-text tracking-wider text-uppercase font-['MixCase'] text-transparent`}
    >
      {"//"}
      {text}
    </h2>
  );
};

export default OutlineText;
