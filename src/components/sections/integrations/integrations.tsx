import { FeaturesSection } from "./features-section";
import { ToolsSection } from "./tools-section";

export function Integrations() {
  return (
    <section
      id="integrations"
      className="w-full  overflow-x-hidden pb-[0px] pt-[20px] md:px-[40px] md:pb-[0px] md:pt-[40px] xl:px-[40px] xl:pb-[5px] xl:pt-[60px] 2xl:px-[80px]"
    >
      <ToolsSection />
      <FeaturesSection />
    </section>
  );
}
