"use client";

export default function DeleteRoleModal() {
  return (
    <div className="modal fade modal-default" id="delete_modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content overflow-hidden rounded-lg border-0">
          <div className="modal-body p-0">
            <div className="px-6 py-8 text-center">
              <form>
                <div className="mx-auto mb-2 inline-flex rounded-full bg-red-50 p-2 text-red-600">
                  <i className="ti ti-trash text-2xl" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[#333333]">Delete Role</h3>
                <p className="mb-3 text-base text-[#666666]">
                  Are you sure you want to delete role?
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    className="rounded border border-[#e7e7e7] bg-white px-4 py-2 text-sm font-medium text-[#333333]"
                    data-bs-dismiss="modal"
                  >
                    No, Cancel
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="rounded bg-[#089b7c] px-4 py-2 text-sm font-medium text-white"
                  >
                    Yes, Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
