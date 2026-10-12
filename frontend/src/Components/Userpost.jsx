import { useGetAllPostQuery } from "../../redux/features/Postslice";

const UserPosts = () => {
  const { data, isLoading, isError, error } = useGetAllPostQuery();

  console.log("Posts response:", data);
  console.log("Posts error:", error);

  const posts = data?.allPosts || [];

  if (isLoading) {
    return <p className="p-6">Loading posts...</p>;
  }

  if (isError) {
    return (
      <p className="p-6 text-red-600">
        Failed to load posts: {error?.status || error?.message}
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5EF] p-6 text-[#343830]">
      <h1 className="mb-2 text-3xl font-bold text-[#245747]">Explore Posts</h1>

      <p className="mb-6">Browse service requests from all users.</p>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-[#E7E2D7] bg-white p-6">
          No posts available.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-[#E7E2D7] bg-white p-5 shadow-sm"
            >
              <h2 className="mb-3 text-xl font-semibold text-[#245747]">
                {post.title}
              </h2>
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5EDE7] font-semibold text-[#245747]">
                  {(post.owner_name || "U").charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="text-xs text-gray-500">Posted by</p>
                  <p className="font-medium text-[#245747]">
                    {post.owner_name || "Unknown user"}
                  </p>
                </div>
              </div>
              <p className="mb-4">{post.description}</p>

              {post.location && (
                <p className="mb-2 text-sm text-gray-600">
                  Location: {post.location}
                </p>
              )}

              {post.budget != null && (
                <p className="font-semibold text-[#245747]">
                  Budget: Rs. {post.budget}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default UserPosts;
