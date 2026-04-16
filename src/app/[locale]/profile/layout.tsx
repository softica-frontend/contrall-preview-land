import { ProfileHeader } from "@/components/layout/profile-header";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        background:
          "linear-gradient(106.59deg, rgba(224,234,252,0.3) 4.6%, rgba(235,236,254,0.3) 52.3%, rgba(201,204,255,0.3) 100%), #FCFCFD",
      }}
    >
      <ProfileHeader />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
