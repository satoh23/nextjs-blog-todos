import fetch from "node-fetch";

export async function getAllPostData() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
    );
    const posts = await res.json();
    const fillterdPosts = posts.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );
    return fillterdPosts;
}

export async function getAllPostIds() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
    );
    const posts = await res.json();

    return posts.map((post) => {
        return {
            params: {
                id: String(post.id),
            },
        };
    });
}

export async function getPostData(id) {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`));
    const post = await res.json();
    return {
        post,
    };
}