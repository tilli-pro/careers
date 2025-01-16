const SpinningSphere: React.FC<{ size?: number }> = ({ size = 50 }) => {
  return (
    <div
      className="relative z-0 bg-blue-500/50"
      style={{
        height: size,
        width: size,
        borderRadius: size,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="will-change-auto"
        style={{
          height: size,
          width: size,
          borderRadius: size,
          transformStyle: "preserve-3d",
          transform: "rotateX(-30deg) rotateY(15deg) rotateZ(-15deg)",
        }}
      >
        {new Array(30).fill(0).map((_, i) => (
          <div
            className="absolute inset-0"
            key={`long-${i.toString()}`}
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${i * 12}deg)`,
            }}
          >
            <div
              className="animate-globe border border-blue-500 will-change-auto dark:border-blue-300"
              style={{
                height: size,
                width: size,
                borderRadius: size,
                transformStyle: "preserve-3d",
              }}
            />
          </div>
        ))}

        <div
          className="absolute inset-0"
          style={{
            width: size,
            height: size,
            borderRadius: size,
            transformStyle: "preserve-3d",
            transform: "rotateX(90deg)",
          }}
        >
          <div className="absolute inset-0 rounded-full border border-blue-500/50 bg-blue-500/10 dark:border-blue-300" />
        </div>

        <div
          className="absolute inset-0"
          style={{
            width: size,
            height: size,
            borderRadius: size,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute inset-0 rounded-full border border-blue-500/50 bg-black/10 dark:border-blue-300" />
        </div>
      </div>
    </div>
  );
};

export default SpinningSphere;
