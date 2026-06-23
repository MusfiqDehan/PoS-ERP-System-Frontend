"use client";

export default function SearchForm() {
  return (
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="d-flex align-items-center">
                                <input
                                    type="text"
                                    className="form-control flex-fill me-3"
                                    defaultValue="Sortorium"
                                />
                                <button type="submit" className="btn btn-primary">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
  );
}
