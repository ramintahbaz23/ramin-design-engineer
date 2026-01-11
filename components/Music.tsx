'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Custom interval hook
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Music() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="flex w-full max-w-md items-center justify-center pt-8">
        <PaymentStatusButton />
      </div>
    </div>
  );
}

function PaymentStatusButton() {
  const [step, setStep] = useState(0);

  const status = step === 0 ? 'processing' : step === 1 ? 'failed' : step === 2 ? 'processing' : 'complete';

  useInterval(() => {
    setStep((s) => (s + 1) % 4);
  }, 3500);

  return (
    <motion.button
      style={{
        color:
          status === 'processing'
            ? '#007AFF'
            : status === 'complete'
            ? '#00A020'
            : status === 'failed'
            ? '#FF3B30'
            : '#000000',
        background:
          status === 'processing'
            ? 'rgba(0, 122, 255, 0.1)'
            : status === 'complete'
            ? 'rgba(0, 214, 50, 0.12)'
            : status === 'failed'
            ? 'rgba(255, 59, 48, 0.1)'
            : 'transparent',
        transformOrigin: 'center',
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      className="flex h-14 cursor-default items-center gap-2.5 rounded-xl px-6 text-xl font-semibold tracking-[-0.4px] font-sans"
    >
      <div className="block size-6 shrink-0 flex items-center justify-center">
        {StatusIcon[status]}
      </div>
      <span className="line-clamp-1">
        {StatusText[status]}
      </span>
    </motion.button>
  );
}

function ProcessingIcon(props: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      fill="none"
      width="24"
      height="24"
    >
      <circle cx="12" cy="12" r="10" opacity="0.2" stroke="currentColor" strokeWidth="1" />
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1.5s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
      </g>
    </svg>
  );
}

function FailedIcon(props: { className: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      width="24"
      height="24"
      initial={{ scale: 1, x: 0 }}
      animate={{ 
        scale: 1.15,
        x: [0, -3, 3, -3, 0]
      }}
      transition={{ 
        scale: {
          type: 'spring',
          stiffness: 300,
          damping: 15,
          delay: 0.2,
        },
        x: {
          duration: 0.4,
          delay: 0.2,
          type: 'tween',
        }
      }}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 8l8 8M16 8l-8 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

function CompleteIcon(props: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      width="24"
      height="24"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M7 12l3 3 7-7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="15"
        strokeDashoffset="15"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="15;0"
          dur="0.6s"
          fill="freeze"
        />
      </path>
    </svg>
  );
}

const StatusIcon = {
  processing: <ProcessingIcon className="size-full" />,
  complete: <CompleteIcon className="size-full" />,
  failed: <FailedIcon className="size-full" />,
};

const StatusText = {
  processing: 'Processing Payment',
  complete: 'Payment Complete',
  failed: 'Payment Failed',
};








