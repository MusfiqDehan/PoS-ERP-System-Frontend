export type ToolbarSearchProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export type ProductsToolbarProps = ToolbarSearchProps & {
  onBarcodeScan?: (code: string) => void;
};
