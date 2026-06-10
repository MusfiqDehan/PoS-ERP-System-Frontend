"use client";

type AccountStatementTransactionTypeCellProps = {
  text: string;
};

export function AccountStatementTransactionTypeCell({
  text,
}: AccountStatementTransactionTypeCellProps) {
  return (
    <span
      className={`d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white ${
        text === "Debit" ? "bg-danger" : "bg-success"
      } fs-10`}
    >
      <i className="ti ti-point-filled me-1 fs-11" />
      {text}
    </span>
  );
}
