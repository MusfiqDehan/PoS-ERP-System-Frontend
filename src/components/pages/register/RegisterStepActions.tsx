type RegisterStepActionsProps = {
  step: 1 | 2;
  canProceed: boolean;
  canSubmit: boolean;
  loading?: boolean;
  onNext: () => void;
  onBack: () => void;
};

export default function RegisterStepActions({
  step,
  canProceed,
  canSubmit,
  loading = false,
  onNext,
  onBack,
}: RegisterStepActionsProps) {
  return (
    <div className="auth-register-page__step-actions">
      {step === 1 ? (
        <button
          type="button"
          className="auth-split-page__submit"
          disabled={!canProceed}
          onClick={onNext}
        >
          Next
        </button>
      ) : (
        <div className="auth-register-page__step-actions-row">
          <button
            type="button"
            className="auth-register-page__back-btn"
            disabled={loading}
            onClick={onBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="auth-split-page__submit auth-register-page__submit-btn"
            disabled={!canSubmit || loading}
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </div>
      )}
    </div>
  );
}
