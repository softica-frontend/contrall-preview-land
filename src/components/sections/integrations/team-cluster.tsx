import { getTranslations } from "next-intl/server";
import { TeamIcon } from "@/components/icons/integrations-icons";

const TEAM_ROLES = [
  { key: "analyst" as const, icon: "\u{1F4CA}", angle: -40, radius: 110 },
  { key: "manager" as const, icon: "\u{1F4CB}", angle: 90, radius: 110 },
  { key: "owner" as const, icon: "\u{1F464}", angle: 220, radius: 110 },
];

export async function TeamCluster() {
  const t = await getTranslations("Integrations");

  return (
    <div className="relative mb-[24px] h-[240px] w-[240px]">
      {/* Central circle */}
      <div className="absolute left-1/2 top-1/2 flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#2575ff]">
        <TeamIcon />
      </div>

      {/* Role circles */}
      {TEAM_ROLES.map((role) => {
        const rad = (role.angle * Math.PI) / 180;
        const x = Math.cos(rad) * role.radius;
        const y = Math.sin(rad) * role.radius;
        return (
          <div
            key={role.key}
            className="absolute left-1/2 top-1/2 flex flex-col items-center gap-[4px]"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#dbeafe] text-[18px]">
              {role.icon}
            </div>
            <span className="rounded-[8px] bg-[#eff6ff] px-[8px] py-[2px] text-[11px] font-semibold text-[#2575ff]">
              {t(role.key)}
            </span>
          </div>
        );
      })}

      {/* Connecting lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 240 240"
        aria-hidden="true"
      >
        {TEAM_ROLES.map((role) => {
          const rad = (role.angle * Math.PI) / 180;
          const ex = 120 + Math.cos(rad) * role.radius;
          const ey = 120 + Math.sin(rad) * role.radius;
          return (
            <line
              key={role.key}
              x1="120"
              y1="120"
              x2={ex}
              y2={ey}
              stroke="#2575ff"
              strokeWidth="1"
              strokeOpacity="0.2"
              strokeDasharray="4 4"
            />
          );
        })}
      </svg>
    </div>
  );
}
