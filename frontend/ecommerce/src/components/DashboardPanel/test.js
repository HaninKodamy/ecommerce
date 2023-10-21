<div className="table-container">
  <div className="app-card app-card-orders-table mb-5">
    <div className="app-card-body">
      <div className="table-responsive">
        <table className="table mb-0 text-left custom-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings && filteredListings.length > 0 ? (
              <>
                {filteredListings.map((listing, index) => (
                  <tr key={listing._id}>
                    <td>{listing.title}</td>
                    <td>{listing.description}</td>
                    <td>${listing.price}</td>
                    <td>
                      <img
                        src={listing.images}
                        alt={listing.title}
                        style={{
                          display: "block",
                          margin: "0 auto",
                          maxWidth: "50px",
                        }}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleDelete(listing)}>
                        Delete
                      </button>
                      <button onClick={() => handleView(listing)}>View</button>
                      <button onClick={() => handleEdit(listing, index)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <div class="center-div">
                <div class="loader"></div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>;

<tbody>
  {filteredListings && filteredListings.length > 0 ? (
    <>
      {filteredListings.map((listing, index) => (
        <tr key={listing._id}>
          <td>{listing.title}</td>
          <td>{listing.description}</td>
          <td>${listing.price}</td>
          <td>
            <img
              src={listing.images}
              alt={listing.title}
              style={{ display: "block", margin: "0 auto", maxWidth: "50px" }}
            />
          </td>
          <td>
            <button onClick={() => handleDelete(listing)}>Delete</button>
            <button onClick={() => handleView(listing)}>View</button>
            <button onClick={() => handleEdit(listing, index)}>Edit</button>
          </td>
        </tr>
      ))}
    </>
  ) : (
    <div class="center-div">
      <div class="loader"></div>
    </div>
  )}
</tbody>;
