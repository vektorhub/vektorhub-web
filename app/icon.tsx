import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 30% 25%, rgba(255,148,77,0.35), transparent 28%), linear-gradient(180deg, #0b1220 0%, #0e1729 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            borderRadius: 112,
            border: "8px solid rgba(255,255,255,0.08)",
            boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.04)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            transform: "translateY(-4px)",
          }}
        >
          <div
            style={{
              width: 72,
              height: 260,
              background: "linear-gradient(180deg, #1f78ff 0%, #0f4fd9 100%)",
              transform: "skew(-22deg)",
              borderRadius: 12,
              boxShadow: "0 16px 32px rgba(15,79,217,0.35)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 168,
                height: 42,
                background: "linear-gradient(90deg, #ff6a00 0%, #ff8c3a 100%)",
                transform: "skew(-32deg)",
                borderRadius: 12,
                boxShadow: "0 12px 26px rgba(255,106,0,0.4)",
              }}
            />
            <div
              style={{
                width: 168,
                height: 42,
                background: "linear-gradient(90deg, #ff6a00 0%, #ff8c3a 100%)",
                transform: "skew(32deg)",
                borderRadius: 12,
                boxShadow: "0 12px 26px rgba(255,106,0,0.34)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}
