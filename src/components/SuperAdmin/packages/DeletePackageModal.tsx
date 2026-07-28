"use client";

import { deletePlatformPackage } from "@/lib/billing";
import { getAccessToken } from "@/lib/auth-session";
import { useCallback, useState } from "react";

type Props = {
  packageId?: string | null;
  packageName?: string;
  onDeleted?: () => void;
};

export default function DeletePackageModal({ packageId, packageName, onDeleted }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = useCallback(async function () {
    if (!packageId) return;
    const token = getAccessToken();
    if (!token) {
      setError("You must be signed in as a platform admin.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await deletePlatformPackage(packageId, token);
      if (result.ok && result.body.success) {
        if (onDeleted) onDeleted();
      } else {
        setError(result.body.message || "Failed to delete package.");
      }
    } catch {
      setError("Unable to reach the server.");
    } finally {
      setLoading(false);
    }
  }, [packageId, onDeleted]);

  return (
    <div className="modal fade" id="delete_modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <span className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-[#fff0f0] text-[#dc3545]">
                <i className="ti ti-trash-x text-[32px]" />
              </span>
            </div>
            <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Delete Packages</h4>
            <p className="mb-4 text-[14px] text-[#646B72]">
              {packageName
                ? `Are you sure you want to delete "${packageName}"?`
                : "Are you sure you want to delete this package?"}
            </p>
            {error ? (
              <p className="mb-3 text-[14px] text-[#dc3545]">{error}</p>
            ) : null}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                data-bs-dismiss="modal"
                disabled={loading}
                className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading || !packageId}
                onClick={handleDelete}
                className="px-4 py-2 rounded-[6px] bg-[#dc3545] text-white text-[14px] font-medium hover:bg-[#bb2d3b] transition-colors disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
