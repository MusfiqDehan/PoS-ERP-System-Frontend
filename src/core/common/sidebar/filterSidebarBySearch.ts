type SidebarSearchNode = {
  label?: string;
  submenuItems?: SidebarSearchNode[];
};

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

function labelMatches(label: string | undefined, query: string): boolean {
  if (!label || !query) return false;
  return label.toLowerCase().includes(query);
}

function filterMenuItem(
  item: SidebarSearchNode,
  query: string,
): SidebarSearchNode | null {
  const children = item.submenuItems ?? [];
  const filteredChildren = children
    .map((child) => filterMenuItem(child, query))
    .filter((child): child is SidebarSearchNode => child !== null);

  if (labelMatches(item.label, query)) {
    if (children.length === 0) {
      return item;
    }

    return {
      ...item,
      submenuItems: filteredChildren.length > 0 ? filteredChildren : children,
    };
  }

  if (filteredChildren.length > 0) {
    return { ...item, submenuItems: filteredChildren };
  }

  return null;
}

export function filterSidebarBySearch<T extends SidebarSearchNode>(
  sections: T[],
  query: string,
): T[] {
  const normalized = normalizeQuery(query);
  if (!normalized) return sections;

  return sections.reduce<T[]>((acc, section) => {
    const filteredItems = (section.submenuItems ?? [])
      .map((item) => filterMenuItem(item, normalized))
      .filter((item): item is SidebarSearchNode => item !== null);

    if (filteredItems.length > 0) {
      acc.push({ ...section, submenuItems: filteredItems } as T);
    }
    return acc;
  }, []);
}
