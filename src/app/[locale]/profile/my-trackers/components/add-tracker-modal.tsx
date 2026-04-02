"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons/profile-icons";
import { Modal } from "@/components/ui/modal";

interface AddTrackerModalProps {
  open: boolean;
  onClose: () => void;
}

const STEPS = ["general", "team", "configuration", "payment"] as const;

export function AddTrackerModal({ open, onClose }: AddTrackerModalProps) {
  const t = useTranslations("MyTrackers");
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex h-[727px] max-h-[95vh] w-[1051px] max-w-[95vw] flex-col overflow-hidden rounded-xl border border-[#E4E7EC] bg-[#FCFCFD]"
    >
      <Modal.Header>
        <span className="text-[14px] leading-[1.4] text-transparent select-none">
          {t("modal.title")}
        </span>
        <Modal.CloseButton onClick={handleClose} />
      </Modal.Header>

      <Modal.Body>
        {/* Progress steps */}
        <div className="flex gap-3">
          {STEPS.map((step, index) => (
            <div key={step} className="flex flex-1 flex-col gap-px">
              <div className="flex items-center justify-center px-1">
                <span
                  className="text-[14px] leading-[24px]"
                  style={{
                    color: index <= currentStep ? "#2575FF" : "#98A2B3",
                  }}
                >
                  {t(`modal.steps.${step}`)}
                </span>
              </div>
              <div
                className="h-0.5 w-full rounded-full"
                style={{
                  backgroundColor: index <= currentStep ? "#2575FF" : "#E4E7EC",
                }}
              />
            </div>
          ))}
        </div>

        {/* Step content */}
        {currentStep === 0 && <GeneralStep />}
        {currentStep === 1 && <TeamStep />}
        {currentStep === 2 && <ConfigurationStep />}
        {currentStep === 3 && <PaymentStep />}
      </Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          onClick={currentStep === 0 ? handleClose : handleBack}
          className="flex h-8 cursor-pointer items-center justify-center rounded-[40px] px-2.5 py-1 text-[14px] font-medium tracking-[0.5px] text-[#667085] transition-colors duration-150 hover:text-[#0C111D]"
        >
          {currentStep === 0 ? t("modal.cancel") : t("modal.back")}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex h-8 cursor-pointer items-center justify-center rounded-full bg-[#2575FF] px-3 py-1 text-[14px] font-medium tracking-[0.5px] text-[#FCFCFD] transition-colors duration-200 hover:bg-[#1a63e0]"
        >
          {currentStep === STEPS.length - 1
            ? t("modal.finish")
            : t("modal.next")}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

function GeneralStep() {
  const t = useTranslations("MyTrackers");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-[416px] flex-col gap-1">
        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-medium leading-[1.1] text-[#21272A]">
            {t("modal.nameAndRegion")}
          </span>
          <div className="flex gap-2">
            <div className="flex h-11 w-[101px] items-center justify-between rounded-full border border-[rgba(27,45,69,0.3)] bg-white px-6 py-2">
              <span className="text-[20px]">🇦🇩</span>
              <ChevronDownIcon className="shrink-0 stroke-[#667085]" />
            </div>
            <div className="flex h-11 flex-1 items-center rounded-full border border-[rgba(27,45,69,0.3)] bg-white px-6 py-2">
              <input
                type="text"
                placeholder="**** **** **** ****"
                className="w-full bg-transparent text-[14px] leading-[1.4] text-[#0C111D] outline-none placeholder:text-[rgba(27,45,69,0.5)]"
              />
              <ChevronDownIcon className="shrink-0 stroke-[#667085]" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-[416px] flex-col gap-1">
        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-medium leading-[1.1] text-[#21272A]">
            {t("modal.description")}
          </span>
          <textarea
            placeholder={t("modal.description")}
            className="h-24 w-full resize rounded-xl border border-[#D0D5DD] bg-white px-4 py-2 text-[14px] leading-[1.4] text-[#0C111D] outline-none placeholder:text-[rgba(27,45,69,0.5)] focus:border-[#2575FF]"
          />
        </div>
      </div>
    </div>
  );
}

function TeamStep() {
  const t = useTranslations("MyTrackers");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-[416px] flex-col gap-1">
        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-medium leading-[1.1] text-[#21272A]">
            {t("modal.teamSize")}
          </span>
          <div className="flex h-11 items-center rounded-full border border-[rgba(27,45,69,0.3)] bg-white px-6 py-2">
            <span className="flex-1 text-[14px] leading-[1.4] text-[rgba(27,45,69,0.5)]">
              5-10
            </span>
            <ChevronDownIcon className="shrink-0 stroke-[#667085]" />
          </div>
        </div>
      </div>

      <div className="flex w-[416px] flex-col gap-1">
        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-medium leading-[1.1] text-[#21272A]">
            {t("modal.vertical")}
          </span>
          <div className="flex h-11 items-center justify-between rounded-full border border-[rgba(27,45,69,0.3)] bg-white pl-2 pr-6 py-2">
            <span className="rounded-full bg-[#D0D5DD] px-3 py-1 text-[14px] font-medium leading-[20px] tracking-[0.5px] text-[#475467]">
              Gambling
            </span>
            <ChevronDownIcon className="shrink-0 stroke-[#667085]" />
          </div>
        </div>
      </div>

      <div className="flex w-[416px] flex-col gap-1">
        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-medium leading-[1.1] text-[#21272A]">
            {t("modal.description")}
          </span>
          <textarea
            placeholder="**** **** **** ****"
            className="h-24 w-full resize rounded-xl border border-[#D0D5DD] bg-white px-4 py-2 text-[14px] leading-[1.4] text-[#0C111D] outline-none placeholder:text-[rgba(27,45,69,0.5)] focus:border-[#2575FF]"
          />
        </div>
      </div>
    </div>
  );
}

function ConfigurationStep() {
  const t = useTranslations("MyTrackers");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-[416px] flex-col gap-1">
        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-medium leading-[1.1] text-[#21272A]">
            {t("modal.configuration")}
          </span>
          <p className="text-[14px] leading-[1.4] text-[#98A2B3]">
            {t("modal.configPlaceholder")}
          </p>
        </div>
      </div>
    </div>
  );
}

function PaymentStep() {
  const t = useTranslations("MyTrackers");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-[416px] flex-col gap-1">
        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-medium leading-[1.1] text-[#21272A]">
            {t("modal.payment")}
          </span>
          <p className="text-[14px] leading-[1.4] text-[#98A2B3]">
            {t("modal.paymentPlaceholder")}
          </p>
        </div>
      </div>
    </div>
  );
}
