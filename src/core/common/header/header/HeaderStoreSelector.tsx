import ImageWithBasePath from "@/core/common/image-with-base-path";

const stores = [
    { name: "Freshmart", logo: "assets/img/store/store-01.png" },
    { name: "Grocery Apex", logo: "assets/img/store/store-02.png" },
    { name: "Grocery Bevy", logo: "assets/img/store/store-03.png" },
    { name: "Grocery Eden", logo: "assets/img/store/store-04.png" },
];

export default function HeaderStoreSelector() {
    return (
        <div className="dropdown main-drop select-store-dropdown figma-header-control figma-store-selector">
            <button
                type="button"
                className="nav-link select-store"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <span className="user-info">
                    <span className="user-letter">
                        <ImageWithBasePath
                            src="assets/img/store/store-01.png"
                            alt="Location"
                            className="img-fluid"
                            width={20}
                            height={20}
                        />
                    </span>
                    <span className="user-detail">
                        <span className="user-name">Mirpur-12</span>
                    </span>
                </span>
                <span className="store-caret" aria-hidden="true">
                    <i className="ti ti-chevron-down" />
                </span>
            </button>
            <div className="dropdown-menu dropdown-menu-end">
                {stores.map((store) => (
                    <button type="button" key={store.name} className="dropdown-item">
                        <ImageWithBasePath
                            src={store.logo}
                            alt={`${store.name} logo`}
                            className="img-fluid"
                            width={20}
                            height={20}
                        />
                        {store.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
