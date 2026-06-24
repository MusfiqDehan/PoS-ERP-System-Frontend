"use client";

type Change = { text: string; dir: "up" | "down"; bg: string; color: string };
type Legend = { color: string; text: string };

type KpiCard = {
  label: string;
  value: string;
  accent: string;
  iconBg: string;
  icon: string;
  change?: Change;
  legend?: Legend[];
};

const cards: KpiCard[] = [
  {
    label: "Chain Revenue",
    value: "$1,092,550",
    accent: "#4687f4",
    iconBg: "#eff6ff",
    icon: "ti ti-chart-line",
    change: { text: "-11.2% vs Target", dir: "down", bg: "#fff0f0", color: "#c80000" },
  },
  {
    label: "Active Branches",
    value: "1/8",
    accent: "#0bdbae",
    iconBg: "#e7fbf7",
    icon: "ti ti-building-store",
    legend: [
      { color: "#247e46", text: "Open (07)" },
      { color: "#666", text: "Close (01)" },
    ],
  },
  {
    label: "Transactions",
    value: "2,338",
    accent: "#7364c2",
    iconBg: "#f2f3fb",
    icon: "ti ti-receipt",
    change: { text: "+5.2% vs Yesterday", dir: "up", bg: "#f1fcf5", color: "#237e46" },
  },
  {
    label: "Avg Basket Size",
    value: "$467",
    accent: "#ffc94d",
    iconBg: "#fffaeb",
    icon: "ti ti-shopping-cart",
    change: { text: "+1.1% vs Yesterday", dir: "up", bg: "#f1fcf5", color: "#237e46" },
  },
];

export default function KpiCards() {
  return (
    <div className="row g-3 mb-3">
      {cards.map((card) => (
        <div key={card.label} className="col-xl-3 col-sm-6 d-flex">
          <div
            className="card flex-fill mb-0 position-relative overflow-hidden"
            style={{
              border: `1px solid ${card.accent}`,
              borderTopWidth: 2,
              borderLeftWidth: 2,
              borderRadius: 8,
              padding: "16px 12px 16px 16px",
            }}
          >
            <div className="d-flex flex-column" style={{ gap: 12 }}>
              <p className="mb-0" style={{ color: "#666", fontSize: 16, fontWeight: 500, height: 19 }}>
                {card.label}
              </p>
              <h3
                className="mb-0 fw-semibold"
                style={{ color: card.accent, fontSize: 24, lineHeight: "32px" }}
              >
                {card.value}
              </h3>

              {card.change && (
                <span
                  className="d-inline-flex align-items-center justify-content-center gap-1 rounded align-self-start"
                  style={{
                    background: card.change.bg,
                    color: card.change.color,
                    fontSize: 14,
                    fontWeight: 500,
                    padding: "4px 16px 4px 8px",
                  }}
                >
                  <i className={card.change.dir === "up" ? "ti ti-arrow-up" : "ti ti-arrow-down"} />
                  {card.change.text}
                </span>
              )}

              {card.legend && (
                <div className="d-flex align-items-center align-self-start" style={{ gap: 8 }}>
                  {card.legend.map((item) => (
                    <span key={item.text} className="d-inline-flex align-items-center gap-1">
                      <span
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 2,
                          background: item.color,
                          display: "inline-block",
                        }}
                      />
                      <span style={{ color: "#666", fontSize: 12, fontWeight: 500 }}>{item.text}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <span
              className="position-absolute"
              style={{
                right: -28,
                top: "50%",
                transform: "translateY(-50%)",
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: card.iconBg,
              }}
            >
              <i
                className={card.icon}
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: card.accent,
                  fontSize: 24,
                }}
              />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
