"use client";

import { useEffect, useMemo, useState } from "react";
import type { PosProductFilter } from "../posProductsData";
import { POS_MANAGE_CATEGORIES_MODAL_ID } from "../posCategoriesUtils";
import CategoryModalRow from "./CategoryModalRow";
import { closePosModal } from "./closePosModal";

type PosManageCategoriesModalProps = {
  categories: PosProductFilter[];
  categoryStats: {
    totalCategories: number;
    totalProducts: number;
  };
  onCreateCategory: (label: string) => { ok: boolean; error?: string };
  onUpdateCategory: (
    id: string,
    label: string,
  ) => { ok: boolean; error?: string };
  onDeleteCategory: (id: string) => { ok: boolean; error?: string };
};

export default function PosManageCategoriesModal({
  categories,
  categoryStats,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
}: PosManageCategoriesModalProps) {
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | undefined>();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | undefined>();
  const [listQuery, setListQuery] = useState("");

  const isEditing = editingId !== null;
  const editingCategory = categories.find(
    (category) => category.id === editingId,
  );

  const filteredCategories = useMemo(() => {
    const query = listQuery.trim().toLowerCase();
    if (!query) {
      return categories;
    }

    return categories.filter((category) =>
      category.label.toLowerCase().includes(query),
    );
  }, [categories, listQuery]);

  useEffect(() => {
    if (editingId && editingCategory) {
      setName(editingCategory.label);
    }
  }, [editingCategory, editingId]);

  const resetForm = () => {
    setName("");
    setEditingId(null);
    setFormError(undefined);
  };

  const handleClose = () => {
    resetForm();
    setDeleteConfirmId(null);
    setDeleteError(undefined);
    setListQuery("");
    closePosModal(POS_MANAGE_CATEGORIES_MODAL_ID);
  };

  const handleSubmit = () => {
    const result = isEditing
      ? onUpdateCategory(editingId, name)
      : onCreateCategory(name);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    resetForm();
  };

  const handleEdit = (id: string) => {
    setDeleteConfirmId(null);
    setDeleteError(undefined);
    setEditingId(id);
    setFormError(undefined);
  };

  const handleDeleteRequest = (id: string) => {
    setEditingId(null);
    setName("");
    setFormError(undefined);
    setDeleteConfirmId(id);
    setDeleteError(undefined);
  };

  const handleConfirmDelete = (id: string) => {
    const result = onDeleteCategory(id);
    if (!result.ok) {
      setDeleteError(result.error);
      return;
    }

    setDeleteConfirmId(null);
    setDeleteError(undefined);
  };

  return (
    <div
      className="modal fade pos-sale-modal pos-category-modal"
      id={POS_MANAGE_CATEGORIES_MODAL_ID}
      tabIndex={-1}
      aria-labelledby="pos-manage-categories-title"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered pos-sale-modal__dialog pos-category-modal__dialog">
        <div className="modal-content pos-sale-modal__content">
          <div className="pos-sale-modal__header">
            <div>
              <h5
                className="pos-sale-modal__title"
                id="pos-manage-categories-title"
              >
                Manage Categories
              </h5>
              <p className="pos-sale-modal__subtitle">
                Create, update, or remove product categories for this store
              </p>
            </div>
            <button
              type="button"
              className="pos-sale-modal__close"
              aria-label="Close"
              onClick={handleClose}
            >
              ×
            </button>
          </div>

          <div className="pos-category-modal__stats">
            <div className="pos-category-modal__stat">
              <span className="pos-category-modal__stat-value">
                {categoryStats.totalCategories}
              </span>
              <span className="pos-category-modal__stat-label">Categories</span>
            </div>
            <div className="pos-category-modal__stat-divider" aria-hidden="true" />
            <div className="pos-category-modal__stat">
              <span className="pos-category-modal__stat-value">
                {categoryStats.totalProducts}
              </span>
              <span className="pos-category-modal__stat-label">Products</span>
            </div>
          </div>

          <div className="pos-sale-modal__body pos-category-modal__body">
            <div className="pos-category-modal__form-card">
              <div className="pos-category-modal__form-head">
                <h6 className="pos-category-modal__form-title">
                  {isEditing ? "Update Category" : "Add New Category"}
                </h6>
                {isEditing && (
                  <button
                    type="button"
                    className="pos-category-modal__link-btn"
                    onClick={resetForm}
                  >
                    Cancel edit
                  </button>
                )}
              </div>

              <div className="pos-category-modal__form-row">
                <input
                  type="text"
                  className={`pos-sale-modal__input pos-sale-modal__input--full${
                    formError ? " pos-sale-modal__input--error" : ""
                  }`}
                  placeholder="e.g. Beverages, Snacks, Personal Care"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    if (formError) {
                      setFormError(undefined);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSubmit();
                    }
                  }}
                />
                <button
                  type="button"
                  className="pos-sale-modal__btn pos-sale-modal__btn--primary pos-category-modal__submit"
                  onClick={handleSubmit}
                  disabled={!name.trim()}
                >
                  {isEditing ? "Save Changes" : "Add Category"}
                </button>
              </div>

              {formError && (
                <span className="pos-sale-modal__error">{formError}</span>
              )}
            </div>

            <div className="pos-category-modal__list-head">
              <h6 className="pos-category-modal__list-title">All Categories</h6>
              <input
                type="search"
                className="pos-category-modal__list-search"
                placeholder="Filter categories..."
                value={listQuery}
                onChange={(event) => setListQuery(event.target.value)}
              />
            </div>

            <div className="pos-category-modal__list">
              {filteredCategories.length === 0 ? (
                <div className="pos-category-modal__empty">
                  No categories match your search.
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <CategoryModalRow
                    key={category.id}
                    category={category}
                    isEditing={editingId === category.id}
                    isConfirmingDelete={deleteConfirmId === category.id}
                    deleteError={
                      deleteConfirmId === category.id ? deleteError : undefined
                    }
                    onEdit={handleEdit}
                    onDelete={handleDeleteRequest}
                    onConfirmDelete={handleConfirmDelete}
                    onCancelDelete={() => {
                      setDeleteConfirmId(null);
                      setDeleteError(undefined);
                    }}
                  />
                ))
              )}
            </div>
          </div>

          <div className="pos-sale-modal__footer">
            <button
              type="button"
              className="pos-sale-modal__btn pos-sale-modal__btn--ghost"
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
