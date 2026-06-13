import { Search } from "react-feather";
import Link from "next/link";

export default function HeaderSearch() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className="nav-item nav-searchinputs figma-header-control figma-search-control">
            <div className="top-nav-search">
                <Link href="#" className="responsive-search">
                    <Search />
                </Link>
                <form className="figma-search-form" role="search" onSubmit={handleSubmit}>
                    <div
                        className="searchinputs input-group"
                    >
                        <input type="text" placeholder="Search Product" />
                        <div className="search-addon">
                            <span>
                                <i className="ti ti-search" />
                            </span>
                        </div>
                        <span className="input-group-text">
                            <kbd className="d-flex align-items-center">
                                <span className="figma-kbd-command">⌘K</span>
                            </kbd>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
