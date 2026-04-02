export function TrialCta({
  trialText,
  trialButton,
}: {
  trialText: string;
  trialButton: string;
}) {
  return (
    <div className="flex w-full items-start justify-center">
      {/* Grid overlay — both elements in same cell, button offset with margin */}
      <div className="inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-0">
        {/* Trial text pill — col 1, row 1 */}
        <div className="col-start-1 row-start-1 flex h-[80px] w-full items-center justify-center md:h-[111px] md:w-[619px]">
          <a
            href="/auth/register"
            className="inline-flex flex-none -rotate-[4deg] items-center justify-center rounded-[1000px] bg-bg-section px-[32px] py-[16px] text-[12px] font-medium tracking-[0.5px] text-primary transition-colors hover:bg-[#dde0fd] active:bg-primary-active active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2575ff] focus-visible:ring-offset-2 md:px-[54px] md:py-[24px] md:text-[20px]"
          >
            {trialText}
          </a>
        </div>
        {/* "Начать" button — col 1, row 1, offset to overlap bottom-center */}
        <div className="col-start-1 row-start-1 ml-[120px] mt-[55px] flex h-[60px] w-[180px] items-center justify-center md:ml-[197px] md:mt-[82px] md:h-[83px] md:w-[223px]">
          <a
            href="/auth/register"
            className="inline-flex flex-none rotate-[4deg] items-center justify-center rounded-[1000px] bg-primary px-[64px] py-[28px] text-[22px] font-medium tracking-[0.5px] text-surface transition-colors hover:bg-primary-hover active:bg-primary-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2575ff] focus-visible:ring-offset-2 md:w-[219px] md:px-[54px] md:py-[24px] md:text-[20px]"
          >
            {trialButton}
          </a>
        </div>
      </div>
    </div>
  );
}
