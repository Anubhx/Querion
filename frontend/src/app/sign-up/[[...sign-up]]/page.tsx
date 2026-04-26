import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] rounded-full bg-blue-50 opacity-60 blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[450px] h-[450px] rounded-full bg-indigo-50 opacity-60 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2563EB] rounded-[10px] flex items-center justify-center shadow-lg shadow-blue-200">
            <svg className="w-6 h-6" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="5" stroke="#fff" strokeWidth="1.5" />
              <path d="M5 8h6M8 5v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-[20px] font-bold text-[#0F172A] leading-tight">Querion</div>
            <div className="text-[12px] text-[#64748B]">AI Data Analyst Platform</div>
          </div>
        </div>

        {/* Clerk Sign Up component */}
        <SignUp
          appearance={{
            elements: {
              rootBox: 'shadow-xl shadow-slate-100',
              card: 'rounded-[16px] border border-[#E2E8F0]',
              headerTitle: 'text-[#0F172A] font-bold',
              headerSubtitle: 'text-[#64748B]',
              formButtonPrimary:
                'bg-[#2563EB] hover:bg-[#1D4ED8] text-sm font-medium rounded-[8px] shadow-none',
              formFieldInput:
                'rounded-[8px] border-[#CBD5E1] focus:border-[#2563EB] focus:ring-[#2563EB]/20 text-sm',
              footerActionLink: 'text-[#2563EB] hover:text-[#1D4ED8] font-medium',
              socialButtonsBlockButton:
                'border-[#E2E8F0] hover:border-[#CBD5E1] rounded-[8px] text-[#334155] text-sm font-medium',
            },
          }}
        />
      </div>
    </div>
  );
}
