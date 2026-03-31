"use client";

interface PasswordRulesProps {
  password: string;
  labels?: [string, string, string];
}

export function PasswordRules({ password, labels }: PasswordRulesProps) {
  const [lbl8, lblUpper, lblDigit] = labels ?? [
    "Минимум 8 букв",
    "1 Заглавная Буква",
    "1 Цифра",
  ];

  const rules = [
    { label: lbl8, met: password.length >= 8 },
    { label: lblUpper, met: /[A-ZА-ЯЁ]/.test(password) },
    { label: lblDigit, met: /\d/.test(password) },
  ];

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 px-1">
      {rules.map((rule) => (
        <div
          key={rule.label}
          role="alert"
          aria-label={`${rule.label} - ${rule.met ? "complete" : "incomplete"}`}
          className="flex items-center gap-2"
        >
          <div
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              rule.met ? "bg-[#44BA3E]" : "bg-[#98A2B3]"
            }`}
          />
          <span
            className={`text-[13px] transition-colors ${
              rule.met ? "text-[#44BA3E]" : "text-[#475467]"
            }`}
          >
            {rule.label}
          </span>
        </div>
      ))}
    </div>
  );
}
