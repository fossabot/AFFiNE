import { Button } from '@affine/component';
import { useAFFiNEI18N } from '@affine/i18n/hooks';
import { type FC, useCallback, useEffect, useState } from 'react';

import { resendButtonWrapper } from './share.css';

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};
const CountDown: FC<{
  seconds: number;
  onEnd?: () => void;
}> = ({ seconds, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft === 0) {
      onEnd?.();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);

      if (timeLeft - 1 === 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onEnd, timeLeft]);

  return <>{formatTime(timeLeft)}</>;
};

export const ResendButton: FC<{
  onClick: () => void;
}> = () => {
  const t = useAFFiNEI18N();
  const [canResend, setCanResend] = useState(false);

  const onButtonClick = useCallback(() => {
    setCanResend(false);
    console.log('222', 222);
  }, [setCanResend]);

  const onCountDownEnd = useCallback(() => {
    setCanResend(true);
  }, [setCanResend]);

  return (
    <div className={resendButtonWrapper}>
      {canResend ? (
        <Button type="plain" size="large" onClick={onButtonClick}>
          {t['com.affine.auth.sign.auth.code.resend.hint']()}
        </Button>
      ) : (
        <>
          <span className="resend-code-hint">
            {t['com.affine.auth.sign.auth.code.on.resend.hint']()}
          </span>
          <CountDown seconds={10} onEnd={onCountDownEnd} />
        </>
      )}
    </div>
  );
};