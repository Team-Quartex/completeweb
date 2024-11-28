export async function addComment(content,postId){
    try{
    const addComment = await fetch(
        "http://localhost:8000/api/comments/addcomment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Ensure you're sending JSON
          },
          credentials: "include",
          body: JSON.stringify({
            postId:postId,
            content:content,
          }),
        }
      );
      if (addComment.ok) {
        console.log("comment Add Done");
         // Response from /api/products/addPost
      } else {
        console.error(
          "Error while posting data to addPost:",
          addComment.statusText
        );
      }
    } catch (error) {
      console.error(error);
    }
}

export async function addsaved(postId){
  try{
  const addComment = await fetch(
      "http://localhost:8000/api/savedpost/addsavedposts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure you're sending JSON
        },
        credentials: "include",
        body: JSON.stringify({
          postId:postId,
        }),
      }
    );
    if (addComment.ok) {
      console.log("Saved post");
       // Response from /api/products/addPost
    } else {
      console.error(
        "Error while posting data to addPost:",
        addComment.statusText
      );
    }
  } catch (error) {
    console.error(error);
  }
}

export async function removedPost(postId){
  try{
  const addComment = await fetch(
      `http://localhost:8000/api/savedpost/removesavedpost?postId=${postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Ensure you're sending JSON
        },credentials: "include",
      }
    );
    if (addComment.ok) {
      console.log("Saved post removed");
       // Response from /api/products/addPost
    } else {
      console.error(
        "Error while posting data to addPost:",
        addComment.statusText
      );
    }
  } catch (error) {
    console.error(error);
  }
}