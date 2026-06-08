"use client";

import ImageGallery from "./ImageGallery";
import ThemeForestResult from "./ThemeForestResult";

type SearchResultsCardProps = {
  open1: boolean;
  setOpen1: (value: boolean) => void;
};

export default function SearchResultsCard({
  open1,
  setOpen1,
}: SearchResultsCardProps) {
  return (
                <div className="card">
                    <div className="card-body">
                        <h5 className="mb-3">Search result for {`"DreamsPOS"`}</h5>
                        <ThemeForestResult />
                        <ImageGallery open1={open1} setOpen1={setOpen1} />
                    </div>
                </div>
  );
}
