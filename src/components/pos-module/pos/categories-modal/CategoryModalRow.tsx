import type { PosProductFilter } from "../posProductsData";
import { SYSTEM_CATEGORY_ID } from "../posCategoriesUtils";

type CategoryModalRowProps = {
  category: PosProductFilter;
  isEditing: boolean;
  isConfirmingDelete: boolean;
  deleteError?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onConfirmDelete: (id: string) => void;
  onCancelDelete: () => void;
};

function getInitial(label: string): string {
  return label.trim().charAt(0).toUpperCase() || "?";
}

export default function CategoryModalRow({
  category,
  isEditing,
  isConfirmingDelete,
  deleteError,
  onEdit,
  onDelete,
  onConfirmDelete,
  onCancelDelete,
}: CategoryModalRowProps) {
  const isSystem = category.id === SYSTEM_CATEGORY_ID;

  return (
    <div
      className={`pos-category-modal__row${
        isEditing ? " pos-category-modal__row--active" : ""
      }${isSystem ? " pos-category-modal__row--system" : ""}`}
    >
      <div className="pos-category-modal__row-main">
        <span className="pos-category-modal__row-icon" aria-hidden="true">
          {getInitial(category.label)}
        </span>

        <div className="pos-category-modal__row-copy">
          <span className="pos-category-modal__row-name">{category.label}</span>
          {isSystem && (
            <span className="pos-category-modal__row-tag">Default</span>
          )}
        </div>

        <span className="pos-category-modal__count-badge">
          {category.count} items
        </span>
      </div>

      {!isSystem && (
        <div className="pos-category-modal__row-actions">
          {isConfirmingDelete ? (
            <div className="pos-category-modal__confirm">
              <span className="pos-category-modal__confirm-text">
                Delete this category?
              </span>
              <div className="pos-category-modal__confirm-actions">
                <button
                  type="button"
                  className="pos-category-modal__icon-btn pos-category-modal__icon-btn--danger"
                  onClick={() => onConfirmDelete(category.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="pos-category-modal__icon-btn"
                  onClick={onCancelDelete}
                >
                  Cancel
                </button>
              </div>
              {deleteError && (
                <span className="pos-category-modal__inline-error">
                  {deleteError}
                </span>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                className="pos-category-modal__icon-btn"
                aria-label={`Edit ${category.label}`}
                onClick={() => onEdit(category.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="pos-category-modal__icon-btn pos-category-modal__icon-btn--danger"
                aria-label={`Delete ${category.label}`}
                onClick={() => onDelete(category.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
